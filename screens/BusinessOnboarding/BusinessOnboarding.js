import { StyleSheet, View, FlatList, Animated } from 'react-native';
import React, { useState, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import OnboardingItem from '../../components/OnboardingItem';
import Onboardingpaginator from '../../components/Onboardingpaginator';
import OnboardingButton from '../../components/OnboardingButton';
import BackNavigation from '../../components/BackNavigation/BackNavigation';

const BusinessOnboarding = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setcurrentIndex] = useState(0);
  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setcurrentIndex(viewableItems[0].index);
  }).current;

  const scrollTo = () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      console.log('Last item.');
    }
  };

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const slides = [
    // images that go into the carousel
    {
      id: '1',
      title: 'Welcome to Survd!',
      description:
        'Discover the freedom of independent work. Set your hours, decide your prices, and offer services at a time & place that work best for you.',
      image: require('../../assets/images/placeholder.png'),
    },
    {
      id: '2',
      title: 'Create Your Profile',
      description:
        'Make a unique profile featuring your services, availability, and pricing. Showcase your skills and reviews to attract potential clients.',
      image: require('../../assets/images/placeholder.png'),
    },
    {
      id: '3',
      title: 'Set Your Schedule',
      description:
        'Manage your appointments with ease thanks to our intuitive calendar software. Say goodbye to scheduling conflicts and say hello to streamlined operations.',
      image: require('../../assets/images/placeholder.png'),
    },
    {
      id: '4',
      title: 'Low Fees.',
      description:
        'Joining Survd is free! Get approved fast. A low 3.5% fee on card payments, with freedom to accept other forms of payments. Survd puts you in control.',
      image: require('../../assets/images/placeholder.png'),
    },
  ];

  return (
    <SafeAreaView style={styles.root}>
      <View className="self-start">
        <BackNavigation />
      </View>

      <View style={{ flex: 4 }}>
        <FlatList
          data={slides}
          renderItem={({ item }) => <OnboardingItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
            useNativeDriver: false,
          })}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>

      <Onboardingpaginator
        data={slides}
        scrollX={scrollX}
      />

      <OnboardingButton
        scrollTo={scrollTo}
        percentage={(currentIndex + 1) * (100 / slides.length)}
      />
    </SafeAreaView>
  );
};

export default BusinessOnboarding;

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
