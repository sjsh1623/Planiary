import React from "react";
import { KeyboardAvoidingView, Platform, Pressable, Text } from "react-native";
import { useRouter } from "expo-router";
import { authStyles } from "@/app/(auth)/styles/authStyles";

interface AuthScreenTemplateProps {
    header: React.ReactNode; // 문자열 또는 커스텀 헤더 컴포넌트
    children: React.ReactNode;
    footer?: React.ReactNode;
}

const AuthScreenTemplate: React.FC<AuthScreenTemplateProps> = ({
                                                                   header,
                                                                   children,
                                                                   footer,
                                                               }) => {
    const router = useRouter();

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={authStyles.container}
        >
            <Pressable style={authStyles.backButton} onPress={() => router.back()}>
                <Text style={authStyles.backButtonText}>{"<"}</Text>
            </Pressable>
            {typeof header === "string" ? (
                <Text style={authStyles.header}>{header}</Text>
            ) : (
                header
            )}
            {children}
            {footer}
        </KeyboardAvoidingView>
    );
};

export default AuthScreenTemplate;