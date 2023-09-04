import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text, ScrollView, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { Icon, Button } from '@rneui/themed';
import * as Location from 'expo-location';
import * as Progress from 'react-native-progress';
import { getDocs, query, collection, onSnapshot, deleteDoc } from 'firebase/firestore';
import CalendarPicker from 'react-native-calendar-picker';
import Toast from 'react-native-root-toast';
import * as Clipboard from 'expo-clipboard';
import { database } from '../../firebaseConfig';
import { selectCurrentBasket, removeFromBasket } from '../../slices/locSlice';

const WIDTH = Dimensions.get('window').width;

const ContinueScreen = () => {
  const route = useRoute();
  const Basket = useSelector(selectCurrentBasket);
  const { lat, long, barberID, vendorName, isLive, docId } = route.params;
  const WIDTH = Dimensions.get('window').width;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [address, setAddress] = useState(null);
  const [postCode, setPostCode] = useState(null);
  const [showCalendar, setshowCalendar] = useState(false);
  const [barProgress, setbarProgress] = useState(0.2);
  const [totalServicesPrice, settotalServicesPrice] = useState(0);
  const [totalServicesDuration, settotalServicesDuration] = useState(0);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedTimeslot, setSelectedTimeslot] = useState('');
  const [liveAppointment, setLiveAppointment] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [monthDays, setMonthDays] = useState([]);
  const [disabledDates, setDisabledDates] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [calendarStart, setcalendarStart] = useState(new Date());
  const [displayError, setDisplayError] = useState(false);

  const [barColor, setBarColor] = useState('#1a993f');
  const today = new Date();

  useEffect(() => {
    // Check if showCalendar is false
    if (!showCalendar) {
      // Set timeslot to empty
      setSelectedTimeslot('');
    }
  }, [showCalendar]);

  useEffect(() => {
    const currentDate = new Date().toISOString().split('T')[0];
    setSelectedDate(currentDate);
  }, []);

  const handleDateChange = (date) => {
    setSelectedTimeslot('');
    const selectedDate = new Date(date).toISOString().split('T')[0];
    setSelectedDate(selectedDate);
  };

  const handleLocationPress = async () => {
    const copytext = address.toString();
    await Clipboard.setStringAsync(copytext);
    Toast.show('Location copied to clipboard', {
      duration: Toast.durations.SHORT,
    });
  };

  const isSameDate = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  useEffect(() => {
    if (isLive === false) {
      setshowCalendar(true);
    }
  }, [isLive]);

  useEffect(() => {
    if (showCalendar) {
      const currentDate = new Date(); // Get the current date
      const collectionRef = collection(database, 'barbers', barberID, 'availability');

      const fetchData = async () => {
        const q = query(collectionRef);
        const querySnapshot = await getDocs(q);

        const deletePromises = [];

        querySnapshot.forEach((doc) => {
          const docDate = new Date(doc.id);

          if (docDate < currentDate && !isSameDate(docDate, currentDate)) {
            deletePromises.push(deleteDoc(doc.ref));
          }
        });

        await Promise.all(deletePromises);
      };

      fetchData();

      // Cleanup function
      return () => {
        // Cleanup tasks (if any)
      };
    }
  }, [database, barberID, showCalendar]);

  useEffect(() => {
    if (showCalendar) {
      const q = query(collection(database, 'barbers', barberID, 'availability'));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let found = false;
        const availableDates = []; // Create a new array for available dates

        querySnapshot.forEach((doc) => {
          if (doc.id === selectedDate) {
            setAvailableSlots(doc.data().timeslots);
            found = true;
          }
          availableDates.push(doc.id); // Add the doc ID to availableDates array
        });

        if (!found) {
          setAvailableSlots([]);
        }

        setAvailableDates(availableDates); // Update the availableDates state
      });

      return () => {
        unsubscribe();
      };
    }
  }, [database, barberID, showCalendar, selectedDate]);

  // the format of timeslots is YYYY-MM-DD

  useEffect(() => {
    const disabledDatesArray = [];

    monthDays.forEach((day) => {
      if (!availableDates.includes(day)) {
        disabledDatesArray.push(day);
      }
    });

    setDisabledDates(disabledDatesArray);
  }, [monthDays, availableDates]);

  useEffect(() => {
    const getCurrentMonthDays = () => {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const totalDays = new Date(currentDate.getFullYear(), currentMonth, 0).getDate();
      const daysArray = [];

      const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(currentMonth).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

      for (let day = 1; day <= totalDays; day++) {
        const date = new Date(currentYear, currentMonth - 1, day);
        const formattedDate = formatDate(date);
        daysArray.push(formattedDate);
      }

      setMonthDays(daysArray);
    };

    getCurrentMonthDays();
  }, [currentMonth]);

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

  useEffect(() => {
    const calculateTotalPriceAndDuration = () => {
      let totalPrice = 0;
      let totalDuration = 0;

      Basket.forEach((service) => {
        const servicePrice = service[0].price !== undefined ? service[0].price : 0;
        const extrasPrice = service[0].extras
          ? service[0].extras.reduce(
              (totalExtras, extra) => totalExtras + (extra.price !== undefined ? extra.price : 0),
              0
            )
          : 0;

        totalPrice += servicePrice + extrasPrice;

        const serviceDuration = service[0].duration !== undefined ? service[0].duration : 0;
        const extrasDuration = service[0].extras
          ? service[0].extras.reduce(
              (totalExtras, extra) => totalExtras + (extra.duration !== undefined ? extra.duration : 0),
              0
            )
          : 0;

        totalDuration += serviceDuration + extrasDuration;
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
        setPostCode(location[0].postalCode);
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

  const handleMonthChange = (month) => {
    const currentMonth = new Date(month).getMonth() + 1;
    setCurrentMonth(currentMonth);
  };

  const handleAppButton = () => {
    setshowCalendar(!showCalendar);
    setLiveAppointment(!liveAppointment);
  };

  const handleContinue = () => {
    if (Basket.length === 0) {
      alert('Basket is empty. Please add items before continuing.');
    } else if (showCalendar && selectedTimeslot === '') {
      setDisplayError(true);
      setTimeout(() => {
        setDisplayError(false);
      }, 3000); // 3000 milliseconds = 3 seconds
    } else {
      navigation.navigate('PaymentScreen', {
        selectedTimeslot,
        address,
        postCode,
        selectedDate,
        vendorName,
        subtotal: totalServicesPrice,
        servicesDuration: totalServicesDuration,
        docId,
      });
    }
  };

  const handleRemoveItem = (objectId) => {
    dispatch(removeFromBasket(objectId));
  };

  const renderTimeslot = ({ item }) => {
    const isSelected = selectedTimeslot === item;
    return (
      <TouchableOpacity
        onPress={() => setSelectedTimeslot(item)}
        style={[styles.timeslotSquare, isSelected && styles.timeslotSquareSelected]}>
        <Text
          style={styles.poppinsReg}
          className="text-white">
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.root}>
      <View className="items-center justify-center mt-2">
        <View className="">
          <Text
            style={styles.poppinsReg}
            className="text-xl">
            {vendorName}
          </Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          className="mt-2"
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <View
            style={{ flex: 0.95, height: 1, backgroundColor: '#F4F4F4', alignSelf: 'center', justifyContent: 'center' }}
          />
        </View>
        <View className="mb-1">
          <View className="flex flex-row items-center ml-2 mt-3">
            <Icon
              type="entypo"
              name="shop"
              color="#0F7D00"
              size={21}
            />
            <Text
              style={styles.poppinsMed}
              className="text-lg">
              Ismail's Barbershop
            </Text>
          </View>
        </View>

        {!showCalendar && (
          <View>
            <View
              style={styles.queueInfo}
              className="ml-2 mt-3 mr-5">
              <View className="ml-2 mt-3 mr-2">
                <View className="flex flex-row items-center">
                  <Icon
                    type="material-community"
                    name="walk"
                    color="black"
                    size={28}
                  />
                  <Text
                    className="text-lg"
                    style={styles.poppinsMed}>
                    Walk in
                  </Text>
                </View>

                <Text
                  style={styles.poppinsReg}
                  className="text-base mt-1">
                  Be there at 17:00
                </Text>
                <Text
                  style={styles.poppinsReg}
                  className="text-base">
                  Estimated waiting time:
                  <Text className="text-blue-700"> 23 Mins</Text>
                </Text>
                <Text
                  style={styles.poppinsReg}
                  className="text-base mb-1">
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

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 15 }}>
              <View style={{ flex: 0.3, height: 1, backgroundColor: 'lightgray' }} />
              <View>
                <Text style={{ width: 40, textAlign: 'center', color: 'gray' }}>Or</Text>
              </View>
              <View style={{ flex: 0.3, height: 1, backgroundColor: 'lightgray' }} />
            </View>
          </View>
        )}

        {isLive ? (
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
            title={showCalendar ? <Text>Walk In</Text> : <Text>Schedule Appointment</Text>}
            buttonStyle={{
              borderColor: 'black',
              borderWidth: 1,
              borderRadius: 5,
              marginBottom: 5,
            }}
            type="outline"
            titleStyle={{ color: 'black', marginLeft: 10 }}
            containerStyle={{
              width: WIDTH - 50,
              marginTop: 10,
              alignSelf: 'center',
              marginBottom: 5,
            }}
          />
        ) : null}

        {showCalendar ? (
          <View className="my-5">
            <CalendarPicker
              monthTitleStyle={{ fontFamily: 'PoppinsMed' }}
              yearTitleStyle={{ fontFamily: 'PoppinsMed' }}
              onMonthChange={handleMonthChange}
              onDateChange={handleDateChange}
              selectedDayStyle={{ backgroundColor: 'black' }} // Change the selector color
              selectedDayTextColor="white"
              selectedStartDate={selectedDate}
              todayBackgroundColor="gray"
              minDate={today}
              restrictMonthNavigation
              disabledDates={disabledDates}
              previousComponent={
                <Icon
                  name="chevron-left"
                  type="material"
                  color="black"
                />
              } // Render custom previous title component
              nextComponent={
                <Icon
                  name="chevron-right"
                  type="material"
                  color="black"
                />
              }
            />
            <View style={styles.slotContainer}>
              {availableSlots.length > 0 ? (
                <FlatList
                  data={availableSlots}
                  renderItem={renderTimeslot}
                  keyExtractor={(item) => item}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                />
              ) : (
                <Text
                  style={styles.poppinsMed}
                  className="ml-2 text-red-600">
                  Sorry, no available slots for this day :(
                </Text>
              )}
            </View>
          </View>
        ) : null}

        <View
          className="mt-2"
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <View
            style={{
              flex: 0.95,
              height: 1,
              backgroundColor: 'lightgray',
              alignSelf: 'center',
              justifyContent: 'center',
            }}
          />
        </View>

        <View className="mt-2 ml-3">
          <Text
            className="text-xl"
            style={styles.poppinsMed}>
            Services:
          </Text>
          {Basket.map((service, index) => (
            <View
              className="flex flex-row justify-between items-center mt-2"
              key={index}>
              <View>
                <Text
                  className="text-base"
                  style={styles.poppinsReg}>
                  {service[0].name}
                </Text>

                {/* Render the extras if available */}
                {service[0].extras &&
                  service[0].extras.map((extra, extraIndex) => (
                    <View key={extraIndex}>
                      <View className="flex flex-row items-center">
                        <Icon
                          type="entypo"
                          name="plus"
                          color="black"
                          size={21}
                        />
                        <Text
                          className="text-base"
                          style={styles.poppinsReg}>
                          {extra.name}
                        </Text>
                      </View>
                    </View>
                  ))}
                <Text
                  className=" text-sm"
                  style={styles.poppinsReg}>
                  Price: £
                  {(
                    service[0].price +
                    (service[0].extras ? service[0].extras.reduce((total, extra) => total + extra.price, 0) : 0)
                  ).toFixed(2)}
                </Text>

                {service[0].duration !== undefined && (
                  <Text
                    className="text-gray-600 text-sm"
                    style={styles.poppinsReg}>
                    Duration: {""}
                    {service[0].duration +
                      (service[0].extras
                        ? service[0].extras.reduce(
                            (total, extra) => (extra.duration !== undefined ? total + extra.duration : total),
                            0
                          )
                        : 0)}
                    {""} Minutes
                  </Text>
                )}
              </View>
              <TouchableOpacity onPress={() => handleRemoveItem(service[0].objectId)}>
                <Icon
                  type="font-awesome"
                  name="trash-o"
                  color="black"
                  size={28}
                  style={{ marginRight: 10 }}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View
          className="mt-2"
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <View
            style={{
              flex: 0.95,
              height: 1,
              backgroundColor: 'lightgray',
              alignSelf: 'center',
              justifyContent: 'center',
            }}
          />
        </View>

        <View className="mb-6">
          <Text
            className="text-lg ml-3 mt-2"
            style={styles.poppinsMed}>
            Subtotal: £{totalServicesPrice.toFixed(2)}
          </Text>

          <Text
            className="text-gray-500 text-base ml-3 "
            style={styles.poppinsReg}>
            Total Duration: {totalServicesDuration} minutes
          </Text>

          {displayError && (
            <Text
              style={styles.poppinsMed}
              className="ml-3 text-red-600 mt-2">
              Please select a timeslot from the calendar.
            </Text>
          )}
        </View>

        <Button
          titleStyle={styles.PoppinsReg}
          onPress={handleContinue}
          title="Continue"
          color="black"
          containerStyle={{
            width: WIDTH - 120,
            borderRadius: 10,
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

  poppinsReg: {
    fontFamily: 'PoppinsReg',
  },

  poppinsMed: {
    fontFamily: 'PoppinsMed',
  },
  queueInfo: {
    borderWidth: 2,
    borderColor: '#0F7D00',
    backgroundColor: 'white',
    borderRadius: 5,
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
    borderWidth: 2,

    borderRadius: 5,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ContinueScreen;
