import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Ionicons } from "@expo/vector-icons";

const TravelChatScreen = () => {
    return (
        <Box style={styles.container}>
            {/* 상단 영역 */}
            <Box style={styles.header}>
                <HStack style={styles.headerTop}>
                    <Pressable>
                        <Icon as={Ionicons} name="close-outline" size="2xl" color="white" />
                    </Pressable>
                    <HStack>
                        <Pressable>
                            <Icon as={Ionicons} name="search-outline" size="2xl" color="white" />
                        </Pressable>
                        <Pressable style={{ marginLeft: 16 }}>
                            <Icon as={Ionicons} name="map-outline" size="2xl" color="white" />
                        </Pressable>
                        <Pressable style={{ marginLeft: 16 }}>
                            <Icon as={Ionicons} name="menu-outline" size="2xl" color="white" />
                        </Pressable>
                    </HStack>
                </HStack>
                <VStack style={styles.headerContent}>
                    <Text style={styles.tripLocation}>도쿄 여행</Text>
                    <Text style={styles.tripTitle}>오늘은 여행 3일차</Text>
                    <HStack style={styles.dateContainer}>
                        <Text style={styles.tripDate}>2025.2.15 - 2.22</Text>
                        <Pressable>
                            <Text style={styles.editButton}>편집</Text>
                        </Pressable>
                    </HStack>
                </VStack>
            </Box>

            {/* 카테고리 탭 */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryTabs}>
                {["현지 채팅", "맛집", "관광", "투어·티켓", "가이드", "숙소", "항공"].map((item, index) => (
                    <Pressable key={index} style={styles.categoryItem}>
                        <Text style={styles.categoryText}>{item}</Text>
                    </Pressable>
                ))}
            </ScrollView>

            {/* AI 추천 메시지 */}
            <Box style={styles.aiRecommendation}>
                <Text style={styles.aiText}>라라라라님을 위한 트리플 AI 추천</Text>
                <Icon as={Ionicons} name="information-circle-outline" size="md" color="#888" />
            </Box>

            {/* 채팅 메시지 목록 */}
            <ScrollView style={styles.chatContainer}>
                <VStack>
                    <HStack style={styles.chatBubble}>
                        <Box style={styles.profileImage} />
                        <VStack>
                            <Text style={styles.chatUser}>노마드</Text>
                            <Box style={styles.messageBubble}>
                                <Text style={styles.messageText}>오늘 광장에서 큰 행사가 있나봐요</Text>
                            </Box>
                            <Box style={styles.messageBubble}>
                                <Text style={styles.messageText}>우연히 왔는데 꽤 재밌어요 ㅋㅋ 추천!</Text>
                            </Box>
                        </VStack>
                    </HStack>
                    <HStack style={styles.chatBubble}>
                        <Box style={styles.profileImage} />
                        <VStack>
                            <Text style={styles.chatUser}>구름따라</Text>
                            <Box style={styles.messageBubble}>
                                <Text style={styles.messageText}>저 이따 가볼게요! 공유 감사해요👍</Text>
                            </Box>
                        </VStack>
                    </HStack>
                </VStack>
            </ScrollView>

            {/* 하단 배너 */}
            <Box style={styles.bottomBanner}>
                <Text style={styles.bannerText}>도쿄 현지 여행자들과 배낭톡 채팅하세요!</Text>
                <HStack style={styles.tabBar}>
                    {[
                        { icon: "home-outline", label: "여행 홈" },
                        { icon: "chatbubble-outline", label: "배낭톡" },
                        { icon: "calendar-outline", label: "일정" },
                        { icon: "heart-outline", label: "저장" },
                        { icon: "settings-outline", label: "여행 도구" },
                    ].map((item, index) => (
                        <VStack key={index} style={styles.tabItem}>
                            <Icon as={Ionicons} name={item.icon} size="lg" color="gray" />
                            <Text style={styles.tabText}>{item.label}</Text>
                        </VStack>
                    ))}
                </HStack>
            </Box>
        </Box>
    );
};

export default TravelChatScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
    },
    header: {
        backgroundColor: "#26C6DA",
        paddingTop: 50,
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    headerTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    headerContent: {
        marginTop: 16,
    },
    tripLocation: {
        fontSize: 14,
        color: "#FFFFFF",
    },
    tripTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#FFFFFF",
    },
    dateContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
    },
    tripDate: {
        fontSize: 14,
        color: "#E0F7FA",
    },
    editButton: {
        fontSize: 14,
        color: "#FFFFFF",
        marginLeft: 10,
    },
    categoryTabs: {
        flexDirection: "row",
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: "#FFFFFF",
    },
    categoryItem: {
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    categoryText: {
        fontSize: 14,
        color: "#333",
    },
    aiRecommendation: {
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        backgroundColor: "#FAFAFA",
        borderBottomWidth: 1,
        borderBottomColor: "#E0E0E0",
    },
    aiText: {
        fontSize: 14,
        color: "#333",
        marginRight: 6,
    },
    chatContainer: {
        flex: 1,
        paddingHorizontal: 16,
    },
    chatBubble: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 16,
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#D1C4E9",
        marginRight: 12,
    },
    chatUser: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 4,
    },
    messageBubble: {
        backgroundColor: "#E3F2FD",
        padding: 12,
        borderRadius: 8,
        marginBottom: 6,
    },
    messageText: {
        fontSize: 14,
        color: "#333",
    },
    bottomBanner: {
        backgroundColor: "#FFFFFF",
        padding: 12,
    },
    bannerText: {
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 8,
    },
    tabBar: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 12,
    },
    tabItem: {
        alignItems: "center",
    },
    tabText: {
        fontSize: 12,
        color: "gray",
        marginTop: 4,
    },
});