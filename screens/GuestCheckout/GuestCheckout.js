import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import { Icon, Button } from '@rneui/themed';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CountryPicker } from 'react-native-country-codes-picker';
import { SCREENS } from 'navigation/navigationPaths';
import LoginScreen from '../LogInScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WIDTH = Dimensions.get('window').width;

const GuestCheckout = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPhone, setIsValidPhone] = useState(true);
  const [isValidName, setIsValidName] = useState(true);
  const navigation = useNavigation();
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [countryCode, setCountryCode] = useState('+44');
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const [showLogin, setShowLogin] = useState(false);

  const { selectedTimeslot, address, postCode, selectedDate, vendorName, servicesDuration, subtotal, docId } =
    route.params;

  const [isFocused, setIsFocused] = useState(false);
  const goBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Reset the showLogin state every time the screen gains focus
      setShowLogin(false);
    });

    return unsubscribe;
  }, [navigation]);
  const phoneTextPressed = () => {
    setShowCountryPicker(true);
    setLoading(true);
  };
  const storeGuestInfo = async (email, phone, name) => {
    try {
      await AsyncStorage.setItem('guestEmail', email);
      await AsyncStorage.setItem('guestPhone', phone);
      await AsyncStorage.setItem('guestName', name);
    } catch (error) {
      console.error('Failed to save the data to the storage');
    }
  };
  const validateEmail = (email) => {
    const pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return pattern.test(email);
  };

  const validatePhone = (phone) => {
    const strippedPhone = phone.replace(countryCode, '').trim();
    return /^\d+$/.test(strippedPhone) && strippedPhone.length > 0;
  };

  const validateName = (name) => {
    return name.trim().length > 0;
  };
  const checkStoredInfo = async () => {
    try {
      const asyncEmail = await AsyncStorage.getItem('guestEmail');
      const asyncPhone = await AsyncStorage.getItem('guestPhone');
      const asyncName = await AsyncStorage.getItem('guestName');
      setName(asyncName);
      setEmail(asyncEmail);
      setPhone(formatStoredPhone(asyncPhone));


    } catch (error) {
      console.error('Failed to retrieve the data from storage');
    }
  };

  useEffect(() => {
    checkStoredInfo();
  }, []);
  const navigateToLoginSignup = () => {
    setShowLogin(true);
  };

  const pressContinue = () => {
    if (!validateEmail(email)) {
      setIsValidEmail(false);
      return;
    }

    if (!validatePhone(phone)) {
      setIsValidPhone(false);
      return;
    }

    if (!validateName(name)) {
      setIsValidName(false);
      return;
    }

    storeGuestInfo(email, phone, name);
    navigation.navigate(SCREENS.PAYMENT_SCREEN, {
      selectedTimeslot,
      address,
      postCode,
      selectedDate,
      vendorName,
      subtotal,
      servicesDuration,
      docId,
      guestPhone: phone,
      guestName: name,
      guestEmail: email,
    });
  };

  const formatStoredPhone = (phone) => {
    if (phone) {
      return phone.replace(countryCode, '').trim();
    }
    return '';
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={{ alignSelf: 'start' }}>
          <TouchableOpacity onPress={goBack}>
            <Icon
              type="ant-design"
              name="close"
              color="black"
              size={38}
              style={styles.locationIcon}
            />
          </TouchableOpacity>
        </View>

        {!showLogin ? (
          <View style={styles.body}>
            <Text style={styles.title}>Continue As Guest</Text>
            <Text style={styles.PoppinsMed}>Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={(text) => {
                setName(text);
                setIsValidName(true);
              }}
              borderColor={isValidName ? 'gray' : 'red'}
              clearButtonMode="while-editing"
            />

            <Text style={styles.PoppinsMed}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setIsValidEmail(true);
              }}
              borderColor={isValidEmail ? 'gray' : 'red'}
              placeholderTextColor={'black'}
              clearButtonMode="while-editing"
            />

            <Text
              className="mt-5"
              style={styles.PoppinsMed}>
              Phone Number
            </Text>
            <View style={styles.inputContainer}>
              <TouchableOpacity onPress={phoneTextPressed} />
              <Text
                onPress={phoneTextPressed}
                style={{ fontSize: 16, marginRight: 5 }}>
                {countryCode}
              </Text>
              <TextInput
                onChangeText={(text) => {
                  setPhone(text);
                  setIsValidPhone(true);
                }}
                borderColor={isValidPhone ? 'gray' : 'red'}
                value={formatStoredPhone(phone)}
                maxLength={11}
                clearButtonMode="while-editing"
                style={[styles.input, { width: '85%' }]}
                keyboardType="phone-pad"
              />
            </View>

            <Button
              titleStyle={[styles.PoppinsReg, { fontSize: 18 }]}
              onPress={pressContinue}
              title="Continue"
              color="black"
              containerStyle={{
                width: '80%', // Assumed you have a WIDTH constant somewhere. Replace with actual calculation if necessary.
                borderRadius: 10,
                alignSelf: 'center',
                justifyContent: 'center',
                marginVertical: 20,
              }}
            />

            <View style={styles.divider} />

            {loading && (
              <ActivityIndicator
                size="large"
                color="#999999"
              />
            )}

            <CountryPicker
              show={showCountryPicker}
              // other country picker props
            />

            <TouchableOpacity onPress={navigateToLoginSignup}>
              <Text style={[styles.PoppinsReg, { color: 'black' }]}>Login/Signup</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <LoginScreen />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default GuestCheckout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  body: {
    marginVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  divider: {
    height: 20,
  },

  PoppinsReg: {
    fontFamily: 'PoppinsReg',
  },

  PoppinsMed: {
    fontFamily: 'PoppinsMed',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const countryPickerStyles = StyleSheet.create({
  modal: {
    height: 340,
  },
});
