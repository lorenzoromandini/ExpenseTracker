import { MD3LightTheme, MD3DarkTheme, MD3Theme } from 'react-native-paper';

// Extended theme with our custom colors
export const lightTheme: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#1976D2',
    secondary: '#388E3C',
    background: '#FFFFFF',
    surface: '#FFFFFF',
    error: '#D32F2F',
    onSurface: '#212121',
    onSurfaceVariant: '#757575',
  },
};

export const darkTheme: MD3Theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#90CAF9',
    secondary: '#81C784',
    background: '#121212',
    surface: '#1E1E1E',
    error: '#EF5350',
    onSurface: '#FFFFFF',
    onSurfaceVariant: '#BDBDBD',
  },
};

export type AppTheme = typeof lightTheme;
