import React, { useState, useEffect } from 'react';
import { Icon } from '@rneui/themed';
import { StyleSheet, Text, View, Dimensions, TouchableWithoutFeedback, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { updateDoc, doc } from 'firebase/firestore';
import { SCREENS } from 'navigation/navigationPaths';
import { database } from '../../firebaseConfig';

const WIDTH = Dimensions.get('window').width;

const AppointmentCard = ({ appointmentData, showHide, hideablePage, promptUser }) => {
  const barberName = 'John Doe';
  const date = 'June 10, 2023';
  const time = '10:00 AM';
  const navigation = useNavigation();
  const [hideCard, setHideCard] = useState(appointmentData.hidden);
  const { appointmentID } = appointmentData;
  const appointmentStatus = appointmentData.status;

  useEffect(() => {
    setHideCard(appointmentData.hidden); // Update hideCard state when appointmentData changes
  }, [appointmentData]);

  const handleIconPress = async () => {
    if (promptUser) {
      Alert.alert('Delete ', 'Are you sure you want to hide appointment?', [
        { text: 'No', onPress: () => {} },
        { text: 'Yes', onPress: hideAppointmentCard },
      ]);
    } else {
      hideAppointmentCard();
    }
  };

  const hideAppointmentCard = async () => {
    setHideCard(true);
    const appRef = doc(database, 'appointments', appointmentID);
    await updateDoc(appRef, {
      hidden: true,
    });
  };

  if (hideCard && hideablePage) {
    return null; // Render null if isVisible is false
  }

  const handleNavigate = () => {
    navigation.navigate(SCREENS.VIEW_APPOINTMENT, {
      appointmentData,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={handleNavigate}>
      <View style={styles.container}>
        <View className="flex flex-row  justify-between">
          <Text style={styles.barberName}>{appointmentData.barberName}</Text>
          {showHide ? (
            <Icon
              type="antdesign"
              name="close"
              color="black"
              size={18}
              onPress={handleIconPress}
            />
          ) : null}
        </View>
        <View className="flex flex-row items-centre justify-between">
          <Text style={styles.dateTime}>
            {appointmentData.date} at {appointmentData.time}
          </Text>
          <View>
            {appointmentStatus === 'completed' ? (
              <Icon
                type="material"
                name="verified"
                color="green"
                size={18}
              />
            ) : appointmentStatus === 'awaiting' ? (
              <Icon
                type="font-awesome"
                name="hourglass-1"
                color="darkblue"
                size={18}
              />
            ) : appointmentStatus === 'cancelled' ? (
              <Icon
                type="material"
                name="cancel"
                color="darkred"
                size={18}
              />
            ) : null}
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AppointmentCard;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: WIDTH * 0.9,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  barberName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dateTime: {
    fontSize: 16,
  },
});
