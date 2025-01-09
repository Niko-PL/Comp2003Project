import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

export default function AddNewDevice() {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Enter Details</Text>
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
}
);