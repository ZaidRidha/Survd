import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Icon } from '@rneui/themed';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { SCREENS } from 'navigation/navigationPaths';
import { doc, onSnapshot } from 'firebase/firestore';
import { authentication, database } from '../../firebaseConfig';
import ProfileSectionLink from '../ProfileScreen/ProfileSectionLink';

const PersonalScreen = () => {
  const navigation = useNavigation();
  const { currentUser } = authentication;
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState(null);
  const [phoneVerified, setPhoneVerified] = useState(true); // default to true
  const [emailVerified, setEmailVerified] = useState(true); // default to true // Added this for the phone number

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

        // Setting up the real-time listener for the user's name, phone, email and their verification status
        const unsubscribeSnapshot = onSnapshot(
          userRef,
          (docSnapshot) => {
            if (docSnapshot.exists()) {
              const userData = docSnapshot.data();
              const userName = userData.name;
              const userPhone = userData.phoneNumber;
              const userEmail = userData.email;

              // Update the state with user's data
              setName(userName);
              setPhone(userPhone);
              setEmail(userEmail);

              // Extracting and setting the verification status for phone and email
              setPhoneVerified(userData.phoneVerified);
              setEmailVerified(userData.emailVerified);
            } else {
              // console.log('No such user document!');
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
                <View className="flex flex-row items-center">
                  {emailVerified ? null : (
                    <Icon
                      name="exclamation"
                      type="font-awesome-5"
                      color="darkred"
                      style={styles.Icon}
                      size={20}
                    />
                  )}

                  <Text
                    style={styles.PoppinsMed}
                    className="text-lg ">
                    Email
                  </Text>
                </View>
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
                <View className="flex flex-row items-center">
                  {phoneVerified ? null : (
                    <Icon
                      name="exclamation"
                      type="font-awesome-5"
                      color="darkred"
                      style={styles.Icon}
                      size={20}
                    />
                  )}

                  <Text
                    style={styles.PoppinsMed}
                    className="text-lg ">
                    Phone
                  </Text>
                </View>
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

          {(!phoneVerified || !emailVerified) && (
            <View style={{ padding: 10, backgroundColor: '#ffcccb', borderRadius: 5, marginVertical: 20 }}>
              <Text style={{ color: 'red', fontFamily: 'PoppinsMed' }}>
                Please verify your {!phoneVerified ? 'phone number' : ''}
                {!phoneVerified && !emailVerified ? ' and ' : ''}
                {!emailVerified ? 'email' : ''} to ensure full functionality.
              </Text>
            </View>
          )}
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
  Icon: {
    marginRight: 10,
  },
});

export default PersonalScreen;
