import React, { useState, useRef, useEffect } from "react";
import { View, TextInput, Pressable } from "react-native";
import AuthScreenTemplate from "@/app/(auth)/template/AuthScreenTemplate";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { useLocalSearchParams, useRouter } from "expo-router";
import { authStyles } from "@/app/(auth)/styles/authStyles";

const CODE_LENGTH = 6;
const TIMER_SECONDS = 180;

const EmailVerificationScreen = () => {
    const router = useRouter();
    const [code, setCode] = useState(new Array(CODE_LENGTH).fill(""));
    const [timer, setTimer] = useState(TIMER_SECONDS);
    const [isValid, setIsValid] = useState(false);
    const inputRefs = useRef<TextInput[]>([]);
    const params = useLocalSearchParams();
    const email = params.email || "";

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setIsValid(code.every((num) => num !== ""));
    }, [code]);

    const handleChange = (text: string, index: number) => {
        if (/^[0-9]$/.test(text) || text === "") {
            const newCode = [...code];
            newCode[index] = text;
            setCode(newCode);
            if (text !== "" && index < CODE_LENGTH - 1) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleKeyPress = (event: any, index: number) => {
        if (event.nativeEvent.key === "Backspace" && index > 0 && code[index] === "") {
            inputRefs.current[index - 1].focus();
        }
    };

    return (
        <AuthScreenTemplate
            header={
                <View style={authStyles.titleContainer}>
                    <Text style={authStyles.headerLeft}>이메일 계정 인증</Text>
                    <Text style={authStyles.emailText}>{email}</Text>
                </View>
            }
        >
            <Text style={authStyles.subText}>
                계정 확인을 위해 위 이메일로 보내드린 인증 코드를 입력해 주세요.
            </Text>
            <View style={authStyles.codeContainer}>
                {code.map((num, index) => (
                    <TextInput
                        key={index}
                        ref={(ref) => (inputRefs.current[index] = ref!)}
                        style={[
                            authStyles.codeInput,
                            num !== "" && authStyles.codeInputFilled,
                        ]}
                        keyboardType="numeric"
                        maxLength={1}
                        value={num}
                        onChangeText={(text) => handleChange(text, index)}
                        onKeyPress={(event) => handleKeyPress(event, index)}
                    />
                ))}
            </View>
            <View style={authStyles.footerRow}>
                <Text style={authStyles.timer}>
                    {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, "0")}
                </Text>
                <Pressable onPress={() => setTimer(TIMER_SECONDS)}>
                    <Text style={authStyles.resendText}>인증 코드 재전송</Text>
                </Pressable>
            </View>
            <Button
                style={[authStyles.button, !isValid && authStyles.buttonDisabled]}
                disabled={!isValid}
                onPress={() => console.log("인증 완료")}
            >
                <Text style={authStyles.buttonText}>이메일 인증 완료</Text>
            </Button>
        </AuthScreenTemplate>
    );
};

export default EmailVerificationScreen;