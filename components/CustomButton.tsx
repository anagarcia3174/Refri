import { TouchableOpacity, Text } from "react-native";

import { ButtonProps } from "@/types/type";



const CustomButton = ({
                          onPress,
                          title,
                          bgVariant = "primary",
                          textVariant = "default",
                          IconLeft,
                          IconRight,
                          className,
                          ...props
                      }: ButtonProps) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            className={`w-full rounded-full p-3 py-3 flex flex-row justify-center items-center shadow-md shadow-neutral-400/70 bg-light-${bgVariant} dark:bg-dark-${bgVariant} ${className}`}
            {...props}
        >
            {IconLeft && <IconLeft />}
            <Text className={`text-lg text-light-text-${textVariant} dark:text-dark-text-${bgVariant} font-PoppinsBold`}>
                {title}
            </Text>
            {IconRight && <IconRight />}
        </TouchableOpacity>
    );
};

export default CustomButton;