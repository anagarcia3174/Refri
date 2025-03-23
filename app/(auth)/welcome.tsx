import { SafeAreaView } from "react-native-safe-area-context";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import Swiper from "react-native-swiper";
import { useRef, useState } from "react";
import { onboarding } from "@/constants";
import CustomButton from "@/components/CustomButton";
import Animated, { FadeIn, FadeInDown, FadeInUp } from "react-native-reanimated";

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
            <Animated.View 
                entering={FadeIn.delay(200)} 
                className="w-full flex justify-end items-end p-5"
            >
                <TouchableOpacity onPress={() => router.replace("/(auth)/sign-up")}>
                    <Text className="text-light-text-muted dark:text-dark-text-muted font-PoppinsMedium">Skip</Text>
                </TouchableOpacity>
            </Animated.View>

            <Animated.Text 
                entering={FadeInDown.duration(800).springify()} 
                className="font-PoppinsExtraBold text-7xl leading-tight text-light-primary dark:text-dark-primary tracking-wider"
            >
                REFRI
            </Animated.Text>

            <Swiper
                ref={swiperRef}
                loop={false}
                showsButtons={false}
                dotStyle={{
                    backgroundColor: 'rgba(0,0,0,.2)',
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    marginLeft: 3,
                    marginRight: 3,
                }}
                activeDotStyle={{
                    backgroundColor: '#2A9D8F',
                    width: 20,
                    height: 8,
                    borderRadius: 4,
                    marginLeft: 3,
                    marginRight: 3,
                }}
                onIndexChanged={setActiveIndex}
            >
                {onboarding.map((item, index) => (
                    <Animated.View 
                        entering={FadeInUp.delay(400).duration(1000)} 
                        key={item.id} 
                        className="flex items-center justify-center p-5"
                    >
                        <Image source={item.image} className="w-full h-[300px]" resizeMode="contain" />
                        <View className="flex flex-row items-center justify-center w-full mt-10">
                            <Text className="text-3xl font-PoppinsExtraBold mx-10 text-center text-light-text-primary dark:text-dark-text-primary">{item.title}</Text>
                        </View>
                        <Text className="text-lg font-PoppinsMedium text-center mx-2 mt-2 text-light-text-muted dark:text-dark-text-muted">{item.description}</Text>
                    </Animated.View>
                ))}
            </Swiper>

            <Animated.View 
                entering={FadeInUp.delay(600)} 
                className="w-full px-5 mb-10"
            >
                <CustomButton
                    title={isLastSlide ? "Get Started" : "Next"}
                    onPress={handleNext}
                    bgVariant="primary"
                    textVariant="primary"
                    className="w-full shadow-sm"
                />
            </Animated.View>
        </SafeAreaView>
    );
};

export default Onboarding;
