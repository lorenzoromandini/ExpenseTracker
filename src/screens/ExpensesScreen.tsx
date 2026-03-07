import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { Text, Searchbar, Chip, useTheme, FAB, Divider } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { ExpenseItem } from '../components/ExpenseItem';
import { filterAndSortExpenses, SortOption, FilterOptions } from '../utils/filters';
import { getExpensesByUser } from '../db/queries/expenses';
import { DEFAULT_CATEGORIES } from '../data/categories';

// Placeholder - in real app, get from auth context
const CURRENT_USER_ID = 'guest-user';

export function ExpensesScreen() {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const language = (i18n.language.startsWith('it') ? 'it' : 'en') as 'it' | 'en';

  const [expenses, setExpenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('date-desc');

  const loadExpenses = async () => {
    try {
      const data = await getExpensesByUser(CURRENT_USER_ID);
      setExpenses(data);
    } catch (error) {
      console.error('Failed to load expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadExpenses();
    setRefreshing(false);
  };

  const filteredExpenses = filterAndSortExpenses(expenses, {
    categoryId: selectedCategory,
    searchText: searchQuery || undefined,
  }, sortBy);

  const handleCategorySelect = (categoryId: string | null) => {
    setSelectedCategory(prev => prev === categoryId ? null : categoryId);
  };

  const renderEmpty = () => (
    <View style={styles.empty}>
      <Text variant="bodyLarge" style={styles.emptyText}>
        {language === 'it' ? 'Nessuna spesa trovata' : 'No expenses found'}
      </Text>
      <Text variant="bodyMedium" style={styles.emptySubtext}>
        {language === 'it' 
          ? 'Aggiungi la tua prima spesa manualmente o scansiona uno scontrino' 
          : 'Add your first expense manually or scan a receipt'}
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text variant="titleLarge" style={styles.title}>
          {t('screens.expenses')}
        </Text>

        <Searchbar
          placeholder={language === 'it' ? 'Cerca per esercente...' : 'Search by merchant...'}
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.search}
        />

        <View style={styles.filters}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[{ id: null, name: language === 'it' ? 'Tutti' : 'All' }, ...DEFAULT_CATEGORIES]}
          keyExtractor={(item) => item.id || 'all'}
          renderItem={({ item }) => (
            <Chip
              selected={selectedCategory === item.id}
              onPress={() => handleCategorySelect(item.id)}
              style={styles.filterChip}
              textStyle={selectedCategory === item.id ? styles.selectedChipText : {}}
            >
              {'name' in item ? item.name : (language === 'it' ? 'Tutti' : 'All')}
            </Chip>
          )}
        />
        </View>
      </View>

      <Divider />

      {loading ? (
        <View style={styles.center}>
          <Text>{t('common.loading')}</Text>
        </View>
      ) : filteredExpenses.length === 0 ? (
        renderEmpty()
      ) : (
        <FlatList
          data={filteredExpenses}
          renderItem={({ item }) => (
            <ExpenseItem
              expense={item}
              language={language}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={theme.colors.primary}
            />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
  },
  title: {
    marginBottom: 12,
  },
  search: {
    marginBottom: 12,
    elevation: 2,
  },
  filters: {
    maxHeight: 40,
  },
  filterChip: {
    marginRight: 8,
  },
  selectedChipText: {
    fontWeight: '600',
  },
  listContent: {
    paddingVertical: 8,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtext: {
    textAlign: 'center',
    opacity: 0.6,
  },
});
