import React, {useState} from 'react';
import { Icon } from '@rneui/themed';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

const WIDTH = Dimensions.get('window').width;

const AppointmentCard = ({appointmentData}) => {
  const barberName = 'John Doe';
  const date = 'June 10, 2023';
  const time = '10:00 AM';

  const [isVisible, setIsVisible] = useState(true);


  const handleIconPress = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null; // Render null if isVisible is false
  }

  return (
    <View style={styles.container}>
      <View className = "flex flex-row items-centre justify-between">
      <Text style={styles.barberName}>{appointmentData.barberName}</Text>
      <Icon type="antdesign" name="close" color="black" size={18} onPress={handleIconPress} />
      </View>
      <View className = "flex flex-row items-centre justify-between">
      <Text style={styles.dateTime}>{appointmentData.date} at {appointmentData.time}</Text>
      </View>
    </View>
  );
};

export default AppointmentCard;

const styles = StyleSheet.create({


  container: {
    alignSelf:"center",
    width: WIDTH*0.9,
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