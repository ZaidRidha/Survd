import React, { useState } from "react";
import useFont from "../../useFont";
import { useNavigation } from "@react-navigation/native";
import { Button, Icon } from "@rneui/themed";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { SCREENS } from "navigation/navigationPaths";
import { Dropdown } from "react-native-element-dropdown";
import { authentication, database } from "../../firebaseConfig";

import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  TextInput,
  Keyboard,
  Dimensions,
  View,
} from 'react-native';


const WIDTH = Dimensions.get('window').width;

const data = [
    { label: 'Passport', value: 'Passport' },
    { label: 'Drivers License', value: 'Drivers License' },
    { label: 'Birth Certificate', value: 'Birth Certificate' },
    { label: 'Identity Card', value: 'Identity Card' },
  ];

const VendorRegistration3 = () => {
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
      navigation.replace(SCREENS.VENDOR_SCREEN4);
    } catch (error) {
      // ... (rest of your error handling code)
      setTimeout(() => {
        setIsError(false);
        setDisabled(false); // Reset the disabled state here too
      }, 3000); // Hide error message after 3 seconds
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        behavior="padding"
        enabled
        style={styles.root}>
        <Text style={styles.heading}>Identification</Text>
        <Text style={styles.inputtext}>What form of Identification would you like to upload?*</Text>
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
              value={value}
              onChange={item => {
                setValue(item.value);
              }}
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
        <Text style={styles.text}>
          By registering, you confirm that you accept our <Text style={styles.linktext}>Terms of Use</Text> and {''}
          <Text style={styles.linktext}>Privacy Policy.*</Text>
        </Text>
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
    </TouchableWithoutFeedback>
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

export default VendorRegistration3;
