import { useFonts } from 'expo-font';

export default function useCustomFonts() {
  const [fontsLoaded] = useFonts({
    'GilroyBold': require('./assets/fonts/Gilroy-ExtraBold.otf'),
    'GilroyLight': require('./assets/fonts/Gilroy-Light.otf')
  });

  return fontsLoaded;
}