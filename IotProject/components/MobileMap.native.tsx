import MapView , {Marker} from 'react-native-maps';
import { StyleSheet } from 'react-native';

export function MobileMap(props) {
    return (
        <MapView style={styles.MapDisplay} initialRegion={{
            latitude: Number((props.gpsLocation).split(',')[0]),
            longitude: Number((props.gpsLocation).split(',')[1]),
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
          }}
          >
          <Marker coordinate={{
            latitude: Number((props.gpsLocation).split(',')[0]),
            longitude: Number((props.gpsLocation).split(',')[1]),
          }}/>
          </MapView>
    )
}

const styles = StyleSheet.create({
    
    MapDisplay: {
      alignSelf: 'center',
      borderRadius: 20,
      borderColor: '#FF5733',
      borderWidth: 2,
      width: 350,
      height: 350,
    },

});