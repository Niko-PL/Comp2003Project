import React from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions } from 'react-native';
import { ButtonUI } from "@/components/ui/Buttons";

export function Account() {
  // Get screen dimensions
  const windowWidth = Dimensions.get('window').width;
  const isDesktop = windowWidth > 768;

  //temp variables to be changed
  let Account_Name = "Account_Name"
  let Company_ID = "Company_Id" 
  let Legal_Name = "Legal_Name"
  let Acccount_Level = "Acccount_Level"

  return (
    <ScrollView contentContainerStyle={[
      styles.container,
      !isDesktop && styles.mobileContainer
    ]}>
      <Text style={[styles.sectionTitle, styles.pageTitle]}>Account Settings</Text>

      <View style={[styles.contentContainer, isDesktop && styles.desktopContent]}>
        <View style={styles.fieldsWrapper}>
          <View style={styles.fieldContainer}>
            <View style={styles.labelContainer}>
              <Text style={styles.SubText}>Account Name</Text>
            </View>
            <View style={styles.valueContainer}>
              <Text style={styles.valueText}>{Account_Name}</Text>
            </View>
          </View>
          
          <View style={styles.fieldContainer}>
            <View style={styles.labelContainer}>
              <Text style={styles.SubText}>Company ID</Text>
            </View>
            <View style={styles.valueContainer}>
              <Text style={styles.valueText}>{Company_ID}</Text>
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <View style={styles.labelContainer}>
              <Text style={styles.SubText}>Legal Name</Text>
            </View>
            <View style={styles.valueContainer}>
              <Text style={styles.valueText}>{Legal_Name}</Text>
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <View style={styles.labelContainer}>
              <Text style={styles.SubText}>Account Level</Text>
            </View>
            <View style={styles.valueContainer}>
              <Text style={styles.valueText}>{Acccount_Level}</Text>
            </View>
          </View>
        </View>

        <ButtonUI 
          text="Log Out" 
          type='destructive' 
          extrastyles={styles.logoutButton}
          Textstyles={styles.logoutText}
          onPress={() => {}}    //log out function
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    flexGrow: 1,
    minHeight: '100%'
  },

  mobileContainer: {
    paddingTop: 30,
  },

  contentContainer: {
    width: '100%',
    maxWidth: 600,
    flex: 1,
  },

  desktopContent: {
    maxWidth: 800,
    paddingHorizontal: 40,
  },

  sectionTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 20,
    marginBottom: 20,
    fontFamily: "'Inter', sans-serif",
    color: '#000000',
  },

  pageTitle: {
    textAlign: 'center',
    width: '100%',
    marginBottom: 40,
  },

  fieldsWrapper: {
    width: '100%',
    gap: 24,
  },

  fieldContainer: {
    width: '100%',
  },

  labelContainer: {
    marginBottom: 8,
  },

  SubText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#666666',
  },

  valueContainer: {
    borderRadius: 8,
    borderColor: "#CCCCCC",
    borderStyle: "solid",
    borderWidth: 1,
    padding: 16,
    backgroundColor: '#F8F8F8',
  },

  valueText: {
    fontSize: 16,
    color: '#000000',
  },

  logoutButton: {
    marginTop: 40,
    marginBottom: 20,
    width: '100%',
  },

  logoutText: {
    fontSize: 18,
    fontWeight: '600',
  }
});
