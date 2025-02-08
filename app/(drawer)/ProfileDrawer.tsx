import React, {useEffect, useRef} from "react";
import {Pressable, Animated, Dimensions, StyleSheet} from "react-native";
import {Box} from "@/components/ui/box";
import {HStack} from "@/components/ui/hstack";
import {Text} from "@/components/ui/text";
import {Icon} from "@/components/ui/icon";
import {Ionicons} from "@expo/vector-icons";
import {GestureHandlerRootView} from "react-native-gesture-handler";

const SCREEN_WIDTH = Dimensions.get("window").width;
const DRAWER_WIDTH = SCREEN_WIDTH * 0.8; // ✅ 화면의 80% 차지

interface ProfileDrawerProps {
    isVisible: boolean;
    onClose: () => void;
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({isVisible, onClose}) => {
    const translateX = useRef(new Animated.Value(SCREEN_WIDTH)).current;

    useEffect(() => {
        Animated.timing(translateX, {
            toValue: isVisible ? SCREEN_WIDTH - DRAWER_WIDTH : SCREEN_WIDTH,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [isVisible]);

    return (
        <GestureHandlerRootView style={styles.overlay}>
            {/* 🔥 배경 클릭 시 닫기 */}
            <Pressable style={styles.backdrop} onPress={onClose}/>

            <Animated.View style={[styles.drawer, {transform: [{translateX}]}]}>
                {/* 닫기 버튼 */}
                <Pressable style={styles.closeButton} onPress={onClose}>
                    <Icon as={Ionicons} name="close" size="2xl" color="black"/>
                </Pressable>

                {/* 프로필 정보 */}
                <HStack style={styles.profileSection}>
                    <Text style={styles.userName}>석현님</Text>
                </HStack>

                {/* 내 여행 메뉴 */}
                <Pressable style={styles.menuItem}>
                    <Text style={styles.menuText}>내 여행</Text>
                </Pressable>
                <Pressable style={styles.menuItem}>
                    <Text style={styles.menuText}>내 저장</Text>
                </Pressable>
                <Pressable style={styles.menuItem}>
                    <Text style={styles.menuText}>내 리뷰</Text>
                </Pressable>
                <Pressable style={styles.menuItem}>
                    <Text style={styles.menuText}>내 여행기</Text>
                </Pressable>
            </Animated.View>
        </GestureHandlerRootView>
    );
};

export default ProfileDrawer;

const styles = StyleSheet.create({
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "flex-end",
        alignItems: "flex-end",
    },
    backdrop: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
    },
    drawer: {
        width: DRAWER_WIDTH,
        height: "100%",
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingTop: 50,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
    },
    closeButton: {
        position: "absolute",
        top: 20,
        right: 20,
    },
    profileSection: {
        marginTop: 20,
        marginBottom: 20,
    },
    userName: {
        fontSize: 18,
        fontWeight: "bold",
    },
    menuItem: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB",
    },
    menuText: {
        fontSize: 16,
    },
});
