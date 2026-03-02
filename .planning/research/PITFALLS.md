# Domain Pitfalls: ExpenseTracker React Native App

**Domain:** React Native Mobile Expense Tracking with OCR, Offline Storage, and Camera
**Researched:** 2026-03-02
**Confidence:** MEDIUM

---

## Critical Pitfalls

### Pitfall 1: OCR Accuracy Degradation in Real-World Conditions

**What goes wrong:**
Receipt OCR fails catastrophically in low-light conditions, with crumpled receipts, or on non-white backgrounds. Merchant names are truncated, dates misread, and totals extracted incorrectly. Users lose trust after 2-3 failed scans and abandon the feature.

**Why it happens:**
- Testing only on pristine, flat, well-lit receipts
- Not accounting for camera focus issues, glare, shadows, and fold marks
- Using on-device ML models with limited training data
- No fallback UI for manual correction when OCR confidence is low

**Consequences:**
- Users abandon camera scanning, resort to manual entry
- Data corruption from incorrect amounts/dates
- Negative app store reviews mentioning "broken" OCR
- Refund requests for premium OCR features

**Prevention:**
- Implement pre-capture validation (lighting detection, edge detection overlay)
- Add confidence scores and manual correction workflow for low-confidence extractions
- Use hybrid approach: on-device model for speed + cloud API for accuracy (configurable)
- Design "scan guidance" UI: alignment guides, lighting warnings, retry prompts
- Test with 100+ real receipts in various conditions before release

**Warning signs:**
- OCR confidence scores consistently below 70%
- User support tickets about "wrong amounts"
- High rate of manual edits after scans
- Receipt images rejected by backend validation

**Phase to address:** Phase 2 (OCR Integration) - must build guidance UI and confidence scoring into MVP

---

### Pitfall 2: Offline Data Sync Conflicts and Data Loss

**What goes wrong:**
Users enter expenses offline, then sync on multiple devices. Conflicts arise: same expense created on phone and tablet, different edits on each device. Data is overwritten or duplicated. Users lose transactions or see phantom duplicates.

**Why it happens:**
- Naive "last write wins" sync strategy
- No conflict detection for concurrent edits
- No unique identifiers for offline-created records
- Local timestamps unreliable across devices
- Sync triggered at wrong times (mid-edit, during poor connectivity)

**Consequences:**
- Duplicate expenses in reports
- Missing transactions users "know they entered"
- Inability to trust budget calculations
- Users resort to spreadsheet backups, defeating app purpose

**Prevention:**
- Implement CRDT (Conflict-free Replicated Data Types) or operational transforms
- Assign UUIDs to all records at creation (never rely on server-assigned IDs)
- Use vector clocks or logical timestamps for conflict resolution
- Build conflict resolution UI: "Select which version to keep" with diff view
- Queue sync operations with retry logic, exponential backoff
- Store sync status indicators: "Pending sync", "Synced", "Conflict detected"

**Warning signs:**
- Duplicate expenses appearing after sync
- Disappearing expenses after device switch
- Sync status stuck on "Syncing..."
- Database size growing without new data (orphaned records)

**Phase to address:** Phase 3 (Offline Storage & Sync) - requires sophisticated sync architecture from day one

---

### Pitfall 3: Camera Permission UX Death Spiral

**What goes wrong:**
User denies camera permission on first launch. App shows generic error or crashes. User tries to scan receipt, nothing happens, assumes app is broken, leaves negative review, uninstalls.

**Why it happens:**
- Requesting permission at app launch before user sees value
- No graceful degradation (allow manual photo selection)
- Poor error messages ("Permission denied" vs. "Camera access lets you scan receipts")
- No recovery path if permission denied
- iOS 14+ requires additional photo library permission for saved receipts

**Consequences:**
- 40%+ of users never grant camera permission
- Core feature (receipt scanning) unusable for many users
- Poor app store conversion
- High uninstall rate within first session

**Prevention:**
- Request permission contextually: when user taps "Scan Receipt" button
- Show value proposition before system dialog: "Camera lets you scan receipts in 3 seconds"
- Implement "manual upload" as fallback for denied permission
- Deep link to Settings if permission previously denied
- Track permission grant rate and A/B test timing
- Test on both iOS (limited photos permission) and Android (runtime permissions)

**Warning signs:**
- Permission grant rate below 60%
- High drop-off at camera screen
- Support tickets: "Camera doesn't work"
- Analytics showing users tapping "Deny" on permission prompt

**Phase to address:** Phase 2 (Camera Integration) - UX flow must be designed before implementation

---

### Pitfall 4: App Size Bloat from ML Libraries

**What goes wrong:**
App download size exceeds 150MB. Users on limited data plans or with storage-constrained devices skip download or uninstall quickly. OCR model bundled with app adds 40-80MB. TensorFlow Lite or ML Kit dependencies balloon size.

**Why it happens:**
- Including full OCR model in initial download (not on-demand)
- Using multiple ML frameworks (TFLite + ML Kit + Vision)
- Not stripping debug symbols or splitting APK/ABI
- Downloading models for all languages when user needs one

**Consequences:**
- High acquisition cost (users abandon long downloads)
- Poor conversion on Play Store (size shown prominently)
- Uninstalls from low-storage devices (emerging markets)
- Negative reviews: "Too big for what it does"

**Prevention:**
- Implement dynamic feature modules (Android) / on-demand resources (iOS)
- Use cloud OCR as default, download on-device model only if user opts-in
- Split APK by ABI (arm64-v8a, armeabi-v7a separately)
- Compress models with quantization (FP16, INT8)
- Monitor size with every PR using CI/CD size reports
- Target: <50MB for core app, <100MB with optional OCR model

**Warning signs:**
- APK size growing >20MB per sprint without new features
- User complaints about download size
- Low install completion rate
- High uninstall rate on devices with <2GB free storage

**Phase to address:** Phase 1 (Core Setup) - CI/CD size tracking and modular architecture must be established early

---

### Pitfall 5: Battery Drain from Background Processing

**What goes wrong:**
App drains 20-30% battery per day even when "not in use". OCR processing continues in background. Location services stay active for merchant lookup. Push notification polling is aggressive. Users force-close app or uninstall.

**Why it happens:**
- OCR runs on main thread without cancellation
- No background task throttling
- Camera preview keeps running when app backgrounded
- Continuous network polling for sync instead of push notifications
- GPS left active after merchant detection

**Consequences:**
- Users uninstall citing battery issues
- App appears in system battery reports as "High usage"
- Background termination by OS (iOS especially aggressive)
- Loss of push notification reliability

**Prevention:**
- Use WorkManager (Android) / BGTaskScheduler (iOS) for background OCR
- Implement aggressive cancellation when app backgrounds
- Batch sync operations every 15-30 minutes, not continuous
- Use geofencing instead of constant GPS for merchant detection
- Profile with Android Profiler / Xcode Energy Log
- Set battery budget: background processing <5% per day

**Warning signs:**
- Users reporting battery drain in reviews
- App in "High battery usage" system list
- High rate of background terminations
- Sync operations failing due to Doze/App Standby (Android)

**Phase to address:** Phase 3 (Offline Storage) - background sync architecture and Phase 2 (OCR) - processing optimization

---

### Pitfall 6: Receipt Data Privacy Exposure

**What goes wrong:**
Receipts contain sensitive data (credit card last 4 digits, account numbers, location data). These are stored unencrypted locally, synced to cloud without encryption, or sent to third-party OCR services in plaintext. Data breach or compliance violation occurs.

**Why it happens:**
- Assuming AsyncStorage/redux-persist "secure enough"
- Not encrypting SQLite database at rest
- Sending full receipt images to cloud OCR without user consent
- Storing extracted data without encryption keys tied to device
- Not understanding GDPR/CCPA requirements for financial data

**Consequences:**
- Regulatory fines (GDPR: up to 4% revenue)
- Reputational damage from data breach
- Mandatory app removal from stores
- Class action lawsuits
- Loss of enterprise/B2B opportunities requiring SOC2

**Prevention:**
- Use react-native-keychain or EncryptedStorage for sensitive data
- Encrypt SQLite database with SQLCipher or similar
- Implement local OCR first, cloud as opt-in with explicit consent
- Store images encrypted, decrypt only for display/processing
- Conduct privacy impact assessment before release
- Provide "Delete all data" GDPR-compliant flow
- Never store credit card numbers or full account numbers

**Warning signs:**
- Security audit flags
- User requests for data deletion can't be fulfilled
- Receipt images accessible in device file system
- Third-party OCR service reports data retention policy

**Phase to address:** Phase 1 (Core Setup) - security architecture must be designed in, not bolted on

---

## Moderate Pitfalls

### Pitfall 7: FlatList Performance Collapse with Large Transaction History

**What goes wrong:**
Transaction list becomes sluggish after 200+ entries. Scroll performance drops to 30 FPS. Images load slowly causing jank. Memory usage grows unbounded. App crashes on low-end devices.

**Why it happens:**
- Using ScrollView instead of FlatList
- Not implementing getItemLayout or keyExtractor properly
- Loading full-resolution receipt images in list view
- No virtualization - rendering all items even offscreen
- Memory leaks from closure captures in renderItem

**Consequences:**
- Poor UX for power users with many transactions
- App crashes on older Android devices
- Negative reviews about "laggy" interface
- Increased memory pressure causing background termination

**Prevention:**
- Use @shopify/flash-list (drop-in FlatList replacement with recycling)
- Implement proper keyExtractor with stable IDs
- Use getItemLayout for fixed-height items
- Thumbnail images in list (<50KB), full image only on detail view
- Implement windowSize and maxToRenderPerBatch tuning
- Test with 1000+ transactions on low-end device (Android Go)

**Phase to address:** Phase 2 (Transaction List) - must optimize list performance before adding features

---

### Pitfall 8: Push Notification Overload

**What goes wrong:**
Budget alerts fire too frequently (every transaction), users disable notifications entirely. Or notifications are "dumb" - just say "Budget exceeded" without context. Users ignore them.

**Why it happens:**
- Alert threshold too sensitive (every transaction near limit)
- No smart grouping (5 transactions in 10 minutes = 5 notifications)
- No rich notifications with charts or quick actions
- Sending notifications at wrong times (3 AM)

**Consequences:**
- Users disable all notifications (lose retention channel)
- Notifications ignored (no engagement lift)
- App uninstalled due to "spammy" notifications
- Push certificate revoked due to high bounce rates

**Prevention:**
- Implement smart thresholds: alert at 80%, 95%, 100% of budget
- Batch rapid transactions: "3 new expenses, $45 total"
- Use rich notifications with mini chart preview
- Respect quiet hours (8 PM - 8 AM local time)
- Allow granular notification settings per category
- Implement notification analytics: open rate, action taken

**Phase to address:** Phase 4 (Budget Alerts) - notification strategy should be tested with users

---

### Pitfall 9: Currency and Locale Handling Bugs

**What goes wrong:**
App assumes $ as currency. VAT calculations wrong for countries with included tax. Date formats cause confusion (01/02/2024 = Jan 2 or Feb 1?). Decimal separators break parsing (1,000.50 vs 1.000,50).

**Why it happens:**
- Hardcoded USD assumptions
- Not using Intl API for number/date formatting
- VAT extraction logic assumes US-style separate tax
- Testing only in one locale

**Consequences:**
- Wrong expense totals for international users
- Expenses sorted incorrectly by date
- OCR fails on non-US receipts
- App unusable in major markets (EU, Asia)

**Prevention:**
- Use react-native-localize for device locale
- Implement Intl.NumberFormat for all currency display
- Store all amounts as integer cents to avoid float errors
- Extract locale from receipt (language detection) not just device
- Test with: USD, EUR, GBP, JPY, INR receipts
- Handle currency conversion rates with timestamp (rate at purchase date)

**Phase to address:** Phase 1 (Core Setup) - internationalization must be built-in from start

---

### Pitfall 10: Chart Rendering Performance Issues

**What goes wrong:**
Spending charts stutter when animating. Recharts or chart library causes JS thread to drop frames. Complex charts (pie, bar, line) rendered on main thread block UI.

**Why it happens:**
- Using pure JS chart libraries (victory-native, react-native-chart-kit)
- Calculating complex SVG paths on every render
- Animating all data points simultaneously
- Not using shouldComponentUpdate or memo

**Consequences:**
- Charts feel "laggy" on older devices
- App freezes during chart animation
- Users skip analytics features
- Memory leaks from unmounted chart components

**Prevention:**
- Use @shopify/react-native-skia for GPU-accelerated rendering
- Limit data points: aggregate daily, not individual transactions
- Implement windowing for time-series charts
- Animate only visible elements
- Use worklet-based animations (react-native-reanimated) when possible
- Simplify chart designs: fewer colors, no gradients on low-end devices

**Phase to address:** Phase 4 (Charts) - performance test charts with 1 year of data before shipping

---

## Minor Pitfalls

### Pitfall 11: Redux State Bloat

**What goes wrong:**
Redux store grows to 50MB+ with receipt images in base64. App launch time increases to 10+ seconds. State persistence becomes unreliable.

**Prevention:**
- Never store images in Redux state
- Use react-native-fs or MMKV for image storage, store only paths
- Implement state normalization (receipts, categories, separate slices)
- Use Redux Persist with whitelist/blacklist for selective persistence

**Phase to address:** Phase 1 (Core Setup) - state architecture review

---

### Pitfall 12: Console.log in Production

**What goes wrong:**
Production app has console.log statements. Sensitive data logged. Performance degraded. Reactotron/debugger code bundled in release.

**Prevention:**
- Use babel-plugin-transform-remove-console in production
- Separate logger that disables in __DEV__ === false
- Code review check for console statements
- CI/CD check for debugger imports

**Phase to address:** Phase 1 (Core Setup) - build configuration

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Store images in AsyncStorage | Quick to implement | App bloat, performance death | Never |
| Skip encryption for MVP | Faster development | Rewrite for security, compliance risk | Never |
| Use expo-camera for rapid prototyping | Zero native setup | Limited features, performance issues | Prototype only - replace before beta |
| Client-side only sync (no server) | No backend to build | No multi-device support, no backup | MVP only - plan server from day one |
| Single currency (USD) | Simpler UI, calculations | Major refactor for international | Only if US-only for first 6 months |
| Ignore accessibility | Faster UI development | Legal liability, excluded users | Never - include from start |

---

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| **Google ML Kit OCR** | Bundle all language models | Download language-specific models on-demand |
| **AWS Rekognition** | Send full-resolution images | Compress/resize before upload, use presigned URLs |
| **Firebase** | Enable offline persistence without conflict handling | Implement custom conflict resolution logic |
| **react-native-vision-camera** | Use deprecated V3 Frame Processor API | Migrate to V4 Plugin API with worklets |
| **react-native-keychain** | Store large data blobs | Store encryption key only, data in encrypted storage |
| **SQLite** | Run queries on main thread | Use react-native-quick-sqlite or async wrapper |

---

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Synchronous storage writes | UI freeze on save | Use async storage APIs, batch writes | 50+ transactions |
| Unoptimized images | 200MB app size, slow load | Compress to WebP, thumbnail generation | 100+ receipts |
| No pagination | 10s+ list load times | Implement cursor-based pagination | 500+ transactions |
| Re-renders on every keystroke | Keyboard lag, dropped frames | Debounce search, use memo | Real-time search enabled |
| Full database sync | 30s+ initial sync time | Sync only last 30 days by default, lazy load history | 1000+ transactions |

---

## Security Mistakes

| Mistake | Risk | Prevention |
|---------|------|------------|
| Receipt images in camera roll | Data exposure, accidental sharing | Store in app-private directory |
| JWT in AsyncStorage | Token theft via XSS, backup exposure | Use react-native-keychain (Keychain/Keystore) |
| No certificate pinning | Man-in-the-middle attacks | Implement SSL pinning for API calls |
| Debug mode in production | Information disclosure | Build flags to strip debug code |
| Logging sensitive data | Data breach, compliance violation | Sanitize logs, structured logging only |

---

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Mandatory account creation | 60% abandonment at onboarding | Allow guest mode, sync optional |
| No empty states | Confusion about next steps | Show "Scan your first receipt" CTA |
| Missing loading states | Think app is frozen | Skeleton screens, progress indicators |
| Poor error messages | "Something went wrong" | Actionable errors: "Can't reach server. Retry?" |
| No undo | Accidental deletion frustration | 5-second undo toast |
| Category selection friction | Too many taps per expense | ML-based auto-categorization with quick edit |

---

## "Looks Done But Isn't" Checklist

- [ ] **OCR:** Works with crumpled receipts in dim lighting — verify with 10 real-world receipts
- [ ] **Sync:** Conflict resolution UI implemented — test simultaneous edit on two devices
- [ ] **Camera:** Permission denial handled gracefully — verify manual upload works
- [ ] **Security:** Database encrypted at rest — verify no plaintext in device file system
- [ ] **Performance:** List scrolls at 60 FPS with 500+ items — test on low-end Android device
- [ ] **Accessibility:** Screen reader can navigate all flows — test with VoiceOver/TalkBack
- [ ] **Offline:** App usable with zero connectivity — verify airplane mode for 1 hour
- [ ] **Battery:** Background usage <5% per day — check system battery report

---

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| OCR accuracy issues | MEDIUM | Implement hybrid cloud OCR, add manual correction flow, resync with better model |
| Sync conflicts | HIGH | Implement migration to CRDT, reconcile existing conflicts with user intervention |
| App size bloat | MEDIUM | Modularize with dynamic features, purge existing users must reinstall |
| Data privacy breach | CRITICAL | Immediate security patch, mandatory password reset, legal notification, audit |
| Battery drain | LOW | Push update with background throttling, no user action needed |

---

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| OCR Accuracy | Phase 2 | Test 100 receipts, <10% require manual correction |
| Sync Conflicts | Phase 3 | Two-device test, conflict resolution UI functional |
| Camera Permissions | Phase 2 | Permission grant rate >70%, manual upload fallback works |
| App Size | Phase 1 | CI/CD size gates, <50MB APK |
| Battery Drain | Phase 3 | Profiling shows <5% background usage |
| Privacy/Security | Phase 1 | Security audit, encryption verification |
| List Performance | Phase 2 | 60 FPS scroll with 1000 items |
| Notification Overload | Phase 4 | User testing, <5% opt-out rate |
| Currency/Locale | Phase 1 | Test with 5 currencies, 3 date formats |
| Chart Performance | Phase 4 | 60 FPS animations with 1 year of data |

---

## Sources

- React Native Performance Documentation (reactnative.dev/docs/performance) - Feb 2026
- react-native-vision-camera GitHub (mrousavy/react-native-vision-camera) - 9.2k stars, actively maintained
- react-native-keychain GitHub (oblador/react-native-keychain) - 3.4k stars, used by MetaMask
- FlashList GitHub (Shopify/flash-list) - 7k stars, recommended FlatList replacement
- MDN Storage API Documentation (developer.mozilla.org) - Storage quotas and eviction criteria
- react-native-skia GitHub (Shopify/react-native-skia) - 8.2k stars, GPU-accelerated graphics
- microfuzz GitHub (Nozbe/microfuzz) - Search implementation reference
- React Native PermissionsAndroid Documentation (reactnative.dev/docs/permissionsandroid) - Feb 2026

---

*Pitfalls research for: ExpenseTracker React Native App*
*Researched: 2026-03-02*
*Confidence: MEDIUM - based on React Native 0.84 documentation, actively maintained libraries, and domain-specific mobile app best practices*
