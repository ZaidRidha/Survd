import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions,Text,ScrollView, Linking, TouchableOpacity} from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectCurrentLoc } from '../../slices/locSlice';
import { Icon, Button} from '@rneui/themed';
import * as Location from 'expo-location';
import * as Progress from 'react-native-progress';
import {Calendar} from 'react-native-calendars';



const WIDTH = Dimensions.get('window').width;

const ContinueScreen = () => {
  const route = useRoute();
  const currentLoc = useSelector(selectCurrentLoc);
  const { lat, long } = route.params;
  const WIDTH = Dimensions.get("window").width;

  const [address, setAddress] = useState(null);
  const [postCode, setPostCode] = useState(null);
  const [showCalendar, setshowCalendar] = useState(false);
  const [barProgress, setbarProgress] = useState(0.2);
  const [selected, setSelected] = useState('');

  const [barColor, setBarColor] = useState('#1a993f');

  

  useEffect(() => {
    if (barProgress > 0.7) {
      setBarColor('#FF0000'); // red
    } else if (barProgress > 0.5) {
      setBarColor('#fff300'); // yellow
    } else {
      setBarColor('#1a993f'); // green
    }
  }, [barProgress]);



  useEffect(() => {
    const getAddressFromLocation = async () => {
      try {
        const location = await Location.reverseGeocodeAsync({ latitude: lat, longitude: long });
        setAddress(location[0].name);
        setPostCode(location[0].postalCode)
      } catch (error) {
        console.log('Error getting location', error);
      }
    };

    getAddressFromLocation();
  }, [lat, long]);


  const handlePressMaps = () => {
    const mapsUrl = `http://maps.google.com/maps?q=${address} ${postCode}`;
    Linking.openURL(mapsUrl);
  };

  const handleAppButton = () => {
    setshowCalendar(!showCalendar);
  };

 
  return (
    <View style={styles.root}>
      <ScrollView>
      <TouchableOpacity onPress={handlePressMaps}> 
      <View className = "items-center justify-center mt-2"> 
      <View className = "flex flex-row items-center">
      <Icon type="font-awesome" name="location-arrow" color="black" size={28} />
      <Text  style = {styles.poppinsReg} className = "text-xl"> {address}</Text>
      </View>
      <Text  style = {styles.poppinsReg} className = "text-xl"> {postCode}</Text>
      </View>
      </TouchableOpacity>
      
      <View className = "mt-2"style={{flexDirection: 'row', alignItems: 'center',justifyContent:"center"}}>
      <View style={{flex: 0.95, height: 1, backgroundColor: 'lightgray', alignSelf: "center", justifyContent: "center", }} />   
      </View>

      {!showCalendar && (
  <View>
  <View style={styles.queueInfo} className="ml-2 mt-3 mr-5">
    <View className="ml-2 mt-3 mr-2 mb-2">
      <View className="flex flex-row items-center">
        <Icon
          type="material-community"
          name="walk"
          color="black"
          size={28}
        />
        <Text className="text-lg" style={styles.poppinsMed}>
          Walk in
        </Text>
      </View>

        <Text style={styles.poppinsReg} className="text-base mt-1">
          Be there at 17:00
        </Text>
      <Text style={styles.poppinsReg} className="text-base">
        Estimated waiting time:
        <Text className="text-blue-700"> 23 Mins</Text>
      </Text>
      <Text style={styles.poppinsReg} className="text-base mb-1">
        Position in queue: 2
      </Text>
      <Progress.Bar
        className="mb-2 ml-1"
        progress={barProgress}
        width={200}
        color={barColor}
        borderColor="black"
      />
    </View>
  </View>
  
  <View style={{flexDirection: 'row', alignItems: 'center',justifyContent:"center",marginTop:15}}>
  <View style={{flex: 0.3, height: 1, backgroundColor: 'lightgray'}} />
  <View>
  <Text style={{width: 40, textAlign: 'center', color: 'gray'}}>Or</Text>
  </View>
  <View style={{flex: 0.3, height: 1, backgroundColor: 'lightgray'}} />
  </View>
  </View>
  
)}



              <Button
              onPress={handleAppButton}
              icon={
                showCalendar ? (
                  <Icon
                  type="material-community"
                  name="walk"
                  color="black"
                  size={28}
                  style={{ marginRight: 3 }}
                />
                ) : (
                  <Icon
                  type="entypo"
                  name="calendar"
                  color="black"
                  style={{ marginRight: 7 }}
                />
                )
              }
              title= {showCalendar ? (
                <Text>Walk In</Text>
              ) : (
              <Text>Schedule Appointment</Text>
              )}
              buttonStyle={{
                borderColor: 'black',
                borderWidth:1,
                borderRadius:5,
              }}
              type="outline"
              titleStyle={{ color: 'black',marginLeft:10, }}
              containerStyle={{
                width: WIDTH - 50,
                marginTop:20,
                alignSelf:"center",
                marginBottom: 5,
              }}
            />

      {showCalendar ?
      <Calendar
      onDayPress={day => {
        setSelected(day.dateString);
      }}
      markedDates={{
        [selected]: {selected: true, disableTouchEvent: true, selectedColor: 'black'}
      }}
    /> : null}


      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding:5,
  },

  poppinsReg:{
    fontFamily: "PoppinsReg",
  },

  poppinsMed:{
    fontFamily: "PoppinsMed",
  },
  queueInfo:{
    borderWidth:1,
    borderColor: "gray",
    backgroundColor: "#FFFFFF",
    borderRadius:5,

  }

});

export default ContinueScreen;
