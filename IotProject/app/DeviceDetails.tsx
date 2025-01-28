import React, { lazy } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Image, TouchableOpacity , Platform} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useNavigation } from 'expo-router';

import { IconSymbol } from '@/components/ui/IconSymbol';

import { DropDownComp } from '@/components/DropDownComp'; 
import { MobileMap } from '@/components/MobileMap'; //ignore this error it finds it .web for  website .native for ios and android
 
function DeviceDetails({ route } : { route: any }) {
    const navigation = useNavigation();
    const { deviceName , deviceid , deviceModel , lastMaintenance , gpsLocation, imageUrl , installDate , DeviceNotes} = route.params;

    return (
      <View style={styles.container}>    
                    
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <IconSymbol name="chevron.left" size={30} color="#FF5733" />
        </TouchableOpacity>
        

        <View style={styles.header}>
            
              <Image source={{ uri: imageUrl }} style={styles.deviceImage} />
              <View style={{flexDirection: 'column' }}> 
                <ThemedText style={styles.headerText}>{deviceName}</ThemedText> 
                <ThemedText style={styles.headerTextDeviceID}>{deviceid}</ThemedText>
              </View>

        </View>

          
        <ScrollView>
        <MobileMap gpsLocation={gpsLocation} DeviceName={deviceName} />

        <View style={styles.QuickAccess}>
          <TouchableOpacity style={styles.QuickAccessButton}>
            <IconSymbol name="qrcode" size={40} color="#FF5733" />
            <ThemedText style={styles.QuickAccessText}>QR Code</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.QuickAccessButton}>
            <IconSymbol name="book" size={40} color="#FF5733" />
            <ThemedText style={styles.QuickAccessText}>Log Book</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.QuickAccessButton}>
            <IconSymbol name="info" size={40} color="#FF5733" />
            <ThemedText style={styles.QuickAccessText}>Device Info</ThemedText>
          </TouchableOpacity>
        </View>

        <View style={styles.Containerdevice}>
          <Text style={styles.ContainerTitle}>Device Info</Text>
          <View style={styles.ContainerContent}>
          <View style={styles.ContainerContentImage}>
            <Image source={{ uri: imageUrl }} style={styles.ContainerdeviceImage} />
            <View style={styles.ContainerdeviceImageTextContainer}>
            <Text style={styles.ContainerdeviceImageText}>{deviceName}</Text>
            <View style={styles.statusContainer}>
              {GetStatusIndicator("Online")}
              <Text style={styles.ContainerdeviceImageText}>Online</Text>
            </View>
            </View>
          </View>
          </View>
        </View>
        <View style={styles.Containerdevice}>
          <View style={[styles.ContainerContent  , {padding: 10}]}>
            <Text style={styles.deviceInfo}>Device Model: <Text style={styles.deviceInfoText}>{deviceModel}</Text></Text>
            <Text style={styles.deviceInfo}>GPS LOCATION: <Text style={styles.deviceInfoText}>{gpsLocation}</Text></Text>
            <Text style={styles.deviceInfo}>Install Date: <Text style={styles.deviceInfoText}>{installDate}</Text></Text>
            <Text style={styles.deviceInfo}>Last Maintenance: <Text style={styles.deviceInfoText}>{lastMaintenance} days ago </Text></Text>
            <Text style={styles.deviceInfo}>Notes: 
              <Text style={styles.deviceInfoText}>{"\n"} {DeviceNotes}</Text>
              </Text>
          </View>
        </View>

        <View style={styles.Containerdevice}>
        <Text style={styles.ContainerTitle}>Log Book</Text>
        <View style={styles.logContainer}>
          <DropDownComp />
          <TouchableOpacity style={styles.CreateLogButton}>
            <IconSymbol name="plus" size={30} color="#FF5733" />
          </TouchableOpacity>
        </View>
        </View>
        
        <View style={{paddingBottom: '80%'}}></View> 
        </ScrollView>
      </View>
    )
  }

export default DeviceDetails;

function GetStatusIndicator(status: string) {
  if (status === 'Online') {
    return <View style={[styles.statusIndicator, { backgroundColor: '#2ECC71' }]} />;
  } else if (status === 'Offline') {
    return <View style={[styles.statusIndicator, { backgroundColor: '#FF5733' }]} />;
  } else if (status === 'Maintenance') {
    return <View style={[styles.statusIndicator, { backgroundColor: '#FF5450' }]} />;
  } else {
    return <View style={[styles.statusIndicator, { backgroundColor: 'gray' }]} />;
  }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
    header: {
        
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
      
        alignItems: 'center',
        gap: 10,
        marginTop: 50,
      },

    headerText: {
      fontSize: 25,
      fontWeight: 'bold',
      color: '#000000',
    },

    headerTextDeviceID: {
      fontSize: 15,
      fontWeight: 'bold',
      

      color: '#00000050',
    },
    

    QuickAccess: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      padding: 10,
    },

    QuickAccessButton: {
      borderWidth: 1,
      borderColor: '#0D2A38',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      backgroundColor: '#FFFFFF',
      width: '30%',
      height: 80,
      padding: 3,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },

    QuickAccessText: {
      fontSize: 10,
      fontWeight: 'bold',
      color: '#000000',
    },

    Containerdevice: {
      padding: 20,
      paddingBottom: 5,
      
    },

    ContainerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#000000',
    },

    ContainerContentImage: {
      borderRadius: 10,
      overflow: 'hidden',
      
    },

    ContainerdeviceImageText: {
      fontSize: 16,
      
      alignSelf: 'flex-start',
      color: '#000000',
    },

    ContainerdeviceImageTextContainer: {
      alignSelf: 'flex-start',
      padding: 10,
    },

    ContainerdeviceImage: {
      
      width: '100%',
      height: 300,
    },

    deviceInfo: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
      alignSelf: 'flex-start',
      marginLeft: 10,
    },

    deviceInfoText: {
      fontSize: 16,
      fontWeight: 'normal',
      color: '#00000090',
    },

    deviceImage: {
      borderRadius: 33,
      width: 60,
      height: 60,
      
    },

    ContainerContent: {
      borderWidth: 1,
      borderColor: '#0D2A38',
      borderRadius: 10,
      
      backgroundColor: '#FFFFFF',
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },

    statusContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'flex-start',
      gap: 5,
    },
    
    statusIndicator: {
      width: 10,
      height: 10,
      borderRadius: 5,
    },

    DeviceInfomation: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: 20,
      alignItems: 'center',
    },

    logContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
    },

    CreateLogButton: {
      borderWidth: 5,
      borderColor: '#0D2A38',
      borderRadius: 90,
      padding: 3,
    },

    

    backButton: {
      position: 'absolute',
      bottom: 100,
      left: 20,
      backgroundColor: '#0D2A38',
      borderRadius: 90,
      padding: 10,
      zIndex: 1000,
    },

    qrButton: {
      position: 'absolute',
      bottom: 100,
      right: 20,
      backgroundColor: '#0D2A38',
      borderRadius: 90,
      padding: 10,
      zIndex: 1000,
    },


});
