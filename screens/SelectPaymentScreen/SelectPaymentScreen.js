import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Icon, Button } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import PaymentSelector from '../../components/PaymentSelector/PaymentSelector';

const SelectPaymentScreen = () => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  const addPaymentMethod = () => {
    // Navigate to Add Payment Method screen or perform the desired action here
  };


  return (
    <View style={styles.root}>
      <View className = "self-start">
          <TouchableOpacity onPress = {goBack}>
          <Icon type="ant-design" name="close" color="black" size={36}  />
        </TouchableOpacity>
        </View>
        <Text style = {styles.poppinsMed} className= "text-xl mt-5 mb-5">Select Payment Method</Text>
        <PaymentSelector />
        <PaymentSelector />
        <PaymentSelector />
        <PaymentSelector />


        <TouchableOpacity style={styles.button} onPress={addPaymentMethod}>
          <Icon type="ant-design" name="plus" color="black" size={24} />
          <Text style={styles.buttonText}>Add Payment Method</Text>
        </TouchableOpacity>
        


    </View>
  )
}

export default SelectPaymentScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding:10,
    backgroundColor:"white",
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  title: {
    position: 'absolute', 
    left: 0, 
    right: 0, 
    textAlign: 'center', 
    fontSize: 22,
    fontFamily: "PoppinsMed",
  },

  poppinsMed:{
    fontFamily: "PoppinsMed",
  },

  poppinsReg:{
    fontFamily: "PoppinsReg",

  },

  buttonContainer: {
    

  },
  button: {
    backgroundColor: '#D1D1D1',
    width: '55%',
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginTop:20,
  
  },
  buttonText: {
    color: 'black',
    fontSize: 14,
    textAlign: 'center',
    marginLeft: 5, // add some margin between the icon and the text
    fontFamily: 'PoppinsMed',
  }

  
});
