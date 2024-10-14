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

const data = [
    { label: '<1 Year', value: '<1 Year' },
    { label: '>1 Year', value: '>1 Year' },
    { label: '2 Years', value: '2 Years' },
    { label: '3 Years', value: '3 Years' },
    { label: '4 Years', value: '4 Years' },
    { label: '5 Years', value: '5 Years' },
  ];

const VendorRegistration4 = () => {
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

  const handleRegister = async () => {
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
      const { user } = await createUserWithEmailAndPassword(authentication, email, password);
      await setDoc(doc(database, 'users', user.uid), {
        email,
      });
      navigation.replace(SCREENS.PHONE);
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
          <Text style={styles.inputtext}>
          Terms of Service for survd
          Last Updated: 28th November 2023
          1. Acceptance of Terms
          By accessing and using the survd app ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you are not authorized to use this Service.
          2. Service Description
          survd provides a platform for users ("Users") to book and receive various mobile and remote services ("Services") from registered service providers ("Providers"). Services may be rendered at the User's location (home, office, etc.) or remotely.
          3. User Registration and Account Security
          Users must register and create an account to use survd. You agree to provide accurate, current, and complete information during the registration process and to maintain the security of your account by not sharing your password.
          4. Privacy Policy
          Your use of the Service is also governed by our Privacy Policy, which outlines our practices regarding the collection, use, and disclosure of your information.
          5. User Conduct and Responsibilities
          Users agree to use the Service in compliance with all applicable laws and regulations. Users are responsible for providing a safe and appropriate environment for Providers to render Services.
          6. Provider Conduct and Screening
          Providers are independent contractors. survd conducts background checks and verifies the qualifications of Providers to ensure safety and quality of Services. Providers agree to adhere to professional standards and all applicable laws.
          7. Payment and Billing
          Details of payment terms, including processing, fees, and dispute resolution, are outlined in the Service's payment terms section. All financial transactions are conducted securely.
          8. Cancellation, Rescheduling, and Refunds
          survd's policies for cancellation, rescheduling, and refunds are provided in detail. Users and Providers are encouraged to familiarize themselves with these policies.
          9. Safety and Liability
          While survd prioritizes safety, the Service acts only as a platform connecting Users and Providers. survd is not liable for any incidents or accidents that may occur during the provision of Services.
          10. Service Quality and Dispute Resolution
          survd is committed to ensuring high service quality. In case of disputes between Users and Providers, survd will facilitate resolution in a fair and efficient manner.
          11. Intellectual Property Rights
          All intellectual property rights in the Service, including trademarks, logos, and content, are owned by survd or its licensors.
          12. Changes to Terms
          survd reserves the right to modify these Terms at any time. Your continued use of the Service after such changes constitutes your acceptance of the new Terms.
          13. Governing Law and Jurisdiction
          These Terms shall be governed by the laws of the United Kingdom. Disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts of United Kingdom. 
          14. Contact Information
          For any questions, concerns, or dispute resolution assistance, please contact us in the contact us section. 
          </Text>
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
          placeholder="Email Address"
          style={[isFocused ? styles.inputFocused : isError ? styles.inputError : styles.input]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChangeText={(text) => setPasswordRepeat(text)}
          secureTextEntry
        />
        <Text style={styles.inputtext}>Do you have any barbering qualifications or licenses?*</Text>
        <TextInput
          placeholder="Email Address"
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
              value={value}
              onChange={item => {
                setValue(item.value);
              }}
          />
        <View className="my-5">
          <Button
            title="Continue"
            disabled={disabled}
            onPress={handleRegister}
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

export default VendorRegistration4;
