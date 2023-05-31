import { StyleSheet, Text, View,SafeAreaView,TouchableOpacity,Linking, ScrollView,Dimensions} from 'react-native'
import React from 'react'
import { useNavigation,useRoute,CommonActions  } from '@react-navigation/native';
import { useSelector,useDispatch } from 'react-redux';
import { selectCurrentLoc,selectCurrentBasket,removeFromBasket,} from '../../slices/locSlice';
import { Icon, Button} from '@rneui/themed';
import * as Clipboard from 'expo-clipboard';
import Toast from 'react-native-root-toast';
import moment from 'moment';

const PaymentScreen = () => {
  const WIDTH = Dimensions.get('window').width;
  const route = useRoute();
  const {selectedTimeslot,address,postCode,selectedDate,vendorName} = route.params;
  const navigation = useNavigation();
  const Basket = useSelector(selectCurrentBasket);
  const dispatch = useDispatch();
  const formattedDate = moment(selectedDate).format('D MMMM YYYY');

  

  const handlePressPay = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{
          name: 'ConfirmationScreen',
          params: {
            address: address,
            postCode: postCode,
            formattedDate: formattedDate,
            selectedTimeslot: selectedTimeslot,
            vendorName: vendorName,
          },
        }],
      })
    );
  }
  


  const handleGetDirections = () => {
    const mapsUrl = `http://maps.google.com/maps?q=${address} ${postCode}`;
    Linking.openURL(mapsUrl);
  };



  const handleLocationPress = async () => {
    const copytext = address.toString();
    await Clipboard.setStringAsync(copytext);
    Toast.show('Location copied to clipboard', {
      duration: Toast.durations.SHORT
    });
  };




  return (
    <SafeAreaView style = {styles.root}>
      
      <Text style = {styles.poppinsReg} className = "self-center text-xl mt-2">{vendorName}</Text>
      <View className = "mt-2"style={{flexDirection: 'row', alignItems: 'center',justifyContent:"center"}}>
      <View style={{flex: 0.95, height: 1, backgroundColor: '#F4F4F4', alignSelf: "center", justifyContent: "center", }} />   
      </View>

      <Text  style = {styles.poppinsReg} className = "text-2xl mt-1 mb-3"> Just to confirm..</Text>

      <ScrollView showsVerticalScrollIndicator = {false} className = "ml-2">
      <TouchableOpacity onPress={handleLocationPress}>
      <View className = "flex flex-row items-center  mb-1">
      <Icon type="entypo" name="shop" color="#006400" size={22} />
      <Text  style = {styles.poppinsReg} className = "text-lg"> Ismail's Barbershop</Text>
      </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleGetDirections}>
      <View className = "flex flex-row items-center mb-1">
      <Icon type="ionicon" name="location-sharp" color="black" size={22} />
      <Text  style = {styles.poppinsReg} className = "text-lg"> {address},</Text>
      <Text  style = {styles.poppinsReg} className = "text-lg"> {postCode}</Text>
      </View>
      </TouchableOpacity>


      <View className = "flex flex-row items-center  mb-1">
      <Icon type="entypo" name="calendar" color="black" style={{ marginRight: 0 }} />
      <Text  style = {styles.poppinsReg} className = "text-lg"> {formattedDate}, {selectedTimeslot}</Text>
      </View>



      <View className = "mt-2"style={{flexDirection: 'row', alignItems: 'center',justifyContent:"center"}}>
      <View style={{flex: 1, height: 1, backgroundColor: 'lightgray', alignSelf: "center", justifyContent: "center", }} />   
      </View>

  <View className="mt-2 ">
  <View className = "flex flex-row items-center">

  <Text className="text-lg" style={styles.poppinsMed}>Selected Services:</Text>
  </View>
  {Basket.map((service, index) => (
    <View className="flex flex-row justify-between items-center mt-2" key={index}>
      <View>
        <Text className="text-base" style={styles.poppinsReg}>{service[0].name}</Text>

        {/* Render the extras if available */}
        {service[0].extras && service[0].extras.map((extra, extraIndex) => (
          <View key={extraIndex}>
            <View className = "flex flex-row items-center">
            <Icon type="entypo" name="plus" color="black" size={21}  />
            <Text className="text-sm" style={styles.poppinsReg}>{extra.name}</Text>
            </View>
          </View>
        ))} 
      <Text className=" text-sm" style={styles.poppinsReg}>
        Price: £{(service[0].price + (service[0].extras ? service[0].extras.reduce((total, extra) => total + extra.price, 0) : 0)).toFixed(2)}
      </Text>

      {service[0].duration !== undefined && (
        <Text className="text-gray-600 text-sm" style={styles.poppinsReg}>
          Duration: {service[0].duration + (service[0].extras ? service[0].extras.reduce((total, extra) => (extra.duration !== undefined ? total + extra.duration : total), 0) : 0)} minutes
        </Text>
      )}
            </View>
          </View>
        ))}

      <Text className=" text-sm mt-1 text-gray-500" style={styles.poppinsMed}>
        Total Duration: 30 Minutes
      </Text>

      
      <Text className=" text-sm mb-1 text-gray-500" style={styles.poppinsMed}>
        Subtotal: £11.00
      </Text>
      </View>
      <View className = "mt-1"style={{flexDirection: 'row', alignItems: 'center',justifyContent:"center"}}>
      <View style={{flex: 1, height: 1, backgroundColor: 'lightgray', alignSelf: "center", justifyContent: "center", }} />   
      </View>

  


      <View>
      <View className = "flex flex-row items-center mt-1">
      <Icon type="antdesign" name="infocirlce" color="gray" size={14}  />
      <Text className="  text-base text-gray-500 ml-1" style={styles.poppinsMed}>
        Fees: 
      </Text>
      </View>
      
      <Text className=" text-sm text-gray-500" style={styles.poppinsReg}>
        Card Processing Fee : £0.80
      </Text>
      <Text className=" text-sm text-gray-500" style={styles.poppinsReg}>
        Mobile Travel Fee : £8.50
      </Text>
      <Text className=" text-sm text-gray-500" style={styles.poppinsReg}>
        Deposit: £10.00
      </Text>


      <Text className=" text-lg mt-1 " style={styles.poppinsMed}>
        Total: £21.50
      </Text>



      </View>



      <View className = "flex flex-row mt-4 items-center justify-between">
      <View className = "flex flex-row items-center">
      <Icon type="font-awesome" name="cc-visa" color="#000F9E" size={28} />
      <Text style = {styles.poppinsReg} className = "self-center text-sm ml-4 ">●●●● 4003</Text>
      </View>
      <Icon type="antdesign" name="right" color="black" size={28} />
      </View>



      <View className = "mt-3"style={{flexDirection: 'row', alignItems: 'center',justifyContent:"center"}}>
      <View style={{flex: 1, height: 1, backgroundColor: 'lightgray', alignSelf: "center", justifyContent: "center", }} />   
      </View>

      <View className = "flex flex-row items-center  mt-2">
      <Icon type="antdesign" name="infocirlce" color="gray" size={14}  />
      <Text className=" ml-1 text-sm text-gray-600" style={styles.poppinsReg}>
        This vendor has a 10 minute late fee of: <Text style = {styles.poppinsMed} className="text-red-600">£100.00</Text>
      </Text>
      </View>

      <View className = "flex flex-row items-center  mt-2">
      <Icon type="antdesign" name="infocirlce" color="gray" size={14}  />
      <Text className="ml-1 text-sm text-gray-600" style={styles.poppinsReg}>
        This vendor has a 20 minute late fee of: <Text style = {styles.poppinsMed} className="text-red-600">30%(£6.50)</Text>
      </Text>
      </View>

      <View className = "flex flex-row items-center  mt-2">
      <Icon type="antdesign" name="infocirlce" color="gray" size={14}  />
      <Text className="ml-1 text-sm text-gray-600 " style={styles.poppinsReg}>
        This vendor will cancel if you are late by: <Text style = {styles.poppinsMed} className="text-red-600">30 Minutes</Text>
      </Text>
      </View> 
    <Button
    onPress={handlePressPay}
    titleStyle={styles.PoppinsReg}
    title={`Pay Now`}
    color={'black'}
    containerStyle={{
      width: WIDTH - 170,
      marginTop:20,
      borderRadius:10,
      alignSelf: 'center',
      justifyContent: 'center',
    }}
    />          
      </ScrollView>
    </SafeAreaView>
  )
}

export default PaymentScreen

const styles = StyleSheet.create({
  root:{
    flex:1,
    backgroundColor:"white",
  },

  poppinsReg:{
    fontFamily: "PoppinsReg",
  },

  button: {
    alignSelf: 'flex-start',
    marginTop: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  poppinsMed:{
    fontFamily: "PoppinsMed",
  },
})