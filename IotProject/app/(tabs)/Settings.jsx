import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Dimensions, Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import {Account} from '../Account';
import {Preferences} from '../Preferences';
import { ButtonUI } from "@/components/ui/Buttons";
import { Ionicons } from '@expo/vector-icons';

const SettingsStack = createNativeStackNavigator();

function SettingsScreen() {
  const navigation = useNavigation();
  // Sample IDs - would come from props/context in real app
  let Company_ID = "XXXXXXXXXXXX"
  let User_ID = "XXXXXXXXXXXX"
  
  // Get screen dimensions
  const windowWidth = Dimensions.get('window').width;
  const isDesktop = windowWidth > 768;
  
  return (
    <View style={styles.pageContainer}>
      <ScrollView contentContainerStyle={[
        styles.scrollContainer,
        !isDesktop && styles.mobileContainer
      ]}>
        <View style={styles.container}>
          {/* Add top spacing for mobile only */}
          {!isDesktop && <View style={styles.topSpacer} />}
          
          {/* Header Title */}
          <Text style={styles.sectionTitle}>Settings</Text>

          {/* Responsive Grid Layout */}
          <View style={[styles.gridContainer, isDesktop && styles.desktopGrid]}>
            {/* Top Row - Company and User IDs */}
            <View style={styles.idContainer}>
              <View style={styles.idBox}>
                <Text style={styles.idLabel}>Company ID:</Text>
                <Text style={styles.idValue}>{Company_ID}</Text>
              </View>
              <View style={styles.idBox}>
                <Text style={styles.idLabel}>User ID:</Text>
                <Text style={styles.idValue}>{User_ID}</Text>
              </View>
            </View>

            {/* Button Grid */}
            <View style={styles.buttonGrid}>
              {/* First Row of Buttons */}
              <View style={styles.buttonRow}>
                {/* Account Button */}
                <View style={[styles.buttonCell, isDesktop && styles.desktopButtonCell]}>
                  <ButtonUI 
                    text="Account"
                    type='alternate'
                    Textstyles={styles.buttonText}
                    extrastyles={styles.button}
                    onPress={() => navigation.navigate("Account")}
                  />
                  <Ionicons name="person-outline" size={24} style={styles.buttonIcon} />
                </View>
                
                {/* Preferences Button */}
                <View style={[styles.buttonCell, isDesktop && styles.desktopButtonCell]}>
                  <ButtonUI 
                    text="Preferences"
                    type='alternate'
                    Textstyles={styles.buttonText}
                    extrastyles={styles.button}
                    onPress={() => navigation.navigate("Preferences")}
                  />
                  <Ionicons name="settings-outline" size={24} style={styles.buttonIcon} />
                </View>
              </View>

              {/* Second Row of Buttons */}
              <View style={styles.buttonRow}>
                {/* Contact Us Button */}
                <View style={[styles.buttonCell, isDesktop && styles.desktopButtonCell]}>
                  <ButtonUI 
                    text="Contact Us"
                    type='alternate'
                    Textstyles={styles.buttonText}
                    extrastyles={styles.button}
                    onPress={() => {}}
                  />
                  <Ionicons name="mail-outline" size={24} style={styles.buttonIcon} />
                </View>
                
                {/* Manage ORG Button */}
                <View style={[styles.buttonCell, isDesktop && styles.desktopButtonCell]}>
                  <ButtonUI 
                    text="Manage ORG"
                    type='alternate'
                    Textstyles={styles.buttonText}
                    extrastyles={styles.button}
                    onPress={() => {}}
                  />
                  <Ionicons name="business-outline" size={24} style={styles.buttonIcon} />
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default function HomeScreen() {
  return (
    <SettingsStack.Navigator screenOptions={{ headerShown: false }}>
      <SettingsStack.Screen name="MainPage" component={SettingsScreen} />
      <SettingsStack.Screen name="Account" component={Account} />
      <SettingsStack.Screen name="Preferences" component={Preferences} />
    </SettingsStack.Navigator>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
  },

  mobileContainer: {
    paddingTop: 30, // Extra padding only for mobile
  },
  
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: "'Inter', sans-serif",
    color: '#000000',
  },
  
  gridContainer: {
    flex: 1,
    width: '100%',
    maxWidth: '100%',
    alignSelf: 'center',
  },

  desktopGrid: {
    maxWidth: 800, // Wider on desktop
    paddingHorizontal: 20,
  },
  
  idContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 30,
    width: '100%',
    paddingHorizontal: 10,
  },
  
  idBox: {
    alignItems: 'center',
    flex: 1,
  },
  
  idLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 5,
  },
  
  idValue: {
    fontSize: 16,
    color: '#000000',
  },
  
  buttonGrid: {
    width: '100%',
    gap: 20,
  },
  
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
    marginBottom: 20,
  },
  
  buttonCell: {
    flex: 1,
    position: 'relative',
    aspectRatio: 1,
  },

  desktopButtonCell: {
    aspectRatio: 1.5,
  },
  
  button: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
  },
  
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
  },
  
  buttonIcon: {
    position: 'absolute',
    top: '20%',
    left: '50%',
    transform: [{translateX: -12}],
    color: '#000000',
  },
});
