import { View, Text,StyleSheet,Image } from 'react-native'
import React from 'react'
import hairpic from '../../assets/images/hdfade.jpg'
import useFont from '../../useFont';

const BarberCard = ({name}) => {
  useFont();
  return (
    <View style={styles.container} className = "mb-5">
      <Text className = "text-2xl" style = {styles.figsemibold}>{name} </Text>
      <View className = "flex flex-row">
      <Text className = "text-xl" style = {styles.figlight}>Active Now </Text>
      </View>
      <View style = {styles.headercontainer} className = "flex flex-row">

      </View>
      <Image source={hairpic} style = {styles.image}></Image>

    </View>
  );
};

const styles = StyleSheet.create({
  
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
  },

  image: {
    aspectRatio: 1,
    borderRadius: 10,
    flex:0.5,
    width: '100%',
    height: '100%'

    
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },

  headercontainer:{
    flexDirection:'row',
    justifyContent:'space-between'
  },

  figsemibold:{
    fontFamily:"FigtreeBold"
  },
  figlight:{
    fontFamily:"FigtreeLight"
  },

  circle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'green',
    marginLeft: 4
  }
});

export default BarberCard;