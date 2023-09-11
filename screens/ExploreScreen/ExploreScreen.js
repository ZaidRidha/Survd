import { View, Text, ScrollView, Image, StyleSheet, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SearchBar, Card, Icon } from '@rneui/themed';
import { getDocs, query, collection } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import Fuse from 'fuse.js';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { SCREENS } from 'navigation/navigationPaths';
import { database } from '../../firebaseConfig';

const WIDTH = Dimensions.get('window').width;

const ExploreScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigation = useNavigation();

  const navigateFilter = () => {
    navigation.navigate(SCREENS.FILTER_SCREEN);
  };

  const performSearch = async (text) => {
    try {
      setSearchQuery(text);
      const q = query(collection(database, 'barbers'));
      const querySnapshot = await getDocs(q);

      const data = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          name: data.name,
          username: data.username,
        };
      });

      const fuse = new Fuse(data, {
        keys: text.startsWith('@') ? ['username'] : ['name'],
        threshold: 0.3, // Adjust the threshold as needed
      });

      const searchResults = fuse.search(text).map((result) => result.item);

      setSearchResults(searchResults);
    } catch (error) {
      console.error('Error searching Firestore:', error);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.root}>
        <View className="flex flex-row items-center ">
          <SearchBar
            placeholder="Search name, username, speciality, etc."
            value={searchQuery}
            onChangeText={performSearch}
            lightTheme={false}
            round
            containerStyle={{
              width: WIDTH * 0.9,
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
          <TouchableOpacity onPress={navigateFilter}>
            <Icon
              type="material-community"
              name="tune-variant"
              color="black"
              size={24}
            />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.inner}>
          {searchResults.length > 0 ? (
            <View
              className="mb-3"
              style={styles.searchParts}>
              <FlatList
                data={searchResults}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View className="mb-2">
                    <View className="flex flex-row ml-2 items-center ">
                      <Image
                        source={require('../../assets/images/bizlogo.jpg')}
                        style={styles.image}
                      />
                      <View>
                        <Text
                          style={styles.PoppinsMed}
                          className="text-lg">
                          {item.name}
                        </Text>
                        <Text
                          style={styles.PoppinsLight}
                          className=" text-sm text-gray-600">
                          {item.username}
                        </Text>
                      </View>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 5 }}>
                      <View
                        style={{
                          width: WIDTH * 0.9,
                          height: 1,
                          backgroundColor: 'lightgray',
                          alignSelf: 'center',
                          justifyContent: 'center',
                          marginTop: 5,
                          marginBottom: 5,
                        }}
                      />
                    </View>
                  </View>
                )}
              />
            </View>
          ) : null}

          {searchResults.length === 0 ? (
            <>
              <Text
                style={styles.PoppinsMed}
                className="ml-3 text-xl">
                Top Categories
              </Text>
              <View className="flex flex-row items-center">
                <Card containerStyle={styles.cardContainer}>
                  <Card.Image
                    style={styles.cardImage}
                    source={require('../../assets/images/CategoryIcon.png')}
                  />
                  <Card.Divider />
                  <Card.Title>Barber</Card.Title>
                </Card>

                <Card containerStyle={styles.cardContainer}>
                  <Card.Image
                    style={styles.cardImage}
                    source={require('../../assets/images/hairstylistplaceholder.jpg')}
                  />
                  <Card.Divider />
                  <Card.Title>Hairstylist</Card.Title>
                </Card>
              </View>
              <View className="flex flex-row items-center my-5">
                <Card containerStyle={styles.cardContainer}>
                  <Card.Image
                    style={styles.cardImage}
                    source={require('../../assets/images/nailsplaceholder.png')}
                  />
                  <Card.Divider />
                  <Card.Title>Nails</Card.Title>
                </Card>

                <Card containerStyle={styles.cardContainer}>
                  <Card.Image
                    style={styles.cardImage}
                    source={require('../../assets/images/makeupplaceholder.jpg')}
                  />
                  <Card.Divider />
                  <Card.Title>Makeup</Card.Title>
                </Card>
              </View>

              <View className="flex flex-row items-center my-5">
                <Card containerStyle={styles.cardContainer}>
                  <Card.Image
                    style={styles.cardImage}
                    source={require('../../assets/images/massageplaceholder.jpg')}
                  />
                  <Card.Divider />
                  <Card.Title>Massage</Card.Title>
                </Card>

                <Card containerStyle={styles.cardContainer}>
                  <Card.Image
                    style={styles.cardImage}
                    source={require('../../assets/images/laundryplaceholder.jpg')}
                  />
                  <Card.Divider />
                  <Card.Title>Laundry</Card.Title>
                </Card>
              </View>

              <View className="flex flex-row items-center my-5">
                <Card containerStyle={styles.cardContainer}>
                  <Card.Image
                    style={styles.cardImage}
                    source={require('../../assets/images/cleaningplaceholder.jpg')}
                  />
                  <Card.Divider />
                  <Card.Title>Cleaning Services</Card.Title>
                </Card>

                <Card containerStyle={styles.cardContainer}>
                  <Card.Image
                    style={styles.cardImage}
                    source={require('../../assets/images/tattooplaceholder.jpg')}
                  />
                  <Card.Divider />
                  <Card.Title>Tattoos</Card.Title>
                </Card>
              </View>
            </>
          ) : null}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
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
    flex: 1,
  },
  PoppinsReg: {
    fontFamily: 'PoppinsReg',
  },

  cardContainer: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 2,
    padding: 0, // Remove padding to reduce whitespace
  },

  PoppinsLight: {
    fontFamily: 'PoppinsLight',
  },

  searchParts: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 20,
    alignSelf: 'center',
    width: WIDTH * 0.95,
    padding: 5,
  },

  image: {
    aspectRatio: 1,
    width: '10%',
    height: '10%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 100,
    marginRight: 5,
  },

  PoppinsBold: {
    fontFamily: 'PoppinsBold',
  },

  cardImage: {
    width: WIDTH * 0.4,
  },

  PoppinsMed: {
    fontFamily: 'PoppinsMed',
  },
});
