import { View, Text,Button,TouchableOpacity,StyleSheet, Pressable} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { Header } from '@rneui/themed';
import { Icon } from '@rneui/themed';
import useFont from '../../useFont';
import { selectCurrentLoc } from '../../slices/locSlice';
import { useSelector } from 'react-redux';
const LocationScreen = () => {
    useFont();

    const navigation = useNavigation();

    const currentLoc = useSelector(selectCurrentLoc);
    console.log(currentLoc);
  return (
    <View style = {styles.root}>
    <Header
    backgroundColor='white'
    centerComponent={
        <Text className = "text-base" style = {styles.poppingReg}>Location</Text>
    }
      rightComponent={
        <Pressable onPress={() => navigation.goBack()}>
        <Icon type="octicon" name="x" color="black" size={26} />
        </Pressable>
      }
    />

    <Text></Text>
    </View>
  )
}

const styles = StyleSheet.create({
    root:{
        flex:1,
        backgroundColor: '#FFFFFF',
        padding:25,
      },

    poppingReg:{
        fontFamily: 'PoppinsMed',
    },
})

export default LocationScreen;