import { View, Text, ScrollView, TouchableOpacity, Keyboard, Image, StyleSheet,PanResponder } from 'react-native';
import React, { useState,useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import useFont from '../../useFont';
import { Icon } from '@rneui/themed';
import { useNavigation,useRoute  } from '@react-navigation/native';
import * as Location from 'expo-location';

const PressProfile = ({}) => {

  const navigation = useNavigation();
  useFont();
  const route = useRoute();
  const { name, username, distance, lat, long} = route.params;
  




  const[Address,setAddress] = useState("");



  useEffect(() => {

    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        
        return;
      }


      let currentAddress = await Location.reverseGeocodeAsync({ latitude: lat, longitude: long })
      setAddress(currentAddress[0].name);



      
    })();
  }, [setAddress]);




  const [infoPressed, setInfoPressed] = useState(true);
  const [servicesPressed, setServicesPressed] = useState(false);
  
  const PressService = () => {
    navigation.navigate("PressService");
  };

  const handleInfoPress = () => {
    setInfoPressed(true);
    setServicesPressed(false);
  };

  const handleServicesPress = () => {
    setServicesPressed(true);
    setInfoPressed(false);
  };

  const carouselData = [ //images that go into the carousel
  {
    id: 1,
    image: require('../../assets/images/bizlogo.jpg'),
  },
  {
    id: 2,
    image: require('../../assets/images/fade2.jpg'),
  },
  {
    id: 3,

    image: require('../../assets/images/fade3.jpg'),
  },
];



  return (
    <View style={styles.root}>
      <View className = "flex flex-row ml-5 mb-3">
      <Image source={require('../../assets/images/bizlogo.jpg')} style={styles.image} />
      <View className = "flex flex-col ml-5">
      <Text style={[styles.PoppinsMed,{ width: 200}]}  className = "text-lg mt-5">{name}</Text>
      <Text style = {styles.PoppinsLight} className ="text-sm text-gray-500">{username}</Text>
      <View className = "flex flex-row ">
      <Icon type="font-awesome" name="star" color="black" size={16} />
      <Icon type="font-awesome" name="star" color="black" size={16} />
      <Icon type="font-awesome" name="star" color="black" size={16} />
      <Icon type="font-awesome" name="star" color="black" size={16} />
      <Icon type="font-awesome" name="star" color="black" size={16} />
      <Text className = "text-sm text-gray-700" style = {styles.PoppinsReg}> 5.0 (140)</Text>
      </View>
      <View className = "flex flex-row items-center">
      <View style={styles.circle}></View>
      <Text className = "text-base " style = {styles.PoppinsLight}>Active Now </Text>
      </View>
      </View>

        </View>

      <View style={styles.clickers}>
        <TouchableOpacity onPress={handleInfoPress}>
          <Text
          className = "text-xl mx-10"
            style={[
              styles.PoppinsMed,
              infoPressed ? styles.underline : null,
              { marginHorizontal: 10 },
            ]}
          >
            Info
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleServicesPress}>
          <Text
          className = "text-xl mx-10"
            style={[
              styles.PoppinsMed,
              servicesPressed ? styles.underline : null,
              { marginHorizontal: 10 },
            ]}
          >
            Services
          </Text>
        </TouchableOpacity>
      </View>

      {infoPressed ? (
      <ScrollView className = "ml-5">
        <View className = "flex flex-row items-center justify-center self-start mb-1 mt-2">
        <Icon style = {styles.pinIcon} type="entypo" name="pin" color="black" size={20} />
        <Text style = {styles.PoppinsMed} className = "text-lg "> Pinned Message:</Text>
        </View>
        <View >
          <Text style = {styles.Pinnedtext}>Hello Guys, today i am kind of busy but i might be doing after hours. I don't know yet.</Text>
        </View>
        <View className = "flex flex-row items-center justify-center self-start mb-1 mt-2">
        <Icon type="entypo" name="shop" color="black" size={22} />
        <Text style = {styles.PoppinsReg} className = "text-base text-green-800 "> (In Shop)</Text>
        <Text className = "text-2xl" style = {styles.poppinsMed}>/</Text>
        <Icon type='font-awesome-5' name="car-alt" color="black" size={22} />
        <Text style = {styles.PoppinsReg} className = "text-base text-blue-800 "> (Mobile)</Text>
        </View>
        <Text style = {styles.PoppinsReg} className = "text-base ">Specialises in: </Text>
        <Text className = "text-sm " style = {styles.PoppinsLight}>Afro, Fades, Caucasian. </Text>
        <View className = "flex flex-row items-center justify-center self-start mt-2">
        <Icon style = {styles.instagramIcon} type="antdesign" name="instagram" color="black" size={30} />
        <Text className = "ml-2 text-base" style = {styles.PoppinsReg}>@doctormoussy</Text>
        </View>
        <View className = "flex flex-row items-center justify-center self-start mt-2">
        <Icon style = {styles.phoneIcon} type="font-awesome" name="phone" color="black" size={36} />
        <Text className = "ml-2 text-base" style = {styles.PoppinsReg}>07883118432</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center',marginTop:5,marginBottom:5}}>
        <View style={{flex: 0.95, height: 1, backgroundColor: 'lightgray', alignSelf: "center", justifyContent: "center", marginTop:5, marginBottom:5 }} />   
        </View>

        <View className = "flex flex-row items-center justify-center mb-2 self-start">
        <Icon type="entypo" name="location" color="black" size={25} style ={styles.locationIcon} />
        <Text style = {styles.PoppinsMed} className = "text-xl mt-3">Location & Hours</Text>
        </View>
        <Text style = {styles.PoppinsMed} className = "text-lg ">{Address}</Text>
        <Text style = {styles.PoppinsLight} className = "text-base ">{distance} Miles away</Text>
        <Text style = {styles.PoppinsLight} className = "text-lg ">Updated Hours:</Text>
        <Text style = {styles.PoppinsReg} className = "text-l ">Mon 9-5</Text>
        <Text style = {styles.PoppinsReg} className = "text-l ">Mon 9-5</Text>
        <Text style = {styles.PoppinsReg} className = "text-l ">Mon 9-5</Text>
        <Text style = {styles.PoppinsReg} className = "text-l ">Mon 9-5</Text>
        <Text style = {styles.PoppinsReg} className = "text-l ">Mon 9-5</Text>

        <View style={{flexDirection: 'row', alignItems: 'center',marginTop:5,marginBottom:5}}>
        <View style={{flex: 0.95, height: 1, backgroundColor: 'lightgray', alignSelf: "center", justifyContent: "center", marginTop:5, marginBottom:5 }} />   
        </View>

        <View className = "flex flex-row items-center justify-center mb-2 self-start">
        <Icon type="font-awesome" name="photo" color="black" size={25} style ={styles.locationIcon} />
        <Text style = {styles.PoppinsMed} className = "text-xl">Photos</Text>
        </View>
        <View className = "flex flex-row">
        <Image source={require('../../assets/images/bizlogo.jpg')} style = {styles.displayImage}/>
        <Image source={require('../../assets/images/bizlogo.jpg')} style = {styles.displayImage}/>
        <Image source={require('../../assets/images/bizlogo.jpg')} style = {styles.displayImage}/>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center',marginTop:5,marginBottom:5}}>
        <View style={{flex: 0.95, height: 1, backgroundColor: 'lightgray', alignSelf: "center", justifyContent: "center", marginTop:5, marginBottom:5 }} />   
        </View>
        <View className = "flex flex-row items-center justify-center self-start">
        <Text style = {styles.PoppinsLight} className = "text-s text-gray-600">Health and safety verified</Text>
        <Icon style = {styles.verifiedIcon} type="material" name="verified" color="green" size={22} />
        </View>
        <Text style = {styles.PoppinsLight} className = "text-s text-gray-600">Fully compliant with hygiene standards.</Text>
        <Text style = {styles.PoppinsLight} className = "text-s text-gray-600">5 years experience barbering</Text>
        <Text style = {styles.PoppinsLight} className = "text-s text-gray-600">Fully Insured</Text>


      </ScrollView>
    ) : null}

      {servicesPressed ? (
      <ScrollView className = "ml-5">
        <Text style = {styles.PoppinsMed} className = "text-xl mt-3 mb-3">Popular Services</Text>
        <TouchableOpacity onPress={PressService}>
        <Text style = {styles.PoppinsReg} className = "text-base ">Skin Fade</Text>
        <Text style = {styles.PoppinsMed} className = "text-sm">£11.00</Text>
        <Text style = {[styles.PoppinsLight, { maxWidth: '95%' }]} numberOfLines={2} ellipsizeMode="tail" className = "text-sm text-gray-600 ">An incredible Skin Fade that is guranteed to leave every person very very very happy asefsdfsf  sd fsd fds fds fds fds fds fds fds fds </Text>
        <Text style = {styles.PoppinsLight} className = "text-sm text-gray-500 ">30min</Text>
        </TouchableOpacity>

        
      </ScrollView>
    ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'white',
    flex:1,
  },

  image: {
    aspectRatio: 1,
    width: '40%',
    height: '40%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 100,
    marginTop:5,
  },

  locationIcon:{
    marginRight:5,
  },

  clickers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  PoppinsReg: {
    fontFamily: 'PoppinsReg',
  },

  PoppinsLight:{
    fontFamily: 'PoppinsLight',
  },

  PoppinsBold:{
    fontFamily: 'PoppinsBold',
  },

  PoppinsMed: {
    fontFamily: 'PoppinsMed',
  },

  underline: {
    textDecorationLine: 'underline',
  },

  circle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'green',
    marginLeft: 4,
    marginRight:4
  },

  verifiedIcon:{
    marginLeft:3,
  },

  phoneIcon:{
    alignSelf: "flex-start",
    marginLeft:3
  },

  pinIcon:{
    alignSelf: "flex-start",
    marginTop:10,
    marginBottom: 5,
  },

  instagramIcon:{
    alignSelf:"flex-start",
  },

  displayImage:{
    aspectRatio: 1,
    width: '30%',
    height: '30%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 2,
    marginTop:5,
    marginRight:5,
  },

  Pinnedtext:{
    fontFamily: "PoppinsReg",
    maxWidth: "95%",
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#CFCFCF',
    backgroundColor: '#F6F6F6',
    padding:5
  },
  backIcon:{
    alignSelf:"flex-start",
    marginLeft:5,
  }
});

export default PressProfile;
