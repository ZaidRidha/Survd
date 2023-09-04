import React from 'react';
import { StyleSheet, Text } from 'react-native';

/**
 *
 * @param {{
 * title: string;
 * }}
 * @author Ricardo Mejias
 */
const ProfileSectionHeader = ({ text }) => {
  return (
    <Text
      style={styles.PoppinsMed}
      className="mt-5  text-xl">
      {text}
    </Text>
  );
};

export default ProfileSectionHeader;

const styles = StyleSheet.create({
  PoppinsMed: {
    fontFamily: 'PoppinsMed',
  },
});
