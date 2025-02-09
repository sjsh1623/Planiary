import React, {useEffect, useRef} from "react";
import {Animated, Pressable, ScrollView, StyleSheet, Dimensions, View} from "react-native";
import {Box} from "@/components/ui/box";
import {HStack} from "@/components/ui/hstack";
import {VStack} from "@/components/ui/vstack";
import {Text} from "@/components/ui/text";
import {Icon} from "@/components/ui/icon";
import {Ionicons} from "@expo/vector-icons";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {useDrawer} from "@/app/context/DrawerContext";

const SCREEN_WIDTH = Dimensions.get("window").width;
const DRAWER_WIDTH = SCREEN_WIDTH * 0.7 // 화면의 80% 차지
interface ProfileDrawerProps {
    isVisible: boolean;
    onClose: () => void;
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({isVisible, onClose}) => {
    const {translateX, backdropOpacity, shouldRender} = useDrawer();
    if (!shouldRender) return null; // ✅ 애니메이션이 끝나면 제거

    return (
        <GestureHandlerRootView style={styles.overlay}>
            {/* 🔥 배경 클릭 시 닫기 */}
            <Animated.View style={[styles.backdrop, {opacity: backdropOpacity}]}>
                <Pressable style={styles.backdropTouchable} onPress={onClose}/>
            </Animated.View>
            <View style={styles.drawerContainer}>
                <Animated.View style={[styles.drawer, {transform: [{translateX}]}]}>
                    {/* 닫기 버튼 */}
                    <Pressable style={styles.closeButton} onPress={onClose}>
                        <Icon as={Ionicons} name="close" size="xl" color="black"/>
                    </Pressable>

                    {/* 프로필 정보 */}
                    <HStack style={styles.profileSection}>
                        <VStack>
                            <Text style={styles.userName}>라라라라</Text>
                            <Pressable onPress={() => console.log("프로필 편집")}>
                                <Text style={styles.editProfile}>프로필 편집</Text>
                            </Pressable>
                        </VStack>
                        <Box style={styles.profileImage}/>
                    </HStack>

                    {/* ✅ 수평 메뉴 (내 여행, 내 저장, 내 리뷰, 내 여행기) */}
                    <HStack style={styles.menuRow}>
                        <VStack style={styles.menuItem}>
                            <Icon as={Ionicons} name="airplane" size="xl" color="black"/>
                            <Text style={styles.menuText}>내 여행</Text>
                        </VStack>
                        <VStack style={styles.menuItem}>
                            <Icon as={Ionicons} name="heart-outline" size="xl" color="black"/>
                            <Text style={styles.menuText}>내 저장</Text>
                        </VStack>
                        <VStack style={styles.menuItem}>
                            <Icon as={Ionicons} name="star-outline" size="xl" color="black"/>
                            <Text style={styles.menuText}>내 리뷰</Text>
                        </VStack>
                        <VStack style={styles.menuItem}>
                            <Icon as={Ionicons} name="document-text-outline" size="xl" color="black"/>
                            <Text style={styles.menuText}>내 여행기</Text>
                        </VStack>
                    </HStack>

                    {/* ✅ 목록 메뉴 (세로 정렬) */}
                    <ScrollView style={styles.menuList}>
                        {[
                            {label: "내 예약"},
                            {label: "쿠폰함", badge: "19"},
                            {label: "트리플 캐시", badge: "0"},
                            {label: "여행자 클럽", highlight: "LEVEL 0 OP"},
                            {label: "오프라인 가이드"}
                        ].map((item, index) => (
                            <Pressable key={index} style={styles.menuItemRow}>
                                <Text style={styles.menuItemText}>{item.label}</Text>
                                {item.badge && <Text style={styles.badge}>{item.badge}</Text>}
                                {item.highlight && <Text style={styles.highlight}>{item.highlight}</Text>}
                            </Pressable>
                        ))}
                    </ScrollView>

                    {/* ✅ 하단 공지사항 & 고객센터 */}
                    <HStack style={styles.footer}>
                        <Pressable>
                            <Text style={styles.notice}>공지사항</Text>
                        </Pressable>
                        <Pressable>
                            <Text style={styles.notice}>고객센터</Text>
                        </Pressable>
                    </HStack>

                    {/* ✅ 하단 배너 */}
                    <Box style={styles.banner}>
                        <Text style={styles.bannerText}>트리플 200% 사용 설명서</Text>
                        <Text style={styles.bannerSubText}>알고 쓰면 더 매력적인 트리플</Text>
                    </Box>
                </Animated.View>
            </View>

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
        justifyContent: "flex-end",
        alignItems: "flex-end",
    },
    backdrop: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    backdropTouchable: {
        flex: 1,
    },
    drawerContainer: {
        width: "100%"
    },
    drawer: {
        width: DRAWER_WIDTH,
        height: "100%",
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingTop: 80,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
    },
    closeButton: {
        position: "absolute",
        top: 20,
        right: 20,
    },
    profileSection: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#ddd",
    },
    userName: {
        fontSize: 18,
        fontWeight: "bold",
    },
    editProfile: {
        fontSize: 14,
        color: "blue",
    },
    menuRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    menuItem: {
        alignItems: "center",
        flex: 1,
    },
    menuText: {
        fontSize: 14,
        marginTop: 5,
    },
    menuList: {
        flexGrow: 0,
        marginBottom: 20,
    },
    menuItemRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB",
    },
    menuItemText: {
        fontSize: 16,
    },
    badge: {
        fontSize: 16,
        color: "red",
        fontWeight: "bold",
    },
    highlight: {
        fontSize: 16,
        color: "blue",
        fontWeight: "bold",
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 15,
        borderTopWidth: 1,
        borderTopColor: "#E5E7EB",
    },
    notice: {
        fontSize: 16,
        fontWeight: "bold",
    },
    banner: {
        backgroundColor: "#007BFF",
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
    },
    bannerText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
    },
    bannerSubText: {
        fontSize: 14,
        color: "white",
    },
});
