import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Icon, Button } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

import Slider from '@react-native-community/slider';

const WIDTH = Dimensions.get('window').width;
// const HEIGHT = Dimensions.get('window').height;

const FilterScreen = () => {
  const navigation = useNavigation();
  const [distance, setDistance] = useState(10);
  const [activeSection, setActiveSection] = useState('featured');
  const [shopSelected, setShopSelected] = useState(false);
  const [mobileSelected, setMobileSelected] = useState(false);
  const [homeSelected, setHomeSelected] = useState(false);

  const toggleShopSelected = () => {
    setShopSelected(!shopSelected);
  };

  const toggleMobileSelected = () => {
    setMobileSelected(!mobileSelected);
  };

  const toggleHomeSelected = () => {
    setHomeSelected(!homeSelected);
  };

  const goBack = () => {
    navigation.goBack();
  };

  const pressContinue = () => {
    // console.log('Continue Pressed');
  };

  const pressFeatured = () => {
    setActiveSection('featured');
  };

  const pressRating = () => {
    setActiveSection('rating');
  };

  const pressDistance = () => {
    setActiveSection('distance');
  };

  const pressPrice = () => {
    setActiveSection('price');
  };

  const clearAll = () => {
    // Add the logic here to clear all filters or perform the desired action
    // console.log('Clear All Pressed');
    setActiveSection('featured');
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.root}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={goBack}
            style={styles.closeButton}>
            <Icon
              type="ant-design"
              name="close"
              color="black"
              size={38}
              style={styles.locationIcon}
            />
          </TouchableOpacity>
          <Text style={styles.title}>Filter Options</Text>
          <TouchableOpacity
            onPress={clearAll}
            style={styles.clearAllButton}>
            <Text style={styles.clearAllText}>Clear All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView>
          <View style={styles.sortBySection}>
            <Text style={styles.setDistanceTitle}>Sort By</Text>

            <TouchableOpacity onPress={pressFeatured}>
              <View className="flex flex-row items-center justify-between mb-3">
                <View className="flex flex-row items-center">
                  <Icon
                    type="material"
                    name="whatshot"
                    color="black"
                    size={28}
                  />
                  <Text
                    style={styles.PoppinsMed}
                    className="self-center text-base ml-3 ">
                    Featured
                  </Text>
                </View>
                {activeSection === 'featured' ? (
                  <Icon
                    type="entypo"
                    name="check"
                    color="darkgreen"
                    size={22}
                  />
                ) : null}
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={pressRating}>
              <View className="flex flex-row items-center justify-between mb-3">
                <View className="flex flex-row items-center">
                  <Icon
                    type="material"
                    name="star"
                    color="black"
                    size={28}
                  />
                  <Text
                    style={styles.PoppinsMed}
                    className="self-center text-base ml-3">
                    Rating
                  </Text>
                </View>
                {activeSection === 'rating' ? (
                  <Icon
                    type="entypo"
                    name="check"
                    color="darkgreen"
                    size={22}
                  />
                ) : null}
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={pressDistance}>
              <View className="flex flex-row items-center justify-between mb-3">
                <View className="flex flex-row items-center">
                  <Icon
                    type="material"
                    name="location-on"
                    color="black"
                    size={28}
                  />
                  <Text
                    style={styles.PoppinsMed}
                    className="self-center text-base ml-3">
                    Distance
                  </Text>
                </View>
                {activeSection === 'distance' ? (
                  <Icon
                    type="entypo"
                    name="check"
                    color="darkgreen"
                    size={22}
                  />
                ) : null}
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={pressPrice}>
              <View className="flex flex-row items-center justify-between mb-3">
                <View className="flex flex-row items-center">
                  <Icon
                    type="material"
                    name="attach-money"
                    color="black"
                    size={28}
                  />
                  <Text
                    style={styles.PoppinsMed}
                    className="self-center text-base ml-3">
                    Price
                  </Text>
                </View>
                {activeSection === 'price' ? (
                  <Icon
                    type="entypo"
                    name="check"
                    color="darkgreen"
                    size={22}
                  />
                ) : null}
              </View>
            </TouchableOpacity>
          </View>

          <Text
            className="ml-3"
            style={styles.setDistanceTitle}>
            Service Type
          </Text>
          <View style={styles.serviceTypeSection}>
            <View className="flex flex-row items-center justify-between mb-3">
              <TouchableOpacity onPress={toggleShopSelected}>
                <View className="items-center">
                  <Icon
                    type="material"
                    name="storefront"
                    color="black"
                    size={28}
                  />
                  <Text
                    style={[styles.PoppinsMed, { color: shopSelected ? 'green' : 'black' }]}
                    className="self-center text-base ml-1">
                    Shop
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={toggleMobileSelected}>
                <View className="">
                  <Icon
                    type="ionicon"
                    name="car-outline"
                    color="black"
                    size={28}
                  />
                  <Text
                    style={[styles.PoppinsMed, { color: mobileSelected ? 'green' : 'black' }]}
                    className="self-center text-base ml-1">
                    Mobile
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleHomeSelected}>
                <View className="">
                  <Icon
                    type="antdesign"
                    name="home"
                    color="black"
                    size={28}
                  />
                  <Text
                    style={[styles.PoppinsMed, { color: homeSelected ? 'green' : 'black' }]}
                    className="self-center text-base ml-1">
                    Home
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.setDistanceSection}>
            <Text style={styles.setDistanceTitle}>Set Distance</Text>
            <Slider
              style={styles.slider}
              minimumValue={1}
              maximumValue={100}
              value={distance}
              onValueChange={(value) => setDistance(value)}
              step={1}
              minimumTrackTintColor="black"
              maximumTrackTintColor="lightgray"
              thumbTintColor="##8a8a8a"
            />
            <Text
              style={styles.PoppinsMed}
              className="text-base">
              {distance.toFixed(0)} miles
            </Text>
          </View>
        </ScrollView>
        <Button
          titleStyle={styles.PoppinsReg}
          onPress={pressContinue}
          title="Apply Changes"
          color="black"
          containerStyle={{
            width: WIDTH - 120,
            borderRadius: 10,
            alignSelf: 'center',
            justifyContent: 'center',
          }}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default FilterScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  closeButton: {
    // Custom styling for the close button if needed
  },
  title: {
    fontSize: 20,
    fontFamily: 'PoppinsMed',
  },

  PoppinsMed: {
    fontFamily: 'PoppinsMed',
  },

  PoppinsReg: {
    fontFamily: 'PoppinsReg',
  },

  clearAllText: {
    fontSize: 12,
    color: 'darkblue', // Change this to your preferred color
    fontFamily: 'PoppinsReg',
  },

  setDistanceSection: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },

  serviceTypeSection: {
    paddingVertical: 20,
    paddingHorizontal: 26,
  },

  sortBySection: {
    paddingHorizontal: 14,
    paddingVertical: 20,
  },
  setDistanceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  slider: {
    width: '100%',
    height: 40,
  },
});
