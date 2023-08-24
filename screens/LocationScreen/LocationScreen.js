import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/themed';
import { doc, getDoc } from 'firebase/firestore';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import * as Location from 'expo-location';
import { database } from '../../firebaseConfig';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const LocationScreen = () => {
  const navigation = useNavigation();
  const auth = getAuth();

  const [postcode, setPostcode] = useState('');
  const [uid, setUid] = useState(null); // Add the state for storing uid

  const [currentLat, setcurrentLat] = useState(null);
  const [currentLong, setcurrentLong] = useState(null);
  const [address, setAddress] = useState(null);

  const handleMapPress = () => {
    navigation.navigate('FullMapScreen');
  };

  /*   useEffect(() => {
    const getPostcodeFromLocation = async (latitude, longitude) => {
      try {
        const location = {
          latitude,
          longitude,
        };

        const result = await reverseGeocodeAsync(location);

        if (result.length > 0) {
          const { postalCode } = result[0];
          setPostcode(postalCode); // Store the postcode in state
        }
      } catch (error) {
        console.log('Error retrieving postcode:', error);
      }
    };

    // Call the function with the currentLoc values
    getPostcodeFromLocation(currentLoc.lat, currentLoc.lng);
  }, [currentLoc]);
 */

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      } else {
        setUid(null);
      }
    });

    return () => unsubscribe(); // Cleanup the event listener on unmount
  }, []);

  useEffect(() => {
    const fetchUserLocationAndReverseGeocode = async () => {
      const userDocRef = doc(database, 'users', uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists) {
        const userData = userDoc.data();

        // Check if userData exists and contains latitude and longitude
        if (userData && 'latitude' in userData && 'longitude' in userData) {
          const { longitude, latitude } = userData;

          setcurrentLat(latitude);
          setcurrentLong(longitude);

          const result = await Location.reverseGeocodeAsync({ latitude, longitude });
          setAddress(result);

          // Reverse geocoding
        }
      } else {
        console.log('No such user!');
      }
    };

    fetchUserLocationAndReverseGeocode();
  }, [uid, database, setcurrentLat, setcurrentLong, setAddress]);

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.root}>
        <View className="self-start ">
          <TouchableOpacity onPress={goBack}>
            <Icon
              type="ant-design"
              name="close"
              color="black"
              size={38}
              style={styles.locationIcon}
            />
          </TouchableOpacity>
        </View>

        <View
          style={styles.topButton}
          className="p-2  self-center mb-5">
          <View className="flex flex-row  items-center justify-between">
            <View className="flex flex-row items-center">
              <Icon
                type="font-awesome"
                name="location-arrow"
                color="black"
                size={31}
              />
              <View>
                <Text
                  style={styles.poppinsMed}
                  className=" text-base ml-4 ">
                  Current Location
                </Text>
                <Text
                  style={styles.poppinsMed}
                  className=" text-base ml-4 ">
                  {address ? address[0].name : 'Loading...'}
                </Text>
                <Text
                  style={styles.poppinsMed}
                  className=" text-base ml-4 ">
                  {address ? address[0].postalCode : 'Loading...'}
                </Text>
              </View>
            </View>
            <Icon
              type="antdesign"
              name="right"
              color="black"
              size={21}
            />
          </View>
        </View>

        {currentLat && currentLong ? (
          <MapView
            initialRegion={{
              latitude: currentLat,
              longitude: currentLong,
              latitudeDelta: 0.004,
              longitudeDelta: 0.004,
            }}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            onPress={handleMapPress}>
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
          <ActivityIndicator
            size="large"
            color="#0000ff"
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  root: {
    flex: 1,
    backgroundColor: 'white',
  },
  poppingReg: {
    fontFamily: 'PoppinsMed',
  },

  topButton: {
    borderWidth: 2,
    width: WIDTH * 0.95,
    borderRadius: 10,
    borderColor: 'black',
  },

  map: {
    width: WIDTH * 0.9,
    alignSelf: 'center',
    height: HEIGHT * 0.6,
    marginBottom: 5,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 5,
  },

  marker: {
    color: 'black',
  },

  locationIcon: {
    marginTop: 5,
    marginBottom: 10,
  },

  poppinsMed: {
    fontFamily: 'PoppinsMed',
  },
});

export default LocationScreen;
