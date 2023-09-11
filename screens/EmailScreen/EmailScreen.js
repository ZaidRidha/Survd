import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { authentication, database } from '../../firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { updateEmail, reauthenticateWithCredential, EmailAuthProvider, sendEmailVerification } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import BackNavigation from 'components/BackNavigation/BackNavigation';

const EmailScreen = () => {
  const navigation = useNavigation();
  const user = authentication.currentUser;
  const [newEmail, setNewEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user && user.emailVerified) {
      const userRef = doc(database, 'users', user.uid);
      setDoc(userRef, { emailVerified: true }, { merge: true });
    }
  }, [user]);

  const handleUpdateEmail = async () => {
    if (!newEmail || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const credentials = EmailAuthProvider.credential(user.email, password);
    reauthenticateWithCredential(user, credentials)
      .then(() => {
        updateEmail(user, newEmail)
          .then(() => {
            const userRef = doc(database, 'users', user.uid);
            setDoc(userRef, { email: newEmail, emailVerified: false }, { merge: true });

            sendEmailVerification(user)
              .then(() => {
                Alert.alert('Success', 'Email updated and verification email sent. Please verify your new email.');
                navigation.goBack();
              })
              .catch((error) => {
                console.error('Error sending verification email:', error);
              });
          })
          .catch((error) => {
            console.error('Error updating email in Auth:', error);
            Alert.alert('Error', 'There was an error updating your email. Please try again.');
          });
      })
      .catch((error) => {
        console.error('Error re-authenticating:', error);
        Alert.alert('Error', 'Incorrect password or another authentication error.');
      });
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.root}>
          <View className="self-start">
            <BackNavigation />
          </View>
          <View style={styles.container}>
            <Text style={styles.headerText}>Change Email</Text>
            <TextInput
              style={styles.input}
              value={newEmail}
              onChangeText={setNewEmail}
              placeholder="Enter new email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password for verification"
              secureTextEntry
            />
            <TouchableOpacity
              style={styles.button}
              onPress={handleUpdateEmail}>
              <Text style={styles.buttonText}>Update Email</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    padding: 20,
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
  button: {
    backgroundColor: 'black',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default EmailScreen;
