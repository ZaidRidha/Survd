import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import React from 'react';

const WIDTH = Dimensions.get('window').width;
// const HEIGHT = Dimensions.get('window').height;

const OnboardingItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <Image
        source={item.image}
        style={styles.image}
      />
      <View style={{ flex: 0.5 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
};

export default OnboardingItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: WIDTH,
  },

  image: {
    width: WIDTH,
    height: 300,
    justifyContent: 'center',
  },

  title: {
    fontFamily: 'PoppinsMed',
    textAlign: 'center',
    fontSize: 28,
    marginBottom: 16,
  },

  description: {
    fontFamily: 'PoppinsLight',
    textAlign: 'center',
    paddingHorizontal: 15,
  },
});
