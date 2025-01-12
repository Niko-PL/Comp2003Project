import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Dimensions  } from "react-native";
import React, { useState } from "react";
import { Button, Input } from "react-native-elements";
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';

export default function AddNewDevice() {
    


    return (
        <View style={styles.container}>
            <Text style={styles.header}>Enter Details</Text>
            <Image source={require('@/assets/images/adaptive-icon.png')} style={styles.ImageContainer}/>
            <View style={styles.InputContainer}>
                <InputCard InputHeader="Device Name" InputPlaceholder="Device Name"/>
                <DateCard DateHeader="Install Date" DatePlaceholder="Install Date"/>
                <DateCard DateHeader="Last Maintenance" DatePlaceholder="Last Maintenance"/>
                <InputCard InputHeader="Additional Notes" InputPlaceholder="Notes" MaxLines={10} multiline={true}/>
            </View>
        </View>
    )

}

function InputCard({
    InputHeader = "Deafult Header",
    InputPlaceholder = "Default Placeholder",
    MaxLines = 1,
    multiline = false
}) {
    return (
        <View style={styles.InputBoxContainer}>
            <Text style={styles.InputTextHeader}>Enter {InputHeader}</Text>
            <TextInput multiline={multiline} style={styles.InputBox} allowFontScaling numberOfLines={MaxLines} placeholderTextColor={"#00000040"} placeholder={InputPlaceholder} />
        </View>
    )
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
            <Text style={styles.InputTextHeader}>Enter {DateHeader}</Text>
            <Button buttonStyle={styles.InputButtonBox} titleStyle={styles.InputBox} title={ButtonText} onPress={() => setCalenderVisible(!seeCalender)}/>
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

      ImageContainer: {
        width: 200,
        height: 200,

        marginTop: 10,
        marginLeft: 20,
      },

      InputContainer: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        margin: 10,
     

        elevation: 2,
      },

      InputBoxContainer: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',

        margin: 12,
        height: 70,
        paddingHorizontal: 10,
        borderBottomColor: '#000000',
        borderBottomWidth: 3,
        
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
      },

      
}
);