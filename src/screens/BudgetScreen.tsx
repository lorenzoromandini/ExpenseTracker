import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Surface, Text, Title, useTheme } from 'react-native-paper';

export function BudgetScreen() {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Surface style={styles.content}>
        <Title style={styles.title}>Budget</Title>
        <Text style={styles.text}>Your budget tracking will appear here.</Text>
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
    alignItems: 'center',
  },
  title: {
    marginBottom: 16,
    fontSize: 24,
  },
  text: {
    opacity: 0.6,
    textAlign: 'center',
  },
});
