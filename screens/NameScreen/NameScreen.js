import { View, StyleSheet, Text, TextInput, TouchableWithoutFeedback, Keyboard, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SCREENS } from 'navigation/navigationPaths';
import { updateDoc, doc } from 'firebase/firestore';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import BackNavigation from 'components/BackNavigation/BackNavigation';
import { authentication, database } from '../../firebaseConfig';

const WIDTH = Dimensions.get('window').width;

const NameScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const route = useRoute();
  const showBack = route.params?.showBack || false;

  const pressButton = async () => {
    if (!name.trim()) {
      setError("Name can't be empty");
      setTimeout(() => setError(''), 3000);
      return;
    }

    const user = authentication.currentUser;
    if (user) {
      try {
        const userRef = doc(database, 'users', user.uid);
        await updateDoc(userRef, { name });
      } catch (error) {
        console.error("Error updating user's name: ", error);
      }
    }
    navigation.navigate(SCREENS.HOME);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        {showBack && (
          <View style={styles.backNavigationContainer}>
            <BackNavigation />
          </View>
        )}

        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.root}>
            <Text style={styles.headerText}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              onChangeText={(text) => {
                setName(text);
                setError('');
              }}
              value={name}
              placeholderTextColor="grey"
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
            <TouchableWithoutFeedback onPress={pressButton}>
              <View style={styles.continueButton}>
                <Text style={styles.buttonText}>Continue</Text>
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
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
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
  backNavigationContainer: {
    alignSelf: 'flex-start',
  },
});

export default NameScreen;
