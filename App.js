import { StyleSheet, View } from 'react-native';

import { Provider } from 'react-redux';
import AnimatedSplash from 'react-native-animated-splash-screen';
import React, { useState, useEffect } from 'react';
import { RootSiblingParent } from 'react-native-root-siblings';
import Navigation from './navigation/index';
import { store } from './store.js';
import useCustomFonts from './useFont';
import logo from './assets/images/UpdatedLogo.jpg';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const fontsLoaded = useCustomFonts();
  // LogBox.ignoreAllLogs(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 1500);
  }, []);

  return (
    <AnimatedSplash
      translucent
      isLoaded={isLoaded && fontsLoaded}
      logoImage={logo}
      backgroundColor="white"
      logoHeight={300}
      logoWidth={300}>
      <Provider store={store}>
        {fontsLoaded && (
          <RootSiblingParent>
            <View style={styles.root}>
              <Navigation />
            </View>
          </RootSiblingParent>
        )}
      </Provider>
    </AnimatedSplash>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
