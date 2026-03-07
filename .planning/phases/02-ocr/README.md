# Phase 2: Receipt Capture & OCR - Plans Created

**Date:** 2026-03-07  
**Status:** Plans ready for execution

---

## Summary

Two execution plans created for Phase 2 based on research findings.

---

## Plan 02-01: QR Scanning (Expo Go Compatible)

**Wave:** 1  
**Estimated Duration:** 1 week  
**Autonomous:** Yes (works in Expo Go)

### What It Implements
- Italian Scontrino Elettronico QR code scanning
- Instant expense creation from QR data
- Manual entry fallback
- Camera permissions with graceful degradation

### Key Components
1. **Database:** Expenses table schema
2. **QR Parser:** Italian receipt QR format parser
3. **Camera UI:** expo-camera integration
4. **Scan Screen:** Full scanning interface
5. **Manual Entry:** Form for manual expense entry
6. **Home FAB:** Quick access buttons

### Technical Stack
- `expo-camera` (built into SDK)
- `expo-barcode-scanner` (QR support)
- SQLite for expense storage
- i18n for Italian/English

### Success Criteria
- ✅ Scan 10/10 Italian Scontrino Elettronico receipts correctly
- ✅ Extract merchant, amount, date from QR
- ✅ Manual entry available
- ✅ Works in Expo Go
- ✅ App size <30MB

---

## Plan 02-02: OCR Photo Capture (Requires Dev Client)

**Wave:** 2  
**Estimated Duration:** 2-3 weeks  
**Autonomous:** No (requires EAS Build setup)

### What It Implements
- Receipt photo capture with Vision Camera
- ML Kit OCR text recognition
- Field extraction (merchant, date, amount, VAT)
- Confidence scoring
- Review/correction screen

### Key Components
1. **EAS Build:** Custom development client setup
2. **Camera:** react-native-vision-camera
3. **OCR:** Google ML Kit text recognition
4. **Processor:** Field extraction with heuristics
5. **Review Screen:** Edit extracted data
6. **Capture Flow:** Camera → Processing → Review → Save

### Technical Stack
- `react-native-vision-camera` (advanced camera)
- `react-native-mlkit-ocr` (Google ML Kit)
- `expo-image-manipulator` (optional preprocessing)
- EAS Build (custom dev client)

### Prerequisites
⚠️ **MUST complete before execution:**
1. Configure EAS Build: `eas build:configure`
2. Install dev client dependencies
3. Build development client for Android/iOS
4. Physical device required (simulator camera limited)

### Success Criteria
- ✅ Capture receipt photos
- ✅ Extract merchant with >= 80% accuracy
- ✅ Extract date with >= 90% accuracy
- ✅ Extract amount with >= 85% accuracy
- ✅ Show confidence scores (high/medium/low)
- ✅ Allow field editing
- ✅ Processing < 3 seconds
- ✅ Works offline
- ✅ App size <50MB with OCR

---

## Implementation Strategy

### Recommended Approach

**Week 1:** Execute Plan 02-01 (QR Scanning)
- Works immediately in Expo Go
- High value feature for Italy
- No complex build setup
- Can ship without OCR initially

**Week 2-3:** Execute Plan 02-02 (OCR)
- Setup EAS Build infrastructure
- Implement ML Kit OCR
- Test with real receipts
- Requires dev client

### Alternative: Skip OCR for MVP

If dev client complexity is too high for MVP:
- Ship with QR scanning only (Plan 02-01)
- Manual entry for non-QR receipts
- Add OCR in v1.1

This still provides value to Italian users (Scontrino Elettronico support).

---

## Dependencies

### Plan 02-01 Dependencies
- Phase 1 complete (database, auth, i18n)
- Expo Go compatible
- No additional native modules

### Plan 02-02 Dependencies
- Plan 02-01 complete
- EAS Build configured
- Physical test device
- ~20 Italian receipts for testing

---

## Files Created

- `.planning/phases/02-ocr/02-01-PLAN.md` - QR scanning plan
- `.planning/phases/02-ocr/02-02-PLAN.md` - OCR plan
- `.planning/research/phase-02-ocr.md` - Research document

---

## Next Steps

1. **Start Phase 2.1:** Execute Plan 02-01 (QR scanning)
2. **Test thoroughly:** Scan real Italian receipts
3. **Decision point:** Implement 02-02 (OCR) or defer to v1.1?
4. **If doing 02-02:** Setup EAS Build first (1-2 days)

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Italian QR format changes | Low | High | Flexible parser |
| OCR accuracy poor | Medium | Medium | Confidence scores + manual fallback |
| EAS Build complexity | High | Medium | Clear docs, skip if needed |
| App size too large | Low | Medium | Make OCR optional download |
| Camera permissions denied | Medium | Low | Manual entry always available |

---

**Ready to begin Phase 2 execution!**
