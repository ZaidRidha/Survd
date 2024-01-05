import { StyleSheet, View, Animated, Dimensions } from 'react-native';
import React from 'react';

const WIDTH = Dimensions.get('window').width;
// const HEIGHT = Dimensions.get('window').height;

const Onboardingpaginator = ({ data, scrollX }) => {
  return (
    <View style={{ flexDirection: 'row', height: 64 }}>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * WIDTH, i * WIDTH, (i + 1) * WIDTH];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            style={[styles.dot, { width: dotWidth, opacity }]}
            // eslint-disable-next-line react/no-array-index-key
            key={i}
          />
        );
      })}
    </View>
  );
};

export default Onboardingpaginator;

const styles = StyleSheet.create({
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: 'black',
    marginHorizontal: 8,
  },
});
