import {View, Image, useWindowDimensions, StyleSheet,Text, TouchableOpacity,ScrollView,KeyboardAvoidingView} from 'react-native'
import React, { useState,startTransition } from 'react'
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import Checkbox from 'expo-checkbox';
import Colors from '../../assets/colors/colors'
import useFont from '../../useFont'
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../firebase'






const SignUpScreen = () => {

  const navigation = useNavigation();


  useFont();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const {height} = useWindowDimensions();
  const [isChecked, setChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleRegister = () =>{
    if (password !== passwordRepeat) {
      alert("Passwords do not match, Please try again.");
      setErrorMessage("Passwords do not match, Please try again.");
      return;
    };

    auth
    .createUserWithEmailAndPassword(email,password)
    .then(userCredentials => {
      const user = userCredentials.user;
      console.log(user.email);
      alert("User Created.",user.email);
      setErrorMessage("");
    })
    .catch(error => setErrorMessage(error.message))
  }
  

  const onAlreadyHavePressed = () => {
    navigation.navigate('Login')
  }

  return (
    <KeyboardAvoidingView behavior="height" enabled style={styles.root}>
    <Text style = {styles.title}>Register</Text>
    <Text style = {styles.inputtext}>Username*</Text>
    <CustomInput
    value = {username}
    setValue = {setUsername}
    />
    <Text style = {styles.inputtext}>Email*</Text>
    <CustomInput
    value = {email}
    setValue = {setEmail}
    />
    <Text style = {styles.inputtext}>Password*</Text>
    <CustomInput
    value = {password}
    setValue = {setPassword}
    secureTextEntry = {true}
    />
    <Text style = {styles.inputtext}>Confirm Password*</Text>
    <CustomInput
    value = {passwordRepeat}
    setValue = {setPasswordRepeat}
    secureTextEntry = {true}
    />
    <CustomButton 
    text = "Continue"
    type = "signup"
    onPress={handleRegister}
    />
    <Text style = {styles.inputtext}>By registering, you confirm that you accept our <Text style = {styles.linktext} >Terms of Use</Text> and <Text style = {styles.linktext} >Privacy Policy.*</Text></Text>
    <Text style = {styles.backtext} onPress = {onAlreadyHavePressed}>Already Have an account? Sign In</Text>
    {errorMessage && <Text style = {styles.errorText}>{errorMessage}</Text>}
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

  title:{
    fontFamily: "GilroyBold",
    fontSize: 32,
    margin:10,
    marginBottom:30,
  },

  inputtext:{
    fontFamily: "GilroyLight",
    alignSelf: 'flex-start',
    marginTop:10,
  },

  confirmtext:{
    fontFamily: "GilroyLight",
    alignSelf: 'flex-start',
  },


  text:{
    // marginRight: 500
    fontFamily: "GilroyLight"
  },

  linktext:{
    color: '#67718f',

  },

  errorText:{
    marginTop:25,
    fontFamily: "GilroyLight",
    color: '#db0000'

  },

  font1: {
    fontFamily: "GilroyLight"
  },

  font2: {
    fontFamily: "GilroyBold"
  },

  backtext:{
    alignSelf: 'flex-start',
    fontFamily: "GilroyLight",
    color: '#67718f',
    marginTop: 15,

  },



})


export default SignUpScreen