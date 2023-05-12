import { View, Text, ScrollView, TouchableOpacity, Keyboard, Image, StyleSheet,PanResponder,SafeAreaView,Linking,FlatList,Dimensions} from 'react-native';
import React, { useState,useEffect } from 'react';
import useFont from '../../useFont';
import { Icon,Button } from '@rneui/themed';
import { useNavigation,useRoute  } from '@react-navigation/native';
import * as Location from 'expo-location';
import { doc,getDocs,query,collection,where,onSnapshot} from "firebase/firestore"; 
import { database } from '../../firebaseConfig'
import { useSelector,useDispatch} from 'react-redux';
import { selectCurrentBasket,selectCurrentVendor } from '../../slices/locSlice';
import { setcurrentBasket,clearBasket } from '../../slices/locSlice';
import { LinearGradient } from 'expo-linear-gradient';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';

const WIDTH = Dimensions.get("window").width;

const PressProfile = ({}) => {
  const [services, setServices] = useState([]);
  const[Address,setAddress] = useState("");
  const [showCheckout, setshowCheckout] = useState(false);
  const [showLoc, setShowLoc] = useState(false);
  const [showPhotos, setShowPhotos] = useState(false);
  const [ighandle, setigHandle] = useState(" ");

  const navigation = useNavigation();
  useFont();
  const route = useRoute();
  const { name, username, distance, lat, long,instagram,phone,mobile,shop,home,pinmsg,docId} = route.params;
  const currentBasket = useSelector(selectCurrentBasket);
  const currentVendor = useSelector(selectCurrentVendor);
  let total = 0;

  const sethandle = () => {
    if (instagram) {
      const handle = instagram.replace(/^@/, '');
      setigHandle(handle);
      return ighandle;
    } else {
      return null;
    }
  };

  const pressContinue = () => {
    navigation.navigate("ContinueScreen", {
      lat: lat,
      long: long,

    })
  }

  const renderCarouselItem = ({ item }) => (
    <Image source={item.image} style={styles.displayImage} />
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
    if (currentVendor === docId && currentBasket.length > 0) {
      setshowCheckout(true);
    } else {
      setshowCheckout(false);
    }
  }, [currentVendor, docId]);



  useEffect(() => {

    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        
        return;
      }

      let currentAddress = await Location.reverseGeocodeAsync({ latitude: lat, longitude: long })
      setAddress(currentAddress[0].name);

      
    })();
  }, [setAddress]);


  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(database, "barbers", docId, "services"));
      const servicesArray = querySnapshot.docs.map((doc) => {
        const name = doc.get("name");
        const category = doc.get("category");
        const description = doc.get("description");
        const duration = doc.get("duration");
        const price = doc.get("price");
        const notes = doc.get("notes");
        const serviceId = doc.id;
        return { name, category, description, duration, price,notes,serviceId };
      });
      setServices(servicesArray);
    };
  
    const unsubscribe = onSnapshot(collection(database, "barbers", docId, "services"), (snapshot) => {
      fetchData();
    });
  
    return () => {
      unsubscribe();
    };
  }, []);


  
  const groupedServices = services.reduce((groups, service) => {
    const category = service.category;
    groups[category] = groups[category] || [];
    groups[category].push(service);
    return groups;
  }, {});


  const [infoPressed, setInfoPressed] = useState(false);
  const [servicesPressed, setServicesPressed] = useState(true);
  
  const PressService = ({name,price,duration,description,notes,serviceId}) => {
    navigation.navigate("PressService", {
      name: name,
      price: price,
      description: description,
      duration: duration,
      notes: notes,
      docId: docId,
      serviceId: serviceId,
    });
  };

  const handleInfoPress = () => {
    setInfoPressed(true);
    setServicesPressed(false);
  };

  const callPhone = () => {
    Linking.openURL(`tel:${phone}`)
  };

  const openInsta = () => {
    Linking.openURL(`https://www.instagram.com/${ighandle}`)
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

  {
    id: 4,
    image: require('../../assets/images/AppLogo.png'),
  },
];



  return (
    <SafeAreaView style={styles.root}>
      <View className = "flex flex-row ml-5 mb-3">
      <Image source={require('../../assets/images/bizlogo.jpg')} style={styles.image} />
      <View className = "flex flex-col ml-5">
      <Text style={[styles.PoppinsMed,{ width: 200}]}  className = "text-lg mt-5">{name}</Text>
      <Text style = {styles.PoppinsLight} className ="text-sm text-gray-500">{username}</Text>
      <View className = "flex flex-row ">
      <Icon type="font-awesome" name="star" color="#f7bf25" size={16} />
      <Icon type="font-awesome" name="star" color="#f7bf25" size={16} />
      <Icon type="font-awesome" name="star" color="#f7bf25" size={16} />
      <Icon type="font-awesome" name="star" color="#f7bf25" size={16} />
      <Icon type="font-awesome" name="star" color="#f7bf25" size={16} />
      <Text className = "text-sm " style = {styles.PoppinsMed}> 5.0 (140)</Text>
      </View>
      <View className = "flex flex-row items-center">
      <View style={styles.circle}></View>
      <Text className = "text-base " style = {styles.PoppinsLight}>Active Now </Text>
      </View>
      </View>

        </View>

      <View style={styles.clickers}>
        <TouchableOpacity onPress={handleServicesPress}>
          <Text
          className = "text-xl mx-10"
            style={[
              styles.PoppinsMed,
              servicesPressed? styles.underline : null,
  
            ]}
          >
            Services
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleInfoPress}>
          <Text
          className = "text-xl mx-10"
            style={[
              styles.PoppinsMed,
              infoPressed  ? styles.underline : null,
        
            ]}
          >
            Information
          </Text>
        </TouchableOpacity>
      </View>

      {infoPressed ? (
      <ScrollView className = "ml-5">
        <View className = "flex flex-row items-center justify-center self-start mb-1 mt-2">
        <Icon style = {styles.pinIcon} type="entypo" name="pin" color="black" size={20} />
        <Text style = {styles.PoppinsMed} className = "text-lg "> Pinned Message:</Text>
        </View>
        <View >
          <Text style = {styles.Pinnedtext}>{pinmsg}</Text>
        </View>
        <View className = "flex flex-row items-center justify-center self-start mt-2">
        {mobile ? (
          <View className = "flex flex-row items-center justify-center self-start mb-1 mt-1 mr-1">
        <Icon type='font-awesome-5' name="car-alt" color="black" size={22} />
        <Text style = {styles.PoppinsReg} className = "text-sm text-blue-800 "> (Mobile)</Text>
          </View>
      ) : null}
        {shop ? (
          <View className = "flex flex-row items-center justify-center self-start mb-1 mt-1 mr-1 ">
          <Icon type="entypo" name="shop" color="black" size={22} />
          <Text style = {styles.PoppinsReg} className = "text-sm text-green-800 "> (In Shop)</Text> 
          </View>
      ) : null}

        {home ? (
          <View className = "flex flex-row items-center justify-center self-start mb-1 mt-1 mr-1">
          <Icon type="ionicon" name="home" color="black" size={22} />
          <Text style = {styles.PoppinsReg} className = "text-sm text-purple-800"> (Vendor's Home)</Text> 
          </View>
      ) : null}
      </View>
        <Text style = {styles.PoppinsReg} className = "text-sm mt-1 ">Specialises in: </Text>
        <Text className = "text-sm " style = {styles.PoppinsLight}>Afro, Fades, Caucasian. </Text>


        {instagram? (
                <TouchableOpacity onPress={openInsta}>
                 <View className = "flex flex-row items-center justify-center self-start mt-2">
                 <Icon style = {styles.instagramIcon} type="antdesign" name="instagram" color="black" size={28} />
                 <Text className = "ml-2 text-sm" style = {styles.PoppinsReg}>{instagram}</Text>
                 </View>
                 </TouchableOpacity>
        ): null}

      {phone? (
        <TouchableOpacity onPress={callPhone}>
        <View className = "flex flex-row items-center justify-center self-start mt-2">
        <Icon style = {styles.phoneIcon} type="font-awesome" name="phone" color="black" size={28} />
        <Text className = "ml-2 text-sm" style = {styles.PoppinsReg}>{phone}</Text>
        </View>
        </TouchableOpacity>
        ): null}
        <Text className = "text-sm mt-1" style = {styles.PoppinsLight}>Estimated Waiting Time: <Text className = "text-blue-600">32 Mins</Text> </Text>
        <View style={{flexDirection: 'row', alignItems: 'center',marginTop:5,marginBottom:5}}>
        <View style={{flex: 0.95, height: 1, backgroundColor: 'lightgray', alignSelf: "center", justifyContent: "center", marginTop:5, marginBottom:5 }} />   
        </View>

        <TouchableOpacity onPress={expandLocation}>
        <View className = "flex flex-row items-center justify-between ">
        <View className = "flex flex-row items-center justify-center mb-2 self-start">
        <Icon type="entypo" name="location" color="black" size={23} style ={styles.locationIcon} />
        <Text style = {styles.PoppinsMed} className = "text-lg mt-3">Location & Hours</Text>
        </View>
        <Icon type="ionicon" name="expand-sharp" color="black" size={25} style ={styles.expandIcon} />
        </View>
        </TouchableOpacity>
        

        {showLoc? (
        <View>
        <MapView 
        initialRegion={{
          latitude: lat,
          longitude: long,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        }} 
        provider={PROVIDER_GOOGLE} style={styles.map} 
        scrollEnabled={false} // Disable map panning
        zoomEnabled={true} // Enable zooming
        >
          <Marker
          coordinate={{ latitude: lat, longitude: long }}
          markerStyle={styles.marker}
        />
      </MapView>
        <Text style = {styles.PoppinsMed} className = "text-lg ">{Address}</Text>
        <Text style = {styles.PoppinsLight} className = "text-base ">{distance} Miles away</Text>
        <Text style = {styles.PoppinsLight} className = "text-lg ">Updated Hours:</Text>
        <Text style = {styles.PoppinsReg} className = "text-l ">Mon 9-5</Text>
        <Text style = {styles.PoppinsReg} className = "text-l ">Mon 9-5</Text>
        <Text style = {styles.PoppinsReg} className = "text-l ">Mon 9-5</Text>
        <Text style = {styles.PoppinsReg} className = "text-l ">Mon 9-5</Text>
        <Text style = {styles.PoppinsReg} className = "text-l ">Mon 9-5</Text>
        </View>
        ): null}



        <View style={{flexDirection: 'row', alignItems: 'center',marginTop:5,marginBottom:5}}>
        <View style={{flex: 0.95, height: 1, backgroundColor: 'lightgray', alignSelf: "center", justifyContent: "center", marginTop:5, marginBottom:5 }} />   
        </View>
        
        <TouchableOpacity onPress={expandPhotos}>
        <View className = "flex flex-row items-center justify-between ">
        <View className = "flex flex-row items-center justify-center mb-2 self-start">
        <Icon type="font-awesome" name="photo" color="black" size={23} style ={styles.locationIcon} />
        <Text style = {styles.PoppinsMed} className = "text-lg">Photos</Text>
        </View>
        <Icon type="ionicon" name="expand-sharp" color="black" size={25} style ={styles.expandIcon} />
        </View>
        </TouchableOpacity>
        
        {showPhotos? (
        <View>
        <FlatList
        horizontal
        data={carouselData}
        renderItem={renderCarouselItem}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={true}
        
      />
        <Text className = "mt-2" style = {styles.PoppinsMed}>Show all</Text>
        </View>

        ):null}


        <View style={{flexDirection: 'row', alignItems: 'center',marginTop:5,marginBottom:5}}>
        <View style={{flex: 0.95, height: 1, backgroundColor: 'lightgray', alignSelf: "center", justifyContent: "center", marginTop:5, marginBottom:5 }} />   
        </View>
        <View className = "flex flex-row items-center justify-center self-start">
        <Text style = {styles.PoppinsLight} className = "text-s text-gray-600">Health and safety verified</Text>
        <Icon style = {styles.verifiedIcon} type="material" name="verified" color="green" size={22} />
        </View>
        <Text style = {styles.PoppinsLight} className = "text-s text-gray-600">Fully compliant with hygiene standards.</Text>
        <Text style = {styles.PoppinsLight} className = "text-s text-gray-600">5 years experience barbering</Text>
        <Text style = {styles.PoppinsLight} className = "text-s text-gray-600">This user has a £10.00 Flat Rate cancellation fee</Text>
        <Text style = {styles.PoppinsLight} className = "text-s text-gray-600">This user has a 20% Late fee</Text>
        <Text style = {styles.PoppinsLight} className = "text-s text-gray-600">Fully Insured</Text>



      </ScrollView>
    ) : null}

{servicesPressed ? (
  <ScrollView className="ml-5 mt-2">
    {Object.entries(groupedServices).map(([categoryName, categoryServices], index) => (
      <View key={categoryName}>
        <Text style={styles.PoppinsMed} className="text-lg mt-1 mb-1">
          {categoryName}
        </Text>
        {categoryServices.map((service) => (
          <TouchableOpacity onPress={() => PressService({ name: service.name, price: service.price, duration: service.duration, description: service.description, notes: service.notes, serviceId: service.serviceId})} key={service.name}>
            <Text style={styles.PoppinsReg} className="text-base">
              {service.name}
            </Text>
            <Text style={styles.PoppinsMed} className="text-sm">
              {service.price ? `£${service.price.toFixed(2)}` : "Price not available"}
            </Text>
            <Text
              style={[styles.PoppinsLight, { maxWidth: "95%" }]}
              numberOfLines={2}
              ellipsizeMode="tail"
              className="text-sm text-gray-600"
            >
              {service.description}
            </Text>
            <Text style={styles.PoppinsLight} className="text-sm text-gray-500 mb-2">
              {service.duration ? `${service.duration}min` : "Duration not available"}
            </Text>
          </TouchableOpacity>
        ))}
        {index < Object.entries(groupedServices).length - 1 && (  
        <View style={{flexDirection: 'row', alignItems: 'center',marginTop:3,marginBottom:3}}>
        <View style={{flex: 0.95, height: 1, backgroundColor: 'lightgray', alignSelf: "center", justifyContent: "center", marginTop:3, marginBottom:1 }} />   
        </View>
        )}
      </View>
    ))}
  </ScrollView>
) : null}
{showCheckout && (
  <Button
    titleStyle={styles.PoppinsReg}
    onPress={pressContinue}
    title={`Continue (£${total.toFixed(2)})`}
    color={'black'}
    containerStyle={{
      width: '75%',
      borderRadius:10,
      alignSelf: 'center',
      justifyContent: 'center',
    }}
  />
)}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'white',
    flex:1,
  },

  image: {
    aspectRatio: 1,
    width: '40%',
    height: '40%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 100,
    marginTop:5,
  },

  locationIcon:{
    marginRight:5,
  },

  expandIcon:{
    marginRight:20
  },

  clickers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  PoppinsReg: {
    fontFamily: 'PoppinsReg',
  },

  PoppinsLight:{
    fontFamily: 'PoppinsLight',
  },

  PoppinsBold:{
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
    marginRight:4
  },

  verifiedIcon:{
    marginLeft:3,
  },

  phoneIcon:{
    alignSelf: "flex-start",
    marginLeft:3
  },

  marker: {
    color:"black",
    backgroundColor: 'black', // Change marker background color
    borderRadius: 10, // Adjust marker border radius
    padding: 5, // Adjust marker padding
  },

  pinIcon:{
    alignSelf: "flex-start",
    marginTop:10,
    marginBottom: 5,
  },

  instagramIcon:{
    alignSelf:"flex-start",
  },

  displayImage:{
    width: WIDTH*0.8,
    height: 300,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 0,
    marginTop:5,
    marginRight:8,
  },

  map:{
    width: WIDTH - 40,
    borderRadius: 10,
    borderColor: "black",
    borderWidth:1,
    height: 150,
    marginBottom:5,
  },

  Pinnedtext:{
    fontFamily: "PoppinsReg",
    maxWidth: "95%",
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#CFCFCF',
    backgroundColor: '#F6F6F6',
    padding:5
  },
  backIcon:{
    alignSelf:"flex-start",
    marginLeft:5,
  }
});

export default PressProfile;
