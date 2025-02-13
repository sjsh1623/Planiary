import React, { useState } from "react";
import {
    View,
    TextInput,
    StyleSheet,
    Pressable,
    KeyboardAvoidingView,
    Platform
} from "react-native";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const ForgotPasswordScreen = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [focused, setFocused] = useState(false);

    // ✅ 이메일 유효성 검사
    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isEmailValid = isValidEmail(email);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            {/* 뒤로가기 버튼 */}
            <Pressable style={styles.backButton} onPress={() => router.back()}>
                <Ionicons name="chevron-back" size={24} color="black" />
            </Pressable>

            {/* 타이틀 */}
            <Text style={styles.title}>비밀번호를 잊으셨나요?</Text>
            <Text style={styles.description}>
                비밀번호를 재설정하려는 계정(이메일)을 입력해주세요.
            </Text>

            {/* 이메일 입력 필드 */}
            <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>이메일 주소</Text>
                <View style={[styles.inputContainer, focused && styles.inputFocused]}>
                    <TextInput
                        placeholder="이메일 주소 입력"
                        placeholderTextColor="#B0B0B0"
                        style={styles.input}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        value={email}
                        onChangeText={setEmail}
                    />
                    {/* ✅ 유효한 이메일 입력 시 체크 아이콘 */}
                    {isEmailValid && (
                        <Icon as={Ionicons} name="checkmark-circle" size="2xl" color="#4CAF50" />
                    )}
                </View>
            </View>

            {/* 이메일 전송 버튼 */}
            <Button
                style={[styles.button, !isEmailValid && styles.buttonDisabled]}
                disabled={!isEmailValid}
                onPress={() => console.log("이메일 전송")}
            >
                <Text style={styles.buttonText}>이메일 전송</Text>
            </Button>
        </KeyboardAvoidingView>
    );
};

export default ForgotPasswordScreen;

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
    title: {
        fontSize: 22,
        fontWeight: "bold",
        alignSelf: "center",
        marginBottom: 10,
        paddingTop: 10,
    },
    description: {
        fontSize: 14,
        color: "#555",
        alignSelf: "center",
        marginBottom: 40,
        textAlign: "center",
    },
    inputWrapper: {
        marginBottom: 15,
    },
    inputLabel: {
        fontSize: 14,
        color: "#007AFF",
        marginBottom: 5,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#DADADA",
        paddingBottom: 10,
    },
    inputFocused: {
        borderBottomColor: "#007AFF",
    },
    input: {
        flex: 1,
        fontSize: 16,
        padding: 10,
    },
    button: {
        backgroundColor: "#007AFF",
        alignItems: "center",
        borderRadius: 8,
        marginTop: 30,
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