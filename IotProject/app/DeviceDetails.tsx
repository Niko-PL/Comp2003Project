import React from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useNavigation } from 'expo-router';

function DeviceDetails({ route }) {
    const navigation = useNavigation();
    const { deviceName , lastMaintenance , gpsLocation, imageUrl} = route.params;

    return (
      <View style={styles.container}>
        <ThemedText  style={styles.header}>
            <Image source={{ uri: imageUrl }} style={styles.deviceImage} />
            {deviceName}
        </ThemedText>
        <Text style={styles.deviceInfo}>Last Maintenance: {lastMaintenance} days ago</Text>
        <Text style={styles.deviceInfo}>GPS LOCATION: {gpsLocation}</Text>
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
    
      deviceImage: {
        width: 60,
        height: 60,
        
      },
});
