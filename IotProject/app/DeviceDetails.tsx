import React, { lazy } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Image, TouchableOpacity , Platform} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useNavigation } from 'expo-router';

import { IconSymbol } from '@/components/ui/IconSymbol';

import { DropDownComp } from '@/components/DropDownComp'; 
import { MobileMap } from '@/components/MobileMap'; //ignore this error it finds it .web for  website .native for ios and android

 
function DeviceDetails({ route } : { route: any }) {
    const navigation = useNavigation();
    const { deviceName , deviceModel , lastMaintenance , gpsLocation, imageUrl , installDate , DeviceNotes} = route.params;

    return (
      <View style={styles.container}>    
                    
        <View style={styles.header}>
              <Image source={{ uri: imageUrl }} style={styles.deviceImage} />
              <ThemedText style={styles.headerText}>{deviceName}</ThemedText> 
        </View>
        <View style={styles.logContainer}>
          <DropDownComp />
          <TouchableOpacity style={styles.CreateLogButton}>
            <IconSymbol name="plus" size={30} color="#FF5733" />
          </TouchableOpacity>
        </View>
          
        <ScrollView>
        <MobileMap gpsLocation={gpsLocation} />
        <View style={styles.DeviceInfomation}>
          <Text style={styles.deviceInfo}>Device Model: {deviceModel}</Text>
          <Text style={styles.deviceInfo}>GPS LOCATION: {gpsLocation}</Text>
          <Text style={styles.deviceInfo}>Install Date: {installDate}</Text>
          <Text style={styles.deviceInfo}>Last Maintenance: {lastMaintenance} days ago</Text>
          <Text style={styles.deviceInfo}>Notes: {"\n"} {DeviceNotes}</Text>
          
        </View>
        </ScrollView>
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
        
        

        
        marginTop: 50,
      },

    headerText: {
      
      fontSize: 25,
      
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#000000',
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
      marginTop: 20,
      alignItems: 'center',
    },

    logContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 20,
    },

    CreateLogButton: {
      borderWidth: 5,
      borderColor: '#0D2A38',
      borderRadius: 90,
      padding: 3,
    }
});
