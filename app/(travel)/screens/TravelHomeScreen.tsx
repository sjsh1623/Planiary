import React, {useState} from "react";
import {ScrollView, StyleSheet} from "react-native";
import {Box} from "@/components/ui/box";
import {Text} from "@/components/ui/text";
import {Icon} from "@/components/ui/icon";
import {Pressable} from "@/components/ui/pressable";
import {HStack} from "@/components/ui/hstack";
import {VStack} from "@/components/ui/vstack";
import {Ionicons} from "@expo/vector-icons";
import {Grid, GridItem} from "@/components/ui/grid";

const initialWidgets = [
    {id: "1", title: "위젯 1", size: "full"}, // 100% 너비
    {id: "2", title: "위젯 2", size: "half"}, // 50% 너비
    {id: "3", title: "위젯 3", size: "half"}, // 50% 너비
    {id: "4", title: "위젯 4", size: "full"}, // 100% 너비
    {id: "5", title: "위젯 5", size: "half"},
    {id: "6", title: "위젯 6", size: "half"},
];

const TravelChatScreen = () => {
    const [widgets, setWidgets] = useState(initialWidgets);

    return (
        <Box style={styles.container}>
            {/* ✅ 상단 영역 */}
            <Box style={styles.header}>
                <HStack style={styles.headerTop}>
                    <Pressable>
                        <Icon as={Ionicons} name="close-outline" size="2xl" color="white"/>
                    </Pressable>
                    <HStack>
                        <Pressable>
                            <Icon as={Ionicons} name="search-outline" size="2xl" color="white"/>
                        </Pressable>
                        <Pressable style={{marginLeft: 16}}>
                            <Icon as={Ionicons} name="map-outline" size="2xl" color="white"/>
                        </Pressable>
                        <Pressable style={{marginLeft: 16}}>
                            <Icon as={Ionicons} name="menu-outline" size="2xl" color="white"/>
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

            {/* ✅ Grid (위젯 리스트) */}
            <ScrollView contentContainerStyle={styles.widgetContainer}>
                <Grid
                    style={styles.grid}
                    _extra={{
                        className: "grid-cols-6",
                    }}
                >
                    {widgets.map((widget) => (
                        <GridItem
                            key={widget.id}
                            style={styles.widget}
                            className="bg-background-50 p-4 rounded-md text-center"
                            _extra={{
                                className: widget.size === "full" ? "col-span-6" : "col-span-3",
                            }}
                        >
                            <Text className="text-sm">{widget.title}</Text>
                        </GridItem>
                    ))}
                </Grid>
            </ScrollView>
        </Box>
    );
};

export default TravelChatScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    header: {
        backgroundColor: "#26C6DA",
        paddingTop: 100,
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
        paddingVertical: 20,
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
    widgetContainer: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: "#FFFFFF",
    },
    grid: {
        gap: 15,
    },
    widget: {
        backgroundColor: "#F0F0F0",
        padding: 16,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        height: '40%'
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
});