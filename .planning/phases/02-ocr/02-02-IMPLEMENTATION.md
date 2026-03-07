# Phase 2.2: OCR Photo Capture - Implementation Plan

**Status:** 🔵 Starting  
**Duration:** 2-3 days  
**Requires:** EAS Build (custom dev client)

---

## Overview

Implement receipt photo capture with OCR using Google ML Kit. This enables users to take photos of receipts and automatically extract merchant, date, and amount.

## Prerequisites

- ✅ Phase 1 (Foundation) - Complete
- ✅ Phase 2.1 (QR Scanning) - Complete  
- ⚠️ EAS Build configuration - **Must complete first**

---

## Implementation Steps

### Step 1: EAS Build Setup (Day 1)

**1.1 Install EAS CLI**
```bash
npm install -g eas-cli
eas login
```

**1.2 Configure EAS**
```bash
eas build:configure
# Creates eas.json
```

**1.3 Update eas.json**
```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {}
  }
}
```

**1.4 Install Native Dependencies**
```bash
npm install react-native-vision-camera
npm install react-native-mlkit-ocr
npm install expo-image-manipulator
```

**1.5 Build Development Client**
```bash
eas build --profile development --platform android
# Scan QR to install on device
```

---

### Step 2: OCR Processor (Day 1-2)

**File:** `src/utils/ocrProcessor.ts`

```typescript
import MlKitOcr from 'react-native-mlkit-ocr';
import * as ImageManipulator from 'expo-image-manipulator';
import { extractFieldsFromOCR } from './fieldExtractor';

export async function processReceiptImage(imagePath: string) {
  // 1. Preprocess image (resize, enhance)
  const processed = await preprocessImage(imagePath);
  
  // 2. Run OCR
  const ocrResult = await MlKitOcr.detectFromFile(processed.path);
  
  // 3. Extract fields (merchant, date, amount)
  const extractedFields = extractFieldsFromOCR(ocrResult);
  
  // 4. Calculate confidence scores
  const confidence = calculateConfidence(ocrResult, extractedFields);
  
  return {
    ...extractedFields,
    confidence,
    fullText: ocrResult.text,
  };
}
```

**File:** `src/utils/fieldExtractor.ts`
- Extract merchant (largest text at top)
- Extract date (regex patterns for Italian dates)
- Extract amount (look for TOTALE, IMPORTO keywords)
- Calculate confidence scores

---

### Step 3: Camera Capture UI (Day 2)

**File:** `src/screens/CameraCaptureScreen.tsx`

**Features:**
- Receipt camera with guide overlay
- Auto-focus on receipt
- Flash toggle
- Capture button
- Processing indicator
- Review screen with extracted data
- Edit fields before saving
- Retake option

---

### Step 4: Integration (Day 2-3)

**Update HomeScreen FAB:**
- Add "Scan with Camera" option
- Navigate to CameraCaptureScreen

**Update Navigation:**
- Add CameraCaptureScreen route
- Modal presentation

**Update ScanReceiptScreen:**
- Add button: "Scan Photo Instead"
- Navigate to CameraCaptureScreen

---

### Step 5: Testing (Day 3)

**Test Receipts:**
- 10+ real Italian receipts
- Various conditions (lighting, quality)
- Measure accuracy:
  - Merchant extraction %
  - Date extraction %
  - Amount extraction %

**Success Criteria:**
- Merchant: ≥80% accuracy
- Date: ≥90% accuracy  
- Amount: ≥85% accuracy
- Processing: <3 seconds

---

## Technical Decisions

| Component | Choice | Rationale |
|-----------|--------|-----------|
| Camera | react-native-vision-camera | Frame processors, advanced features |
| OCR | Google ML Kit | Offline, accurate, free |
| Image Processing | expo-image-manipulator | Resize, enhance before OCR |
| Field Extraction | Regex + heuristics | No ML model needed for MVP |

---

## File Structure

```
src/
├── screens/
│   └── CameraCaptureScreen.tsx  # Main camera + OCR flow
├── components/
│   ├── ReceiptCamera.tsx        # Camera wrapper
│   └── OCRReviewScreen.tsx      # Review extracted data
├── utils/
│   ├── ocrProcessor.ts          # ML Kit integration
│   └── fieldExtractor.ts        # Extract merchant/date/amount
└── db/
    └── schema.ts                # Already has receiptImagePath
```

---

## Risks & Mitigation

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| ML Kit accuracy poor | Medium | High | Confidence scores + manual edit |
| App size too large | Medium | Medium | Keep under 50MB (add ~20MB) |
| EAS Build complexity | High | Medium | Clear docs, iterate slowly |
| Battery drain | Low | Medium | Processing timeout, user feedback |

---

## Success Criteria

✅ User can capture receipt photo  
✅ OCR extracts merchant with ≥80% accuracy  
✅ OCR extracts date with ≥90% accuracy  
✅ OCR extracts amount with ≥85% accuracy  
✅ Confidence scores displayed  
✅ User can edit extracted fields  
✅ Processing completes in <3 seconds  
✅ Works offline (no internet)  
✅ App size <50MB  

---

## Next Steps

1. **Start EAS Build setup** (requires EAS CLI)
2. **Build development client** (15-30 min build time)
3. **Test on physical device** (simulator camera limited)

**Ready to begin!**
