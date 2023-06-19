import React, {useState} from 'react';
import { Icon } from '@rneui/themed';
import { StyleSheet, Text, View, Dimensions,TouchableWithoutFeedback,Alert} from 'react-native';
import { useNavigation,useRoute  } from '@react-navigation/native';
import { database } from '../../firebaseConfig';
import { collection, addDoc, setDoc,updateDoc,doc} from "firebase/firestore"; 


const WIDTH = Dimensions.get('window').width;

const AppointmentCard = ({appointmentData,showHide,hideablePage,promptUser}) => {
  const barberName = 'John Doe';
  const date = 'June 10, 2023';
  const time = '10:00 AM';
  const navigation = useNavigation();
  const [hideCard, setHideCard] = useState(appointmentData.hidden);
  const appointmentID = appointmentData.appointmentID;



  const handleIconPress = async () => {
    if (promptUser) {
      Alert.alert(
        'Delete ',
        'Are you sure you want to hide appointment?',
        [
          { text: 'No', onPress: () => {} },
          { text: 'Yes', onPress: hideAppointmentCard },

        ]
      );
    } else {
      hideAppointmentCard();
    }
  };

  const hideAppointmentCard = async () => {
    setHideCard(true);
    const appRef = doc(database, 'appointments', appointmentID);
    await updateDoc(appRef, {
      hidden: true
    });
  };

  if (hideCard && hideablePage) {
    return null; // Render null if isVisible is false
  }


  const handleNavigate = () =>{

    navigation.navigate('ViewAppointment', {
      barberName: appointmentData.barberName,
      date: appointmentData.date,
      duration: appointmentData.duration,
      price: appointmentData.price,
      time: appointmentData.time,
      basket: appointmentData.Basket,
      timeDate: appointmentData.timeDate,
      postcode: appointmentData.postCode,
      address: appointmentData.address,

    });

  }

  return (
    <TouchableWithoutFeedback onPress={handleNavigate}>
    <View style={styles.container}>
      <View className = "flex flex-row items-centre justify-between">
      <Text style={styles.barberName}>{appointmentData.barberName}</Text>
      {showHide? <Icon type="antdesign" name="close" color="black" size={18} onPress={handleIconPress} />: null}
      </View>
      <View className = "flex flex-row items-centre justify-between">
      <Text style={styles.dateTime}>{appointmentData.date} at {appointmentData.time}</Text>
      </View>
    </View>
    </TouchableWithoutFeedback>
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