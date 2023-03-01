import { View, Text,StyleSheet,FlatList} from 'react-native'
import React from 'react'
import { useState,useEffect} from 'react'
import { Icon } from '@rneui/themed';
import { Header } from '@rneui/themed';
import useFont from '../../useFont';
import * as Location from 'expo-location';;
import { useNavigation } from '@react-navigation/native';
import BarberCard from '../../components/BarberCard/BarberCard';



const HomeScreen = () => {
  useFont();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [address, setAddress] = useState(null);
  const navigation = useNavigation();
  const renderBarberCard = ({ item }) => <BarberCard name={item.name} />;


  const barbers = [
    { id: 1, name: 'John', },
    { id: 2, name: 'Mike' },
    { id: 3, name: 'Samuel' },
  ];


  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      
      let currentAddress = await Location.reverseGeocodeAsync(currentLocation.coords);

      setAddress(currentAddress);
      
    })();
  }, []);



  return (
    <View style = {styles.root}>

    <Header
    backgroundColor='white'
    placement="left"
      leftComponent={
         <View className = "flex flex-row items-center "> 
         <Text style = {styles.loctext}>Location · {address ? address[0].name : 'Loading...'} </Text>
         <Icon type="entypo" name="chevron-down" color="black" size={18} />
         </View>
      }
      rightComponent={
        <Icon type="material-community" name="bell" color="black" size={22} />
      }
    />

    <View style = {styles.heads}>

    </View>  
    <Text style = {styles.fgreg} className = "text-xl mb-2 ">Active barbers near you:</Text>
    <FlatList
        data={barbers}
        keyExtractor={item => item.id.toString()}
        renderItem={renderBarberCard}
        showsHorizontalScrollIndicator={false} // remove horizontal scroll indicator
        showsVerticalScrollIndicator={false} 
      />
    </View>


  )
}

const styles = StyleSheet.create({

  root:{
    flex:1,
    backgroundColor: '#FFFFFF',
    padding:25,
  },

  heads:{
    alignItems: 'center',
    flexDirection: 'column', 
  },

  loctext: {
    fontFamily : 'FigtreeSemiBold',
    fontSize: 14,


  },

  fgreg: {
    fontFamily : 'FigtreeSemiBold',

  }

})

export default HomeScreen