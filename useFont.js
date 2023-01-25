import { useFonts } from 'expo-font';

export default function useCustomFonts() {
  const [fontsLoaded] = useFonts({
    'GilroyBold': require('./assets/fonts/Gilroy-ExtraBold.otf'),
    'GilroyLight': require('./assets/fonts/Gilroy-Light.otf'),
    'FigtreeReg': require('./assets/fonts/Figtree-Regular.ttf'),
    'FigtreeLight': require('./assets/fonts/Figtree-Light.ttf'),
    'FigtreeBold': require('./assets/fonts/Figtree-Bold.ttf'),
  });

  return fontsLoaded;
}