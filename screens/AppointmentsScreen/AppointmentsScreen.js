import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import AppointmentCard from '../../components/AppointmentCard/AppointmentCard';
import React, { useState,useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc,getDocs,query,collection,where} from "firebase/firestore"; 
import { database } from '../../firebaseConfig';

const AppointmentsScreen = () => {
  const [upcomingPressed, setUpcomingPressed] = useState(true);
  const [completedPressed, setCompletedPressed] = useState(false);
  const [cancelledPressed, setCancelledPressed] = useState(false);
  const [uid, setUid] = useState(null); // Add the state for storing uid
  const [matchingAppointments, setMatchingAppointments] = useState([]);
  const auth = getAuth();
  

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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      } else {
        setUid(null);
      }
    });

    return () => unsubscribe(); // Cleanup the event listener on unmount
  }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      const appointmentsRef = collection(database, 'appointments');
      const q = query(appointmentsRef, where('userID', '==', uid));

      const querySnapshot = await getDocs(q);

      const appointments = [];
      querySnapshot.forEach((doc) => {
        const appointmentData = doc.data();
        // Process the appointment data if needed
        appointments.push(appointmentData);
      });

      setMatchingAppointments(appointments);
    };

    fetchAppointments();
  }, [uid]);



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
          {upcomingPressed ? (
      matchingAppointments.map((appointment, index) => (
        <View className = "mt-3">
        <AppointmentCard key={index} appointmentData={appointment} showHide={false} promptUser={false} hideablePage={false}/>
        </View>
      ))
) : null}
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
