import { View, Text,StyleSheet} from 'react-native'
import React from 'react'
import { useState,useEffect} from 'react'
import { Icon } from '@rneui/themed';
import { Header } from '@rneui/themed';
import useFont from '../../useFont';
import * as Location from 'expo-location';

const HomeScreen = () => {
  useFont();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      
      let currentAddress = await Location.reverseGeocodeAsync(currentLocation.coords);
      console.log(currentAddress);

      setAddress(currentAddress);
      
    })();
  }, []);

  return (
    <View style = {styles.root}>
    <Header
    backgroundColor='white'
      centerComponent={{
        text: "Home",
        style: { color: "#000000", fontSize:25,fontFamily:"GilroyBold"},

      }}
      rightComponent={
        <Icon type="material-community" name="bell" color="black" size={25} />
      }
    />
    <View style = {styles.inner}>
    <Text style = {styles.loctext}>Location · {address ? address[0].name : 'Loading...'}</Text>
    </View>

    </View>
  )
}

const styles = StyleSheet.create({

  root:{
    flex:1,
    backgroundColor: '#FFFFFF',
  },

  inner:{
    alignItems: 'center',
    flexDirection: 'column', 
  },

  loctext: {
    fontFamily : 'GilroyLight',
    fontSize: 17,
    margin:20,

  }

})

export default HomeScreen