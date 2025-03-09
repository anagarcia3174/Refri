import { TouchableOpacityProps } from "react-native";
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