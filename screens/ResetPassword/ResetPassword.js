import { View, StyleSheet, Text, TextInput, TouchableWithoutFeedback, Keyboard, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { authentication } from '../../firebaseConfig';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import BackNavigation from 'components/BackNavigation/BackNavigation';

const WIDTH = Dimensions.get('window').width;

const ResetPasswordScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const user = authentication.currentUser;
  const userEmail = user ? user.email : '';

  const pressButton = async () => {
    if (!email.trim()) {
      setError("Email can't be empty");
      setTimeout(() => setError(''), 3000);
      return;
    }

    try {
      await sendPasswordResetEmail(authentication, email);
      setSuccessMessage('Password reset email sent!');
      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.backNavigationContainer}>
          <BackNavigation />
        </View>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.root}>
            <Text style={styles.headerText}>Reset Password</Text>
            <TextInput
              style={styles.input}
              placeholder={userEmail || "Email"}
              onChangeText={(text) => {
                setEmail(text);
                setError('');
              }}
              value={email}
              placeholderTextColor="grey"
              editable={!user} // If a user exists, this will be false, making the input uneditable.
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
            {successMessage && <Text style={styles.successText}>{successMessage}</Text>}
            <TouchableWithoutFeedback onPress={pressButton}>
              <View style={styles.continueButton}>
                <Text style={styles.buttonText}>Send Reset Email</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  root: {
    padding: 25,
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  continueButton: {
    backgroundColor: 'black',
    width: WIDTH * 0.75,
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'PoppinsMed',
  },
  errorText: {
    fontFamily: 'PoppinsMed',
    color: 'red',
    marginBottom: 10,
  },
  successText: {
    fontFamily: 'PoppinsMed',
    color: 'green',
    marginBottom: 10,
  },
  backNavigationContainer: {
    alignSelf: 'flex-start',
  },
});

export default ResetPasswordScreen;
