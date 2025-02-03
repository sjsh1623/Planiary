import React, {useState} from "react";
import {FlatList, Image, StyleSheet, ScrollView, TextInput} from "react-native";
import {Box} from "@/components/ui/box";
import {Pressable} from "@/components/ui/pressable";
import {Text} from "@/components/ui/text";
import {HStack} from "@/components/ui/hstack";
import {VStack} from "@/components/ui/vstack";
import {Icon} from "@/components/ui/icon";
import {Button} from "@/components/ui/button";
import {Ionicons} from "@expo/vector-icons";

const CITY_DATA = [
    {name: "나가사키", description: "나가사키, 사가, 사세보, 운젠", image: "https://picsum.photos/250", category: "일본", type: "해외도시"},
    {name: "다카마쓰", description: "다카마쓰", image: "https://picsum.photos/251", category: "일본", type: "해외도시"},
    {name: "마쓰야마", description: "마쓰야마", image: "https://picsum.photos/252", category: "일본", type: "해외도시"},
    {name: "구마모토", description: "구마모토, 아소", image: "https://picsum.photos/253", category: "일본", type: "해외도시"},
    {name: "가평·양평", description: "가평, 양평", image: "https://picsum.photos/254", category: "국내도시", type: "국내도시"},
    {name: "강릉·속초", description: "강릉, 속초, 양양", image: "https://picsum.photos/255", category: "국내도시", type: "국내도시"},
    {name: "부산", description: "부산", image: "https://picsum.photos/256", category: "국내도시", type: "국내도시"},
    {name: "제주", description: "제주, 서귀포", image: "https://picsum.photos/277", category: "국내도시", type: "국내도시"},
];

/**
 * 📌 도시 선택 화면
 */
const SelectCityScreen = () => {
    const [selectedCategory, setSelectedCategory] = useState("해외도시");
    const [selectedFilter, setSelectedFilter] = useState("전체"); // 🔥 개별 필터 관리
    const [searchText, setSearchText] = useState(""); // 🔍 검색어 추가
    const [selectedCities, setSelectedCities] = useState<string[]>([]);

    // 🔥 도시 필터링 로직
    const filteredCities = CITY_DATA.filter(
        (city) =>
            city.type === selectedCategory &&
            (selectedFilter === "전체" || city.category === selectedFilter) &&
            city.name.includes(searchText)
    );

    // 도시 선택 핸들러
    const handleSelectCity = (cityName: string) => {
        if (selectedCities.includes(cityName)) {
            setSelectedCities(selectedCities.filter((city) => city !== cityName));
        } else {
            setSelectedCities([...selectedCities, cityName]);
        }
    };

    return (
        <Box style={styles.container}>
            {/* 🔹 네비게이션 바 */}
            <HStack style={styles.navBar}>
                <Pressable style={styles.iconButton} onPress={() => console.log("뒤로 가기")}>
                    <Icon as={Ionicons} name="arrow-back" size="4xl" color="$textDark400"/>
                </Pressable>

                {/* 🔍 검색 입력 창 */}
                <HStack style={styles.searchBox}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="여행, 어디로 떠나시나요?"
                        placeholderTextColor="#9CA3AF"
                        value={searchText}
                        onChangeText={setSearchText}
                    />
                </HStack>
            </HStack>

            {/* 🔹 탭 네비게이션 */}
            <HStack style={styles.tabContainer}>
                <Pressable
                    style={[styles.tabItem, selectedCategory === "해외도시" && styles.selectedTab]}
                    onPress={() => {
                        setSelectedCategory("해외도시");
                        setSelectedFilter("전체");
                    }}
                >
                    <Text style={[styles.tabText, selectedCategory === "해외도시" && styles.selectedTabText]}>
                        해외도시
                    </Text>
                </Pressable>
                <Pressable
                    style={[styles.tabItem, selectedCategory === "국내도시" && styles.selectedTab]}
                    onPress={() => {
                        setSelectedCategory("국내도시");
                        setSelectedFilter("전체");
                    }}
                >
                    <Text style={[styles.tabText, selectedCategory === "국내도시" && styles.selectedTabText]}>
                        국내도시
                    </Text>
                </Pressable>
            </HStack>

            {/* 🔹 필터 버튼 (해외도시일 때만 표시) */}
            {selectedCategory === "해외도시" && (
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
                    {["전체", "일본", "동남아시아", "남태평양", "유럽", "미주", "중남미"].map((category) => (
                        <Pressable
                            key={category}
                            style={[styles.filterButton, selectedFilter === category && styles.selectedFilterButton]}
                            onPress={() => setSelectedFilter(category)}
                        >
                            <Text style={[styles.filterText, selectedFilter === category && styles.selectedFilterText]}>
                                {category}
                            </Text>
                        </Pressable>
                    ))}
                </ScrollView>
            )}

            {/* 🔹 도시 리스트 */}
            <FlatList
                data={filteredCities}
                keyExtractor={(item) => item.name}
                renderItem={({item}) => (
                    <HStack style={styles.cityItem}>
                        <Image source={{uri: item.image}} style={styles.cityImage}/>
                        <VStack style={styles.cityInfo}>
                            <Text style={styles.cityName}>{item.name}</Text>
                            <Text style={styles.cityDescription}>{item.description}</Text>
                        </VStack>
                        <Pressable
                            style={[styles.selectButton, selectedCities.includes(item.name) && styles.selectedButton]}
                            onPress={() => handleSelectCity(item.name)}
                        >
                            <Text
                                style={[styles.selectButtonText, selectedCities.includes(item.name) && styles.selectedButtonText]}>
                                {selectedCities.includes(item.name) ? "취소" : "선택"}
                            </Text>
                        </Pressable>
                    </HStack>
                )}
                showsVerticalScrollIndicator={false}
            />

            <Box style={styles.bottomContainer}>
                {/* 🔹 선택된 도시 리스트 */}
                {selectedCities.length > 0 && (
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.selectedCitiesContainer} // ✅ 여기서 수정
                    >
                        {selectedCities.map((city) => {
                            const cityData = CITY_DATA.find((c) => c.name === city);
                            return (
                                <VStack key={city} style={styles.selectedCityItem}>
                                    {/* 🔹 여행지 이미지 */}
                                    <Image source={{ uri: cityData?.image }} style={styles.selectedCityImage} />

                                    {/* 🔹 도시명과 삭제 버튼 */}
                                    <HStack style={styles.selectedCityNameContainer}>
                                        <Text style={styles.selectedCityText}>{city}</Text>
                                        <Pressable onPress={() => handleSelectCity(city)}>
                                            <Icon as={Ionicons} name="close-circle" size="sm" color="gray" />
                                        </Pressable>
                                    </HStack>
                                </VStack>
                            );
                        })}
                    </ScrollView>
                )}

                {/* 🔹 하단 선택 버튼 */}
                <Button
                    style={[styles.bottomButton, selectedCities.length === 0 && styles.disabledButton]}
                    isDisabled={selectedCities.length === 0}
                >
                    <Text style={styles.bottomButtonText}>
                        {selectedCities.length > 0
                            ? `${selectedCities[0]} ${selectedCities.length > 1 ? `외 ${selectedCities.length - 1}개` : ""} 선택 완료`
                            : "최소 1개 도시 선택"}
                    </Text>
                </Button>
            </Box>
        </Box>
    );
};

export default SelectCityScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 16,
    },
    navBar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    iconButton: {
        padding: 8,
    },
    searchBox: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 8,
        paddingVertical: 10,
        marginLeft: 7,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
    },
    tabContainer: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB",
    },
    tabItem: {
        flex: 1,
        paddingVertical: 12,
        alignItems: "center",
    },
    selectedTab: {
        borderBottomWidth: 2,
        borderBottomColor: "#06B6D4",
    },
    tabText: {
        fontSize: 16,
        color: "#9CA3AF",
        fontWeight: "bold",
    },
    selectedTabText: {
        color: "#06B6D4",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
    },
    filterContainer: {
        marginVertical: 10,
        flexGrow: 0, // ✅ ScrollView 높이 자동 증가 방지
        height: 40, // ✅ 적절한 높이 설정
    },
    filterButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: "#F3F4F6",
        marginRight: 8,
        alignSelf: "flex-start", // ✅ 버튼의 높이를 자동 조절
    },
    cityItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        minHeight: 50, // ✅ 최소 높이 설정하여 늘어지는 것 방지
    },
    selectedFilterButton: {
        backgroundColor: "#06B6D4",
    },
    filterText: {
        fontSize: 14,
        color: "#6B7280",
    },
    selectedFilterText: {
        color: "white",
    },
    cityImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    cityInfo: {
        flex: 1,
        marginLeft: 12,
    },
    cityName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    cityDescription: {
        fontSize: 12,
        color: "#9CA3AF",
    },
    selectButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        backgroundColor: "#E5E7EB",
    },
    selectedButton: {
        backgroundColor: "#06B6D4",
    },
    selectButtonText: {
        fontSize: 14,
        color: "#6B7280",
    },
    selectedButtonText: {
        color: "white",
    },
    bottomContainer: {
        padding: 5
    },
    selectedCitiesContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 16,
    },
    selectedCity: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#06B6D4",
        borderRadius: 20,
        paddingVertical: 6,
        paddingHorizontal: 12,
        marginRight: 8,
    },
    selectedCityItem: {
        alignItems: "center",
        marginRight: 12,
    },
    selectedCityImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginBottom: 4,
    },
    selectedCityNameContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F3F4F6",
        borderRadius: 12,
        paddingVertical: 4,
        paddingHorizontal: 10,
    },
    selectedCityText: {
        fontSize: 14,
        marginRight: 5,
    },
    bottomButton: {
        borderRadius: 5,
        backgroundColor: "#06B6D4",
        alignItems: "center",
        height: 50,
        justifyContent: "center",
        width: "100%",
    },
    disabledButton: {
        backgroundColor: "#9CA3AF",
    },
    bottomButtonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
    },
});
