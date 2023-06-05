import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

const AppointmentsScreen = () => {
  const [upcomingPressed, setUpcomingPressed] = useState(true);
  const [completedPressed, setCompletedPressed] = useState(false);
  const [cancelledPressed, setCancelledPressed] = useState(false);

  const handleUpcomingPresssed = () => {
    setUpcomingPressed(true);
    setCompletedPressed(false);
    setCancelledPressed(false);
  };

  const handleCompletedPresssed = () => {
    setUpcomingPressed(false);
    setCompletedPressed(true);
    setCancelledPressed(false);
  };

  const handleCancelledPresssed = () => {
    setUpcomingPressed(false);
    setCompletedPressed(false);
    setCancelledPressed(true);
  };

  return (
    <SafeAreaView style={styles.root}>
      <View className="flex flex-row items-center justify-evenly">
        <TouchableOpacity onPress={handleUpcomingPresssed}>
          <Text style={[styles.PoppinsMed, upcomingPressed ? styles.underline : null]} className="text-lg">Upcoming</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCompletedPresssed}>
          <Text style={[styles.PoppinsMed, completedPressed ? styles.underline : null]} className="text-lg">Completed</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCancelledPresssed}>
          <Text style={[styles.PoppinsMed, cancelledPressed ? styles.underline : null]} className="text-lg">Cancelled</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AppointmentsScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
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
  underline: {
    textDecorationLine: 'underline',
  },
});
