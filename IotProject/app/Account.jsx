import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';



export const AccountField = ({ label, value }) => (
  <View style={styles.fieldContainer}>
    <View style={styles.labelContainer}>
      <Text>{label}</Text>
    </View>
    <View style={styles.valueContainer}>
      <Text>{value}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  fieldContainer: {
    display: 'flex',
    marginTop: 47,
    width: 240,
    maxWidth: '100%',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  labelContainer: {
    lineHeight: 1.4,
  },
  valueContainer: {
    alignSelf: 'stretch',
    flex: 1,
    flexShrink: 1,
    borderRadius: 8,
    borderColor: 'rgba(0, 0, 0, 1)',
    borderStyle: 'solid',
    borderWidth: 1,
    minWidth: 240,
    marginTop: 8,
    width: '100%',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 12,
    paddingBottom: 12,
    overflow: 'hidden',
    lineHeight: 1,
  },
});
