import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react-native';
import { Icon, Button } from '@rneui/themed';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { database, authentication } from '../../firebaseConfig';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const ViewAppointment = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [showServices, setShowServices] = useState(false);
  const [userName, setUserName] = useState(''); // Add this line

  const { appointmentData } = route.params;

  const getName = async () => {
    if (authentication.currentUser) {
      // Get name from Firestore using the uid
      const userDocRef = doc(database, 'users', authentication.currentUser.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists && userDoc.data().name) {
        return userDoc.data().name;
      } else {
        console.error('User document does not exist or lacks a name field.');
        return null; // Or return a default name or handle this case differently
      }
    } else {
      // Get name from AsyncStorage
      const guestName = await AsyncStorage.getItem('guestName');
      console.log(guestName);
      return guestName;
    }
  };

  useEffect(() => {
    const retrieveName = async () => {
      const name = await getName();
      setUserName(name); // This updates the state variable with the name
    };

    retrieveName(); // Call the function inside useEffect
  }, []);

  console.log(appointmentData);

  const deserializedBasket = JSON.parse(appointmentData.Basket);

  const timestamp = new Date(appointmentData.timeDate.seconds * 1000 + appointmentData.timeDate.nanoseconds / 1000000);

  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  const formattedDate = timestamp.toLocaleString(undefined, options);

  const pressServices = () => {
    setShowServices(!showServices);
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.root}>
        <View className="flex flex-row items-center">
          <TouchableWithoutFeedback onPress={goBack}>
            <Icon
              type="antdesign"
              name="left"
              color="black"
              size={28}
            />
          </TouchableWithoutFeedback>
        </View>

        <ScrollView style={styles.inner}>
          {appointmentData.status === 'cancelled' ? (
            <Lottie
              source={require('../../assets/animations/18053-no-error-cancelled.json')}
              autoPlay
              loop={false} // Set loop prop to false
              style={styles.animation}
            />
          ) : appointmentData.status === 'awaiting' ? (
            <Lottie
              source={require('../../assets/animations/136473-waiting.json')}
              autoPlay
              loop // Set loop prop to false
              style={styles.animation}
            />
          ) : (
            <Lottie
              source={require('../../assets/animations/104297-completed-icon.json')}
              autoPlay
              loop={false} // Set loop prop to false
              style={styles.animation}
            />
          )}

          <Text
            style={styles.PoppinsMed}
            className="text-xl flex-grow text-center">
            {appointmentData.status === 'awaiting'
              ? 'Awaiting Confirmation'
              : appointmentData.status === 'cancelled'
              ? 'Appointment Cancelled'
              : appointmentData.status === 'confirmed'
              ? 'Appointment Confirmed'
              : appointmentData.status === 'completed'
              ? 'Appointment Completed'
              : ''}
          </Text>

          <Text
            style={styles.PoppinsMed}
            className="text-lg mt-5 ">
            Appointment Details:
          </Text>

          <View className="">
            <View className="flex flex-row items-center my-1">
              <Text
                style={styles.PoppinsMed}
                className="text-lg ">
                For:
              </Text>
              <Text
                style={styles.PoppinsReg}
                className="text-base ml-1 ">
                {userName}
              </Text>
            </View>
            <View className="flex flex-row items-center mt-1 mb-2">
              <Text
                style={styles.PoppinsMed}
                className="text-lg ">
                By:
              </Text>
              <Text
                style={styles.PoppinsReg}
                className="text-base ml-1 ">
                {appointmentData.barberName}
              </Text>
            </View>
            <View className="flex flex-row items-center my-1">
              <Icon
                type="entypo"
                name="shop"
                color="black"
                size={24}
              />
              <Text
                style={styles.PoppinsMed}
                className="text-base ml-1">
                Ismail's Barbershop
              </Text>
            </View>
            <View className="flex flex-row items-center my-1 flex flex-wrap">
              <Icon
                type="ionicon"
                name="location-sharp"
                color="black"
                size={24}
              />
              <Text
                style={styles.PoppinsMed}
                className="text-base ml-1 ">
                {appointmentData.address},
              </Text>
              <Text
                style={styles.PoppinsMed}
                className="text-base ml-1">
                {appointmentData.postcode}
              </Text>
            </View>
            <View className="flex flex-row items-center my-1">
              <Icon
                type="entypo"
                name="calendar"
                color="black"
                size={24}
              />
              <Text
                style={styles.PoppinsMed}
                className="text-base ml-1">
                {appointmentData.date}, {appointmentData.time}
              </Text>
            </View>

            <View className="flex flex-row items-center my-1">
              <Icon
                type="antdesign"
                name="creditcard"
                color="black"
                size={24}
              />
              <Text
                style={styles.PoppinsMed}
                className="text-base ml-1">
                Payment Method
              </Text>
            </View>

            <View className="flex flex-row items-center my-1">
              <Icon
                type="feather"
                name="clock"
                color="black"
                size={24}
              />
              <Text
                style={styles.PoppinsMed}
                className="text-base ml-1">
                Booked on {formattedDate}
              </Text>
            </View>
          </View>

          <View
            className="my-1"
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: 'lightgray',
                alignSelf: 'center',
                justifyContent: 'center',
              }}
            />
          </View>

          <TouchableOpacity onPress={pressServices}>
            <View className="flex flex-row items-center">
              <Text
                className="text-lg mr-1"
                style={styles.PoppinsMed}>
                Selected Services
              </Text>
              <Icon
                type="antdesign"
                name="down"
                color="black"
                size={21}
              />
            </View>
          </TouchableOpacity>

          {showServices &&
            deserializedBasket.map((serviceGroup, index) => (
              <View
                key={index}
                style={styles.serviceGroup}>
                {serviceGroup.map((service, serviceIndex) => (
                  <View key={serviceIndex}>
                    <Text
                      className="text-base"
                      style={styles.PoppinsMed}>
                      {service.name}
                    </Text>
                    <Text
                      className="text-base"
                      style={styles.PoppinsMed}>
                      £{service.price.toFixed(2)}
                    </Text>
                    <Text
                      className="text-sm text-gray-600"
                      style={styles.PoppinsMed}>
                      {service.duration} Minutes
                    </Text>

                    {service.extras.map((extra, extraIndex) => (
                      <View key={extraIndex}>
                        <Text
                          className="text-base"
                          style={styles.PoppinsMed}>
                          {extra.name}
                        </Text>
                        <Text
                          className="text-base"
                          style={styles.PoppinsMed}>
                          £{extra.price.toFixed(2)}
                        </Text>
                        <Text
                          className="text-sm text-gray-600"
                          style={styles.PoppinsMed}>
                          {extra.duration} Minutes
                        </Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            ))}

          <Text
            className=" text-sm mt-1 "
            style={styles.PoppinsReg}>
            Total Duration: {appointmentData.duration} Minutes
          </Text>

          <Text
            className=" text-base mb-1 "
            style={styles.PoppinsMed}>
            Subtotal: £{appointmentData.price.toFixed(2)}
          </Text>

          <View
            className="my-1"
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: 'lightgray',
                alignSelf: 'center',
                justifyContent: 'center',
              }}
            />
          </View>

          <View>
            <View className="flex flex-row items-center ">
              <Icon
                type="antdesign"
                name="infocirlce"
                color="gray"
                size={14}
              />
              <Text
                className="  text-base text-gray-500 ml-1"
                style={styles.PoppinsMed}>
                Fees:
              </Text>
            </View>

            <Text
              className=" text-sm text-gray-500"
              style={styles.PoppinsReg}>
              Card Processing Fee : £0.80
            </Text>
            <Text
              className=" text-sm text-gray-500"
              style={styles.PoppinsReg}>
              Mobile Travel Fee : £8.50
            </Text>
            <Text
              className=" text-sm text-gray-500"
              style={styles.PoppinsReg}>
              Deposit: £10.00
            </Text>

            <Text
              className=" text-base mt-1 "
              style={styles.PoppinsMed}>
              Total: £21.50
            </Text>

            <View
              className="flex flex-row items-center justify-between"
              style={{ marginBottom: 15, marginTop: 10 }}>
              {appointmentData.status !== 'completed' && appointmentData.status !== 'cancelled' && (
                <Button
                  title="Cancel"
                  buttonStyle={{
                    backgroundColor: 'white',
                    borderWidth: 1,
                    borderColor: '#DA0D04',
                    width: WIDTH * 0.45,
                    marginTop: 10,
                    borderRadius: 5,
                  }}
                  titleStyle={{
                    color: '#DA0D04',
                    fontFamily: 'PoppinsMed',
                  }}
                />
              )}

              <Button
                title="Get Help"
                buttonStyle={{
                  backgroundColor: 'white',
                  borderWidth: 1,
                  borderColor: 'black',
                  width: appointmentData.status === 'completed' || appointmentData.status === 'cancelled' ? WIDTH * 0.94 : WIDTH * 0.45,
                  marginTop: 10,
                  borderRadius: 5,
                }}
                titleStyle={{
                  color: 'black',
                  fontFamily: 'PoppinsMed',
                }}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ViewAppointment;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
  },

  inner: {
    padding: 10,
  },

  animation: {
    width: WIDTH * 0.3, // Adjust the width as needed
    height: HEIGHT * 0.3, // Adjust the height as needed
    alignSelf: 'center',
  },

  PoppinsReg: {
    fontFamily: 'PoppinsReg',
  },

  PoppinsLight: {
    fontFamily: 'PoppinsLight',
  },

  PoppinsBold: {
    fontFamily: 'PoppinsBold',
  },

  PoppinsMed: {
    fontFamily: 'PoppinsMed',
  },
});
