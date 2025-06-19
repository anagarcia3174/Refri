import { TouchableOpacity, Text, StyleProp, TextStyle, ViewStyle } from "react-native"
import { fontSize } from "react-native-responsive-sizes"

interface CustomButtonProps {
    title: string;
    handlePress: () => void;
    containerStyles?: string;
    textStyles?: string;
    isLoading?: boolean;
    textSize?: number;
}

const CustomButton = ({
    title,
    handlePress,
    containerStyles,
    textStyles,
    isLoading = false,
    textSize = 14,

}: CustomButtonProps) => {
  return (
    <TouchableOpacity 
            className={`rounded-full ${containerStyles}`}
            activeOpacity={0.8}
            onPress={handlePress}
            disabled={isLoading}
          >
            <Text style={{ fontSize: fontSize(textSize)}} className={`font-bold text-center ${textStyles}`}>
              {title}
            </Text>
          </TouchableOpacity>
  )
}

export default CustomButton

