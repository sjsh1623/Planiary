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

const EmailRegisterScreen = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [focused, setFocused] = useState(false);

    // ✅ 이메일 유효성 검사 (간단한 정규식)
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
                <Text style={styles.backButtonText}>{"<"}</Text>
            </Pressable>

            {/* 페이지 타이틀 */}
            <Text style={styles.header}>이메일로 회원가입</Text>

            {/* 이메일 입력 필드 */}
            <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>이메일</Text>
                <View style={[styles.inputContainer, focused && styles.inputFocused]}>
                    <TextInput
                        placeholder="example@gmail.com"
                        placeholderTextColor="#B0B0B0"
                        style={styles.input}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        value={email}
                        onChangeText={setEmail}
                    />
                    {/* ✅ 이메일 유효하면 체크 아이콘 표시 */}
                    {isEmailValid && (
                        <Icon as={Ionicons} name="checkmark-circle" size="lg" color="blue" />
                    )}
                </View>
            </View>

            {/* 이메일 인증 요청 버튼 */}
            <Button
                style={[styles.button, !isEmailValid && styles.buttonDisabled]}
                disabled={!isEmailValid}
                onPress={() => console.log("이메일 인증 요청")}
            >
                <Text style={styles.buttonText}>이메일 인증 요청</Text>
            </Button>
        </KeyboardAvoidingView>
    );
};

export default EmailRegisterScreen;

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
    header: {
        fontSize: 22,
        fontWeight: "bold",
        alignSelf: "center",
        marginBottom: 40,
    },
    inputWrapper: {
        marginBottom: 15,
    },
    inputLabel: {
        fontSize: 14,
        color: "#555",
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
        paddingVertical: 15,
        alignItems: "center",
        borderRadius: 8,
        marginTop: 30,
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