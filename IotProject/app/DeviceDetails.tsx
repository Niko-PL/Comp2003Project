import React, { lazy } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Image, TouchableOpacity , Platform} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useNavigation } from 'expo-router';



import { DropDownComp } from '@/components/DropDownComp'; 
import { MobileMap } from '@/components/MobileMap'; //ignore this error it finds it .web for  website .native for ios and android

 
function DeviceDetails({ route }) {
    const navigation = useNavigation();
    const { deviceName , lastMaintenance , gpsLocation, imageUrl , installDate} = route.params;

    return (
      <View style={styles.container}>                  
          <ThemedText style={styles.header}>
              <Image source={{ uri: imageUrl }} style={styles.deviceImage} />
              {deviceName}
          </ThemedText>
          
          <MobileMap gpsLocation={gpsLocation} />
        <DropDownComp />
        <View style={styles.DeviceInfomation}>
          <Text style={styles.deviceInfo}>GPS LOCATION: {gpsLocation}</Text>
          <Text style={styles.deviceInfo}>Install Date: {installDate}</Text>
          <Text style={styles.deviceInfo}>Last Maintenance: {lastMaintenance} days ago</Text>
          
        </View>
      </View>
    )
  }

export default DeviceDetails;



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
    header: {
        
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        fontSize: 40,
        
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#000000',
        marginTop: 60,
      },
    

    deviceInfo: {
      fontSize: 20,
      fontWeight: 'bold',
      alignSelf: 'flex-start',
      marginLeft: 10,
    },

    deviceImage: {
      width: 60,
      height: 60,
      
    },

    DeviceInfomation: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }
});
