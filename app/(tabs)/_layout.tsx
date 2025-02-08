import {Tabs} from "expo-router";
import {Ionicons} from "@expo/vector-icons";
import SelectCityScreen from "@/app/(tabs)/screens/SelectCityScreen";

export default function TabLayout() {
    return (
        <Tabs screenOptions={{headerShown: false}}>
            {/* ✅ 홈 탭 (폴더 구조와 일치해야 함) */}
            <Tabs.Screen
                name="index" // ✅ "screens/HomeScreen" 대신 "index" 사용
                options={{
                    title: "홈",
                    headerShown: false,
                    tabBarShowLabel: false,
                }}
            />
            <Tabs.Screen
                name="screens/SelectCityScreen"
                options={{title: "도시 선택", headerShown: false, tabBarShowLabel: false,}}
            />

        </Tabs>
    );
}
