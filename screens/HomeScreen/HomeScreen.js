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
import { doc,getDocs,query,collection,where,onSnapshot} from "firebase/firestore"; 
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

  useEffect(() => { //useffect for finding nearby
    (async () => {
      const querySnapshot = await getDocs(collection(database, "barbers"));
      const nearBarbers = [];
      querySnapshot.forEach((doc) => {
        const docId = doc.id;
        const latitude = doc.get("latitude");
        const longitude = doc.get("longitude");
        const barberName = doc.get("name");
        const barberUsername = doc.get("username");
        const barberId = doc.get("barberID");
        const instagram = doc.get("instagram");
        const phone = doc.get("phone");
        const mobile = doc.get("mobile");
        const shop = doc.get("shop");
        const home = doc.get("home");
        const pinmsg = doc.get("pinmsg");
        const mobileActive = doc.get("mobileactive");
        const homeActive = doc.get("homeactive");
        const shopActive = doc.get("shopactive");
        const liveHome = doc.get("livehome");
        const liveMobile = doc.get("livemobile");
        const liveShop = doc.get("liveshop");
        const walkins = doc.get("walkins");
        const unavailable = doc.get("unavailable");
        const onbreak = doc.get("onbreak");
        const updatedhours = doc.get("updatedhours");
        const distance = getDistance({latitude:currentLat, longitude:currentLong}, {latitude: latitude, longitude: longitude});
        const distanceInMiles = (distance / 1609).toFixed(1);
        if (distance<6000){
          nearBarbers.push({id: barberId, name: barberName,username:barberUsername, distance: distanceInMiles,lat:latitude,long:longitude,instagram: instagram, phone: phone,mobile:mobile,shop:shop,home:home,pinmsg:pinmsg,docId:docId,mobileActive:mobileActive,homeActive:homeActive,shopActive:shopActive,liveMobile:liveMobile,liveShop:liveShop,liveHome:liveHome,walkins:walkins,unavailable:unavailable,onbreak:onbreak,updatedhours:updatedhours});

        };
        setNearbyBarbers(nearBarbers);
      });
    })()


  }, [currentLat, currentLong, setNearbyBarbers]);

  const renderBarberCard = ({ item }) => <BarberCard name = {item.name} username = {item.username} distance = {item.distance} lat = {item.lat} long = {item.long} instagram = {item.instagram} phone = {item.phone} mobile = {item.mobile} shop = {item.shop} home = {item.home} pinmsg = {item.pinmsg} docId = {item.docId} homeActive = {item.homeActive} shopActive = {item.shopActive} mobileActive = {item.mobileActive} liveMobile = {item.liveMobile} liveShop = {item.liveShop} liveHome = {item.liveHome} walkins = {item.walkins} onbreak = {item.onbreak} unavailable = {item.unavailable} updatedhours = {item.updatedhours} />

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const querySnapshot = await getDocs(collection(database, "barbers"));
      const nearBarbers = [];
      querySnapshot.forEach((doc) => {
        const docId = doc.id;
        const latitude = doc.get("latitude");
        const longitude = doc.get("longitude");
        const barberName = doc.get("name");
        const barberUsername = doc.get("username");
        const barberId = doc.get("barberID");
        const instagram = doc.get("instagram");
        const phone = doc.get("phone");
        const mobile = doc.get("mobile");
        const shop = doc.get("shop");
        const home = doc.get("home");
        const pinmsg = doc.get("pinmsg");
        const mobileActive = doc.get("mobileactive");
        const homeActive = doc.get("homeactive");
        const shopActive = doc.get("shopactive");
        const liveHome = doc.get("livehome");
        const liveMobile = doc.get("livemobile");
        const liveShop = doc.get("liveshop");
        const walkins = doc.get("walkins");
        const unavailable = doc.get("unavailable");
        const onbreak = doc.get("onbreak");
        const updatedhours = doc.get("updatedhours");
        const distance = getDistance({latitude:currentLat, longitude:currentLong}, {latitude: latitude, longitude: longitude});
        const distanceInMiles = (distance / 1609).toFixed(1);
        if (distance<6000){
          nearBarbers.push({id: barberId, name: barberName,username:barberUsername, distance: distanceInMiles,lat:latitude,long:longitude,instagram: instagram, phone: phone,mobile:mobile,shop:shop,home:home,pinmsg:pinmsg,docId:docId,mobileActive:mobileActive,homeActive:homeActive,shopActive:shopActive,liveMobile:liveMobile,liveShop:liveShop,liveHome:liveHome,walkins:walkins,unavailable:unavailable,onbreak:onbreak,updatedhours:updatedhours,});

        };
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
        keyExtractor={item => item.id.toString()}
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