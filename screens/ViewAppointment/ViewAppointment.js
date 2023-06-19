import { StyleSheet, Text, View,SafeAreaView, Dimensions,TouchableWithoutFeedback,ScrollView,Alert,TouchableOpacity} from 'react-native'
import React,{ useEffect, useState } from 'react'
import Lottie from 'lottie-react-native';
import { Icon, Button} from '@rneui/themed';
import { useNavigation,useRoute  } from '@react-navigation/native';


const WIDTH = Dimensions.get('window').width;




const ViewAppointment = () => {

const navigation = useNavigation();
const route = useRoute();
const [showServices, setShowServices] = useState(false);


const { barberName,date,duration,price,time,basket,timeDate,postcode,address} = route.params;

const deserializedBasket = JSON.parse(basket);

const timestamp = new Date(
  timeDate.seconds * 1000 + timeDate.nanoseconds / 1000000
);

const options = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  hour12: true
};

const formattedDate = timestamp.toLocaleString(undefined, options);



const pressServices = () => {
  setShowServices(!showServices);
};


const goBack = () =>{
    navigation.goBack();

  }


  return (
    <SafeAreaView style={styles.root}>
    <View className = "flex flex-row ">
    <TouchableWithoutFeedback onPress={goBack}>
    <Icon type="antdesign" name="left" color="black" size={28} />
    </TouchableWithoutFeedback>
     <View className = "justify-center">
     <Text style = {styles.PoppinsMed} className = "text-2xl self-center ml-5">Appointment Confirmed</Text>
     </View>
     </View>
     <ScrollView style = {styles.inner}>

      <Lottie
        source={require('../../assets/animations/104297-completed-icon.json')}
        autoPlay
        loop={false} // Set loop prop to false
        style={styles.animation}
      />

<Text style = {styles.PoppinsMed} className = "text-lg mt-5 ">Appointment Details:</Text>

<View className="">
  <View className="flex flex-row items-center my-1">
  <Text style={styles.PoppinsMed} className="text-base ">For:</Text>
    <Text style={styles.PoppinsReg} className="text-base ml-1 ">Tommy</Text>
  </View>
  <View className="flex flex-row items-center mt-1 mb-2">
  <Text style={styles.PoppinsMed} className="text-base ">By:</Text>
    <Text style={styles.PoppinsReg} className="text-base ml-1 ">{barberName}</Text>
  </View>
  <View className="flex flex-row items-center my-1">
    <Icon type="entypo" name="shop" color="black" size={24} />
    <Text style={styles.PoppinsReg} className="text-base ml-1">Ismail's Barbershop</Text>
  </View>
  <View className="flex flex-row items-center my-1 flex flex-wrap">
    <Icon type="ionicon" name="location-sharp" color="black" size={24} />
    <Text style={styles.PoppinsReg} className="text-base ml-1 ">{address},</Text>
    <Text style={styles.PoppinsReg} className="text-base ml-1">{postcode}</Text>
  </View>
  <View className="flex flex-row items-center my-1">
    <Icon type="entypo" name="calendar" color="black" size={24} />
    <Text style={styles.PoppinsReg} className="text-base ml-1">{date}, {time}</Text>
  </View>

  <View className="flex flex-row items-center my-1">
    <Icon type="antdesign" name="creditcard" color="black" size={24} />
    <Text style={styles.PoppinsReg} className="text-base ml-1">Payment Method</Text>
  </View>

  <View className="flex flex-row items-center my-1">
    <Icon type="feather" name="clock" color="black" size={24} />
    <Text style={styles.PoppinsReg} className="text-base ml-1">Booked on {formattedDate}</Text>
  </View>


</View>

<View className = "mt-1"style={{flexDirection: 'row', alignItems: 'center',justifyContent:"center"}}>
      <View style={{flex: 1, height: 1, backgroundColor: 'lightgray', alignSelf: "center", justifyContent: "center", }} />   
      </View>


  <TouchableOpacity onPress={pressServices}>
  <View className = "flex flex-row items-center">
  <Text className="text-lg mr-1" style={styles.PoppinsMed}>Selected Services</Text>
  <Icon type="antdesign" name="down" color="black" size={21}  />
  </View>
  </TouchableOpacity>


  {showServices && deserializedBasket.map((serviceGroup, index) => (
  <View key={index} style={styles.serviceGroup}>
    {serviceGroup.map((service, serviceIndex) => (
      <View key={serviceIndex}>
        <Text className="text-base" style={styles.PoppinsMed}>{service.name}</Text>
        <Text className="text-base" style={styles.PoppinsMed}>£{service.price.toFixed(2)}</Text>
        <Text className="text-sm text-gray-600" style={styles.PoppinsMed}>{service.duration} Minutes</Text>
        
        {service.extras.map((extra, extraIndex) => (
          <View key={extraIndex}>
            <Text className="text-base" style={styles.PoppinsMed}>{extra.name}</Text>
            <Text className="text-base" style={styles.PoppinsMed}>£{extra.price.toFixed(2)}</Text>
            <Text className="text-sm text-gray-600" style={styles.PoppinsMed}>{extra.duration} Minutes</Text>
          </View>
        ))}
      </View>
    ))}
  </View>
))}



<Text className=" text-sm mt-1 " style={styles.PoppinsReg}>
        Total Duration: {duration} Minutes
      </Text>

      <Text className=" text-base mb-1 " style={styles.PoppinsMed}>
        Subtotal: £{price.toFixed(2)}
      </Text>

      <View className = "mt-1"style={{flexDirection: 'row', alignItems: 'center',justifyContent:"center"}}>
      <View style={{flex: 1, height: 1, backgroundColor: 'lightgray', alignSelf: "center", justifyContent: "center", }} />   
      </View>

      <View>
      <View className = "flex flex-row items-center mt-1">
      <Icon type="antdesign" name="infocirlce" color="gray" size={14}  />
      <Text className="  text-base text-gray-500 ml-1" style={styles.PoppinsMed}>
        Fees: 
      </Text>
      </View>
      
      <Text className=" text-sm text-gray-500" style={styles.PoppinsReg}>
        Card Processing Fee : £0.80
      </Text>
      <Text className=" text-sm text-gray-500" style={styles.PoppinsReg}>
        Mobile Travel Fee : £8.50
      </Text>
      <Text className=" text-sm text-gray-500" style={styles.PoppinsReg}>
        Deposit: £10.00
      </Text>


      <Text className=" text-base mt-1 " style={styles.PoppinsMed}>
        Total: £21.50
      </Text>




  <View className = "flex flex-row items-center justify-between" style={{ marginBottom: 15, marginTop:10, }}>
      <Button
        title="Cancel"
        buttonStyle={{
          backgroundColor: 'white',
          borderWidth: 1,
          borderColor: 'black',
          width: WIDTH * 0.45,
          marginTop: 10,
          borderRadius:5,
        }}
        titleStyle={{
          color: 'black',
          fontFamily: 'PoppinsMed',
        }}
      />

<Button
        title="Get Help"
        buttonStyle={{
          backgroundColor: 'white',
          borderWidth: 1,
          borderColor: 'black',
          width: WIDTH * 0.45,
          marginTop: 10,
          borderRadius:5,
        }}
        titleStyle={{
          color: 'black',
          fontFamily: 'PoppinsMed',
        }}
      />
    </View>

      </View>




    
</ScrollView>
    </SafeAreaView >
  )
}

export default ViewAppointment

const styles = StyleSheet.create({

      root: {
        flex: 1,
        backgroundColor: 'white',
      },

      inner : {
        padding:10,
      },


      animation: {
        width: 180, // Adjust the width as needed
        height: 180, // Adjust the height as needed
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