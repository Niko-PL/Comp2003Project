import { ThemedText } from '@/components/ThemedText';
import React from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

import { DeviceCardElement } from '@/components/DeviceCard';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <ThemedText style={styles.header}>Your Devices</ThemedText>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="search" type="font-awesome" size={20} style={styles.searchIcon} />
        <TextInput placeholder="Search ... 2 Devices" style={styles.searchInput} />
      </View>

      {/* Filter and Grid Buttons */}
      <View style={styles.filterGridContainer}>
        <TouchableOpacity style={styles.PropertyButton}>
          <Icon name="filter" type="font-awesome" size={25} color='#FF5733' />
          <Text style={{ color: '#000000', marginLeft: 5, fontSize: 18  }}>Filter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.PropertyButton}>
          <Icon name="th-large" type="font-awesome" size={25} color="#FF5733" />
          <Text style={{ color: '#000000', marginLeft: 5, fontSize: 18 }}>Grid</Text>
        </TouchableOpacity>
      </View>

      {/* Device List */}
      <ScrollView style={styles.deviceList}>

        <DeviceCardElement deviceName='Tracker One' lastMaintenance='300' gpsLocation='40.741895, -73.989308'/>

      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000',
    marginTop: 60,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    margin: 12,
    height: 40,
    paddingHorizontal: 10,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 5,
  },
  searchInput: {
    color: '#000000',
    flex: 1,
    fontSize: 16,
  },
  filterGridContainer: {
    flexDirection: 'row',
    gap: 10,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  PropertyButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#FF573300',
    borderColor: '#FF5733',
    borderWidth: 3,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 20,
  },
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