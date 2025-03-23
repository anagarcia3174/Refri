import { View, Text, Image, TouchableOpacity, ScrollView, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useUser from "@/app/lib/hooks/useUser";
import { ActivityIndicator } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";
import { defaultAvatarImage } from "@/constants";
import { useState } from "react";

type TabType = 'posts' | 'preferences';

const Profile = () => {
    const { userData, isLoading } = useUser();
    const [activeTab, setActiveTab] = useState<TabType>('posts');
    const colorScheme = useColorScheme();
    const iconColor = colorScheme === "dark" ? "white" : "black";


    if (isLoading) {
        return (
            <SafeAreaView className="flex-1 justify-center items-center bg-light-background dark:bg-dark-background">
                <ActivityIndicator size="large" color="#2A9D8F" />
            </SafeAreaView>
        );
    }

    if (!userData) {
        return (
            <SafeAreaView className="flex-1 justify-center items-center bg-light-background dark:bg-dark-background">
                <Text className="text-light-text-muted dark:text-dark-text-muted">Failed to load profile</Text>
            </SafeAreaView>
        );
    }

    const renderTabContent = () => {
        switch (activeTab) {
            case 'posts':
                return (
                    <View className="flex-1 p-4 items-center">
                        <Text className="text-light-text-muted dark:text-dark-text-muted">No recipes posted yet</Text>
                    </View>
                );
            case 'preferences':
                return (
                    <View className="flex-1 p-4 space-y-4">
                        <TouchableOpacity 
                            className="flex-row justify-between items-center p-3 bg-light-accent/10 dark:bg-dark-accent/10 rounded-lg mb-2"
                            onPress={() => router.push("/edit-profile" as any)}
                        >
                            <Text className="font-semibold text-light-text-primary dark:text-dark-text-primary">Edit Profile</Text>
                            <Ionicons name="chevron-forward" size={20} color={iconColor} />
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                            className="flex-row justify-between items-center p-3 bg-light-accent/10 dark:bg-dark-accent/10 rounded-lg mb-2"
                            onPress={() => router.push("/dietary-preferences" as any)}
                        >
                            <Text className="font-semibold text-light-text-primary dark:text-dark-text-primary">Dietary Preferences</Text>
                            <Ionicons name="chevron-forward" size={20} color={iconColor} />
                        </TouchableOpacity>

                        <TouchableOpacity 
                            className="flex-row justify-between items-center p-3 bg-light-accent/10 dark:bg-dark-accent/10 rounded-lg mb-2"
                            onPress={() => router.push("/macro-goals" as any)}
                        >
                            <Text className="font-semibold text-light-text-primary dark:text-dark-text-primary">Macro Goals</Text>
                            <Ionicons name="chevron-forward" size={20} color={iconColor} />
                        </TouchableOpacity>
                    </View>
                );
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-light-background dark:bg-dark-background">
            <ScrollView className="flex-1">
                {/* Header with settings button */}
                <View className="flex-row justify-between items-center px-4 py-3">
                    <Text className="text-xl font-bold text-light-text-primary dark:text-dark-text-primary">{userData.displayName}</Text>
                    <TouchableOpacity onPress={() => router.push("/settings" as any)}>
                        <Ionicons name="settings-outline" size={24} color={iconColor} />
                    </TouchableOpacity>
                </View>

                {/* Profile Info Section */}
                <View className="flex-row px-4 py-4 items-center">
                    {/* Profile Picture */}
                    <View className="w-20 h-20 rounded-full overflow-hidden mr-4">
                        <Image 
                            source={userData.photoURL ? { uri: userData.photoURL } : defaultAvatarImage}
                            className="w-full h-full"
                        />
                    </View>

                    {/* Stats */}
                    <View className="flex-1 flex-row justify-around">
                        <View className="items-center">
                            <Text className="text-lg font-bold text-light-text-primary dark:text-dark-text-primary">{userData.socialStats.totalRecipes}</Text>
                            <Text className="text-sm text-light-text-muted dark:text-dark-text-muted">Recipes</Text>
                        </View>
                        <View className="items-center">
                            <Text className="text-lg font-bold text-light-text-primary dark:text-dark-text-primary">{userData.socialStats.followers}</Text>
                            <Text className="text-sm text-light-text-muted dark:text-dark-text-muted">Followers</Text>
                        </View>
                        <View className="items-center">
                            <Text className="text-lg font-bold text-light-text-primary dark:text-dark-text-primary">{userData.socialStats.following}</Text>
                            <Text className="text-sm text-light-text-muted dark:text-dark-text-muted">Following</Text>
                        </View>
                    </View>
                </View>

                {/* Bio Section */}
                <View className="px-4 py-2">
                    {userData.bio && (
                        <Text className="text-sm text-light-text-secondary dark:text-dark-text-secondary">{userData.bio}</Text>
                    )}
                </View>

                {/* Tab Buttons */}
                <View className="flex-row justify-around border-b border-light-accent/20 dark:border-dark-accent/20">
                    <TouchableOpacity 
                        className={`flex-1 py-3 ${activeTab === 'posts' ? 'border-b-2 border-light-primary dark:border-dark-primary' : ''}`}
                        onPress={() => setActiveTab('posts')}
                    >
                        <MaterialCommunityIcons 
                            name={activeTab === 'posts' ? "view-grid" : "view-grid-outline"} 
                            size={24} 
                            color={iconColor}
                            className={activeTab === 'posts' ? 'text-light-primary dark:text-dark-primary self-center' : 'text-light-text-muted dark:text-dark-text-muted self-center'}
                        />
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        className={`flex-1 py-3 ${activeTab === 'preferences' ? 'border-b-2 border-light-primary dark:border-dark-primary' : ''}`}
                        onPress={() => setActiveTab('preferences')}
                    >
                        <MaterialCommunityIcons 
                            name={activeTab === 'preferences' ? "cookie-cog" : "cookie-cog-outline"} 
                            color={iconColor}
                            size={24} 
                            className={activeTab === 'preferences' ? 'text-light-primary dark:text-dark-primary self-center' : 'text-light-text-muted dark:text-dark-text-muted self-center'}
                        />
                    </TouchableOpacity>
                </View>

                {/* Tab Content */}
                {renderTabContent()}
            </ScrollView>
        </SafeAreaView>
    );
};

export default Profile;