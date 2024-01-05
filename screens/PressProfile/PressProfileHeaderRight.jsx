import { Icon } from '@rneui/base';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const PressProfileHeaderRight = () => {
  return (
    <View className="flex flex-row items-center">
      <Icon
        style={styles.icon}
        type="octiicon"
        name="report"
        size={35}
        color="black"
      />

      <Icon
        style={styles.icon}
        type="material-community"
        name="message-outline"
        size={32}
        color="black"
      />
    </View>
  );
};

export default PressProfileHeaderRight;

const styles = StyleSheet.create({
  icon: {
    marginRight: 5,
  },
});
