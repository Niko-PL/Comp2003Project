
import { StyleSheet } from 'react-native';



export function MobileMap(props : any) {
    return (
      <iframe
      style={styles.MapDisplay}
      loading="lazy"
      src="https://www.google.com/maps/embed/v1/place?key=API_KEY
        &q={}">
      </iframe>
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