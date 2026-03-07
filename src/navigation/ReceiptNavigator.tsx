import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ReceiptStackParamList } from './types';
import { ScanReceiptScreen } from '../screens/ScanReceiptScreen';

const Stack = createNativeStackNavigator<ReceiptStackParamList>();

export function ReceiptNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: 'modal',
      }}
    >
      <Stack.Screen name="ScanReceipt" component={ScanReceiptScreen} />
    </Stack.Navigator>
  );
}
