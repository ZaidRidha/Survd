import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput, ActivityIndicator } from 'react-native'
import React, { useState,useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import {CountryPicker} from "react-native-country-codes-picker";
import { authentication, firebaseConfig } from '../../firebaseConfig';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { database } from '../../firebaseConfig';
import CountryFlag from "react-native-country-flag";
import { PhoneAuthProvider, signInWithCredential,updatePhoneNumber } from 'firebase/auth';
import { doc,updateDoc } from "firebase/firestore"; 


import { Button } from '@rneui/themed';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { TouchableOpacity } from 'react-native-gesture-handler';

const PhoneScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const recaptchaVerifier = useRef(null);
  const navigation = useNavigation();
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [countryCode, setCountryCode] = useState('+44');
  //const [currentFlag, setCurrentFlag] = useState('AI');
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [verificationId, setVerificationId] = useState(null);
  const CELL_COUNT = 6;
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});


  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const phoneTextPressed = () => {
    setShowCountryPicker(true);
    setLoading(true);
  }

    const sendConfirmation = async () => {
      try{
        const phoneProvider = new PhoneAuthProvider(authentication);
        phoneProvider.verifyPhoneNumber({phoneNumber},recaptchaVerifier.current).then(setVerificationId);
        setPhoneNumber('');

      }catch (error){
        console.log(error);
      }
  };

  const confirmCode = async () => {
    try {
      console.log(authentication.currentUser);
      const credential = PhoneAuthProvider.credential(verificationId, value);
      const currUser = authentication.currentUser;
      updatePhoneNumber(currUser, credential);

      await updateDoc(doc(database,"users",currUser.uid), {
        registrationComplete: true
       });
  
      alert("Login successful");
      navigation.replace("home")
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };
  return (
    <KeyboardAvoidingView behavior="padding" enabled style={styles.root}>
        <Text style={styles.headertext}>Enter Your Phone Number</Text>
        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={phoneTextPressed}>
          </TouchableOpacity>
          <Text onPress={phoneTextPressed} style={{fontSize: 22,marginLeft:5}}>{countryCode}</Text>
          <TextInput
          onChangeText={text => setPhoneNumber(countryCode+ ' ' + text)}
          maxLength={11}
          style={[isFocused ? styles.inputFocused : styles.input]}
          keyboardType="phone-pad"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        </View>
        <Text style = {styles.concode}>We will send you a confirmation code. Standard message and data rates apply.</Text>
        <Button
              title="Send Confirmation"
              buttonStyle={{ backgroundColor: 'rgba(39, 39, 39, 1)' }}
              containerStyle={{
                width: '80%',
                marginHorizontal: 50,
                marginTop:25,
                marginBottom:20,
              }}
              titleStyle={{ color: 'white', marginHorizontal: 20 }}
              onPress = {sendConfirmation}
            />

        <FirebaseRecaptchaVerifierModal
        ref = {recaptchaVerifier}
        firebaseConfig= {firebaseConfig}
        />

        
        <Text style={styles.headertext2}>Enter The Code Below</Text>
        

        <CodeField
        ref={ref}
        {...props}
        value = {value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <View
            // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
            onLayout={getCellOnLayoutHandler(index)}
            key={index}
            style={[styles.cellRoot, isFocused && styles.focusCell]}>
            <Text style={styles.cellText}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />
              <Button
              title="Continue"
              onPress={confirmCode}
              buttonStyle={{ backgroundColor: 'rgba(39, 39, 39, 1)' }}
              containerStyle={{
                width: '80%',
                marginHorizontal: 50,
                marginTop:25,
                marginBottom:20,
              }}
              titleStyle={{ color: 'white', marginHorizontal: 20 }}
            />


        {loading && <ActivityIndicator size="large" color="#999999" />}

        <CountryPicker
          show={showCountryPicker}
          styles={countryPickerStyles.touchFlag}
          searchMessage={'Some search message here'}
          pickerButtonOnPress={(item) => {
            setCountryCode(item.dial_code);
            setLoading(false);
            setShowCountryPicker(false);
            setCurrentFlag(item.flag);
            console.log(item.flag);
            
          }}
        />
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
    root:{
      alignItems: 'center',
      flexDirection: 'column', 
      padding :25,
      flex:1,
      backgroundColor: '#FFFFFF',
    },

    headertext:{
        fontSize:24,
    },
    headertext2:{
      fontSize:24,
      marginTop:40
  },

    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop:10
  },

    pickerContainer: {
      marginVertical: 20,
    },
    input: {
      width: '50%',
      padding: 10,
      borderWidth: 1,
      borderColor: 'gray',
      marginVertical: 10,
      marginLeft:10,
      fontSize:22,
      borderRadius:5
    },

    inputFocused: {
      width: '50%',
      padding: 10,
      borderWidth: 1.5,
      borderColor: 'gray',
      marginVertical: 10,
      marginLeft:10,
      fontSize:22,
      backgroundColor: '#F0F0F0',
      borderRadius:5
    },
    codeFieldRoot: {
      marginTop: 20,
      width: 280,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    cellRoot: {
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomColor: '#ccc',
      borderBottomWidth: 1,
    },
    cellText: {
      color: '#000',
      fontSize: 36,
      textAlign: 'center',
    },
    focusCell: {
      borderBottomColor: '#007AFF',
      borderBottomWidth: 2,
    },
    concode:{
      color: 'gray',
      padding:5
    }
})

const countryPickerStyles = StyleSheet.create({
  touchFlag: {
      width: 30,
      height: 20,
  },
});
export default PhoneScreen
