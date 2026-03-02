# Architecture Research: ExpenseTracker Mobile App

**Domain:** React Native Offline-First Expense Tracking  
**Researched:** March 2, 2026  
**Confidence:** HIGH

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           PRESENTATION LAYER                            │
├─────────────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Screens    │  │   Screens    │  │   Screens    │  │   Screens    │  │
│  │   Home/      │  │   Add        │  │  Reports/    │  │  Settings/   │  │
│  │   Dashboard  │  │   Expense    │  │  Charts      │  │  Insights    │  │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  │
│         │                 │                 │                 │          │
├─────────┴─────────────────┴─────────────────┴─────────────────┴──────────┤
│                            SERVICE LAYER                                │
├─────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────────┐ │
│  │ ExpenseService  │  │  BudgetService    │  │    SyncService          │ │
│  │ (CRUD, Query)   │  │ (Alerts, Goals) │  │ (WatermelonDB Sync)     │ │
│  └────────┬────────┘  └────────┬────────┘  └───────────┬─────────────┘ │
│           │                  │                        │               │
│  ┌────────┴────────┐  ┌──────┴──────────┐  ┌──────────┴─────────────┐ │
│  │  OCRService     │  │ ReportService   │  │ NotificationService    │ │
│  │ (Local/Cloud)   │  │ (Aggregations)  │  │ (Local + Push)         │ │
│  └─────────────────┘  └─────────────────┘  └────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────────┤
│                           DATA LAYER                                    │
├─────────────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────────────────┐    │
│  │                    WatermelonDB (SQLite)                         │    │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌──────────┐ │    │
│  │  │  Expense    │  │  Category   │  │   Budget    │  │   Goal   │ │    │
│  │  │    Model    │  │   Model     │  │   Model     │  │  Model   │ │    │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └──────────┘ │    │
│  └──────────────────────────────────────────────────────────────────┘    │
├─────────────────────────────────────────────────────────────────────────┤
│                      EXTERNAL SERVICES                                  │
├─────────────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                   │
│  │ OCR Engine   │  │  Firebase/   │  │   Push       │                   │
│  │ (ML Kit/     │  │  Supabase    │  │  Notification│                   │
│  │  Tesseract)  │  │  (Optional)  │  │   Service    │                   │
│  └──────────────┘  └──────────────┘  └──────────────┘                   │
└─────────────────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| **Screens** | UI presentation, user interaction handling | React components with hooks, React Navigation screens |
| **Services** | Business logic, orchestration between UI and data | Plain TypeScript classes/functions, singleton pattern |
| **Models** | Data structure definitions, relationships | WatermelonDB models with decorators |
| **Database** | Local persistence, querying, transactions | WatermelonDB adapter (SQLite) |
| **Sync Engine** | Conflict resolution, server synchronization | WatermelonDB sync primitives + custom sync adapter |
| **Camera Module** | Photo capture, QR scanning | expo-camera with custom overlay |
| **OCR Engine** | Text extraction from images | ML Kit Vision (on-device) or API fallback |
| **Notification Service** | Local alerts, scheduled reminders | expo-notifications with background tasks |

## Recommended Project Structure

```
ExpenseTracker/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── charts/           # Chart/visualization components
│   │   ├── forms/            # Form inputs, validation
│   │   ├── camera/           # Camera overlay, scanner UI
│   │   └── common/           # Buttons, cards, modals
│   ├── screens/              # Navigation screens
│   │   ├── Home/             # Dashboard screen
│   │   ├── AddExpense/       # Add expense flow
│   │   ├── Reports/          # Charts and analytics
│   │   ├── Insights/         # AI insights screen
│   │   └── Settings/         # App settings
│   ├── navigation/           # Navigation configuration
│   │   ├── AppNavigator.tsx  # Root navigator
│   │   └── types.ts          # Route type definitions
│   ├── services/             # Business logic layer
│   │   ├── expenseService.ts # Expense CRUD operations
│   │   ├── budgetService.ts  # Budget alerts, goals
│   │   ├── reportService.ts  # Aggregation queries
│   │   ├── syncService.ts    # Cloud sync orchestration
│   │   ├── ocrService.ts     # OCR processing
│   │   └── notificationService.ts # Push notifications
│   ├── models/               # WatermelonDB models
│   │   ├── Expense.ts        # Expense model
│   │   ├── Category.ts       # Category model
│   │   ├── Budget.ts         # Budget model
│   │   ├── Goal.ts           # Goal model
│   │   └── schema.ts         # Database schema
│   ├── hooks/                # Custom React hooks
│   │   ├── useExpenses.ts    # Expense data hook
│   │   ├── useBudgets.ts     # Budget data hook
│   │   └── useNetwork.ts     # Connectivity status
│   ├── utils/                # Utility functions
│   │   ├── formatters.ts     # Currency, date formatting
│   │   ├── validators.ts     # Input validation
│   │   └── constants.ts      # App constants
│   ├── types/                # Global TypeScript types
│   │   └── index.ts
│   └── App.tsx               # Root component
├── assets/                   # Images, fonts
├── ios/                      # iOS native project
├── android/                  # Android native project
├── app.json                  # Expo configuration
├── eas.json                  # EAS Build configuration
├── babel.config.js           # Babel configuration (decorators)
└── package.json
```

### Structure Rationale

- **components/**: Separates reusable UI from screen-specific logic, enabling consistency
- **screens/**: Each screen is a React Navigation route; keeps navigation logic isolated
- **services/**: Pure business logic layer, testable without React components
- **models/**: WatermelonDB models with relationships; decorators require Babel config
- **hooks/**: Custom hooks for reactive data (WatermelonDB withObservables integration)
- **navigation/**: Static configuration approach (recommended by React Navigation v7+)

## Architectural Patterns

### Pattern 1: Repository Pattern with WatermelonDB

**What:** Abstract database operations through service layer; WatermelonDB handles lazy loading and reactivity

**When to use:** All data access should go through service layer, never directly from components

**Trade-offs:** 
- Pro: Testable, swappable storage backend, reactive updates
- Con: Requires understanding of WatermelonDB query model

**Example:**
```typescript
// services/expenseService.ts
import { database } from '../models/schema';
import { Q } from '@nozbe/watermelondb';

export class ExpenseService {
  async getExpensesForMonth(year: number, month: number) {
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);
    
    return database.get('expenses').query(
      Q.where('date', Q.gte(startDate.getTime())),
      Q.where('date', Q.lte(endDate.getTime())),
      Q.sortBy('date', Q.desc)
    ).observe(); // Returns observable for reactive UI
  }

  async createExpense(data: ExpenseData) {
    return database.write(async () => {
      return database.get('expenses').create((expense: Expense) => {
        expense.amount = data.amount;
        expense.category.set(data.category); // Relation
        expense.date = data.date;
        expense.note = data.note;
        expense.isSynced = false; // Sync flag
      });
    });
  }
}
```

### Pattern 2: Offline-First Sync with Queue

**What:** All changes saved locally first; sync queue manages server reconciliation

**When to use:** Expense records must work offline; sync when connectivity returns

**Trade-offs:**
- Pro: App works without network; conflict resolution at sync time
- Con: Need to handle sync conflicts; UI must show sync status

**Example:**
```typescript
// services/syncService.ts
export class SyncService {
  private syncInProgress = false;

  async syncWithServer() {
    if (this.syncInProgress || !(await this.hasConnectivity())) return;
    
    this.syncInProgress = true;
    try {
      await synchronize({
        database,
        pullChanges: async ({ lastPulledAt }) => {
          const response = await fetch(`/api/sync?last_pulled_at=${lastPulledAt}`);
          return { changes: await response.json(), timestamp: Date.now() };
        },
        pushChanges: async ({ changes }) => {
          await fetch('/api/sync', {
            method: 'POST',
            body: JSON.stringify(changes)
          });
        },
        migrationsEnabledAtVersion: 1,
      });
    } finally {
      this.syncInProgress = false;
    }
  }
}
```

### Pattern 3: Service Layer for Business Logic

**What:** Isolate business rules from UI; services orchestrate between data and external APIs

**When to use:** Budget alerts, expense categorization, report generation

**Trade-offs:**
- Pro: Testable business logic; UI only handles presentation
- Con: Additional layer to maintain

**Example:**
```typescript
// services/budgetService.ts
export class BudgetService {
  constructor(
    private expenseService: ExpenseService,
    private notificationService: NotificationService
  ) {}

  async checkBudgetAlerts() {
    const budgets = await this.getActiveBudgets();
    const now = new Date();
    
    for (const budget of budgets) {
      const spent = await this.expenseService.getSpentForCategory(
        budget.categoryId,
        now.getFullYear(),
        now.getMonth()
      );
      
      const percentage = (spent / budget.amount) * 100;
      
      if (percentage >= 80 && percentage < 100) {
        await this.notificationService.scheduleBudgetWarning(budget, percentage);
      } else if (percentage >= 100) {
        await this.notificationService.scheduleBudgetExceeded(budget);
      }
    }
  }
}
```

### Pattern 4: Camera + OCR Pipeline

**What:** Capture receipt photos; process locally first; cloud fallback if needed

**When to use:** Receipt scanning for expense entry

**Trade-offs:**
- Pro: Works offline; faster than cloud-only
- Con: ML Kit may not extract all fields perfectly

**Example:**
```typescript
// services/ocrService.ts
import * as MLKit from '@react-native-ml-kit/text-recognition';

export class OCRService {
  async processReceipt(imageUri: string): Promise<ReceiptData> {
    // Try local processing first
    try {
      const result = await MLKit.textRecognition(imageUri);
      return this.parseReceiptText(result.text);
    } catch (error) {
      // Fallback to cloud OCR
      return this.cloudOCR(imageUri);
    }
  }

  private parseReceiptText(text: string): ReceiptData {
    // Extract amount, date, merchant from recognized text
    const amount = this.extractAmount(text);
    const date = this.extractDate(text);
    const merchant = this.extractMerchant(text);
    
    return { amount, date, merchant, rawText: text };
  }
}
```

## Data Flow

### Request Flow (Adding Expense)

```
User taps "Add Expense"
        ↓
Screen validates input → Screen calls ExpenseService.createExpense()
        ↓
Service creates record in WatermelonDB (SQLite)
        ↓
Record marked with isSynced = false
        ↓
Reactive query updates UI automatically (withObservables)
        ↓
SyncService detects unsynced changes
        ↓
If online: Push to Firebase/Supabase
        ↓
On success: Mark as synced
        ↓
On conflict: Apply conflict resolution strategy
```

### Background Budget Alert Flow

```
App schedules background task (expo-task-manager)
        ↓
Task triggers BudgetService.checkBudgetAlerts()
        ↓
Service queries current month expenses from WatermelonDB
        ↓
Compares against budget thresholds
        ↓
If threshold exceeded → NotificationService.scheduleLocalNotification()
        ↓
expo-notifications displays alert to user
```

### Key Data Flows

1. **Expense Creation:** Screen → Service → WatermelonDB → Reactive UI Update → Background Sync
2. **Budget Monitoring:** Scheduled Task → Service → Query → Conditional Notification
3. **Receipt Scanning:** Camera → Image → OCR Service → Parsed Data → Pre-filled Form
4. **Report Generation:** Screen → ReportService → Aggregated Queries → Chart Data

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 0-1k users (single user) | WatermelonDB local only; no sync needed |
| 1k-10k users (small teams) | Add Firebase/Supabase sync; simple conflict resolution (last-write-wins) |
| 10k-100k users | Implement proper sync queue; optimistic UI; sync status indicators |
| 100k+ users | Consider read replicas; implement proper backend sync API with versioning |

### Scaling Priorities

1. **First bottleneck:** Database query performance on large datasets
   - **Fix:** Use WatermelonDB lazy loading; index date/category columns; archive old data

2. **Second bottleneck:** Sync payload size
   - **Fix:** Implement pagination in sync; delta sync only (changed records); compression

3. **Third bottleneck:** OCR processing on device
   - **Fix:** Queue heavy processing; cloud fallback for complex receipts; pre-process images

## Anti-Patterns

### Anti-Pattern 1: Direct Database Access from Components

**What people do:** Components import database directly and query in useEffect

**Why it's wrong:** 
- Hard to test; UI coupled to storage implementation
- No centralized place for business logic
- Difficult to add validation or side effects

**Do this instead:** 
```typescript
// Component calls service
const expenses = await expenseService.getExpensesForMonth(year, month);

// Service abstracts database
async getExpensesForMonth(year: number, month: number) {
  return database.get('expenses').query(/* ... */);
}
```

### Anti-Pattern 2: Loading All Data Into State

**What people do:** `useEffect` fetches all expenses, stores in `useState`

**Why it's wrong:**
- Memory issues with thousands of records
- Stale data; no automatic updates
- Slows app launch

**Do this instead:**
```typescript
// Use WatermelonDB observables
const expenses = useObservable(
  () => expenseService.observeExpensesForMonth(year, month),
  [year, month]
);
// Components re-render only when queried data changes
```

### Anti-Pattern 3: Synchronous Cloud Operations

**What people do:** Wait for server response before showing success UI

**Why it's wrong:**
- App feels slow on poor connections
- User can't use app offline
- Server errors block user actions

**Do this instead:**
```typescript
// Optimistic UI pattern
await database.write(async () => {
  await expenses.create(expense => { /* ... */ });
});
// Show success immediately
// Sync happens in background
```

### Anti-Pattern 4: No Conflict Resolution

**What people do:** Simple last-write-wins without considering business rules

**Why it's wrong:**
- Expense records may have financial implications
- User edits on different devices can lose data

**Do this instead:**
```typescript
// Implement proper conflict detection
// Expenses are immutable once saved - create new record for edits
// Use created_at + device_id as unique constraint
// Manual merge UI for ambiguous conflicts
```

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| **WatermelonDB** | Native module via JSI | Use JSI build for better performance; requires NDK on Android |
| **ML Kit Vision** | Native module | On-device OCR; works offline; limited language support |
| **Firebase/Supabase** | HTTP API + WebSocket | Sync adapter must conform to WatermelonDB sync protocol |
| **Expo Notifications** | Native module + TaskManager | Background tasks require expo-task-manager setup |
| **Expo Camera** | React Native component | Unmount when screen unfocused to save battery |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| Screens ↔ Services | Direct function calls | Services are singletons; no dependency injection needed for MVP |
| Services ↔ Models | WatermelonDB API | Models use decorators; relations defined in schema |
| Services ↔ External | HTTP/API calls | Abstract behind interface for testability |
| App ↔ Background Tasks | TaskManager.defineTask | Tasks must be registered in index.ts (module scope) |

## Build Order Implications

Based on component dependencies, recommended build order:

### Phase 1: Foundation
1. **Project setup** - Expo bare workflow, EAS Build config
2. **Database layer** - WatermelonDB installation, schema definition
3. **Navigation** - React Navigation setup with static config
4. **Basic models** - Expense, Category models

### Phase 2: Core Features
5. **Expense CRUD** - Add Expense screen + ExpenseService
6. **Home Dashboard** - Query service + charts
7. **Camera integration** - Photo capture for receipts

### Phase 3: Intelligence
8. **OCR processing** - ML Kit integration, receipt parsing
9. **Budget system** - Budget model + alerts
10. **Reports** - Aggregations, chart library

### Phase 4: Polish
11. **Background tasks** - Scheduled budget checks
12. **Cloud sync** - Firebase/Supabase sync adapter
13. **Push notifications** - expo-notifications setup

### Dependency Graph

```
Navigation ─┬── Screens
            │
Database ───┴── Models ─── Services ───┬── OCR
                                        ├── Camera
                                        ├── Notifications
                                        └── Sync
```

## Sources

- WatermelonDB Documentation: https://watermelondb.dev/docs
- React Navigation v7: https://reactnavigation.org/docs/getting-started
- Expo Camera: https://docs.expo.dev/versions/latest/sdk/camera/
- Expo Notifications: https://docs.expo.dev/versions/latest/sdk/notifications/
- Expo EAS Build: https://docs.expo.dev/build/setup/
- React Native Architecture: https://reactnative.dev/docs/architecture-overview

---
*Architecture research for: ExpenseTracker mobile app*
*Researched: March 2, 2026*
