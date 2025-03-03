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
    { id: "1", type: "weather", size: "full" }, // 날씨 위젯 (100% 너비)
    { id: "2", type: "currency", size: "half" }, // 환율 위젯 (50% 너비)
    { id: "3", type: "destination", size: "half" }, // 목적지 위젯 (50% 너비)
    { id: "4", type: "budget", size: "half" }, // 예산 위젯 (50% 너비)
];

const hourlyWeatherData = [
    { time: "5PM", icon: "cloud-outline", temp: "4°" },
    { time: "6PM", icon: "cloud-outline", temp: "3°" },
    { time: "6:27PM", icon: "sunny-outline", temp: "2°" },
    { time: "7PM", icon: "cloud-outline", temp: "2°" },
    { time: "8PM", icon: "cloud-outline", temp: "1°" },
    { time: "9PM", icon: "cloud-outline", temp: "0°" },
];

const Widget = ({ type }: { type: string }) => {
    switch (type) {
        case "weather":
            return (
                <Box style={[styles.widget, styles.weatherWidget]}>
                    <HStack style={styles.weatherHeader}>
                        <VStack>
                            <Text style={styles.weatherLocation}>용인시</Text>
                            <Text style={styles.weatherTemp}>5°</Text>
                        </VStack>
                        <VStack style={styles.weatherInfo}>
                            <Icon as={Ionicons} name="cloud-outline" size="3xl" color="white" />
                            <Text style={styles.weatherDesc}>Cloudy</Text>
                            <Text style={styles.weatherSubText}>H:6° L:0°</Text>
                        </VStack>
                    </HStack>
                    <HStack style={styles.weatherHourly}>
                        {hourlyWeatherData.map((hour, index) => (
                            <VStack key={index} style={styles.weatherHourItem}>
                                <Text style={styles.weatherHourText}>{hour.time}</Text>
                                <Icon as={Ionicons} name={hour.icon} size="md" color="white" />
                                <Text style={styles.weatherHourTemp}>{hour.temp}</Text>
                            </VStack>
                        ))}
                    </HStack>
                </Box>
            );
        case "currency":
            return (
                <Box style={[styles.widget, styles.currencyWidget]}>
                    <HStack style={styles.currencyRow}>
                        <Text style={styles.currencyLabel}>🇺🇸 USD</Text>
                        <Text style={styles.currencyValue}>1,459.73원</Text>
                    </HStack>
                    <HStack style={styles.currencyRow}>
                        <Text style={styles.currencyLabel}>🇪🇺 EUR</Text>
                        <Text style={styles.currencyValue}>1,520.84원</Text>
                    </HStack>
                </Box>
            );
        case "destination":
            return (
                <Box style={[styles.widget, styles.destinationWidget]}>
                    <VStack style={styles.centerContent}>
                        <Text style={styles.destinationTitle}>📍 도쿄</Text>
                        <Text style={styles.destinationSubtitle}>여행 중</Text>
                    </VStack>
                </Box>
            );
        case "budget":
            return (
                <Box style={[styles.widget, styles.budgetWidget]}>
                    <VStack style={styles.centerContent}>
                        <Text style={styles.budgetTitle}>💰 남은 예산</Text>
                        <Text style={styles.budgetAmount}>₩250,000</Text>
                    </VStack>
                </Box>
            );
        default:
            return null;
    }
};

const TravelHomeScreen = () => {
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
                            style={[styles.gridItem, widget.size === "full" ? styles.fullWidth : styles.halfWidth]}
                            _extra={{
                                className: widget.size === "full" ? "col-span-6" : "col-span-3",
                            }}
                        >
                            <Widget type={widget.type} />
                        </GridItem>
                    ))}
                </Grid>
            </ScrollView>
        </Box>
    );
};

export default TravelHomeScreen;

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
    gridItem: {
        borderRadius: 16,
        overflow: "hidden",
    },
    fullWidth: {
        width: "100%",
    },
    halfWidth: {
        width: "48%",
    },

    // ✅ Apple 스타일 위젯 디자인
    widget: {
        borderRadius: 18,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        minHeight : 100
    },

    weatherWidget: {
        backgroundColor: "#4A90E2",
    },
    weatherHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    weatherFooter: {
        marginTop: 8,
        justifyContent: "center",
    },
    weatherTemp: {
        fontSize: 40,
        fontWeight: "bold",
        color: "white",
    },
    weatherDesc: {
        fontSize: 16,
        color: "white",
    },
    weatherSubText: {
        fontSize: 14,
        color: "white",
    },

    currencyWidget: {
        backgroundColor: "#FFF",
    },
    currencyRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    currencyLabel: {
        fontSize: 14,
        color: "#333",
    },
    currencyValue: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000",
    },

    destinationWidget: {
        backgroundColor: "#222",
    },
    destinationContent: {
        justifyContent: "center",
        alignItems: "center",
    },
    destinationTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
    },
    destinationSubtitle: {
        fontSize: 14,
        color: "white",
    },

    budgetWidget: {
        backgroundColor: "#FFD700",
    },
    budgetContent: {
        justifyContent: "center",
        alignItems: "center",
    },
    budgetTitle: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#333",
    },
    budgetAmount: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#000",
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