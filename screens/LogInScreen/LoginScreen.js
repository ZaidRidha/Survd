import {View, Image, useWindowDimensions, StyleSheet,Text, TouchableOpacity,KeyboardAvoidingView,TextInput,ActivityIndicator} from 'react-native'
import React, { useState,startTransition,useEffect } from 'react'
import { Button } from '@rneui/themed';
import logo from '../../assets/images/boxlogo.png'

import CustomButton from '../../components/CustomButton';
import useFont from '../../useFont'
import { useNavigation } from '@react-navigation/native';
import { Icon, } from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient';
import { authentication } from '../../firebaseConfig';
import { signInWithEmailAndPassword,onAuthStateChanged} from "firebase/auth";
import { database } from '../../firebaseConfig';
import { doc,getDoc } from "firebase/firestore"; 






const LoginScreen = () => {
  const [currUid, setCurrUid] = useState(null);
  useEffect(() => { 
    onAuthStateChanged(authentication, (user) => {
      if (user) {
        setCurrUid(user.uid);
      } 
    }); 
  }, []);

  useEffect(() => {

    const checkAndNavigate = async () =>{
      console.log(currUid);
      const docRef = doc(database,"users",currUid);
      const docSnap = await getDoc(docRef);
      const val = docSnap.get('registrationComplete');

      if(val==true){
        navigation.replace("home");
      }

    };

    checkAndNavigate();

    
  }, [currUid]);

  
  useFont();



  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {height} = useWindowDimensions();
  const navigation = useNavigation();
  const [isError, setIserror] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(false);


  const handleLogin = async () => {
     try {
        setLoading(true);
        const user = await signInWithEmailAndPassword(authentication, email, password)
       if (user) {
            navigation.replace("home")
         }
     } catch (error) {
         console.log(error);
        setIserror(true);
        setTimeout(() => {
          setIserror(false);
       }, 4000);
     }
     setLoading(false);
}

  const onForgotPasswordPressed = () => {
    console.warn("Forgot Password");
  }

  
  const onLogininstagramPressed = () => {
    console.warn("Login IG");
  }
  
  const onLoginGuestPressed = () => {
    console.warn("Login as Guest");
  }

  const onSignupPressed = () => {
    console.warn("Signup");
    navigation.navigate('Register')
  }

  

  return (
    <KeyboardAvoidingView behavior="padding" enabled style={styles.root}>
    <Image source = {logo} style = {[styles.logo, {height: height * 0.22}]} resizeMode="contain"/>
    {loading && <ActivityIndicator size="large" color="#999999" />}
    <Text style = {styles.text}>Email</Text>
    <TextInput
    placeholder='Email'
    style={[isFocused ? styles.inputFocused : (isError ? styles.inputError : styles.input)]}
    onFocus={() => setIsFocused(true)}
    onBlur={() => setIsFocused(false)}
    onChangeText={(text) => setEmail(text)}
    />
      
    <Text style = {styles.text}>Password</Text>
    <TextInput

    placeholder='Password'
    style={[isFocused ? styles.inputFocused : (isError ? styles.inputError : styles.input)]}
    secureTextEntry = {true}
    onFocus={() => setIsFocused(true)}
    onBlur={() => setIsFocused(false)}
    onChangeText={(text) => setPassword(text)}
    />

    <Text style = {styles.forgottext}>Forgot Password?</Text>
    {isError ? <Text style = {styles.errortext}>Invalid email/password combination!</Text> : null}
  
    
    <CustomButton 
    text = "Login"
    onPress = {handleLogin}
    />

  <Button
  ViewComponent={LinearGradient}
  linearGradientProps={{
    colors: ['#feda75', '#fa7e1e', '#d62976', '#962fbf', '#4f5bd5'],
    start: { x: 0, y: 0.5 },
    end: { x: 0.8, y: 1 },
  }}
  icon={<Icon style = {styles.icon} type="antdesign" name="instagram" color="white" size={25} />}
  title="Continue With Instagram"
  containerStyle={{ width: '100%',borderRadius: 8, marginBottom:15 }}
  titleStyle={{ fontFamily: 'FigtreeReg', fontSize: 14,}}
  onPress={onLogininstagramPressed}
  />


    <View style = {styles.footer}>
    <TouchableOpacity onPress={onSignupPressed}>
    <Text style = {{alignItems:'center',fontFamily:'FigtreeLight'}}>Don't have an account? Signup</Text>
    </TouchableOpacity>
    </View>

    
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  root:{
    // alignItems: 'center',
    padding :25,
    flexDirection: 'column', 
    justifyContent: 'center',
    alignItems: 'center',
    flex:1,
    backgroundColor: '#FFFFFF',
  },
  logo:{
    width:'70%',
    maxwidth: 300,
    maxheight: 300,
    marginBottom: 20,
  },

  text:{
    // marginRight: 500
    alignSelf: 'flex-start',
    fontFamily: "FigtreeReg",
    fontSize: 14,
  },

  font1: {
    fontFamily: "FigtreeReg"
  },

  font2: {
    fontFamily: "FigtreeReg"
  },

  footer: {
  },

  errortext: {
    fontFamily: "FigtreeLight",
    color: "red",
    alignItems:'center',
    marginBottom: 10,

  },

  forgottext:{
    fontFamily:"FigtreeLight",
    alignSelf: 'flex-start',
    marginTop: 5,
    marginBottom: 20,
  },

  icon: {
    marginRight: 5
  },

  btn: {
    width:'100%',
    borderRadius: 40,
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
  }

 

  

})

const subviewStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
  },
});

export default LoginScreen