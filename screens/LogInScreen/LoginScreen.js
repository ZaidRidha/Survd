import {
  View,
  Image,
  useWindowDimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, { useState } from 'react';
import { Button, Icon } from '@rneui/themed';

import { useNavigation } from '@react-navigation/native';

import { LinearGradient } from 'expo-linear-gradient';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SCREENS } from 'navigation/navigationPaths';
import useFont from '../../useFont';
import CustomButton from '../../components/CustomButton';
import logo from '../../assets/images/boxlogo.png';
import { authentication } from '../../firebaseConfig';

const LoginScreen = () => {
  useFont();

  /*   const [currUid, setCurrUid] = useState(null);

  useEffect(() => { 
    onAuthStateChanged(authentication, (user) => {  //firebase getting current user
      if (user) {
        setCurrUid(user.uid); //gets the user id and sets it
      } 
    }); 
  }, []);
 */

  /*   useEffect(() => {

    const checkAndNavigate = async () =>{  //once user is checked, then check if they have completed registration, if they have sign them in. 
      console.log(currUid);
      const docRef = doc(database,"users",currUid);
      const docSnap = await getDoc(docRef); 
      const val = docSnap.get('registrationComplete');

      if(val==true){
        navigation.replace("home");
      }

    };

    checkAndNavigate();

    
  }, [currUid]); */

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { height } = useWindowDimensions();
  const navigation = useNavigation();
  const [isError, setIserror] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    // firebase login.
    try {
      setLoading(true);
      const user = await signInWithEmailAndPassword(authentication, email, password);
    } catch (error) {
      console.log(error);
      setIserror(true);
      setTimeout(() => {
        setIserror(false);
      }, 4000);
    }
    setLoading(false);
  };

  const onForgotPasswordPressed = () => {
    console.warn('Forgot Password');
  };

  const onLogininstagramPressed = () => {
    console.warn('Login IG');
  };

  const onLoginGuestPressed = () => {
    console.warn('Login as Guest');
  };

  const onSignupPressed = () => {
    console.warn('Signup');
    navigation.navigate(SCREENS.REGISTER);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAwareScrollView contentContainerStyle={styles.root}>
        <View style={{ alignItems: 'center', marginVertical: 40 }}>
          <Text style={{ ...styles.PoppinsMed, fontSize: 28, textAlign: 'center' }}>
            You're not currently logged in!
          </Text>
          <Text
            style={{ ...styles.PoppinsMed, fontSize: 18, textAlign: 'center' }}
            className="text-lg">
            Login to use all the app's features.
          </Text>
        </View>

        <Text style={styles.text}>Email</Text>
        <TextInput
          placeholder="Email"
          style={[isFocused ? styles.inputFocused : isError ? styles.inputError : styles.input]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChangeText={(text) => setEmail(text)}
        />

        <Text style={styles.text}>Password</Text>
        <TextInput
          placeholder="Password"
          style={[isFocused ? styles.inputFocused : isError ? styles.inputError : styles.input]}
          secureTextEntry
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChangeText={(text) => setPassword(text)}
        />

        <Text style={styles.forgottext}>Forgot Password?</Text>
        {isError ? <Text style={styles.errortext}>Invalid email/password combination!</Text> : null}

        {loading && (
          <View className='p-5'>
          <ActivityIndicator
            size="large"
            color="#999999"
          />
          </View>
        )}

        <CustomButton
          text="Login"
          onPress={handleLogin}
        />

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, marginBottom: 5 }}>
          <View style={{ flex: 0.35, height: 1, backgroundColor: 'lightgray' }} />
          <View>
            <Text style={{ width: 40, textAlign: 'center', color: 'gray' }}>Or</Text>
          </View>
          <View style={{ flex: 0.35, height: 1, backgroundColor: 'lightgray' }} />
        </View>

        <Button
          ViewComponent={LinearGradient}
          linearGradientProps={{
            colors: ['#feda75', '#fa7e1e', '#d62976', '#962fbf', '#4f5bd5'],
            start: { x: 0, y: 0.5 },
            end: { x: 0.8, y: 1 },
          }}
          icon={
            <Icon
              style={styles.icon}
              type="antdesign"
              name="instagram"
              color="white"
              size={25}
            />
          }
          title="Continue With Instagram"
          containerStyle={{ width: '100%', borderRadius: 8, marginBottom: 15 }}
          titleStyle={{ fontFamily: 'FigtreeBold', fontSize: 14 }}
          onPress={onLogininstagramPressed}
        />

        <View style={styles.footer}>
          <TouchableOpacity onPress={onSignupPressed}>
            <Text style={{ alignItems: 'center', fontFamily: 'FigtreeLight' }}>Don't have an account? Signup</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  root: {
    // alignItems: 'center',
    padding: 25,
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  logo: {
    width: '70%',
    maxwidth: 300,
    maxheight: 300,
    marginBottom: 20,
  },

  text: {
    // marginRight: 500
    alignSelf: 'flex-start',
    fontFamily: 'PoppinsReg',
    fontSize: 14,
  },

  font1: {
    fontFamily: 'PoppinsReg',
  },

  font2: {
    fontFamily: 'PoppinsReg',
  },

  footer: {},

  errortext: {
    fontFamily: 'PoppinsLight',
    color: 'red',
    alignItems: 'center',
    marginBottom: 10,
  },

  forgottext: {
    fontFamily: 'PoppinsLight',
    alignSelf: 'flex-start',
    marginTop: 5,
    marginBottom: 20,
  },

  icon: {
    marginRight: 5,
  },

  btn: {
    width: '100%',
    borderRadius: 40,
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

  PoppinsMed: {
    fontFamily: 'PoppinsMed',
  },

  PoppinsReg: {
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

  logo: {
    width: 250,
    height: 250,
  },
});

const subviewStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
  },
});

export default LoginScreen;
