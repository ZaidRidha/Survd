import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions,Text,ScrollView, Linking, TouchableOpacity,SafeAreaView,FlatList} from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { useRoute } from '@react-navigation/native';
import { useSelector,useDispatch } from 'react-redux';
import { selectCurrentLoc,selectCurrentBasket,removeFromBasket } from '../../slices/locSlice';
import { Icon, Button} from '@rneui/themed';
import * as Location from 'expo-location';
import * as Progress from 'react-native-progress';
import {Calendar} from 'react-native-calendars';
import { database } from '../../firebaseConfig';
import { doc,getDocs,query,collection,where,onSnapshot,getDoc} from "firebase/firestore"; 
import CalendarPicker from 'react-native-calendar-picker';



const WIDTH = Dimensions.get('window').width;

const ContinueScreen = () => {
  const route = useRoute();
  const currentLoc = useSelector(selectCurrentLoc);
  const Basket = useSelector(selectCurrentBasket);
  const { lat, long, barberID } = route.params;
  const WIDTH = Dimensions.get("window").width;
  const dispatch = useDispatch();


  const [address, setAddress] = useState(null);
  const [postCode, setPostCode] = useState(null);
  const [showCalendar, setshowCalendar] = useState(false);
  const [barProgress, setbarProgress] = useState(0.2);
  const [totalServicesPrice, settotalServicesPrice] = useState(0);
  const [totalServicesDuration, settotalServicesDuration] = useState(0);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedTimeslot, setSelectedTimeslot] = useState('');


  const [barColor, setBarColor] = useState('#1a993f');
  const today = new Date();

  const availableDates = ['2023-05-20', '2023-05-22', '2023-05-25'];


  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const currentDate = new Date().toISOString().split('T')[0];
    setSelectedDate(currentDate);
  }, []);

  const handleDateChange = (date) => {
    const selectedDate = new Date(date).toISOString().split('T')[0];
    setSelectedDate(selectedDate);
   
  };



  const disabledDates = [

  ];

  console.log("selected date" + selectedDate);

  useEffect(() => {
    if (showCalendar) {
      const q = query(collection(database, 'barbers', barberID, 'availability'));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let found = false;
        querySnapshot.forEach((doc) => {
          if (doc.id === selectedDate) {
            
            setAvailableSlots(doc.data().timeslots);
            found = true;
          }
        });
        if (!found) {
          setAvailableSlots([]);
        }
      });
  
      return () => {
        unsubscribe();
      };
    }
  }, [database, barberID, showCalendar, selectedDate]);


const sortedSlots = availableSlots.sort((a, b) => {
  // Convert time strings to time values for comparison
  const timeA = new Date(`2000-01-01T${a}`);
  const timeB = new Date(`2000-01-01T${b}`);
  
  // Compare the time values
  return timeA - timeB;
});

useEffect(() => {
  setAvailableSlots(sortedSlots);
}, [sortedSlots]);


console.log(availableSlots);




  

  useEffect(() => {
    const calculateTotalPriceAndDuration = () => {
      let totalPrice = 0;
      let totalDuration = 0;
  
      Basket.forEach(service => {
        const servicePrice = service[0].price !== undefined ? service[0].price : 0;
        const extrasPrice = service[0].extras
          ? service[0].extras.reduce((totalExtras, extra) => totalExtras + (extra.price !== undefined ? extra.price : 0), 0)
          : 0;
  
        totalPrice += servicePrice + extrasPrice;
        totalDuration += service[0].duration !== undefined ? service[0].duration : 0;
      });
  
      settotalServicesPrice(totalPrice);
      settotalServicesDuration(totalDuration);
    };
  
    calculateTotalPriceAndDuration();
  }, [Basket]);

  
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

  const handleRemoveItem = (objectId) => {
    dispatch(removeFromBasket(objectId));
  };

  const renderTimeslot = ({ item }) => {
    const isSelected = selectedTimeslot === item;

    return (
      <TouchableOpacity
        onPress={() => setSelectedTimeslot(item)}
        style={[styles.timeslotSquare, isSelected && styles.timeslotSquareSelected]}
      >
        <Text style={styles.poppinsReg} className="text-white">{item}</Text>
      </TouchableOpacity>
    );
  };

 

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView showsVerticalScrollIndicator = {false}>
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
    <View className="ml-2 mt-3 mr-2">
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
                marginBottom:5,
              }}
              type="outline"
              titleStyle={{ color: 'black',marginLeft:10, }}
              containerStyle={{
                width: WIDTH - 50,
                marginTop:10,
                alignSelf:"center",
                marginBottom: 5,
              }}
            />

      {showCalendar ?
      <View>
      <CalendarPicker
       
        monthTitleStyle ={{ fontFamily: 'PoppinsMed' }}
        yearTitleStyle ={{ fontFamily: 'PoppinsMed' }}
        onDateChange={handleDateChange}
        selectedDayStyle={{ backgroundColor: 'black' }} // Change the selector color
        selectedDayTextColor={'white'}
        selectedStartDate={selectedDate}
        minDate={today}
        restrictMonthNavigation = {true}
        rest
        disabledDates={disabledDates}
        previousComponent={<Icon name="chevron-left" type="material" color="black" />} // Render custom previous title component
        nextComponent={<Icon name="chevron-right" type="material" color="black" />}
      />
      <View style={styles.slotContainer}>
      <FlatList
        data={availableSlots}
        renderItem={renderTimeslot}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator = {false}
      />
    </View>
    </View>
     : null}



      <View className = "mt-2"style={{flexDirection: 'row', alignItems: 'center',justifyContent:"center"}}>
      <View style={{flex: 0.95, height: 1, backgroundColor: 'lightgray', alignSelf: "center", justifyContent: "center", }} />   
      </View>

<View className="mt-2 ml-3">
  <Text className="text-xl" style={styles.poppinsMed}>Services:</Text>
  {Basket.map((service, index) => (
    <View className="flex flex-row justify-between items-center mt-2" key={index}>
      <View>
        <Text className="text-base" style={styles.poppinsReg}>{service[0].name}</Text>

        {/* Render the extras if available */}
        {service[0].extras && service[0].extras.map((extra, extraIndex) => (
          <View key={extraIndex}>
            <View className = "flex flex-row items-center">
            <Icon type="entypo" name="plus" color="black" size={21}  />
            <Text className="text-base" style={styles.poppinsReg}>{extra.name}</Text>
            </View>
          </View>
        ))} 
<Text className=" text-sm" style={styles.poppinsReg}>
  Price: £{(service[0].price + (service[0].extras ? service[0].extras.reduce((total, extra) => total + extra.price, 0) : 0)).toFixed(2)}
</Text>

{service[0].duration !== undefined && (
  <Text className="text-gray-600 text-sm" style={styles.poppinsReg}>
    Duration: {service[0].duration + (service[0].extras ? service[0].extras.reduce((total, extra) => (extra.duration !== undefined ? total + extra.duration : total), 0) : 0)} minutes
  </Text>
)}
      </View>
    <TouchableOpacity onPress={() => handleRemoveItem(service[0].objectId)}>
    <Icon type="font-awesome" name="trash-o" color="black" size={28} style={{ marginRight: 10 }} />
    </TouchableOpacity>
    </View>
  ))}
</View>

<View className = "mt-2"style={{flexDirection: 'row', alignItems: 'center',justifyContent:"center"}}>
      <View style={{flex: 0.95, height: 1, backgroundColor: 'lightgray', alignSelf: "center", justifyContent: "center", }} />   
      </View>

<Text className="text-lg ml-3 mt-2" style={styles.poppinsMed}>
 Subtotal: £{totalServicesPrice.toFixed(2)}
</Text>

<Text className="text-gray-500 text-base ml-3 mb-5" style={styles.poppinsReg}>
 Total Duration: {totalServicesDuration} minutes
</Text>


<Button
    titleStyle={styles.PoppinsReg}
    title={`Continue`}
    color={'black'}
    containerStyle={{
      width: WIDTH - 120,
      borderRadius:10,
      alignSelf: 'center',
      justifyContent: 'center',
    }}
  />



      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  poppinsReg:{
    fontFamily: "PoppinsReg",
  },

  poppinsMed:{
    fontFamily: "PoppinsMed",
  },
  queueInfo:{
    borderWidth:2,
    borderColor: "black",
    backgroundColor: "white",
    borderRadius:5,

  },

  slotContainer: {
    flex: 1,
    marginTop: 10,
  },

  timeslotSquare: {
    width: WIDTH * 0.25,
    height: 40,
    backgroundColor: 'black',
    borderRadius: 5,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  timeslotSquareSelected: {
    width: WIDTH * 0.25,
    height: 40,
    backgroundColor: '#4D9053',
    borderWidth:2,

    borderRadius: 5,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

});

export default ContinueScreen;
