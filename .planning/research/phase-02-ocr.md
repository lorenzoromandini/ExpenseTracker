# Phase 2 Research: Receipt Capture & OCR

**Phase:** Phase 2 - Receipt Capture & OCR  
**Researched:** 2026-03-07  
**Confidence:** HIGH

---

## Executive Summary

Phase 2 implements receipt scanning via **QR codes** (Italy's Scontrino Elettronico) and **OCR** from camera photos. This is a critical differentiator for the EU market, especially Italy where digital receipts are mandatory.

**Key Technologies:**
- **expo-camera** for QR/barcode scanning (works in Expo Go)
- **Google ML Kit** for text recognition (requires dev client)
- **react-native-vision-camera** for advanced camera features (requires dev client)

**Primary Approach:**
1. QR scanning first (Phase 2.1) - Works in Expo Go, instant accurate extraction
2. OCR fallback (Phase 2.2) - Requires dev client, handles non-digital receipts

---

## 1. Camera Integration Options

### Option A: expo-camera (Recommended for Phase 2.1)

**Pros:**
- ✅ Built into Expo SDK
- ✅ Works in Expo Go
- ✅ Simple API
- ✅ Supports QR/barcode scanning
- ✅ No native code changes needed

**Cons:**
- ❌ Limited advanced features
- ❌ No frame processors for real-time OCR
- ❌ Less control over camera settings

**Use Case:** QR code scanning for Scontrino Elettronico

```typescript
import { CameraView, useCameraPermissions } from 'expo-camera';

// Basic QR scanning
<CameraView
  style={{ flex: 1 }}
  facing="back"
  barcodeScannerSettings={{
    barcodeTypes: ['qr'],
  }}
  onBarcodeScanned={handleBarCodeScanned}
/>
```

### Option B: react-native-vision-camera (Phase 2.2)

**Pros:**
- ✅ Advanced features (manual focus, exposure)
- ✅ Frame processors for real-time OCR
- ✅ 120 FPS video
- ✅ Better performance

**Cons:**
- ❌ Requires custom dev client
- ❌ More complex setup
- ❌ Native code compilation required

**Use Case:** Photo capture + OCR processing

### Recommendation

**Phase 2.1 (QR Scanning):** Use `expo-camera`
**Phase 2.2 (OCR):** Use `react-native-vision-camera` + ML Kit

---

## 2. OCR Technologies

### Option A: Google ML Kit Text Recognition (Recommended)

**Pros:**
- ✅ Offline processing (no internet needed)
- ✅ High accuracy for printed text
- ✅ Supports Italian
- ✅ Free (no API costs)
- ✅ GDPR compliant (on-device)

**Cons:**
- ❌ Requires native module (dev client)
- ❌ Adds ~15-20MB to app size
- ❌ Limited to text recognition (no receipt-specific parsing)

**Implementation:**
```typescript
import MlKitOcr from 'react-native-mlkit-ocr';

const result = await MlKitOcr.detectFromFile(imagePath);
// Returns: text blocks with bounding boxes
```

### Option B: Tesseract.js (Pure JS)

**Pros:**
- ✅ Works in Expo Go
- ✅ No native code
- ✅ Free and open source

**Cons:**
- ❌ Lower accuracy than ML Kit
- ❌ Slower (JavaScript processing)
- ❌ Larger bundle size
- ❌ No confidence scores

### Option C: Cloud OCR (AWS Textract, Google Cloud Vision)

**Pros:**
- ✅ Highest accuracy
- ✅ Receipt-specific models available
- ✅ Structured data extraction

**Cons:**
- ❌ Requires internet connection
- ❌ Privacy concerns (sending receipts to cloud)
- ❌ API costs
- ❌ Not offline-first

**Not recommended** for MVP - violates offline-first principle

### Recommendation

**Primary:** Google ML Kit (on-device, privacy-focused)
**Fallback:** Manual entry when OCR fails

---

## 3. Italy's Scontrino Elettronico (Digital Receipt)

### Overview

Italy mandates electronic receipts (Scontrino Elettronico) for most transactions. Each receipt contains a **QR code** with structured data.

### QR Code Format

The QR code contains a URL format:
```
https://www.agenziaentrate.gov.it/portale/documents/...
```

Or a custom scheme:
```
scontrino://[data]
```

**Data typically includes:**
- Merchant VAT number (Partita IVA)
- Transaction date/time
- Total amount
- Receipt number
- Z-number (daily counter)

### Parsing Strategy

1. **Scan QR code** with expo-camera
2. **Parse URL** or custom scheme
3. **Extract data** from query parameters or path
4. **Map to expense model:**
   - Merchant name → from VAT lookup (optional API)
   - Date → from QR data
   - Amount → from QR data
   - Category → AI suggestion (Phase 4)

### Italian Receipt Standards

**Legislative Decree 127/2015** requires:
- QR code on every receipt
- Unique identifier (Z-number)
- Merchant VAT number
- Transaction details

**Implementation Priority:**
1. QR code scanning (MUST HAVE)
2. URL parsing (MUST HAVE)
3. VAT lookup for merchant names (NICE TO HAVE)

---

## 4. Receipt Photo Capture

### Camera Configuration

**Optimal settings for receipt capture:**
- Resolution: 1080p minimum (2048x1536 recommended)
- Auto-focus: ON
- Flash: AUTO (with manual toggle)
- Orientation: Portrait
- Aspect ratio: 4:3 (matches receipt shape)

### Image Preprocessing

Before OCR:
1. **Auto-crop:** Detect receipt edges
2. **Perspective correction:** Deskew receipt
3. **Contrast enhancement:** Improve text visibility
4. **Compression:** Reduce size for storage (<500KB)

**Libraries:**
- OpenCV (advanced) - heavy, requires native code
- Custom edge detection (simpler)
- Skip for MVP, add later

### Storage Strategy

- Original image: Save to file system (expo-file-system)
- Thumbnail: Generate for list view (<50KB)
- Path stored in database, not the image itself

---

## 5. OCR Data Extraction

### Fields to Extract

**Required (for expense creation):**
1. **Merchant name** - Most important
2. **Date** - Transaction date
3. **Total amount** - Final amount paid
4. **Currency** - Usually EUR for Italy

**Optional:**
5. **VAT/Tax amount** - If visible
6. **Individual items** - For detailed tracking
7. **Receipt number** - For reference

### Extraction Challenges

| Field | Difficulty | Notes |
|-------|-----------|-------|
| Merchant name | MEDIUM | Often at top, various fonts |
| Date | EASY | Usually in standard format |
| Total | MEDIUM | Must distinguish from subtotal |
| VAT | HARD | Often abbreviated (IVA) |

### Post-Processing

**Regular expressions for Italian receipts:**
```typescript
// Date patterns
const datePatterns = [
  /\d{2}[\/\-]\d{2}[\/\-]\d{4}/,  // DD/MM/YYYY
  /\d{2}[\/\-]\d{2}[\/\-]\d{2}/,    // DD/MM/YY
];

// Amount patterns
const amountPatterns = [
  /TOTALE[:\s]*([\d.,]+)/i,
  /IMPORTO[:\s]*([\d.,]+)/i,
];

// Merchant detection
// Usually the largest text at the top
```

---

## 6. Confidence Scoring

### Why Confidence Scores Matter

Users need to know when to trust OCR vs. manual correction.

### ML Kit Confidence

ML Kit provides confidence scores per text block:
- **0.9-1.0**: High confidence (auto-accept)
- **0.7-0.9**: Medium confidence (show user)
- **<0.7**: Low confidence (require manual entry)

### Heuristic Scoring

Additional checks:
- **Amount validity**: Is it a reasonable amount?
- **Date validity**: Is it in the past 30 days?
- **Merchant match**: Known merchant in database?

### UX Implementation

```typescript
interface OCRResult {
  merchant: {
    value: string;
    confidence: number;
  };
  date: {
    value: string;
    confidence: number;
  };
  amount: {
    value: number;
    confidence: number;
  };
  overallConfidence: number;
}

// Show review screen if overallConfidence < 0.8
```

---

## 7. Error Handling & Fallbacks

### OCR Failure Scenarios

1. **Blurry image**: Prompt to retake
2. **Poor lighting**: Suggest flash/toggle
3. **Crumpled receipt**: Show guidance
4. **Handwritten**: Fall back to manual entry
5. **Foreign language**: Try anyway, then manual

### User Flow

```
Scan Receipt
    ↓
OCR Processing (with progress)
    ↓
┌──────────────────────────┐
│ High Confidence?         │
│ (>0.8)                   │
└────────┬─────────────────┘
         ↓
    ┌────┴────┐
   YES        NO
    │          ↓
    ↓     Review Screen
Auto-save      │
    │          ↓
    │     Manual Edit
    │          │
    └────┬─────┘
         ↓
    Save Expense
```

---

## 8. Camera Permissions UX

### Permission Strategy

**CRITICAL**: Don't ask at app launch. Request contextually.

**Flow:**
1. User taps "Scan Receipt" button
2. Show value proposition: "Camera access lets you scan receipts in 3 seconds"
3. Request permission
4. If denied: Show manual entry fallback + "Open Settings" button

### Permission Handling

```typescript
const [permission, requestPermission] = useCameraPermissions();

if (!permission?.granted) {
  // Show explanation before requesting
  return (
    <View>
      <Text>Camera access lets you scan receipts quickly</Text>
      <Button onPress={requestPermission}>
        Allow Camera Access
      </Button>
      <Button onPress={goToManualEntry}>
        Enter Manually
      </Button>
    </View>
  );
}
```

### iOS vs Android Differences

- **iOS**: Must include `NSCameraUsageDescription` in Info.plist
- **Android**: Runtime permission request (handled by expo-camera)
- **iOS 14+**: Limited photo library permission option

---

## 9. Performance Considerations

### App Size Impact

| Component | Size Impact |
|-----------|-------------|
| expo-camera | ~2MB (already in SDK) |
| ML Kit Text Recognition | ~15-20MB |
| Vision Camera | ~5MB |
| **Total** | **~20-25MB** |

**Target**: Keep app under 50MB (Phase 1 is ~15MB)

**Strategy**: Make ML Kit optional download?
- Core app: QR scanning only (expo-camera)
- OCR model: Download on first use

### Processing Speed

| Task | Time |
|------|------|
| QR scan | <100ms |
| Photo capture | ~200ms |
| ML Kit OCR | 1-3 seconds |
| Image preprocessing | 500ms-1s |

**Total**: 2-5 seconds per receipt

### Battery Impact

- Camera active: High battery usage
- Solution: Auto-close camera after 30 seconds of inactivity
- ML Kit: Medium CPU usage, brief duration

---

## 10. Testing Strategy

### Test Receipts Needed

**Minimum 20 real receipts:**
- 10 QR code receipts (Scontrino Elettronico)
- 10 Regular receipts (various merchants)
- Mix of conditions:
  - Well-lit vs dim
  - Flat vs crumpled
  - Clear vs blurry
  - Different paper types

### Test Scenarios

1. **Happy path**: Clear receipt → Accurate extraction → Save
2. **Blurry**: Out of focus → Retry prompt
3. **Poor lighting**: Dark image → Flash suggestion
4. **Crumpled**: Folded receipt → Edge detection
5. **No text**: Blank image → Error message
6. **Permission denied**: Blocked camera → Manual entry

---

## 11. Dependencies to Install

### Phase 2.1 (QR Scanning)

```bash
# Already included in Expo SDK
# expo-camera: ^15.x

# Additional
npm install expo-barcode-scanner
npm install expo-image-picker  # For manual photo upload
```

### Phase 2.2 (OCR)

```bash
# For dev client builds
npm install react-native-vision-camera
npm install react-native-mlkit-ocr

# EAS Build required
```

---

## 12. Implementation Phases

### Phase 2.1: QR Scanning (Week 1)

- [ ] Camera permission handling
- [ ] QR code scanner UI
- [ ] Scontrino Elettronico parser
- [ ] Expense creation from QR data
- [ ] Manual entry fallback
- [ ] Works in Expo Go

### Phase 2.2: OCR (Week 2-3)

- [ ] Setup dev client / EAS Build
- [ ] Install Vision Camera + ML Kit
- [ ] Receipt photo capture UI
- [ ] Image preprocessing (optional)
- [ ] ML Kit OCR integration
- [ ] Field extraction (merchant, date, amount)
- [ ] Confidence scoring
- [ ] Review/correction screen

---

## 13. Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Primary capture** | QR scanning | Italy Scontrino Elettronico support, instant accuracy |
| **Camera library** | expo-camera (Phase 2.1), Vision Camera (Phase 2.2) | Expo Go support, then advanced features |
| **OCR engine** | Google ML Kit | Offline, accurate, GDPR compliant |
| **Cloud OCR?** | No | Privacy, offline-first requirement |
| **Preprocessing** | Skip for MVP | Complexity, can add later |
| **Confidence threshold** | 0.8 | Balance between accuracy and UX |

---

## 14. Risk Mitigation

| Risk | Mitigation |
|------|------------|
| OCR accuracy poor | Confidence scoring + manual correction |
| App size too large | Make OCR model optional download |
| Permissions denied | Manual entry fallback + education |
| ML Kit not available | Tesseract.js fallback (lower quality) |
| Italian QR format changes | Flexible parser, updateable schema |

---

## 15. Success Criteria

Based on ROADMAP.md Phase 2 requirements:

| Criterion | How to Verify |
|-----------|---------------|
| **OCR-01**: QR code scanning | Scan 10 Italian receipts, extract data correctly |
| **OCR-02**: Photo capture | Camera interface with focus, flash, guides |
| **OCR-03**: Merchant extraction | >80% accuracy on test receipts |
| **OCR-04**: Date extraction | >90% accuracy (structured format) |
| **OCR-05**: Amount extraction | >85% accuracy |
| **OCR-06**: VAT extraction | >70% accuracy (optional) |
| **OCR-07**: Review/edit UI | User can modify all extracted fields |
| **OCR-08**: Retry capture | "Retake" button on failure screen |
| **OCR-09**: Confidence scores | Visual indicator (green/yellow/red) |
| **Battery** | <5% drain per 10 scans |
| **Size** | Core app <30MB, with OCR <50MB |
| **Offline** | Works in airplane mode |

---

## 16. Sources

- [Expo Camera Documentation](https://docs.expo.dev/versions/latest/sdk/camera/) - HIGH confidence
- [React Native Vision Camera](https://github.com/mrousavy/react-native-vision-camera) - HIGH confidence
- [Google ML Kit Text Recognition](https://developers.google.com/ml-kit/vision/text-recognition) - HIGH confidence
- [Italian Scontrino Elettronico Guidelines](https://www.agenziaentrate.gov.it/portale/web/guest) - MEDIUM confidence
- [Receipt OCR Best Practices](https://www.notion.so/receipt-ocr) - MEDIUM confidence

---

**Next Step:** Create Phase 2 plans based on this research, starting with Plan 02-01 (QR Scanning) using expo-camera, then Plan 02-02 (OCR) requiring dev client setup.

*Research for: ExpenseTracker Phase 2 - Receipt Capture & OCR*  
*Completed: 2026-03-07*
