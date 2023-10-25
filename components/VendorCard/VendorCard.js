import { View, Text, StyleSheet, Image, FlatList, Pressable, Dimensions } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { SCREENS } from 'navigation/navigationPaths';

const HEIGHT = 270;
const WIDTH = Dimensions.get('window').width;

const VendorCard = ({ cardData }) => {
  const navigation = useNavigation();
  const [iconColor, setIconColor] = useState('darkgray');
  const [iconType, setIconType] = useState('heart-outline');
  const [isLive, setIsLive] = useState(false);
  // gathering variables from the data
  const { liveHome } = cardData;
  const { liveMobile } = cardData;
  const { liveShop } = cardData;
  const { name } = cardData;
  const { username } = cardData;
  const lat = cardData.latitude;
  const long = cardData.longitude;
  const { distance } = cardData;
  const { instagram } = cardData;
  const { phone } = cardData;
  const { mobile } = cardData;
  const { home } = cardData;
  const { shop } = cardData;
  const { pinMsg } = cardData;
  const { docId } = cardData;
  const mobileActive = cardData.mobileActive;
  const shopActive = cardData.shopActive;
  const homeActive = cardData.homeActive;
  const { updatedHours } = cardData;
  const { walkins } = cardData;
  const { onbreak } = cardData;
  const { unavailable } = cardData;
  const { rating } = cardData;

  useEffect(() => {
    if (liveHome || liveMobile || liveShop) {
      setIsLive(true);
    } else {
      setIsLive(false);
    }
  }, [liveHome, liveMobile, liveShop]);

  const handleFavoriteItemClicked = () => {
    const newColor = iconColor === 'darkgray' ? '#C92727' : 'darkgray';
    const newType = iconType === 'heart-outline' ? 'heart' : 'heart-outline';
    setIconColor(newColor);
    setIconType(newType);
  };

  const images = [
    // images that go into the carousel
    {
      image: require('../../assets/images/bizlogo.jpg'),
    },
    {
      image: require('../../assets/images/fade2.jpg'),
    },
    {
      image: require('../../assets/images/fade3.jpg'),
    },
    {
      image: require('../../assets/images/hdfade.jpg'),
    },
  ];

  const openProfile = () => {
    navigation.navigate(SCREENS.PRESS_PROFILE, {
      name,
      username,
      lat,
      long,
      distance,
      instagram,
      phone,
      mobile,
      home,
      shop,
      pinMsg,
      docId,
      mobileActive,
      shopActive,
      homeActive,
      isLive,
      updatedHours,
      walkins,
      rating,
    });
  };

  const flatListRef = useRef(null);
  const viewConfigRef = { viewAreaCoveragePercentThreshold: 95 };
  const [activeIndex, setActiveIndex] = useState(0);
  const onViewRef = useRef(({ changed }) => {
    if (changed[0].isViewable) {
      setActiveIndex(changed[0].index);
    }
  });

  return (
    <View
      style={styles.full}
      className="mb-8">
      <View
        style={styles.headerContainer}
        className>
        <View className="flex flex-row items-center justify-between">
          <View
            style={[{ width: 200 }]}
            className="flex flex-row items-center">
            <Text
              className="text-lg"
              style={[styles.poppinsMed]}>
              {name} {''}
            </Text>
            {/* <Icon type="entypo" name="scissors" color="black" size={18} /> */}
          </View>

          <View>
            <View className="flex flex-row items-center">
              <View
                style={[
                  styles.circle,
                  walkins && { backgroundColor: 'purple' },
                  onbreak ? { backgroundColor: '#FFD700' } : unavailable ? { backgroundColor: 'gray' } : null,
                ]}
              />

              <Text
                style={[
                  styles.figreg,
                  unavailable && { color: 'gray' },
                  walkins && { color: 'purple' },
                  onbreak && { color: '#FFD700' },
                  !unavailable && !onbreak && !walkins && { color: 'green' },
                ]}>
                {unavailable
                  ? 'Offline'
                  : onbreak
                  ? 'On Break'
                  : walkins
                  ? 'Walk Ins '
                  : isLive
                  ? 'Live Now'
                  : 'Active Now'}
              </Text>
            </View>
          </View>
        </View>

        <View className="flex flex-row items-center justify-between">
          <Text
            className="text-sm text-gray-700  "
            style={styles.figlight}>
            {username}
          </Text>

          <View className="flex flex-row items-center">
            {mobile && mobileActive && (
              <Icon
                type="ionicon"
                name="car-outline"
                color={walkins ? 'purple' : 'green'}
                size={18}
              />
            )}
            {shop && shopActive && (
              <>
                {mobileActive && <Text style={{ fontSize: 14 }}> / </Text>}
                <Icon
                  type="material"
                  name="storefront"
                  color={walkins ? 'purple' : 'green'}
                  size={16}
                />
              </>
            )}

            {home && homeActive && (
              <>
                {(mobileActive || shopActive) && <Text style={{ fontSize: 14 }}> / </Text>}
                <Icon
                  type="antdesign"
                  name="home"
                  color={walkins ? 'purple' : 'green'}
                  size={16}
                />
              </>
            )}

            {mobile && !mobileActive && (
              <>
                {(shopActive || homeActive) && <Text style={{ fontSize: 14 }}> / </Text>}
                <Icon
                  type="ionicon"
                  name="car-outline"
                  color="black"
                  size={18}
                />
              </>
            )}
            {shop && !shopActive && (
              <>
                {(mobileActive || homeActive || (mobile && !mobileActive)) && <Text style={{ fontSize: 14 }}> / </Text>}
                <Icon
                  type="material"
                  name="storefront"
                  color="black"
                  size={16}
                />
              </>
            )}
            {home && !homeActive && (
              <>
                {(mobileActive || shopActive || (mobile && !mobileActive) || (shop && !shopActive)) && (
                  <Text style={{ fontSize: 14 }}> / </Text>
                )}
                <Icon
                  type="antdesign"
                  name="home"
                  color="black"
                  size={16}
                />
              </>
            )}
          </View>
        </View>
      </View>

      <View style={styles.cardContainer}>
        <Pressable
          onPress={handleFavoriteItemClicked}
          style={styles.favoriteContainer}>
          <Icon
            type="ionicon"
            name={iconType}
            color={iconColor}
            size={24}
          />
        </Pressable>
        {/* Images */}
        <FlatList
          data={images}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          ref={(ref) => {
            flatListRef.current = ref;
          }}
          snapToAlignment="center"
          pagingEnabled
          bounces={false}
          viewabilityConfig={viewConfigRef}
          onViewableItemsChanged={onViewRef.current}
          renderItem={({ item }) => (
            <Pressable
              onPress={openProfile}
              style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={item.image}
              />
            </Pressable>
          )}
        />
        {/*  Dot Container */}
        {images.length > 1 && (
          <View style={styles.dotContainer}>
            {images.map((_, index) => (
              <View
                key={index}
                style={[
                  {
                    opacity: index === activeIndex ? 1 : 0.5,
                  },
                  styles.dot,
                ]}
              />
            ))}
          </View>
        )}

        <View className="flex flex-row items-center justify-between mt-1">
          <Text
            className="text-sm"
            style={styles.figlight}>
            {isLive ? (
              <>
                Est. Waiting time :
                <Text
                  className="text-sm text-blue-600"
                  style={styles.figreg}>
                  32 Mins
                </Text>
              </>
            ) : walkins ? (
              <Text
                className="text-sm"
                style={styles.figreg}>
                Capacity:
                <Text
                  className="text-sm text-red-600"
                  style={styles.poppinsMed}>
                  BUSY
                </Text>
              </Text>
            ) : (
              <>
                Next Appointment :
                <Text
                  className="text-sm text-blue-600"
                  style={styles.figreg}>
                  {''} 14:00
                </Text>
              </>
            )}
          </Text>

          <View className="flex flex-row items-center">
            <Icon
              className="mb-2"
              type="font-awesome"
              name="star"
              color="black"
              size={13}
            />
            <Text
              className="text-sm"
              style={styles.figlight}>
              {''} {rating} {''}
              <Text
                className="text-sm"
                style={styles.figreg}>
                (135)
              </Text>
            </Text>
          </View>
        </View>

        <View className="flex flex-row items-center justify-between ">
          <Text
            className="text-sm"
            style={styles.figreg}>
            <Text
              className="text-sm text-gray-700"
              style={styles.poppinsMed}>
              vendor ·
            </Text>
            <Text
              className="text-sm text-purple-800"
              style={styles.figreg}>
              {''} After Hours {''}
            </Text>
            <Text
              className="text-sm text-gray-500"
              style={styles.figreg}>
              · Fades
            </Text>
          </Text>
          <Text
            className="text-sm "
            style={styles.figreg}>
            ££ · {''}
            <Text
              className="text-sm text-gray-500"
              style={styles.figreg}>
              {distance} mi
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 30,
  },

  cardContainer: {
    marginTop: 10,
    paddingHorizontal: 30,
    width: WIDTH,
    borderRadius: 10,
  },
  favoriteContainer: {
    position: 'absolute',
    top: 10,
    right: 40,
    zIndex: 10,
    padding: 10,
  },
  imageContainer: {
    width: WIDTH - 60,
  },
  image: {
    width: '100%',
    height: HEIGHT,
    borderRadius: 10,
  },
  dotContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    top: HEIGHT - 20,
    alignSelf: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    margin: 3,
    borderRadius: 30,
    backgroundColor: 'lightgray',
  },

  circle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'green',
    marginLeft: 4,
    marginRight: 4,
  },

  poppinsMed: {
    fontFamily: 'PoppinsMed',
  },
  figlight: {
    fontFamily: 'PoppinsLight',
  },
  figreg: {
    fontFamily: 'PoppinsReg',
  },
  textContainer: { marginTop: 10 },
  starContainer: { flexDirection: 'row' },
  starText: { marginLeft: 5 },
  heading: { fontSize: 20 },
  subheading: { fontSize: 18, marginTop: 5 },
});

export default VendorCard;
