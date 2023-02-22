import { View, Text,} from 'react-native'
import React from 'react'
import { Button } from '@rneui/themed';
import { authentication } from '../../firebaseConfig';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
    const navigation = useNavigation();
    const signuserOut = () => {
        signOut(authentication).then(() => {
          // Sign-out successful.
          navigation.replace('Login');
        }).catch((error) => {
          // An error happened.
        });
      }
  return (
    <View>
      <Text>ProfileScreen</Text>
      <Button onPress={signuserOut}>Sign out</Button>
    </View>
  )
}

export default ProfileScreen