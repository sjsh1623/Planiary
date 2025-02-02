import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
    return (
        <Tabs>
            {/* ✅ 홈 탭 (폴더 구조와 일치해야 함) */}
            <Tabs.Screen
                name="index" // ✅ "screens/HomeScreen" 대신 "index" 사용
                options={{
                    title: "홈",
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                    ),
                    tabBarShowLabel: false,
                }}
            />
        </Tabs>
    );
}
