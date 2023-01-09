import {View, Image, useWindowDimensions, StyleSheet,Text, TouchableOpacity,KeyboardAvoidingView} from 'react-native'
import React, { useState,startTransition } from 'react'
import logo from '../../assets/images/boxlogo.png'
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import Checkbox from 'expo-checkbox';
import Colors from '../../assets/colors/colors'
import useFont from '../../useFont'
import { useNavigation } from '@react-navigation/native';


const LoginScreen = () => {
  const fontsloaded = useFont();
 

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {height} = useWindowDimensions();
  const navigation = useNavigation();
  const [isChecked, setChecked] = useState(false);



  const onLoginPressed = () => {
    console.warn("Login");
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
    <Image source = {logo} style = {[styles.logo, {height: height * 0.3}]} resizeMode="contain"/>
    <Text style = {styles.text}>Email/Username</Text>
    <CustomInput
    placeholder = "Email/Username"
    value = {username}
    setValue = {setUsername}
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
    onPress = {onLoginPressed}
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
    marginBottom: 40,
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