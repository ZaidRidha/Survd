import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LogInScreen/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen/SignUpScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';

const Stack = createStackNavigator();
const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen 
        name = "Login" 
        component = {LoginScreen}/>
        <Stack.Screen 
        name = "Register" 
        component = {SignUpScreen} />
        <Stack.Screen 
          name = "Home"
          component = {HomeScreen}
          options = {{
            headerShown : true,
            title: 'Home',
         }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation