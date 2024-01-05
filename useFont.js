import { useFonts } from 'expo-font';

export default function useCustomFonts() {
  const [fontsLoaded] = useFonts({
    GilroyBold: require('./assets/fonts/Gilroy-ExtraBold.otf'),
    GilroyLight: require('./assets/fonts/Gilroy-Light.otf'),
    FigtreeReg: require('./assets/fonts/Figtree-Regular.ttf'),
    FigtreeLight: require('./assets/fonts/Figtree-Light.ttf'),
    FigtreeBold: require('./assets/fonts/Figtree-Bold.ttf'),
    FigtreeSemiBold: require('./assets/fonts/Figtree-SemiBold.ttf'),
    FigtreeMedium: require('./assets/fonts/Figtree-Medium.ttf'),
    PoppinsReg: require('./assets/fonts/Poppins/Poppins-Regular.ttf'),
    PoppinsLight: require('./assets/fonts/Poppins/Poppins-Light.ttf'),
    PoppinsMed: require('./assets/fonts/Poppins/Poppins-Medium.ttf'),
    PoppinsSemiBold: require('./assets/fonts/Poppins/Poppins-SemiBold.ttf'),
    PoppinsBold: require('./assets/fonts/Poppins/Poppins-Bold.ttf'),
    PoppinsLightItalic: require('./assets/fonts/Poppins/Poppins-LightItalic.ttf'),
  });

  return fontsLoaded;
}
