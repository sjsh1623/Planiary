import React, { useState, useEffect, useRef } from "react";
import { FlatList, StyleSheet, Pressable } from "react-native";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";

// ✅ 캘린더 데이터 생성 함수
const generateCalendarData = (year: number, month: number) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay(); // 월 시작 요일 (0: 일요일, 1: 월요일 ...)
    let daysArray = [];

    // 앞쪽 빈 칸 추가 (월 시작 요일에 맞게)
    for (let i = 0; i < firstDay; i++) {
        daysArray.push(null);
    }

    // 실제 날짜 추가
    for (let day = 1; day <= daysInMonth; day++) {
        daysArray.push({ day, month, year });
    }

    // 뒷쪽 빈 칸 추가 (마지막 주의 요일 맞추기)
    const remainingSpots = (7 - (daysArray.length % 7)) % 7;
    for (let i = 0; i < remainingSpots; i++) {
        daysArray.push(null);
    }

    return daysArray;
};

// ✅ 초기 달 범위 설정 (현재 달 ±3년)
const currentDate = new Date();
const START_YEAR = currentDate.getFullYear() - 3;
const END_YEAR = currentDate.getFullYear() + 3;

// ✅ 초기 달 데이터 로드
const generateInitialMonths = () => {
    let monthsArray = [];
    for (let year = START_YEAR; year <= END_YEAR; year++) {
        for (let month = 0; month < 12; month++) {
            monthsArray.push({ year, month });
        }
    }
    return monthsArray;
};

const SelectDateScreen = () => {
    const [months, setMonths] = useState(generateInitialMonths());
    const [selectedStart, setSelectedStart] = useState<{ day: number; month: number; year: number } | null>(null);
    const [selectedEnd, setSelectedEnd] = useState<{ day: number; month: number; year: number } | null>(null);
    const flatListRef = useRef<FlatList>(null);

    // ✅ 날짜 선택 핸들러
    const handleDatePress = (day: number, month: number, year: number) => {
        if (!selectedStart || (selectedStart && selectedEnd)) {
            setSelectedStart({ day, month, year });
            setSelectedEnd(null);
        } else if (selectedStart && !selectedEnd) {
            if (
                year > selectedStart.year ||
                (year === selectedStart.year && month > selectedStart.month) ||
                (year === selectedStart.year && month === selectedStart.month && day >= selectedStart.day)
            ) {
                setSelectedEnd({ day, month, year });
            } else {
                setSelectedStart({ day, month, year });
            }
        }
    };

    // ✅ 선택된 날짜 확인
    const isSelected = (day: number, month: number, year: number) => {
        if (!selectedStart) return false;
        if (selectedStart.day === day && selectedStart.month === month && selectedStart.year === year) return "start";
        if (selectedEnd?.day === day && selectedEnd.month === month && selectedEnd.year === year) return "end";
        if (
            selectedStart &&
            selectedEnd &&
            (year > selectedStart.year ||
                (year === selectedStart.year && month > selectedStart.month) ||
                (year === selectedStart.year && month === selectedStart.month && day > selectedStart.day)) &&
            (year < selectedEnd.year ||
                (year === selectedEnd.year && month < selectedEnd.month) ||
                (year === selectedEnd.year && month === selectedEnd.month && day < selectedEnd.day))
        ) {
            return "range";
        }
        return false;
    };

    // ✅ 현재 월이 중앙에 위치하도록 스크롤
    useEffect(() => {
        const currentIndex = months.findIndex(
            (item) => item.year === currentDate.getFullYear() && item.month === currentDate.getMonth()
        );
        if (flatListRef.current) {
            setTimeout(() => {
                flatListRef.current?.scrollToIndex({ index: currentIndex, animated: true });
            }, 500);
        }
    }, []);

    // ✅ 추가 데이터 로드 (스크롤 시)
    const loadMoreMonths = () => {
        setMonths((prev) => {
            const lastYear = prev[prev.length - 1].year;
            const lastMonth = prev[prev.length - 1].month;
            let newMonths = [];

            for (let i = 1; i <= 3; i++) {
                let newMonth = lastMonth + i;
                let newYear = lastYear;
                if (newMonth > 11) {
                    newMonth = 0;
                    newYear += 1;
                }
                newMonths.push({ year: newYear, month: newMonth });
            }
            return [...prev, ...newMonths];
        });
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
            <FlatList
                ref={flatListRef}
                data={months}
                keyExtractor={(item) => `${item.year}-${item.month}`}
                renderItem={({ item }) => (
                    <Box>
                        <Text style={styles.monthTitle}>{`${item.year}년 ${item.month + 1}월`}</Text>
                        <Box style={styles.weekRow}>
                            {["일", "월", "화", "수", "목", "금", "토"].map((day, index) => (
                                <Text key={index} style={styles.weekText}>
                                    {day}
                                </Text>
                            ))}
                        </Box>
                        <Box style={styles.daysGrid}>
                            {generateCalendarData(item.year, item.month).map((date, index) =>
                                date ? (
                                    <Pressable
                                        key={index}
                                        style={[
                                            styles.dayContainer,
                                            isSelected(date.day, date.month, date.year) === "start" && styles.startDay,
                                            isSelected(date.day, date.month, date.year) === "end" && styles.endDay,
                                            isSelected(date.day, date.month, date.year) === "range" && styles.rangeDay,
                                        ]}
                                        onPress={() => handleDatePress(date.day, date.month, date.year)}
                                    >
                                        <Text style={styles.dayText}>{date.day}</Text>
                                    </Pressable>
                                ) : (
                                    <Box key={index} style={styles.emptyDay} />
                                )
                            )}
                        </Box>
                    </Box>
                )}
                onEndReached={loadMoreMonths}
                onEndReachedThreshold={0.5}
            />

            {/* 하단 등록 버튼 */}
            {selectedStart && (
                <Button style={styles.bottomButton}>
                    <Text style={styles.bottomButtonText}>
                        {selectedStart && selectedEnd
                            ? `${selectedStart.month + 1}.${selectedStart.day} - ${selectedEnd.month + 1}.${selectedEnd.day} / 등록 완료`
                            : "여행 날짜를 선택하세요"}
                    </Text>
                </Button>
            )}
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