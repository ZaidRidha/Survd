import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LogInScreen/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen/SignUpScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@rneui/base';
import { Title } from 'react-native-paper';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown:false}}>
      <Tab.Screen 
        name = "Home"
        component = {HomeScreen} 
        options={{
          tabBarIcon: ({ focused }) => <Icon
          name='home'
          size = {30} />  
        }
      }

      />
      <Tab.Screen 
        name = "Explore"
        component = {ExploreScreen} 
      />
    </Tab.Navigator>
  )
}

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
          name = "home"
          component = {BottomTabNavigator}
           />
      </Stack.Navigator>
    </NavigationContainer>
  )
}



export default Navigation