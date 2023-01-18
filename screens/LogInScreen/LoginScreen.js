import {View, Image, useWindowDimensions, StyleSheet,Text, TouchableOpacity,KeyboardAvoidingView} from 'react-native'
import React, { useState,startTransition,useEffect } from 'react'
import logo from '../../assets/images/boxlogo.png'
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import Checkbox from 'expo-checkbox';
import Colors from '../../assets/colors/colors'
import useFont from '../../useFont'
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../../firebase'
import HomeScreen from '../HomeScreen/HomeScreen';


const LoginScreen = () => {


  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace("home");
      }
    });
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {height} = useWindowDimensions();
  const navigation = useNavigation();
  const [isChecked, setChecked] = useState(false);

  const fontsloaded = useFont();


  const handleLogin = async () => {
    try {
        const user = await auth.signInWithEmailAndPassword(email, password);
        if (user) {
            navigation.replace("Home")
        }
    } catch (error) {
        console.log(error);
    }
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
    <KeyboardAvoidingView behavior="height" enabled style={styles.root}>
    <Image source = {logo} style = {[styles.logo, {height: height * 0.27}]} resizeMode="contain"/>
    <Text style = {styles.text}>Email</Text>
    <CustomInput
    placeholder = "Email"
    value = {email}
    setValue = {setEmail}
    />
    <Text style = {styles.text}>Password</Text>
    <CustomInput
    style = {styles.input}
    placeholder = "Password"
    value = {password}
    setValue = {setPassword}
    secureTextEntry = {true}
    />
    <View style={{flex: 0.3, flexDirection: 'row', justifyContent: 'center',
    alignItems: 'center',marginBottom:20}}>
    <View style={{flex: 1,flexDirection: 'row',alignItems:'center'}}>
    <Checkbox
          style={styles.checkbox}
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? Colors.text1 : undefined}
        />
        <TouchableOpacity onPress={() => setChecked(!isChecked)}>
        <Text style={{textAlign: 'left', marginLeft:5,fontFamily:"GilroyLight"}}>Remember Me</Text>
        </TouchableOpacity>
    </View>
    <View style={{flex: 1}}>
    <TouchableOpacity onPress={onForgotPasswordPressed}>
    <Text style={{textAlign: 'right',fontFamily:"GilroyLight"}}>Forgot Password?</Text>
    </TouchableOpacity>
    </View>
    </View>
    <CustomButton 
    text = "Login"
    onPress = {handleLogin}
    />

    <CustomButton 
    text = "Continue With Instagram"
    onPress = {onLogininstagramPressed}
    type = "tertiary"/>

    <CustomButton 
    text = "Continue As Guest"
    onPress = {onLoginGuestPressed}
    type = "secondary"/>




    <View style = {styles.footer}>
    <TouchableOpacity onPress={onSignupPressed}>
    <Text style = {{alignItems:'center'}}>Don't have an account? Signup</Text>
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
    marginBottom: 30,
  },

  text:{
    // marginRight: 500
    alignSelf: 'flex-start',
    fontFamily: "GilroyLight"
  },

  font1: {
    fontFamily: "GilroyLight"
  },

  font2: {
    fontFamily: "GilroyBold"
  },

  footer: {
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