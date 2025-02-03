import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Account</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Preferences</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Contact Us</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Manage ORG</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button_red}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
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
  button: {
    backgroundColor: '#fe5824',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: "100%",
    marginBottom: 15,
  },
  button_red: {
    backgroundColor: '#d10e0e',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop:30,
    marginBottom: 15,
    width: "100%",
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
});
