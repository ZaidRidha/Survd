import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    RefreshControl,
    Dimensions,
    Image,
    ActivityIndicator,
  } from 'react-native';
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
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import AppointmentCard from '../../components/AppointmentCard/AppointmentCard';
  import VendorCard from '../../components/VendorCard/VendorCard';
  import useFont from '../../useFont';
  import { getStorage, ref, getDownloadURL } from 'firebase/storage';
  import { database, authentication } from '../../firebaseConfig';
  import { selectFilters } from '../../slices/locSlice';
  
  const WIDTH = Dimensions.get('window').width;
  
  const BarberScreen = () => {
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
    const [nearbyVendors, setNearbyVendors] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [imageUrls, setImageUrls] = useState({});
  
    const [uid, setUid] = useState(null);
    const [matchingAppointments, setMatchingAppointments] = useState([]);
  
    const emptySearchBar = () => {
      setSearchQuery('');
      setSearchResults([]);
    };
  
    useEffect(() => {
      setStoredFilters(filters);
    }, [filters, storedFilters]);
  
    const navigateFilter = () => {
      navigation.navigate(SCREENS.FILTER_SCREEN);
    };
  
    const fetchHttpUrl = async (item) => {
      const storageUrl = item.profilePicUrl;
      if (storageUrl?.startsWith('gs://')) {
        const storage = getStorage();
        const storageRef = ref(storage, storageUrl);
        try {
          const url = await getDownloadURL(storageRef);
          setImageUrls((prevUrls) => ({ ...prevUrls, [item.docId]: url }));
        } catch (error) {
          console.error('Error fetching image URL:', error);
          setImageUrls((prevUrls) => ({ ...prevUrls, [item.docId]: require('../../assets/images/white-square.jpg') }));
        }
      } else {
        setImageUrls((prevUrls) => ({ ...prevUrls, [item.docId]: storageUrl }));
      }
    };
  
    useEffect(() => {
      searchResults.forEach((item) => {
        if (item.profilePicUrl && !imageUrls[item.docId]) {
          fetchHttpUrl(item);
        }
      });
    }, [searchResults]);
  
    const renderItem = ({ item }) => (
      <View className="mb-2">
        <TouchableOpacity onPress={() => navigateToBarberProfile(item)}>
          <View className="flex flex-row ml-2 items-center ">
            <Image
              source={imageUrls[item.docId] ? { uri: imageUrls[item.docId] } : require('../../assets/images/white-square.jpg')}
              style={styles.image}
            />
            <View>
              <Text style={styles.PoppinsMed} className="text-lg">{item.name}</Text>
              <Text style={styles.PoppinsLight} className="text-sm text-gray-600">{item.username}</Text>
              <Text style={styles.PoppinsLight} className="text-xs text-gray-600">{item.serviceCategory.join(', ')}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 5 }}>
            <View style={{
              width: WIDTH * 0.9,
              height: 1,
              backgroundColor: 'lightgray',
              alignSelf: 'center',
              justifyContent: 'center',
              marginTop: 5,
              marginBottom: 0,
            }} />
          </View>
        </TouchableOpacity>
      </View>
    );
  
    const navigateToBarberProfile = (barberData) => {
      navigation.navigate(SCREENS.PRESS_PROFILE, {
        name: barberData.name,
        username: barberData.username,
        lat: barberData.latitude,
        long: barberData.longitude,
        distance: barberData.distance,
        instagram: barberData.instagram,
        phone: barberData.phone,
        mobile: barberData.mobile,
        home: barberData.home,
        shop: barberData.shop,
        pinMsg: barberData.pinMsg,
        docId: barberData.docId,
        mobileActive: barberData.mobileActive,
        shopActive: barberData.shopActive,
        homeActive: barberData.homeActive,
        isLive: barberData.isLive,
        updatedHours: barberData.updatedHours,
        walkins: barberData.walkins,
        rating: barberData.rating,
        profilePicUrl: barberData.profilePicUrl,
        pictureGallery: barberData.pictureGallery,
      });
    };
  
    const performSearch = async (text) => {
      try {
        setSearchQuery(text);
        const q = query(collection(database, 'vendors'));
        const querySnapshot = await getDocs(q);
  
        const data = querySnapshot.docs.map((doc) => {
          const fullData = doc.data();
          return { ...fullData, docId: doc.id };
        });
  
        const fuseOptions = {
          keys: ['name', 'username', 'serviceCategory'],
          threshold: 0.3,
        };
  
        const fuse = new Fuse(data, fuseOptions);
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
  
      return () => unsubscribe();
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
              const appointmentData = { appointmentID: doc.id, ...doc.data() };
              appointments.push(appointmentData);
            });
  
            setMatchingAppointments(appointments);
          });
  
          return () => unsubscribe();
        }
        const guestName = await AsyncStorage.getItem('guestName');
        const guestEmail = await AsyncStorage.getItem('guestEmail');
        const guestPhone = await AsyncStorage.getItem('guestPhone');
  
        const appointmentsRef = collection(database, 'appointments');
        const q = query(appointmentsRef, where('guestName', '==', guestName), where('guestEmail', '==', guestEmail), where('guestPhone', '==', guestPhone));
  
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const appointments = [];
          querySnapshot.forEach((doc) => {
            const appointmentData = { appointmentID: doc.id, ...doc.data() };
            appointments.push(appointmentData);
          });
  
          setMatchingAppointments(appointments);
        });
      };
  
      fetchAppointments();
    }, [uid]);
  
    useEffect(() => {
      const updateVerificationStatus = async () => {
        const { currentUser } = authentication;
  
        if (currentUser) {
          const { emailVerified } = currentUser;
          const phoneVerified = Boolean(currentUser.phoneNumber);
  
          if (emailVerified || phoneVerified) {
            const userDocRef = doc(database, 'users', currentUser.uid);
            await updateDoc(userDocRef, { emailVerified, phoneVerified });
          }
        }
      };
  
      updateVerificationStatus();
    }, []);
  
    useEffect(() => {
      const fetchUserLocationAndReverseGeocode = async () => {
        const { currentUser } = authentication;
        if (currentUser) {
          const userID = currentUser.uid;
          const userDocRef = doc(database, 'users', userID);
          const userDoc = await getDoc(userDocRef);
  
          if (userDoc.exists) {
            const { longitude, latitude } = userDoc.data();
            setLocation({ longitude, latitude });
            setcurrentLat(latitude);
            setcurrentLong(longitude);
  
            const currentAddress = await Location.reverseGeocodeAsync({ latitude, longitude });
            setAddress(currentAddress);
          }
        } else {
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
  
            const currentAddress = await Location.reverseGeocodeAsync({ latitude, longitude });
            setAddress(currentAddress);
          } catch (error) {
            console.error('Error fetching current location:', error);
          }
        }
      };
  
      fetchUserLocationAndReverseGeocode();
    }, []);
  
    const renderVendorCard = ({ item }) => <VendorCard cardData={item} />;
  
    const onRefresh = async () => {
      setRefreshing(true);
      try {
        const VendorsRef = collection(database, 'vendors');
        const nearVendors = [];
  
        for (const serviceType of storedFilters.serviceTypes) {
          const q = query(VendorsRef, where(serviceType, '==', true));
          const querySnapshot = await getDocs(q);
  
          querySnapshot.forEach((doc) => {
            const docData = doc.data();
  
            const distance = getDistance(
              { latitude: currentLat, longitude: currentLong },
              { latitude: docData.latitude, longitude: docData.longitude }
            );
  
            const distanceInMiles = (distance / 1609).toFixed(1);
  
            if (distanceInMiles < storedFilters.distance) {
              nearVendors.push({ ...docData, distance: distanceInMiles, docId: doc.id });
            }
          });
        }
  
        const uniqueNearVendors = Array.from(new Map(nearVendors.map((vendor) => [vendor.docId, vendor])).values());
  
        uniqueNearVendors.sort((a, b) => {
          let sortValue = 0;
          switch (storedFilters.sortBy) {
            case 'rating':
              sortValue = b.rating - a.rating;
              break;
            case 'price':
              sortValue = a.price - b.price;
              break;
            case 'distance':
              sortValue = a.distance - b.distance;
              break;
            case 'featured':
              sortValue = 0;
              break;
            case 'activity':
              const activeServicesA = storedFilters.serviceTypes.filter((serviceType) => a[`${serviceType}active`]).length;
              const activeServicesB = storedFilters.serviceTypes.filter((serviceType) => b[`${serviceType}active`]).length;
              sortValue = activeServicesB - activeServicesA;
              break;
            default:
              sortValue = 0;
          }
  
          return sortValue;
        });
  
        setNearbyVendors(uniqueNearVendors);
      } catch (error) {
        console.error(error);
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
                <Text style={styles.loctext}>Location · {address ? address[0].name : 'Loading...'}</Text>
                <Icon type="entypo" name="chevron-down" color="black" size={18} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={openNotifications}>
              <Icon style={styles.bellIcon} type="material-community" name="bell" color="black" size={28} />
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
              <Icon type="material-community" name="tune-variant" color="black" size={24} />
            </TouchableOpacity>
          </View>
  
          {searchResults.length > 0 ? (
            <View className="mb-3" style={styles.searchParts}>
              <FlatList data={searchResults} keyExtractor={(item, index) => index} renderItem={renderItem} />
            </View>
          ) : null}
  
          {searchResults.length === 0 ? (
            <>
              {matchingAppointments.map((appointment, index) => (
                <AppointmentCard key={index} appointmentData={appointment} showHide hideablePage />
              ))}
              <Text style={styles.fgreg} className="text-lg mb-2 ml-5">
                Services Near You:
              </Text>
              {loading ? <ActivityIndicator size="small" color="black" /> : null}
              <FlatList
                ref={scrollRef}
                data={nearbyVendors}
                keyExtractor={(item) => item.docId}
                renderItem={renderVendorCard}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
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
  
  export default BarberScreen;
  