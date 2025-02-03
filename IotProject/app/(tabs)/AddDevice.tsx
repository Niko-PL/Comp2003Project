import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Dimensions , ScrollView, KeyboardAvoidingView } from "react-native";
import React, { useState , useRef } from "react";
import { Button, Input } from "react-native-elements";
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';

import { ButtonUI } from "@/components/ui/Buttons";

import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

export default function AddNewDevice() {
    const scrollViewRef = useRef<ScrollView>(null);
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Enter Details</Text>
            <KeyboardAvoidingView style={{flex : 1}}  behavior={"padding"} enabled  keyboardVerticalOffset={0}>
            <ScrollView 
                  ref={scrollViewRef}
                  onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
                  style={styles.ScrollViewContainer}
            >
              <View style={styles.InputContainer}>
              <InputCard InputHeader="Device Name" InputPlaceholder="Device Name"/>
              <View style={styles.InputBoxContainer}>
              <Text style={styles.InputTextHeader}>Device Image</Text>
              <Image source={selectedImage ? { uri: selectedImage  } : require('@/assets/images/adaptive-icon.png')} style={styles.ImageContainer}/>
              <TouchableOpacity style={styles.SubmitButton} onPress={async () => {
                try {
                  // Launch image picker
                  const result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ["images"],
                    allowsEditing: true,
                    aspect: [4, 3],
                    quality: 1,
                  });

                  if (!result.canceled) {
                    // Set the selected image URI to state
                    setSelectedImage(result.assets[0].uri);
                  }
                } catch (error) {
                  console.error('Error picking image:', error);
                }
              }}>
                <Text style={styles.SubmitButtonText}>Upload Image</Text>
              </TouchableOpacity>
              </View>

          
                  <InputCard InputHeader="Device Model" InputPlaceholder="Device Model"/>
                  <DateCard DateHeader="Install Date" DatePlaceholder="Install Date"/>
                  <DateCard DateHeader="Last Maintenance" DatePlaceholder="Last Maintenance"/>
                  <InputCard DoesHaveInputInital={false} InputHeader="Techincal Docs" InputPlaceholder="Techincal Docs"/>
                  <InputCard DoesHaveInputInital={false} DoesHaveInputText="Use current Gps Location for this device?" InputHeader="Gps Location" InputPlaceholder="Gps Location" YesOnPress={AccepptButtonForGPS}/>
                  <InputCard InputHeader="Additional Notes" InputPlaceholder="Notes" MaxLines={10} multiline={true}/>


                  <ButtonUI text="Reset" type='secondary' icon="gobackward" extrastyles={{marginTop: 15}}  Textstyles={{fontSize: 24}} onPress={() => {}} />
                  <ButtonUI text="Create Device" type='alternate' icon="plus" Textstyles={{fontSize: 24}} onPress={() => {}} />


              </View>
             
            </ScrollView>
            </KeyboardAvoidingView>
        </View>
    )

}

function InputCard({
    InputHeader = "Deafult Header",
    InputPlaceholder = "Default Placeholder",
    MaxLines = 1,
    multiline = false,
    DoesHaveInputInital = true,
    DoesHaveInputText =  "",
    deafulInputValue = "",
    YesOnPress = () => {},
    NoOnPress = () => {}
}) {

  const [DoesHaveInput, setDoesHaveInput] = useState(DoesHaveInputInital);
  const [InputValue, setInputValue] = useState(deafulInputValue);
  const [isNoPressed, setIsNoPressed] = useState(false);  // Added this line

  if (DoesHaveInputText == ''){
    DoesHaveInputText = "Are " + InputPlaceholder + " Available for this device?"
  }
    return (
        
        <View style={styles.InputBoxContainer}>
            <Text style={styles.InputTextHeader}>{InputHeader}</Text>
            {DoesHaveInput ? 
            <TextInput multiline={multiline} style={styles.InputBox} allowFontScaling numberOfLines={MaxLines} placeholderTextColor={"#00000040"} placeholder={InputPlaceholder} value={InputValue} />
            :
            <View style={styles.DoesHaveInput}>
              
              <View style={styles.DoesHaveInputButtons}>
              <TouchableOpacity style={styles.DoesHaveInputButton}  onPress={() => {
                setDoesHaveInput(true) ; 
                setIsNoPressed(false);
                if (deafulInputValue != ''){
                  setInputValue(deafulInputValue);
                }
                YesOnPress(setInputValue);
                }}>
                <Text>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.DoesHaveInputButton, {backgroundColor: !isNoPressed ? '#00000020' : '#FF5733'}]}  onPress={() => {setDoesHaveInput(false)
                setIsNoPressed(true);
                NoOnPress();
              }}>
                <Text style={{color: !isNoPressed ? '#000' : '#FFF'}}>No</Text>
              </TouchableOpacity>
              </View>

              <Text style={[styles.InputTextHeader, {fontSize: 14}]}>{DoesHaveInputText}</Text>
            </View>
            }
        </View>
    )
}

async function AccepptButtonForGPS(setInputValue: (value: string) => void){
  try {
    // Request permission to access location
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
    }

    // Get current location
    let location = await Location.getCurrentPositionAsync({});
    const latitude = location.coords.latitude.toString().slice(0, 10);
    const lonitude = location.coords.longitude.toString().slice(0, 10);
    const coords = `${latitude}, ${lonitude}`;
    setInputValue(coords);
  } catch (error) {
      console.error('Error getting location:', error);
      alert('Failed to get location');
  }
  
  
}

function DateCard({
    DateHeader = "Default Date Header",
    DatePlaceholder = "Default Date Placeholder"
}) {
    const [seeCalender, setCalenderVisible] = useState(Boolean);
    const [ButtonText , setButtonText] = useState(DatePlaceholder);
    const [date , setDate] = useState(dayjs());

    return (
        <View>
        <View style={styles.InputBoxContainer} needsOffscreenAlphaCompositing >
            <Text style={styles.InputTextHeader}>{DateHeader}</Text>
            <Button buttonStyle={styles.CalInputBoxContainer} titleStyle={styles.CalInputBox} title={ButtonText} onPress={() => setCalenderVisible(!seeCalender)}/>
        </View>
        
        {seeCalender && 
        <View style={styles.CalendarContainer}>
        <DateTimePicker
            mode="single"
            date={date}

           
            onChange={(params) => {
                
                setDate(params.date); 
                setButtonText(dayjs(params.date).format('DD/MM/YYYY'));
                setCalenderVisible(false);
            }}
        />
        <Button title="Close" onPress={() => setCalenderVisible(false)}/>
        </View>
        }
        
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

      ScrollViewContainer: {
        flex: 1,
        padding: 0
      },

      ImageContainer: {
        alignSelf: 'center',
        borderWidth: 3,
        borderColor: '#000000', 
        width: '100%',
        height: 350,

        marginTop: 10,
      },

      InputContainer: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        
        paddingBottom: 200,
        padding: 20,
     
 
        elevation: 2,
      },

      InputBoxContainer: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',

        marginBottom: 10,
        
        minHeight: 70,
        
    
        
      },

      InputTextHeader: {
        marginRight: 5,
        fontSize: 16,
        
      },

      InputBox: {   
        
        textAlign: 'left',
        color: '#000000',
        flex: 1,
        fontSize: 24,
        borderColor: '#00000050',
        
        borderWidth: 1.5,
        borderRadius: 10,
        padding: 10
      },

      CalendarContainer: {
        position: 'absolute',
        
        alignSelf: 'center',
        width: (Dimensions.get('window').width - 50),
        borderColor: '#000000',
        borderWidth: 3,
        bottom: 0,
        backgroundColor: '#FFFFFF',
        zIndex: 1000,
      },

      InputButtonBox: {
        backgroundColor: 'rgba(0,0,0,0)',
        textAlign: 'left',
        flex: 1,
        padding: 10,
       
      },

      CalInputBoxContainer: {
        backgroundColor: 'rgba(0,0,0,0)',
        width: '100%',
        flex: 1,
        textAlign: 'left',
        padding: 10,
        color: '#000000',
        borderColor: '#00000050',
        borderWidth: 1.5,
        borderRadius: 10,
        fontSize: 24,
        alignSelf: 'flex-start',
      },

      CalInputBox: {
        
        textAlign: 'left',
        flex: 1,
        padding: 10,
        color: '#000000',
        fontSize: 24,
      },

      SubmitButton: {

        alignSelf: 'center',
        backgroundColor: '#FF5733',
        width: '90%',
        borderRadius: 10,
        padding: 10,
        margin: 10,
        alignItems: 'center',
      },

      OtherButtons: {
        alignSelf: 'center',
        borderWidth: 1.5,
        borderColor: '#0000000',
        width: '90%',
        borderRadius: 10,
        padding: 10,
        margin: 10,
        alignItems: 'center',
      },

      OtherButtonText: {
        color: '#000000',
        fontSize: 24,
      },

      SubmitButtonText: {
        color: '#FFFFFF',
        fontSize: 24,
      },

      DoesHaveInputButtons: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        gap: 5,
        borderRadius: 10,
        padding: 1,

        
      },

      DoesHaveInputButton: {
        flex: 1,  
        backgroundColor: '#00000020',
        borderRadius: 10,

        padding: 15,
        alignItems: 'center',
      

      },

      DoesHaveInput: {
        
        flexDirection: 'column',
        width: '100%',
        backgroundColor: '#FFFFFF',


        padding: 5,
      },


      
}
);