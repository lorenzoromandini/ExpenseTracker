# Project Research Summary

**Project:** ExpenseTracker
**Domain:** Mobile Expense Tracking App with OCR Receipt Scanning
**Researched:** 2026-03-02
**Confidence:** HIGH

## Executive Summary

ExpenseTracker is a React Native mobile application targeting the EU personal finance market, with a key differentiation: support for Italy's Scontrino Elettronico (electronic receipt QR codes) alongside traditional receipt scanning. The recommended approach centers on an **offline-first architecture** using Expo SDK 54 with SQLite local storage, enabling users to track expenses without network connectivity—a critical trust-building feature for privacy-conscious EU users.

The tech stack emphasizes **Expo SDK 54** (React Native 0.81+) for rapid development and minimal native code requirements. Key technologies include WatermelonDB for reactive offline storage with conflict resolution, Google ML Kit for on-device OCR, and React Native Skia for GPU-accelerated spending charts. The architecture follows a clean service layer pattern to keep business logic testable and separate from UI components.

Critical risks center on **OCR accuracy in real-world conditions**, **data sync conflicts across devices**, and **camera permission UX**. These must be addressed proactively: implement hybrid on-device/cloud OCR with confidence scoring, use UUID-based records with CRDT conflict resolution, and request camera permission contextually with graceful fallbacks. App size management (keeping under 50MB) and battery optimization (background processing <5% daily) are also essential for retention.

## Key Findings

### Recommended Stack

Based on 2025 ecosystem research, the optimal stack prioritizes Expo SDK compatibility, offline-first capabilities, and TypeScript throughout. The core framework uses **Expo SDK 54** with React Native 0.81+, enabling access to built-in modules (camera, SQLite, file system) while maintaining Expo Go compatibility for rapid iteration.

For offline storage, **expo-sqlite** with **Drizzle ORM** provides type-safe, reactive queries with WAL mode support. This is preferable to alternatives like WatermelonDB (mentioned in architecture) because Drizzle has better Expo integration and doesn't require JSI configuration. Receipt OCR uses **Google ML Kit** via Expo (requires custom dev client) for on-device processing that works offline, with cloud OCR as a fallback for complex receipts.

Charts and visualizations use **@shopify/react-native-skia** for 60fps GPU-accelerated rendering—critical for smooth spending reports. UI components come from **React Native Paper 5.x** providing Material 3 design with built-in theming and accessibility.

**Core technologies:**
- **Expo SDK 54**: Development platform with built-in camera, SQLite, file system—minimal native code required
- **React Native 0.81+**: Core framework with new bridgeless architecture, Fabric renderer production-ready
- **expo-sqlite 14.x + Drizzle ORM**: Offline-first database with type-safe queries, reactive updates
- **expo-camera 15.x + Google ML Kit**: Receipt capture with on-device OCR, works offline
- **React Native Paper 5.x**: Material 3 components, dark/light mode, accessibility focused
- **@shopify/react-native-skia 2.4.x**: GPU-accelerated charts for spending visualizations
- **react-native-reanimated 4.2.x**: Worklet-based animations on UI thread, smooth gestures
- **react-i18next 15.x**: Internationalization with Italian/English support, currency formatting

### Expected Features

Research across YNAB, Copilot Money, Dext, and Tricount reveals clear user expectations for expense tracking apps. Users demand **receipt digitization** (photo + OCR), **manual entry for cash expenses**, **category-based organization**, **monthly budgeting**, and **visual spending reports**. EU market requires **multi-currency support** (EUR/USD/GBP) and **offline functionality**.

A key differentiator for the Italian/EU market is **QR code receipt scanning**—Italy's Scontrino Elettronico system generates QR codes on all receipts, enabling instant, error-free capture that no major competitor supports. **AI smart categorization** (learning from merchant/amount patterns) and **subscription detection** are competitive features from Copilot/Dext that increase engagement.

**Must have (table stakes):**
- **Manual Expense Entry** — Core functionality with category, amount, date, notes
- **15 Standard Categories** — Food, Transport, Utilities, Healthcare, etc.
- **Receipt Photo Capture** — Camera integration, image storage
- **Basic OCR** — Extract amount, date, merchant (with manual correction fallback)
- **Monthly Budget per Category** — Simple limits with progress indicators
- **Spending Charts** — Pie/bar charts showing category breakdown
- **Offline Mode** — Full functionality without network, queue for sync
- **CSV Export** — Tax/accounting compliance, user trust
- **Multi-Currency (EUR/USD/GBP)** — EU market requirement
- **Budget Alerts** — Push notifications at 80% of budget

**Should have (competitive):**
- **QR Code Scanning** — Italy Scontrino Elettronico support (major EU differentiator)
- **AI Smart Categorization** — Auto-categorize based on merchant/amount patterns
- **Recurring Expense Detection** — Identify subscriptions automatically
- **Receipt Image Gallery** — Browse and search receipt photos
- **Weekly Summary Notifications** — Engagement, spending digest

**Defer (v2+):**
- **AI Savings Coach** — Requires 3+ months of spending history, complex ML
- **Budget Rollovers** — Advanced budgeting for savers
- **Group Expense Splitting** — Complex settlement logic, user management
- **Bank Integration (Open Banking)** — PSD2 compliance, high trust barrier
- **Goal Tracking** — Savings targets with visual progress

### Architecture Approach

The recommended architecture follows a **layered pattern**: Presentation (Screens/Components) → Service Layer → Data Layer (SQLite/Drizzle) → External Services. This separation keeps business logic testable and UI components focused on presentation.

**Offline-first sync** is the core architectural pattern—all changes saved locally first, with a sync queue managing server reconciliation. Use **optimistic UI**: show success immediately, sync in background. Records must use UUIDs generated at creation (never server-assigned) to prevent conflicts. Implement proper **conflict resolution UI** showing diffs when same record edited on multiple devices.

**Major components:**
1. **Screens** — React Navigation routes, UI presentation, user interaction (Home, AddExpense, Reports, Settings)
2. **Services** — Business logic layer (ExpenseService, BudgetService, OCRService, SyncService) — testable, singletons
3. **Models** — Drizzle ORM schema with relations (Expense, Category, Budget tables)
4. **Camera/OCR Pipeline** — Capture receipt photos, process locally with ML Kit, fallback to cloud, parse extracted text
5. **Sync Engine** — Queue operations, retry with exponential backoff, conflict resolution, delta sync only

### Critical Pitfalls

Research identified six critical pitfalls that could sink the product if not addressed:

1. **OCR Accuracy Degradation** — Receipt OCR fails in low light, on crumpled receipts, with glare/shadows. Users lose trust after 2-3 failed scans. **Avoid:** Implement pre-capture validation (lighting detection, edge guides), confidence scoring with manual correction workflow, hybrid on-device + cloud OCR, scan guidance UI. Test with 100+ real receipts before release.

2. **Offline Sync Conflicts** — Naive "last write wins" causes duplicate or lost expenses when syncing across devices. **Avoid:** Use UUIDs at creation, implement CRDT conflict resolution, build conflict resolution UI with diff view, queue sync with retry logic, show sync status indicators.

3. **Camera Permission Death Spiral** — 40%+ of users deny camera permission if requested at launch before seeing value. **Avoid:** Request permission contextually (when user taps "Scan Receipt"), show value proposition first, implement manual upload fallback, deep link to Settings if previously denied, track grant rate and A/B test timing.

4. **App Size Bloat** — ML libraries (TensorFlow Lite, ML Kit) can bloat app to 150MB+. Users on limited data skip download. **Avoid:** Use cloud OCR by default, download on-device model only if user opts-in, split APK by ABI, compress models with quantization, monitor size with CI/CD gates. Target: <50MB core, <100MB with optional OCR model.

5. **Battery Drain from Background** — OCR processing, location services, aggressive sync polling can drain 20-30% battery daily. **Avoid:** Use WorkManager/BGTaskScheduler for background tasks, implement aggressive cancellation when app backgrounds, batch sync every 15-30 minutes, use geofencing instead of constant GPS, profile with Android Profiler/Xcode Energy Log.

6. **Receipt Data Privacy Exposure** — Receipts contain credit card digits, location data. Stored unencrypted or sent to cloud OCR without consent = GDPR violation. **Avoid:** Encrypt SQLite database with SQLCipher, store images encrypted in app-private directory, use local OCR first with explicit cloud opt-in, never store credit card numbers, conduct privacy impact assessment.

## Implications for Roadmap

Based on research, suggested phase structure:

### Phase 1: Foundation
**Rationale:** Core infrastructure must be solid before building features. App size, security, and internationalization are hard to retrofit.
**Delivers:** Project scaffolding, database schema, navigation, secure storage, i18n framework
**Uses:** Expo SDK 54, Drizzle ORM, React Navigation 7, react-i18next
**Avoids:** App size bloat (Pitfall 4), privacy exposure (Pitfall 6), currency/locale bugs (Pitfall 9)
**Research Flag:** Skip research—standard Expo setup patterns

### Phase 2: Core Expense Features
**Rationale:** Build table-stakes features first to validate user engagement before advanced features. Manual entry is more important than OCR for MVP—Italy has high cash usage.
**Delivers:** Manual expense entry, category management, basic budget tracking, transaction list with search
**Uses:** React Native Paper, expo-sqlite, React Native Skia charts
**Avoids:** Camera permission death spiral (Pitfall 3), FlatList performance collapse (Pitfall 7)
**Research Flag:** Skip research—well-documented patterns, but may need UX testing for category selection flow

### Phase 3: Receipt Capture & OCR
**Rationale:** Camera integration and OCR are complex, requiring careful UX and testing. Must be built on solid foundation from Phase 2.
**Delivers:** Camera integration, receipt photo capture, basic OCR with manual correction, QR code scanning (Italy differentiator)
**Uses:** expo-camera, Google ML Kit, image preprocessing
**Avoids:** OCR accuracy degradation (Pitfall 1), camera permission death spiral (Pitfall 3), battery drain (Pitfall 5)
**Research Flag:** Needs research—OCR integration specifics, ML Kit configuration, receipt parsing algorithms

### Phase 4: Intelligence & Sync
**Rationale:** AI features and cloud sync require user data history and mature sync architecture. These are "nice to have" for v1 but critical for retention.
**Delivers:** AI smart categorization, spending insights, background budget alerts, cloud sync with conflict resolution
**Uses:** Background tasks, ML categorization model, sync engine
**Avoids:** Sync conflicts (Pitfall 2), notification overload (Pitfall 8), battery drain (Pitfall 5)
**Research Flag:** Needs research—sync conflict resolution strategies, ML model training/deployment

### Phase 5: Polish & Reports
**Rationale:** Advanced reporting, PDF export, and performance optimization complete the MVP. Charts and performance must be tested with realistic data volumes.
**Delivers:** Advanced spending reports, PDF export, performance optimization, accessibility audit
**Uses:** React Native Skia for complex charts, background task scheduling
**Avoids:** Chart performance issues (Pitfall 10), notification overload (Pitfall 8)
**Research Flag:** Skip research—standard patterns, but needs performance testing

### Phase Ordering Rationale

- **Foundation first:** Security, app size, and internationalization are architectural decisions that are expensive to change later. They must be built in from the start.
- **Manual entry before OCR:** Research shows Italy has high cash usage—manual entry is the primary use case. OCR is a convenience feature that requires significant UX investment (permission handling, correction workflows).
- **Offline before sync:** Users expect offline functionality; sync is a value-add. Building sync on top of a working offline architecture is easier than retrofitting offline into a cloud-first app.
- **AI last:** Categorization and insights require training data—need months of user history before ML models are effective.

### Research Flags

**Phases needing deeper research during planning:**
- **Phase 3 (Receipt Capture):** OCR accuracy tuning, ML Kit configuration, receipt parsing regex/patterns—needs `/gsd-research-phase`
- **Phase 4 (Intelligence):** Sync conflict resolution strategies (CRDTs vs operational transforms), ML categorization model training—needs `/gsd-research-phase`

**Phases with standard patterns (skip research-phase):**
- **Phase 1 (Foundation):** Standard Expo setup, well-documented SQLite/Drizzle patterns
- **Phase 2 (Core Features):** Standard form handling, list virtualization with FlashList
- **Phase 5 (Polish):** Standard chart libraries, PDF generation patterns

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Expo SDK 54 is official current release (Feb 2025), all libraries actively maintained with clear compatibility |
| Features | MEDIUM | Based on competitor analysis and market research; user validation needed for EU-specific features like QR scanning |
| Architecture | HIGH | Layered architecture patterns are well-established in React Native community, offline-first patterns documented |
| Pitfalls | MEDIUM | Identified from community best practices and common failure modes; some mitigation strategies need validation |

**Overall confidence:** HIGH

The research draws from official Expo/React Native documentation, actively maintained library repositories (10k+ stars), and established mobile app patterns. The primary uncertainty is around OCR accuracy in real-world conditions and sync conflict resolution—both flagged for phase-specific research.

### Gaps to Address

- **OCR Accuracy Validation:** Research recommends hybrid on-device + cloud OCR, but actual accuracy rates need validation with Italian receipts. Plan user testing with 100+ real receipts during Phase 3.
- **Sync Conflict Strategy:** Research suggests CRDTs or operational transforms, but specific implementation (WatermelonDB sync vs custom) needs validation. Evaluate during Phase 4 planning.
- **QR Code Standard:** Italy's Scontrino Elettronico QR format needs verification. Research indicates it's standard, but actual parsing requirements need validation.
- **GDPR Compliance:** While general principles are clear, specific implementation (consent flows, data retention, deletion) needs legal review before release.
- **Bank Integration Timeline:** Open Banking/PSD2 integration is v2+, but timeline and compliance requirements should be researched if product-market fit is established.

## Sources

### Primary (HIGH confidence)
- [Expo SDK 54 Documentation](https://docs.expo.dev/versions/latest/) — Core platform capabilities, compatibility matrix
- [React Native 0.81 Documentation](https://reactnative.dev/docs/getting-started) — New architecture, Fabric renderer
- [Drizzle ORM Documentation](https://orm.drizzle.team/) — SQLite integration, type safety
- [React Native Paper](https://callstack.github.io/react-native-paper/) — Material 3 components, theming

### Secondary (MEDIUM confidence)
- [react-native-vision-camera GitHub](https://github.com/mrousavy/react-native-vision-camera) — 9.2k stars, camera implementation patterns
- [react-native-skia GitHub](https://github.com/Shopify/react-native-skia) — 8.2k stars, GPU-accelerated graphics
- [react-native-reanimated GitHub](https://github.com/software-mansion/react-native-reanimated) — 10.7k stars, animation patterns
- [FlashList GitHub](https://github.com/Shopify/flash-list) — 7k stars, list performance optimization
- YNAB, Copilot Money, Dext, Tricount competitor analysis — Feature expectations, market gaps

### Tertiary (LOW confidence - needs validation)
- Italian Scontrino Elettronico regulations — QR code format specifics need verification with actual receipts
- React Native performance best practices — Community consensus, may vary by device
- ML Kit OCR accuracy claims — Google's metrics, real-world performance needs validation

---
*Research completed: 2026-03-02*
*Ready for roadmap: yes*
