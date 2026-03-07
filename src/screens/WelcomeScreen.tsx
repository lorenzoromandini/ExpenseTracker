import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Surface, Text, Button, Title, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { AuthStackNavigationProp } from '../navigation/types';

export function WelcomeScreen() {
  const navigation = useNavigation<AuthStackNavigationProp>();
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Surface style={styles.content}>
        <Title style={styles.title}>ExpenseTracker</Title>
        
        <Text style={styles.subtitle}>
          Track your expenses effortlessly
        </Text>
        
        <Text style={styles.description}>
          Scan receipts, manage budgets, and gain insights into your spending.
        </Text>

        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Login')}
            style={styles.button}
          >
            Sign In
          </Button>

          <Button
            mode="outlined"
            onPress={() => navigation.navigate('Register')}
            style={styles.button}
          >
            Create Account
          </Button>
        </View>
      </Surface>
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
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
    fontSize: 28,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 16,
    opacity: 0.7,
  },
  description: {
    textAlign: 'center',
    marginBottom: 32,
    opacity: 0.6,
    lineHeight: 22,
  },
  buttonContainer: {
    gap: 12,
  },
  button: {
    paddingVertical: 8,
  },
});
