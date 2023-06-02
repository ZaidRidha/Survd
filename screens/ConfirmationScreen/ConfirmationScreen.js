import { StyleSheet, Text, View,Dimensions,SafeAreaView} from 'react-native'
import React from 'react'
import Lottie from 'lottie-react-native';
import { Icon, Button} from '@rneui/themed';
import { useNavigation,useRoute,CommonActions  } from '@react-navigation/native';


const WIDTH = Dimensions.get('window').width;

const ConfirmationScreen = () => {

    const navigation = useNavigation();
    const route = useRoute();

    const {selectedTimeslot,address,postCode,formattedDate,vendorName} = route.params;



    const handleButtonPressed = () => {
        navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'home' }],
            })
          );
      };
    
  return (
    <SafeAreaView style={styles.root}>
     <Text style = {styles.PoppinsMed} className = "text-2xl self-center">Appointment Confirmed</Text>
      <Lottie
        source={require('../../assets/animations/104297-completed-icon.json')}
        autoPlay
        loop={false} // Set loop prop to false
        style={styles.animation}
      />

    <Text style = {styles.PoppinsMed} className = "text-2xl mt-5 ml-2">Appointment Details:</Text>

    <View className="ml-2">
  <View className="flex flex-row items-center my-1">
  <Text style={styles.PoppinsMed} className="text-xl ml-1">For:</Text>
    <Text style={styles.PoppinsReg} className="text-xl ml-1">Tommy</Text>
  </View>
  <View className="flex flex-row items-center mt-1 mb-2">
  <Text style={styles.PoppinsMed} className="text-xl ml-1">By:</Text>
    <Text style={styles.PoppinsReg} className="text-xl ml-1">{vendorName}</Text>
  </View>
  <View className="flex flex-row items-center my-1">
    <Icon type="entypo" name="shop" color="black" size={28} />
    <Text style={styles.PoppinsReg} className="text-xl ml-1">Ismail's Barbershop</Text>
  </View>
  <View className="flex flex-row items-center my-1 flex flex-wrap">
    <Icon type="ionicon" name="location-sharp" color="black" size={28} />
    <Text style={styles.PoppinsReg} className="text-xl ml-1  ">{address},</Text>
    <Text style={styles.PoppinsReg} className="text-xl ml-1">{postCode}</Text>
  </View>
  <View className="flex flex-row items-center mt-1 mb-4">
    <Icon type="entypo" name="calendar" color="black" size={28} />
    <Text style={styles.PoppinsReg} className="text-xl ml-1">{formattedDate}, {selectedTimeslot}</Text>
  </View>
</View>

<Button
    onPress={handleButtonPressed}
    titleStyle={styles.PoppinsReg}
    title={`View Appointments`}
    color={'black'}
    containerStyle={{
      width: WIDTH - 100,
      marginTop:20,
      borderRadius:5,
      alignSelf: 'center',
      justifyContent: 'center',
    }}
    />   
    

    </SafeAreaView >
  )
}

export default ConfirmationScreen

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',

  },
  animation: {
    width: 250, // Adjust the width as needed
    height: 250, // Adjust the height as needed
    alignSelf:"center",
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