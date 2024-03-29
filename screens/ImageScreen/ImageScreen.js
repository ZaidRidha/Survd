import { StyleSheet, Text, View, Dimensions, FlatList, Image, TouchableWithoutFeedback } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState, useRef } from 'react';
import { Icon } from '@rneui/themed';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

const WIDTH = Dimensions.get('window').width;

const ImageScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { carouselData, index } = route.params;
  const [currentIndex, setCurrentIndex] = useState(index);
  const flatListRef = useRef(null);

  useEffect(() => {
    // Scroll to the initial index when the component mounts
    flatListRef.current.scrollToIndex({ animated: false, index: currentIndex });
  }, []);

  const renderImageItem = ({ item }) => (
    <View style={styles.imageContainer}>
      <Image
        source={item.image} // Access the uri via item.image
        style={styles.image}
      />
    </View>
  );

  const goBack = () => {
    navigation.goBack();
  };

  const getItemLayout = (_, index) => ({
    length: WIDTH,
    offset: WIDTH * index,
    index,
  });

  const handleScroll = (event) => {
    const { contentOffset } = event.nativeEvent;
    const index = Math.round(contentOffset.x / WIDTH);
    setCurrentIndex(index);
  };

  const handleScrollEnd = (event) => {
    const { contentOffset } = event.nativeEvent;
    const index = Math.round(contentOffset.x / WIDTH);
    setCurrentIndex(index);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.root}>
        <TouchableWithoutFeedback onPress={goBack}>
          <View className="items-center flex flex-row">
            <Icon
              type="entypo"
              name="chevron-left"
              color="white"
              size={42}
            />
            <Text className="text-white self-center">
              Photos ({currentIndex + 1}/{carouselData.length})
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <FlatList
          ref={flatListRef}
          data={carouselData}
          renderItem={renderImageItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={WIDTH} // Snap to each item's width
          decelerationRate="fast" // Snap instantly without deceleration
          initialScrollIndex={index} // Start at the specified index
          getItemLayout={getItemLayout} // Provide item layout information
          onScroll={handleScroll} // Set the current index while scrolling
          onScrollEndDrag={handleScrollEnd} // Set the current index when scrolling ends
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'black',
    flex: 1,
  },
  imageContainer: {
    justifyContent: 'center',
    width: WIDTH,
  },
  image: {
    width: WIDTH,
    height: 320, // Adjust the height according to your image requirements
  },
});

export default ImageScreen;
