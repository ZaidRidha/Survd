import { StyleSheet, Text, TouchableWithoutFeedback, KeyboardAvoidingView, TextInput, Keyboard } from 'react-native';
import React, { useState } from 'react';
import { Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import CustomButton from '../../components/CustomButton';

import useFont from '../../useFont';
import { authentication, database } from '../../firebaseConfig';

const SignUpScreen = () => {
  const navigation = useNavigation();

  useFont();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleRegister = async () => {
    if (password !== passwordRepeat) {
      setIsError(true);
      setErrorMessage('Passwords do not match, Please try again.');
      return;
    }
    setIsError(false);

    try {
      const { user } = await createUserWithEmailAndPassword(authentication, email, password);
      await setDoc(doc(database, 'users', user.uid), {
        email,
      });
      alert(`email ${user.email} created.`);
      navigation.replace('Phone');
    } catch (error) {
      let errorMessage = 'An unknown error occurred';
      switch (error.code) {
        case 'auth/internal-error':
          errorMessage = 'The email address is already in use by another account.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'The email address is invalid.';
          break;
        case 'auth/weak-password':
          errorMessage = 'The password is too weak.';
          break;
        case 'auth/user-not-found':
          errorMessage = 'The user with that email address was not found.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'The password is incorrect.';
          break;
        default:
          errorMessage = error.message;
      }
      setIsError(true);
      setErrorMessage(errorMessage);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        behavior="padding"
        enabled
        style={styles.root}>
        <Text style={styles.inputtext}>Email*</Text>
        <TextInput
          placeholder="Email"
          style={[isFocused ? styles.inputFocused : isError ? styles.inputError : styles.input]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChangeText={(text) => setEmail(text)}
        />
        <Text style={styles.inputtext}>Password*</Text>
        <TextInput
          placeholder="Password"
          style={[isFocused ? styles.inputFocused : isError ? styles.inputError : styles.input]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        <Text style={styles.inputtext}>Confirm Password*</Text>
        <TextInput
          placeholder="Confirm Password"
          style={[isFocused ? styles.inputFocused : isError ? styles.inputError : styles.input]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChangeText={(text) => setPasswordRepeat(text)}
          secureTextEntry
        />
        <CustomButton
          text="Continue"
          type="signup"
          onPress={handleRegister}
        />
        <Text style={styles.text}>
          By registering, you confirm that you accept our <Text style={styles.linktext}>Terms of Use</Text> and
          <Text style={styles.linktext}>Privacy Policy.*</Text>
        </Text>
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

  bsubview: {
    padding: 20,
  },

  inputtext: {
    fontFamily: 'PoppinsReg',
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
});

export default SignUpScreen;
