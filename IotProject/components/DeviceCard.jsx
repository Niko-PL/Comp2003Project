import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";


export function DeviceCardElement ({
    deviceName = "Unknown Device",
    lastMaintenance = "N/A",
    gpsLocation = "N/A",
    warning = null,
    imageUrl = "https://via.placeholder.com/50",
    navigation,
}){
  return (
    <TouchableOpacity style={styles.deviceCard} onPress={() => navigation.navigate('DeviceDetails', {
      deviceName: deviceName,
      lastMaintenance: lastMaintenance,
      gpsLocation: gpsLocation,
      warning: warning,
      imageUrl: imageUrl,
    })}>
    <Image source={{ uri: imageUrl }} style={styles.deviceImage} />
        <View style={styles.deviceDetails}>
        <Text style={styles.deviceName}>{deviceName}</Text>
        <Text style={styles.deviceInfo}>Last Maintenance: {lastMaintenance} days ago</Text>
        <Text style={styles.deviceInfo}>GPS LOCATION: {gpsLocation}</Text>
        <GetWarning haswarning={warning}/>
        </View>
    </TouchableOpacity>
  );
}

const GetWarning = props => {
    if (props.haswarning) {
      return <Text style={styles.deviceWarning}>{props.haswarning}</Text>;
    }
    return null;
  };

const styles = StyleSheet.create({
    deviceList: {
      flex: 1,
      marginHorizontal: 10,
    },
    deviceCard: {
      flexDirection: 'row',
      backgroundColor: '#FFFFFF',
      borderRadius: 8,
      padding: 10,
      width: '98%',
      alignSelf: 'center',
      marginBottom: 10,
      elevation: 2,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      
    },
    deviceImage: {
      width: 50,
      height: 50,
      marginRight: 10,
    },
    deviceDetails: {
      flex: 1,
    },
    deviceName: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    deviceInfo: {
      fontSize: 14,
      color: '#666666',
    },
    deviceWarning: {
      fontSize: 14,
      color: '#FF5733',
    },
});

