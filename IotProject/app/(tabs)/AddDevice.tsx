import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput  } from "react-native";
import React, { useState } from "react";
import { Button, Input } from "react-native-elements";
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';

export default function AddNewDevice() {
    const [date , setDate] = useState(dayjs());
    const [seeCalender, setCalenderVisible] = useState(Boolean);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Enter Details</Text>
            <View style={styles.InputContainer}>
                <InputCard InputHeader="Device Name" InputPlaceholder="Device Name"/>
                <Button title="Install Date" onPress={() => setCalenderVisible(!seeCalender)}/>

                {seeCalender && <DateTimePicker
                    mode="single"
                    date={date}
                    onChange={(params) => setDate(params.date)}
                />
                }
                

            </View>
        </View>
    )

}

function InputCard({
    InputHeader = "Deafult Header",
    InputPlaceholder = "Default Placeholder"
}) {

    return (
        <View style={styles.InputBoxContainer}>
            <Text style={styles.InputTextHeader}>Enter {InputHeader}</Text>
            <TextInput style={styles.InputBox} allowFontScaling numberOfLines={1} placeholderTextColor={"#00000040"} placeholder={InputPlaceholder} />
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
        color: '#000000',
        flex: 1,
        fontSize: 24,
        
      },
      
}
);