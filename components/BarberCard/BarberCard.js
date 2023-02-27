import { View, Text,StyleSheet,Image } from 'react-native'
import React from 'react'
import hairpic from '../../assets/images/hdfade.jpg'
import useFont from '../../useFont';
import { Icon } from '@rneui/themed';

const BarberCard = ({name}) => {
  useFont();
  return (
    <View style={styles.container} className = "mb-5">
      <View className = "flex flex-row items-center justify-between">
      <Text className = "text-2xl" style = {styles.figsemibold}>{name} </Text>
  
      </View>
 
      <View className = "flex flex-row items-center justify-between">
      <View className = "flex flex-row items-center">
      <View style={styles.circle}></View>
      <Text className = "text-xl" style = {styles.figlight}>Active Now </Text>
      </View>
      <View className = "flex flex-row items-center">
      <Icon type="entypo" name="shop" color="black" size={25} />
      <Text className = "text-2xl" style = {styles.figsemibold}>/</Text>
      <Icon type='font-awesome-5' name="car-alt" color="black" size={25} />
      </View>
      </View>
      <Image source={hairpic} style = {styles.image}></Image>
      <View className = "flex flex-row items-center justify-between">
      <Text className = "text-base" style = {styles.figlight}>££ · Fades · Afro · Caucasian</Text>
      <Text className = "text-base" style = {styles.figlight}>★5.0 (135)</Text>
      </View>
      <Text className = "text-sm" style = {styles.figlight}>Est. Waiting time: 32 Mins</Text>
      <Text className = "text-sm" style = {styles.figlight}>3.1mi</Text>
 
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
    marginLeft: 4,
    marginRight:4
  }
});

export default BarberCard;