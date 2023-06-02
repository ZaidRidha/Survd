import { StyleSheet, Text, View,SafeAreaView} from 'react-native'
import React from 'react'

const AppointmentsScreen = () => {
  return (
    <SafeAreaView style = {styles.root}>
      <View className = "flex flex-row items-center justify-evenly">
      <Text style = {styles.PoppinsMed} className = "text-lg">Upcoming</Text>
      <Text style = {styles.PoppinsMed} className = "text-lg">Completed</Text>
      <Text style = {styles.PoppinsMed} className = "text-lg">Cancelled</Text>
      </View>
    </SafeAreaView>
  )
}

export default AppointmentsScreen

const styles = StyleSheet.create({
  root: {
    flex:1,
    backgroundColor:"white",
  },
  PoppinsReg: {
    fontFamily: 'PoppinsReg',
  },

  PoppinsLight:{
    fontFamily: 'PoppinsLight',
  },

  PoppinsBold:{
    fontFamily: 'PoppinsBold',
  },

  PoppinsMed: {
    fontFamily: 'PoppinsMed',
  },
})