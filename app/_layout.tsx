import "@/global.css";
import {useFonts} from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import {useEffect} from "react";
import "react-native-reanimated";
import {Slot} from "expo-router"; // ✅ Slot 사용하여 자동 라우팅
import {SafeAreaView, ScrollView, View} from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <View style={{flex: 1, paddingTop: 40}}> {/* 원하는 패딩값 지정 */}
            <Slot/> {/* ✅ SafeAreaView 내부에서 앱 전체를 감싸도록 설정 */}
        </View>
    );
}
