// Import hook types at the top
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

// Auth Stack Param List
export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

// App Tab Param List
export type AppTabParamList = {
  Home: undefined;
  Expenses: undefined;
  Budget: undefined;
  Settings: undefined;
};

// Root Stack Param List
export type RootStackParamList = {
  Auth: undefined;
  App: undefined;
  ScanReceipt: undefined;
  ManualEntry: undefined;
};

// Navigation Prop Types
export type AuthStackNavigationProp = NativeStackNavigationProp<AuthStackParamList>;
export type AppTabNavigationProp = BottomTabNavigationProp<AppTabParamList>;
export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Receipt Stack for scanning
export type ReceiptStackParamList = {
  ScanReceipt: undefined;
  ManualEntry: undefined;
  ExpensePreview: { expenseData: any };
};
