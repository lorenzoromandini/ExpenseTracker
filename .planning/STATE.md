# Project State: ExpenseTracker

**Last Updated:** 2025-03-02  
**Current Phase:** Not Started — Ready for Phase 1  
**Overall Progress:** 0%

---

## Project Reference

### Core Value
Users can effortlessly track expenses by scanning receipts and immediately understand their spending patterns with actionable savings insights.

### Target Market
- **Primary:** Italian market (Scontrino Elettronico QR support)
- **Secondary:** EU market (multi-currency, VAT handling)
- **Language:** Italian (default), English
- **Currency:** EUR (default), USD, GBP

### Technical Stack
- **Platform:** React Native with Expo SDK 54
- **Database:** SQLite with Drizzle ORM (offline-first)
- **UI:** React Native Paper (Material 3)
- **Charts:** @shopify/react-native-skia
- **OCR:** Google ML Kit (on-device) + optional cloud fallback
- **Sync:** Optional cloud (Firebase/Supabase), local-first by default

### Constraints
- Offline-first architecture (privacy, instant response)
- App size <50MB core, <100MB with OCR model
- Battery optimization (background processing <5% daily)
- GDPR compliance (explicit consent, encryption)
- Mid-range device performance target

---

## Current Position

### Phase Status

| Phase | Status | Progress | Blocked By |
|-------|--------|----------|------------|
| 1 - Foundation | 🔵 Planned | 0% | — |
| 2 - Core Expense | ⚪ Not Started | 0% | Phase 1 |
| 3 - Budgeting | ⚪ Not Started | 0% | Phase 2 |
| 4 - Dashboard & AI | ⚪ Not Started | 0% | Phase 3, Research |
| 5 - Receipt OCR | ⚪ Not Started | 0% | Phase 2, Research |
| 6 - Offline & Sync | ⚪ Not Started | 0% | Phase 1, Research |
| 7 - Notifications | ⚪ Not Started | 0% | Phase 3, Phase 6 |
| 8 - Data Export | ⚪ Not Started | 0% | Phase 2 |
| 9 - Polish | ⚪ Not Started | 0% | All Phases |

**Current Focus:** Ready to begin Phase 1: Foundation

**Next Action:** `/gsd-plan-phase 1` — Generate detailed plan for Foundation phase

### Phase 1: Foundation — Planned

**Goal:** Users can launch a secure, localized app with proper navigation and account management.

**Requirements:** 6 (AUTH-01 to AUTH-06)

**Success Criteria Preview:**
1. User can launch app in guest mode without signup
2. User can create account with email/password
3. User can log in/out with session persistence
4. User can reset password via email
5. User can skip onboarding
6. App displays in Italian/English

**Key Decisions Pending:**
- Finalize navigation structure (tab vs drawer vs stack)
- Choose secure storage library (expo-secure-store vs react-native-keychain)
- Confirm i18n approach (react-i18next vs native localization)

**Research Flag:** Skip research — standard patterns

**Estimated Duration:** TBD after planning

---

## Performance Metrics

### Development Velocity

| Metric | Target | Current |
|--------|--------|---------|
| Requirements completed | 93 | 0 |
| Success criteria met | 78 | 0 |
| Phases completed | 9 | 0 |
| Code commits | — | 0 |

### Quality Indicators

| Indicator | Status | Notes |
|-----------|--------|-------|
| Test coverage | — | Not started |
| Lint/errors | — | Not started |
| Build size | <50MB | Not started |
| Performance | <3s startup | Not started |
| Accessibility | WCAG 2.1 AA | Not started |

### Critical Pitfalls Status

| Pitfall | Risk Level | Mitigation Status |
|---------|------------|-------------------|
| OCR accuracy degradation | HIGH | Pending Phase 5 |
| Offline sync conflicts | HIGH | Pending Phase 6 |
| Camera permission death spiral | MEDIUM | Pending Phase 5 |
| App size bloat | MEDIUM | In Progress (Phase 1) |
| Battery drain | MEDIUM | Pending |
| Receipt data privacy exposure | HIGH | In Progress (Phase 1) |
| FlatList performance | LOW | Pending Phase 2 |
| Notification overload | LOW | Pending Phase 7 |

---

## Accumulated Context

### Key Decisions Log

| Date | Decision | Context | Impact |
|------|----------|---------|--------|
| 2025-03-02 | Expo SDK 54 + React Native | Research recommendation | Foundation for all phases |
| 2025-03-02 | Offline-first architecture | Privacy, EU market | Affects Phases 1, 6 |
| 2025-03-02 | Italian categories default | Primary market | Affects Phase 2 |
| 2025-03-02 | WatermelonDB → Drizzle ORM | Better Expo integration | Affects Phase 1, 6 |
| 2025-03-02 | Manual entry before OCR | High cash usage in Italy | Phase ordering |

### Open Questions

1. **Sync conflict resolution:** CRDT vs operational transforms? (Research needed for Phase 6)
2. **OCR model strategy:** Include in app or optional download? (Affects app size)
3. **Cloud provider:** Firebase vs Supabase for sync? (Privacy implications)
4. **AI model location:** On-device (battery) vs cloud (privacy)?
5. **PDF export library:** react-native-html-to-pdf vs native module?

### Technical Debt / Risks

| Item | Phase | Risk | Mitigation |
|------|-------|------|------------|
| JSI configuration | 1 | Medium | Use pure JS libraries first |
| Camera permission UX | 5 | High | Design contextual request flow |
| OCR accuracy | 5 | High | Plan 100+ receipt test batch |
| Sync conflicts | 6 | High | Research CRDT patterns early |
| App size with ML | 5 | Medium | Make OCR model optional |

### Blockers

**Current:** None

**Anticipated:**
- Phase 4 (AI) — Needs Phase 2-3 data history to train models
- Phase 5 (OCR) — Needs research on Italian receipt formats
- Phase 6 (Sync) — Needs research on conflict resolution

---

## Session Continuity

### Last Session

**Date:** 2025-03-02  
**Activity:** Project initialization, roadmap creation  
**Outcome:** ROADMAP.md and STATE.md created, 93 requirements mapped to 9 phases  
**Next Action:** Begin Phase 1 planning

### Context Stack

1. **Immediate:** Phase 1 Foundation planning needed
2. **Short-term:** Complete Phases 1-3 for core app functionality
3. **Medium-term:** Phases 4-6 for intelligence and robustness
4. **Long-term:** Phases 7-9 for completeness and polish

### Environment State

**Repository:** /home/lromandini/projects/ExpenseTracker  
**Branch:** main  
**Clean Status:** Yes (no uncommitted changes)  
**Dependencies:** None installed yet  
**Last Commit:** Initial project setup

### Files Modified (This Session)

- `.planning/ROADMAP.md` — Created
- `.planning/STATE.md` — Created
- `.planning/REQUIREMENTS.md` — Updated traceability table

---

## Action Items

### Immediate (Next Session)

- [ ] Run `/gsd-plan-phase 1` to generate Phase 1 detailed plan
- [ ] Review Phase 1 plan for approval
- [ ] Begin Phase 1 implementation after plan approval

### Short-term (Phase 1)

- [ ] Set up Expo SDK 54 project structure
- [ ] Configure TypeScript, ESLint, Prettier
- [ ] Set up navigation (React Navigation 7)
- [ ] Configure SQLite + Drizzle ORM
- [ ] Implement authentication screens
- [ ] Set up i18n (Italian/English)
- [ ] Write Phase 1 tests

### Research Needed

- [ ] Phase 4: AI categorization model research
- [ ] Phase 5: OCR accuracy, ML Kit config, Italian receipts
- [ ] Phase 6: Sync conflict resolution (CRDTs)

### Defer to Future Phases

- [ ] Phase 2: Category auto-detection logic
- [ ] Phase 3: Budget rollover (v2 feature)
- [ ] Phase 5: Batch receipt scanning (v2 feature)
- [ ] Phase 6: Bank integration (v2 feature — PSD2)

---

## Notes

### Phase Ordering Notes

Phases ordered to:
1. Build foundation first (security, i18n hard to retrofit)
2. Validate core features before complex ones (manual entry before OCR)
3. Enable AI insights with sufficient data history
4. Build offline-first, add sync later (easier than reverse)
5. Complete with polish and settings integration

### Research Confidence

- **HIGH:** Stack selection (Expo 54, Drizzle, Paper)
- **MEDIUM:** OCR accuracy, sync conflicts (need validation)
- **LOW:** Italian Scontrino Elettronico QR format specifics

### User Experience Goals

- **Scan → Review → Done in <10 seconds** (Phase 5)
- **Immediate budget feedback** (Phase 3)
- **Proactive savings suggestions** (Phase 4)

---

*State file auto-updated by /gsd-roadmap workflow*  
*Last manual update: 2025-03-02*  
*Template version: 1.0*
