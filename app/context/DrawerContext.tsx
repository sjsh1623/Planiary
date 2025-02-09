import React, {createContext, useContext, useRef, useState} from "react";
import {Animated, Dimensions} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const DRAWER_WIDTH = SCREEN_WIDTH * 0.7;
const ANIMATION_DURATION = 300;

interface DrawerContextType {
    isDrawerOpen: boolean;
    openDrawer: () => void;
    closeDrawer: () => void;
    translateX: Animated.Value;
    backdropOpacity: Animated.Value;
    shouldRender: boolean;
}

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

export const DrawerProvider = ({children}: { children: React.ReactNode }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);
    const translateX = useRef(new Animated.Value(SCREEN_WIDTH)).current;
    const backdropOpacity = useRef(new Animated.Value(0)).current;

    const openDrawer = () => {
        setShouldRender(true); // ✅ 애니메이션 전에 렌더링 활성화
        setIsDrawerOpen(true);
        Animated.parallel([
            Animated.timing(translateX, {
                toValue: SCREEN_WIDTH - DRAWER_WIDTH,
                duration: ANIMATION_DURATION,
                useNativeDriver: true,
            }),
            Animated.timing(backdropOpacity, {
                toValue: 1,
                duration: ANIMATION_DURATION,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const closeDrawer = () => {
        Animated.parallel([
            Animated.timing(translateX, {
                toValue: SCREEN_WIDTH,
                duration: ANIMATION_DURATION,
                useNativeDriver: true,
            }),
            Animated.timing(backdropOpacity, {
                toValue: 0,
                duration: ANIMATION_DURATION,
                useNativeDriver: true,
            }),
        ]).start(() => {
            setIsDrawerOpen(false);
            setShouldRender(false); // ✅ 애니메이션 완료 후 비활성화
        });
    };

    return (
        <DrawerContext.Provider
            value={{isDrawerOpen, openDrawer, closeDrawer, translateX, backdropOpacity, shouldRender}}>
            {children}
        </DrawerContext.Provider>
    );
};

export const useDrawer = () => {
    const context = useContext(DrawerContext);
    if (!context) {
        throw new Error("useDrawer must be used within a DrawerProvider");
    }
    return context;
};
