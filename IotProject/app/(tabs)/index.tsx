import { ThemedText } from '@/components/ThemedText';
import React from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

import { DeviceCardElement } from '@/components/DeviceCard';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DeviceDetails from '../DeviceDetails';

const Stack = createNativeStackNavigator();

export default function HomeScreen() {
  return (

      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen 
          name="MainPage" 
          component={MainPage} 
          
        />
        <Stack.Screen 
          name="DeviceDetails" 
          component={DeviceDetails} 
        />
      </Stack.Navigator>

  );
};



const MainPage = ({navigation}: {navigation: any}) => {
  return (
    <View style={styles.container}>
    {/* Header */}
    <ThemedText style={styles.header}>Your Devices</ThemedText>

    {/* Search Bar */}
    <View style={styles.searchContainer}>
      <Icon name="search" type="font-awesome" size={25} color="#FF5733" style={styles.searchIcon} />
      <TextInput placeholder="Search ... " placeholderTextColor="#0D2A3880" style={styles.searchInput} />
    </View>

    {/* Filter and Grid Buttons */}
    <View style={styles.filterGridContainer}>
      <TouchableOpacity style={styles.PropertyButton}>
        <Icon style={styles.IconCircle} name="filter" type="font-awesome" size={15} color='#FFFFFF' />
        <Text style={{ color: '#000000', marginLeft: 5, fontSize: 18  }}>Filter</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.PropertyButton}>
        <Icon style={styles.IconCircle} name="th-large" type="font-awesome" size={15} color="#FFFFFF" />
        <Text style={{ color: '#000000', marginLeft: 5, fontSize: 18 }}>Grid</Text>
      </TouchableOpacity>
    </View>

    {/* Device List */}
    <ScrollView style={styles.deviceList}>

      <DeviceCardElement deviceName='Tracker One' lastMaintenance='300' gpsLocation='50.38103 , -4.13800' navigation={navigation}/>
      <DeviceCardElement deviceName='Tracker Two' lastMaintenance='100' gpsLocation='50.58103 , -4.13800' navigation={navigation}/>
    </ScrollView>

    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
    borderRadius: 20,
    margin: 12,
    height: 40,
    paddingHorizontal: 10,
    borderColor: '#0D2A38',
    borderWidth: 3,
    elevation: 2,
  },
  searchIcon: {
    color: '#FF5733',
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
  IconCircle: {
    backgroundColor: '#FF5733',
    borderRadius: 50,
    width: 30,
    padding: 5
  },
  PropertyButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#FF573300',
    borderColor: '#0D2A38',
    borderWidth: 3,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 20,
    borderRadius: 30,
  },
  deviceList: {
    flex: 1,
    marginHorizontal: 10,
    
    
  },
});