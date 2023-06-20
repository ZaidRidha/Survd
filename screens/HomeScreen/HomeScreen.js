import { View, Text,StyleSheet,FlatList,TouchableOpacity,RefreshControl,Dimensions,SafeAreaView} from 'react-native'
import React from 'react'
import { useState,useEffect,useRef} from 'react'
import { Icon } from '@rneui/themed';
import useFont from '../../useFont';
import * as Location from 'expo-location';
import { useNavigation, useScrollToTop,} from '@react-navigation/native';
import BarberCard from '../../components/BarberCard/BarberCard';
import { SearchBar } from '@rneui/themed';
import { getDistance } from 'geolib';
import { doc,getDocs,query,collection,where,onSnapshot,updateDoc} from "firebase/firestore"; 
import { database } from '../../firebaseConfig';
import { useDispatch } from 'react-redux';
import { setLoc,setAddress as setReduxAddress } from '../../slices/locSlice';
import AppointmentCard from '../../components/AppointmentCard/AppointmentCard';
import { getAuth, onAuthStateChanged } from "firebase/auth";


const HomeScreen = () => {
  useFont();
  const navigation = useNavigation();
  const auth = getAuth();

  const [currentLat, setcurrentLat,] = useState(null);
  const [currentLong, setcurrentLong,] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [address, setAddress] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [nearbyBarbers, setNearbyBarbers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [uid, setUid] = useState(null); // Add the state for storing uid
  const [matchingAppointments, setMatchingAppointments] = useState([]);

  
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
          const status = doc.data().status;
          const appointmentDate = doc.data().date;
          const appointmentTime = doc.data().time;
          const appointmentDuration = doc.data().duration;
          console.log("status: " + status);
          console.log("time: " + appointmentTime);
          console.log("date: " + appointmentDate);
          console.log("duration: " + appointmentDuration);
  
          // Check if appointment is completed based on date, time, and duration
          const currentDate = new Date();
          const appointmentDateTime = new Date(appointmentDate + ' ' + appointmentTime);
          const appointmentEndTime = new Date(appointmentDateTime.getTime() + appointmentDuration * 60000);
  
          if (status === 'completed') {
            const appointmentRef = doc.ref;
            updateDoc(appointmentRef, { hidden: true });
          } else if (currentDate > appointmentEndTime) {
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
    const fetchAppointments = () => {
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
    };
  
    fetchAppointments();
  }, [uid]);
  




  useEffect(() => {

    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      setcurrentLat(currentLocation.coords.latitude);
      setcurrentLong(currentLocation.coords.longitude);

      //redux

      


      let currentAddress = await Location.reverseGeocodeAsync(currentLocation.coords)

      setAddress(currentAddress);
      dispatch(setReduxAddress(currentAddress[0].name));

      dispatch(setLoc({ lat: currentLocation.coords.latitude, lng: currentLocation.coords.longitude }));

      
    })();
  }, [setLocation, setcurrentLat, setcurrentLong, setAddress]);


  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(collection(database, "barbers"));
      const nearBarbers = [];
      querySnapshot.forEach((doc) => {
        const docData = doc.data(); // Retrieve all the document data at once
  
        const distance = getDistance({ latitude: currentLat, longitude: currentLong }, { latitude: docData.latitude, longitude: docData.longitude });
        const distanceInMiles = (distance / 1609).toFixed(1);
  
        if (distance < 6000) {
          nearBarbers.push({ ...docData, distance: distanceInMiles, docId: doc.id });
        }
      });
  
      setNearbyBarbers(nearBarbers);
    })();
  }, [currentLat, currentLong, setNearbyBarbers]);



  const renderBarberCard = ({ item }) => <BarberCard cardData={item} />;

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const querySnapshot = await getDocs(collection(database, "barbers"));
      const nearBarbers = [];
      querySnapshot.forEach((doc) => {
        const docData = doc.data(); // Retrieve all the document data at once
  
        const distance = getDistance({ latitude: currentLat, longitude: currentLong }, { latitude: docData.latitude, longitude: docData.longitude });
        const distanceInMiles = (distance / 1609).toFixed(1);
  
        if (distance < 6000) {
          nearBarbers.push({ ...docData, distance: distanceInMiles, docId: doc.id });
        }
      });
  
      setNearbyBarbers(nearBarbers);
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  };
  const openLocation = () => {
    navigation.navigate("Location");
  }




  return (
    <SafeAreaView style = {styles.root}>
         <View className = "flex flex-row items-center justify-between ">
         <TouchableOpacity onPress={openLocation} > 
        <View className = "flex flex-row items-center ml-5 ">
         <Text style = {styles.loctext}>Location · {address ? address[0].name : 'Loading...'} </Text>
         <Icon type="entypo" name="chevron-down" color="black" size={18} />
         </View>
         </TouchableOpacity>
         <Icon style = {styles.bellIcon} type="material-community" name="bell" color="black" size={24} />
         </View>



      <SearchBar
        placeholder = "Search name, username, speciality, etc. "
        onChangeText={(query) => setSearchQuery(query)}
        value={searchQuery}
        lightTheme = {false}
        round = {true}
        containerStyle={{  backgroundColor: 'white',
        borderWidth: 0, //no effect
        shadowColor: 'white', //no effect
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent'}}
        inputContainerStyle = {{backgroundColor: '#EEEEEE'}}
        inputStyle = {{fontSize:14, color: 'black'}}
        clearIcon={{ size: 25 }}
      />

      {matchingAppointments.map((appointment, index) => (
        <AppointmentCard key={index} appointmentData={appointment} showHide={true} hideablePage={true} />
      ))}


    <Text style = {styles.fgreg} className = "text-xl mb-2 ml-5 ">Active barbers near you:</Text>
    <FlatList
        ref={scrollRef}
        data={nearbyBarbers}
        keyExtractor={item => item.docId}
        renderItem={renderBarberCard}
        showsHorizontalScrollIndicator={false} // remove horizontal scroll indicator
        showsVerticalScrollIndicator={false} 
        refreshControl={ // add refreshControl prop with onRefresh function
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
      />
    </SafeAreaView>


  )
}

const styles = StyleSheet.create({

  root:{
    flex:1,
    backgroundColor: '#FFFFFF',
  },

  heads:{
    alignItems: 'center',
    flexDirection: 'column', 
  },

  loctext: {
    fontFamily : 'PoppinsMed',
    fontSize: 18,
  },

  fgreg: {
    fontFamily : 'PoppinsMed',
  },

  bellIcon:{
    marginRight:5,
  }

})

export default HomeScreen