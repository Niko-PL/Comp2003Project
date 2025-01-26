import React from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, RefreshControl , TouchableOpacity } from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const SettingsStack = createNativeStackNavigator();


export default function HomeScreen() {
    return (
  
        <SettingsStack.Navigator screenOptions={{headerShown: false}}>
          <SettingsStack.Screen 
            name="MainPage" 
            component={MainPage} 
          />
        </SettingsStack.Navigator>
  
    );
  };

const MainPage = ({navigation}) => {
    
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Settings</Text>
            <View style={styles.subcontainer}>
              <Text style={styles.subheader}>Account</Text>
              <View style={styles.infocontainer}>
                <Text style={styles.infotext}>logged in as: </Text>
                <TouchableOpacity style={styles.logoutbutton}>
                  <Text style={styles.logouttext}>Logout</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.subcontainer}>
              <Text style={styles.subheader}>Notifications</Text> 
              <View style={styles.infocontainer}>
                <Text style={styles.infotext}>Push Notifications are currently: </Text>
                <TouchableOpacity style={styles.logoutbutton}>
                  <Text style={styles.logouttext}>ON</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.subcontainer}>
              <Text style={styles.subheader}>Organization</Text>
              <View style={styles.infocontainer}>
                <Text style={styles.infotext}>Current Organization: </Text>
                <TouchableOpacity style={styles.logoutbutton}>
                  <Text style={styles.logouttext}>Change</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/*
            <View style={styles.subcontainer}>
              <Text style={styles.subheader}>Privacy</Text>
            </View>
            <View style={styles.subcontainer}>
              <Text style={styles.subheader}>Help</Text>
            </View>
            <View style={styles.subcontainer}>
              <Text style={styles.subheader}>About</Text>
            </View>
            */}
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

      subheader: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'left',
        color: '#000000',
        marginTop: 20,
      },

      subcontainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        
        margin: 10,

      },

      infocontainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 5,
        padding: 10,
      },

      infotext: {
        fontSize: 16,
        textAlign: 'left',
        color: '#000000',
      },

      logoutbutton: {
        backgroundColor: '#FF5733',
        padding: 10,
        borderRadius: 5,
      },

      logouttext: {
        color: '#FFFFFF',
      },
});