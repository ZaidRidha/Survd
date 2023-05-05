import { StyleSheet, Text, View, Dimensions} from 'react-native'
import React from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useNavigation,useRoute  } from '@react-navigation/native';
import { useSelector,useDispatch} from 'react-redux';
import { selectCurrentLoc } from '../../slices/locSlice';
const WIDTH = Dimensions.get("window").width;

const ContinueScreen = () => {

  const route = useRoute();

  const currentLoc = useSelector(selectCurrentLoc);
  console.log(currentLoc.lat);

  const { lat, long,} = route.params;
  return (
    <View style = {styles.root}>
            <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: lat,
          longitude: long,
          latitudeDelta: 0.015,
          longitudeDelta: 0.015,
        }}
      >
        <Marker
          coordinate={{ latitude: lat, longitude: long }}
          title="My Marker"
          description="This is my marker"
        />
      </MapView>
    </View>
  )
}

export default ContinueScreen

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#FFFFFF",
    flex: 1,
  },

  map: {
    width: WIDTH-50,
    alignSelf:"center",
    borderRadius: 10,
    height: 150,
    marginTop:10,
  },
})