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
    {id: "1", type: "weather", size: "full"}, // 날씨 위젯 (100% 너비)
    {id: "2", type: "currency", size: "half"}, // 환율 위젯 (50% 너비)
    {id: "3", type: "destination", size: "half"}, // 목적지 위젯 (50% 너비)
    {id: "4", type: "budget", size: "half"}, // 예산 위젯 (50% 너비)
];

const hourlyWeatherData = [
    {time: "5PM", icon: "cloud-outline", temp: "4°"},
    {time: "6PM", icon: "cloud-outline", temp: "3°"},
    {time: "6:27PM", icon: "sunny-outline", temp: "2°"},
    {time: "7PM", icon: "cloud-outline", temp: "2°"},
    {time: "8PM", icon: "cloud-outline", temp: "1°"},
    {time: "9PM", icon: "cloud-outline", temp: "0°"},
];

const Widget = ({type}: { type: string }) => {
    switch (type) {
        case "weather":
            return (
                <Box style={[styles.widget, styles.weatherWidget]}>
                    <HStack style={styles.weatherHeader}>
                        <VStack style={{}}>
                            <Text style={styles.weatherLocation}>용인시</Text>
                            <Text style={styles.weatherTemp}>5°</Text>
                        </VStack>
                        <VStack style={styles.weatherInfo}>
                            <Icon as={Ionicons} name="cloud-outline" size="3xl" color="white"/>
                            <Text style={styles.weatherDesc}>Cloudy</Text>
                            <Text style={styles.weatherSubText}>H:6° L:0°</Text>
                        </VStack>
                    </HStack>
                    <HStack style={styles.weatherHourly}>
                        {hourlyWeatherData.map((hour, index) => (
                            <VStack key={index} style={styles.weatherHourItem}>
                                <Text style={styles.weatherHourText}>{hour.time}</Text>
                                <Icon as={Ionicons} name={hour.icon} size="md" color="white"/>
                                <Text style={styles.weatherHourTemp}>{hour.temp}</Text>
                            </VStack>
                        ))}
                    </HStack>
                </Box>
            );
        case "currency":
            return (
                <Box style={[styles.widget, styles.currencyWidget]}>
                    <Text style={styles.widgetTitle}>환율</Text>
                    <Text style={styles.widgetContent}>1,459.73원</Text>
                </Box>
            );
        case "destination":
            return (
                <Box style={[styles.widget, styles.defaultWidget]}>
                    <Text style={styles.widgetTitle}>📍 목적지</Text>
                    <Text style={styles.widgetContent}>도쿄</Text>
                </Box>
            );
        case "budget":
            return (
                <Box style={[styles.widget, styles.defaultWidget]}>
                    <Text style={styles.widgetTitle}>💰 예산</Text>
                    <Text style={styles.widgetContent}>₩250,000</Text>
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
                            <Widget type={widget.type}/>
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
    },    // ✅ Apple 스타일 위젯 디자인
    widget: {
        borderRadius: 18,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        minHeight: 100,
        justifyContent: "space-between", // ✅ 위젯 내부 요소 배치를 위-아래로
    },
    weatherWidget: {
        backgroundColor: "#4A90E2",
        width: "100%",
        minHeight: 220, // ✅ 높이를 충분히 확보하여 텍스트가 잘리지 않도록 수정
        padding: 20,
        borderRadius: 16,
        overflow: "hidden", // ✅ 넘치는 요소 방지
    },
    weatherHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap", // ✅ 컨텐츠가 너무 커지면 줄바꿈 가능하도록
    },
    weatherTextContainer: {
        flexGrow: 1, // ✅ 공간이 부족하면 자동 확장
        alignItems: "flex-start",
    },
    weatherTemp: {
        fontSize: 50, // ✅ 글자 크기 유지
        fontWeight: "bold",
        color: "white",
        lineHeight: 60, // ✅ 텍스트가 잘리지 않도록 추가
        minWidth: 100, // ✅ 최소 너비 확보
        flexShrink: 1, // ✅ 필요하면 자동 축소
        overflow: "visible", // ✅ 텍스트가 줄어들지 않도록
    },
    weatherInfo: {
        alignItems: "flex-end",
    },
    weatherDesc: {
        fontSize: 16,
        color: "white",
    },
    weatherSubText: {
        fontSize: 14,
        color: "white",
    },
    weatherHourly: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "100%",
        marginTop: 12,
    },
    weatherHourItem: {
        alignItems: "center",
    },
    weatherHourText: {
        fontSize: 14,
        color: "white",
    },
    weatherHourTemp: {
        fontSize: 14,
        color: "white",
        marginTop: 4,
    },
    // ✅ 공통 스타일 (제목 왼쪽, 내용 오른쪽 하단)
    defaultWidget: {
        backgroundColor: "#F8F8F8",
    },
    widgetTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        position: "absolute",
        top: 10,
        left: 10,
    },
    widgetContent: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000",
        position: "absolute",
        bottom: 10,
        right: 10,
    },

    currencyWidget: {
        backgroundColor: "#FFF",
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
    centerContent: {
        justifyContent: "center",
        alignItems: "center",
    },
});