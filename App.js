import { StatusBar } from 'expo-status-bar';
import { requireNativeComponent, StyleSheet, Text, SafeAreaView,TouchableWithoutFeedback, Keyboard,KeyboardAvoidingView,View,} from 'react-native';
import { useFonts } from 'expo-font';


import colors from './assets/colors/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import LoginScreen from './screens/LogInScreen/LoginScreen';
import SignUpScreen from './screens/SignUpScreen/SignUpScreen';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import Navigation from './navigation/index';
import { store } from './store.js';
import { Provider } from 'react-redux';
import AnimatedSplash from "react-native-animated-splash-screen";
import React, { useState,useEffect } from 'react';

export default function App() {

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
   }, 1500);
  }, []);

  const styles = StyleSheet.create({
    root:{
      flex:1,
    }
  
  });

  return ( 
  <AnimatedSplash
    translucent={true}
    isLoaded={isLoaded}
    logoImage={require("./assets/images/APPLOGOHD.png")}
    backgroundColor={"white"}
    logoHeight={300}
    logoWidth={300}> 
  <Provider store={store}>
  <View style = {styles.root}>
    <Navigation/>
  </View>
  </Provider>
  </AnimatedSplash>
  );




  
}










