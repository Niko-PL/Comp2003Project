import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";


export function DeviceCardElement ({
    deviceName = "Unknown Device",
    lastMaintenance = "N/A",
    gpsLocation = "N/A",
    warning = null,
    imageUrl = "https://via.placeholder.com/50",
}){
  return (
    <TouchableOpacity style={styles.deviceCard}>
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
      marginBottom: 10,
      elevation: 2,
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

