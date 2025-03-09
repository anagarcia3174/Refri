import {Tabs} from "expo-router";


export default function Layout() {
    return (
        <Tabs>
            <Tabs.Screen
                name="home"
                options={{
                    title: "Home",
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="refri"
                options={{
                    title: "Refri",
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    title: "Search",
                    headerShown: false,
                }}
            />
        </Tabs>
    )
}