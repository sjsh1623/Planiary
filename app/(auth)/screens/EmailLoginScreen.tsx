import React, { useState } from "react";
import { View, Pressable } from "react-native";
import AuthScreenTemplate from "@/app/(auth)/template/AuthScreenTemplate";
import AuthInput from "@/components/AuthInput";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { useRouter } from "expo-router";
import { authStyles } from "@/app/(auth)/styles/authStyles";

const EmailLoginScreen = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const isButtonDisabled = !(email && password);

    return (
        <AuthScreenTemplate header="이메일로 시작하기">
            <AuthInput
                label="이메일 주소"
                placeholder="andrew@gmail.com"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />
            <AuthInput
                label="비밀번호 입력"
                placeholder="영문, 숫자, 특수문자"
                secureTextEntry
                autoCapitalize="none"
                value={password}
                onChangeText={setPassword}
            />
            <Pressable onPress={() => router.push("/screens/ForgotPasswordScreen")} style={authStyles.resetPassword}>
                <Text style={authStyles.resetPasswordText}>비밀번호 재설정</Text>
            </Pressable>
            <Button
                style={[authStyles.button, isButtonDisabled && authStyles.buttonDisabled]}
                disabled={isButtonDisabled}
                onPress={() => console.log("로그인 시도")}
            >
                <Text style={authStyles.buttonText}>로그인</Text>
            </Button>
            <View style={authStyles.footer}>
                <Text style={authStyles.footerText}>계정이 없으신가요?</Text>
                <Pressable onPress={() => router.push("/screens/EmailRegisterScreen")}>
                    <Text style={authStyles.signupText}>이메일로 회원가입</Text>
                </Pressable>
            </View>
        </AuthScreenTemplate>
    );
};

export default EmailLoginScreen;