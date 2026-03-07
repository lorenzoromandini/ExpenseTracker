import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Surface, Text, Button, ActivityIndicator, useTheme, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { QRScanner } from '../components/QRScanner';
import { parseItalianReceiptQR, QRReceiptData } from '../utils/qrParser';
import { useTranslation } from 'react-i18next';
import { AppTabNavigationProp } from '../navigation/types';
import { createExpense } from '../db/queries/expenses';

export function ScanReceiptScreen() {
  const theme = useTheme();
  const navigation = useNavigation<AppTabNavigationProp>();
  const { t } = useTranslation();
  const [scanning, setScanning] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [receiptData, setReceiptData] = useState<QRReceiptData | null>(null);
  const [merchantName, setMerchantName] = useState('');

  const handleQRScanned = useCallback(async (qrData: string) => {
    setScanning(false);
    setProcessing(true);

    try {
      const parsed = parseItalianReceiptQR(qrData);
      
      if (parsed) {
        setReceiptData(parsed);
        setMerchantName(parsed.merchantName || '');
      } else {
        Alert.alert(
          t('scan.invalidQR'),
          t('scan.qrNotReceipt'),
          [
            { text: t('common.cancel'), style: 'cancel' },
            { text: t('scan.tryAgain'), onPress: () => {
              setScanning(true);
              setProcessing(false);
            }}
          ]
        );
      }
    } catch (error) {
      Alert.alert(
        t('scan.error'),
        t('scan.processingError'),
        [
          { text: t('common.cancel'), style: 'cancel' },
          { text: t('scan.tryAgain'), onPress: () => {
            setScanning(true);
            setProcessing(false);
          }}
        ]
      );
    } finally {
      setProcessing(false);
    }
  }, [t]);

  const handleSave = async () => {
    if (!receiptData) return;

    try {
      // TODO: Get current user ID from auth context
      const userId = 'guest-user'; // Placeholder
      
      await createExpense({
        userId,
        merchant: merchantName || receiptData.merchantVatNumber,
        amount: receiptData.totalAmount,
        currency: receiptData.currency,
        date: receiptData.date,
        categoryId: null,
        notes: `Receipt #${receiptData.receiptNumber}`,
        receiptImagePath: null,
        vatAmount: null,
        isManualEntry: false,
      });

      Alert.alert(
        t('scan.success'),
        t('scan.expenseSaved'),
        [
          { text: 'OK', onPress: () => navigation.navigate('Expenses') }
        ]
      );
    } catch (error) {
      Alert.alert(
        t('scan.error'),
        t('scan.saveError')
      );
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleManualEntry = () => {
    navigation.navigate('Expenses'); // Will add manual entry later
  };

  if (scanning) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.header}>
          <Button icon="close" onPress={handleCancel}>
            {t('common.close')}
          </Button>
        </View>
        
        <QRScanner 
          onQRScanned={handleQRScanned}
        />
        
        <View style={styles.footer}>
          <Button 
            mode="outlined" 
            onPress={handleManualEntry}
            style={styles.manualButton}
          >
            {t('scan.enterManually')}
          </Button>
        </View>
      </View>
    );
  }

  if (processing) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={[styles.processingText, { color: theme.colors.onSurface }]}>
          {t('scan.processing')}
        </Text>
      </View>
    );
  }

  if (receiptData) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Surface style={styles.content}>
          <Text variant="titleLarge" style={styles.title}>
            {t('scan.reviewExpense')}
          </Text>

          <View style={styles.field}>
            <Text style={styles.label}>{t('scan.merchant')}</Text>
            <TextInput
              value={merchantName}
              onChangeText={setMerchantName}
              placeholder={receiptData.merchantVatNumber}
              style={styles.input}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>{t('scan.amount')}</Text>
            <Text variant="bodyLarge">
              {receiptData.totalAmount.toFixed(2)} {receiptData.currency}
            </Text>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>{t('scan.date')}</Text>
            <Text variant="bodyLarge">
              {receiptData.date.toLocaleDateString()}
            </Text>
          </View>

          {receiptData.receiptNumber && (
            <View style={styles.field}>
              <Text style={styles.label}>{t('scan.receiptNumber')}</Text>
              <Text variant="bodyLarge">{receiptData.receiptNumber}</Text>
            </View>
          )}

          <View style={styles.buttons}>
            <Button 
              mode="outlined" 
              onPress={() => {
                setScanning(true);
                setReceiptData(null);
              }}
              style={styles.button}
            >
              {t('scan.retake')}
            </Button>

            <Button 
              mode="contained" 
              onPress={handleSave}
              style={styles.button}
            >
              {t('common.save')}
            </Button>
          </View>
        </Surface>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    padding: 16,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  manualButton: {
    backgroundColor: 'white',
  },
  processingText: {
    marginTop: 16,
    fontSize: 16,
  },
  content: {
    flex: 1,
    margin: 20,
    padding: 24,
    borderRadius: 12,
  },
  title: {
    marginBottom: 24,
  },
  field: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    opacity: 0.6,
    marginBottom: 4,
  },
  input: {
    fontSize: 16,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    gap: 12,
  },
  button: {
    flex: 1,
  },
});
