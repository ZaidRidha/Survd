import {View, Image, useWindowDimensions, StyleSheet,Text, TouchableOpacity,KeyboardAvoidingView} from 'react-native'
import React, { useState,startTransition,useEffect } from 'react'
import { Button } from '@rneui/themed';
import logo from '../../assets/images/boxlogo.png'
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import useFont from '../../useFont'
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../../firebase'
import { Icon, Divider} from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient';



const LoginScreen = () => {

  useFont();
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
  const [isError, setIserror] = useState(false);



  const handleLogin = async () => {
    try {
        const user = await auth.signInWithEmailAndPassword(email, password);
        if (user) {
            navigation.replace("Home")
        }
    } catch (error) {
        console.log(error);
        setIserror(true);
        setTimeout(() => {
          setIserror(false);
      }, 1500);
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
    error = {isError}
    />
    <Text style = {styles.text}>Password</Text>
    <CustomInput
    style = {styles.input}
    placeholder = "Password"
    value = {password}
    setValue = {setPassword}
    secureTextEntry = {true}
    error = {isError}
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
  titleStyle={{ fontFamily: 'FigtreeBold', fontSize: 14,}}
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
    fontFamily: "FigtreeBold"
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
    fontFamily: "FigtreeBold",
    color: "red",
    alignItems:'center',
    marginBottom: 10,

  },

  forgottext:{
    fontFamily:"FigtreeLight",
    alignSelf: 'flex-start',
    marginTop: 5,
    marginBottom: 25,
  },

  icon: {
    marginRight: 5
  },

  btn: {
    width:'100%',
    borderRadius: 40,
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