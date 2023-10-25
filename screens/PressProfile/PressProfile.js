import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Linking,
  FlatList,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Icon, Button } from '@rneui/themed';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Location from 'expo-location';
import { getDocs, collection, onSnapshot } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { SCREENS } from 'navigation/navigationPaths';
import { selectCurrentBasket, selectCurrentVendor } from '../../slices/locSlice';

import { database } from '../../firebaseConfig';
import useFont from '../../useFont';

const WIDTH = Dimensions.get('window').width;

const PressProfile = () => {
  const [services, setServices] = useState([]);
  const [Address, setAddress] = useState('');

  const [showCheckout, setshowCheckout] = useState(false);
  const [showLoc, setShowLoc] = useState(false);
  const [showPhotos, setShowPhotos] = useState(false);
  const [ighandle, setigHandle] = useState(' ');
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const navigation = useNavigation();
  useFont();
  const route = useRoute();
  const {
    name,
    username,
    distance,
    lat,
    long,
    instagram,
    phone,
    mobile,
    shop,
    home,
    pinMsg,
    docId,
    isLive,
    mobileActive,
    shopActive,
    homeActive,
    updatedHours,
    walkins,
    rating,
  } = route.params;
  const currentBasket = useSelector(selectCurrentBasket);
  const currentVendor = useSelector(selectCurrentVendor);
  const initialLayout = { width: WIDTH };
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.4;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  let total = 0;



  const sethandle = () => {
    if (instagram) {
      const handle = instagram.replace(/^@/, '');
      setigHandle(handle);
      return ighandle;
    }
    return null;
  };

  const carouselData = [
    // images that go into the carousel
    {
      id: 1,
      image: require('../../assets/images/bizlogo.jpg'),
    },
    {
      id: 2,
      image: require('../../assets/images/fade2.jpg'),
    },
    {
      id: 3,
      image: require('../../assets/images/fade3.jpg'),
    },

    {
      id: 4,
      image: require('../../assets/images/AppLogo.png'),
    },
  ];

  const pressContinue = () => {
    if (currentBasket.length > 0) {
      navigation.navigate(SCREENS.CONTINUE_SCREEN, {
        lat,
        long,
        vendorID: docId,
        vendorName: name,
        isLive,
        docId,
      });
    } else {
      // Handle the case when the basket is empty
      alert('Basket is empty. Please add items before continuing.');
      // You can display a message to the user or perform any other desired action
    }
  };

  const navigateToImageScreen = (index) => {
    const currindex = index;

    navigation.navigate(SCREENS.IMAGE_SCREEN, {
      carouselData,
      index: currindex,
    });
  };

  const renderCarouselItem = ({ item, index }) => (
    <TouchableWithoutFeedback onPress={() => navigateToImageScreen(index)}>
      <Image
        source={item.image}
        style={styles.displayImage}
      />
    </TouchableWithoutFeedback>
  );

  useEffect(() => {
    sethandle();
  }, [instagram]);

  // Loop through each service
  for (const service of currentBasket) {
    // Loop through each sub-service
    for (const subService of service) {
      // Get the price of the sub-service
      total += subService.price;

      // Loop through any extras and add their price to the total
      for (const extra of subService.extras) {
        total += extra.price;
      }
    }
  }

  useEffect(() => {
          console.log("hello"+ currentBasket.length);
    if (currentVendor === docId && currentBasket.length > 0) {

      setshowCheckout(true);
    } else {
      setshowCheckout(false);
    }
  }, [currentVendor, docId]);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');

        return;
      }

      const currentAddress = await Location.reverseGeocodeAsync({ latitude: lat, longitude: long });
      setAddress(currentAddress[0].name);
    })();
  }, [setAddress]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(database, 'vendors', docId, 'services'));
      const servicesArray = querySnapshot.docs.map((doc) => {
        const name = doc.get('name');
        const category = doc.get('category');
        const description = doc.get('description');
        const duration = doc.get('duration');
        const price = doc.get('price');
        const serviceId = doc.id;
        return { name, category, description, duration, price, serviceId };
      });
      setServices(servicesArray);
    };

    const unsubscribe = onSnapshot(collection(database, 'vendors', docId, 'services'), (snapshot) => {
      fetchData();
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const groupedServices = services.reduce((groups, service) => {
    const { category } = service;
    groups[category] = groups[category] || [];
    groups[category].push(service);
    return groups;
  }, {});

  const [infoPressed, setInfoPressed] = useState(false);
  const [servicesPressed, setServicesPressed] = useState(true);

  const PressService = ({ name, price, duration, description, notes, serviceId }) => {
    navigation.navigate(SCREENS.PRESS_SERVICE, {
      name,
      price,
      description,
      duration,
      notes,
      docId,
      serviceId,
    });
  };

  const handleInfoPress = () => {
    setInfoPressed(true);
    setServicesPressed(false);
  };

  const callPhone = () => {
    Linking.openURL(`tel:${phone}`);
  };

  const openInsta = () => {
    Linking.openURL(`https://www.instagram.com/${ighandle}`);
  };

  const handleServicesPress = () => {
    setServicesPressed(true);
    setInfoPressed(false);
  };

  const expandLocation = () => {
    setShowLoc(!showLoc);
  };

  const expandPhotos = () => {
    setShowPhotos(!showPhotos);
  };

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'Services', title: 'Services' },
    { key: 'Information', title: 'Information' },
  ]);

  const renderScene = SceneMap({
    Services: () => <ServicesTab />,
    Information: () => <InfoTab />,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      renderLabel={({ route }) => <Text style={[styles.PoppinsMed, { fontSize: 18 }]}>{route.title}</Text>}
      indicatorStyle={{ backgroundColor: 'black' }}
      style={{ backgroundColor: 'white' }}
    />
  );

  const ServicesTab = () => {
    return (
      <ScrollView className="ml-5 mt-2">
        {Object.entries(groupedServices).map(([categoryName, categoryServices], index) => (
          <View key={categoryName}>
            <Text
              style={styles.PoppinsMed}
              className="text-lg mt-1 mb-1">
              {categoryName}
            </Text>
            {categoryServices.map((service) => (
              <TouchableOpacity
                onPress={() =>
                  PressService({
                    name: service.name,
                    price: service.price,
                    duration: service.duration,
                    description: service.description,
                    notes: service.notes,
                    serviceId: service.serviceId,
                  })
                }
                key={service.name}>
                <Text
                  style={styles.PoppinsReg}
                  className="text-base">
                  {service.name}
                </Text>
                <Text
                  style={styles.PoppinsMed}
                  className="text-sm">
                  {service.price ? `£${parseFloat(service.price).toFixed(2)}` : 'Price not available'}
                </Text>
                <Text
                  style={[styles.PoppinsLight, { maxWidth: '95%' }]}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  className="text-sm text-gray-600">
                  {service.description}
                </Text>
                <Text
                  style={styles.PoppinsLight}
                  className="text-sm text-gray-500 mb-2">
                  {service.duration ? `${service.duration}min` : null}
                </Text>
              </TouchableOpacity>
            ))}
            {index < Object.entries(groupedServices).length - 1 && (
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 3, marginBottom: 3 }}>
                <View
                  style={{
                    flex: 0.95,
                    height: 1,
                    backgroundColor: 'lightgray',
                    alignSelf: 'center',
                    justifyContent: 'center',
                    marginTop: 3,
                    marginBottom: 1,
                  }}
                />
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    );
  };

  const InfoTab = () => {
    return (
      <ScrollView className="ml-5">
        <View className="flex flex-row items-center justify-center self-start mb-1 mt-2">
          <Icon
            style={styles.pinIcon}
            type="entypo"
            name="pin"
            color="black"
            size={20}
          />
          <Text
            style={styles.PoppinsMed}
            className="text-lg ">
            Pinned Message:
          </Text>
        </View>
        <View>
          <Text style={styles.Pinnedtext}>{pinMsg}</Text>
        </View>
        <View className="flex flex-row items-center justify-center self-start mt-2">
          {mobile ? (
            <View className="flex flex-row items-center justify-center self-start mb-1 mt-1 mr-1">
              <Icon
                type="font-awesome-5"
                name="car-alt"
                color="black"
                size={22}
              />
              <Text
                style={mobileActive ? { ...styles.PoppinsLight, color: 'green' } : styles.PoppinsLight}
                className="text-sm">
                {''} (Mobile)
              </Text>
            </View>
          ) : null}
          {shop ? (
            <View className="flex flex-row items-center justify-center self-start mb-1 mt-1 mr-1 ">
              <Icon
                type="entypo"
                name="shop"
                color="black"
                size={22}
              />
              <Text
                style={shopActive ? { ...styles.PoppinsLight, color: 'green' } : styles.PoppinsLight}
                className="text-sm">
                {''} (In Shop)
              </Text>
            </View>
          ) : null}

          {home ? (
            <View className="flex flex-row items-center justify-center self-start mb-1 mt-1 mr-1">
              <Icon
                type="ionicon"
                name="home"
                color="black"
                size={22}
              />
              <Text
                style={homeActive ? { ...styles.PoppinsLight, color: 'green' } : styles.PoppinsLight}
                className="text-sm">
                {''} (Home/Studio)
              </Text>
            </View>
          ) : null}
        </View>
        <Text
          style={styles.PoppinsLight}
          className="text-sm text-gray-600">
          *This user is not taking walkins. (bookings only)
        </Text>

        {walkins ? (
          <Text
            style={styles.PoppinsReg}
            className="text-sm mt-1 ">
            HELLO
          </Text>
        ) : null}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, marginBottom: 5 }}>
          <View
            style={{
              flex: 0.95,
              height: 1,
              backgroundColor: 'lightgray',
              alignSelf: 'center',
              justifyContent: 'center',
              marginTop: 5,
              marginBottom: 5,
            }}
          />
        </View>

        <TouchableOpacity onPress={expandLocation}>
          <View className="flex flex-row items-center justify-between ">
            <View className="flex flex-row items-center justify-center mb-2 self-start">
              <Icon
                type="entypo"
                name="location"
                color="black"
                size={23}
                style={styles.locationIcon}
              />
              <Text
                style={styles.PoppinsMed}
                className="text-lg mt-3">
                Location & Hours
              </Text>
            </View>
            <Icon
              type="ionicon"
              name="expand-sharp"
              color="black"
              size={25}
              style={styles.expandIcon}
            />
          </View>
        </TouchableOpacity>

        {showLoc ? (
          <View>
            <MapView
              initialRegion={{
                latitude: lat,
                longitude: long,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,
              }}
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              scrollEnabled={false} // Disable map panning
              zoomEnabled // Enable zooming
            >
              <Marker
                coordinate={{ latitude: lat, longitude: long }}
                markerStyle={styles.marker}
              />
            </MapView>
            <Text
              style={styles.PoppinsMed}
              className="text-lg ">
              {Address}
            </Text>
            <Text
              style={styles.PoppinsLight}
              className="text-base ">
              {distance} Miles away
            </Text>
            <Text
              style={styles.PoppinsLight}
              className="text-lg">
              Updated Hours:
            </Text>

            <Text
              style={styles.PoppinsMed}
              className="text-l">
              Monday: {''}
              <Text style={styles.PoppinsReg}>
                {updatedHours.monStart && updatedHours.monEnd
                  ? `${updatedHours.monStart}-${updatedHours.monEnd}`
                  : null}
              </Text>
            </Text>
            <Text
              style={styles.PoppinsMed}
              className="text-l">
              Tuesday: {''}
              <Text style={styles.PoppinsReg}>
                {updatedHours.tueStart && updatedHours.tueEnd
                  ? `${updatedHours.tueStart}-${updatedHours.tueEnd}`
                  : null}
              </Text>
            </Text>
            <Text
              style={styles.PoppinsMed}
              className="text-l">
              Wednesday: {''}
              <Text style={styles.PoppinsReg}>
                {updatedHours.wedStart && updatedHours.wedEnd
                  ? `${updatedHours.wedStart}-${updatedHours.wedEnd}`
                  : null}
              </Text>
            </Text>
            <Text
              style={styles.PoppinsMed}
              className="text-l">
              Thursday: {''}
              <Text style={styles.PoppinsReg}>
                {updatedHours.thuStart && updatedHours.thuEnd
                  ? `${updatedHours.thuStart}-${updatedHours.thuEnd}`
                  : null}
              </Text>
            </Text>
            <Text
              style={styles.PoppinsMed}
              className="text-l">
              Friday: {''}
              <Text style={styles.PoppinsReg}>
                {updatedHours.friStart && updatedHours.friEnd
                  ? `${updatedHours.friStart}-${updatedHours.friEnd}`
                  : null}
              </Text>
            </Text>
            <Text
              style={styles.PoppinsMed}
              className="text-l">
              Saturday: {''}
              <Text style={styles.PoppinsReg}>
                {updatedHours.satStart && updatedHours.satEnd
                  ? `${updatedHours.satStart}-${updatedHours.satEnd}`
                  : null}
              </Text>
            </Text>
            <Text
              style={styles.PoppinsMed}
              className="text-l">
              Sunday: {''}
              <Text style={styles.PoppinsReg}>
                {updatedHours.sunstart && updatedHours.sunEnd
                  ? `${updatedHours.sunstart}-${updatedHours.sunEnd}`
                  : null}
              </Text>
            </Text>
          </View>
        ) : null}

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, marginBottom: 5 }}>
          <View
            style={{
              flex: 0.95,
              height: 1,
              backgroundColor: 'lightgray',
              alignSelf: 'center',
              justifyContent: 'center',
              marginTop: 5,
              marginBottom: 5,
            }}
          />
        </View>

        <TouchableOpacity onPress={expandPhotos}>
          <View className="flex flex-row items-center justify-between ">
            <View className="flex flex-row items-center justify-center mb-2 self-start">
              <Icon
                type="font-awesome"
                name="photo"
                color="black"
                size={23}
                style={styles.locationIcon}
              />
              <Text
                style={styles.PoppinsMed}
                className="text-lg">
                Photos
              </Text>
            </View>
            <Icon
              type="ionicon"
              name="expand-sharp"
              color="black"
              size={25}
              style={styles.expandIcon}
            />
          </View>
        </TouchableOpacity>

        {showPhotos ? (
          <View>
            <View style={styles.carouselContainer}>
              <FlatList
                horizontal
                data={carouselData}
                renderItem={renderCarouselItem}
                keyExtractor={(item) => item.id.toString()}
                showsHorizontalScrollIndicator={false}
              />
            </View>

            <Text
              className="mt-2"
              style={styles.PoppinsMed}>
              Show all
            </Text>
          </View>
        ) : null}

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
          <View
            style={{
              flex: 0.95,
              height: 1,
              backgroundColor: 'lightgray',
              alignSelf: 'center',
              justifyContent: 'center',
              marginTop: 5,
              marginBottom: 5,
            }}
          />
        </View>

        {instagram ? (
          <TouchableOpacity onPress={openInsta}>
            <View className="flex flex-row items-center justify-center self-start mt-2">
              <Icon
                style={styles.instagramIcon}
                type="antdesign"
                name="instagram"
                color="black"
                size={28}
              />
              <Text
                className="ml-2 text-sm"
                style={styles.PoppinsReg}>
                {instagram}
              </Text>
            </View>
          </TouchableOpacity>
        ) : null}

        {phone ? (
          <TouchableOpacity onPress={callPhone}>
            <View className="flex flex-row items-center justify-center self-start mt-2">
              <Icon
                style={styles.phoneIcon}
                type="font-awesome"
                name="phone"
                color="black"
                size={28}
              />

              <Text
                className="ml-2 text-sm"
                style={styles.PoppinsReg}>
                {phone}
              </Text>
            </View>
          </TouchableOpacity>
        ) : null}

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
          <View
            style={{
              flex: 0.95,
              height: 1,
              backgroundColor: 'lightgray',
              alignSelf: 'center',
              justifyContent: 'center',
              marginTop: 5,
              marginBottom: 5,
            }}
          />
        </View>

        <View className="flex flex-row items-center justify-center self-start">
          <Text
            style={styles.PoppinsLight}
            className="text-s text-gray-600">
            Health and safety verified
          </Text>
          <Icon
            style={styles.verifiedIcon}
            type="material"
            name="verified"
            color="green"
            size={22}
          />
        </View>
        <Text
          style={styles.PoppinsLight}
          className="text-s text-gray-600">
          Fully compliant with hygiene standards.
        </Text>
        <Text
          style={styles.PoppinsLight}
          className="text-s text-gray-600">
          5 years experience barbering
        </Text>
        <Text
          style={styles.PoppinsLight}
          className="text-s text-gray-600">
          This user has a {''}
          <Text
            style={styles.PoppinsMed}
            className="text-s text-blue-600">
            £10.00 {''}
          </Text>
          Flat Rate cancellation fee
        </Text>
        <Text
          style={styles.PoppinsLight}
          className="text-s text-gray-600">
          This user has a {''}
          <Text
            style={styles.PoppinsMed}
            className="text-s text-blue-600">
            20% {''}
          </Text>
          Late fee
        </Text>
        <Text
          style={styles.PoppinsLight}
          className="text-s text-gray-600">
          Fully Insured
        </Text>
        <Text
          style={styles.PoppinsLight}
          className="text-sm  ">
          Specialises in:
          <Text
            className="text-sm "
            style={styles.PoppinsMed}>
            Afro, Fades, Caucasian.
          </Text>
        </Text>
      </ScrollView>
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.root}>
        <View className="flex flex-row ml-5 mb-3">
          <Image
            source={require('../../assets/images/bizlogo.jpg')}
            style={styles.image}
          />
          <View className="flex flex-col ml-5">
            <Text
              style={[styles.PoppinsMed, { width: 200 }]}
              className="text-lg mt-5">
              {name}
            </Text>
            <Text
              style={styles.PoppinsLight}
              className="text-sm text-gray-500">
              {username}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {[...Array(fullStars)].map((_, i) => (
                <Icon
                  key={i}
                  type="font-awesome"
                  name="star"
                  color="black"
                  size={16}
                />
              ))}
              {halfStar && (
                <Icon
                  type="font-awesome"
                  name="star-half"
                  color="black"
                  size={16}
                />
              )}
              {[...Array(emptyStars)].map((_, i) => (
                <Icon
                  key={i}
                  type="font-awesome"
                  name="star-o"
                  color="black"
                  size={16}
                />
              ))}
              <Text style={styles.PoppinsMed}> {rating.toFixed(1)} (140)</Text>
            </View>
            <View className="flex flex-row items-center">
              <View style={styles.circle} />
              <Text
                className="text-base "
                style={styles.PoppinsLight}>
                Active Now
              </Text>
            </View>
          </View>
        </View>

        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
          renderTabBar={renderTabBar}
        />

        {showCheckout && (
          <Button
            titleStyle={styles.PoppinsReg}
            onPress={pressContinue}
            title={`Continue (£${total.toFixed(2)})`}
            color="black"
            containerStyle={{
              width: WIDTH - 120,
              borderRadius: 10,
              alignSelf: 'center',
              justifyContent: 'center',
            }}
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'white',
    flex: 1,
  },

  image: {
    aspectRatio: 1,
    width: '40%',
    height: '40%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 100,
    marginTop: 5,
  },

  locationIcon: {
    marginRight: 5,
  },

  expandIcon: {
    marginRight: 20,
  },

  clickers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  PoppinsReg: {
    fontFamily: 'PoppinsReg',
  },

  PoppinsLight: {
    fontFamily: 'PoppinsLight',
  },

  PoppinsBold: {
    fontFamily: 'PoppinsBold',
  },

  PoppinsMed: {
    fontFamily: 'PoppinsMed',
  },

  underline: {
    textDecorationLine: 'underline',
  },

  circle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'green',
    marginLeft: 4,
    marginRight: 4,
  },

  verifiedIcon: {
    marginLeft: 3,
  },

  phoneIcon: {
    alignSelf: 'flex-start',
    marginLeft: 3,
  },

  marker: {
    color: 'black',
    backgroundColor: 'black', // Change marker background color
    borderRadius: 10, // Adjust marker border radius
    padding: 5, // Adjust marker padding
  },

  pinIcon: {
    alignSelf: 'flex-start',
    marginTop: 10,
    marginBottom: 5,
  },

  instagramIcon: {
    alignSelf: 'flex-start',
  },

  displayImage: {
    width: WIDTH * 0.8,
    height: 300,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 0,
    marginTop: 5,
    marginRight: 8,
  },

  map: {
    width: WIDTH - 40,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    height: 150,
    marginBottom: 5,
  },

  Pinnedtext: {
    fontFamily: 'PoppinsReg',
    maxWidth: '95%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#CFCFCF',
    backgroundColor: '#F6F6F6',
    padding: 5,
  },
  backIcon: {
    alignSelf: 'flex-start',
    marginLeft: 5,
  },
});

export default PressProfile;
