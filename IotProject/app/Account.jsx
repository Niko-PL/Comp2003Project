import React from 'react';
import { StyleSheet, View, Text,TextInput, ScrollView } from 'react-native';
import { ButtonUI } from "@/components/ui/Buttons";

export function Account() {
  let Account_Name = "Account_Name"
  let Company_ID = "Company_Id"
  let Legal_Name = "Legal_Name"
  let Acccount_Level = "Acccount_Level"
  return (
    
    

    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.sectionTitle}>Settings</Text>
      <View style={styles.container}>

        
        <View style={styles.fieldContainer}>
          <View style={styles.labelContainer}>
            <Text style ={styles.SubText}>Account Name</Text>
          </View>
          <View style={styles.valueContainer}>
            <Text>{Account_Name}</Text>
          </View>
        </View>
        
        <View style={styles.fieldContainer}>
          <View style={styles.labelContainer}>
            <Text style ={styles.SubText}>Company ID</Text>
          </View>
          <View style={styles.valueContainer}>
            <Text>{Company_ID}</Text>
          </View>

        <View style={styles.fieldContainer}>
          <View style={styles.labelContainer}>
            <Text style ={styles.SubText}>Legal Name</Text>
          </View>
          <View style={styles.valueContainer}>
            <Text>{Legal_Name}</Text>
          </View>
        </View>

        <View style={styles.fieldContainer}>
          <View style={styles.labelContainer}>
            <Text style ={styles.SubText}>Account Level</Text>
          </View>
          <View style={styles.valueContainer}>
            <Text>{Acccount_Level}</Text>
          </View>
        </View>

        </View>
        <ButtonUI text="Log Out" type='destructive' extrastyles={{marginTop: 10}}  Textstyles={{fontSize: 24}}  onPress={() => {}} />
      </View>
      
    </ScrollView>
  );
}



const styles = StyleSheet.create({

  sectionTitle: {
    fontSize: 24,
    paddingTop: 30,
    fontWeight: 'bold',

    fontFamily: "'Inter', sans-serif",
    color: '#000000',
  },

  container: {
    paddingTop: 0,
    paddingRight: 48,
    paddingBottom: 0,
    paddingLeft: 48,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    flexGrow: 1,
    height: "100%",
  },
  fieldContainer: {
    display: "flex",
    marginTop: 20,
    width: 240,
    maxWidth: "100%",
    flexDirection: "column",
    alignItems: "stretch",
  },
  labelContainer: {
    lineHeight: 1.4,
  },
  SubText:{
    textAlign: "left",
    fontSize: 20,
  },
  valueContainer: {
    alignSelf: "stretch",
    flex: 1,
    flexShrink: 1,
    borderRadius: 8,
    borderColor: "rgba(0, 0, 0, 1)",
    borderStyle: "solid",
    borderWidth: 1,
    minWidth: 240,
    marginTop: 8,
    width: "100%",
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 12,
    paddingBottom: 12,
    overflow: "hidden",
    lineHeight: 1,
  },
});
