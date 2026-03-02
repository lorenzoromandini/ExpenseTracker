# Project Roadmap: ExpenseTracker

**Version:** 1.0  
**Created:** 2025-03-02  
**Depth:** Comprehensive  
**Total Phases:** 9  
**Total v1 Requirements:** 93

---

## Overview

This roadmap transforms 93 v1 requirements into 9 coherent delivery phases for ExpenseTracker—a hybrid mobile expense tracking app with offline-first architecture, receipt scanning (QR and OCR), and AI-powered savings insights targeting the Italian/European market.

**Phase Philosophy:**
- **Phases 1-3** establish core infrastructure and basic expense tracking
- **Phases 4-6** add intelligence, OCR capabilities, and robust offline/sync
- **Phases 7-9** complete the experience with notifications, export, and polish

Each phase delivers a verifiable, testable capability that builds upon previous phases.

---

## Phase 1: Foundation

**Goal:** Users can launch a secure, localized app with proper navigation and account management.

**Phase Rationale:** Core infrastructure (database, security, i18n) must be solid before building features. These are expensive to retrofit later.

### Dependencies
- None (first phase)

### Requirements (6)
| ID | Requirement |
|----|-------------|
| AUTH-01 | User can launch app without mandatory signup (guest mode) |
| AUTH-02 | User can create account with email and password |
| AUTH-03 | User can log in with existing credentials |
| AUTH-04 | User can reset password via email link |
| AUTH-05 | User can enable cloud sync (optional) after account creation |
| AUTH-06 | User can skip onboarding and start using app immediately |

### Success Criteria
1. **User can launch app** and immediately access guest mode without account creation
2. **User can create account** with email/password and receive verification/confirmation
3. **User can log in/out** and session persists across app restarts
4. **User can reset password** via email link workflow
5. **User can skip onboarding** and land directly on main expense view
6. **App displays in Italian or English** based on device locale or manual selection

### Research Flag
**Skip research** — Standard Expo setup patterns, well-documented SQLite/Drizzle integration.

### Critical Pitfalls to Avoid
- Privacy exposure: Secure storage implementation from day one
- App size bloat: Minimal dependencies, tree-shaking enabled

### Plans
**Plans:** 4 plans in 3 waves

Plans:
- [x] 01-01-PLAN.md — Expo project setup with TypeScript, ESLint, and core dependencies
- [x] 01-02-PLAN.md — Navigation structure with React Navigation 7 and auth screen stubs
- [x] 01-03-PLAN.md — Database setup with expo-sqlite + Drizzle ORM and user schema
- [x] 01-04-PLAN.md — i18n (Italian/English), theming (dark/light), secure storage, auth context

### Wave Structure
| Wave | Plans | Dependencies | Autonomous |
|------|-------|--------------|------------|
| 1 | 01-01 | None | Yes |
| 2 | 01-02, 01-03 | 01-01 | Yes |
| 3 | 01-04 | 01-01, 01-02, 01-03 | Yes |

---

## Phase 2: Core Expense Management

**Goal:** Users can track expenses manually with categories, tags, and multi-currency support.

**Phase Rationale:** Manual entry is the primary use case (Italy has high cash usage). Categories and currency support are table stakes for EU market.

### Dependencies
- Phase 1 (Foundation) — requires database, navigation, authentication state

### Requirements (23)
| ID | Requirement |
|----|-------------|
| CORE-01 | User can add expense manually with amount, date, category, note |
| CORE-02 | User can edit existing expense details |
| CORE-03 | User can delete expenses with confirmation |
| CORE-04 | User can view expense history in chronological list |
| CORE-05 | User can search expenses by merchant, amount, or note |
| CORE-06 | User can filter expenses by date range and category |
| CORE-07 | User can view expense details in full-screen modal |
| CAT-01 | User can categorize expenses into predefined categories |
| CAT-02 | User can create custom categories with icons |
| CAT-03 | User can edit category names and icons |
| CAT-04 | User can delete unused custom categories |
| CAT-05 | User can assign multiple tags to expenses |
| CAT-06 | User can create custom tags |
| CAT-07 | System provides default Italian categories: Spesa, Svago, Trasporti, Bollette, Salute, Shopping, Viaggi, Abbonamenti, Altro |
| CAT-08 | User can mark expenses as recurring/subscription |
| CAT-09 | System auto-detects potential recurring expenses |
| CURR-01 | User can set default currency (EUR default for Italian users) |
| CURR-02 | User can select currency when adding expense |
| CURR-03 | System converts foreign currency to default using live rates |
| CURR-04 | User can view both original and converted amounts |
| CURR-05 | System updates exchange rates periodically (weekly) |
| CURR-06 | System supports EUR, USD, GBP at minimum |
| CURR-07 | System displays currency symbol per expense |

### Success Criteria
1. **User can add expense** with amount, date, category (Italian defaults available), and optional note in under 10 seconds
2. **User can edit/delete expenses** with confirmation and changes persist immediately
3. **User can browse expense history** in chronological list with smooth scrolling (1000+ items)
4. **User can search/filter** expenses by merchant name, amount range, date range, or category
5. **User can create custom categories** with icons and delete unused ones
6. **User can assign multiple tags** to expenses for flexible organization
7. **User can add expenses in EUR, USD, or GBP** with automatic conversion to default currency
8. **System auto-detects recurring expenses** and marks them with visual indicator
9. **Expense list shows currency symbols** and converted amounts clearly

### Research Flag
**Skip research** — Well-documented patterns for forms, lists (FlashList), and currency conversion. May need UX testing for category selection flow.

### Critical Pitfalls to Avoid
- FlatList performance collapse: Use FlashList for expense history
- Camera permission death spiral: Not applicable yet (no camera in this phase)

---

## Phase 3: Budgeting

**Goal:** Users can set and track monthly budgets per category with clear progress visualization.

**Phase Rationale:** Budgeting is a core value proposition. Requires expenses (Phase 2) to function, but is a distinct user workflow that needs dedicated focus.

### Dependencies
- Phase 1 (Foundation) — requires authentication, database
- Phase 2 (Core Expense Management) — requires expenses, categories to track against budgets

### Requirements (8)
| ID | Requirement |
|----|-------------|
| BDGT-01 | User can set monthly budget per category |
| BDGT-02 | User can edit budget amounts anytime |
| BDGT-03 | User can view current month spending vs budget |
| BDGT-04 | User can view budget progress as percentage and amount |
| BDGT-05 | User can view remaining budget per category |
| BDGT-06 | System tracks budget usage automatically |
| BDGT-07 | User can see total monthly budget overview |
| BDGT-08 | User can disable budgets for specific categories |

### Success Criteria
1. **User can set monthly budget** for any category with amount input
2. **User can view budget progress** as both percentage and absolute amount remaining
3. **System tracks spending automatically** against budgets when expenses are added/edited
4. **User can see total monthly budget overview** across all enabled categories
5. **User can disable budgets** for categories they don't want to track
6. **Budget indicators show visual alerts** when approaching limits (color coding)

### Research Flag
**Skip research** — Standard budget tracking patterns, simple arithmetic operations.

---

## Phase 4: Dashboard & AI Insights

**Goal:** Users can visualize spending patterns and receive personalized AI-powered savings suggestions.

**Phase Rationale:** Requires sufficient expense history (from Phases 2-3) to generate meaningful insights. Charts and AI differentiate the app from basic trackers.

### Dependencies
- Phase 1 (Foundation) — database, navigation
- Phase 2 (Core Expense Management) — expenses, categories for data to visualize
- Phase 3 (Budgeting) — budget data for insights

### Requirements (14)
| ID | Requirement |
|----|-------------|
| RPT-01 | User can view current month total expenses on dashboard |
| RPT-02 | User can view weekly spending bar chart |
| RPT-03 | User can view category breakdown pie chart |
| RPT-04 | User can view monthly spending trend line chart |
| RPT-05 | User can switch between weekly, monthly, yearly views |
| RPT-06 | User can view top spending categories |
| RPT-07 | User can compare current vs previous month spending |
| RPT-08 | User can view spending insights (e.g., "Spent 20% more on dining") |
| AI-01 | System analyzes spending patterns monthly |
| AI-02 | System provides personalized savings suggestions |
| AI-03 | User can view savings potential for each category |
| AI-04 | System detects spending anomalies (unusual amounts) |
| AI-05 | System suggests budget adjustments based on history |
| AI-06 | User can dismiss or save suggestions for later |

### Success Criteria
1. **User can view dashboard** showing current month total expenses at a glance
2. **User can view weekly bar chart** showing spending per day/week with smooth 60fps rendering
3. **User can view category pie chart** showing breakdown with percentages
4. **User can view monthly trend chart** showing spending over time with zoom capabilities
5. **User can switch time periods** (weekly/monthly/yearly) and charts update instantly
6. **User can see top spending categories** ranked by amount
7. **User can compare months** and see percentage change indicators
8. **System generates spending insights** like "Spent 20% more on dining this month"
9. **System provides AI savings suggestions** based on spending patterns (e.g., "Reduce coffee spending by €15")
10. **User can view savings potential** per category with actionable recommendations
11. **System flags spending anomalies** (unusually high transactions) for review
12. **User can dismiss/save suggestions** for later reference

### Research Flag
**Needs research** — ML categorization model training, spending pattern analysis algorithms. Schedule `/gsd-research-phase` before planning.

### Critical Pitfalls to Avoid
- Chart performance issues: Use React Native Skia for GPU acceleration
- Battery drain: Analyze spending in batches, not continuously

---

## Phase 5: Receipt Capture & OCR

**Goal:** Users can scan receipts via QR codes and camera photos with automatic data extraction.

**Phase Rationale:** The key differentiator (especially Italy Scontrino Elettronico QR support). Complex camera/OCR integration requires dedicated phase.

### Dependencies
- Phase 1 (Foundation) — navigation, permissions framework
- Phase 2 (Core Expense Management) — expense creation, categories to populate from OCR

### Requirements (9)
| ID | Requirement |
|----|-------------|
| OCR-01 | User can scan QR codes on receipts (Italy Scontrino Elettronico) |
| OCR-02 | User can capture receipt photo with camera |
| OCR-03 | System extracts merchant name from receipt image |
| OCR-04 | System extracts transaction date from receipt image |
| OCR-05 | System extracts total amount from receipt image |
| OCR-06 | System extracts VAT/tax amount if visible on receipt |
| OCR-07 | User can review and edit extracted fields before saving |
| OCR-08 | User can retry capture if extraction fails |
| OCR-09 | System shows confidence score for OCR results |

### Success Criteria
1. **User can scan QR codes** on Italy Scontrino Elettronico receipts and extract data instantly
2. **User can capture receipt photo** with camera interface (flash, focus, guides)
3. **System extracts merchant name** from photo with confidence score displayed
4. **System extracts transaction date** and total amount with confidence scoring
5. **System extracts VAT/tax amount** when visible on receipt
6. **User can review all extracted fields** in editable form before saving expense
7. **User can retry capture** if OCR fails or confidence is low
8. **System shows confidence scores** (high/medium/low) for each extracted field
9. **OCR works offline** with on-device ML Kit processing
10. **Camera permission requested contextually** (not at launch) with value explanation

### Research Flag
**Needs research** — OCR accuracy tuning, ML Kit configuration, Italian receipt parsing patterns. Schedule `/gsd-research-phase` before planning.

### Critical Pitfalls to Avoid
- OCR accuracy degradation: Implement pre-capture validation, confidence scoring, manual correction workflow
- Camera permission death spiral: Request contextually, show value first, provide manual fallback
- Battery drain: Process OCR efficiently, use background tasks appropriately
- App size bloat: Make on-device OCR model optional download

---

## Phase 6: Offline-First & Sync

**Goal:** Users can use app fully offline with automatic cloud sync when connected.

**Phase Rationale:** Privacy-first, EU market requirement. Sync built on top of working offline architecture. Requires mature expense data model from previous phases.

### Dependencies
- Phase 1 (Foundation) — database, authentication
- Phase 2 (Core Expense Management) — expense data model, categories
- Phase 5 (Receipt Capture) — offline OCR processing

### Requirements (15)
| ID | Requirement |
|----|-------------|
| OFF-01 | App works fully without internet connection |
| OFF-02 | User can add expenses offline |
| OFF-03 | User can view all data offline |
| OFF-04 | User can capture receipts offline |
| OFF-05 | OCR processing works offline |
| OFF-06 | System queues sync operations when offline |
| OFF-07 | System syncs automatically when connection restored |
| OFF-08 | User can force manual sync |
| SYNC-01 | Data stored locally in SQLite database |
| SYNC-02 | User can enable cloud sync (optional) |
| SYNC-03 | System syncs data to cloud when enabled |
| SYNC-04 | System resolves sync conflicts automatically |
| SYNC-05 | User can sync across multiple devices |
| SYNC-06 | System encrypts data at rest locally |
| SYNC-07 | System encrypts data in transit to cloud |

### Success Criteria
1. **App works fully offline** — all features accessible without network (indicated by offline badge)
2. **User can add expenses offline** and they queue for sync with visual indicator
3. **User can view all data offline** — complete expense history, budgets, reports cached locally
4. **User can capture receipts offline** — photos stored locally, OCR processed on-device
5. **System queues sync operations** and shows pending sync count
6. **System syncs automatically** when connection restored with progress indicator
7. **User can force manual sync** with pull-to-refresh or sync button
8. **Sync works across multiple devices** — same account shows consistent data
9. **System resolves sync conflicts** automatically (last-write-wins with timestamp)
10. **Data encrypted at rest** — SQLite database encrypted with SQLCipher
11. **Data encrypted in transit** — HTTPS/TLS for all cloud sync operations
12. **Cloud sync is opt-in** — explicit user consent required, local-first by default

### Research Flag
**Needs research** — Sync conflict resolution strategies (CRDTs vs operational transforms), UUID generation patterns. Schedule `/gsd-research-phase` before planning.

### Critical Pitfalls to Avoid
- Offline sync conflicts: Use UUIDs at creation, implement CRDT or proper conflict resolution
- Privacy exposure: Encrypt local database, cloud opt-in only

---

## Phase 7: Notifications

**Goal:** Users receive timely budget alerts and weekly spending summaries via push notifications.

**Phase Rationale:** Engagement and retention feature. Requires budgets (Phase 3) and spending data to trigger meaningful alerts.

### Dependencies
- Phase 1 (Foundation) — push notification infrastructure
- Phase 3 (Budgeting) — budget thresholds to monitor
- Phase 6 (Offline-First) — local notification scheduling

### Requirements (6)
| ID | Requirement |
|----|-------------|
| NOTF-01 | User receives push notification at 80% of category budget |
| NOTF-02 | User receives push notification at 100% of category budget |
| NOTF-03 | User receives weekly spending summary notification |
| NOTF-04 | User can enable/disable notification types |
| NOTF-05 | User can set notification time preferences |
| NOTF-06 | System schedules local notifications (works offline) |

### Success Criteria
1. **User receives budget alert** at 80% threshold with category name and remaining amount
2. **User receives budget exceeded alert** at 100% with visual distinction
3. **User receives weekly summary** showing total spent, top category, and budget status
4. **User can toggle notification types** — budget alerts, weekly summaries independently
5. **User can set notification time** for weekly summary (e.g., Sunday 9am)
6. **Notifications work offline** — local scheduling, no server required
7. **Notifications respect DND/system settings** — don't bypass user preferences

### Research Flag
**Skip research** — Standard push notification patterns, local scheduling well-documented.

### Critical Pitfalls to Avoid
- Notification overload: Respect user preferences, limit to essential alerts
- Battery drain: Batch notifications, efficient scheduling

---

## Phase 8: Data Export

**Goal:** Users can export expenses as CSV/PDF for accounting, taxes, or backup purposes.

**Phase Rationale:** Trust-building feature, tax compliance requirement for EU users. Requires mature expense data from all previous phases.

### Dependencies
- Phase 1 (Foundation) — file system access, sharing
- Phase 2 (Core Expense Management) — expense data to export
- Phase 3 (Budgeting) — budget data for reports

### Requirements (6)
| ID | Requirement |
|----|-------------|
| EXP-01 | User can export expenses as CSV file |
| EXP-02 | User can export monthly report as PDF |
| EXP-03 | User can select date range for export |
| EXP-04 | User can filter exports by category |
| EXP-05 | System saves exports to device storage |
| EXP-06 | User can share exports via standard share sheet |

### Success Criteria
1. **User can export CSV** with all expense fields (date, merchant, amount, category, currency, tags, notes)
2. **User can export PDF report** with formatted table and summary statistics
3. **User can select date range** (start/end dates) for export
4. **User can filter by category** — export all or specific categories only
5. **Exports save to device storage** in Downloads/ExpenseTracker folder
6. **User can share via system share sheet** — email, messaging, cloud storage apps
7. **Export includes both original and converted amounts** for multi-currency expenses
8. **PDF includes app branding** and export timestamp for professional appearance

### Research Flag
**Skip research** — Standard CSV/PDF generation libraries, file system APIs well-documented.

---

## Phase 9: Polish & Settings

**Goal:** Users can customize app appearance, language, and access final app information.

**Phase Rationale:** Completion phase for accessibility, theming, and user control. Final quality pass before v1 release.

### Dependencies
- All previous phases — settings control features from across the app

### Requirements (6)
| ID | Requirement |
|----|-------------|
| SET-01 | User can switch between Italian and English languages |
| SET-02 | User can toggle dark/light mode |
| SET-03 | User can follow system theme for dark/light mode |
| SET-04 | User can change default currency |
| SET-05 | User can clear all data (with confirmation) |
| SET-06 | User can view app version and privacy policy |

### Success Criteria
1. **User can switch language** between Italian and English, UI updates immediately
2. **User can toggle dark/light mode** with smooth transition (no jarring flashes)
3. **User can follow system theme** — respects OS dark mode setting automatically
4. **User can change default currency** and all displays update accordingly
5. **User can clear all data** with confirmation dialog (irreversible action protection)
6. **User can view app version** and privacy policy in settings screen
7. **Settings persist across sessions** and sync if cloud enabled
8. **App passes accessibility audit** — screen reader support, contrast ratios, font scaling

### Research Flag
**Skip research** — Standard theming and localization patterns. Needs performance testing with realistic data volumes.

---

## Phase Dependencies Graph

```
Phase 1: Foundation
    │
    ├──→ Phase 2: Core Expense Management
    │       │
    │       ├──→ Phase 3: Budgeting
    │       │       │
    │       │       ├──→ Phase 4: Dashboard & AI Insights
    │       │       │
    │       │       └──→ Phase 7: Notifications
    │       │
    │       ├──→ Phase 5: Receipt Capture & OCR
    │       │
    │       └──→ Phase 6: Offline-First & Sync
    │               │
    │               └──→ Phase 7: Notifications (local scheduling)
    │
    └──→ Phase 8: Data Export (requires file system from Foundation)
            │
            └──→ Phase 9: Polish & Settings (requires all previous)
```

**Key Dependencies:**
- All features depend on Foundation (Phase 1)
- Budgeting (3) and OCR (5) both depend on Core Expense (2)
- AI Insights (4) needs Budgets (3) and Expenses (2)
- Sync (6) built on top of Offline (6-OFF) and Expense (2)
- Notifications (7) need Budgets (3) for alerts and Sync (6) for offline scheduling
- Export (8) needs Expenses (2) and Budgets (3)
- Settings (9) controls all previous phases

---

## Coverage Validation

### Requirement to Phase Mapping

| Category | Phase | Requirement IDs | Count |
|----------|-------|-----------------|-------|
| Authentication | Phase 1 | AUTH-01 to AUTH-06 | 6 |
| Core + Categories + Currency | Phase 2 | CORE-01 to CORE-07, CAT-01 to CAT-09, CURR-01 to CURR-07 | 23 |
| Budgeting | Phase 3 | BDGT-01 to BDGT-08 | 8 |
| Reports + AI | Phase 4 | RPT-01 to RPT-08, AI-01 to AI-06 | 14 |
| Receipt OCR | Phase 5 | OCR-01 to OCR-09 | 9 |
| Offline + Sync | Phase 6 | OFF-01 to OFF-08, SYNC-01 to SYNC-07 | 15 |
| Notifications | Phase 7 | NOTF-01 to NOTF-06 | 6 |
| Data Export | Phase 8 | EXP-01 to EXP-06 | 6 |
| Settings | Phase 9 | SET-01 to SET-06 | 6 |

### Coverage Summary

| Metric | Value |
|--------|-------|
| **Total v1 Requirements** | 93 |
| **Requirements Mapped** | 93 |
| **Orphaned Requirements** | 0 ✓ |
| **Duplicate Mappings** | 0 ✓ |
| **Coverage** | 100% ✓ |

### Verification

- ✓ All AUTH requirements → Phase 1
- ✓ All CORE, CAT, CURR requirements → Phase 2
- ✓ All BDGT requirements → Phase 3
- ✓ All RPT, AI requirements → Phase 4
- ✓ All OCR requirements → Phase 5
- ✓ All OFF, SYNC requirements → Phase 6
- ✓ All NOTF requirements → Phase 7
- ✓ All EXP requirements → Phase 8
- ✓ All SET requirements → Phase 9

---

## Progress Tracking

| Phase | Status | Date Started | Date Completed | Requirements Complete |
|-------|--------|--------------|----------------|----------------------|
| 1 - Foundation | 🔵 Planned | — | — | 0/6 |
| 2 - Core Expense | ⚪ Not Started | — | — | 0/23 |
| 3 - Budgeting | ⚪ Not Started | — | — | 0/8 |
| 4 - Dashboard & AI | ⚪ Not Started | — | — | 0/14 |
| 5 - Receipt OCR | ⚪ Not Started | — | — | 0/9 |
| 6 - Offline & Sync | ⚪ Not Started | — | — | 0/15 |
| 7 - Notifications | ⚪ Not Started | — | — | 0/6 |
| 8 - Data Export | ⚪ Not Started | — | — | 0/6 |
| 9 - Polish | ⚪ Not Started | — | — | 0/6 |

**Legend:**
- 🔴 Blocked — Dependencies not met
- 🟡 In Progress — Currently executing
- 🟢 Complete — All success criteria met
- 🔵 Planned — Ready to start
- ⚪ Not Started — Awaiting previous phase

---

## Phase Ordering Rationale

1. **Foundation First:** Security, i18n, and database schema are architectural foundations. Expensive to change later.

2. **Manual Entry Before OCR:** Italy has high cash usage—manual entry is primary use case. OCR is convenience feature requiring significant UX investment (permissions, correction workflows).

3. **Categories Before Budgets:** Budgets need categories to track against. Natural dependency.

4. **Budgets Before AI Insights:** AI needs spending history and budget context to generate meaningful suggestions.

5. **Core Features Before OCR:** Receipt capture built on expense creation from Phase 2. Share data models and validation logic.

6. **Offline Before Sync:** Users expect offline functionality; sync is value-add. Building sync on working offline architecture is easier than retrofitting offline into cloud-first app.

7. **Notifications After Budgets:** Budget alerts require budget thresholds to monitor. Weekly summaries need spending history.

8. **Export Last:** Export needs mature data model with all features integrated. CSV/PDF templates need final field definitions.

9. **Settings Always Last:** Settings control features from all phases. Final integration and polish phase.

---

## Research Flags Summary

| Phase | Research Needed | Topics |
|-------|-----------------|--------|
| 4 - Dashboard & AI | YES | ML categorization model, spending pattern analysis |
| 5 - Receipt OCR | YES | OCR accuracy tuning, ML Kit config, Italian receipt parsing |
| 6 - Offline & Sync | YES | Conflict resolution strategies (CRDTs), UUID patterns |
| 1, 2, 3, 7, 8, 9 | NO | Standard patterns well-documented |

**Action:** Schedule `/gsd-research-phase` before planning phases 4, 5, and 6.

---

## Success Criteria Summary

| Phase | Criteria Count | Key Observable Behaviors |
|-------|----------------|--------------------------|
| 1 | 6 | Launch, signup, login, password reset, skip onboarding, localization |
| 2 | 9 | Add/edit/delete expenses, browse history, search/filter, categories, tags, multi-currency |
| 3 | 6 | Set budgets, track progress, view overview, disable categories, visual alerts |
| 4 | 12 | Dashboard, bar/pie/trend charts, time switching, top categories, AI insights, savings suggestions |
| 5 | 10 | QR scanning, photo capture, OCR extraction, confidence scores, manual correction, offline processing |
| 6 | 12 | Full offline mode, queue sync, auto/manual sync, multi-device, conflict resolution, encryption |
| 7 | 7 | Budget alerts (80%/100%), weekly summary, toggle types, set time, offline scheduling |
| 8 | 8 | CSV export, PDF reports, date range, category filter, device storage, share sheet |
| 9 | 8 | Language switch, dark/light mode, system theme, currency change, clear data, version info |

**Total Success Criteria:** 78

---

*Roadmap created: 2025-03-02*  
*Next step: `/gsd-plan-phase 1` to begin Phase 1 planning*
