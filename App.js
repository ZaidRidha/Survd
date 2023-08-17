import { StatusBar } from 'expo-status-bar';
import { requireNativeComponent, StyleSheet, Text, SafeAreaView,TouchableWithoutFeedback, Keyboard,KeyboardAvoidingView,View,LogBox} from 'react-native';
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
import { RootSiblingParent } from 'react-native-root-siblings';

export default function App() {

  const [isLoaded, setIsLoaded] = useState(false);
  //LogBox.ignoreAllLogs(true);


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
    logoImage={require("./assets/images/UpdatedLogo.jpg")}
    backgroundColor={"white"}
    logoHeight={300}
    logoWidth={300}> 
  <Provider store={store}>
  <RootSiblingParent>
  <View style = {styles.root}>
    <Navigation/>
  </View>
  </RootSiblingParent>
  </Provider>
  </AnimatedSplash>
  );




  
}










