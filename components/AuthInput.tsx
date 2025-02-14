import React, { useState } from "react";
import { View, TextInput, TextInputProps } from "react-native";
import { Text } from "@/components/ui/text";
import { authStyles } from "@/app/(auth)/styles/authStyles";

interface AuthInputProps extends TextInputProps {
    label: string;
    children?: React.ReactNode; // 인풋 옆에 렌더링할 아이콘 등
}

const AuthInput: React.FC<AuthInputProps> = ({ label, style, children, ...rest }) => {
    const [focused, setFocused] = useState(false);

    return (
        <View style={authStyles.inputWrapper}>
            <Text style={authStyles.inputLabel}>{label}</Text>
            <View style={[authStyles.inputContainer, focused && authStyles.inputFocused]}>
                <TextInput
                    style={[authStyles.input, style]}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    {...rest}
                />
                {children}
            </View>
        </View>
    );
};

export default AuthInput;