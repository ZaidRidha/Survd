import { View, Text,StyleSheet,FlatList,TouchableOpacity,RefreshControl} from 'react-native'
import React from 'react'
import { useState,useEffect,useRef} from 'react'
import { Icon } from '@rneui/themed';
import { Header } from '@rneui/themed';
import useFont from '../../useFont';
import * as Location from 'expo-location';;
import { useNavigation, useScrollToTop,} from '@react-navigation/native';
import BarberCard from '../../components/BarberCard/BarberCard';
import { SearchBar } from '@rneui/themed';
import { getDistance } from 'geolib';
import { doc,getDocs,query,collection,where} from "firebase/firestore"; 
import { database } from '../../firebaseConfig';
import { useDispatch } from 'react-redux';
import { setLoc,setAddress as setReduxAddress } from '../../slices/locSlice';


const HomeScreen = () => {
  useFont();
  const navigation = useNavigation();

  const [currentLat, setcurrentLat,] = useState(null);
  const [currentLong, setcurrentLong,] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [address, setAddress] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [nearbyBarbers, setNearbyBarbers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  
  const dispatch = useDispatch();

  const scrollRef = useRef(null);
  useScrollToTop(scrollRef);


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
        const distance = getDistance({latitude:currentLat, longitude:currentLong}, {latitude: latitude, longitude: longitude});
        const distanceInMiles = (distance / 1609).toFixed(1);
        if (distance<6000){
          nearBarbers.push({id: barberId, name: barberName,username:barberUsername, distance: distanceInMiles,lat:latitude,long:longitude,instagram: instagram, phone: phone,mobile:mobile,shop:shop,home:home,pinmsg:pinmsg,docId:docId});

        };
        setNearbyBarbers(nearBarbers);
      });
    })()


  }, [currentLat, currentLong, setNearbyBarbers]);

  const renderBarberCard = ({ item }) => <BarberCard name = {item.name} username = {item.username} distance = {item.distance} lat = {item.lat} long = {item.long} instagram = {item.instagram} phone = {item.phone} mobile = {item.mobile} shop = {item.shop} home = {item.home} pinmsg = {item.pinmsg} docId = {item.docId}/>

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
        const distance = getDistance({latitude:currentLat, longitude:currentLong}, {latitude: latitude, longitude: longitude});
        const distanceInMiles = (distance / 1609).toFixed(1);
        if (distance<6000){
          nearBarbers.push({id: barberId, name: barberName,username:barberUsername, distance: distanceInMiles,lat:latitude,long:longitude,instagram: instagram, phone: phone,mobile:mobile,shop:shop,home:home,pinmsg:pinmsg,docId:docId});

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
    <View style = {styles.root}>
        <TouchableOpacity onPress={openLocation} >
         <View className = "flex flex-row items-center justify-between mt-7 ">
        <View className = "flex flex-row items-center ">
         <Text style = {styles.loctext}>Location · {address ? address[0].name : 'Loading...'} </Text>
         <Icon type="entypo" name="chevron-down" color="black" size={18} />
         </View>
         <Icon type="material-community" name="bell" color="black" size={22} />
         </View>
         </TouchableOpacity>


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


    <Text style = {styles.fgreg} className = "text-xl mb-2 ">Active barbers near you:</Text>
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
    </View>


  )
}

const styles = StyleSheet.create({

  root:{
    flex:1,
    backgroundColor: '#FFFFFF',
    padding:25,
  },

  heads:{
    alignItems: 'center',
    flexDirection: 'column', 
  },

  loctext: {
    fontFamily : 'PoppinsMed',
    fontSize: 16,
  },

  fgreg: {
    fontFamily : 'PoppinsMed',
  }

})

export default HomeScreen