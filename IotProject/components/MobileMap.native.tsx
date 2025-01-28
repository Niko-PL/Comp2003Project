import MapView , {Marker} from 'react-native-maps';
import { StyleSheet , View , Text} from 'react-native';

export function MobileMap(props : any) {
    return (
      <View style={styles.MapContainer}>
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
          <View style={styles.MapInfo}>
            <Text style={styles.MapLocation}>
              GPS Location: {}
              <Text style={styles.MapLocationText}>
              {props.gpsLocation}
              </Text>
            </Text>
          </View>
      </View>
    )
}

const styles = StyleSheet.create({
    MapContainer: {
      alignSelf: 'center',
      borderRadius: 20,
      borderColor: '#000000',
      borderWidth: 2,
      width: '90%',
      overflow: 'hidden',
    },

    MapDisplay: {
      alignSelf: 'center',
      borderRadius: 20,

      width: '102%',
      height: 300,
    },



    MapInfo: {
      alignSelf: 'center',
      borderRadius: 20,
    },

    MapLocation: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#000000',
    },

    MapLocationText: {
      fontSize: 16,
      fontWeight: 'normal',
      color: '#000000',
    },

});