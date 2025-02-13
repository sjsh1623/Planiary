import React, {useState, useRef, useEffect} from "react";
import {
    View,
    TextInput,
    StyleSheet,
    Pressable,
    KeyboardAvoidingView,
    Platform,
    Text,
} from "react-native";
import {Button} from "@/components/ui/button";
import {useLocalSearchParams, useRouter} from "expo-router";

const CODE_LENGTH = 6;
const TIMER_SECONDS = 180; // 3분 카운트다운

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
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            {/* 🔙 뒤로 가기 버튼 */}
            <Pressable style={styles.backButton} onPress={() => router.back()}>
                <Text style={styles.backButtonText}>{"<"}</Text>
            </Pressable>

            {/* 🏷️ 타이틀과 이메일 주소 */}
            <View style={styles.titleContainer}>
                <Text style={styles.header}>이메일 계정 인증</Text>
                <Text style={styles.emailText}>{email}</Text>
            </View>

            {/* ✉️ 설명 문구 */}
            <Text style={styles.subText}>
                계정 확인을 위해 위 이메일로 보내드린 인증 코드를 입력해 주세요.
            </Text>

            {/* 🔢 인증 코드 입력 */}
            <View style={styles.codeContainer}>
                {code.map((num, index) => (
                    <TextInput
                        key={index}
                        ref={(ref) => (inputRefs.current[index] = ref!)}
                        style={[styles.codeInput, num !== "" && styles.codeInputFilled]}
                        keyboardType="numeric"
                        maxLength={1}
                        value={num}
                        onChangeText={(text) => handleChange(text, index)}
                        onKeyPress={(event) => handleKeyPress(event, index)}
                    />
                ))}
            </View>

            {/* ⏳ 타이머 및 코드 재전송 */}
            <View style={styles.footer}>
                <Text style={styles.timer}>
                    {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, "0")}
                </Text>
                <Pressable onPress={() => setTimer(TIMER_SECONDS)}>
                    <Text style={styles.resendText}>인증 코드 재전송</Text>
                </Pressable>
            </View>

            {/* ✅ 인증 완료 버튼 */}
            <Button
                style={[styles.button, !isValid && styles.buttonDisabled]}
                disabled={!isValid}
                onPress={() => console.log("인증 완료")}
            >
                <Text style={styles.buttonText}>이메일 인증 완료</Text>
            </Button>
        </KeyboardAvoidingView>
    );
};

export default EmailVerificationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 20,
        justifyContent: "center",
    },
    backButton: {
        position: "absolute",
        top: 50,
        left: 20,
    },
    backButtonText: {
        fontSize: 24,
        color: "#000",
    },
    titleContainer: {
        alignSelf: "flex-start", // 🔄 왼쪽 정렬
        marginBottom: 10,
    },
    header: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 2,
    },
    emailText: {
        paddingVertical: 12,
        fontSize: 18,
        fontWeight: "bold",
        color: "#007AFF", // ✅ 파란색
    },
    subText: {
        fontSize: 14,
        color: "#555",
        textAlign: "left", // 왼쪽 정렬
        marginBottom: 30,
    },
    codeContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    codeInput: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: "#DADADA",
        borderRadius: 8,
        textAlign: "center",
        fontSize: 20,
    },
    codeInputFilled: {
        borderColor: "#007AFF",
        backgroundColor: "#E8F0FE",
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    timer: {
        fontSize: 14,
        color: "red",
    },
    resendText: {
        fontSize: 14,
        color: "#007AFF",
        textDecorationLine: "underline",
    },
    button: {
        backgroundColor: "#007AFF",
        alignItems: "center",
        borderRadius: 8,
        minHeight: 50,
    },
    buttonDisabled: {
        backgroundColor: "#B0B0B0",
    },
    buttonText: {
        fontSize: 16,
        color: "#FFFFFF",
        fontWeight: "bold",
    },
});