import {Stack} from "expo-router";

export default function AuthLayout() {
    return (
        <Stack>
            {/* ✅ SocialLoginScreen - 오른쪽에서 왼쪽으로 슬라이드 */}
            <Stack.Screen
                name="screens/SocialLoginScreen"
                options={{
                    animation: "slide_from_right", // ✅ 명확하게 애니메이션 지정
                    presentation: "card", // ✅ 모달이 아닌 일반적인 카드 스타일 사용
                    headerShown: false,
                    gestureEnabled: true,
                }}
            />

            {/* ✅ TestScreen - 오른쪽에서 왼쪽으로 슬라이드 */}
            <Stack.Screen
                name="screens/TermsAgreementScreen"
                options={{
                    animation: "slide_from_right", // ✅ 명확하게 애니메이션 지정
                    presentation: "card", // ✅ 모달이 아닌 일반적인 카드 스타일 사용
                    headerShown: false,
                    gestureEnabled: true,
                }}
            />
            <Stack.Screen
                name="screens/EmailLoginScreen"
                options={{
                    animation: "slide_from_right", // ✅ 명확하게 애니메이션 지정
                    presentation: "card", // ✅ 모달이 아닌 일반적인 카드 스타일 사용
                    headerShown: false,
                    gestureEnabled: true,
                }}
            />
            <Stack.Screen
                name="screens/RegisterEmailScreen"
                options={{
                    animation: "slide_from_right", // ✅ 명확하게 애니메이션 지정
                    presentation: "card", // ✅ 모달이 아닌 일반적인 카드 스타일 사용
                    headerShown: false,
                    gestureEnabled: true,
                }}
            />
            <Stack.Screen
                name="screens/ForgotPasswordScreen"
                options={{
                    animation: "slide_from_right", // ✅ 명확하게 애니메이션 지정
                    presentation: "card", // ✅ 모달이 아닌 일반적인 카드 스타일 사용
                    headerShown: false,
                    gestureEnabled: true,
                }}
            />
        </Stack>

    );
}
