import { Camera, CameraView , CameraType , useCameraPermissions} from "expo-camera";
import { Stack } from "expo-router";
import {
  AppState,
  Linking,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Button
} from "react-native";
import { useEffect, useRef } from "react";
import { useState } from 'react';



export default function Home() {
    const [qrData, setQrData] = useState('');
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
  
    const handleBarcodeScanned = (event) => {
        console.log('QR Code Data:', event.data);
        setQrData(event.data);
    }

    if (!permission) {
      // Camera permissions are still loading.
      return <View />;
    }
  
    if (!permission.granted) {
      // Camera permissions are not granted yet.
      return (
        <View style={styles.container}>
          <Text style={styles.message}>We need your permission to show the camera</Text>
          <Button onPress={requestPermission} title="grant permission" />
        </View>
      );
    }
  
    function toggleCameraFacing() {
      setFacing(current => (current === 'back' ? 'front' : 'back'));
    }
  
    return (
      <View style={styles.container}>
        <CameraView style={styles.camera} facing={facing} barcodeScannerSettings={{ barcodeTypes: ["qr"],}} onBarcodeScanned={handleBarcodeScanned}>
          <View style={styles.buttonContainer}>
            {/*
            <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
            */}
            {qrData ? <Text style={styles.text}>{qrData}</Text> : null}
          </View>
        </CameraView>
        
      </View>
    );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    message: {
      textAlign: 'center',
      paddingBottom: 10,
    },
    camera: {
      flex: 1,
    },
    buttonContainer: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: 'transparent',
      margin: 64,
    },
    button: {
      flex: 1,
      alignSelf: 'flex-end',
      alignItems: 'center',
      marginBottom: 36,
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
    },
  });