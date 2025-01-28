import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, RefreshControl , TouchableOpacity ,TouchableWithoutFeedback , Keyboard } from 'react-native';
import { Icon } from 'react-native-elements';

//import { DeviceCardElement } from '@/components/DeviceCard';

import { CreateDeviceCardListFromJson } from '@/components/CreateDeviceCardListFromJson'

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



const MainPage = ({navigation}) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [deviceList, setDeviceList] = React.useState('List');
  const [searchQuery, setSearchQuery] = React.useState('');

  {/* Refresh Control to change when API is introduced*/}
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <ThemedView style={styles.container}>
    {/* Header */}
    <ThemedText style={styles.header}>Your Devices</ThemedText>

    {/* Search Bar */}
    <View style={styles.searchContainer}>
      <Icon name="search" type="font-awesome" size={25} color="#FF5733" style={styles.searchIcon} />
      <TextInput placeholder="Search ... " placeholderTextColor="#0D2A3880" style={styles.searchInput} value={searchQuery} onChangeText={setSearchQuery}/>
      <TouchableOpacity onPress={() => setSearchQuery('')}>
        <Icon name="close" type="font-awesome" size={15} color="#FF5733" style={styles.searchIcon} />
      </TouchableOpacity>
    </View>

    {/* Filter and Grid Buttons */}
    <View style={styles.filterGridContainer}>
      <TouchableOpacity style={styles.PropertyButton}>
        <Icon style={styles.IconCircle} name="filter" type="font-awesome" size={15} color='#FFFFFF' />
        <Text style={{ color: '#000000', marginLeft: 5, fontSize: 18  }}>Filter</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.PropertyButton} onPress={() => setDeviceList(deviceList == 'List' ? 'Grid' : 'List')}>
        <Icon style={styles.IconCircle} name="th-large" type="font-awesome" size={15} color="#FFFFFF" />
        <Text style={{ color: '#000000', marginLeft: 5, fontSize: 18 }}>{deviceList}</Text>
      </TouchableOpacity>
    </View>

    {/* Device List */}
    <ScrollView contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap'}} style={styles.deviceList(deviceList)} refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
      <CreateDeviceCardListFromJson navigation={navigation} styletype={deviceList} searchQuery={searchQuery} />
    </ScrollView>

    </ThemedView>
    </TouchableWithoutFeedback>
  )
}
/* horizontal={deviceList == 'List' ? false : true} */

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
    borderRadius: 33,
    margin: 12,
    height: 50,
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
  deviceList: (styletype) => {

    if (styletype === 'List') {
      return {
        flex: 1,
        marginHorizontal: 10,
      }
    }
  
    return {

      flex: 1,
      
      marginHorizontal: 10,
    }
    
  },
});