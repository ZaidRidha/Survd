import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import React, { useState } from 'react';

const initialLayout = { width: Dimensions.get('window').width };

const NotificationsScene = () => (
  <View style={styles.scene}>
    <Text>Notifications go here</Text>
  </View>
);

const MessagesScene = () => (
  <View style={styles.scene}>
    <Text>Messages go here</Text>
  </View>
);

const renderTabBar = (props) => (
  <TabBar
    {...props}
    renderLabel={({ route }) => <Text style={styles.tabBarLabel}>{route.title}</Text>}
    indicatorStyle={{ backgroundColor: 'black' }}
    style={{ backgroundColor: 'white' }}
  />
);

const NotificationsScreen = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'notifications', title: 'Notifications' },
    { key: 'messages', title: 'Messages' },
  ]);

  const renderScene = SceneMap({
    notifications: NotificationsScene,
    messages: MessagesScene,
  });

  return (
    <View style={styles.root}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={renderTabBar}
      />
    </View>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
  },
  scene: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  tabBarLabel: {
    fontSize: 16,
    color: 'black',
    fontWeight: '600',
  },
});
