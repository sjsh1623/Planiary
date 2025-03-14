import React, { useState } from "react";
import AuthScreenTemplate from "@/app/(auth)/template/AuthScreenTemplate";
import AuthInput from "@/components/AuthInput";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Icon } from "@/components/ui/icon";
import { authStyles } from "@/app/(auth)/styles/authStyles";

const ForgotPasswordScreen = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isEmailValid = isValidEmail(email);

    return (
        <AuthScreenTemplate header="비밀번호를 잊으셨나요?">
            <Text style={authStyles.description}>
                비밀번호를 재설정하려는 계정(이메일)을 입력해주세요.
            </Text>
            <AuthInput
                label="이메일 주소"
                placeholder="이메일 주소 입력"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            >
                {isEmailValid && (
                    <Icon as={Ionicons} name="checkmark-circle" size="2xl" color="#4CAF50" />
                )}
            </AuthInput>
            <Button
                style={[authStyles.button, !isEmailValid && authStyles.buttonDisabled]}
                disabled={!isEmailValid}
                onPress={() => console.log("이메일 전송")}
            >
                <Text style={authStyles.buttonText}>이메일 전송</Text>
            </Button>
        </AuthScreenTemplate>
    );
};

export default ForgotPasswordScreen;