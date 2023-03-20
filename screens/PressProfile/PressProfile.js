import { View, Text, ScrollView, TouchableOpacity, Keyboard, Image, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import useFont from '../../useFont';
import { Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

const PressProfile = () => {

  const navigation = useNavigation();
  useFont();

  const [infoPressed, setInfoPressed] = useState(true);
  const [servicesPressed, setServicesPressed] = useState(false);

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
      <View className = "flex flex-row items-center justify-center mb-3  mt-3">
      <Image source={require('../../assets/images/bizlogo.jpg')} style={styles.image} />
      <View className = "flex flex-col ml-3 items-center justify-center">
      <Text style = {styles.PoppinsReg} className = "text-xl ">Doctor Moussy </Text>
      <Text style = {styles.PoppinsLight} className ="text-sm text-gray-500">@doctormoussy </Text>
      <View className = "flex flex-row items-center justify-center">
      <Icon type="font-awesome" name="star" color="black" size={16} />
      <Icon type="font-awesome" name="star" color="black" size={16} />
      <Icon type="font-awesome" name="star" color="black" size={16} />
      <Icon type="font-awesome" name="star" color="black" size={16} />
      <Icon type="font-awesome" name="star" color="black" size={16} />
      <Text className = "text-sm text-gray-700" style = {styles.PoppinsReg}> 5.0 (140)</Text>
      </View>
      <View className = "flex flex-row items-center justify-center mb-1">
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
        <View className = "flex flex-row items-center justify-center mb-2 self-start mt-5">
        <Icon style = {styles.instagramIcon} type="ionicon" name="information-circle-outline" color="black" size={27} />
        <Text style = {styles.PoppinsMed} className = "text-2xl ">About</Text>
        </View>
        <View className = "flex flex-row items-center justify-center self-start mb-1">
        <Icon style = {styles.instagramIcon} type="antdesign" name="instagram" color="black" size={32} />
        <Icon style = {styles.phoneIcon} type="font-awesome" name="phone" color="black" size={32} />
        </View>
        <Text style = {styles.PoppinsReg} className = "text-base ">Specialises in: </Text>
        <Text className = "text-sm text-gray-600 " style = {styles.PoppinsLight}>Afro, Fades, Caucasian. </Text>

        <Icon style = {styles.pinIcon} type="entypo" name="pin" color="black" size={22} />
        <View >
          <Text style = {styles.Pinnedtext}>Hello Guys, today i am kind of busy but i might be doing after hours. I don't know yet.</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center',marginTop:5,marginBottom:5}}>
        <View style={{flex: 0.95, height: 1, backgroundColor: 'lightgray', alignSelf: "center", justifyContent: "center", marginTop:5, marginBottom:5 }} />   
        </View>
        <View className = "flex flex-row items-center justify-center mb-2 self-start">
        <Icon type="entypo" name="location" color="black" size={25} style ={styles.locationIcon} />
        <Text style = {styles.PoppinsMed} className = "text-2xl mt-3">Location & Hours</Text>
        </View>
        <Text style = {styles.PoppinsMed} className = "text-xl ">31 Samuel Drive, SW14 3QP</Text>
        <Text style = {styles.PoppinsLight} className = "text-xl ">Updated Hours:</Text>
        <Text style = {styles.PoppinsReg} className = "text-l ">Mon 9-5</Text>
        <Text style = {styles.PoppinsReg} className = "text-l ">Mon 9-5</Text>
        <Text style = {styles.PoppinsReg} className = "text-l ">Mon 9-5</Text>
        <Text style = {styles.PoppinsReg} className = "text-l ">Mon 9-5</Text>
        <Text style = {styles.PoppinsReg} className = "text-l ">Mon 9-5</Text>

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
      <ScrollView className = "ml-10">
       <Text>bambo</Text>
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
    marginTop:5
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
    marginTop:8,
    marginBottom: 5,
  },

  instagramIcon:{
    alignSelf:"flex-start",
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
