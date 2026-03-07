# Phase 2.2: OCR Photo Capture - Status

**Status:** ⚠️ PAUSED - Requires EAS Build Setup  
**Date:** 2026-03-07  
**Progress:** 50% Implementation Complete

---

## What's Complete ✅

### OCR Logic (100%)
- ✅ `src/utils/ocrProcessor.ts` - Main ML Kit integration
- ✅ `src/utils/fieldExtractor.ts` - Field extraction (merchant, date, amount)
- ✅ Image preprocessing logic
- ✅ Confidence scoring algorithm

### Dependencies Installed
- ✅ react-native-vision-camera
- ✅ react-native-mlkit-ocr
- ✅ expo-image-manipulator
- ✅ EAS CLI

### Configuration
- ✅ `eas.json` created with build profiles

---

## What's Pending ⚠️

### EAS Build Setup (Required)

**Why:** The OCR libraries (`react-native-vision-camera`, `react-native-mlkit-ocr`) are **native modules** that require compilation. They **cannot** run in Expo Go.

**Steps to Complete:**

1. **Login to EAS**
   ```bash
   eas login
   # (Create account if needed)
   ```

2. **Configure Project**
   ```bash
   eas build:configure
   ```

3. **Build Development Client** (15-30 minutes)
   ```bash
   eas build --profile development --platform android
   ```

4. **Install on Device**
   - QR code will be generated
   - Scan with Expo Go or download APK
   - This creates your custom dev client

5. **Run with Dev Client**
   ```bash
   npx expo start --dev-client
   ```

---

## Next Steps

### After EAS Build is Complete:

1. **Create CameraCaptureScreen** (`src/screens/CameraCaptureScreen.tsx`)
   - Vision Camera wrapper
   - Receipt capture UI
   - Processing indicator
   - Review extracted data

2. **Create OCRReviewScreen** (`src/components/OCRReviewScreen.tsx`)
   - Display extracted fields
   - Confidence indicators (red/yellow/green)
   - Edit fields before saving
   - Retake option

3. **Update Navigation**
   - Add CameraCaptureScreen route
   - Add FAB option to HomeScreen: "Scan with Camera"

4. **Update ScanReceiptScreen**
   - Add button: "Or take photo"
   - Navigate to CameraCaptureScreen

5. **Test with Real Receipts**
   - 10+ Italian receipts
   - Measure accuracy
   - Adjust extraction heuristics if needed

---

## File Structure

```
src/
├── screens/
│   ├── ScanReceiptScreen.tsx    ✅ (exists - QR only)
│   ├── CameraCaptureScreen.tsx  ⚠️ (needs creation)
│   └── ManualEntryScreen.tsx    ✅ (exists)
├── components/
│   ├── QRScanner.tsx            ✅ (exists)
│   ├── ReceiptCamera.tsx        ⚠️ (needs creation)
│   ├── OCRReviewScreen.tsx      ⚠️ (needs creation)
│   └── CategoryPicker.tsx       ✅ (exists)
├── utils/
│   ├── qrParser.ts              ✅ (exists)
│   ├── ocrProcessor.ts          ✅ (exists - needs dev client)
│   ├── fieldExtractor.ts        ✅ (exists)
│   └── formatters.ts            ✅ (exists)
└── db/
    └── schema.ts                ✅ (has receiptImagePath)
```

---

## Timeline Estimates

| Task | Duration | Blocked By |
|------|----------|------------|
| EAS Build setup | 30-60 min | Manual intervention |
| Development client build | 15-30 min | EAS queue |
| CameraCaptureScreen | 2-3 hours | Dev client |
| OCRReviewScreen | 2-3 hours | Dev client |
| Integration | 1-2 hours | Above screens |
| Testing | 2-3 hours | Full implementation |

**Total:** 8-12 hours (excluding build time)

---

## Alternative: Defer to v1.1

**Rationale:** Phase 2.2 adds complexity but isn't essential for MVP.

**MVP with just Phase 2.1 (QR):**
- ✅ Italian Scontrino Elettronico support (mandatory receipts)
- ✅ Manual entry fallback
- ✅ Category management
- ✅ Expense tracking

**v1.1 with Phase 2.2 (OCR Photo):**
- Photo capture for non-QR receipts
- Works with older receipts
- Nice-to-have, not critical

---

## Recommendation

**Option A: Defer Phase 2.2** (Recommended for MVP)
1. Test current features (QR + Manual)
2. Launch with QR scanning + manual entry
3. Add OCR photo in v1.1 after user feedback

**Option B: Complete Phase 2.2** (For completeness)
1. Complete EAS Build setup (30-60 min)
2. Build dev client (15-30 min)
3. Implement remaining screens (6-8 hours)
4. Test thoroughly (2-3 hours)

---

## Current State

**TypeScript:** ✅ 0 errors  
**Build:** Cannot run without EAS dev client  
**QR Scanning:** ✅ Works in Expo Go  
**Manual Entry:** ✅ Works in Expo Go  
**OCR Photo:** ⚠️ Requires native compilation

---

**Next Action:** Decide whether to complete Phase 2.2 now or defer to v1.1.
