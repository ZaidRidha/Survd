import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
// import Icon from 'react-native-vector-icons/Ionicons';
import { Button, Icon } from "@rneui/themed";
import { collection, query, where, getDocs } from 'firebase/firestore';
import { database } from '../../firebaseConfig'; // Import your Firebase configuration
import { selectUserId } from 'slices/locSlice';

const [appointments, setAppointments] = useState(null);

// Define your individual screens for each tab
const HomeScreen = () => (
  <View style={styles.tabContent}>
    <Text style={styles.heading}>Thank you for registering your business. We are going through your information to confirm your details. While waiting for confirmation, you can edit your profile and settings.</Text>
    <Icon type="ionicon" name="mail-outline" />
    <Text style={styles.heading}>Welcome,</Text>
    <Text style={styles.heading}>Upcoming appointments</Text>
    <FlatList
        data={appointments}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>Barber Name: {item.barberName}</Text>
            <Text>Time: {item.time}</Text>
            <View style={{ borderBottomWidth: 1, borderBottomColor: 'gray', marginBottom: 10 }} />
          </View>
        )}
      />
  </View>
);

const getAppointmentsByUserID = async (userID) => {
  const appointmentsCollection = collection(database, 'appointments');

  // Create a query to get appointments based on userID
  const q = query(appointmentsCollection, where('userID', '==', userID));

  try {
    const querySnapshot = await getDocs(q);
    const appointments = [];

    querySnapshot.forEach((doc) => {
      // Access each appointment document and add it to the array
      appointments.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return appointments;
  } catch (error) {
    console.error('Error getting appointments:', error);
    return [];
  }
};


const userID = selectUserId()
const userAppointments = await getAppointmentsByUserID(userID);
setAppointments(userAppointments);


const Appointments = () => (
  
  <View style={styles.tabContent}>
    <Text>Time Screen</Text>
  </View>
);

const Earnings = () => (
  <View style={styles.tabContent}>
    <Text>Cash Screen</Text>
  </View>
);

const Client = () => (
  <View style={styles.tabContent}>
    <Text>People Screen</Text>
  </View>
);

const Profile = () => (
  <View style={styles.tabContent}>
    <Text>Person Screen</Text>
  </View>
);

// Map each screen to a unique key
const initialLayout = { width: Dimensions.get('window').width };

const renderScene = SceneMap({
  home: HomeScreen,
  time: Appointments,
  cash: Earnings,
  people: Client,
  person: Profile,
});

const renderTabBar = (props) => (
  <TabBar
    {...props}
    renderIcon={({ route, color }) => (
      <Icon type="ionicon" name={`${route.key}-outline`} />
    )}
    style={styles.tabBar}
    labelStyle={styles.tabLabel}
  />
);

const TabViewExample = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'home', title: 'Home' },
    { key: 'time', title: 'Time' },
    { key: 'cash', title: 'Cash' },
    { key: 'people', title: 'People' },
    { key: 'person', title: 'Person' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      tabBarPosition='bottom'
      renderTabBar={renderTabBar}
    />
  );
};

const styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    backgroundColor: '#ffffff',
  },
  tabLabel: {
    fontSize: 12,
  },
});

export default TabViewExample;
