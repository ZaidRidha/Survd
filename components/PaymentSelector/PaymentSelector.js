import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Icon, CheckBox } from '@rneui/themed';

const PaymentSelector = () => {
  const [checked, setChecked] = useState(false);

  return (
    <View>
      <View className="flex flex-row my-3 items-center justify-between">
        <View className="flex flex-row items-center">
          <Icon
            type="font-awesome"
            name="cc-visa"
            color="#000F9E"
            size={28}
          />
          <Text
            style={styles.poppinsReg}
            className="self-center text-sm ml-4 ">
            ●●●● 4003
          </Text>
        </View>
        <CheckBox
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={checked}
          onPress={() => setChecked(!checked)}
          checkedColor="black"
          uncheckedColor="black"
        />
      </View>
    </View>
  );
};

export default PaymentSelector;

const styles = StyleSheet.create({});
