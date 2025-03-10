import { TouchableOpacity, Text } from "react-native";

import { ButtonProps } from "@/types/type";

const getBgVariantStyle = (variant: ButtonProps["bgVariant"]) => {
    switch (variant) {
        case "primary":
            return "bg-light-primary dark:bg-dark-primary";
        case "secondary":
            return "bg-light-secondary dark:bg-dark-secondary";
        case "accent":
            return "bg-light-accent dark:bg-dark-accent";
        case "danger":
            return "bg-light-danger dark:bg-dark-danger";
        case "success":
            return "bg-light-success dark:bg-dark-success";
        default:
            return "bg-light-primary dark:bg-dark-primary";
    }
};

const getTextVariantStyle = (variant: ButtonProps["textVariant"]) => {
    switch (variant) {
        case "primary":
            return "text-light-text-primary dark:text-dark-text-primary";
        case "secondary":
            return "text-light-text-secondary dark:text-dark-text-secondary";
        case "danger":
            return "text-light-text-danger dark:text-dark-text-danger";
        case "success":
            return "text-light-text-success dark:text-dark-text-success";
        default:
            return "text-light-text-muted dark:text-dark-text-muted";
    }
};

const CustomButton = ({
                          onPress,
                          title,
                          bgVariant = "primary",
                          textVariant = "primary",
                          IconLeft,
                          IconRight,
                          className,
                          ...props
                      }: ButtonProps) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            className={`w-full rounded-full p-3 flex flex-row justify-center items-center ${getBgVariantStyle(bgVariant)} ${className}`}
            {...props}
        >
            {IconLeft && <IconLeft />}
            <Text className={`text-lg font-bold ${getTextVariantStyle(textVariant)}`}>
                {title}
            </Text>
            {IconRight && <IconRight />}
        </TouchableOpacity>
    );
};

export default CustomButton;