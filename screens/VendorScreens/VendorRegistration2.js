import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  Keyboard,
  Dimensions,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { Icon, Button } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { SCREENS } from 'navigation/navigationPaths';
import { Dropdown } from 'react-native-element-dropdown';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import * as ImagePicker from 'expo-image-picker';

import useFont from '../../useFont';
import { authentication, database } from '../../firebaseConfig';

const WIDTH = Dimensions.get('window').width;

const VendorRegistration2 = () => {
  const navigation = useNavigation();

  useFont();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [callval, setCallVal] = useState(null);
  const [images, setImages] = useState(null);
  const [urls, setImageURLs] = useState([]);

  const data = [
    { label: 'Home', value: 'Home' },
    { label: 'Mobile', value: 'Mobile' },
    { label: 'Shop', value: 'Shop' },
  ];

  const getLatLongFromAddress = async (address) => {
  const apiKey = "AIzaSyCjYfUwiN9N0SvFY_wT2OkUBne4MjO-CvQ"; // Replace with your actual API key
  const url = "https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}"

  try {
    const response = await fetch(url);
    const json = await response.json();
    if (json.status === 'OK') {
      const { lat, lng } = json.results[0].geometry.location;
      return { latitude: lat, longitude: lng };
    } else {
      throw new Error(json.error_message || 'Geocode was not successful');
    }
  } catch (error) {
    console.error('Error during geocode:', error);
    throw error;
  }
};

// Usage
const address = '1600 Amphitheatre Parkway, Mountain View, CA';
getLatLongFromAddress(address)
  .then(coords => console.log(coords))
  .catch(error => console.error(error));

  const uploadImages = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    var filename = "images/" + "IMG" + Math.round(Math.random()*100000)

    var refs = firebase.storage().ref().child(filename);
    refs.put(blob).then((snapshot) => {
      firebase.storage().ref(filename).getDownloadURL()
        .then((url) => {
          setImageURL(url);
          var user = props.route.params.user.email
          console.log("URL", url)
          firebase.firestore().collection('users').doc(user).update({
            picture: url
          })
      })

    })

  }

  let openImagePicker = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    setImage(pickerResult.uri);

    if (!pickerResult.cancelled) {
      uploadImages(pickerResult.uri)
    }
  }

  const handleNext = async () => {
    setDisabled(true);
    if (password !== passwordRepeat) {
      setIsError(true);
      setErrorMessage('Passwords do not match, Please try again.');
      setTimeout(() => {
        setIsError(false);
        setDisabled(false); // Reset the disabled state here
      }, 3000); // Hide error message after 3 seconds
      return;
    }
    setIsError(false);

    try {
      navigation.replace(SCREENS.VENDOR_SCREEN3);
    } catch (error) {
      // ... (rest of your error handling code)
      setTimeout(() => {
        setIsError(false);
        setDisabled(false); // Reset the disabled state here too
      }, 3000); // Hide error message after 3 seconds
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        behavior="padding"
        enabled
        style={styles.root}>
        <Text style={styles.heading}>Register</Text>
        <Text style={styles.questiontext}>Where do you work*?</Text>
         <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select item"
              searchPlaceholder="Search..."
              value={callval}
              onChange={item => {
                setCallVal(item.value);
              }}
          />
        <Text style={styles.questiontext}>If incall do you confirm that you have a space which is safe, hygenic and there is enough space for customers to use?*</Text>
        <BouncyCheckbox onPress={(isChecked: boolean) => {}} text="I confirm" />
        <Text style={styles.questiontext}>Do you have any business related insurance?*</Text>
        <BouncyCheckbox onPress={(isChecked: boolean) => {}} text="Public Liability(Highly Recomended)" />
        <BouncyCheckbox onPress={(isChecked: boolean) => {}} text="Business Equipment" />
        <BouncyCheckbox onPress={(isChecked: boolean) => {}} text="Personal Accident" />
        <BouncyCheckbox onPress={(isChecked: boolean) => {}} text="Other" />


        <Text style={styles.questiontext}>Supporting Images</Text>
        <Text style={styles.questiontext}>Here you can upload any supporting images for your business. Eg: haircuts, your space, etc</Text>
        <TouchableOpacity onPress={openImagePicker}>
          <Icon
            reverse
            name='upload'
            type='font-awesome'
            color='#517fa4'
          />
        </TouchableOpacity>
        <View className="my-5">
          <Button
            title="Continue"
            disabled={disabled}
            onPress={handleNext}
            buttonStyle={{
              backgroundColor: 'black',
              width: WIDTH * 0.8, // Makes the button full-width
              height: 40,
              borderRadius: 10, // Adjust as needed to change the button's height
            }}
            disabledStyle={{ backgroundColor: 'black' }} // This maintains the original color when disabled
            disabledTitleStyle={{ color: 'white' }}
            titleStyle={{ color: 'white' }}
          />
        </View>
        {isError ? (
          <Text style={styles.errorText}>
            <Icon
              type="ionicon"
              name="information-circle"
              color="red"
              size={17}
            />
            {errorMessage}
          </Text>
        ) : null}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    flexDirection: 'column',
    padding: 25,
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  heading: {
    marginTop: 20,
    fontSize: 25,
    fontWeight: "bold",
  },
  bsubview: {
    padding: 20,
  },

  inputtext: {
    fontFamily: 'PoppinsReg',
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  questiontext: {
    fontFamily: 'PoppinsReg',
    fontWeight: "bold",
    alignSelf: 'flex-start',
    marginTop: 10,
  },

  confirmtext: {
    fontFamily: 'PoppinsLight',
    alignSelf: 'flex-start',
  },

  text: {
    // marginRight: 500
    fontFamily: 'PoppinsLight',
    marginTop: 10,
  },

  linktext: {
    color: '#67718f',
  },

  errorText: {
    marginTop: 25,
    fontFamily: 'PoppinsLight',
    color: '#db0000',
    alignItems: 'center',
  },

  font1: {
    fontFamily: 'PoppinsLight',
  },

  font2: {
    fontFamily: 'FigtreeBold',
  },

  backtext: {
    alignSelf: 'flex-start',
    fontFamily: 'PoppinsLight',
    color: '#67718f',
    marginTop: 15,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    marginVertical: 10,
    fontSize: 14,
    borderRadius: 5,
    fontFamily: 'PoppinsReg',
  },

  inputFocused: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginVertical: 10,
    backgroundColor: '#F0F0F0',
    fontSize: 14,
    borderRadius: 5,
    fontFamily: 'PoppinsReg',
  },

  inputError: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: 'red',
    marginVertical: 10,
    fontSize: 14,
    borderRadius: 5,
    fontFamily: 'PoppinsReg',
  },
  dropdown: {
      margin: 16,
      height: 50,
      width: 300,
      borderBottomColor: 'gray',
      borderBottomWidth: 0.5,
    },
    icon: {
      marginRight: 5,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
});

export default VendorRegistration2;
