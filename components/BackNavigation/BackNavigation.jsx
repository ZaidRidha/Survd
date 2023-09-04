import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { Icon } from '@rneui/themed';

const BackNavigation = () => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity onPress={goBack}>
      <Icon
        type="entypo"
        name="chevron-left"
        color="black"
        size={38}
      />
    </TouchableOpacity>
  );
};

export default BackNavigation;
