import {Stack} from "expo-router";

export default function AuthLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="screens/TravelActivityScreen"
                options={{
                    animation: "slide_from_bottom", // ✅ 명확하게 애니메이션 지정
                    presentation: "card", // ✅ 모달이 아닌 일반적인 카드 스타일 사용
                    headerShown: false,
                    gestureEnabled: true,
                }}
            />
        </Stack>

    );
}
