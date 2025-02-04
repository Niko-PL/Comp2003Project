import React from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { ButtonUI } from "@/components/ui/Buttons";

export function Preferences() {
  // State for dark mode and notifications toggles
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(false);

  // Get screen dimensions
  const windowWidth = Dimensions.get('window').width;
  const isDesktop = windowWidth > 768;

  return (
    <ScrollView contentContainerStyle={[
      styles.container,
      !isDesktop && styles.mobileContainer
    ]}>
      {/* Page Title */}
      <Text style={[styles.sectionTitle, styles.pageTitle]}>Preferences</Text>

      {/* Dark Mode Toggle Section */}
      <View style={styles.toggleSection}>
        <View style={styles.toggleInner}>
          <Text style={styles.toggleLabel}>Mode</Text>
          <View style={styles.toggleButtonContainer}>
            <TouchableOpacity 
              style={[
                styles.toggleButton,
                !isDarkMode && styles.activeToggle
              ]}
              onPress={() => setIsDarkMode(false)}
            >
              <Text style={[styles.toggleText, !isDarkMode && styles.activeToggleText]}>Light</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.toggleButton,
                isDarkMode && styles.activeToggle
              ]}
              onPress={() => setIsDarkMode(true)}
            >
              <Text style={[styles.toggleText, isDarkMode && styles.activeToggleText]}>Dark</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Notifications Toggle Section */}
      <View style={styles.toggleSection}>
        <View style={styles.toggleInner}>
          <Text style={styles.toggleLabel}>Notifications</Text>
          <View style={styles.toggleButtonContainer}>
            <TouchableOpacity 
              style={[
                styles.toggleButton,
                notificationsEnabled && styles.activeToggle
              ]}
              onPress={() => setNotificationsEnabled(true)}
            >
              <Text style={[styles.toggleText, notificationsEnabled && styles.activeToggleText]}>ON</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.toggleButton,
                !notificationsEnabled && styles.activeToggle
              ]}
              onPress={() => setNotificationsEnabled(false)}
            >
              <Text style={[styles.toggleText, !notificationsEnabled && styles.activeToggleText]}>OFF</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // Container styles
  container: {
    paddingHorizontal: 48,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    flexGrow: 1,
    height: "100%"
  },

  mobileContainer: {
    paddingTop: 30, // 10 more than desktop
  },

  // Title styles
  sectionTitle: {
    fontSize: 24,
    paddingTop: 20,
    fontWeight: 'bold',
    fontFamily: "'Inter', sans-serif",
    color: '#000000',
  },

  pageTitle: {
    textAlign: 'center',
    width: '100%',
    marginBottom: 30,
    fontSize: 32
  },

  // Toggle section styles
  toggleSection: {
    borderWidth: 1,
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    maxWidth: 340,
    marginTop: 20
  },

  toggleInner: {
    alignItems: 'center',
    width: '100%'
  },

  toggleLabel: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 15
  },

  toggleButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 12,
    alignItems: 'center'
  },

  // Toggle button styles
  toggleButton: {
    width: 120,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8
  },

  activeToggle: {
    backgroundColor: '#fe5824',
    borderColor: '#fe5824'
  },

  toggleText: {
    fontSize: 20
  },

  activeToggleText: {
    color: '#FFFFFF'
  }
});
