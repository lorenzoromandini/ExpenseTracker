# Phase 3: Core Expense Management

**Status:** 🔵 Ready to Start  
**Duration:** 1-2 weeks  
**Dependencies:** Phase 1 (Foundation) ✅, Phase 2.1 (QR Scanning) ✅

## Overview

Build the core expense tracking features that work alongside QR scanning:
- Manual expense entry form
- Expense list with sorting/filtering
- Category management
- Edit/delete expenses

## Requirements (23 total)

### Manual Entry (7)
- CORE-01: Add expense manually with amount, merchant, date
- CORE-02: Select category for expense
- CORE-03: Add optional notes/tags
- CORE-04: View receipt photo (if available)
- CORE-05: Validate required fields
- CORE-06: Success confirmation after save
- CORE-07: Cancel/abandon entry

### Category Management (9)
- CAT-01: 15 default categories (Food, Transport, Utilities, etc.)
- CAT-02: Category icons and colors
- CAT-03: Italian category names
- CAT-04: English category names
- CAT-05: Custom category creation (v2)
- CAT-06: Edit category (v2)
- CAT-07: Delete category (v2)
- CAT-08: Category usage count
- CAT-09: Most-used categories first

### Multi-Currency (7)
- CURR-01: Default currency EUR
- CURR-02: Support USD, GBP
- CURR-03: Currency selector when adding expense
- CURR-04: Store currency with expense
- CURR-05: Display currency symbol
- CURR-06: Exchange rate conversion (v2)
- CURR-07: Base currency setting (v2)

## Implementation Plan

### Wave 1: Manual Entry (3-4 days)
1. **ManualEntryScreen** - Form with validation
2. **AmountInput** - Currency-aware number input
3. **DatePicker** - Native date picker
4. **CategoryPicker** - Select from predefined categories

### Wave 2: Expense List (3-4 days)
1. **ExpensesListScreen** - Scrollable list
2. **ExpenseItem** - Individual expense card
3. **Filter/Sort controls** - By date, category, amount
4. **Search** - By merchant name
5. **Pull-to-refresh** - Refresh list

### Wave 3: Categories & Polish (3-4 days)
1. **Category definitions** - 15 default categories
2. **Category icons** - Material icons
3. **i18n for categories** - Italian/English
4. **Edit/Delete flow** - Swipe actions
5. **Empty states** - No expenses messaging

## Technical Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| List rendering | FlashList | Better performance than FlatList |
| Date format | ISO 8601 | Consistent storage |
| Currency storage | 3-letter code (EUR) | Standard, easy conversion |
| Category storage | String ID | Simple, no joins needed |
| Image storage | File path | Keep images on device |

## Success Criteria

- User can add expense manually in <30 seconds
- Expense list shows all user's expenses
- Filter by category works
- Search by merchant works
- Sort by date/amount works
- Can edit existing expense
- Can delete expense with confirmation
- All text translated (Italian/English)

## Files to Create

- `src/screens/ManualEntryScreen.tsx`
- `src/screens/ExpensesListScreen.tsx`
- `src/components/ExpenseItem.tsx`
- `src/components/AmountInput.tsx`
- `src/components/CategoryPicker.tsx`
- `src/data/categories.ts` - Default categories
- `src/utils/formatters.ts` - Date/currency formatting
- `src/utils/filters.ts` - Filter/search logic

## Next Steps After Phase 3

- **Phase 4: Budgeting** - Set monthly budgets per category
- **Phase 5: Dashboard** - Charts and spending insights
- **Phase 2.2: OCR** - Photo capture (optional, lower priority)

---

**Ready to begin implementation!**
