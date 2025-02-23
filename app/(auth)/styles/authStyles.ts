import { StyleSheet } from "react-native";

export const authStyles = StyleSheet.create({
    // 컨테이너 (모든 스크린 공통)
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 20,
        justifyContent: "center",
        paddingTop : 40
    },
    // 백버튼
    backButton: {
        position: "absolute",
        top: 50,
        left: 20,
    },
    backButtonText: {
        fontSize: 24,
        color: "#000",
    },
    // 헤더
    header: {
        fontSize: 22,
        fontWeight: "bold",
        alignSelf: "center",
        marginBottom: 40,
        paddingTop: 10,
    },
    headerLeft: {
        fontSize: 22,
        fontWeight: "bold",
        alignSelf: "center",
        paddingTop: 10,
    },
    // 인풋 공통 스타일
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
    // 버튼 공통 스타일
    button: {
        backgroundColor: "#007AFF",
        alignItems: "center",
        justifyContent: "center",
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
    // EmailLoginScreen 추가 스타일
    resetPassword: {
        alignSelf: "flex-end",
        marginTop: 10,
    },
    resetPasswordText: {
        color: "#007AFF",
        fontSize: 14,
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
    // EmailVerificationScreen 추가 스타일
    titleContainer: {
        alignSelf: "flex-start",
        marginBottom: 10,
    },
    emailText: {
        paddingVertical: 12,
        fontSize: 18,
        fontWeight: "bold",
        color: "#007AFF",
    },
    subText: {
        fontSize: 14,
        color: "#555",
        textAlign: "left",
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
    timer: {
        fontSize: 14,
        color: "red",
    },
    resendText: {
        fontSize: 14,
        color: "#007AFF",
        textDecorationLine: "underline",
    },
    // EmailVerificationScreen - 타이머 영역 컨테이너
    footerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    // ForgotPasswordScreen 설명
    description: {
        fontSize: 14,
        color: "#555",
        alignSelf: "center",
        marginBottom: 40,
        textAlign: "center",
    },
});