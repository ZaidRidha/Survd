import { View, Text,Button,TouchableOpacity,StyleSheet, Pressable,SafeAreaView} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { Header } from '@rneui/themed';
import { Icon } from '@rneui/themed';
import useFont from '../../useFont';
import { selectCurrentLoc, selectCurrentAddress } from '../../slices/locSlice';
import { useSelector } from 'react-redux';
const LocationScreen = () => {
    useFont();

    const navigation = useNavigation();

    const currentLoc = useSelector(selectCurrentLoc);
    const currentAddress = useSelector(selectCurrentAddress);
    console.log(currentAddress);
    console.log(currentLoc);
  return (
    <SafeAreaView style = {styles.root}>

    <Text></Text>
    </SafeAreaView>
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