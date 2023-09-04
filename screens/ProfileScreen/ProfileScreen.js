import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Button, Icon } from '@rneui/themed';
import { signOut, onAuthStateChanged } from 'firebase/auth';

import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import LoginScreen from '../LogInScreen';
import { authentication } from '../../firebaseConfig';
import ProfileSectionLink from './ProfileSectionLink';
import ProfileSectionHeader from './ProfileSectionHeader';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { currentUser } = authentication;

  useEffect(() => {
    onAuthStateChanged(authentication, (user) => {
      // firebase getting current user
      if (user) {
        console.log(user.uid);
        setIsSignedOut(false);
      }
    });
  }, []);

  const [isSignedOut, setIsSignedOut] = useState(true);

  const signuserOut = () => {
    signOut(authentication)
      .then(() => {
        // Sign-out successful.
        setIsSignedOut(true);
      })
      .catch((error) => {
        // An error happened.
        console.error(error);
      });
  };

  const navigateBusiness = () => {
    navigation.navigate('BusinessOnboarding');
  };

  const navigatePhoneVerification = () => {
    navigation.navigate('Phone');
  };

  return (
    <SafeAreaView style={styles.root}>
      {isSignedOut ? (
        <LoginScreen />
      ) : (
        <ScrollView style={styles.inner}>
          <View className="flex flex-row items-center">
            <Icon
              type="ant-design"
              name="user"
              color="black"
              size={38}
            />
            <Text
              style={styles.PoppinsMed}
              className="ml-2 text-3xl">
              Zaid Ridha
            </Text>
          </View>

          <ProfileSectionHeader text="Account Settings" />
          <ProfileSectionLink
            text={currentUser.phoneNumber ? 'Update your phone number' : 'Verify your phone number'}
            onPress={navigatePhoneVerification}
          />
          <ProfileSectionLink
            text="Personal information"
            onPress={() => {}}
          />
          <ProfileSectionLink
            text="Payment methods"
            onPress={() => {}}
          />
          <ProfileSectionLink
            text="Notification Settings"
            onPress={() => {}}
          />
          <ProfileSectionLink
            text="Privacy Settings"
            onPress={() => {}}
          />

          <ProfileSectionHeader text="Business" />
          <ProfileSectionLink
            text="My business"
            onPress={navigateBusiness}
          />
          <ProfileSectionHeader text="Referral" />
          <ProfileSectionLink
            text="Refer a vendor/user"
            onPress={() => {}}
          />

          <ProfileSectionHeader text="Support" />
          <ProfileSectionLink
            text="How to use"
            onPress={() => {}}
          />
          <ProfileSectionLink
            text="Health & Safety"
            onPress={() => {}}
          />
          <ProfileSectionLink
            text="Get Help"
            onPress={() => {}}
          />
          <ProfileSectionLink
            text="Contact us"
            onPress={() => {}}
          />

          <ProfileSectionHeader text="Legal" />
          <ProfileSectionLink
            text="Terms of service"
            onPress={() => {}}
          />
          <ProfileSectionLink
            text="Privacy Policy"
            onPress={() => {}}
          />

          <View style={{ marginBottom: 10, marginTop: 10 }}>
            <Button
              onPress={signuserOut}
              title="Log Out"
              buttonStyle={{
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: 'black',
                width: '100%',
                marginTop: 10,
                borderRadius: 5,
              }}
              titleStyle={{
                color: 'black',
                fontFamily: 'PoppinsMed',
              }}
            />
          </View>
        </ScrollView>
      )}
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
});

export default ProfileScreen;
