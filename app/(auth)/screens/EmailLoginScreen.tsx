import React, {useState} from "react";
import {
    View,
    TextInput,
    StyleSheet,
    Pressable,
    KeyboardAvoidingView,
    Platform
} from "react-native";
import {Text} from "@/components/ui/text";
import {Button} from "@/components/ui/button";
import {useRouter} from "expo-router";

const EmailLoginScreen = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [focusedInput, setFocusedInput] = useState<string | null>(null);

    const isButtonDisabled = !(email.length > 0 && password.length > 0);

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
            <Text style={styles.header}>이메일로 시작하기</Text>

            {/* 이메일 입력 필드 */}
            <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>이메일 주소</Text>
                <View style={[styles.inputContainer, focusedInput === "email" && styles.inputFocused]}>
                    <TextInput
                        placeholder="andrew@gmail.com"
                        placeholderTextColor="#B0B0B0"
                        style={styles.input}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onFocus={() => setFocusedInput("email")}
                        onBlur={() => setFocusedInput(null)}
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
            </View>

            {/* 비밀번호 입력 필드 */}
            <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>비밀번호 입력</Text>
                <View style={[styles.inputContainer, focusedInput === "password" && styles.inputFocused]}>
                    <TextInput
                        placeholder="영문, 숫자, 특수문자"
                        placeholderTextColor="#B0B0B0"
                        style={styles.input}
                        secureTextEntry
                        autoCapitalize="none"
                        onFocus={() => setFocusedInput("password")}
                        onBlur={() => setFocusedInput(null)}
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>
                {/* 비밀번호 재설정 버튼 (비밀번호 입력 아래 배치) */}
                <Pressable onPress={() => router.push("/screens/ForgotPasswordScreen")} style={styles.resetPassword}>
                    <Text style={styles.resetPasswordText}>비밀번호 재설정</Text>
                </Pressable>
            </View>

            {/* 로그인 버튼 */}
            <Button
                style={[styles.loginButton, isButtonDisabled && styles.loginButtonDisabled]}
                disabled={isButtonDisabled}
                onPress={() => console.log("로그인 시도")}
            >
                <Text style={styles.loginButtonText}>로그인</Text>
            </Button>

            {/* 회원가입 */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>계정이 없으신가요?</Text>
                <Pressable onPress={() => router.push("/screens/RegisterEmailScreen")}>
                    <Text style={styles.signupText}>이메일로 회원가입</Text>
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    );
};

export default EmailLoginScreen;

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
        paddingTop: 10
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
        paddingTop : 5
    },
    resetPassword: {
        alignSelf: "flex-end",
        marginTop: 10,
    },
    resetPasswordText: {
        color: "#007AFF",
        fontSize: 14,
    },
    loginButton: {
        backgroundColor: "#007AFF",
        height: 50,
        alignItems: "center",
        borderRadius: 8,
        marginTop: 30,
    },
    loginButtonDisabled: {
        backgroundColor: "#B0B0B0",
    },
    loginButtonText: {
        fontSize: 16,
        color: "#FFFFFF",
        fontWeight: "bold",
    },
    footer: {
        marginTop: 40,
        alignItems: "center",
    },
    footerText: {
        fontSize: 14,
        color: "#777",
    },
    signupText: {
        fontSize: 14,
        color: "#007AFF",
        fontWeight: "bold",
        marginTop: 5,
    },
});
