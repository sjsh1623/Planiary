import React, { useState, useRef } from "react";
import {
    View,
    Text,
    Image,
    Pressable,
    StyleSheet,
    Animated,
    Dimensions,
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

const ProfileScreen = () => {
    const [activeTab, setActiveTab] = useState<"내 여행" | "리뷰" | "여행기">("내 여행");
    const translateX = useRef(new Animated.Value(0)).current;
    const underlineX = useRef(new Animated.Value(0)).current;

    const hasTrips = true; // 여행 일정이 있는지 여부
    const hasReviews = false; // 리뷰가 있는지 여부
    const hasTravelLogs = false; // 여행기가 있는지 여부

    const tabList = ["내 여행", "리뷰", "여행기"];

    const handleTabPress = (tab: "내 여행" | "리뷰" | "여행기", index: number) => {
        Animated.spring(translateX, {
            toValue: -SCREEN_WIDTH * index,
            useNativeDriver: true,
        }).start();

        Animated.spring(underlineX, {
            toValue: (SCREEN_WIDTH / 3) * index,
            useNativeDriver: true,
        }).start();

        setActiveTab(tab);
    };

    return (
        <View style={styles.container}>
            {/* 프로필 정보 */}
            <View style={styles.profileContainer}>
                <Image source={{ uri: "https://via.placeholder.com/80" }} style={styles.profileImage} />
                <Text style={styles.username}>라라라라</Text>
                <Pressable onPress={() => console.log("프로필 편집")} style={styles.editProfileButton}>
                    <Text style={styles.editProfileText}>프로필 편집</Text>
                </Pressable>
            </View>

            {/* 탭 메뉴 */}
            <View style={styles.tabs}>
                {tabList.map((tab, index) => (
                    <Pressable
                        key={tab}
                        style={styles.tabPressable}
                        onPress={() => handleTabPress(tab as "내 여행" | "리뷰" | "여행기", index)}
                    >
                        <Text style={[styles.tabText, activeTab === tab && styles.activeTab]}>
                            {tab}
                        </Text>
                    </Pressable>
                ))}
                <Animated.View style={[styles.underline, { transform: [{ translateX: underlineX }] }]} />
            </View>

            {/* 슬라이드 애니메이션이 적용된 컨텐츠 */}
            <Animated.View style={[styles.contentWrapper, { transform: [{ translateX }] }]}>
                <View style={styles.contentContainer}>
                    {hasTrips ? (
                        <View>
                            <Pressable style={styles.createTripContainer}>
                                <Text style={styles.createTripText}>+ 여행 일정 만들기</Text>
                                <Text style={styles.createTripSubText}>새로운 여행을 떠나보세요.</Text>
                            </Pressable>
                            <Text style={styles.upcomingTripTitle}>다가오는 여행</Text>
                            <View style={styles.tripItem}>
                                <Image source={{ uri: "https://via.placeholder.com/60" }} style={styles.tripImage} />
                                <View>
                                    <Text style={styles.tripTitle}>도쿄 여행</Text>
                                    <Text style={styles.tripDate}>2025.2.15 - 2.16</Text>
                                    <Text style={styles.tripInfo}>1개 도시</Text>
                                </View>
                            </View>
                        </View>
                    ) : (
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyTitle}>여행을 떠나시나요?</Text>
                            <Text style={styles.emptySubtitle}>여행 일정을 만들고 계획을 세워보세요.</Text>
                            <Pressable style={styles.createButton}>
                                <Text style={styles.createButtonText}>일정 만들기</Text>
                            </Pressable>
                        </View>
                    )}
                </View>

                {/* 리뷰 탭 */}
                <View style={styles.contentContainer}>
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyTitle}>작성한 리뷰가 없습니다.</Text>
                        <Text style={styles.emptySubtitle}>다녀온 여행지의 리뷰를 남겨보세요.</Text>
                    </View>
                </View>

                {/* 여행기 탭 */}
                <View style={styles.contentContainer}>
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyTitle}>작성한 여행기가 없습니다.</Text>
                        <Text style={styles.emptySubtitle}>소중한 추억을 여행기로 남겨보세요.</Text>
                    </View>
                </View>
            </Animated.View>
        </View>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
    },
    profileContainer: {
        alignItems: "center",
        paddingTop: 40,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 8,
    },
    username: {
        fontSize: 18,
        fontWeight: "bold",
    },
    editProfileButton: {
        position: "absolute",
        right: 20,
        top: 50,
    },
    editProfileText: {
        color: "#007AFF",
        fontSize: 14,
    },
    tabs: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#E0E0E0",
        paddingBottom: 10,
        position: "relative",
    },
    tabPressable: {
        flex: 1,
        alignItems: "center",
        paddingVertical: 10,
    },
    tabText: {
        fontSize: 16,
        color: "#A0A0A0",
    },
    activeTab: {
        fontWeight: "bold",
        color: "#000",
    },
    underline: {
        position: "absolute",
        bottom: 0,
        width: "33.3%",
        height: 2,
        backgroundColor: "#007AFF",
    },
    contentWrapper: {
        flexDirection: "row",
        width: SCREEN_WIDTH * 3,
    },
    contentContainer: {
        width: SCREEN_WIDTH,
        paddingHorizontal: 20,
        marginTop: 20,
    },
    emptyContainer: {
        alignItems: "center",
        marginTop: 50,
    },
    emptyTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 8,
    },
    emptySubtitle: {
        fontSize: 14,
        color: "#888",
    },
    createButton: {
        marginTop: 20,
        backgroundColor: "#007AFF",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
    },
    createButtonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
    },
    createTripContainer: {
        backgroundColor: "#F2F8FF",
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    createTripText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#007AFF",
    },
    createTripSubText: {
        fontSize: 14,
        color: "#666",
        marginTop: 5,
    },
    upcomingTripTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    tripItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F8F8F8",
        padding: 10,
        borderRadius: 10,
    },
    tripImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 10,
    },
    tripTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
    tripDate: {
        fontSize: 14,
        color: "#666",
    },
    tripInfo: {
        fontSize: 14,
        color: "#888",
    },
});