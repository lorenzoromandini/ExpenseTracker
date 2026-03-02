# ExpenseTracker

## What This Is

A hybrid mobile expense tracking app for iOS and Android that enables users to scan receipts (QR codes and photos), automatically extract expense data using OCR, categorize expenses with smart rules, set budgets, and receive AI-powered savings insights. Built with an offline-first design and Italian/European market focus.

## Core Value

Users can effortlessly track expenses by scanning receipts and immediately understand their spending patterns with actionable savings insights.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Receipt scanning via QR code and photo with OCR data extraction
- [ ] Multi-currency expense tracking with real-time conversion
- [ ] Smart auto-categorization with Italian and English categories
- [ ] Budget management with progress tracking and notifications
- [ ] Visual reports (charts) for spending analysis
- [ ] AI savings coach with personalized insights
- [ ] Offline-first data storage with optional cloud sync
- [ ] Italian and English localization
- [ ] Dark/light mode support
- [ ] CSV/PDF export for monthly reports
- [ ] Push notifications for budget alerts and weekly summaries

### Out of Scope

- Social/sharing features — Not core to personal expense tracking
- Multi-user collaboration — Single-user app focus for v1
- Web app — Mobile-first, web later if needed
- Advanced AI/cloud OCR — Prioritize offline OCR, optional cloud fallback only
- Real-time sync — Optional backup sync, not real-time collaboration
- Investment tracking — Pure expense/savings focus
- Receipt image storage — Store extracted data, not images (privacy + storage)

## Context

### Technical Environment

- **Platform:** React Native with Expo (bare workflow for camera/OCR flexibility)
- **Target:** iOS and Android hybrid mobile app
- **Storage:** Offline-first with WatermelonDB, Realm, or SQLite via expo-sqlite
- **OCR Options:** react-native-executorch with EasyOCR (preferred), react-native-tesseract-ocr fallback, optional OCR.space cloud API
- **Camera:** react-native-vision-camera for high-quality capture
- **Charts:** victory-native or react-native-chart-kit
- **UI:** React Native Paper or Tamagui for Material 3 design
- **State:** Zustand or Jotai
- **Navigation:** React Navigation
- **Currency:** exchangerate-api.com for conversion rates

### Market Focus

- Italian market priority with EU digital receipt support (QR codes common)
- English secondary language support
- European VAT/tax receipt handling
- Local-first privacy design

### User Experience Goals

- Minimal friction: Scan → Review → Done in under 10 seconds
- Immediate feedback on spending against budgets
- Proactive savings suggestions based on spending patterns

## Constraints

- **Tech Stack:** React Native/Expo — Mature ecosystem, best offline support
- **OCR Accuracy:** Offline OCR quality varies; cloud fallback adds cost/privacy trade-off
- **Storage:** Local SQLite for offline; optional Firebase/Supabase for backup
- **Privacy:** Receipt data stays local; cloud only with explicit opt-in
- **Performance:** App must work smoothly on mid-range devices
- **Battery:** OCR processing should be efficient for mobile

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| React Native over Flutter | Stronger ecosystem, better library support for OCR/camera | — Pending |
| Offline-first architecture | Privacy, works without connectivity, instant response | — Pending |
| Italian categories as default | Primary market, familiar terminology for users | — Pending |
| WatermelonDB for local storage | Performance, offline-first design, easy sync | — Pending |
| Rule-based auto-categorization | Fast, no external API calls, predictable behavior | — Pending |

---
*Last updated: 2025-03-02 after initialization*
