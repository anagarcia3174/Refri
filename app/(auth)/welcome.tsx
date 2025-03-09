import { SafeAreaView } from "react-native-safe-area-context";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import Swiper from "react-native-swiper";
import { useRef, useState } from "react";
import { onboarding } from "@/constants";
import CustomButton from "@/components/CustomButton";

const Onboarding = () => {
    const swiperRef = useRef<Swiper>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const isLastSlide = activeIndex === onboarding.length - 1;

    const handleNext = () => {
        if (activeIndex < onboarding.length - 1) {
            swiperRef.current?.scrollBy(1);
        } else {
            router.replace("/(auth)/sign-up");
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-light-background dark:bg-dark-background">
            <View className="flex-row justify-end p-5">
                    <TouchableOpacity onPress={() => router.replace("/(auth)/sign-up")}>
                        <Text className="text-light-text-muted dark:text-dark-text-muted font-bold">Skip</Text>
                    </TouchableOpacity>
            </View>

            <View className="items-center">
                <Text className="font-PoppinsExtraBold text-6xl leading-tight text-light-text-primary dark:text-dark-text-primary">REFRI</Text>
            </View>

            <Swiper
                ref={swiperRef}
                loop={false}
                showsButtons={false}
                showsPagination={false}
                onIndexChanged={setActiveIndex}
            >
                {onboarding.map((item, index) => (
                    <View key={item.id} className="flex-1 items-center justify-center px-5">
                        <Image source={item.image} className="w-full h-[300px]" resizeMode="contain" />
                        <Text className=" text-3xl font-PoppinsBold text-center mt-10 text-light-text-primary dark:text-dark-text-primary">{item.title}</Text>
                        <Text className="text-lg font-PoppinsSemiBold text-center mx-2 mt-2 ttext-dark-text-muted dark:text-dark-text-muted">{item.description}</Text>
                    </View>
                ))}
            </Swiper>
            <View className="items-center mx-3">
                <CustomButton onPress={() => {isLastSlide ? router.replace('/(auth)/sign-up') : swiperRef.current?.scrollBy(1)}} title={isLastSlide ? "Get Started" : "Next"} bgVariant="primary" textVariant="primary" className="w-11/12 mb-10"/>
            </View>

        </SafeAreaView>
    );
};

export default Onboarding;
