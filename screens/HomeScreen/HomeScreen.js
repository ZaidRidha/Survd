import { View, Text,StyleSheet,FlatList} from 'react-native'
import React from 'react'
import { useState,useEffect} from 'react'
import { Icon } from '@rneui/themed';
import { Header } from '@rneui/themed';
import useFont from '../../useFont';
import * as Location from 'expo-location';;
import { useNavigation } from '@react-navigation/native';
import BarberCard from '../../components/BarberCard/BarberCard';
import { SearchBar } from '@rneui/themed';
import { getDistance } from 'geolib';
import { doc,getDocs,query,collection,where} from "firebase/firestore"; 
import { database } from '../../firebaseConfig';


const HomeScreen = () => {
  useFont();
  const [currentLat, setcurrentLat,] = useState(null);
  const [currentLong, setcurrentLong,] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [address, setAddress] = useState(null);
  const [barberId,setbarberId] = useState(0);
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [nearbyBarbers, setNearbyBarbers] = useState([]);




  useEffect(() => {
    console.log("hello");
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

      console.log("lat"+currentLocation.coords.latitude+"long"+ currentLocation.coords.longitude);
      
      console.log(getDistance({latitude:currentLocation.coords.latitude,longitude:currentLocation.coords.longitude},{latitude:51.509865,longitude:-0.118092}))
      let currentAddress = await Location.reverseGeocodeAsync(currentLocation.coords);

      setAddress(currentAddress);
      
    })();
  }, [setLocation, setcurrentLat, setcurrentLong, setAddress]);

  useEffect(() => { //useffect for finding nearby
    (async () => {
      const querySnapshot = await getDocs(collection(database, "barbers"));
      const nearBarbers = [];
      querySnapshot.forEach((doc) => {
        const latitude = doc.get("latitude");
        const longitude = doc.get("longitude");
        const barberName = doc.get("name");
        const distance = getDistance({latitude:currentLat, longitude:currentLong}, {latitude: latitude, longitude: longitude});
        if (distance<6000){
          nearBarbers.push({id: barberId+1, name: barberName});
        };
        setNearbyBarbers(nearBarbers);
        console.log(nearBarbers);
      });
    })()


  }, [currentLat, currentLong, setNearbyBarbers]);

  const renderBarberCard = ({ item }) => <BarberCard name={item.name} />;


  return (
    <View style = {styles.root}>

    <Header
    backgroundColor='white'
    placement="left"
      leftComponent={
         <View className = "flex flex-row items-center "> 
         <Text style = {styles.loctext}>Location · {address ? address[0].name : 'Loading...'} </Text>
         <Icon type="entypo" name="chevron-down" color="black" size={18} />
         </View>
      }
      rightComponent={
        <Icon type="material-community" name="bell" color="black" size={22} />
      }
    />

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
        data={nearbyBarbers}
        keyExtractor={item => item.id.toString()}
        renderItem={renderBarberCard}
        showsHorizontalScrollIndicator={false} // remove horizontal scroll indicator
        showsVerticalScrollIndicator={false} 
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