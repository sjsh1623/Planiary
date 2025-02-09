import React, {useState, useEffect} from "react";
import {StyleSheet, Dimensions, View} from "react-native";
import {Box} from "@/components/ui/box";
import {Pressable} from "@/components/ui/pressable";
import {Text} from "@/components/ui/text";
import {VStack} from "@/components/ui/vstack";
import {HStack} from "@/components/ui/hstack";
import {Icon} from "@/components/ui/icon";
import {Ionicons} from "@expo/vector-icons";
import {Button} from "@/components/ui/button";
import {useRouter} from "expo-router";

const SCREEN_WIDTH = Dimensions.get("window").width;

const TERMS = [
    {id: 1, text: "이용약관 동의", required: true},
    {id: 2, text: "만 14세 이상 확인", required: true},
    {id: 3, text: "개인정보 수집 및 이용 동의", required: true},
    {id: 4, text: "개인정보 수집 및 이용 동의", required: false},
    {id: 5, text: "마케팅 알림 수신 동의", required: false},
    {id: 6, text: "위치기반 서비스 이용약관 동의", required: false},
];

const TermsAgreementScreen = () => {
    const router = useRouter();

    // ✅ 체크박스 상태 관리
    const [selectedTerms, setSelectedTerms] = useState<number[]>([]);
    const [isAllDisabled, setIsAllDisabled] = useState(true);

    // ✅ 전체 동의 핸들러
    const toggleAll = () => {
        if (selectedTerms.length === TERMS.length) {
            setSelectedTerms([]); // 모든 선택 해제
        } else {
            setSelectedTerms(TERMS.map(t => t.id)); // 전체 선택
        }
    };

    // ✅ 개별 체크박스 핸들러
    const toggleTerm = (id: number) => {
        setSelectedTerms(prev =>
            prev.includes(id) ? prev.filter(termId => termId !== id) : [...prev, id]
        );
    };

    // ✅ 필수 항목 체크 후 버튼 활성화
    useEffect(() => {
        const requiredChecked = TERMS.filter(t => t.required).every(t => selectedTerms.includes(t.id));
        setIsAllDisabled(!requiredChecked);
    }, [selectedTerms]);

    return (
        <View style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#fff",
        }}>
            <Box style={styles.container}>
                {/* 🔙 뒤로가기 버튼 */}
                <Pressable style={styles.backButton} onPress={() => router.back()}>
                    <Icon as={Ionicons} name="arrow-back" size="lg" color="black"/>
                </Pressable>

                {/* 📝 타이틀 중앙 정렬 */}
                <VStack style={styles.titleContainer}>
                    <Text style={styles.title}>초면에 실례지만,</Text>
                    <Text style={styles.title}>
                        <Text style={styles.highlight}>약관 동의</Text>가 필요해요
                    </Text>
                </VStack>

                {/* ✅ 약관 리스트 */}
                <VStack style={styles.termsContainer}>
                    {/* 전체 동의 */}
                    <Pressable style={styles.allAgreeBox} onPress={toggleAll}>
                        <HStack style={styles.allAgreeContent}>
                            <Text style={styles.allAgreeText}>전체 동의</Text>
                            <Text style={styles.optionalText}>(선택항목 포함)</Text>
                        </HStack>
                        <Icon
                            as={Ionicons}
                            name={selectedTerms.length === TERMS.length ? "checkbox" : "square-outline"}
                            size={28}
                            color={selectedTerms.length === TERMS.length ? "#007AFF" : "#D1D5DB"}
                        />
                    </Pressable>

                    {TERMS.map(term => (
                        <Pressable key={term.id} style={styles.termItem} onPress={() => toggleTerm(term.id)}>
                            <Text style={[styles.termText, term.required && styles.requiredTerm]}>
                                {term.text} {term.required ? "(필수)" : "(선택)"}
                            </Text>
                            <Icon
                                as={Ionicons}
                                name={selectedTerms.includes(term.id) ? "checkbox" : "square-outline"}
                                size={28}
                                color={selectedTerms.includes(term.id) ? "#007AFF" : "#D1D5DB"}
                            />
                        </Pressable>
                    ))}
                </VStack>

                {/* ✅ 다음 버튼 */}
                <Button
                    style={[
                        styles.nextButton,
                        !isAllDisabled ? styles.enabledButton : styles.disabledButton
                    ]}
                    isDisabled={isAllDisabled}
                    onPress={() => router.push("/(auth)/screens/NextScreen")}>
                    <Text style={styles.nextButtonText}>다음</Text>
                </Button>
            </Box>
        </View>
    );
};

export default TermsAgreementScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        width: "80%", // ✅ 80% 너비 적용
        alignSelf: "center", // ✅ 중앙 정렬
        justifyContent: "center",
    },
    backButton: {
        position: "absolute",
        top: 15,
        left: 15,
        padding: 10,
    },
    titleContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        paddingVertical: 5
    },
    highlight: {
        fontSize: 22,
        color: "#007AFF",
    },
    termsContainer: {
        marginTop: 30,
    },
    allAgreeBox: {
        backgroundColor: "#F3F4F6",
        padding: 15,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
        marginHorizontal : -10,
    },
    allAgreeContent: {
        flexDirection: "row",
        alignItems: "center",
    },
    allAgreeText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#007AFF",
        marginRight: 5,
    },
    optionalText: {
        fontSize: 14,
        color: "#9CA3AF",
    },
    termItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB",
    },
    requiredTerm: {
        color: "black",
        fontWeight: "bold",
    },
    termText: {
        fontSize: 18, // ✅ 폰트 크기 증가
    },
    nextButton: {
        marginTop: 20,
        borderRadius: 8,
        alignItems: "center",
        height: 50
    },
    enabledButton: {
        backgroundColor: "#007AFF",
    },
    disabledButton: {
        backgroundColor: "#D1D5DB",
    },
    nextButtonText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
    },
});
