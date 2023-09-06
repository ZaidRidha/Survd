import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from 'react-native';
import React, { useState } from 'react';
import { Button, Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SCREENS } from 'navigation/navigationPaths';
import useFont from '../../useFont';
import CustomButton from '../../components/CustomButton';
import { authentication, database } from '../../firebaseConfig';
import { updateDoc, doc, setDoc } from 'firebase/firestore';

const WIDTH = Dimensions.get('window').width;

const NameScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const pressButton = async () => {
    if (!name.trim()) {
      setError("Name can't be empty");
      setTimeout(() => setError(''), 3000); // Set error message if name is empty
      return;
    }

    const user = authentication.currentUser;
    if (user) {
      try {
        const userRef = doc(database, 'users', user.uid);
        await updateDoc(userRef, { name: name });
      } catch (error) {
        console.error("Error updating user's name: ", error);
      }
    }
    navigation.navigate(SCREENS.HOME);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAwareScrollView contentContainerStyle={styles.root}>
        <View style={{ alignItems: 'center', marginVertical: 40 }}>
          <Text style={{ ...styles.PoppinsMed, fontSize: 22, textAlign: 'center' }}>Enter Name</Text>
        </View>
        <Text
          style={styles.PoppinsMed}
          className="text-lg mb-2">
          Name
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          onChangeText={(text) => {
            setName(text);
            setError(''); // Clear error message when user starts typing
          }}
          value={name}
          placeholderTextColor="grey"
          fontSize={20}
        />
        {error ? <Text style={{ fontFamily: 'PoppinsMed', color: 'red', marginBottom: 10 }}>{error}</Text> : null}

        <Button
          title="Continue"
          onPress={pressButton}
          buttonStyle={styles.continueButton}
          titleStyle={styles.buttonText}
        />
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
};

export default NameScreen;

const styles = StyleSheet.create({
  root: {
    padding: 25,
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  PoppinsMed: {
    fontFamily: 'PoppinsMed',
  },
  PoppinsReg: {
    fontFamily: 'PoppinsReg',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    width: '100%',
    padding: 15, // Slightly increased padding
    height: 50, // Adjusted height
    marginBottom: 20,
    fontSize: 16, // Increased font size here
  },
  continueButton: {
    backgroundColor: 'black',
    width: WIDTH * 0.75, // Reduced width to 75% of the window width
    height: 45, // Reduced height
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});
