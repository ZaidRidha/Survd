import { View, Text, TouchableOpacity, StyleSheet, Pressable, SafeAreaView, Dimensions} from 'react-native';
import React, {useEffect,useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { Header } from '@rneui/themed';
import { Icon, Button } from '@rneui/themed';
import useFont from '../../useFont';
import { selectCurrentLoc, selectCurrentAddress } from '../../slices/locSlice';
import { useSelector } from 'react-redux';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { reverseGeocodeAsync } from 'expo-location';

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const LocationScreen = () => {
  useFont();

  const [postcode, setPostcode] = useState('');

  useEffect(() => {
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



  const navigation = useNavigation();

  const currentLoc = useSelector(selectCurrentLoc);
  const currentAddress = useSelector(selectCurrentAddress);
  const lat = currentLoc.lat;
  const long = currentLoc.lng;
  console.log(currentAddress);
  console.log(currentLoc);


  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.root}>
      <View className = "self-start ">
      <TouchableOpacity onPress={goBack}>
      <Icon type="ant-design" name="close" color="black" size={38} style ={styles.locationIcon} />
      </TouchableOpacity>
      </View>
      <View className = " p-2 rounded self-center w-full mb-1">
      <View className = "flex flex-row  items-center justify-between">
      <View className = "flex flex-row items-center">
      <Icon type="font-awesome" name="location-arrow" color="black" size={28} />
      <View>
      <Text style = {styles.poppinsMed} className = " text-sm ml-4 ">Current Location</Text>
      <Text style = {styles.poppinsReg} className = " text-sm ml-4 ">{currentAddress}</Text>
      <Text style = {styles.poppinsReg} className = " text-sm ml-4 ">{postcode}</Text>
      </View>
      </View>
      <Icon type="antdesign" name="right" color="black" size={21} />
      </View>
      </View>

      <MapView 
        initialRegion={{
          latitude:lat,
          longitude:long,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        }} 
        provider={PROVIDER_GOOGLE} style={styles.map} 

        >

      </MapView>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  root: {
    flex: 1,
    backgroundColor: 'white',

  },
  poppingReg: {
    fontFamily: 'PoppinsMed',
  },

  map:{
    width: WIDTH,
    alignSelf:"center",
    height:HEIGHT,
    marginBottom:5,
    borderColor:"black",
    borderWidth:2,
    borderRadius:10,

 
  },

  locationIcon:{
    marginTop:5,
    marginBottom:10,
  },


  poppinsMed:{
    fontFamily:"PoppinsMed",
  }
});

export default LocationScreen;
