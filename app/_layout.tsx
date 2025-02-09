import "@/global.css";
import {useFonts} from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import {useEffect, useState} from "react";
import "react-native-reanimated";
import {Slot, Stack} from "expo-router"; // ✅ Stack 사용
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
            <DrawerProvider>
                <View style={{flex: 1, paddingTop: 40}}>
                    <Stack screenOptions={{headerShown: false}}>
                        <Stack.Screen name="(tabs)"/>
                        <Stack.Screen name="(auth)"/>
                    </Stack>
                </View>
                {/* ✅ Profile Drawer 관리 */}
                <DrawerConsumer/>
            </DrawerProvider>
        </GestureHandlerRootView>
    );
}

// ✅ Drawer 상태를 읽고 ProfileDrawer를 표시하는 컴포넌트
const DrawerConsumer = () => {
    const {isDrawerOpen, closeDrawer} = useDrawer();
    return isDrawerOpen ? <ProfileDrawer isVisible={isDrawerOpen} onClose={closeDrawer}/> : null;
};
