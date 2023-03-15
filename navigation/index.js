import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LogInScreen/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen/SignUpScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen';
import PhoneScreen from '../screens/PhoneScreen/PhoneScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@rneui/base';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import { ScrollView } from 'react-native-gesture-handler';
import LocationScreen from '../screens/LocationScreen/LocationScreen';
import PressProfile from '../screens/PressProfile/PressProfile';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown:false}}>
      <Tab.Screen 
        name = "Home"
        component = {HomeScreen} 
        
        options={{
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
          unmountOnBlur: true,
          tabBarIcon: ({ focused }) => 
          focused ?
          <Icon
          name='home'
          size = {30}
          color = "black" />:
          <Icon
          name='home'
          size = {30}
          color = "gray" />
          
        }

      }

      />
      <Tab.Screen 
        name = "Explore"
        component = {ExploreScreen} 

        options={{
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
          tabBarIcon: ({ focused }) => 
          focused ?
          <Icon
          name='search'
          size = {30}
          color = "black" />:
          <Icon
          name='search'
          size = {30}
          color = "gray" />
          
        }
      }

        
      />

      <Tab.Screen 
        name = "Profile"
        component = {ProfileScreen} 
        options={{
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
          tabBarIcon: ({ focused }) => 
          focused ?
          <Icon
          name='person'
          size = {30}
          color = "black" />:
          <Icon
          name='person'
          size = {30}
          color = "gray" />
          
        }
      }

        
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
        component = {SignUpScreen}
        options={{ 
        headerShown: true,
        headerBackTitleVisible: false,
        headerTintColor: '#000000'}} />
        <Stack.Screen 
          name = "home"
          component = {BottomTabNavigator}
           />
        <Stack.Screen 
          name = "Phone"
          component = {PhoneScreen}
          options={{ 
            headerShown: true,
            headerTintColor: '#000000',
            headerLeft:null,
            title: "Verification"}}
          />
          <Stack.Screen
          options={{
            presentation: "modal",
            gestureEnabled: true,
          }}
          name = "Location"
          component={LocationScreen}
          />

          <Stack.Screen 
          name = "PressProfile"
          component = {PressProfile}
          options={{ 
            headerShown: true,
            headerBackTitleVisible: true,
            headerBackTitle: ' ',
            headerTitle: '',
            headerTintColor: '#000000',
          }}
          />

      </Stack.Navigator>
    </NavigationContainer>
  )
}



export default Navigation