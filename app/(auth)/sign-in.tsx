import {SafeAreaView} from "react-native-safe-area-context";
import {ScrollView, Text, TouchableOpacity, View, ActivityIndicator, KeyboardAvoidingView, Platform} from "react-native";
import {useState} from "react";
import CustomButton from "@/components/CustomButton";
import {useRouter} from "expo-router";
import InputField from "@/components/InputField";
import Ionicons from '@expo/vector-icons/Ionicons';
import Fontisto from '@expo/vector-icons/Fontisto';
import { useColorScheme} from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import  useAuth  from "@/app/lib/hooks/useAuth";

const SignIn = () => {
    const router = useRouter();
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const colorScheme = useColorScheme();
    const iconColor = colorScheme === "dark" ? "white" : "black";
    const placeholderColor = colorScheme === "dark" ? "#919996" : "#8A9490";
    const cursorColor = colorScheme === "dark" ? "#FF9F5C" : "#FF9047";
    const [showPassword, setShowPassword] = useState(false);
    const { signIn, isLoading, error } = useAuth();
    const [formError, setFormError] = useState<string | null>(null);


    const onSubmit = async () => {
        if (!form.email || !form.password) {
            setFormError("All fields are required");
            return;
        }

        try {
            await signIn({email: form.email, password: form.password});
        } catch (error) {
            return;
        }
    }

    const LoadingIcon = () => (
        <ActivityIndicator size="small" color="white" className="ml-2" />
    );

    return (
        <SafeAreaView className="flex-1 bg-light-background dark:bg-dark-background">
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1"
            >
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1 }}
                >
                    <Animated.View 
                        entering={FadeInDown.duration(1000).springify()}
                        className="flex-1 px-6 pt-10"
                    >
                        <View className="mb-10">
                            <Text className="font-PoppinsExtraBold text-4xl text-light-text-primary dark:text-dark-text-primary">
                                Welcome back!
                            </Text>
                            <Text className="font-PoppinsMedium text-lg mt-2 text-light-text-muted dark:text-dark-text-muted">
                                Sign in to continue your journey
                            </Text>
                        </View>

                <Animated.View 
                    entering={FadeInUp.delay(200).duration(1000).springify()}
                    className="space-y-6"
                >
                    {(error || formError) && (
                        <View className="bg-red-100 dark:bg-red-900 p-3 rounded-lg">
                            <Text className="text-red-600 dark:text-red-100 font-PoppinsMedium text-center">
                                {formError || error}
                            </Text>
                        </View>
                    )}

                    <InputField
                        label="Email"
                        labelStyle="text-light-text-primary dark:text-dark-text-primary"
                        placeholder="Enter your email"
                        icon={<Fontisto name="email" size={24} color={iconColor} />}
                        value={form.email}
                        onChangeText={(value) => {
                            setForm({...form, 'email': value})
                            setFormError(null);
                        }}
                        inputStyle="text-light-text-primary dark:text-dark-text-primary"
                        placeholderTextColor={placeholderColor}
                        selectionColor={cursorColor}
                        editable={!isLoading}
                    />

                    <InputField
                        label="Password"
                        secureTextEntry={!showPassword}
                        labelStyle="text-light-text-primary dark:text-dark-text-primary"
                        placeholder="Enter your password"
                        icon={<Ionicons name="lock-closed-outline" size={24} color={iconColor} />}
                        value={form.password}
                        onChangeText={(value) => {
                            setForm({...form, 'password': value})
                            setFormError(null);
                        }}
                        inputStyle="text-light-text-primary dark:text-dark-text-primary"
                        placeholderTextColor={placeholderColor}
                        selectionColor={cursorColor}
                        editable={!isLoading}
                        rightIcon={
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} disabled={isLoading}>
                                <Ionicons
                                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                                    size={24}
                                    color={isLoading ? placeholderColor : iconColor}
                                />
                            </TouchableOpacity>
                        }
                    />

                            <TouchableOpacity className="self-end" disabled={isLoading}>
                                <Text className={`font-PoppinsMedium ${isLoading ? 'text-light-text-muted dark:text-dark-text-muted' : 'text-light-primary dark:text-dark-primary'}`}>
                                    Forgot Password?
                                </Text>
                            </TouchableOpacity>
                        </Animated.View>

                <Animated.View 
                    entering={FadeInUp.delay(400).duration(1000).springify()}
                    className="mt-8 space-y-6"
                >
                    <CustomButton
                        title={isLoading ? "" : "Sign In"}
                        onPress={onSubmit}
                        bgVariant="primary"
                        textVariant="primary"
                        className="shadow-sm"
                        disabled={isLoading}
                        IconRight={isLoading ? LoadingIcon : undefined}
                    />

                            <View className="flex-row justify-center items-center space-x-1 mt-10">
                                <Text className="font-PoppinsMedium text-light-text-muted dark:text-dark-text-muted">
                                    Don't have an account?{" "}
                                </Text>
                                <TouchableOpacity onPress={() => router.push("/(auth)/sign-up")} disabled={isLoading}>
                                    <Text className={`font-PoppinsSemiBold ${isLoading ? 'text-light-text-muted dark:text-dark-text-muted' : 'text-light-primary dark:text-dark-primary'}`}>
                                        Sign Up
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </Animated.View>
                    </Animated.View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default SignIn;