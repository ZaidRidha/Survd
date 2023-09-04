import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from '@rneui/themed';

/**
 *
 * @param {{
 * onPress: () => void;
 * text: string;
 * }}
 * @author Ricardo Mejias
 */
const ProfileSectionLink = ({ onPress, text }) => {
  return (
    <>
      <TouchableOpacity onPress={onPress}>
        <View className="flex flex-row mt-4 items-center justify-between">
          <Text
            style={styles.PoppinsReg}
            className="self-center text-base  ">
            {text}
          </Text>
          <Icon
            type="antdesign"
            name="right"
            color="black"
            size={24}
          />
        </View>
      </TouchableOpacity>
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
      </View>
    </>
  );
};

export default ProfileSectionLink;

const styles = StyleSheet.create({
  PoppinsReg: {
    fontFamily: 'PoppinsReg',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: 'lightgray',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
});
