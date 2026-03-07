# Feature Landscape

**Domain:** Mobile Expense Tracking App
**Researched:** 2026-03-02
**Confidence:** MEDIUM (based on competitor analysis and industry research)

## Table Stakes

Features users expect. Missing these = product feels incomplete.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Receipt Photo Capture** | Users want to digitize paper receipts without manual entry | MEDIUM | Core differentiator if done well with OCR. YNAB, Copilot, Dext all have this. |
| **Manual Expense Entry** | Quick-add for cash expenses or missed receipts | LOW | Essential fallback. Needs category selection, amount, date, note fields. |
| **Expense Categories** | Basic organization (Food, Transport, Utilities, etc.) | LOW | Standard categories expected. Custom categories are table stakes too. |
| **Monthly Budgeting** | Set spending limits per category | MEDIUM | YNAB pioneered zero-based budgeting; Copilot has rollover budgets. |
| **Spending Reports/Charts** | Visualize where money goes | MEDIUM | Pie charts, bar charts, trend lines. Export to CSV/PDF expected. |
| **Multi-Currency Support** | EU market requires EUR, but also USD, GBP | MEDIUM | Essential for travelers and online purchases. |
| **Offline Mode** | Users expect to log expenses anywhere | HIGH | Requires local storage + sync when online. Differentiating feature if seamless. |
| **Data Export** | CSV/PDF for tax/accounting purposes | LOW | GDPR compliance + user trust. Standard across all apps. |
| **Recurring Expenses** | Subscriptions, rent, bills tracking | MEDIUM | Copilot auto-detects subscriptions; users expect this insight. |
| **Search & Filter** | Find past expenses quickly | LOW | By date, category, amount, merchant. Table stakes. |

## Differentiators

Features that set product apart. Not expected, but valued.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **QR Code Receipt Scanning** | EU digital receipts (Italy's Scontrino Elettronico) - instant, accurate capture | HIGH | Major differentiator for EU market. No OCR errors. Italy mandates digital receipts. |
| **AI Smart Categorization** | Auto-categorizes based on merchant/amount patterns | HIGH | Copilot's key feature. Requires ML model + training data. |
| **AI Savings Coach** | Personalized tips based on spending patterns | HIGH | Unique positioning. Requires spending analysis + recommendation engine. |
| **Budget Rollovers** | Unspent budget rolls to next month | MEDIUM | Copilot has this; YNAB uses "age your money" philosophy. Valuable for savers. |
| **Subscription Detection** | Automatically identifies recurring subscriptions | MEDIUM | Copilot feature. Helps users find forgotten subscriptions. |
| **Spending Insights/Anomalies** | Alerts for unusual spending | MEDIUM | "You spent 40% more on dining this month" - proactive insights. |
| **Goal Tracking** | Save for specific goals (vacation, emergency fund) | MEDIUM | YNAB's target feature. Visual progress tracking motivates users. |
| **Group Expense Splitting** | Split bills with friends/roommates | HIGH | Tricount's core feature. Complex settlement calculations. |
| **Bank Integration** | Direct import from bank accounts | HIGH | Open Banking/PSD2 in EU. High trust barrier but huge convenience. |
| **Receipt Image Storage** | Archive receipt photos for warranty/tax | MEDIUM | Dext focuses on this. 10-year storage for tax compliance. |
| **Weekly Summary Notifications** | Digest of week's spending | LOW | Engagement feature. Push notification with insights. |
| **Budget Alert Notifications** | Warn when approaching limits | LOW | Real-time alerts prevent overspending. |

## Anti-Features

Features to explicitly NOT build.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| **Investment Tracking** | Scope creep - requires live market data, complex integrations | Stay focused on expenses. Partner with investment apps if needed later. |
| **Net Worth Tracking** | Requires linking all accounts (bank, investments, loans) - trust nightmare | Focus on cash flow and spending behavior. Simpler = better for MVP. |
| **Bill Pay/Transfers** | Becomes a neobank, massive regulatory burden | Integrate with existing payment apps (PayPal, Revolut, etc.) |
| **Social Sharing** | Privacy concerns for financial data | Private sharing only (group splits with explicit invites) |
| **Gamification** | Points/badges feel childish for serious finance app | Use progress visualization and goal achievement instead |
| **Ads/Sponsored Content** | Destroys trust in financial app | Premium subscription model or freemium with clear value |
| **Too Many Categories** | Analysis paralysis | Start with 10-15 smart categories. AI suggestions reduce cognitive load. |
| **Complex Budgeting Methods** | YNAB's method is powerful but has learning curve | Offer simple mode + advanced mode. Default to simple. |
| **Mandatory Account Linking** | Users don't trust apps with bank access | Manual entry first, optional linking later |
| **Real-time Sync Required** | Creates dependency on connectivity | Offline-first design with background sync |

## Feature Dependencies

```
[Receipt Photo Capture]
    └──requires──> [OCR Engine]
        └──requires──> [Image Preprocessing]

[AI Smart Categorization]
    └──requires──> [Expense Entry] (training data)
    └──requires──> [Categories]
    └──enhances──> [Manual Expense Entry] (suggestions)

[QR Code Scanning]
    └──requires──> [Camera Access]
    └──requires──> [Digital Receipt Parser]

[Budget Tracking]
    └──requires──> [Categories]
    └──requires──> [Expense Entry]
    └──enhances──> [Spending Reports]

[Offline Mode]
    └──requires──> [Local Database]
    └──requires──> [Sync Engine]

[Group Expense Splitting]
    └──requires──> [User Accounts]
    └──requires──> [Sharing/Invites]
    └──conflicts──> [Offline Mode] (complex sync)

[Data Export]
    └──requires──> [Reports/Charts]

[AI Savings Coach]
    └──requires──> [Spending History] (3+ months)
    └──requires──> [AI Smart Categorization]
    └──requires──> [Budget Tracking]
```

### Dependency Notes

- **AI features require data**: AI categorization and coaching need 2-3 months of user data to be effective. Launch with manual + simple rules first.
- **Offline-first enables trust**: Users in EU (especially Italy) may have connectivity concerns. Offline capability builds trust before asking for bank access.
- **QR scanning differentiates in EU**: Italy's Scontrino Elettronico (electronic receipt) system makes QR scanning a major advantage over US-centric apps.
- **Group splitting conflicts with offline**: Real-time settlement calculations require server coordination. Defer or make async-only.

## MVP Definition

### Launch With (v1)

Minimum viable product — what's needed to validate the concept.

- [ ] **Receipt Photo Capture** — Basic camera integration, store images
- [ ] **QR Code Scanning** — Italy Scontrino Elettronico support (major EU differentiator)
- [ ] **Basic OCR** — Extract amount, date, merchant (even if not perfect)
- [ ] **Manual Expense Entry** — Fallback when OCR fails, quick add with category
- [ ] **15 Standard Categories** — Food, Transport, Utilities, Shopping, Healthcare, Entertainment, etc.
- [ ] **Monthly Budget per Category** — Simple limit with progress bar
- [ ] **Spending Charts** — Monthly pie chart, category breakdown
- [ ] **Offline Mode** — SQLite local storage, queue for sync
- [ ] **Data Export (CSV)** — User trust, tax compliance
- [ ] **Multi-Currency (EUR, USD, GBP)** — EU market requirement
- [ ] **Budget Alerts** — Push notification at 80% of budget

### Add After Validation (v1.x)

Features to add once core is working and users are retained.

- [ ] **AI Smart Categorization** — ML model trained on user data
- [ ] **Receipt Image Gallery** — Browse all receipt photos
- [ ] **Recurring Expense Detection** — Auto-identify subscriptions
- [ ] **Weekly Summary Notifications** — Engagement, spending digest
- [ ] **Tags/Filters** — More flexible organization
- [ ] **Search & Advanced Filters** — Find expenses by date range, amount
- [ ] **PDF Export** — Professional reports for accounting

### Future Consideration (v2+)

Features to defer until product-market fit is established.

- [ ] **AI Savings Coach** — Requires mature spending history, complex ML
- [ ] **Budget Rollovers** — Advanced budgeting feature
- [ ] **Goal Tracking** — Savings targets with visual progress
- [ ] **Group Expense Splitting** — Complex settlement logic, user management
- [ ] **Bank Integration (Open Banking)** — PSD2 integration, high compliance overhead
- [ ] **Subscription Management** — Full subscription tracking with cancellation suggestions
- [ ] **Spending Anomaly Detection** — Advanced ML insights
- [ ] **Web Dashboard** — Cross-platform sync beyond mobile

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Receipt Photo Capture | HIGH | MEDIUM | P1 |
| QR Code Scanning | HIGH | HIGH | P1 |
| Basic OCR | MEDIUM | MEDIUM | P1 |
| Manual Expense Entry | HIGH | LOW | P2 |
| Basic Categories | HIGH | LOW | P2 |
| Basic OCR | MEDIUM | MEDIUM | P1 |
| Monthly Budgeting | HIGH | MEDIUM | P1 |
| Spending Charts | MEDIUM | MEDIUM | P1 |
| Offline Mode | HIGH | HIGH | P1 |
| CSV Export | MEDIUM | LOW | P1 |
| Multi-Currency | MEDIUM | MEDIUM | P1 |
| Budget Alerts | MEDIUM | LOW | P1 |
| QR Code Scanning | HIGH | HIGH | P2 |
| AI Categorization | HIGH | HIGH | P2 |
| Receipt Gallery | MEDIUM | LOW | P2 |
| Recurring Detection | MEDIUM | MEDIUM | P2 |
| Weekly Summaries | MEDIUM | LOW | P2 |
| Tags/Filters | MEDIUM | LOW | P2 |
| PDF Export | LOW | LOW | P2 |
| AI Savings Coach | HIGH | HIGH | P3 |
| Budget Rollovers | MEDIUM | MEDIUM | P3 |
| Goal Tracking | MEDIUM | MEDIUM | P3 |
| Group Splitting | MEDIUM | HIGH | P3 |
| Bank Integration | HIGH | HIGH | P3 |

**Priority key:**
- P1: Must have for launch (MVP)
- P2: Should have, add when core is stable
- P3: Nice to have, future consideration

## Competitor Feature Analysis

| Feature | YNAB | Copilot Money | Dext | Tricount | Our Approach |
|---------|------|---------------|------|----------|--------------|
| **Receipt Scanning** | Photo only | Photo only | Photo + AI OCR | No | **Photo + QR (EU focus)** |
| **Expense Entry** | Manual + Bank | Manual + Bank | Photo focus | Manual | Manual first, bank later |
| **Budgeting Method** | Zero-based | Rollover | Project-based | Group split | Simple rollover |
| **AI Categorization** | Rules-based | Yes | Yes (99.9%) | No | **Yes, offline-first** |
| **Offline Support** | Limited | Limited | No | Yes | **Full offline-first** |
| **Group/Splitting** | No | No | Team mode | **Core feature** | Optional v2 |
| **Investment Tracking** | No | Yes | No | No | **No** (out of scope) |
| **Subscription Detection** | Manual | Yes | No | No | Yes (v1.x) |
| **EU Digital Receipts** | No | No | Limited | No | **Yes (differentiator)** |
| **Pricing** | $109/year | $95/year | £35+/month | Free | Freemium |

## Key Insights for Italian/EU Market

1. **QR Code Advantage**: Italy's Scontrino Elettronico (electronic receipt system) generates QR codes on all receipts. No competitor focuses on this — major differentiation opportunity.

2. **Offline-First Trust**: EU users are privacy-conscious. Offline-first design builds trust before asking for sensitive permissions or bank access.

3. **Cash Culture**: Italy still has high cash usage compared to Nordic countries. Manual entry + receipt scanning more important than bank sync for MVP.

4. **GDPR Compliance**: Data export and local storage align with EU privacy expectations. Cloud sync should be optional, not required.

5. **Multi-Language**: Italian language support essential. English as fallback.

6. **Tax Compliance**: Italian residents need expense tracking for tax deductions (medical, work-related). PDF export with official formatting valuable.

## Sources

- YNAB Features: https://www.youneedabudget.com/features/
- Copilot Money: https://www.copilot.money (Apple Design Awards finalist, AI categorization)
- Dext (formerly Receipt Bank): https://www.dext.com/en (business focus, 99.9% OCR accuracy)
- Tricount: https://www.tricount.com/en (group expense splitting, 21M users)
- Receipt Wikipedia: https://en.wikipedia.org/wiki/Receipt (digital receipt trends)
- Italian Scontrino Elettronico regulations (knowledge base)

---
*Feature research for: ExpenseTracker mobile app*
*Researched: 2026-03-02*
*Confidence: MEDIUM (based on competitor analysis and market research)*
