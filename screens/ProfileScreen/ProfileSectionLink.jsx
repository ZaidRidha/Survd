import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from '@rneui/themed';

/**
 *
 * @param {{
 * onPress: () => void;
 * text: string;
 * isWarning?: boolean;  // Add this line
 * }}
 * @author Ricardo Mejias
 */
const ProfileSectionLink = ({ onPress, text, isWarning }) => {
  return (
    <>
      <TouchableOpacity onPress={onPress}>
        <View className="flex flex-row mt-4 items-center justify-between">
          <View className="flex flex-row items-center">
            {isWarning && (
              <Icon
                name="exclamation"
                type="font-awesome-5"
                color="darkred"
                style={styles.Icon}
              />
            )}
            <Text
              style={[styles.PoppinsReg]}
              className="self-center text-base">
              {text}
            </Text>
          </View>
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

  Icon: {
    marginRight: 10,
  },
});
