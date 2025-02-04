import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';  // Import useNavigation
import {Account} from '@/app/Account'; // Make sure the path is correct
import { ButtonUI } from "@/components/ui/Buttons";


const SettingsStack = createNativeStackNavigator();

function SettingsScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Title Section */}
      <Text style={styles.sectionTitle}>Settings</Text>

      {/* Info Section */}
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <View style={styles.infoCollum}>
            <Text style={styles.infoLabel}>Company ID:</Text>
            <Text style={styles.infoValue}>XXXXXXXXX</Text>
          </View>
          <View style={styles.infoCollum}>
            <Text style={styles.infoLabel}>User ID:</Text>
            <Text style={styles.infoValue}>XXXXXXXXX</Text>
          </View>
        </View>
      </View>

      {/* Settings Buttons */}
      <View>
        <ButtonUI text="Account" type='alternate' icon="User-icon" Textstyles={{fontSize: 24}} onPress={() => { }} />

        <ButtonUI text="Preferences" type='alternate' icon="User-icon" Textstyles={{fontSize: 24}} onPress={() => {}} />

        <ButtonUI text="Contact Us" type='alternate' icon="User-icon" Textstyles={{fontSize: 24}} onPress={() => {}} />

        <ButtonUI text="Manage ORG" type='alternate' icon="User-icon" Textstyles={{fontSize: 24}} onPress={() => {}} />
        
        <ButtonUI text="Log Out" type='exit' icon="User-icon" Textstyles={{fontSize: 24}} onPress={() => {}} />
      </View>

    </ScrollView>
  );
}

export default function HomeScreen() {
  return (
    <SettingsStack.Navigator screenOptions={{ headerShown: false }}>
      <SettingsStack.Screen name="MainPage" component={SettingsScreen} />
    </SettingsStack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 38,
    paddingRight: 48,
    paddingBottom: 76,
    paddingLeft: 48,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    flexGrow: 1,
    height: "100%",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    fontFamily: "'Inter', sans-serif",
    color: '#000000',
  },
  infoContainer: {
    marginBottom: 54,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 100,
  },
  infoCollum: {
    flexDirection: 'collum',
    alignItems: 'center',
    marginBottom: 20,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginRight: 10,
  },
  infoValue: {
    fontSize: 16,
    color: '#000000',
  },

});
