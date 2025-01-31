import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

const data = [
    { label: '25/11/2024', value: '1' },
    { label: '30/11/2024', value: '2' },
  ];

export function DropDownComp(props : any) {
    const [value, setValue] = useState(null);

    const renderItem = item => {
      return (
        <View style={styles.item}>
          <Text style={styles.textItem}>{item.label}</Text>
          {item.value === value && (
            <AntDesign
              style={styles.icon}
              color="white"
              name="Safety"
              size={20}
            />
          )}
        </View>
      );
    };

    return (
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select Log"
        searchPlaceholder="Search..."
        value={value}
        onChange={item => {
          setValue(item.value);
        }}
        renderLeftIcon={() => (
          <AntDesign style={styles.icon} color="white" name="book" size={20} />
        )}
        renderItem={renderItem}
      />
    )
}

const styles = StyleSheet.create({
    dropdown: {
      margin: 10,
      height: 50,
      width: '80%',
      borderBottomColor: 'gray',
      borderBottomWidth: 0.5,
      backgroundColor: '#0D2A38',
      borderRadius: 25,
      padding: 10,
    },
    item: {
        margin: 10,
    },
    textItem: {
        fontSize: 20,
    },
    icon: {
      marginRight: 5,
    },
    placeholderStyle: {
      fontSize: 20,
      color: '#FFFFFF',
    },
    selectedTextStyle: {
      fontSize: 16,
      color: '#FFFFFF',
    },
    iconStyle: {
      width: 20,
      height: 20,
      
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
      color: '#FFFFFF',
    },
  });