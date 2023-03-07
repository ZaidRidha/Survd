import { View, Text,StyleSheet,Image,FlatList,ImageBackground } from 'react-native'
import React, {useState,useRef} from 'react'
import useFont from '../../useFont';
import { Icon } from '@rneui/themed';
import Carousel, { Pagination } from 'react-native-snap-carousel';









const BarberCard = ({name}) => {
  const [activeIndex, setActiveIndex] = useState(0); //current index of the carousel


  const carouselData = [ //images that go into the carousel
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
  ];

  const handleSnapToItem = (index) => {
    setActiveIndex(index);
  };





  useFont();
  return (
    <View style={styles.container} className = "mb-5">

      <View >
      <Text className = "text-2xl" style = {styles.figsemibold}>{name} </Text>
      <Text className = "text-sm text-gray-700 " style = {styles.figlight}>@{name}thedon3 </Text>
      </View>
 
      <View className = "flex flex-row items-center justify-between">

      <View className = "flex flex-row items-center">
      <View style={styles.circle}></View>
      <Text className = "text-lg" style = {styles.figreg}>Active Now </Text>
      </View>

      <View className = "flex flex-row items-center">
      <Icon type="entypo" name="shop" color="black" size={22} />
      <Text className = "text-2xl" style = {styles.figsemibold}>/</Text>
      <Icon type='font-awesome-5' name="car-alt" color="black" size={22} />
      </View>
      
      </View>

      <FlatList
      data={carouselData}
      keyExtractor={(item) => item.id.toString()}
      pagingEnabled
      horizontal
      showsHorizontalScrollIndicator = {false}
      removeClippedSubviews={true}
      bounces = {false}
      onMomentumScrollEnd={(event) => {
        const index = event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width;
        handleSnapToItem(index);
      }}
      renderItem={({ item }) => (
      <View style = {styles.imgcontainer}> 
      <Image
      source={item.image}
      style={styles.image}
      />
      <View style={styles.paginatorContainer}>
      <Pagination
      dotsLength={carouselData.length}
      containerStyle={{ paddingVertical: 10 }}
      dotStyle={styles.dotStyle}
      inactiveDotOpacity={0.4}
      inactiveDotScale={0.6}
      activeDotIndex={activeIndex}

      />
      </View>
      </View>
      )}

      />


 
      <View className = "flex flex-row items-center justify-between">
      <Text className = "text-base" style = {styles.figreg}>££ · Fades · Afro · Caucasian</Text>
      <Text className = "text-base" style = {styles.figlight}>★5.0 (135)</Text>
      </View>
      <Text className = "text-sm " style = {styles.figlight}>Est. Waiting time: <Text className = "text-sm text-blue-600">32 Mins</Text></Text>
      <Text className = "text-sm text-gray-500" style = {styles.figlight}>3.1mi</Text>
 
    </View>
  );
};

const styles = StyleSheet.create({
  
  container: {
    backgroundColor: '#fff',
  },

  imgcontainer: {
    aspectRatio: 1,
    borderRadius: 10,
    borderColor: 'lightgray',
    marginTop:1,
    marginBottom:5,
    borderWidth: 1,
    width: 340,
    height: 340,
    position: 'relative',
  },

  paginatorContainer: {
    position: 'absolute',
    bottom: 5,
    width: '100%',
    alignItems:'center'
  },



  image: {
    width:'100%',
    height: '100%',
    borderRadius:10,
  },
  name: {
    fontSize: 16,
    marginTop: 10,
  },

  figsemibold:{
    fontFamily:"PoppinsBold"
  },
  figlight:{
    fontFamily:"PoppinsLight"
  },
  figreg:{
    fontFamily:"PoppinsLight"
  },

  circle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'green',
    marginLeft: 4,
    marginRight:4
  },

  dotStyle:{
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#BEBEBE',

  }
});

export default BarberCard;