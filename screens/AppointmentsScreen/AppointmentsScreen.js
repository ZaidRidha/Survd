import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, Dimensions, Text, ScrollView } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { query, collection, where, onSnapshot } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import AppointmentCard from '../../components/AppointmentCard/AppointmentCard';
import { database } from '../../firebaseConfig';

const initialLayout = { width: Dimensions.get('window').width };

const UpcomingScreen = ({ appointments }) => (
  <ScrollView style={styles.scene}>
    {appointments.length > 0
      ? appointments.map((appointment, index) => (
          <View
            key={index}
            className="mt-3">
            <AppointmentCard
              appointmentData={appointment}
              showHide={false}
              promptUser={false}
              hideablePage={false}
            />
          </View>
        ))
      : null}
  </ScrollView>
);

const CompletedScreen = ({ appointments }) => (
  <ScrollView style={styles.scene}>
    {appointments.length > 0
      ? appointments.map((appointment, index) => (
          <View
            key={index}
            className="mt-3">
            <AppointmentCard
              appointmentData={appointment}
              showHide={false}
              promptUser={false}
              hideablePage={false}
            />
          </View>
        ))
      : null}
  </ScrollView>
);

const CancelledScreen = ({ appointments }) => (
  <ScrollView style={styles.scene}>
    {appointments.length > 0
      ? appointments.map((appointment, index) => (
          <View
            key={index}
            className="mt-3">
            <AppointmentCard
              appointmentData={appointment}
              showHide={false}
              promptUser={false}
              hideablePage={false}
            />
          </View>
        ))
      : null}
  </ScrollView>
);

const AppointmentsScreen = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'upcoming', title: 'Upcoming' },
    { key: 'completed', title: 'Completed' },
    { key: 'cancelled', title: 'Cancelled' },
  ]);
  const [uid, setUid] = useState(null); // Add the state for storing uid
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [completedAppointments, setCompletedAppointments] = useState([]);
  const [cancelledAppointments, setCancelledAppointments] = useState([]);

  const auth = getAuth();

  const navigation = useNavigation();

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
          const { status } = appointmentData;

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

  const renderScene = SceneMap({
    upcoming: () => <UpcomingScreen appointments={upcomingAppointments} />,
    completed: () => <CompletedScreen appointments={completedAppointments} />,
    cancelled: () => <CancelledScreen appointments={cancelledAppointments} />,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      renderLabel={({ route }) => <Text style={styles.tabBarLabel}>{route.title}</Text>}
      indicatorStyle={{ backgroundColor: 'black' }}
      style={{ backgroundColor: 'white' }}
    />
  );

  return (
    <SafeAreaView style={styles.root}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={renderTabBar}
      />
    </SafeAreaView>
  );
};

export default AppointmentsScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
  },
  scene: {
    flex: 1,
  },
  tabBarLabel: {
    fontSize: 16,
    color: 'black',
    fontWeight: '600',
  },
});
