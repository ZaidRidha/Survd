import { StatusBar } from 'expo-status-bar';
import { requireNativeComponent, StyleSheet, Text, SafeAreaView,TouchableWithoutFeedback, Keyboard,KeyboardAvoidingView,View} from 'react-native';
import { useFonts } from 'expo-font';


import colors from './assets/colors/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import LoginScreen from './screens/LogInScreen/LoginScreen';
import SignUpScreen from './screens/SignUpScreen/SignUpScreen';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import Navigation from './navigation/index';
import { store } from './store.js';
import { Provider } from 'react-redux';

Icon.loadFont();

export default function App() {
  // Load the font
/*   let [fontsLoaded] = useFonts({
    'Gilroy-ExtraBold': require('./assets/fonts/Gilroy-ExtraBold.otf'),
  });
  if (!fontsLoaded) {
    return <View />;
  } */

  const styles = StyleSheet.create({
    root:{
      flex:1,
    }
  
  });

  return ( 
  <Provider store={store}>
  <View style = {styles.root}>
    <Navigation/>
  </View>
  </Provider>
  );




  
}










