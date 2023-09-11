import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView,SafeAreaProvider } from 'react-native-safe-area-context';
import { authentication, database } from '../../firebaseConfig';
import ProfileSectionLink from '../ProfileScreen/ProfileSectionLink';
import ProfileSectionHeader from '../ProfileScreen/ProfileSectionHeader';
import { getDoc, doc, onSnapshot } from 'firebase/firestore';
import BackNavigation from 'components/BackNavigation/BackNavigation';
import { Button, Icon } from '@rneui/themed';

import { SCREENS } from 'navigation/navigationPaths';

const NameSettings = () => {
  const navigation = useNavigation();
  const { currentUser } = authentication;
  const [name, setName] = useState(null);

  const navigateNameChange = () => {
    navigation.navigate(SCREENS.NAME_SCREEN, { showBack: true });
  };

  const goBack = () => {
    navigation.goBack();
  };

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
    <SafeAreaProvider>
    <SafeAreaView style={styles.root}>
      <View className="self-start">
      <BackNavigation />
      </View>
      <ScrollView style={styles.inner}>
        <Text style={styles.PoppinsMed} className='text-xl my-2'>Current Name: {name}</Text>
        <ProfileSectionHeader text="Actions" />
        <ProfileSectionLink
          text="Update your current name"
          onPress={navigateNameChange}
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
});

export default NameSettings;
