import { View, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl, Dimensions, Image } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { Icon, SearchBar } from '@rneui/themed';
import * as Location from 'expo-location';
import { useNavigation, useScrollToTop } from '@react-navigation/native';

import { getDistance } from 'geolib';
import { doc, getDocs, query, collection, where, onSnapshot, updateDoc, getDoc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Fuse from 'fuse.js';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { SCREENS } from 'navigation/navigationPaths';
import AppointmentCard from '../../components/AppointmentCard/AppointmentCard';
import BarberCard from '../../components/BarberCard/BarberCard';
import useFont from '../../useFont';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { database, authentication } from '../../firebaseConfig';
import { selectFilters } from '../../slices/locSlice';

const WIDTH = Dimensions.get('window').width;
// const HEIGHT = Dimensions.get('window').height;

const HomeScreen = () => {
  useFont();
  const navigation = useNavigation();
  const auth = getAuth();
  const filters = useSelector(selectFilters);
  const [storedFilters, setStoredFilters] = useState(null);

  const [currentLat, setcurrentLat] = useState(null);
  const [currentLong, setcurrentLong] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [address, setAddress] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [nearbyBarbers, setNearbyBarbers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const [uid, setUid] = useState(null); // Add the state for storing uid
  const [matchingAppointments, setMatchingAppointments] = useState([]);

  const emptySearchBar = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  useEffect(() => {
    setStoredFilters(filters);
    console.log(storedFilters);
  }, [filters]);

  const navigateFilter = () => {
    navigation.navigate(SCREENS.FILTER_SCREEN);
  };

  const performSearch = async (text) => {
    try {
      setSearchQuery(text);
      const q = query(collection(database, 'barbers'));
      const querySnapshot = await getDocs(q);

      const data = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          name: data.name,
          username: data.username,
        };
      });

      const fuse = new Fuse(data, {
        keys: text.startsWith('@') ? ['username'] : ['name'],
        threshold: 0.3, // Adjust the threshold as needed
      });

      const searchResults = fuse.search(text).map((result) => result.item);

      setSearchResults(searchResults);
    } catch (error) {
      console.error('Error searching Firestore:', error);
    }
  };

  const dispatch = useDispatch();

  const scrollRef = useRef(null);
  useScrollToTop(scrollRef);

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
    const updateAppointments = () => {
      const appointmentsRef = collection(database, 'appointments');
      const q = query(appointmentsRef, where('userID', '==', uid));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const { status } = doc.data();
          const appointmentDate = doc.data().date;
          const appointmentTime = doc.data().time;
          const appointmentDuration = doc.data().duration;

          // Check if appointment is completed based on date, time, and duration
          const currentDate = new Date();
          const appointmentDateTime = new Date(`${appointmentDate} ${appointmentTime}`);
          const appointmentEndTime = new Date(appointmentDateTime.getTime() + appointmentDuration * 60000);

          if (status === 'completed') {
            const appointmentRef = doc.ref;
            updateDoc(appointmentRef, { hidden: true });
          } else if (currentDate > appointmentEndTime && status !== 'cancelled') {
            const appointmentRef = doc.ref;
            updateDoc(appointmentRef, { hidden: true, status: 'completed' });
          }
        });
      });

      return unsubscribe;
    };

    updateAppointments();
  }, [uid]);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (authentication.currentUser) {
        const appointmentsRef = collection(database, 'appointments');
        const q = query(appointmentsRef, where('userID', '==', uid));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const appointments = [];
          querySnapshot.forEach((doc) => {
            const appointmentData = {
              appointmentID: doc.id,
              ...doc.data(),
            };

            // Process the appointment data if needed
            appointments.push(appointmentData);
          });

          setMatchingAppointments(appointments);
        });

        return () => unsubscribe();
      } else {
        const guestName = await AsyncStorage.getItem('guestName');
        const guestEmail = await AsyncStorage.getItem('guestEmail');
        const guestPhone = await AsyncStorage.getItem('guestPhone');

        // Use guestName and other fields for querying
        const appointmentsRef = collection(database, 'appointments');
        const q = query(
          appointmentsRef,
          where('guestName', '==', guestName),
          where('guestEmail', '==', guestEmail),
          where('guestPhone', '==', guestPhone)
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const appointments = [];
          querySnapshot.forEach((doc) => {
            const appointmentData = {
              appointmentID: doc.id,
              ...doc.data(),
            };

            // Process the appointment data if needed
            appointments.push(appointmentData);
          });

          setMatchingAppointments(appointments);
        });
      }
    };

    fetchAppointments(); // Call the function here
  }, [uid]);

  useEffect(() => {
    const updateVerificationStatus = async () => {
      const currentUser = authentication.currentUser; // Get the current user

      if (currentUser) {
        const emailVerified = currentUser.emailVerified; // Check if email is verified
        const phoneVerified = Boolean(currentUser.phoneNumber); // If phoneNumber is present, it's verified

        if (emailVerified || phoneVerified) {
          const userDocRef = doc(database, 'users', currentUser.uid); // Reference to the user's document in Firestore

          // Update the fields in Firestore
          await updateDoc(userDocRef, {
            emailVerified: emailVerified,
            phoneVerified: phoneVerified,
          });
        }
      }
    };

    updateVerificationStatus();
  }, []);

  useEffect(() => {
    const fetchUserLocationAndReverseGeocode = async () => {
      // Check if the user is logged in by verifying uid
      const currentUser = authentication.currentUser;
      if (currentUser) {
        const userID = currentUser.uid;
        // console.log(userID);
        const userDocRef = doc(database, 'users', userID); // Get the document reference
        const userDoc = await getDoc(userDocRef); // Retrieve the document data

        if (userDoc.exists) {
          const { longitude, latitude } = userDoc.data(); // Destructure longitude and latitude from the document data
          setLocation({ longitude, latitude });
          setcurrentLat(latitude);
          setcurrentLong(longitude);
          // console.log(`Longitude: ${longitude}, Latitude: ${latitude}`); // Log the coordinates

          // Reverse geocoding
          const currentAddress = await Location.reverseGeocodeAsync({ latitude, longitude });
          // console.log('hello' + currentAddress);
          setAddress(currentAddress);
        } else {
          // console.log('No such user!');
        }
      } else {
        // If user is not logged in, get their current location instead
        try {
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            console.error('Permission to access location was denied');
            return;
          }
          const currentLocation = await Location.getCurrentPositionAsync({});
          const { longitude, latitude } = currentLocation.coords;
          setLocation({ longitude, latitude });
          setcurrentLat(latitude);
          setcurrentLong(longitude);
          //console.log(`Longitude: ${longitude}, Latitude: ${latitude}`); // Log the coordinates

          // Reverse geocoding
          const currentAddress = await Location.reverseGeocodeAsync({ latitude, longitude });
          setAddress(currentAddress);
        } catch (error) {
          console.error('Error fetching current location:', error);
        }
      }
    };

    fetchUserLocationAndReverseGeocode();
  }, []);

  useEffect(() => {
    (async () => {
      const barbersRef = collection(database, 'barbers');
      const nearBarbers = [];

      for (const serviceType of storedFilters.serviceTypes) {
        const q = query(barbersRef, where(serviceType, '==', true));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          const docData = doc.data();

          const distance = getDistance(
            { latitude: currentLat, longitude: currentLong },
            { latitude: docData.latitude, longitude: docData.longitude }
          );

          const distanceInMiles = (distance / 1609).toFixed(1);

          if (distanceInMiles < storedFilters.distance) {
            nearBarbers.push({ ...docData, distance: distanceInMiles, docId: doc.id });
          }
        });
      }

      // Remove duplicates if any, based on docId
      const uniqueNearBarbers = Array.from(new Map(nearBarbers.map((barber) => [barber.docId, barber])).values());

      // Sorting logic
      switch (storedFilters.sortBy) {
        case 'rating':
          uniqueNearBarbers.sort((a, b) => b.rating - a.rating);

          break;
        case 'price':
          uniqueNearBarbers.sort((a, b) => a.price - b.price);
          break;
        case 'distance':
          uniqueNearBarbers.sort((a, b) => a.distance - b.distance);
          break;
        case 'featured':
          // Do nothing (or implement custom logic if you have a way to determine "featured")
          break;
        default:
          break;
      }

      setNearbyBarbers(uniqueNearBarbers);
    })();
  }, [currentLat, currentLong, storedFilters]);

  const renderBarberCard = ({ item }) => <BarberCard cardData={item} />;

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const barbersRef = collection(database, 'barbers');
      const nearBarbers = [];

      for (const serviceType of storedFilters.serviceTypes) {
        const q = query(barbersRef, where(serviceType, '==', true));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          const docData = doc.data();

          const distance = getDistance(
            { latitude: currentLat, longitude: currentLong },
            { latitude: docData.latitude, longitude: docData.longitude }
          );

          const distanceInMiles = (distance / 1609).toFixed(1);

          if (distanceInMiles < storedFilters.distance) {
            nearBarbers.push({ ...docData, distance: distanceInMiles, docId: doc.id });
          }
        });
      }

      // Remove duplicates if any, based on docId
      const uniqueNearBarbers = Array.from(new Map(nearBarbers.map((barber) => [barber.docId, barber])).values());

      switch (storedFilters.sortBy) {
        case 'rating':
          uniqueNearBarbers.sort((a, b) => b.rating - a.rating);

          break;
        case 'price':
          uniqueNearBarbers.sort((a, b) => a.price - b.price);
          break;
        case 'distance':
          uniqueNearBarbers.sort((a, b) => a.distance - b.distance);
          break;
        case 'featured':
          // Do nothing (or implement custom logic if you have a way to determine "featured")
          break;
        default:
          break;
      }

      setNearbyBarbers(uniqueNearBarbers);
    } catch (error) {
      // console.log(error);
    } finally {
      setRefreshing(false);
    }
  };
  const openLocation = () => {
    navigation.navigate(SCREENS.LOCATION);
  };
  const openNotifications = () => {
    navigation.navigate(SCREENS.NOTIFICATIONS_SCREEN);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.root}>
        <View className="flex flex-row items-center justify-between ">
          <TouchableOpacity onPress={openLocation}>
            <View className="flex flex-row items-center ml-5 ">
              <Text style={styles.loctext}>Location · {address ? address[0].name : 'Loading...'} </Text>
              <Icon
                type="entypo"
                name="chevron-down"
                color="black"
                size={18}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={openNotifications}>
            <Icon
              style={styles.bellIcon}
              type="material-community"
              name="bell"
              color="black"
              size={28}
            />
          </TouchableOpacity>
        </View>

        <View className="flex flex-row items-center ">
          <SearchBar
            placeholder="Search name, username, speciality, etc."
            value={searchQuery}
            onChangeText={performSearch}
            lightTheme={false}
            round
            containerStyle={{
              width: WIDTH * 0.9,
              backgroundColor: 'white',
              borderWidth: 0,
              shadowColor: 'white',
              borderBottomColor: 'transparent',
              borderTopColor: 'transparent',
            }}
            inputContainerStyle={{ backgroundColor: '#EEEEEE' }}
            inputStyle={{ fontSize: 14, color: 'black' }}
            clearIcon={{ size: 25 }}
          />
          <TouchableOpacity onPress={navigateFilter}>
            <Icon
              type="material-community"
              name="tune-variant"
              color="black"
              size={24}
            />
          </TouchableOpacity>
        </View>

        {searchResults.length > 0 ? (
          <View
            className="mb-3"
            style={styles.searchParts}>
            <FlatList
              data={searchResults}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View className="mb-2">
                  <View className="flex flex-row ml-2 items-center ">
                    <Image
                      source={require('../../assets/images/bizlogo.jpg')}
                      style={styles.image}
                    />
                    <View>
                      <Text
                        style={styles.PoppinsMed}
                        className="text-lg">
                        {item.name}
                      </Text>
                      <Text
                        style={styles.PoppinsLight}
                        className=" text-sm text-gray-600">
                        {item.username}
                      </Text>
                    </View>
                  </View>

                  <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 5 }}>
                    <View
                      style={{
                        width: WIDTH * 0.9,
                        height: 1,
                        backgroundColor: 'lightgray',
                        alignSelf: 'center',
                        justifyContent: 'center',
                        marginTop: 5,
                        marginBottom: 5,
                      }}
                    />
                  </View>
                </View>
              )}
            />
          </View>
        ) : null}

        {searchResults.length === 0 ? (
          <>
            {matchingAppointments.map((appointment, index) => (
              <AppointmentCard
                key={index}
                appointmentData={appointment}
                showHide
                hideablePage
              />
            ))}
            <Text
              style={styles.fgreg}
              className="text-xl mb-2 ml-5">
              Services Near You:
            </Text>
            <FlatList
              ref={scrollRef}
              data={nearbyBarbers}
              keyExtractor={(item) => item.docId}
              renderItem={renderBarberCard}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }
            />
          </>
        ) : null}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  heads: {
    alignItems: 'center',
    flexDirection: 'column',
  },

  loctext: {
    fontFamily: 'PoppinsMed',
    fontSize: 18,
  },

  fgreg: {
    fontFamily: 'PoppinsMed',
  },

  bellIcon: {
    marginRight: 5,
  },

  image: {
    aspectRatio: 1,
    width: '10%',
    height: '10%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 100,
    marginRight: 5,
  },

  searchParts: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 20,
    alignSelf: 'center',
    width: WIDTH * 0.95,
    padding: 5,
  },
});

export default HomeScreen;
