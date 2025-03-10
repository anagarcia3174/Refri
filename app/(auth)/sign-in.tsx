import {SafeAreaView} from "react-native-safe-area-context";
import {ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useState} from "react";
import CustomButton from "@/components/CustomButton";
import {useRouter} from "expo-router";
import InputField from "@/components/InputField";
import Ionicons from '@expo/vector-icons/Ionicons';
import Fontisto from '@expo/vector-icons/Fontisto';
import { useColorScheme} from "react-native";


const SignIn = () => {
    const router = useRouter();
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const colorScheme = useColorScheme();
    const iconColor = colorScheme === "dark" ? "white" : "black";
    const placeholderColor = colorScheme === "dark" ? "#919996" : "#8A9490"; // Gray-400 in Tailwind
    const cursorColor = colorScheme === "dark" ? "#FF9F5C" : "#FF9047";

    return (
        <SafeAreaView className="flex-1 bg-light-background dark:bg-dark-background">
            <ScrollView className="flex-1 px-6">
                <View className="mt-20 mb-16">
                    <Text className="text-4xl font-PoppinsSemiBold text-light-text-primary dark:text-dark-text-primary">
                        Welcome Back!
                    </Text>
                    <Text className="text-xl text-light-text-secondary dark:text-dark-text-secondary font-Poppins ">
                        Sign in to continue
                    </Text>
                </View>
                <InputField
                    label="Email"
                    labelStyle="text-light-text-primary dark:text-dark-text-primary"
                    placeholder="email@example.com"
                    icon={<Fontisto name="email" size={24} color={iconColor} />}
                    value={form.email}
                    onChangeText={(value) => setForm({...form, 'email': value})}
                    inputStyle="text-light-text-primary dark:text-dark-text-primary"
                    placeholderTextColor={placeholderColor}
                    selectionColor={cursorColor}
                />
                <InputField
                    label="Password"
                    secureTextEntry={true}
                    labelStyle="text-light-text-primary dark:text-dark-text-primary"
                    placeholder="Enter a password"
                    icon={<Ionicons name="key-outline" size={24} color={iconColor} />}
                    value={form.password}
                    onChangeText={(value) => setForm({...form, 'password': value})}
                    inputStyle="text-light-text-primary dark:text-dark-text-primary"
                    placeholderTextColor={placeholderColor}
                    selectionColor={cursorColor}

                />

                <CustomButton
                    onPress={() => {console.log("signing up")}}
                    title="Sign In"
                    bgVariant="secondary"
                    textVariant="primary"
                    className="w-full mb-4 mt-5"
                />

                <View className="flex-row justify-center mt-5">
                    <Text className="text-lg text-light-text-secondary dark:text-dark-text-secondary">
                        Don't Have an Account?{" "}
                    </Text>
                    <TouchableOpacity onPress={() => router.replace("/sign-up")}>
                        <Text className="text-lg text-light-secondary dark:text-dark-secondary font-bold">
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignIn;