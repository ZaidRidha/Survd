import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Button, Icon } from '@rneui/themed';
import { signOut, onAuthStateChanged } from 'firebase/auth';

import { useNavigation } from '@react-navigation/native';

import LoginScreen from '../LogInScreen';
import { authentication } from '../../firebaseConfig';

const ProfileScreen = () => {
  const navigation = useNavigation();

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
      });
  };

  const navigateBusiness = () => {
    navigation.navigate('BusinessOnboarding');
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

          <Text
            style={styles.PoppinsMed}
            className="mt-5  text-xl">
            Account Settings
          </Text>
          <View className="flex flex-row mt-4 items-center justify-between">
            <Text
              style={styles.PoppinsReg}
              className="self-center text-base  ">
              Personal Information
            </Text>
            <Icon
              type="antdesign"
              name="right"
              color="black"
              size={24}
            />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: 'lightgray',
                alignSelf: 'center',
                justifyContent: 'center',
                marginTop: 5,
                marginBottom: 5,
              }}
            />
          </View>

          <View className="flex flex-row mt-4 items-center justify-between">
            <Text
              style={styles.PoppinsReg}
              className="self-center text-base  ">
              Payment Methods
            </Text>
            <Icon
              type="antdesign"
              name="right"
              color="black"
              size={24}
            />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: 'lightgray',
                alignSelf: 'center',
                justifyContent: 'center',
                marginTop: 5,
                marginBottom: 5,
              }}
            />
          </View>

          <View className="flex flex-row mt-4 items-center justify-between">
            <Text
              style={styles.PoppinsReg}
              className="self-center text-base  ">
              Notification Settings
            </Text>
            <Icon
              type="antdesign"
              name="right"
              color="black"
              size={24}
            />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: 'lightgray',
                alignSelf: 'center',
                justifyContent: 'center',
                marginTop: 5,
                marginBottom: 5,
              }}
            />
          </View>

          <View className="flex flex-row mt-4 items-center justify-between">
            <Text
              style={styles.PoppinsReg}
              className="self-center text-base  ">
              Privacy Settings
            </Text>
            <Icon
              type="antdesign"
              name="right"
              color="black"
              size={24}
            />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: 'lightgray',
                alignSelf: 'center',
                justifyContent: 'center',
                marginTop: 5,
                marginBottom: 5,
              }}
            />
          </View>

          <Text
            style={styles.PoppinsMed}
            className="mt-5  text-xl">
            Business
          </Text>
          <TouchableOpacity onPress={navigateBusiness}>
            <View className="flex flex-row mt-4 items-center justify-between">
              <Text
                style={styles.PoppinsReg}
                className="self-center text-base  ">
                My Business
              </Text>
              <Icon
                type="antdesign"
                name="right"
                color="black"
                size={24}
              />
            </View>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: 'lightgray',
                alignSelf: 'center',
                justifyContent: 'center',
                marginTop: 5,
                marginBottom: 5,
              }}
            />
          </View>

          <Text
            style={styles.PoppinsMed}
            className="mt-5 text-xl">
            Referral
          </Text>
          <View className="flex flex-row mt-4 items-center justify-between">
            <Text
              style={styles.PoppinsReg}
              className="self-center text-base  ">
              Refer a vendor/user
            </Text>
            <Icon
              type="antdesign"
              name="right"
              color="black"
              size={24}
            />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: 'lightgray',
                alignSelf: 'center',
                justifyContent: 'center',
                marginTop: 5,
                marginBottom: 5,
              }}
            />
          </View>

          <Text
            style={styles.PoppinsMed}
            className="mt-5  text-xl">
            Support
          </Text>

          <View className="flex flex-row mt-4 items-center justify-between">
            <Text
              style={styles.PoppinsReg}
              className="self-center text-base  ">
              How to use
            </Text>
            <Icon
              type="antdesign"
              name="right"
              color="black"
              size={24}
            />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: 'lightgray',
                alignSelf: 'center',
                justifyContent: 'center',
                marginTop: 5,
                marginBottom: 5,
              }}
            />
          </View>

          <View className="flex flex-row mt-4 items-center justify-between">
            <Text
              style={styles.PoppinsReg}
              className="self-center text-base ">
              Health & Safety
            </Text>
            <Icon
              type="antdesign"
              name="right"
              color="black"
              size={24}
            />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: 'lightgray',
                alignSelf: 'center',
                justifyContent: 'center',
                marginTop: 5,
                marginBottom: 5,
              }}
            />
          </View>

          <View className="flex flex-row mt-4 items-center justify-between">
            <Text
              style={styles.PoppinsReg}
              className="self-center text-base ">
              Get Help
            </Text>
            <Icon
              type="antdesign"
              name="right"
              color="black"
              size={24}
            />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: 'lightgray',
                alignSelf: 'center',
                justifyContent: 'center',
                marginTop: 5,
                marginBottom: 5,
              }}
            />
          </View>

          <View className="flex flex-row mt-4 items-center justify-between">
            <Text
              style={styles.PoppinsReg}
              className="self-center text-base ">
              Contact Us
            </Text>
            <Icon
              type="antdesign"
              name="right"
              color="black"
              size={24}
            />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: 'lightgray',
                alignSelf: 'center',
                justifyContent: 'center',
                marginTop: 5,
                marginBottom: 5,
              }}
            />
          </View>

          <Text
            style={styles.PoppinsMed}
            className="mt-5  text-xl">
            Legal
          </Text>

          <View className="flex flex-row mt-4 items-center justify-between">
            <Text
              style={styles.PoppinsReg}
              className="self-center text-base  ">
              Terms of service
            </Text>
            <Icon
              type="antdesign"
              name="right"
              color="black"
              size={24}
            />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: 'lightgray',
                alignSelf: 'center',
                justifyContent: 'center',
                marginTop: 5,
                marginBottom: 5,
              }}
            />
          </View>

          <View className="flex flex-row mt-4 items-center justify-between ">
            <Text
              style={styles.PoppinsReg}
              className="self-center text-base  ">
              Privacy Policy
            </Text>
            <Icon
              type="antdesign"
              name="right"
              color="black"
              size={24}
            />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: 'lightgray',
                alignSelf: 'center',
                justifyContent: 'center',
                marginTop: 5,
              }}
            />
          </View>

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

  PoppinsReg: {
    fontFamily: 'PoppinsReg',
  },

  PoppinsLight: {
    fontFamily: 'PoppinsLight',
  },

  PoppinsBold: {
    fontFamily: 'PoppinsBold',
  },

  PoppinsMed: {
    fontFamily: 'PoppinsMed',
  },
});

export default ProfileScreen;
