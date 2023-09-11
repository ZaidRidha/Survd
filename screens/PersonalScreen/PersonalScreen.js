import { View, Text, StyleSheet, ScrollView, Touchable, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Button, Icon } from '@rneui/themed';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { SCREENS } from 'navigation/navigationPaths';
import { authentication, database } from '../../firebaseConfig';
import ProfileSectionLink from '../ProfileScreen/ProfileSectionLink';
import ProfileSectionHeader from '../ProfileScreen/ProfileSectionHeader';
import { getDoc, doc, onSnapshot } from 'firebase/firestore';
import BackNavigation from 'components/BackNavigation/BackNavigation';

const PersonalScreen = () => {
  const navigation = useNavigation();
  const { currentUser } = authentication;
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState(null); // Added this for the phone number

  const navigateName = () => {
    navigation.navigate(SCREENS.NAME_SCREEN, { showBack: true });
  };

  const navigateEmail = () => {
    navigation.navigate(SCREENS.EMAIL_SCREEN);
  };

  const navigatePhone = () => {
    navigation.navigate(SCREENS.PHONE, { showBack: true });
  };

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(authentication, (user) => {
      if (user) {
        const userRef = doc(database, 'users', user.uid);

        // Setting up the real-time listener for the user's name and phone
        const unsubscribeSnapshot = onSnapshot(
          userRef,
          (docSnapshot) => {
            if (docSnapshot.exists()) {
              const userData = docSnapshot.data();
              const userName = userData.name;
              const userPhone = userData.phoneNumber;
              const userEmail = userData.email; // Get the phone data from Firestore
              setName(userName);
              setPhone(userPhone); // Set the phone state
              setEmail(userEmail); // Set the email state
            } else {
              console.log('No such user document!');
            }
          },
          (error) => {
            console.error('Error fetching user data:', error);
          }
        );

        // Cleanup the snapshot listener when the component is unmounted
        return () => {
          unsubscribeSnapshot();
        };
      }
    });

    // Cleanup the auth state change listener when the component is unmounted
    return () => {
      unsubscribeAuth();
    };
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.root}>
        <ScrollView style={styles.inner}>
          <Text
            style={styles.PoppinsMed}
            className=" text-lg self-center">
            Personal Information
          </Text>
          <View className="mt-3">
            <View className="flex flex-row justify-between items-center my-2">
              <View>
                <Text
                  style={styles.PoppinsMed}
                  className="text-lg ">
                  Email
                </Text>
                <Text
                  style={styles.PoppinsMed}
                  className="text-base text-gray-500 ">
                  {email}
                </Text>
              </View>
              <TouchableOpacity onPress={navigateEmail}>
                <Text className="underline text-base">Edit</Text>
              </TouchableOpacity>
            </View>
            <View className="flex flex-row justify-between items-center my-2">
              <View>
                <Text
                  style={styles.PoppinsMed}
                  className="text-lg">
                  Name
                </Text>
                <Text
                  style={styles.PoppinsMed}
                  className="text-base text-gray-500 ">
                  {name}
                </Text>
              </View>
              <TouchableOpacity onPress={navigateName}>
                <Text className="underline text-base">Edit</Text>
              </TouchableOpacity>
            </View>
            <View className="flex flex-row justify-between items-center my-2">
              <View>
                <Text
                  style={styles.PoppinsMed}
                  className="text-lg ">
                  Phone Number
                </Text>
                <Text
                  style={styles.PoppinsMed}
                  className="text-base text-gray-500 ">
                  {phone}
                </Text>
              </View>
              <TouchableOpacity onPress={navigatePhone}>
                <Text className="underline text-base">Edit</Text>
              </TouchableOpacity>
            </View>
          </View>

          <ProfileSectionLink
            text="Password"
            onPress={() => navigation.navigate(SCREENS.RESET_PASSWORD)}
          />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
  },

  inner: {
    padding: 10,
  },

  PoppinsMed: {
    fontFamily: 'PoppinsMed',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  title: {
    flex: 1,
    textAlign: 'center',
  },
});

export default PersonalScreen;
