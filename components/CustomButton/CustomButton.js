import { View, Text,StyleSheet,Pressable } from 'react-native'
import React from 'react'
import Colors from '../../assets/colors/colors'
import useFont from '../../useFont'
import { Icon } from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient';


const CustomButton = ({text,onPress,type,icon}) => {
  const fonstloaded = useFont();
  return (
    <Pressable onPress={onPress} style={[styles.container, styles[`container_${type}`]]}>
    <View style={styles.iconTextContainer}>
    {icon}
    <Text style={styles.text}>{text}</Text>
    </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    width:'100%',
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
    marginBottom:10,

  },

  container_secondary: {
    backgroundColor: Colors.secondary,
    borderRadius: 1,

  },

  container_tertiary: {
    backgroundColor: "#ed58d4",
    borderRadius: 1,
  },

  container_signup:{
    marginTop:15,

  },
  
  text:{
    color: Colors.background,
    fontFamily:"FigtreeBold"
  },

  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
},
})

export default CustomButton