import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  Keyboard,
  Dimensions,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { Icon, Button } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { SCREENS } from 'navigation/navigationPaths';
import { Dropdown } from 'react-native-element-dropdown';

import useFont from '../../useFont';
import { authentication, database } from '../../firebaseConfig';

const WIDTH = Dimensions.get('window').width;

const VendorRegistration1 = () => {
  const navigation = useNavigation();

  useFont();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [barberingexp, setBarberingexp] = useState(null);

  const data = [
    { label: '<1 Year', value: '<1 Year' },
    { label: '>1 Year', value: '>1 Year' },
    { label: '2 Years', value: '2 Years' },
    { label: '3 Years', value: '3 Years' },
    { label: '4 Years', value: '4 Years' },
    { label: '5+Years', value: '5+ Years' },
  ];

  const handleNext = async () => {
    setDisabled(true);
    if (password !== passwordRepeat) {
      setIsError(true);
      setErrorMessage('Passwords do not match, Please try again.');
      setTimeout(() => {
        setIsError(false);
        setDisabled(false); // Reset the disabled state here
      }, 3000); // Hide error message after 3 seconds
      return;
    }
    setIsError(false);

    try {
      navigation.replace(SCREENS.VENDOR_SCREEN2);
    } catch (error) {
      // ... (rest of your error handling code)
      setTimeout(() => {
        setIsError(false);
        setDisabled(false); // Reset the disabled state here too
      }, 3000); // Hide error message after 3 seconds
    }
  };

  return (
    <ScrollView onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        behavior="padding"
        enabled
        style={styles.root}>
        <Text style={styles.heading}>Register</Text>
        <Text style={styles.inputtext}>Full Name*</Text>
        <TextInput
          placeholder="Full Name"
          style={[isFocused ? styles.inputFocused : isError ? styles.inputError : styles.input]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChangeText={(text) => setEmail(text)}
        />
        <Text style={styles.inputtext}>Phone Number*</Text>
        <TextInput
          placeholder="Phone Number"
          style={[isFocused ? styles.inputFocused : isError ? styles.inputError : styles.input]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        <Text style={styles.inputtext}>Email Address*</Text>
        <TextInput
          placeholder="Same as registration email (if exists)"
          style={[isFocused ? styles.inputFocused : isError ? styles.inputError : styles.input]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChangeText={(text) => setPasswordRepeat(text)}
          secureTextEntry
        />
        <Text style={styles.inputtext}>Do you have any barbering qualifications or licenses?*</Text>
        <TextInput
          placeholder="qualifications or licenses"
          style={[isFocused ? styles.inputFocused : isError ? styles.inputError : styles.input]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChangeText={(text) => setPasswordRepeat(text)}
          secureTextEntry
        />
        <Text style={styles.inputtext}>How many years of barbering experience do you have?*</Text>
         <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select item"
              searchPlaceholder="Search..."
              value={barberingexp}
              onChange={item => {
                setBarberingexp(item.value);
              }}
          />

        <Text style={styles.inputtext}>Address Line 1*</Text>
        <TextInput
          placeholder="Address Line 1"
          style={[isFocused ? styles.inputFocused : isError ? styles.inputError : styles.input]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChangeText={(text) => setPasswordRepeat(text)}
          secureTextEntry
        />

        <Text style={styles.inputtext}>Address Line 2</Text>
        <TextInput
          placeholder="Address Line 2"
          style={[isFocused ? styles.inputFocused : isError ? styles.inputError : styles.input]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChangeText={(text) => setPasswordRepeat(text)}
          secureTextEntry
        />

        <Text style={styles.inputtext}>City</Text>
        <TextInput
          placeholder="City"
          style={[isFocused ? styles.inputFocused : isError ? styles.inputError : styles.input]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChangeText={(text) => setPasswordRepeat(text)}
          secureTextEntry
        />

        <Text style={styles.inputtext}>Postal Code*</Text>
        <TextInput
          placeholder="Postal Code"
          style={[isFocused ? styles.inputFocused : isError ? styles.inputError : styles.input]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChangeText={(text) => setPasswordRepeat(text)}
          secureTextEntry
        />
        <View className="my-5">
          <Button
            title="Continue"
            disabled={disabled}
            onPress={handleNext}
            buttonStyle={{
              backgroundColor: 'black',
              width: WIDTH * 0.8, // Makes the button full-width
              height: 40,
              borderRadius: 10, // Adjust as needed to change the button's height
            }}
            disabledStyle={{ backgroundColor: 'black' }} // This maintains the original color when disabled
            disabledTitleStyle={{ color: 'white' }}
            titleStyle={{ color: 'white' }}
          />
        </View>
        {isError ? (
          <Text style={styles.errorText}>
            <Icon
              type="ionicon"
              name="information-circle"
              color="red"
              size={17}
            />
            {errorMessage}
          </Text>
        ) : null}
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    flexDirection: 'column',
    padding: 25,
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  bsubview: {
    padding: 20,
  },
  heading: {
    marginTop: 20,
    fontSize: 25,
    fontWeight: "bold",
  },

  inputtext: {
    fontFamily: 'PoppinsReg',
    alignSelf: 'flex-start',
    marginTop: 10,
  },

  confirmtext: {
    fontFamily: 'PoppinsLight',
    alignSelf: 'flex-start',
  },

  text: {
    // marginRight: 500
    fontFamily: 'PoppinsLight',
    marginTop: 10,
  },

  linktext: {
    color: '#67718f',
  },

  errorText: {
    marginTop: 25,
    fontFamily: 'PoppinsLight',
    color: '#db0000',
    alignItems: 'center',
  },

  font1: {
    fontFamily: 'PoppinsLight',
  },

  font2: {
    fontFamily: 'FigtreeBold',
  },

  backtext: {
    alignSelf: 'flex-start',
    fontFamily: 'PoppinsLight',
    color: '#67718f',
    marginTop: 15,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    marginVertical: 10,
    fontSize: 14,
    borderRadius: 5,
    fontFamily: 'PoppinsReg',
  },

  inputFocused: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginVertical: 10,
    backgroundColor: '#F0F0F0',
    fontSize: 14,
    borderRadius: 5,
    fontFamily: 'PoppinsReg',
  },

  inputError: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: 'red',
    marginVertical: 10,
    fontSize: 14,
    borderRadius: 5,
    fontFamily: 'PoppinsReg',
  },
  dropdown: {
      margin: 16,
      height: 50,
      width: 300,
      borderBottomColor: 'gray',
      borderBottomWidth: 0.5,
    },
    icon: {
      marginRight: 5,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
});

export default VendorRegistration1;
