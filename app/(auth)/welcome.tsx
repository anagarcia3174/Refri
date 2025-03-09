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
        <SafeAreaView className="flex h-full items-center justify-between bg-light-background dark:bg-dark-background">
                    <TouchableOpacity className="w-full flex justify-end items-end p-5" onPress={() => router.replace("/(auth)/sign-up")}>
                        <Text className="text-light-text-muted dark:text-dark-text-muted font-bold">Skip</Text>
                    </TouchableOpacity>

                <Text className="font-PoppinsExtraBold text-6xl leading-tight text-light-text-primary dark:text-dark-text-primary">REFRI</Text>

            <Swiper
                ref={swiperRef}
                loop={false}
                showsButtons={false}
                showsPagination={false}
                onIndexChanged={setActiveIndex}
            >
                {onboarding.map((item, index) => (
                    <View key={item.id} className="flex items-center justify-center p-5">
                        <Image source={item.image} className="w-full h-[300px]" resizeMode="contain" />
                        <View className="flex flex-row items-center justify-center w-full mt-10">
                            <Text className="text-3xl font-PoppinsExtraBold font-bold mx-10 text-center text-light-text-primary dark:text-dark-text-primary">{item.title}</Text>
                        </View>
                        <Text className="text-lg font-PoppinsSemiBold text-center mx-2 mt-2 text-light-text-muted dark:text-dark-text-muted">{item.description}</Text>
                    </View>
                ))}
            </Swiper>
                <CustomButton
                    title={isLastSlide ? "Get Started" : "Next"}
                    onPress={() =>
                        isLastSlide
                            ? router.replace("/(auth)/sign-up")
                            : swiperRef.current?.scrollBy(1)
                    }
                    bgVariant="primary"
                    textVariant="primary"
                    className="w-10/12 mt-5 mb-10"
                />
        </SafeAreaView>
    );
};

export default Onboarding;
