import { Stack } from 'expo-router';
import './global.css';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

    const [fontsLoaded, error] = useFonts({
        'Rubik-Regular': require('../assets/fonts/Rubik-Regular.ttf'),
        'Rubik-Medium': require('../assets/fonts/Rubik-Medium.ttf'),
        'Rubik-SemiBold': require('../assets/fonts/Rubik-SemiBold.ttf'),
        'Rubik-Bold': require('../assets/fonts/Rubik-Bold.ttf'),
        'Rubik-Light': require('../assets/fonts/Rubik-Light.ttf'),
        'Inter-Regular': require('../assets/fonts/Inter_18pt-Regular.ttf'),
        'Inter-Medium': require('../assets/fonts/Inter_18pt-Medium.ttf'),
        'Inter-SemiBold': require('../assets/fonts/Inter_18pt-SemiBold.ttf'),
        'Inter-Bold': require('../assets/fonts/Inter_18pt-Bold.ttf'),
        'Inter-Light': require('../assets/fonts/Inter_18pt-Light.ttf'),
    });


    useEffect(() => {
        if(error){
            throw error;
        }
        
        if(fontsLoaded){
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded, error]);


    if (!fontsLoaded) {
        return null;
      }

    if(!fontsLoaded && !error){
        return null;
    }

    return (
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="index" options={{ headerShown: false }} />
            </Stack>
    );
}
