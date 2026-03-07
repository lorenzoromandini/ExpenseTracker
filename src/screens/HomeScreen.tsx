import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Surface, Text, Button, Title, useTheme, FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { AppTabNavigationProp } from '../navigation/types';

export function HomeScreen() {
  const theme = useTheme();
  const navigation = useNavigation<AppTabNavigationProp>();
  const { t } = useTranslation();
  const [fabOpen, setFabOpen] = useState(false);

  const handleLogout = () => {
    // TODO: Implement logout
  };

  const handleScanQR = () => {
    setFabOpen(false);
    (navigation as any).navigate('ScanReceipt');
  };

  const handleAddManual = () => {
    setFabOpen(false);
    (navigation as any).navigate('ManualEntry');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Surface style={styles.content}>
        <Title style={styles.title}>Home</Title>
        <Text style={styles.text}>Welcome to ExpenseTracker!</Text>
        <Text style={styles.subtitle}>
          Your expenses will appear here.
        </Text>

        <Button mode="outlined" onPress={handleLogout} style={styles.button}>
          Logout
        </Button>
      </Surface>

      <FAB.Group
        open={fabOpen}
        visible
        icon={fabOpen ? 'close' : 'plus'}
        actions={[
          {
            icon: 'qrcode-scan',
            label: t('scan.scanReceipt'),
            onPress: handleScanQR,
          },
          {
            icon: 'pencil',
            label: t('scan.enterManually'),
            onPress: handleAddManual,
          },
        ]}
        onStateChange={({ open }) => setFabOpen(open)}
        onPress={() => {
          if (fabOpen) {
            setFabOpen(false);
          }
        }}
        style={styles.fab}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  content: {
    padding: 24,
    borderRadius: 12,
    elevation: 4,
    alignItems: 'center',
  },
  title: {
    marginBottom: 16,
    fontSize: 24,
  },
  text: {
    fontSize: 18,
    marginBottom: 8,
  },
  subtitle: {
    opacity: 0.6,
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    marginTop: 16,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
