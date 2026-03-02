# ExpenseTracker

A hybrid mobile expense tracking app for iOS and Android with offline-first architecture, receipt scanning (QR codes and OCR), and AI-powered savings insights. Built with React Native and Expo, targeting the Italian and European markets.

## Features

- **Receipt Scanning**: Scan QR codes (Italy's Scontrino Elettronico) and capture receipt photos with OCR
- **Smart Categorization**: Rule-based auto-categorization with Italian categories
- **Budget Management**: Set monthly budgets per category with progress tracking
- **Multi-Currency**: Support for EUR, USD, GBP with real-time conversion
- **Offline-First**: Works without internet connection, optional cloud sync
- **AI Insights**: Spending analysis and personalized savings suggestions
- **Visual Reports**: Charts and reports for spending visualization
- **Data Export**: CSV and PDF export for accounting purposes

## Tech Stack

- **Framework**: React Native with Expo SDK 54
- **Navigation**: React Navigation 7
- **UI**: React Native Paper (Material 3)
- **Database**: SQLite with Drizzle ORM
- **Charts**: @shopify/react-native-skia
- **i18n**: react-i18next with Italian/English support
- **OCR**: Google ML Kit (on-device)
- **Storage**: expo-sqlite, expo-secure-store

## Project Structure

```
ExpenseTracker/
├── .planning/                 # Project planning documentation
│   ├── PROJECT.md            # Project context and requirements
│   ├── ROADMAP.md           # 9-phase development roadmap
│   ├── REQUIREMENTS.md     # 95 v1 requirements
│   ├── STATE.md             # Current project state
│   ├── config.json          # Workflow configuration
│   ├── research/            # Research outputs
│   │   ├── STACK.md        # Technology stack research
│   │   ├── FEATURES.md     # Feature analysis
│   │   ├── ARCHITECTURE.md # Architecture patterns
│   │   ├── PITFALLS.md     # Known risks
│   │   └── SUMMARY.md      # Synthesis
│   └── phases/             # Phase plans
│       └── 01-foundation/  # Phase 1: Foundation
│           ├── 01-01-PLAN.md
│           ├── 01-02-PLAN.md
│           ├── 01-03-PLAN.md
│           └── 01-04-PLAN.md
├── src/                     # Source code (generated)
├── package.json            # Dependencies (to be generated)
└── README.md               # This file
```

## Phase Roadmap

| Phase | Name | Status | Requirements |
|-------|------|--------|--------------|
| 1 | Foundation | 📝 Planned | 6 (Auth, Navigation, Database, i18n) |
| 2 | Core Expense | ⚪ Not Started | 23 (Manual entry, Categories, Currency) |
| 3 | Budgeting | ⚪ Not Started | 8 (Monthly budgets) |
| 4 | Dashboard & AI | ⚪ Not Started | 14 (Charts, Insights) |
| 5 | Receipt OCR | ⚪ Not Started | 9 (Camera, QR, OCR) |
| 6 | Offline & Sync | ⚪ Not Started | 15 (Sync, Encryption) |
| 7 | Notifications | ⚪ Not Started | 6 (Push alerts) |
| 8 | Data Export | ⚪ Not Started | 6 (CSV/PDF) |
| 9 | Polish | ⚪ Not Started | 6 (Settings, Theming) |

**Total**: 93 v1 requirements across 9 phases

## Current Status

**Phase 1: Foundation** - Planning Complete ✓

Phase 1 includes 4 plans:
- **01-01**: Expo project setup with TypeScript, ESLint, Prettier
- **01-02**: Navigation structure with auth screens
- **01-03**: Database setup (expo-sqlite + Drizzle ORM)
- **01-04**: i18n, theming, secure storage, auth context

## Getting Started (Planned)

Once Phase 1 is executed:

```bash
# Install dependencies
npm install

# Start Expo development server
npx expo start

# Run on iOS simulator
i

# Run on Android emulator
a
```

## Core Value

Users can effortlessly track expenses by scanning receipts and immediately understand their spending patterns with actionable savings insights.

## Target Market

- **Primary**: Italian market (Scontrino Elettronico QR support)
- **Secondary**: EU market (multi-currency, VAT handling)
- **Languages**: Italian (default), English
- **Currencies**: EUR (default), USD, GBP

## Architecture

- **Offline-First**: SQLite local database with optional cloud sync
- **Privacy-First**: Local data storage, encryption at rest
- **Type-Safe**: TypeScript throughout with Drizzle ORM
- **Modular**: Layered architecture (Presentation → Services → Data)

## Development

This project uses the GSD (Get Shit Done) workflow for structured project management. See `.planning/` directory for complete documentation.

## License

TBD

---

*Project initialized: 2025-03-02*  
*Next: Execute Phase 1 - Foundation*
