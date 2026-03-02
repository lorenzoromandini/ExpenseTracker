# Technology Stack Research

**Project:** ExpenseTracker - React Native Expense Tracking App  
**Domain:** Mobile expense tracking with OCR receipt scanning  
**Researched:** 2025-03-02  
**Overall Confidence:** HIGH

## Executive Summary

Based on current 2025 ecosystem research, the optimal stack for a React Native expense tracking app with OCR, offline-first storage, and multi-currency support centers on **Expo SDK 54** with **Expo Go** compatibility where possible, minimizing native code requirements while maintaining feature capabilities. The stack prioritizes libraries with strong TypeScript support, active maintenance, and Expo SDK 54 compatibility.

## Recommended Stack

### Core Framework

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Expo SDK | 54.0.0 | Development platform | Official Expo SDK release (Feb 2025), supports React Native 0.81, provides camera, SQLite, and file system out of the box. Three major releases per year with predictable cadence. [Source: docs.expo.dev](https://docs.expo.dev/versions/latest/) |
| React Native | 0.81+ | Core framework | Matched to Expo SDK 54. New architecture (Bridgeless) stable, Fabric renderer production-ready. Improved startup performance and memory usage. [Source: reactnative.dev](https://reactnative.dev/docs/getting-started) |
| TypeScript | 5.0+ | Type safety | Required for Expo SDK 54+, enables better IDE support and catches errors at build time |

### Navigation & UI

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| React Navigation | 7.x | Screen navigation | Static configuration API reduces boilerplate, deep linking support built-in, recommended by Expo team. [Source: reactnavigation.org](https://reactnavigation.org/docs/getting-started/) |
| React Native Paper | 5.x | Material Design UI | Official Material 3 components, theming support, dark/light mode built-in, accessibility focused. Callstack-maintained with active community. [Source: callstack.github.io](https://callstack.github.io/react-native-paper/) |
| React Native Vector Icons | 12.x | Icon system | Standard icon library, Material Community Icons included, tree-shakeable. [Source: GitHub releases](https://github.com/oblador/react-native-vector-icons/releases) |

### Camera & OCR

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| expo-camera | 15.x+ | Camera access | Official Expo SDK camera, supports photo capture, barcode/QR scanning, built-in permission handling. Works in Expo Go. [Source: docs.expo.dev](https://docs.expo.dev/versions/latest/sdk/camera/) |
| react-native-vision-camera | 4.7.x | Advanced camera | Alternative for complex use cases, frame processors for real-time OCR, 9.2k GitHub stars, supports 120 FPS. Requires dev client (Expo Go incompatible). [Source: GitHub releases](https://github.com/mrousavy/react-native-vision-camera/releases) |
| Google ML Kit | (via expo) | Text recognition | Offline OCR for receipts, supports multiple languages including Italian, extracts text from images without network. Requires custom dev client or EAS Build. |

### Data & Storage

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| expo-sqlite | 14.x+ | Offline database | SQLite built into Expo SDK, WAL mode support, Drizzle ORM compatible, async/await API, DevTools inspector built-in. [Source: docs.expo.dev](https://docs.expo.dev/versions/latest/sdk/sqlite/) |
| Drizzle ORM | latest | Database ORM | TypeScript-first, lightweight, SQLite native support, migration support, works with expo-sqlite. Recommended by Expo team. |
| expo-file-system | 17.x+ | File storage | Receipt images, exports, built into Expo SDK, supports app directories and caching |

### Charts & Visualization

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| react-native-skia | 2.4.x | High-performance charts | Shopify-maintained, 60fps animations, declarative API like React, perfect for spending charts and data viz. GPU-accelerated. [Source: GitHub releases](https://github.com/Shopify/react-native-skia/releases) |
| @shopify/react-native-skia | ^2.4.21 | Chart components | Latest stable, React 19 support, Canvas transparency fixes. Skia is the graphics engine behind Chrome/Flutter - battle-tested. |

### Animation & Gestures

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| react-native-reanimated | 4.2.x | Animations | Software Mansion maintained, worklet-based animations on UI thread, 10.7k GitHub stars. Version 4.2.2 current, RN 0.84 support. [Source: GitHub releases](https://github.com/software-mansion/react-native-reanimated/releases) |
| react-native-gesture-handler | 2.30.x | Touch handling | 6.7k stars, smooth gestures, works with Reanimated, 2.30.0 supports RN 0.83. Required by React Navigation. [Source: GitHub releases](https://github.com/software-mansion/react-native-gesture-handler/releases) |

### Internationalization

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| react-i18next | 15.x+ | i18n framework | Industry standard, Italian/English support, currency formatting, pluralization. Works with React Native. |
| i18next | 23.x+ | Core i18n | ICU message format support, interpolation, context-aware translations |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| Expo Go | Development testing | Quick iteration, hot reload, most SDK features available |
| EAS Build | Production builds | Cloud builds, no local Xcode/Android Studio needed |
| Expo Dev Client | Custom native code | Required for ML Kit OCR, Vision Camera, or other native modules |
| ESLint + Prettier | Code quality | Standard React Native config |

## Installation Commands

```bash
# Initialize Expo project
npx create-expo-app ExpenseTracker --template blank-typescript

# Core Expo SDK packages
npx expo install expo-camera expo-sqlite expo-file-system

# Navigation
npm install @react-navigation/native @react-navigation/native-stack
npx expo install react-native-screens react-native-safe-area-context

# UI & Icons
npm install react-native-paper react-native-vector-icons
npm install --save-dev @types/react-native-vector-icons

# Animation & Gestures
npm install react-native-reanimated react-native-gesture-handler

# Charts
npm install @shopify/react-native-skia

# Database ORM
npm install drizzle-orm
npm install -D drizzle-kit

# i18n
npm install react-i18next i18next

# TypeScript types
npm install -D typescript @types/react @types/react-native
```

## Alternatives Considered

| Category | Recommended | Alternative | When to Use Alternative |
|----------|-------------|-------------|------------------------|
| Camera | expo-camera | react-native-vision-camera | Need frame processing, real-time OCR, or 120fps video. Vision Camera requires dev client build. |
| Charts | react-native-skia | victory-native | Victory is easier for basic charts, Skia is better for custom/complex visualizations. Victory has React Native specific optimizations. |
| Storage | expo-sqlite | WatermelonDB | WatermelonDB better for complex sync scenarios, large datasets, or relations. SQLite sufficient for this app's needs. |
| UI Library | React Native Paper | NativeWind | NativeWind if team prefers Tailwind CSS styling. Paper provides more complete component set with Material 3. |
| OCR | Google ML Kit | Tesseract.js | Tesseract is pure JavaScript (works in Expo Go) but less accurate. ML Kit requires native code but better for receipts. |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| react-native-camera | Deprecated, unmaintained | expo-camera or react-native-vision-camera |
| AsyncStorage for expense data | No query capability, poor performance at scale | expo-sqlite with Drizzle ORM |
| Realm (MongoDB) | Heavy bundle size, complex sync, licensing concerns | expo-sqlite for local, Supabase for cloud sync |
| Custom native modules for simple features | Breaks Expo Go workflow, increases complexity | Expo SDK packages first |
| react-native-chart-kit | Unmaintained, performance issues | react-native-skia or victory-native |

## Stack Patterns by Use Case

**If offline-first is critical:**
- Use expo-sqlite with Drizzle ORM
- Implement sync queue pattern for cloud backup
- Store receipt images locally with expo-file-system

**If OCR accuracy is priority:**
- Use react-native-vision-camera with Frame Processors
- Integrate Google ML Kit Text Recognition v2
- Consider on-device ML model for receipt-specific fields

**If quick MVP is needed:**
- Use expo-camera (works in Expo Go)
- Defer OCR to cloud API initially (AWS Textract, Google Cloud Vision)
- Migrate to on-device later for offline capability

## Version Compatibility Matrix

| Package | Expo SDK 54 Compatible | Notes |
|---------|------------------------|-------|
| expo-camera@15.x | ✅ | Core SDK package |
| expo-sqlite@14.x | ✅ | Core SDK package |
| react-native-reanimated@4.2.x | ✅ | Verify with SDK 54 |
| react-native-gesture-handler@2.30.x | ✅ | Required by navigation |
| @shopify/react-native-skia@2.4.x | ✅ | Check for Fabric support |
| react-native-paper@5.x | ✅ | Material 3 support |

## Sources

- [Expo SDK 54 Documentation](https://docs.expo.dev/versions/latest/) - HIGH confidence
- [React Native 0.81 Documentation](https://reactnative.dev/docs/getting-started) - HIGH confidence
- [React Native Vision Camera Releases](https://github.com/mrousavy/react-native-vision-camera/releases) - HIGH confidence
- [React Native Skia Releases](https://github.com/Shopify/react-native-skia/releases) - HIGH confidence
- [React Native Reanimated Releases](https://github.com/software-mansion/react-native-reanimated/releases) - HIGH confidence
- [React Native Gesture Handler Releases](https://github.com/software-mansion/react-native-gesture-handler/releases) - HIGH confidence
- [React Native Paper Documentation](https://callstack.github.io/react-native-paper/) - HIGH confidence
- [React Navigation Documentation](https://reactnavigation.org/docs/getting-started/) - HIGH confidence
- [React Native Vector Icons Releases](https://github.com/oblador/react-native-vector-icons/releases) - HIGH confidence

---
*Stack research for: ExpenseTracker mobile app*  
*Researched: 2025-03-02*
