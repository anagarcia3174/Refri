import { TouchableOpacityProps, TextInputProps } from "react-native";
import React from "react";


declare interface ButtonProps extends TouchableOpacityProps {
    onPress?: () => void;
    title: string;
    bgVariant?: "primary" | "secondary" | "accent" | "outline" | "success" | "danger";
    textVariant?: "primary" | "secondary" | "muted" | "danger" | "success";
    IconLeft?: React.ComponentType<any>;
    IconRight?: React.ComponentType<any>;
    className?: string;
}

declare interface InputFieldProps extends TextInputProps {
    label: string;
    icon?: any;
    rightIcon?: any;
    secureTextEntry?: boolean;
    labelStyle?: string;
    containerStyle?: string;
    inputStyle?: string;
    iconStyle?: string;
    className?: string;
}