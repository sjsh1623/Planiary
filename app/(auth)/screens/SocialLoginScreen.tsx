import React from "react";
import {StyleSheet, Image} from "react-native";
import {Box} from "@/components/ui/box";
import {Pressable} from "@/components/ui/pressable";
import {Text} from "@/components/ui/text";
import {HStack} from "@/components/ui/hstack";
import {VStack} from "@/components/ui/vstack";
import {Icon} from "@/components/ui/icon";
import {Button} from "@/components/ui/button";
import {Ionicons, FontAwesome} from "@expo/vector-icons";
import {useRouter} from "expo-router";

const SocialLoginScreen = () => {
    const router = useRouter();
    return (
        <Box style={styles.container}>
            {/* 🔹 닫기 버튼 */}
            <Pressable style={styles.closeButton} onPress={() => router.back()}>
                <Icon as={Ionicons} name="close" size="xl" color="gray"/>
            </Pressable>

            {/* 🔹 앱 로고 */}
            <Image source={{uri: "https://your-app-logo-url.com/logo.png"}} style={styles.logo}/>

            {/* 🔹 소셜 로그인 버튼 리스트 */}
            <VStack style={styles.buttonContainer}>
                <Button style={[styles.socialButton, styles.kakao]} onPress={() => console.log("카카오 로그인")}>
                    <HStack style={styles.buttonContent}>
                        <Icon as={FontAwesome} name="comment" size="md" color="black"/>
                        <Text style={styles.kakaoText}>카카오로 시작하기</Text>
                    </HStack>
                </Button>

                <Button style={[styles.socialButton, styles.naver]} onPress={() => console.log("네이버 로그인")}>
                    <HStack style={styles.buttonContent}>
                        <Icon as={FontAwesome} name="navicon" size="md" color="white"/>
                        <Text style={styles.whiteText}>네이버로 시작하기</Text>
                    </HStack>
                </Button>

                <Button style={[styles.socialButton, styles.apple]} onPress={() => console.log("애플 로그인")}>
                    <HStack style={styles.buttonContent}>
                        <Icon as={FontAwesome} name="apple" size="md" color="white"/>
                        <Text style={styles.whiteText}>Apple로 시작하기</Text>
                    </HStack>
                </Button>

                <Button style={[styles.socialButton, styles.email]} onPress={() => router.push('/screens/EmailLoginScreen')}>
                    <HStack style={styles.buttonContent}>
                        <Icon as={FontAwesome} name="envelope" size="md" color="blue"/>
                        <Text style={styles.emailText}>이메일로 시작하기</Text>
                    </HStack>
                </Button>

                {/* 🔹 회원가입 버튼 (마지막 버튼 다음에 배치) */}
                <Pressable style={styles.signUp} onPress={() => router.push('/screens/TermsAgreementScreen')}>
                    <Text style={styles.signUpText}>회원가입</Text>
                </Pressable>
            </VStack>
        </Box>
    );
};

export default SocialLoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    closeButton: {
        position: "absolute",
        top: 40,
        left: 20,
    },
    logo: {
        width: 120,
        height: 50,
        marginBottom: 20,
    },
    buttonContainer: {
        width: "100%",
        marginTop: 10,
    },
    socialButton: {
        width: "100%",
        paddingVertical: 12,
        minHeight: 50,
        borderRadius: 8,
        marginBottom: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonContent: {
        alignItems: "center",
        justifyContent: "center",
    },
    kakao: {
        backgroundColor: "#FEE500",
    },
    kakaoText: {
        fontWeight: "bold",
        color: "black",
        marginLeft: 10,
    },
    naver: {
        backgroundColor: "#03C75A",
    },
    facebook: {
        backgroundColor: "#1877F2",
    },
    apple: {
        backgroundColor: "black",
    },
    email: {
        backgroundColor: "#E5E7EB",
    },
    whiteText: {
        fontWeight: "bold",
        color: "white",
        marginLeft: 10,
    },
    emailText: {
        fontWeight: "bold",
        color: "blue",
        marginLeft: 10,
    },
    signUp: {
        marginTop: 15, // ✅ 마지막 버튼과의 간격 추가
        alignSelf: "center",
    },
    signUpText: {
        fontSize: 14,
        color: "gray",
    },
});
