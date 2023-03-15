import { View, Text, ScrollView, TouchableOpacity, Keyboard, Image, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import useFont from '../../useFont';

const PressProfile = () => {
  useFont();

  const [infoPressed, setInfoPressed] = useState(false);
  const [servicesPressed, setServicesPressed] = useState(false);
infoPressed
  const handleInfoPress = () => {
    setInfoPressed(!infoPressed);
  };

  const handleServicesPress = () => {
    setServicesPressed(!servicesPressed);
  };


  return (
    <ScrollView style={styles.root}>
      <Image source={require('../../assets/images/bizlogo.jpg')} style={styles.image} />

      <View style={styles.clickers}>
        <TouchableOpacity onPress={handleInfoPress}>
          <Text
          className = "text-xl mx-5"
            style={[
              styles.PoppinsMed,
              infoPressed ? styles.underline : null,
              { marginHorizontal: 10 },
            ]}
          >
            Info
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleServicesPress}>
          <Text
          className = "text-xl mx-5"
            style={[
              styles.PoppinsMed,
              servicesPressed ? styles.underline : null,
              { marginHorizontal: 10 },
            ]}
          >
            Services
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'white',
  },

  image: {
    aspectRatio: 1,
    width: '80%',
    height: '80%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
  },

  clickers: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  PoppinsReg: {
    fontFamily: 'PoppinsReg',
  },

  PoppinsMed: {
    fontFamily: 'PoppinsMed',
  },

  underline: {
    textDecorationLine: 'underline',
  },
});

export default PressProfile;
