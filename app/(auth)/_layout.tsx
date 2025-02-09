import {Stack} from "expo-router";
import {Platform} from "react-native";

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
                name="screens/TestScreen"
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
