import React, {useState} from "react";
import {ScrollView, StyleSheet, Pressable} from "react-native";
import {Box} from "@/components/ui/box";
import {Text} from "@/components/ui/text";
import {Button} from "@/components/ui/button";

const generateCalendarData = (year: number, month: number) => {
    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDay = new Date(year, month - 1, 1).getDay(); // 월 시작 요일 (0: 일요일, 1: 월요일 ...)
    let daysArray = [];

    // 앞쪽 빈 칸 추가 (월 시작 요일에 맞게)
    for (let i = 0; i < firstDay; i++) {
        daysArray.push(null);
    }

    // 실제 날짜 추가
    for (let day = 1; day <= daysInMonth; day++) {
        daysArray.push({day, month, year});
    }

    // 뒷쪽 빈 칸 추가 (마지막 주의 요일 맞추기)
    const remainingSpots = (7 - (daysArray.length % 7)) % 7;
    for (let i = 0; i < remainingSpots; i++) {
        daysArray.push(null);
    }

    return daysArray;
};

const months = [
    {year: 2025, month: 3},
    {year: 2025, month: 4},
    {year: 2025, month: 5},
    {year: 2025, month: 6},
];

const SelectDateScreen = () => {
    const [selectedStart, setSelectedStart] = useState<{ day: number; month: number } | null>(null);
    const [selectedEnd, setSelectedEnd] = useState<{ day: number; month: number } | null>(null);

    const handleDatePress = (day: number, month: number) => {
        if (!selectedStart || (selectedStart && selectedEnd)) {
            setSelectedStart({day, month});
            setSelectedEnd(null);
        } else if (selectedStart && !selectedEnd) {
            if (month > selectedStart.month || (month === selectedStart.month && day >= selectedStart.day)) {
                setSelectedEnd({day, month});
            } else {
                setSelectedStart({day, month});
            }
        }
    };

    const isSelected = (day: number, month: number) => {
        if (!selectedStart) return false;
        if (selectedStart.day === day && selectedStart.month === month) return "start";
        if (selectedEnd?.day === day && selectedEnd.month === month) return "end";
        if (
            selectedStart &&
            selectedEnd &&
            (month > selectedStart.month || (month === selectedStart.month && day > selectedStart.day)) &&
            (month < selectedEnd.month || (month === selectedEnd.month && day < selectedEnd.day))
        ) {
            return "range";
        }
        return false;
    };

    return (
        <Box style={styles.container}>
            {/* 상단 타이틀 */}
            <Box style={styles.header}>
                <Pressable onPress={() => console.log("뒤로 가기")}>
                    <Text style={styles.backButton}>✕</Text>
                </Pressable>
                <Text style={styles.title}>여행날짜 수정</Text>
                <Pressable onPress={() => console.log("일정 삭제")}>
                    <Text style={styles.deleteText}>일정삭제</Text>
                </Pressable>
            </Box>

            <Text style={styles.subtitle}>일정에 따른 날씨 예보, 여행 정보를 알려드립니다.</Text>

            {/* 스크롤 가능한 캘린더 */}
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.calendarContainer}>
                {months.map(({year, month}) => (
                    <Box key={`${year}-${month}`}>
                        <Text style={styles.monthTitle}>{`${year}년 ${month}월`}</Text>
                        <Box style={styles.weekRow}>
                            {["일", "월", "화", "수", "목", "금", "토"].map((day, index) => (
                                <Text key={index} style={styles.weekText}>
                                    {day}
                                </Text>
                            ))}
                        </Box>
                        <Box style={styles.daysGrid}>
                            {generateCalendarData(year, month).map((date, index) =>
                                date ? (
                                    <Pressable
                                        key={index}
                                        style={[
                                            styles.dayContainer,
                                            isSelected(date.day, date.month) === "start" && styles.startDay,
                                            isSelected(date.day, date.month) === "end" && styles.endDay,
                                            isSelected(date.day, date.month) === "range" && styles.rangeDay,
                                        ]}
                                        onPress={() => handleDatePress(date.day, date.month)}
                                    >
                                        <Text
                                            style={[
                                                styles.dayText,
                                                date.day === new Date().getDate() &&
                                                date.month === new Date().getMonth() + 1 &&
                                                styles.todayText,
                                            ]}
                                        >
                                            {date.day}
                                        </Text>
                                    </Pressable>
                                ) : (
                                    <Box key={index} style={styles.emptyDay}/>
                                )
                            )}
                        </Box>
                    </Box>
                ))}
            </ScrollView>

            {/* 하단 등록 버튼 */}
            <Button style={styles.bottomButton}>
                <Text style={styles.bottomButtonText}>
                    {selectedStart && selectedEnd
                        ? `${selectedStart.month}.${selectedStart.day} - ${selectedEnd.month}.${selectedEnd.day} / 등록 완료`
                        : "여행 날짜를 선택하세요"}
                </Text>
            </Button>
        </Box>
    );
};

export default SelectDateScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
    },
    backButton: {
        fontSize: 24,
        color: "#000",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000",
    },
    deleteText: {
        fontSize: 14,
        color: "#007AFF",
    },
    subtitle: {
        fontSize: 14,
        color: "#666",
        paddingHorizontal: 16,
        marginBottom: 12,
    },
    calendarContainer: {
        paddingHorizontal: 16,
        paddingBottom: 80,
    },
    monthTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 12,
    },
    weekRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    weekText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#888",
        width: "14.2%",
        textAlign: "center",
    },
    daysGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    dayContainer: {
        width: "14.2%",
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 4,
        borderRadius: 20,
    },
    startDay: {
        backgroundColor: "#007AFF",
    },
    endDay: {
        backgroundColor: "#007AFF",
    },
    rangeDay: {
        backgroundColor: "#E3F2FD",
    },
    dayText: {
        fontSize: 16,
    },
    todayText: {
        color: "#007AFF",
        fontWeight: "bold",
    },
    emptyDay: {
        width: "14.2%",
        height: 40,
    },
    bottomButton: {
        backgroundColor: "#007AFF",
        padding: 16,
        justifyContent: "center",
        alignItems: "center",
    },
    bottomButtonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#FFF",
    },
});