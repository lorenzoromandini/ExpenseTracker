# Requirements: ExpenseTracker

**Defined:** 2025-03-02
**Core Value:** Users can effortlessly track expenses by scanning receipts and immediately understand their spending patterns with actionable savings insights.

---

## v1 Requirements

### Authentication & Onboarding

- [ ] **AUTH-01**: User can create account with email and password
- [ ] **AUTH-02**: User can log in with existing credentials
- [ ] **AUTH-03**: User can reset password via email link
- [ ] **AUTH-04**: User can enable cloud sync (optional) after account creation
- [ ] **AUTH-05**: User can complete onboarding to start using app

### Core Expense Management

- [ ] **CORE-01**: User can add expense manually with amount, date, category, note
- [ ] **CORE-02**: User can edit existing expense details
- [ ] **CORE-03**: User can delete expenses with confirmation
- [ ] **CORE-04**: User can view expense history in chronological list
- [ ] **CORE-05**: User can search expenses by merchant, amount, or note
- [ ] **CORE-06**: User can filter expenses by date range and category
- [ ] **CORE-07**: User can view expense details in full-screen modal

### Receipt Capture & OCR

- [ ] **OCR-01**: User can scan QR codes on receipts (Italy Scontrino Elettronico)
- [ ] **OCR-02**: User can capture receipt photo with camera
- [ ] **OCR-03**: System extracts merchant name from receipt image
- [ ] **OCR-04**: System extracts transaction date from receipt image
- [ ] **OCR-05**: System extracts total amount from receipt image
- [ ] **OCR-06**: System extracts VAT/tax amount if visible on receipt
- [ ] **OCR-07**: User can review and edit extracted fields before saving
- [ ] **OCR-08**: User can retry capture if extraction fails
- [ ] **OCR-09**: System shows confidence score for OCR results

### Categories & Organization

- [ ] **CAT-01**: User can categorize expenses into predefined categories
- [ ] **CAT-02**: User can create custom categories with icons
- [ ] **CAT-03**: User can edit category names and icons
- [ ] **CAT-04**: User can delete unused custom categories
- [ ] **CAT-05**: User can assign multiple tags to expenses
- [ ] **CAT-06**: User can create custom tags
- [ ] **CAT-07**: System provides default categories: Spesa (Groceries), Svago (Entertainment), Trasporti (Transport), Bollette (Utilities), Salute (Health), Shopping, Viaggi (Travel), Abbonamenti (Subscriptions), Altro (Other)
- [ ] **CAT-08**: User can mark expenses as recurring/subscription
- [ ] **CAT-09**: System auto-detects potential recurring expenses

### Budgeting

- [ ] **BDGT-01**: User can set monthly budget per category
- [ ] **BDGT-02**: User can edit budget amounts anytime
- [ ] **BDGT-03**: User can view current month spending vs budget
- [ ] **BDGT-04**: User can view budget progress as percentage and amount
- [ ] **BDGT-05**: User can view remaining budget per category
- [ ] **BDGT-06**: System tracks budget usage automatically
- [ ] **BDGT-07**: User can see total monthly budget overview
- [ ] **BDGT-08**: User can disable budgets for specific categories

### Multi-Currency Support

- [ ] **CURR-01**: User can set default currency (EUR default for Italian users)
- [ ] **CURR-02**: User can select currency when adding expense
- [ ] **CURR-03**: System converts foreign currency to default using live rates
- [ ] **CURR-04**: User can view both original and converted amounts
- [ ] **CURR-05**: System updates exchange rates periodically (weekly)
- [ ] **CURR-06**: System supports EUR, USD, GBP at minimum
- [ ] **CURR-07**: System displays currency symbol per expense

### Dashboard & Reports

- [ ] **RPT-01**: User can view current month total expenses on dashboard
- [ ] **RPT-02**: User can view weekly spending bar chart
- [ ] **RPT-03**: User can view category breakdown pie chart
- [ ] **RPT-04**: User can view monthly spending trend line chart
- [ ] **RPT-05**: User can switch between weekly, monthly, yearly views
- [ ] **RPT-06**: User can view top spending categories
- [ ] **RPT-07**: User can compare current vs previous month spending
- [ ] **RPT-08**: User can view spending insights (e.g., "Spent 20% more on dining")

### AI Savings Coach

- [ ] **AI-01**: System analyzes spending patterns monthly
- [ ] **AI-02**: System provides personalized savings suggestions
- [ ] **AI-03**: User can view savings potential for each category
- [ ] **AI-04**: System detects spending anomalies (unusual amounts)
- [ ] **AI-05**: System suggests budget adjustments based on history
- [ ] **AI-06**: User can dismiss or save suggestions for later

### Data Export & Backup

- [ ] **EXP-01**: User can export expenses as CSV file
- [ ] **EXP-02**: User can export monthly report as PDF
- [ ] **EXP-03**: User can select date range for export
- [ ] **EXP-04**: User can filter exports by category
- [ ] **EXP-05**: System saves exports to device storage
- [ ] **EXP-06**: User can share exports via standard share sheet

### Notifications

- [ ] **NOTF-01**: User receives push notification at 80% of category budget
- [ ] **NOTF-02**: User receives push notification at 100% of category budget
- [ ] **NOTF-03**: User receives weekly spending summary notification
- [ ] **NOTF-04**: User can enable/disable notification types
- [ ] **NOTF-05**: User can set notification time preferences
- [ ] **NOTF-06**: System schedules local notifications (works offline)

### Settings & Preferences

- [ ] **SET-01**: User can switch between Italian and English languages
- [ ] **SET-02**: User can toggle dark/light mode
- [ ] **SET-03**: User can follow system theme for dark/light mode
- [ ] **SET-04**: User can change default currency
- [ ] **SET-05**: User can clear all data (with confirmation)
- [ ] **SET-06**: User can view app version and privacy policy

### Offline-First Architecture

- [ ] **OFF-01**: App works fully without internet connection
- [ ] **OFF-02**: User can add expenses offline
- [ ] **OFF-03**: User can view all data offline
- [ ] **OFF-04**: User can capture receipts offline
- [ ] **OFF-05**: OCR processing works offline
- [ ] **OFF-06**: System queues sync operations when offline
- [ ] **OFF-07**: System syncs automatically when connection restored
- [ ] **OFF-08**: User can force manual sync

### Data Storage & Sync

- [ ] **SYNC-01**: Data stored locally in SQLite database
- [ ] **SYNC-02**: User can enable cloud sync (optional)
- [ ] **SYNC-03**: System syncs data to cloud when enabled
- [ ] **SYNC-04**: System resolves sync conflicts automatically
- [ ] **SYNC-05**: User can sync across multiple devices
- [ ] **SYNC-06**: System encrypts data at rest locally
- [ ] **SYNC-07**: System encrypts data in transit to cloud

---

## v2 Requirements

### Advanced Budgeting

- **BDGT-09**: User can set budget rollovers (unspent rolls to next month)
- **BDGT-10**: User can set annual budgets
- **BDGT-11**: User can set custom budget periods (bi-weekly, custom dates)
- **BDGT-12**: System provides budget forecasting based on trends

### Enhanced AI Features

- **AI-07**: System provides AI-powered smart categorization
- **AI-08**: System learns user categorization patterns over time
- **AI-09**: System provides subscription cancellation suggestions
- **AI-10**: System detects duplicate expenses
- **AI-11**: System provides merchant-specific spending insights

### Goal Tracking

- **GOAL-01**: User can create savings goals (e.g., "Vacation €2000")
- **GOAL-02**: User can set target dates for goals
- **GOAL-03**: User can allocate budget surplus to goals
- **GOAL-04**: User can view goal progress with visual indicators
- **GOAL-05**: System suggests monthly savings amounts to reach goals

### Advanced Reports

- **RPT-09**: User can customize dashboard widgets
- **RPT-10**: User can view year-over-year comparisons
- **RPT-11**: User can generate tax-deductible expense reports
- **RPT-12**: User can annotate charts with notes
- **RPT-13**: User can schedule automatic report generation

### Group Features

- **GRP-01**: User can create expense groups (trips, shared bills)
- **GRP-02**: User can invite others to groups
- **GRP-03**: System calculates expense splits automatically
- **GRP-04**: User can settle debts within groups
- **GRP-05**: User can export group expense summaries

### Bank Integration

- **BANK-01**: User can connect bank accounts via Open Banking
- **BANK-02**: System imports transactions automatically
- **BANK-03**: User can match imported transactions to receipts
- **BANK-04**: System categorizes imported transactions
- **BANK-05**: User can view account balances

### Additional Features

- **OCR-10**: User can scan multiple receipts in batch
- **OCR-11**: System supports handwritten receipt OCR
- **CAT-10**: User can set category spending goals
- **EXP-03**: User can export to accounting software formats (QIF, OFX)
- **NOTF-07**: User receives smart alerts for unusual spending
- **SYNC-08**: User can export/backup entire database

---

## Out of Scope

| Feature | Reason |
|---------|--------|
| **Investment tracking** | Scope creep - requires live market data, complex integrations. Focus on expenses only. |
| **Net worth calculation** | Requires linking all financial accounts (bank, investments, loans) - major trust barrier. |
| **Bill payment/transfers** | Becomes a neobank, massive regulatory burden and compliance requirements. |
| **Social sharing features** | Privacy concerns for financial data. Group splitting (v2) will use private invitations only. |
| **Gamification/badges** | Points/badges feel childish for serious finance app. Use progress visualization instead. |
| **Advertisements** | Destroys trust in financial app. Use freemium or premium model instead. |
| **Web app** | Mobile-first strategy. Web dashboard deferred to v2+ if needed. |
| **Receipt image storage** | Privacy + storage concerns. Store extracted data only, not images. |
| **Real-time collaboration** | Complex sync conflicts, not core to personal expense tracking. |
| **Advanced ML on-device** | High battery drain, large model sizes. Cloud fallback acceptable for complex cases. |

---

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| AUTH-01 | Phase 1 | Pending |
| AUTH-02 | Phase 1 | Pending |
| AUTH-03 | Phase 1 | Pending |
| AUTH-04 | Phase 1 | Pending |
| AUTH-05 | Phase 1 | Pending |
| AUTH-06 | Phase 1 | Pending |
| CORE-01 | Phase 2 | Pending |
| CORE-02 | Phase 2 | Pending |
| CORE-03 | Phase 2 | Pending |
| CORE-04 | Phase 2 | Pending |
| CORE-05 | Phase 2 | Pending |
| CORE-06 | Phase 2 | Pending |
| CORE-07 | Phase 2 | Pending |
| CAT-01 | Phase 2 | Pending |
| CAT-02 | Phase 2 | Pending |
| CAT-03 | Phase 2 | Pending |
| CAT-04 | Phase 2 | Pending |
| CAT-05 | Phase 2 | Pending |
| CAT-06 | Phase 2 | Pending |
| CAT-07 | Phase 2 | Pending |
| CAT-08 | Phase 2 | Pending |
| CAT-09 | Phase 2 | Pending |
| CURR-01 | Phase 2 | Pending |
| CURR-02 | Phase 2 | Pending |
| CURR-03 | Phase 2 | Pending |
| CURR-04 | Phase 2 | Pending |
| CURR-05 | Phase 2 | Pending |
| CURR-06 | Phase 2 | Pending |
| CURR-07 | Phase 2 | Pending |
| BDGT-01 | Phase 3 | Pending |
| BDGT-02 | Phase 3 | Pending |
| BDGT-03 | Phase 3 | Pending |
| BDGT-04 | Phase 3 | Pending |
| BDGT-05 | Phase 3 | Pending |
| BDGT-06 | Phase 3 | Pending |
| BDGT-07 | Phase 3 | Pending |
| BDGT-08 | Phase 3 | Pending |
| RPT-01 | Phase 4 | Pending |
| RPT-02 | Phase 4 | Pending |
| RPT-03 | Phase 4 | Pending |
| RPT-04 | Phase 4 | Pending |
| RPT-05 | Phase 4 | Pending |
| RPT-06 | Phase 4 | Pending |
| RPT-07 | Phase 4 | Pending |
| RPT-08 | Phase 4 | Pending |
| AI-01 | Phase 4 | Pending |
| AI-02 | Phase 4 | Pending |
| AI-03 | Phase 4 | Pending |
| AI-04 | Phase 4 | Pending |
| AI-05 | Phase 4 | Pending |
| AI-06 | Phase 4 | Pending |
| OCR-01 | Phase 5 | Pending |
| OCR-02 | Phase 5 | Pending |
| OCR-03 | Phase 5 | Pending |
| OCR-04 | Phase 5 | Pending |
| OCR-05 | Phase 5 | Pending |
| OCR-06 | Phase 5 | Pending |
| OCR-07 | Phase 5 | Pending |
| OCR-08 | Phase 5 | Pending |
| OCR-09 | Phase 5 | Pending |
| OFF-01 | Phase 6 | Pending |
| OFF-02 | Phase 6 | Pending |
| OFF-03 | Phase 6 | Pending |
| OFF-04 | Phase 6 | Pending |
| OFF-05 | Phase 6 | Pending |
| OFF-06 | Phase 6 | Pending |
| OFF-07 | Phase 6 | Pending |
| OFF-08 | Phase 6 | Pending |
| SYNC-01 | Phase 6 | Pending |
| SYNC-02 | Phase 6 | Pending |
| SYNC-03 | Phase 6 | Pending |
| SYNC-04 | Phase 6 | Pending |
| SYNC-05 | Phase 6 | Pending |
| SYNC-06 | Phase 6 | Pending |
| SYNC-07 | Phase 6 | Pending |
| NOTF-01 | Phase 7 | Pending |
| NOTF-02 | Phase 7 | Pending |
| NOTF-03 | Phase 7 | Pending |
| NOTF-04 | Phase 7 | Pending |
| NOTF-05 | Phase 7 | Pending |
| NOTF-06 | Phase 7 | Pending |
| EXP-01 | Phase 8 | Pending |
| EXP-02 | Phase 8 | Pending |
| EXP-03 | Phase 8 | Pending |
| EXP-04 | Phase 8 | Pending |
| EXP-05 | Phase 8 | Pending |
| EXP-06 | Phase 8 | Pending |
| SET-01 | Phase 9 | Pending |
| SET-02 | Phase 9 | Pending |
| SET-03 | Phase 9 | Pending |
| SET-04 | Phase 9 | Pending |
| SET-05 | Phase 9 | Pending |
| SET-06 | Phase 9 | Pending |

**Coverage:**
- v1 requirements: 95 total
- Mapped to phases: 95
- Unmapped: 0 ✓

---

*Requirements defined: 2025-03-02*
*Last updated: 2025-03-02 after initial definition*
