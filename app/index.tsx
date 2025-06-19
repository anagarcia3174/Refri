import { Text, SafeAreaView, Image, TouchableOpacity, View, useColorScheme, Dimensions } from 'react-native';
import { Carousel, Pagination } from 'react-native-snap-carousel';
import { slides } from '../constants/WelcomeSlides';
import { Slide } from '../types/WelcomeTypes';
import { useState } from 'react';
import { fontSize, width, height } from 'react-native-responsive-sizes';
import { router } from 'expo-router';
import CustomButton from '~/components/CustomButton';

const Welcome = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const screenWidth = width(100);
  
  // Colors from your tailwind config
  const primaryColor = isDark ? '#F28B82' : '#E57373';

  return (
    <SafeAreaView className="bg-light-background dark:bg-dark-background flex-1">
      <View className="flex-1 px-6 py-4">
        {/* Header Section */}
        <View className="flex-shrink-0 justify-center items-start mb-4 px-2">
          <Text style={{ fontSize: fontSize(32)}} className="text-light-text-onBackground dark:text-dark-text-onBackground font-rubik-regular leading-tight">
            Welcome to{'\n'}
            <Text style={{ fontSize: fontSize(36)}} className="text-light-text-onBackground dark:text-dark-text-onBackground font-rubik-bold">Refri.</Text>
          </Text>
        </View>

        {/* Carousel Section */}
        <View className="flex-1 justify-center items-center ">
          <Carousel
            data={slides}
            vertical={false}
            sliderWidth={screenWidth}
            itemWidth={screenWidth}
            keyExtractor={(item: Slide) => item.key}
            onSnapToItem={(index) => setActiveSlide(index)}
            renderItem={({ item }: { item: Slide }) => (
              <View className="flex-1 items-center justify-center px-3">
                <View className="w-full max-w-lg aspect-square items-center justify-center">
                  <Image 
                    style={{ width: width(90), height: height(90)}}
                    source={item.image} 
                    resizeMode="contain" 
                  />
                </View>
                <Text style={{ fontSize: fontSize(14)}} className=" text-light-text-onBackground dark:text-dark-text-onBackground font-inter-semibold text-center px-4 leading-snug">
                  {item.text}
                </Text>
              </View>
            )}
          />
          
          {/* Pagination Dots */}
          <View className="mt-4 ">
            <Pagination
              dotsLength={slides.length}
              activeDotIndex={activeSlide}
              containerStyle={{ paddingVertical: 15 }}
              dotStyle={{
                width: 14,
                height: 6,
                borderRadius: 4,
                backgroundColor: primaryColor,
              }}
              inactiveDotStyle={{
                width: 8,
                height: 8,
                borderRadius: 5,
              }}
              dotContainerStyle={{
                marginHorizontal: 4,
              }}
              inactiveDotOpacity={0.3}
              inactiveDotScale={1}
              dotColor={primaryColor}
              inactiveDotColor={primaryColor}
            />
          </View>
        </View>

        {/* Button Section */}
        <View className="flex-shrink-0 pb-4 px-2">
          <CustomButton 
            title="GET STARTED"
            handlePress={() => router.push('/(auth)/sign-up')}
            containerStyles="bg-light-primary dark:bg-dark-primary py-4 px-8"
            textStyles="text-light-onPrimary dark:text-dark-onPrimary tracking-wide"
            isLoading={false}
            textSize={14}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;

