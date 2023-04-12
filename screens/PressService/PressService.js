import { StyleSheet, Text, View,TouchableOpacity, } from 'react-native'
import React, {useState,useEffect} from 'react'
import { Button, Icon } from '@rneui/base'
import { useNavigation,useRoute } from '@react-navigation/native';
import { database } from '../../firebaseConfig'
import { doc,getDocs,query,collection,where,onSnapshot} from "firebase/firestore"; 
import useFont from '../../useFont';
import { CheckBox } from '@rneui/themed';

const PressService = () => {
  const navigation = useNavigation();
  useFont();
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [extras, setExtras] = useState([]);
  const route = useRoute();
  const { name,price,duration,description,docId,notes,serviceId} = route.params;



  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(database, "barbers", docId, "services",serviceId,"extras"));
      const extrasArray = querySnapshot.docs.map((doc) => {
        const name = doc.get("name");
        const category = doc.get("category");
        const description = doc.get("description");
        const duration = doc.get("duration");
        const price = doc.get("price");
        return { name, category, description, duration, price };
      });
      setExtras(extrasArray);
    };
  
    const unsubscribe = onSnapshot(collection(database, "barbers", docId, "services",serviceId,"extras"), (snapshot) => {
      fetchData();
    });
  
    return () => {
      unsubscribe();
    };
  }, []);


  const groupedExtras = extras.reduce((groups, extra) => {
    const category = extra.category;
    groups[category] = groups[category] || [];
    groups[category].push(extra);
    return groups;
  }, {});

  console.log(groupedExtras);




  const formattedPrice = price ? price.toFixed(2) : "Price not available";

  const totalPrice = formattedPrice;

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
      <Text style = {styles.PoppinsMed} className  = "text-3xl">{name}</Text>
      <Text style = {styles.PoppinsReg} className = "text-lg">£{totalPrice}</Text>
      <Text style = {[styles.PoppinsLight, { maxWidth: '95%' }]} numberOfLines={2} ellipsizeMode="tail" className = "text-sm text-gray-600 ">{description} </Text>
      <View style={{flexDirection: 'row', alignItems: 'center',marginTop:5,}}>
        <View style={{flex: 0.95, height: 1, backgroundColor: 'lightgray', alignSelf: "center", justifyContent: "center", marginTop:5, marginBottom:5 }} />   
        </View>
      </View>

 
      {extras.map(extra => (
        <View key={extra.name} className="ml-5 mt-1">
          <Text style={styles.PoppinsMed} className="text-xl mt-1">{extra.category}</Text>
          <View className="flex flex-row justify-between">
            <View>
              <Text style={styles.PoppinsReg} className="text-lg mt-1">{extra.name}</Text>
              <Text style={styles.PoppinsLight} className="text-base text-gray-500">{extra.description}</Text>
              <Text style={styles.PoppinsLight} className="text-base text-gray-600">£{extra.price.toFixed(2)}</Text>
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
        <View style={{flexDirection: 'row', alignItems: 'center',marginTop:5,}}>
        <View style={{flex: 0.95, height: 1, backgroundColor: 'lightgray', alignSelf: "center", justifyContent: "center", marginTop:5, marginBottom:5 }} />   
        </View>
        </View>
      ))}

      <View className= "ml-5 mt-1">


      
        <Text style = {styles.PoppinsLight} className  = "text-base text-gray-600 mt-5">Estimated Duration: {duration} Minutes</Text> 
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