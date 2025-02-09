import "@/global.css";
import {useFonts} from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import {useEffect, useState} from "react";
import "react-native-reanimated";
import {Slot} from "expo-router"; // ✅ Slot 사용하여 자동 라우팅
import {View} from "react-native";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import ProfileDrawer from "@/app/(drawer)/ProfileDrawer";
import {DrawerProvider, useDrawer} from "@/app/context/DrawerContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    });

    const [isDrawerOpen, setIsDrawerOpen] = useState(false); // 🔥 드로어 상태 관리

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <View style={{flex: 1}}> {/* 원하는 패딩값 지정 */}
                <DrawerProvider>
                    <View style={{flex: 1, paddingTop: 40}}>
                        <Slot/>
                    </View>
                    <DrawerConsumer/>
                </DrawerProvider>
            </View>
        </GestureHandlerRootView>
    );
}


// ✅ Drawer 상태를 읽고 ProfileDrawer를 표시하는 컴포넌트
const DrawerConsumer = () => {
    const {isDrawerOpen, closeDrawer} = useDrawer();
    return isDrawerOpen ? <ProfileDrawer isVisible={isDrawerOpen} onClose={closeDrawer}/> : null;
};
