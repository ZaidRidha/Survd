import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SCREENS } from 'navigation/navigationPaths';
import PressProfileHeaderRight from 'screens/PressProfile/PressProfileHeaderRight';
import LoginScreen from '../screens/LogInScreen/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen/SignUpScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen';
import PhoneScreen from '../screens/PhoneScreen/PhoneScreen';
import ContinueScreen from '../screens/ContinueScreen/ContinueScreen';
import ImageScreen from '../screens/ImageScreen/ImageScreen';
import PaymentScreen from '../screens/PaymentScreen/PaymentScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import LocationScreen from '../screens/LocationScreen/LocationScreen';
import PressProfile from '../screens/PressProfile/PressProfile';
import PressService from '../screens/PressService/PressService';
import SelectPaymentScreen from '../screens/SelectPaymentScreen/SelectPaymentScreen';
import ConfirmationScreen from '../screens/ConfirmationScreen/ConfirmationScreen';
import AppointmentsScreen from '../screens/AppointmentsScreen/AppointmentsScreen';
import ViewAppointment from '../screens/ViewAppointment/ViewAppointment';
import BusinessOnBoarding from '../screens/BusinessOnboarding/BusinessOnboarding';
import FullMapScreen from '../screens/FullMapScreen/FullMapScreen';
import FilterScreen from '../screens/FilterScreen/FilterScreen';
import NameScreen from 'screens/NameScreen/NameScreen';
import ResetPassword from 'screens/ResetPassword/ResetPassword';
import NotificationsScreen from '../screens/NotificationsScreen/NotificationsScreen';
import BackNavigation from '../components/BackNavigation/BackNavigation';
import PersonalScreen from 'screens/PersonalScreen/PersonalScreen';
import { database, authentication } from '../firebaseConfig';
import { getDoc, doc, onSnapshot } from 'firebase/firestore';
import EmailScreen from 'screens/EmailScreen/EmailScreen';
import {
  ACTIVE_COLOR,
  AppointmentsTabIcon,
  ExploreTabIcon,
  HomeTabIcon,
  INACTIVE_COLOR,
  ProfileTabIcon,
} from './navigationIcons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const HEIGHT = Dimensions.get('window').height;

const BottomTabNavigator = () => {
  const [profileBadge, setProfileBadge] = useState(false);
  useEffect(() => {
    const currentUser = authentication.currentUser;

    if (currentUser) {
      const userDocRef = doc(database, 'users', currentUser.uid);

      // Listen to document changes in real-time
      const unsubscribe = onSnapshot(userDocRef, (userDoc) => {
        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (!userData.phoneVerified || !userData.emailVerified) {
            // If either phone or email isn't verified, show the badge.

            setProfileBadge(true);
          } else {
            setProfileBadge(false);
          }
        }
      });

      // Detach the listener when the component is unmounted
      return () => unsubscribe();
    }
  }, [database, authentication]);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: HEIGHT * 0.1,
          backgroundColor: 'white',
          borderTopColor: 'white',
        },
      }}>
      <Tab.Screen
        name={SCREENS.HOME}
        component={TAB_SCREENS.home.component}
        options={{
          tabBarActiveTintColor: ACTIVE_COLOR,
          tabBarInactiveTintColor: INACTIVE_COLOR,
          unmountOnBlur: true,
          tabBarIcon: TAB_SCREENS.home.tabIcon,
        }}
      />

      <Tab.Screen
        name={SCREENS.EXPLORE}
        component={TAB_SCREENS.explore.component}
        options={{
          tabBarActiveTintColor: ACTIVE_COLOR,
          tabBarInactiveTintColor: INACTIVE_COLOR,
          tabBarIcon: TAB_SCREENS.explore.tabIcon,
        }}
      />

      <Tab.Screen
        name={SCREENS.APPOINTMENTS}
        component={TAB_SCREENS.appointments.component}
        options={{
          tabBarActiveTintColor: ACTIVE_COLOR,
          tabBarInactiveTintColor: INACTIVE_COLOR,
          tabBarIcon: TAB_SCREENS.appointments.tabIcon,
        }}
      />

      <Tab.Screen
        name={SCREENS.PROFILE}
        component={TAB_SCREENS.profile.component}
        options={{
          tabBarActiveTintColor: ACTIVE_COLOR,
          tabBarInactiveTintColor: INACTIVE_COLOR,
          tabBarIcon: TAB_SCREENS.profile.tabIcon,
          tabBarBadge: profileBadge ? '' : null,
        }}
      />
    </Tab.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name={SCREENS.HOME}
          component={BottomTabNavigator}
        />

        <Stack.Screen
          name={SCREENS.LOGIN}
          component={LoginScreen}
        />
        <Stack.Screen
          name={SCREENS.REGISTER}
          component={SignUpScreen}
          options={{
            headerShown: true,
            headerBackTitleVisible: false,
            headerTintColor: '#000000',
          }}
        />
        <Stack.Screen
          name={SCREENS.PHONE}
          component={PhoneScreen}
          options={{}}
        />
        <Stack.Screen
          name={SCREENS.LOCATION}
          component={LocationScreen}
          options={{
            headerShown: true,
            headerTransparent: true,
            headerBackTitleVisible: false,
            headerBackTitle: ' ',
            presentation: 'modal',
            gestureEnabled: true,
            headerTitle: ' ',
            headerTintColor: '#000000',
            headerLeft: null, // Remove the back button
          }}
        />

        <Stack.Screen
          name={SCREENS.PRESS_PROFILE}
          component={PressProfile}
          options={{
            headerShown: true,
            headerBackTitleVisible: true,
            headerBackTitle: ' ',
            headerTitle: ' ',
            headerTintColor: '#000000',
            headerStyle: {
              shadowOpacity: 0, // This will remove the border (shadow) in iOS
              elevation: 0, // This will remove the border (shadow) in Android
            },

            headerRight: PressProfileHeaderRight,
          }}
        />

        <Stack.Screen
          name={SCREENS.PRESS_SERVICE}
          component={PressService}
          options={{
            headerShown: false,
            headerBackTitleVisible: true,
            headerBackTitle: ' ',
            presentation: 'modal',
            headerTitle: '',
            headerTintColor: '#000000',
          }}
        />

        <Stack.Screen
          name={SCREENS.CONTINUE_SCREEN}
          component={ContinueScreen}
          options={{
            headerShown: true,
            headerBackTitleVisible: true,
            headerTransparent: true,
            headerBackTitle: ' ',
            headerTitle: ' ',
            headerTintColor: '#000000',
          }}
        />

        <Stack.Screen
          name={SCREENS.IMAGE_SCREEN}
          component={ImageScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={SCREENS.PAYMENT_SCREEN}
          component={PaymentScreen}
          options={{
            headerShown: true,
            headerTransparent: true,
            headerBackTitleVisible: true,
            headerBackTitle: ' ',
            headerTitle: '',
            headerTintColor: '#000000',
          }}
        />

        <Stack.Screen
          name={SCREENS.CONFIRMATION_SCREEN}
          component={ConfirmationScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name={SCREENS.VIEW_APPOINTMENT}
          component={ViewAppointment}
          options={{}}
        />

        <Stack.Screen
          name={SCREENS.SELECT_PAYMENT_SCREEN}
          component={SelectPaymentScreen}
          options={{
            presentation: 'modal',
          }}
        />

        <Stack.Screen
          name={SCREENS.FILTER_SCREEN}
          component={FilterScreen}
          options={{
            presentation: 'modal',
            headerShown: false,
          }}
        />

        <Stack.Screen
          name={SCREENS.BUSINESS_ONBOARDING}
          component={BusinessOnBoarding}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name={SCREENS.FULL_MAP_SCREEN}
          component={FullMapScreen}
          options={{}}
        />

        <Stack.Screen
          name={SCREENS.NAME_SCREEN}
          component={NameScreen}
          options={{}}
        />

        <Stack.Screen
          name={SCREENS.RESET_PASSWORD}
          component={ResetPassword}
        />

        <Stack.Screen
          name={SCREENS.EMAIL_SCREEN}
          component={EmailScreen}
        />

        <Stack.Screen
          name={SCREENS.PERSONAL_SCREEN}
          component={PersonalScreen}
          options={{
            headerShown: true,
            headerBackTitleVisible: true,
            headerTransparent: true,
            headerBackTitle: ' ',
            headerTitle: ' ',
            headerTintColor: '#000000',
          }}
        />

        <Stack.Screen
          name={SCREENS.NOTIFICATIONS_SCREEN}
          component={NotificationsScreen}
          options={{
            headerShown: true,
            headerBackTitleVisible: true,
            headerBackTitle: ' ',
            headerTitle: ' ',
            headerTintColor: '#000000',
            headerStyle: {
              shadowOpacity: 0, // This will remove the border (shadow) in iOS
              elevation: 0, // This will remove the border (shadow) in Android
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

const TAB_SCREENS = {
  home: {
    component: HomeScreen,
    tabIcon: HomeTabIcon,
  },
  explore: {
    component: ExploreScreen,
    tabIcon: ExploreTabIcon,
  },
  appointments: {
    component: AppointmentsScreen,
    tabIcon: AppointmentsTabIcon,
  },
  profile: {
    component: ProfileScreen,
    tabIcon: ProfileTabIcon,
  },
};
