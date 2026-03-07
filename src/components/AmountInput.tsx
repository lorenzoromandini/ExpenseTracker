import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Text, useTheme, HelperText } from 'react-native-paper';

interface AmountInputProps {
  value: string;
  onChange: (value: string) => void;
  currency?: string;
  label?: string;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
}

export function AmountInput({
  value,
  onChange,
  currency = 'EUR',
  label,
  error = false,
  errorMessage,
  disabled = false,
}: AmountInputProps) {
  const theme = useTheme();

  const handleChange = (text: string) => {
    // Allow only numbers, comma, and one decimal point
    const cleaned = text.replace(/[^0-9,.]/g, '');
    
    // Replace comma with dot for storage
    const normalized = cleaned.replace(',', '.');
    
    // Validate: only one decimal point
    const parts = normalized.split('.');
    if (parts.length > 2) return;
    
    // Limit to 2 decimal places
    if (parts[1]?.length > 2) return;
    
    onChange(normalized);
  };

  const displayValue = value.includes('.') 
    ? value.replace('.', ',') // Show comma for Italian format
    : value;

  return (
    <View style={styles.container}>
      <TextInput
        label={label || 'Amount'}
        value={displayValue}
        onChangeText={handleChange}
        keyboardType="decimal-pad"
        mode="outlined"
        disabled={disabled}
        error={error}
        style={styles.input}
        left={
          <TextInput.Affix
            text={`${currency} `}
            textStyle={{ fontSize: 18, fontWeight: '600' }}
          />
        }
        placeholder="0,00"
        placeholderTextColor={theme.colors.onSurfaceVariant}
      />
      
      {error && errorMessage && (
        <HelperText type="error" visible={error}>
          {errorMessage}
        </HelperText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    fontSize: 18,
  },
});
