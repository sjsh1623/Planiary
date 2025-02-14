import React, { useState } from "react";
import AuthScreenTemplate from "@/app/(auth)/template/AuthScreenTemplate";
import AuthInput from "@/components/AuthInput";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Icon } from "@/components/ui/icon";
import { authStyles } from "@/app/(auth)/styles/authStyles";

const EmailRegisterScreen = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isEmailValid = isValidEmail(email);

    return (
        <AuthScreenTemplate header="이메일로 회원가입">
            <AuthInput
                label="이메일"
                placeholder="example@gmail.com"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            >
                {isEmailValid && (
                    <Icon as={Ionicons} name="checkmark-circle" size="xl" color="#4CAF50" />
                )}
            </AuthInput>
            <Button
                style={[authStyles.button, !isEmailValid && authStyles.buttonDisabled]}
                disabled={!isEmailValid}
                onPress={() =>
                    router.push({
                        pathname: "/screens/EmailVerificationScreen",
                        params: { email },
                    })
                }
            >
                <Text style={authStyles.buttonText}>이메일 인증 요청</Text>
            </Button>
        </AuthScreenTemplate>
    );
};

export default EmailRegisterScreen;