import { useState } from 'react';
import { View, Text, ScrollView, useColorScheme, TouchableOpacity } from 'react-native';
import { fontSize, height } from 'react-native-responsive-sizes';
import { SafeAreaView } from 'react-native-safe-area-context';
import InputField from '../../components/InputField';
import CustomButton from '~/components/CustomButton';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
const SignUp = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    username: '',
  });
  const isDark = useColorScheme() === 'dark';
  return (
    <>
      <LinearGradient
        colors={isDark ? ['#1A202C', '#2D3748', '#1A1F2E'] : ['#FFFFFF', '#FAD4D4', '#F8E8E8']}
        locations={[0, 0.5, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1 }}>
        <SafeAreaView className="h-full ">
          <Text
            style={{ fontSize: fontSize(28) }}
            className="font-rubik-regular text-light-text-onBackground dark:text-dark-text-onBackground mt-10 px-6">
            Create Your{`\n`}Account
          </Text>
          <Text
            style={{ fontSize: fontSize(14) }}
            className="font-rubik-light text-light-text-onBackground dark:text-dark-text-onBackground mb-10 px-6">
            Enter your details below to create your account.
          </Text>
          <View className="flex-1 px-6">
            <ScrollView
              automaticallyAdjustKeyboardInsets={true}
              keyboardDismissMode="on-drag"
              className="flex-1"
              showsVerticalScrollIndicator={false}>
              <View className="mt-5">
                <InputField
                  title="Username"
                  value={form.username}
                  placeHolder="Your unique username"
                  handleTextChange={(e) => setForm({ ...form, username: e })}
                  keyboardType="default"
                  titleColor="dark:text-dark-text-onBackground text-light-text-onBackground"
                  containerColor="dark:bg-dark-primary/20 dark:border-dark-primary bg-light-primary/20 border-light-primary"
                  textColor="dark:text-dark-text-onBackground text-light-text-onBackground"
                  placeholderTextColor={isDark ? '#F8FAFC80' : '#1A202C80'}
                  cursorColor={isDark ? '#F28B82' : '#E57373'}
                />
                <InputField
                  title="Email"
                  value={form.email}
                  placeHolder="email@example.com"
                  handleTextChange={(e) => setForm({ ...form, email: e })}
                  keyboardType="email-address"
                  titleColor="dark:text-dark-text-onBackground text-light-text-onBackground"
                  containerColor="dark:bg-dark-primary/20 dark:border-dark-primary bg-light-primary/20 border-light-primary"
                  textColor="dark:text-dark-text-onBackground text-light-text-onBackground"
                  placeholderTextColor={isDark ? '#F8FAFC80' : '#1A202C80'}
                  cursorColor={isDark ? '#F28B82' : '#E57373'}
                />
                <InputField
                  title="Password"
                  value={form.password}
                  placeHolder="********"
                  handleTextChange={(e) => setForm({ ...form, password: e })}
                  keyboardType="default"
                  titleColor="dark:text-dark-text-onBackground text-light-text-onBackground"
                  containerColor="dark:bg-dark-primary/20 dark:border-dark-primary bg-light-primary/20 border-light-primary"
                  textColor="dark:text-dark-text-onBackground text-light-text-onBackground"
                  placeholderTextColor={isDark ? '#F8FAFC80' : '#1A202C80'}
                  cursorColor={isDark ? '#F28B82' : '#E57373'}
                  iconColor={isDark ? '#F28B82' : '#E57373'}
                />
              </View>
            </ScrollView>
            <View className="mt-4 mb-8">
              <CustomButton
                title="Sign Up"
                handlePress={() => {}}
                containerStyles="bg-light-primary dark:bg-dark-primary py-4 "
                textStyles="text-light-text-onPrimary dark:text-dark-text-onPrimary tracking-wide"
              />
              <View className="flex justify-center pt-4 items-center">
                <TouchableOpacity className="flex flex-row gap-2" onPress={() => router.replace('/sign-in')}>
                <Text className="text-xl text-light-text-onBackground dark:text-dark-text-onBackground font-rubik-regular">
                  Already have an account?
                </Text>
                  <Text className="text-xl font-rubik-bold text-light-primary dark:text-dark-primary">
                    Sign In
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
};

export default SignUp;
