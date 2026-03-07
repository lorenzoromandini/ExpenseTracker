import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useTheme } from '../theme/ThemeProvider';
// @ts-expect-error - Expo vector icons types
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface QRScannerProps {
  onQRScanned: (data: string) => void;
  onError?: (error: Error) => void;
}

export function QRScanner({ onQRScanned, onError }: QRScannerProps) {
  const theme = useTheme();
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('back');
  const [scanned, setScanned] = useState(false);

  const handleBarCodeScanned = useCallback(
    ({ type, data }: { type: string; data: string }) => {
      if (scanned) return;
      
      setScanned(true);
      
      // Only process QR codes
      if (type === 'qr' || type.includes('QR')) {
        onQRScanned(data);
      }
    },
    [scanned, onQRScanned]
  );

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  // Handle permission states
  if (!permission) {
    // Camera permissions are still loading
    return (
      <View style={styles.container}>
        <Text style={{ color: theme.colors.onSurface }}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    // Camera permissions not granted yet
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <MaterialCommunityIcons 
          name="camera-off" 
          size={64} 
          color={theme.colors.onSurfaceVariant} 
          style={styles.icon}
        />
        <Text style={[styles.title, { color: theme.colors.onSurface }]}>
          Camera Access Required
        </Text>
        <Text style={[styles.description, { color: theme.colors.onSurfaceVariant }]}>
          Camera access lets you scan receipts quickly and accurately.
        </Text>
        
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: theme.colors.primary }]}
          onPress={requestPermission}
        >
          <Text style={[styles.buttonText, { color: theme.colors.onPrimary }]}>
            Allow Camera Access
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      >
        {/* Overlay with scanning frame */}
        <View style={styles.overlay}>
          <View style={styles.scanFrame}>
            {/* Corner brackets */}
            <View style={[styles.corner, styles.cornerTopLeft, { borderColor: theme.colors.primary }]} />
            <View style={[styles.corner, styles.cornerTopRight, { borderColor: theme.colors.primary }]} />
            <View style={[styles.corner, styles.cornerBottomLeft, { borderColor: theme.colors.primary }]} />
            <View style={[styles.corner, styles.cornerBottomRight, { borderColor: theme.colors.primary }]} />
          </View>
          
          <Text style={[styles.instruction, { color: theme.colors.onPrimary }]}>
            Align QR code within frame
          </Text>
        </View>

        {/* Flash toggle button */}
        <TouchableOpacity 
          style={[styles.flashButton, { backgroundColor: theme.colors.surface }]}
          onPress={toggleCameraFacing}
        >
          <MaterialCommunityIcons 
            name="camera-flip" 
            size={24} 
            color={theme.colors.onSurface} 
          />
        </TouchableOpacity>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanFrame: {
    width: 250,
    height: 250,
    borderWidth: 0,
    backgroundColor: 'transparent',
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderWidth: 4,
    backgroundColor: 'transparent',
  },
  cornerTopLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  cornerTopRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  cornerBottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  cornerBottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  instruction: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 40,
    marginBottom: 30,
  },
  button: {
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  flashButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 12,
    borderRadius: 50,
  },
});
