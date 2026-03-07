import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Surface, Text, useTheme } from 'react-native-paper';
// @ts-expect-error - Expo vector icons types
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Expense } from '../db/queries/expenses';
import { formatCurrency, formatDate, formatRelativeDate } from '../utils/formatters';
import { getCategoryName } from '../data/categories';

interface ExpenseItemProps {
  expense: Expense;
  onPress?: () => void;
  onLongPress?: () => void;
  language?: 'it' | 'en';
}

export function ExpenseItem({ expense, onPress, onLongPress, language = 'en' }: ExpenseItemProps) {
  const theme = useTheme();

  const categoryName = expense.categoryId 
    ? getCategoryName(expense.categoryId, language)
    : language === 'it' ? 'Altro' : 'Other';

  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      activeOpacity={0.7}
    >
      <Surface 
        style={[styles.container, { backgroundColor: theme.colors.surface }]}
        elevation={2}
      >
        <View style={styles.left}>
          <View style={[styles.iconContainer, { backgroundColor: `${theme.colors.primary}15` }]}>
            <MaterialCommunityIcons
              name={expense.isManualEntry ? 'pencil-outline' : 'qrcode-scan'}
              size={24}
              color={theme.colors.primary}
            />
          </View>

          <View style={styles.content}>
            <Text variant="titleMedium" numberOfLines={1} style={styles.merchant}>
              {expense.merchant}
            </Text>

            <View style={styles.details}>
              <Text variant="bodySmall" style={styles.category}>
                {categoryName}
              </Text>
              <Text variant="bodySmall" style={styles.dot}>•</Text>
              <Text variant="bodySmall" style={styles.date}>
                {formatRelativeDate(expense.date, language === 'it' ? 'it-IT' : 'en-US')}
              </Text>
            </View>

            {expense.notes && (
              <Text variant="bodySmall" numberOfLines={1} style={styles.notes}>
                {expense.notes}
              </Text>
            )}
          </View>
        </View>

        <View style={styles.right}>
          <Text variant="titleLarge" style={[styles.amount, { color: expense.amount < 0 ? theme.colors.error : theme.colors.onSurface }]}>
            {formatCurrency(Math.abs(expense.amount), expense.currency, language === 'it' ? 'it-IT' : 'en-US')}
          </Text>

          {expense.receiptImagePath && (
            <View style={styles.receiptIndicator}>
              <MaterialCommunityIcons
                name="image-outline"
                size={16}
                color={theme.colors.onSurfaceVariant}
              />
            </View>
          )}
        </View>
      </Surface>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 6,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    minWidth: 0,
  },
  merchant: {
    fontWeight: '500',
    marginBottom: 4,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  category: {
    opacity: 0.7,
  },
  dot: {
    opacity: 0.5,
  },
  date: {
    opacity: 0.7,
  },
  notes: {
    opacity: 0.6,
    marginTop: 2,
  },
  right: {
    alignItems: 'flex-end',
    gap: 4,
  },
  amount: {
    fontWeight: '600',
  },
  receiptIndicator: {
    marginTop: 2,
  },
});
