import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from "react-native";


export function DeviceCardElement ({
    deviceid = "Unknown ID",
    deviceName = "Unknown Device",
    lastMaintenance = "N/A",
    gpsLocation = "N/A",
    warning = null,
    imageUrl = "https://via.placeholder.com/50",
    navigation,
    installDate = "11/11/2024",
    DeviceNotes = "N/A",
    deviceModel = "Unknown Model",
    styletype = "list"
}){
  return (
    <TouchableOpacity style={styles.deviceCard(styletype)} onPress={() => navigation.navigate('DeviceDetails', {
      deviceid: deviceid,
      deviceName: deviceName,
      lastMaintenance: lastMaintenance,
      gpsLocation: gpsLocation,
      warning: warning,
      imageUrl: imageUrl,
      installDate   : installDate,
      DeviceNotes   : DeviceNotes,
      deviceModel   : deviceModel
    })}>
    <Image source={{ uri: imageUrl }} style={styles.deviceImage(styletype)} />
        <View style={styles.deviceDetails}>
        <Text style={styles.deviceName(styletype)}> {deviceName}</Text>
        <Text style={styles.deviceInfo(styletype)}>Last Maintenance: <Text style={{color: '#FF5733'}}>{lastMaintenance} days ago </Text> </Text>
        <Text style={styles.deviceInfo(styletype)}>GPS LOCATION: <Text style={{color: '#FF5733'}}>{gpsLocation}</Text></Text>
        <GetWarning haswarning={warning} styletype={styletype}/>
        </View>
    </TouchableOpacity>
  );
}

const GetWarning = props => {
    if (props.haswarning) {
      return <Text style={styles.deviceWarning(props.styletype)}>{props.haswarning}</Text>;
    }
    return null;
  };


const styles = StyleSheet.create({
    deviceList: {
      flex: 1,
       
      marginHorizontal: 10,
    },

    deviceCard: (styletype) => {
      if (styletype === 'List') {

        return {
          flexDirection: 'row',
          backgroundColor: '#FFFFFF',
          top: 10,
          borderRadius: 8,
          left: 2,
          padding: 10,
          width: '98%',
          alignSelf: 'center',
          marginBottom: 10,
          elevation: 2,
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.5,
          shadowRadius: 4,
        }
      }
      else if (styletype === 'Grid') {
        return {
          flexDirection: 'column',
          backgroundColor: '#FFFFFF',
          marginLeft: 10,
          borderRadius: 8,
          padding: 5,
          
          height: 120,
          marginBottom: 10,
          elevation: 2,
          shadowColor: '#000000',
          shadowOffset: { width: 0, height:1 },
          shadowOpacity: 0.5,
          shadowRadius: 4,
          
        }
      }
      
    },
    deviceImage: (styletype) => { 
      if (styletype === 'Grid') {
        return {
          width: '100%',
          height: '70%',
        }
      }
      
      return {
        width: 50,
        height: 50,
        marginRight: 10,
      }
    
    },
    deviceDetails: {
      flex: 1,
    },
    deviceName: (styletype) => {
      if (styletype === 'Grid') {
        return {
          fontSize: 13,
          fontWeight: 'bold',
          width: 100,
        }
      }

      return {
        fontSize: 20,
        fontWeight: 'bold',
      }
    },
    deviceInfo: (styletype) => {
      if (styletype === 'Grid') {
        return {
          display: 'none',
        }
      }
      return {
        fontSize: 14,
        color: '#666666',
      }
    },
    deviceWarning: (styletype) => {
      if (styletype === 'Grid') {
        return {
          fontSize: 8,
          color: 'red',
        }
      }
      return {
        fontSize: 16,
        color: 'red',
      }
    },
});

