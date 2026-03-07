import React, { useState } from 'react';
import { View, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Surface, Text, Button, TextInput, useTheme, ActivityIndicator } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { AppTabNavigationProp } from '../navigation/types';
import { AmountInput } from '../components/AmountInput';
import { CategoryPicker } from '../components/CategoryPicker';
import { createExpense } from '../db/queries/expenses';
import { formatDateForInput } from '../utils/formatters';

export function ManualEntryScreen() {
  const theme = useTheme();
  const navigation = useNavigation<AppTabNavigationProp>();
  const { t, i18n } = useTranslation();
  const language = (i18n.language.startsWith('it') ? 'it' : 'en') as 'it' | 'en';

  const [merchant, setMerchant] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(formatDateForInput(new Date()));
  const [categoryId, setCategoryId] = useState<string | null>('other');
  const [notes, setNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const validate = (): boolean => {
    if (!merchant.trim()) {
      Alert.alert(t('validation.required'), t('validation.merchantRequired'));
      return false;
    }

    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert(t('validation.required'), t('validation.amountRequired'));
      return false;
    }

    if (!date) {
      Alert.alert(t('validation.required'), t('validation.dateRequired'));
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    if (!validate()) return;

    setIsSaving(true);

    try {
      // TODO: Get user ID from auth context
      const userId = 'guest-user';

      await createExpense({
        userId,
        merchant: merchant.trim(),
        amount: parseFloat(amount),
        currency: 'EUR',
        date: new Date(date),
        categoryId: categoryId || null,
        notes: notes.trim() || null,
        receiptImagePath: null,
        vatAmount: null,
        isManualEntry: true,
      });

      Alert.alert(
        t('scan.success'),
        t('expenses.expenseSaved'),
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Expenses'),
          },
        ]
      );
    } catch (error) {
      Alert.alert(
        t('scan.error'),
        t('expenses.saveError')
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text variant="titleLarge" style={styles.title}>
            {t('expenses.addExpense')}
          </Text>

          <Surface style={styles.form} elevation={2}>
            <AmountInput
              value={amount}
              onChange={setAmount}
              label={t('scan.amount')}
              currency="EUR"
              error={!amount || parseFloat(amount) <= 0}
              errorMessage={t('validation.amountRequired')}
            />

            <TextInput
              label={t('scan.merchant')}
              value={merchant}
              onChangeText={setMerchant}
              mode="outlined"
              style={styles.input}
              error={!merchant.trim()}
            />

            <TextInput
              label={t('scan.date')}
              value={date}
              onChangeText={setDate}
              mode="outlined"
              style={styles.input}
              placeholder="YYYY-MM-DD"
            />

            <Text variant="titleMedium" style={styles.sectionTitle}>
              {t('scan.category')}
            </Text>
            <CategoryPicker
              selectedCategoryId={categoryId}
              onSelect={setCategoryId}
              language={language}
            />

            <TextInput
              label={t('scan.notes')}
              value={notes}
              onChangeText={setNotes}
              mode="outlined"
              multiline
              numberOfLines={3}
              style={styles.input}
              placeholder={t('expenses.optionalNotes')}
            />
          </Surface>

          <View style={styles.buttons}>
            <Button
              mode="outlined"
              onPress={() => navigation.goBack()}
              style={styles.button}
              disabled={isSaving}
            >
              {t('common.cancel')}
            </Button>

            <Button
              mode="contained"
              onPress={handleSave}
              style={styles.button}
              loading={isSaving}
              disabled={isSaving}
            >
              {t('common.save')}
            </Button>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    marginBottom: 20,
  },
  form: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  input: {
    marginBottom: 16,
  },
  sectionTitle: {
    marginTop: 16,
    marginBottom: 8,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  button: {
    flex: 1,
  },
});
