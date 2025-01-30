import MapView , {Marker} from 'react-native-maps';
import { StyleSheet , View , Text, TouchableOpacity} from 'react-native';
import { useState } from 'react';

export function MobileMap(props : any) {
  const [Refresh, setRefresh] = useState(true);


  function RefreshMap() {
    setRefresh(false);
    setTimeout(() => {
      setRefresh(true);
    }, 100);
  }


    return (
      
      <View style={styles.MapContainer}>
        {Refresh && <MapView style={styles.MapDisplay} initialRegion={{
            latitude: Number((props.gpsLocation).split(',')[0]),
            longitude: Number((props.gpsLocation).split(',')[1]),
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
          }}
          >
          <Marker coordinate={{

            latitude: Number((props.gpsLocation).split(',')[0]),
            longitude: Number((props.gpsLocation).split(',')[1]),
          }}
          >
            <View style={styles.Marker}></View>
            <Text style={styles.MarkerText}>{props.DeviceName}</Text>
          </Marker>
          
          </MapView>
          }
          <TouchableOpacity style={styles.MapInfo} onPress={() => RefreshMap()}>
            <Text style={styles.MapLocation}>
              GPS Location: {}
              <Text style={styles.MapLocationText}>
              {props.gpsLocation}
              </Text>
            </Text>
          </TouchableOpacity>

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

    Marker: {
      alignSelf: 'center',
      width: 30,
      height: 30,
      backgroundColor: '#FF5733',
      borderRadius: 33,
      borderWidth: 5,
      borderColor: '#FFFFFF50',

    },

    MarkerText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#FFFFFF',
      zIndex: 1000,
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