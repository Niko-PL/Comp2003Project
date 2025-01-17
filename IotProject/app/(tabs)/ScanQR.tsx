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
  Button,
  Image
} from "react-native";
import { useEffect, useRef } from "react";
import { useState } from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const NewStack = createNativeStackNavigator();
import DeviceDetails from '../DeviceDetails';
import { FetchAllAPIdata , FetchoneAPIdata } from '@/components/APIHandler';


export default function Home() {
  return (

    <NewStack.Navigator screenOptions={{headerShown: false}}>
      <NewStack.Screen 
        name="MainPage" 
        component={MainQRPage} 
        
      />
      <NewStack.Screen 
        name="DeviceDetails" 
        component={DeviceDetails} 
      />
    </NewStack.Navigator>

);
}

const MainQRPage = ({navigation}: {navigation: any}) => {
  const [qrData, setQrData] = useState('');
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();

  const handleBarcodeScanned = (event) => {
      if (event.data == qrData) return;

      console.log('QR Code Data:', event.data);
      setQrData(event.data);
      setTimeout(
        () => { setQrData('') },
        2000
      )
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
      <CameraView style={styles.camera} facing={facing} barcodeScannerSettings={{ barcodeTypes: ["qr"], }}  onBarcodeScanned={handleBarcodeScanned} >
        {qrData ?
          <QRDevice deviceid={qrData} navigation={navigation} />
        : 
          null
        }
        {/*
        <View style={styles.buttonContainer}>
          
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          
          {qrData ? <Text style={styles.text}>{qrData}</Text> : null}
        
        </View>
        */}
      </CameraView>
      
    </View>
  );
}

function QRDevice({deviceid , navigation} : {deviceid: string , navigation: any}) {
  console.log(deviceid);
  const DeviceData = FetchoneAPIdata(deviceid);

  return (
    <TouchableOpacity style={styles.DevicePopupContainer}onPress={() => navigation.navigate('DeviceDetails', {
      deviceid: deviceid,
      deviceName: DeviceData.name,
      lastMaintenance: DeviceData.lastMaintenance,
      gpsLocation: DeviceData.gpsLocation["latitude"] + ", " + DeviceData.gpsLocation["longitude"],
      warning: DeviceData.warning,
      imageUrl: DeviceData.imageUrl,
      installDate   : DeviceData.installDate,
      DeviceNotes   : DeviceData.DeviceNotes,
      deviceModel   : DeviceData.model,
    })}>
      <Image source={{ uri: DeviceData.imageUrl }} style={styles.deviceImage} />
      <Text style={styles.DevicePopupText}>{DeviceData.name}</Text>
      <Text style={styles.DevicePopupText}>Model: {DeviceData.model}</Text>
      <Text style={styles.DevicePopupText}>Last Maintenance: {DeviceData.lastMaintenance}</Text>
    </TouchableOpacity>
  )
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
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonContainer: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: 'transparent',
      margin: 64,
    },
    DevicePopupContainer: {
      
      flexDirection: 'column',
      
      margin: 64,
      backgroundColor: '#FFFFFF',
     
      
      borderRadius: 20,
      padding: 20,
    },
    deviceImage: {
      alignSelf: 'center',
      width: 200,
      height: 200,
    },
    DevicePopupText: {
      fontSize: 20,
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