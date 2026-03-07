import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Surface, Text, TextInput, Button, Title, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { AuthStackNavigationProp } from '../navigation/types';

export function ForgotPasswordScreen() {
  const navigation = useNavigation<AuthStackNavigationProp>();
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSendReset = async () => {
    setIsLoading(true);
    // TODO: Implement actual password reset logic
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 1000);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Surface style={styles.content}>
        <Button
          icon="arrow-left"
          mode="text"
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          Back
        </Button>

        <Title style={styles.title}>Reset Password</Title>

        {isSent ? (
          <>
            <Text style={styles.successText}>
              Check your email for password reset instructions.
            </Text>
            <Button
              mode="text"
              onPress={() => navigation.navigate('Login')}
              style={styles.linkButton}
            >
              Back to Login
            </Button>
          </>
        ) : (
          <>
            <Text style={styles.description}>
              Enter your email address and we'll send you instructions to reset your password.
            </Text>

            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
            />

            <Button
              mode="contained"
              onPress={handleSendReset}
              loading={isLoading}
              disabled={isLoading || !email}
              style={styles.button}
            >
              Send Instructions
            </Button>
          </>
        )}
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
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
    fontSize: 24,
  },
  description: {
    textAlign: 'center',
    marginBottom: 24,
    opacity: 0.7,
    lineHeight: 22,
  },
  input: {
    marginBottom: 24,
  },
  button: {
    paddingVertical: 8,
  },
  successText: {
    textAlign: 'center',
    marginVertical: 24,
    fontSize: 16,
    opacity: 0.8,
  },
  linkButton: {
    marginTop: 16,
  },
});
