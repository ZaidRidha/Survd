import { StyleSheet, Text, View,TouchableOpacity, } from 'react-native'
import React, {useState} from 'react'
import { Button, Icon } from '@rneui/base'
import { useNavigation } from '@react-navigation/native';
import useFont from '../../useFont';
import { CheckBox } from '@rneui/themed';

const PressService = () => {
  const navigation = useNavigation();
  useFont();
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style = {styles.root}>
      <View className = "self-start ml-1">
      <TouchableOpacity onPress={goBack}>
      <Icon type="ant-design" name="close" color="black" size={38} style ={styles.locationIcon} />
      </TouchableOpacity>
      </View>
      <View className= "ml-5 mt-4">
      <Text style = {styles.PoppinsMed} className  = "text-3xl">Skin Fade</Text>
      <Text style = {styles.PoppinsReg} className = "text-lg">£11.00</Text>
      <Text style = {[styles.PoppinsLight, { maxWidth: '95%' }]} numberOfLines={2} ellipsizeMode="tail" className = "text-sm text-gray-600 ">An incredible Skin Fade that is guranteed to leave every person very very very happy. </Text>
      </View>
      <View className= "ml-5 mt-1">
      <View style={{flexDirection: 'row', alignItems: 'center',marginTop:5,}}>
        <View style={{flex: 0.95, height: 1, backgroundColor: 'lightgray', alignSelf: "center", justifyContent: "center", marginTop:5, marginBottom:5 }} />   
        </View>
        <Text style = {styles.PoppinsMed} className  = "text-xl mt-1">Extras</Text>
        <View className = "flex flex-row justify-between">
        <View>
        <Text style = {styles.PoppinsMed} className  = "text-lg mt-1">Foil</Text>
        <Text style = {styles.PoppinsLight} className  = "text-base text-gray-600">£10.00</Text>
        </View>

        <CheckBox
              checkedIcon={
                <Icon
                  name="radio-button-checked"
                  type="material"
                  color="black"
                  size={25}
                  iconStyle={{ marginRight: 10 }}
                />
              }
              uncheckedIcon={
                <Icon
                  name="radio-button-unchecked"
                  type="material"
                  color="black"
                  size={25}
                  iconStyle={{ marginRight: 10 }}
                />
              }
      checked={check1}
      onPress={() => setCheck1(!check1)}
        />
              </View>

      </View>

      <View className= "ml-5 mt-1">
      <View style={{flexDirection: 'row', alignItems: 'center',marginTop:5,}}>
        <View style={{flex: 0.95, height: 1, backgroundColor: 'lightgray', alignSelf: "center", justifyContent: "center", marginTop:5, marginBottom:5 }} />   
        </View>
        <Text style = {styles.PoppinsMed} className  = "text-xl mt-1">After Hours</Text>
        <View className = "flex flex-row justify-between">
        <View>
        <Text style = {styles.PoppinsMed} className  = "text-lg mt-1">Night Time</Text>
        <Text style = {styles.PoppinsLight} className  = "text-sm text-gray-600">8PM-11PM</Text>
        <Text style = {styles.PoppinsLight} className  = "text-base text-gray-600">£25.00</Text>
        </View>

        <CheckBox
              checkedIcon={
                <Icon
                  name="radio-button-checked"
                  type="material"
                  color="black"
                  size={25}
                  iconStyle={{ marginRight: 10 }}
                />
              }
              uncheckedIcon={
                <Icon
                  name="radio-button-unchecked"
                  type="material"
                  color="black"
                  size={25}
                  iconStyle={{ marginRight: 10 }}
                />
              }
      checked={check2}
      onPress={() => setCheck2(!check2)}
        />
              </View>

      </View>

      

      <Button
        title="Add To Basket (£11.00)"
        buttonStyle={{ backgroundColor: 'rgba(39, 39, 39, 1)' }}
        containerStyle={{
        width: "80%",
        alignSelf:"center",
        position: 'absolute', bottom: 50, 
        }}
        titleStyle={{ fontFamily: "PoppinsReg", color: 'white', marginHorizontal: 20 }}
        />
    </View>
  )
}


const styles = StyleSheet.create({
  root:{
    backgroundColor: "white",
    flex:1
  },

  PoppinsReg:{
    fontFamily: "PoppinsReg"
  },

  PoppinsLight: {
    fontFamily: "PoppinsLight"
  },

  PoppinsMed:{
    fontFamily: "PoppinsMed"
  }
})

export default PressService