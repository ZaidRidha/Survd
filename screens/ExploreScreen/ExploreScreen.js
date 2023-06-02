import { View, Text, ScrollView, TouchableWithoutFeedback, Keyboard, Image, SafeAreaView, StyleSheet,Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SearchBar, Card } from '@rneui/themed';
const WIDTH = Dimensions.get("window").width;

const ExploreScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.inner}>
        <SearchBar
          placeholder="Search name, username, speciality, etc."
          onChangeText={(query) => setSearchQuery(query)}
          value={searchQuery}
          lightTheme={false}
          round={true}
          containerStyle={{
            backgroundColor: 'white',
            borderWidth: 0,
            shadowColor: 'white',
            borderBottomColor: 'transparent',
            borderTopColor: 'transparent',
          }}
          inputContainerStyle={{ backgroundColor: '#EEEEEE' }}
          inputStyle={{ fontSize: 14, color: 'black' }}
          clearIcon={{ size: 25 }}
        />
        <Text style={styles.PoppinsMed} className="text-xl">Top Categories</Text>
        <View className = "flex flex-row items-center">
        <Card containerStyle = {styles.cardContainer} wrapperStyle = {styles.cardWrapper}>
          <Card.Image style = {styles.cardImage} source={require('../../assets/images/hdfade.jpg')} />
          <Card.Divider />
          <Card.Title>Barber</Card.Title>
        </Card>
        <Card>
          <Card.Image source={require('../../assets/images/hdfade.jpg')} />
          <Card.Divider />
          <Card.Title>Lash technician</Card.Title>
        </Card>
        </View>
      </View>
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
    padding: 15,
  },
  PoppinsReg: {
    fontFamily: 'PoppinsReg',
  },

  cardContainer: {
    borderRadius:10,

  },

  PoppinsLight: {
    fontFamily: 'PoppinsLight',
  },


  PoppinsBold: {
    fontFamily: 'PoppinsBold',
  },

  cardImage:{
    width: WIDTH *0.3
  },

  PoppinsMed: {
    fontFamily: 'PoppinsMed',
  },
});
