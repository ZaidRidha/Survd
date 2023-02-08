import {View, Image, useWindowDimensions, StyleSheet,Text, TouchableOpacity,ScrollView,KeyboardAvoidingView,TextInput} from 'react-native'
import React, { useState,startTransition } from 'react'
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import Checkbox from 'expo-checkbox';
import Colors from '../../assets/colors/colors'
import useFont from '../../useFont'
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../firebaseConfig'


const SignUpScreen = () => {

  const navigation = useNavigation();

  useFont();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isFocused, setIsFocused] = useState(false);



  const handleRegister = async () => {
    navigation.navigate("Phone");
    // if (password !== passwordRepeat) {
    //   setIsError(true);
    //   setErrorMessage("Passwords do not match, Please try again.");
    //   return;
    // } else {
    //   setIsError(false);
    // }

    // try {
    //   const { user } = await auth.createUserWithEmailAndPassword(email, password);
    //   const userRef = db.collection('users').doc(user.uid);
    //   await userRef.set({username: username});
    //   alert(`User ${username} with email ${user.email} created.`);
      
    // } catch (error) {
    //   setIsError(true);
    //   setErrorMessage(error.message);
    // }
}



  

  return (
    <KeyboardAvoidingView behavior="padding" enabled style={styles.root}>
    <Text style = {styles.inputtext}>Email*</Text>
    <TextInput
    placeholder='Email'
    style={[isFocused ? styles.inputFocused : (isError ? styles.inputError : styles.input)]}
    onFocus={() => setIsFocused(true)}
    onBlur={() => setIsFocused(false)}
    onChangeText={(text) => setEmail(text)}
    />
    <Text style = {styles.inputtext}>Password*</Text>
    <TextInput
    placeholder='Password'
    style={[isFocused ? styles.inputFocused : (isError ? styles.inputError : styles.input)]}
    onFocus={() => setIsFocused(true)}
    onBlur={() => setIsFocused(false)}
    onChangeText={(text) => setEmail(text)}
    secureTextEntry = {true}
    />
    <Text style = {styles.inputtext}>Confirm Password*</Text>
    <TextInput
    placeholder='Confirm Password'
    style={[isFocused ? styles.inputFocused : (isError ? styles.inputError : styles.input)]}
    onFocus={() => setIsFocused(true)}
    onBlur={() => setIsFocused(false)}
    onChangeText={(text) => setPasswordRepeat(text)}
    secureTextEntry = {true}
    />
    <CustomButton 
    text = "Continue"
    type = "signup"
    onPress={handleRegister}
    />
    <Text style = {styles.text}>By registering, you confirm that you accept our <Text style = {styles.linktext} >Terms of Use</Text> and <Text style = {styles.linktext} >Privacy Policy.*</Text></Text>
    {isError ? <Text style = {styles.errorText}>{errorMessage}</Text> : null}
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

  bsubview:{
    padding:20,
  },

  inputtext:{
    fontFamily: "FigtreeReg",
    alignSelf: 'flex-start',
    marginTop:10,
  },

  confirmtext:{
    fontFamily: "FigtreeLight",
    alignSelf: 'flex-start',
  },


  text:{
    // marginRight: 500
    fontFamily: "FigtreeLight",
    marginTop:10,
    
  },

  linktext:{
    color: '#67718f',

  },

  errorText:{
    marginTop:25,
    fontFamily: "FigtreeLight",
    color: '#db0000'

  },

  font1: {
    fontFamily: "FigtreeLight"
  },

  font2: {
    fontFamily: "FigtreeBold"
  },

  backtext:{
    alignSelf: 'flex-start',
    fontFamily: "FigtreeLight",
    color: '#67718f',
    marginTop: 15,

  },
  input:{
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    marginVertical: 10,
    fontSize:14,
    borderRadius:5,
    fontFamily: "FigtreeReg"
  },

  inputFocused: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginVertical: 10,
    backgroundColor: '#F0F0F0',
    fontSize:14,
    borderRadius:5,
    fontFamily: "FigtreeReg"
  },

  inputError: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: 'red',
    marginVertical: 10,
    fontSize:14,
    borderRadius:5,
    fontFamily: "FigtreeReg"
  },



})


export default SignUpScreen