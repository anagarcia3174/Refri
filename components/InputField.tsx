import {InputFieldProps} from "@/types/type";
import {KeyboardAvoidingView, Text, TextInput, TouchableWithoutFeedback, View} from "react-native";
import {useState} from "react";

const InputField = ({
    label,
    icon,
    rightIcon,
    secureTextEntry = false,
    labelStyle,
    containerStyle,
    inputStyle,
    iconStyle,
    className,
    ...props}: InputFieldProps) => {
    const [isFocused, setIsFocused] = useState(false);


    return (
        <KeyboardAvoidingView>
            <TouchableWithoutFeedback >
                <View className={"my-5 w-full"}>
                    <Text className={`text-lg font-PoppinsSemiBold mb-3 ${labelStyle}`}>{label}</Text>
                    <View
                        className={`flex flex-row justify-start items-center rounded-full border-2 p-4 gap-3 bg-gray-700/15 dark:bg-white/10 ${isFocused ? "border-light-secondary dark:border-dark-secondary" : "border-dark-background dark:border-light-background"} ${containerStyle}`}>
                        {icon}
                        <TextInput
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            secureTextEntry={secureTextEntry}
                            className={`rounded-full  font-PoppinsSemiBold text-[15px] flex-1 ${inputStyle} text-left`} {...props}/>
                        {rightIcon}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

export default InputField;