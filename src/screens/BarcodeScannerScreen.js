import { useState, useRef } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as Location from 'expo-location';

export default function BarcodeScannerScreen({ navigation, route }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const scannedRef = useRef(false);

  async function handleBarcodeScanned({ data }) {
    if (scanned) return;
    if (scannedRef.current) return;
    scannedRef.current = true;
    setScanned(true);

    let location = null;
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const coords = await Location.getCurrentPositionAsync({});
        location = {
          latitude: coords.coords.latitude,
          longitude: coords.coords.longitude,
        };
      }
    } catch (error) {
      console.error('Erro ao capturar localização:', error);
    }

    Alert.alert('Código lido', data, [
      {
        text: 'OK',
        onPress: () => {
          navigation.navigate('Home', {
            scannedBarcode: data,
            scannedLocation: location,
            currentName: route.params?.currentName || "",
            currentPrice: route.params?.currentPrice || "",
            currentBarcode: route.params?.currentBarcode || "",
          });
        },
      },
    ]);
  }

  if (!permission) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
        }}
      >
        <Text>Carregando permissões da câmera...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
        }}
      >
        <Text style={{ fontSize: 20, marginBottom: 20, textAlign: 'center' }}>
          Precisamos da permissão da câmera para ler o código de barras.
        </Text>

        <Button title="Permitir acesso à câmera" onPress={requestPermission} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <CameraView
          style={{ flex: 1 }}
          facing="back"
          onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
        />
      </View>

      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 20, marginBottom: 10 }}>
          Leitor de Código de Barras
        </Text>

        <Text style={{ marginBottom: 20 }}>
          Aponte a câmera para um código de barras.
        </Text>

        {scanned && (
          <Button
            title="Ler novamente"
            onPress={() => {
              scannedRef.current = false;
              setScanned(false);
            }}
          />
        )}
      </View>
    </View>
  );
}
