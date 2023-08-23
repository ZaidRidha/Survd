import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { doc, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { database } from '../../firebaseConfig';

const FullMapScreen = () => {
  const navigation = useNavigation();
  const auth = getAuth();
  const [postcode, setPostcode] = useState('');
  const [uid, setUid] = useState(null);
  const [currentLat, setcurrentLat] = useState(null);
  const [currentLong, setcurrentLong] = useState(null);

  const goBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      } else {
        setUid(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchUserLocationAndReverseGeocode = async () => {
      const userDocRef = doc(database, 'users', uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists) {
        const userData = userDoc.data();

        if (userData && 'latitude' in userData && 'longitude' in userData) {
          const { longitude, latitude } = userData;

          setcurrentLat(latitude);
          setcurrentLong(longitude);
        }
      } else {
        console.log('No such user!');
      }
    };

    fetchUserLocationAndReverseGeocode();
  }, [uid, database, setcurrentLat, setcurrentLong]);

  return (
    <View style={styles.root}>
      {currentLat && currentLong ? (
        <MapView
          initialRegion={{
            latitude: currentLat,
            longitude: currentLong,
            latitudeDelta: 0.004,
            longitudeDelta: 0.004,
          }}
          provider={PROVIDER_GOOGLE}
          style={styles.map}>
          <Marker coordinate={{ latitude: currentLat, longitude: currentLong }} />

          <Marker coordinate={{ latitude: 51.3812, longitude: -0.2452 }}>
            <Icon
              type="entypo"
              name="scissors"
              color="black"
              size={38}
              style={styles.locationIcon}
            />
          </Marker>
        </MapView>
      ) : (
        <Text>Loading...</Text> // You can replace this with a loading spinner or a similar component
      )}
      <TouchableOpacity
        onPress={goBack}
        style={styles.goBackButton}>
        <Icon
          type="ant-design"
          name="close"
          color="black"
          size={38}
        />
      </TouchableOpacity>
    </View>
  );
};

export default FullMapScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },

  map: {
    flex: 1,
  },

  locationIcon: {
    marginTop: 5,
    marginBottom: 10,
  },

  goBackButton: {
    position: 'absolute',
    top: 30,
    left: 15,
    zIndex: 1,
  },
});
