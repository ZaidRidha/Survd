import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectCurrentLoc } from '../../slices/locSlice';

const WIDTH = Dimensions.get('window').width;

const ContinueScreen = () => {
  const route = useRoute();
  const currentLoc = useSelector(selectCurrentLoc);
  const { lat, long } = route.params;

  const polylineCoords = [
    { latitude: currentLoc.lat, longitude: currentLoc.lng },
    { latitude: lat, longitude: long },
  ];

  const [mapRegion, setMapRegion] = useState(null);

  useEffect(() => {
    const getMapRegion = () => {
      const MIN_LATITUDE_DELTA = 0.005;
      const MIN_LONGITUDE_DELTA = 0.005;

      const LATITUDE_DELTA = Math.max(
        MIN_LATITUDE_DELTA,
        Math.abs(currentLoc.lat - lat) * 2.5
      );
      const LONGITUDE_DELTA = Math.max(
        MIN_LONGITUDE_DELTA,
        Math.abs(currentLoc.lng - long) * 2.5
      );

      const midLat = (currentLoc.lat + lat) / 2;
      const midLng = (currentLoc.lng + long) / 2;

      return {
        latitude: midLat,
        longitude: midLng,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      };
    };

    const region = getMapRegion();
    setMapRegion(region);
  }, [currentLoc, lat, long]);

  return (
    <View style={styles.root}>
      <MapView provider={PROVIDER_GOOGLE} style={styles.map} region={mapRegion}>
        <Polyline coordinates={polylineCoords} strokeColor="black" strokeWidth={2} />
        <Marker coordinate={polylineCoords[0]} />
        <Marker coordinate={polylineCoords[1]} />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  map: {
    width: WIDTH - 50,
    alignSelf: 'center',
    borderRadius: 10,
    height: 150,
    marginTop: 10,
  },
});

export default ContinueScreen;
