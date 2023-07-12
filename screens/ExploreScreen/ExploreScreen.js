import { View, Text, ScrollView, TouchableWithoutFeedback, Keyboard, Image, SafeAreaView, StyleSheet,Dimensions,FlatList} from 'react-native';
import React, { useState, useEffect } from 'react';
import { SearchBar, Card } from '@rneui/themed';
import { doc,getDocs,query,collection,where,onSnapshot,updateDoc} from "firebase/firestore"; 
import { Icon } from '@rneui/themed';
import { database } from '../../firebaseConfig';
import Fuse from 'fuse.js';
const WIDTH = Dimensions.get("window").width;

const ExploreScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const dismissExplorePage = () => {
    setIsExplorePageVisible(false);
  };


  const performSearch = async (text) => {

    
    try {
      setSearchQuery(text);
      const q = query(collection(database, 'barbers'));
      const querySnapshot = await getDocs(q);
  
      const data = querySnapshot.docs.map((doc) => doc.data().name);
  
      const fuse = new Fuse(data, {
        keys: ['name'],
        threshold: 0.3, // Adjust the threshold as needed
      });
  
      const searchResults = fuse.search(text).map((result) => result.item);
  
      setSearchResults(searchResults);
    } catch (error) {
      console.error('Error searching Firestore:', error);
    }
  };
  return (
    <SafeAreaView style={styles.root}>
      <SearchBar
  placeholder="Search name, username, speciality, etc."
  value={searchQuery}
  onChangeText={performSearch}
  lightTheme={false}
  round={true}
  containerStyle={{
    backgroundColor: 'white',
    borderWidth: 0,
    shadowColor: 'white',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent'
  }}
  inputContainerStyle={{ backgroundColor: '#EEEEEE' }}
  inputStyle={{ fontSize: 14, color: 'black' }}
  clearIcon={{ size: 25 }}

/>
<ScrollView style={styles.inner}>
{searchResults.length > 0 ? (
  <View className="mb-3" style = {styles.searchParts}>
    <FlatList
      data={searchResults}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View className = "mb-2"> 
        <View className = "flex flex-row ml-2 "> 
         <Icon type="entypo" name="scissors" color="black" size={24} />
        <Text style={styles.PoppinsMed} className="text-xl">
          {item}
        </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center',marginLeft:5,}}>
        <View style={{width:WIDTH * 0.90, height: 1, backgroundColor: 'lightgray', alignSelf: "center", justifyContent: "center", marginTop:5, marginBottom:5 }} />   
        </View>
        </View>
      )}
    />
        
  </View>
) : null}


{searchResults.length === 0 ? (
  <>
    <Text style={styles.PoppinsMed} className="ml-3 text-xl">Top Categories</Text>
    <View className="flex flex-row items-center">
      <Card containerStyle={styles.cardContainer}>
        <Card.Image style={styles.cardImage} source={require('../../assets/images/CategoryIcon.png')} />
        <Card.Divider />
        <Card.Title>Barber</Card.Title>
      </Card>

      <Card containerStyle={styles.cardContainer}>
        <Card.Image style={styles.cardImage} source={require('../../assets/images/CategoryIcon.png')} />
        <Card.Divider />
        <Card.Title>Barber</Card.Title>
      </Card>
    </View>
  </>
) : null}




      </ScrollView>
    </SafeAreaView>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
  },

  inner: {
    padding: 5,
    flex:1,
  },
  PoppinsReg: {
    fontFamily: 'PoppinsReg',
  },

  cardContainer: {
    backgroundColor: 'transparent',
    borderWidth:1,
    borderColor:"black",
    borderRadius: 2,
    padding: 0, // Remove padding to reduce whitespace

  },

  PoppinsLight: {
    fontFamily: 'PoppinsLight',
  },

  searchParts:{
    backgroundColor:"white",
    flex:1,
    borderRadius:20,
    alignSelf:"center",
    width: WIDTH*0.95,
    padding:5,
  },



  PoppinsBold: {
    fontFamily: 'PoppinsBold',
  },

  cardImage:{
    width: WIDTH *0.4
  },

  PoppinsMed: {
    fontFamily: 'PoppinsMed',
  },
  
});
