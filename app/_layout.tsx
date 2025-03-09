import {Stack} from "expo-router";
import './globals.css';
import {useFonts} from "expo-font";
import {useEffect} from "react";
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();


export default function RootLayout() {
  const [loaded] = useFonts({
    "Poppins": require("../assets/fonts/Poppins-Regular.ttf"),
    "PoppinsBold": require("../assets/fonts/Poppins-Bold.ttf"),
    "PoppinsExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "PoppinsExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "PoppinsLight": require("../assets/fonts/Poppins-Light.ttf"),
    "PoppinsMedium": require("../assets/fonts/Poppins-Medium.ttf"),
    "PoppinsSemiBold": require("../assets/fonts/Poppins-SemiBold.ttf")
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <Stack>
    <Stack.Screen name="index" options={{headerShown: false}}></Stack.Screen>
    <Stack.Screen name="(root)" options={{headerShown: false}}></Stack.Screen>
    <Stack.Screen name="(auth)" options={{headerShown: false}}></Stack.Screen>
  </Stack>;
}
