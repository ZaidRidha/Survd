import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Button, Icon } from '@rneui/themed';
import { onAuthStateChanged } from 'firebase/auth';

import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

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

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(authentication, (user) => {
      if (user) {
        const userRef = doc(database, 'users', user.uid);

        // Setting up the real-time listener for the user's name
        const unsubscribeSnapshot = onSnapshot(
          userRef,
          (docSnapshot) => {
            if (docSnapshot.exists()) {
              const userData = docSnapshot.data();
              const userName = userData.name;
              setName(userName);
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
    <SafeAreaView style={styles.root}>
      <ScrollView style={styles.inner}>
        <View className="self-start">
          <BackNavigation />
        </View>
        <Text
          style={styles.PoppinsMed}
          className=" text-2xl self-center">
          Personal Information
        </Text>

        <ProfileSectionHeader text="Details" />
        <ProfileSectionLink
          text="Name"
          onPress={() => {}} // You can provide the navigation logic here
        />
        <ProfileSectionLink
          text="Phone number"
          onPress={() => {}} // You can provide the navigation logic here
        />
        <ProfileSectionLink
          text="Password"
          onPress={() => {}} // You can provide the navigation logic here
        />
      </ScrollView>
    </SafeAreaView>
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
});

export default PersonalScreen;
