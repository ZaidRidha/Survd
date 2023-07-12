import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import AppointmentCard from '../../components/AppointmentCard/AppointmentCard';
import React, { useState,useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc,getDocs,query,collection,where,onSnapshot} from "firebase/firestore"; 
import { database } from '../../firebaseConfig';

const AppointmentsScreen = () => {
  const [upcomingPressed, setUpcomingPressed] = useState(true);
  const [completedPressed, setCompletedPressed] = useState(false);
  const [cancelledPressed, setCancelledPressed] = useState(false);
  const [uid, setUid] = useState(null); // Add the state for storing uid
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [completedAppointments, setCompletedAppointments] = useState([]);
  const [cancelledAppointments, setCancelledAppointments] = useState([]);

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
    const fetchAppointments = () => {
      const appointmentsRef = collection(database, 'appointments');
      const q = query(appointmentsRef, where('userID', '==', uid));
  
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const upcomingAppointments = [];
        const completedAppointments = [];
        const cancelledAppointments = [];
  
        querySnapshot.forEach((doc) => {
          const appointmentData = doc.data();
          const status  = appointmentData.status;
    
  
          if (status === 'awaiting' || status === 'confirmed') {
            upcomingAppointments.push(appointmentData);
          } else if (status === 'completed') {
            completedAppointments.push(appointmentData);
          } else if (status === 'cancelled') {
            cancelledAppointments.push(appointmentData);
          }
        });
  
        // Update state with the three arrays
        setUpcomingAppointments(upcomingAppointments);
        setCompletedAppointments(completedAppointments);
        setCancelledAppointments(cancelledAppointments);
      });
  
      return unsubscribe; // Cleanup function to unsubscribe from the snapshot listener
    };
  
    const unsubscribe = fetchAppointments();
  
    return () => {
      unsubscribe(); // Unsubscribe when the component is unmounted
    };
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
  
      {upcomingPressed && upcomingAppointments.length > 0 ? (
        upcomingAppointments.map((appointment, index) => (
          <View key={index} className="mt-3">
            <AppointmentCard appointmentData={appointment} showHide={false} promptUser={false} hideablePage={false} />
          </View>
        ))
      ) : null}
  
      {completedPressed && completedAppointments.length > 0 ? (
        completedAppointments.map((appointment, index) => (
          <View key={index} className="mt-3">
            <AppointmentCard appointmentData={appointment} showHide={false} promptUser={false} hideablePage={false} />
          </View>
        ))
      ) : null}
  
      {cancelledPressed && cancelledAppointments.length > 0 ? (
        cancelledAppointments.map((appointment, index) => (
          <View key={index} className="mt-3">
            <AppointmentCard appointmentData={appointment} showHide={false} promptUser={false} hideablePage={false} />
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
