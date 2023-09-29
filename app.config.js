require('dotenv').config();

export default {
  expo: {
    name: 'barber-app',
    slug: 'barber-app',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/UpdatedLogo.jpg',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.zaid.barberapp',
      config: {
        googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY, // Use the environment variable here
      },
    },
    android: {
      config: {
        googleMaps: {
          apiKey: process.env.GOOGLE_MAPS_API_KEY, // Use the environment variable here
        },
      },
    },
    web: {
      favicon: './assets/favicon.png',
    },
    plugins: [
      '@react-native-firebase/app',
      '@react-native-firebase/auth',
      [
        'expo-build-properties',
        {
          ios: {
            useFrameworks: 'static',
          },
        },
      ],
    ],
  },
};
