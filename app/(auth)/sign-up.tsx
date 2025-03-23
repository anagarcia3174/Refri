import {SafeAreaView} from "react-native-safe-area-context";
import {ScrollView, Text, TouchableOpacity, useColorScheme, View, ActivityIndicator, KeyboardAvoidingView, Platform} from "react-native";
import {useState} from "react";
import CustomButton from "@/components/CustomButton";
import {useRouter} from "expo-router";
import InputField from "@/components/InputField";
import Ionicons from '@expo/vector-icons/Ionicons';
import Fontisto from '@expo/vector-icons/Fontisto';
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import  useAuth  from "@/app/lib/hooks/useAuth";

const SignUp = () => {
    const router = useRouter();
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);
    const colorScheme = useColorScheme();
    const iconColor = colorScheme === "dark" ? "white" : "black";
    const placeholderColor = colorScheme === "dark" ? "#919996" : "#8A9490"; // Gray-400 in Tailwind
    const cursorColor = colorScheme === "dark" ? "#FF9F5C" : "#FF9047";
    const { signUp, isLoading, error } = useAuth();

    const validateForm = () => {
        if (!form.email || !form.password || !form.username || !form.confirmPassword) {
            setFormError("All fields are required");
            return false;
        }

        if (form.password !== form.confirmPassword) {
            setFormError("Passwords do not match");
            return false;
        }

        if (form.password.length < 6) {
            setFormError("Password must be at least 6 characters long");
            return false;
        }

        setFormError(null);
        return true;
    };

    const onSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        try {
            await signUp({email: form.email, password: form.password, displayName: form.username});
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
                                Create Account
                            </Text>
                            <Text className="font-PoppinsMedium text-lg mt-2 text-light-text-muted dark:text-dark-text-muted">
                                Start your healthy journey with us
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
                                label="Username"
                                labelStyle="text-light-text-primary dark:text-dark-text-primary"
                                placeholder="Enter a unique username"
                                icon={<Ionicons name="person-outline" size={24} color={isLoading ? placeholderColor : iconColor} />}
                                value={form.username}
                                onChangeText={(value) => {
                                    setForm({...form, 'username': value});
                                    setFormError(null);
                                }}
                                inputStyle="text-light-text-primary dark:text-dark-text-primary"
                                placeholderTextColor={placeholderColor}
                                selectionColor={cursorColor}
                                editable={!isLoading}
                            />

                            <InputField
                                label="Email"
                                labelStyle="text-light-text-primary dark:text-dark-text-primary"
                                placeholder="email@example.com"
                                icon={<Fontisto name="email" size={24} color={isLoading ? placeholderColor : iconColor} />}
                                value={form.email}
                                onChangeText={(value) => {
                                    setForm({...form, 'email': value});
                                    setFormError(null);
                                }}
                                inputStyle="text-light-text-primary dark:text-dark-text-primary"
                                placeholderTextColor={placeholderColor}
                                selectionColor={cursorColor}
                                editable={!isLoading}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />

                            <InputField
                                label="Password"
                                secureTextEntry={!showPassword}
                                labelStyle="text-light-text-primary dark:text-dark-text-primary"
                                placeholder="Enter a password"
                                icon={<Ionicons name="lock-closed-outline" size={24} color={isLoading ? placeholderColor : iconColor} />}
                                value={form.password}
                                onChangeText={(value) => {
                                    setForm({...form, 'password': value});
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

                            <InputField
                                label="Confirm Password"
                                secureTextEntry={!showConfirmPassword}
                                labelStyle="text-light-text-primary dark:text-dark-text-primary"
                                placeholder="Confirm your password"
                                icon={<Ionicons name="lock-closed-outline" size={24} color={isLoading ? placeholderColor : iconColor} />}
                                value={form.confirmPassword}
                                onChangeText={(value) => {
                                    setForm({...form, 'confirmPassword': value});
                                    setFormError(null);
                                }}
                                inputStyle="text-light-text-primary dark:text-dark-text-primary"
                                placeholderTextColor={placeholderColor}
                                selectionColor={cursorColor}
                                editable={!isLoading}
                                rightIcon={
                                    <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} disabled={isLoading}>
                                        <Ionicons
                                            name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
                                            size={24}
                                            color={isLoading ? placeholderColor : iconColor}
                                        />
                                    </TouchableOpacity>
                                }
                            />
                        </Animated.View>

                        <Animated.View 
                            entering={FadeInUp.delay(400).duration(1000).springify()}
                            className="mt-8 space-y-6 mb-6"
                        >
                            <CustomButton
                                title={isLoading ? "" : "Create Account"}
                                onPress={onSubmit}
                                bgVariant="primary"
                                textVariant="primary"
                                className="shadow-sm"
                                disabled={isLoading}
                                IconRight={isLoading ? LoadingIcon : undefined}
                            />

                            <View className="flex-row justify-center items-center space-x-1 mt-10">
                                <Text className="font-PoppinsMedium text-light-text-muted dark:text-dark-text-muted">
                                    Already have an account?{" "}
                                </Text>
                                <TouchableOpacity onPress={() => router.push("/(auth)/sign-in")} disabled={isLoading}>
                                    <Text className={`font-PoppinsSemiBold ${isLoading ? 'text-light-text-muted dark:text-dark-text-muted' : 'text-light-primary dark:text-dark-primary'}`}>
                                        Sign In
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

export default SignUp;