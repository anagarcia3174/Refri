import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'react-native';
import useUser from "@/app/lib/hooks/useUser";
import { defaultAvatarImage } from "@/constants";
import { useColorScheme } from 'react-native';

export default function Layout() {
    const { userData } = useUser();
    const colorScheme = useColorScheme();
    const activeColor = colorScheme === 'dark' ? '#2A9D8F' : '#2A9D8F'; // Your primary color
    const inactiveColor = colorScheme === 'dark' ? '#90A4AE' : '#90A4AE'; // Your muted text color

    return (
        <Tabs screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: {
                backgroundColor: colorScheme === 'dark' ? '#1D2D35' : '#FDF8F3',
                borderTopWidth: 0,
                height: 70,
                elevation: 0,
                shadowOpacity: 0,
            },
            tabBarActiveTintColor: activeColor,
            tabBarInactiveTintColor: inactiveColor,
        }}>
            <Tabs.Screen
                name="home"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" size={28} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="magnify" size={28} color={color} />
                    ),
                }}
            />
             <Tabs.Screen
                name="refri"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="fridge" size={28} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused, size }) => (
                        <Image 
                            source={userData?.photoURL ? { uri: userData.photoURL } : defaultAvatarImage}
                            style={{
                                width: 28,
                                height: 28,
                                borderRadius: 14,
                                borderWidth: focused ? 2 : 0,
                                borderColor: activeColor,
                            }}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}