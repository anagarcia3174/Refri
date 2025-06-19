import { useState } from 'react';
import {
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Image,
  KeyboardTypeOptions,
  useColorScheme,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { fontSize } from 'react-native-responsive-sizes';

interface InputFieldProps {
  title: string;
  value: string;
  placeHolder: string;
  handleTextChange: (text: string) => void;
  keyboardType: KeyboardTypeOptions;
  titleColor?: string;
  containerColor?: string;
  textColor?: string;
  placeholderTextColor?: string;
  cursorColor?: string;
  iconColor?: string;
}

const InputField = ({
  title,
  value,
  placeHolder,
  handleTextChange,
  keyboardType = 'default',
  titleColor,
  containerColor,
  textColor,
  placeholderTextColor,
  cursorColor,
  iconColor,
}: InputFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`mb-10`}>
      <Text
        style={{ 
          fontSize: fontSize(15),
        }}
        className={`font-rubik-medium ${titleColor}`}>
        {title}
      </Text>

      <View
        className={`
        mt-2
    w-full px-4 py-4
    rounded-2xl border-2
    flex flex-row items-center ${containerColor}`}>
        <TextInput
          value={value}
          placeholder={placeHolder}
          onChangeText={handleTextChange}
          cursorColor={cursorColor}
          selectionColor={cursorColor}
          secureTextEntry={title === 'Password' && !showPassword}
          style={{ 
            fontSize: fontSize(14),
          }}
          className={`font-rubik-medium ${textColor} flex-1`}
          placeholderTextColor={placeholderTextColor}
          keyboardType={keyboardType}
        />

        {title === 'Password' && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              size={fontSize(20)}
              color={iconColor}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default InputField;
