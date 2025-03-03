// app/(tabs)/screens/SelectCityScreen.tsx

import React, {useState} from "react";
import {FlatList} from "react-native";
import {Box} from "@/components/ui/box";
import {Button} from "@/components/ui/button";
import {Text} from "@/components/ui/text";
import SearchBar from "@/components/SmallSearchSection";
import TabNavigation from "@/components/TabNavigation";
import CityHorizontalFilter from "@/components/CityHorizontalFilter";
import CityItem from "@/components/CityItem";
import BottomSelection from "@/components/BottomSelection";
import { useRouter } from "expo-router";
import {CITY_DATA, DEFAULT_SELECTED_FILTER} from "@/app/(tabs)//constants/cityConstants";
import {styles} from "@/app/(tabs)//styles/cityStyles";

/**
 * SelectCityScreen
 * – 도시 선택 페이지로, 검색, 탭, 필터, 도시 리스트, 하단 선택 영역 등을 조합
 */
const SelectCityScreen = () => {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState<"해외도시" | "국내도시">("해외도시");
    const [selectedFilter, setSelectedFilter] = useState<string>(DEFAULT_SELECTED_FILTER);
    const [searchText, setSearchText] = useState("");
    const [selectedCities, setSelectedCities] = useState<string[]>([]);

    // 도시 필터링 로직
    const filteredCities = CITY_DATA.filter(
        (city) =>
            city.type === selectedCategory &&
            (selectedFilter === "전체" || city.category === selectedFilter) &&
            city.name.includes(searchText)
    );

    // 도시 선택/취소 핸들러
    const handleSelectCity = (cityName: string) => {
        setSelectedCities((prev) =>
            prev.includes(cityName) ? prev.filter((c) => c !== cityName) : [...prev, cityName]
        );
    };

    // 카테고리 변경 시 필터 초기화
    const handleCategoryChange = (category: "해외도시" | "국내도시") => {
        setSelectedCategory(category);
        setSelectedFilter(DEFAULT_SELECTED_FILTER);
    };

    return (
        <Box style={styles.container}>
            {/* 뒤로가기 + 검색 입력 */}
            <SearchBar
                searchText={searchText}
                onChangeText={setSearchText}
                onBackPress={() => console.log("뒤로 가기")}
            />

            {/* 해외도시/국내도시 탭 */}
            <TabNavigation selectedCategory={selectedCategory} onSelectCategory={handleCategoryChange}/>

            {/* 해외도시일 경우 필터 바 */}
            <CityHorizontalFilter
                selectedCategory={selectedCategory}
                selectedFilter={selectedFilter}
                onSelectFilter={setSelectedFilter}
            />

            {/* 도시 리스트 */}
            <FlatList
                data={filteredCities}
                keyExtractor={(item) => item.name}
                renderItem={({item}) => (
                    <CityItem
                        city={item}
                        isSelected={selectedCities.includes(item.name)}
                        onSelect={handleSelectCity}
                    />
                )}
                showsVerticalScrollIndicator={false}
            />

            {/* 선택된 도시 목록 하단 영역 */}
            <BottomSelection selectedCities={selectedCities} onDeselect={handleSelectCity}/>

            {/* 하단 선택 완료 버튼 */}
            <Button
                style={[styles.bottomButton, selectedCities.length === 0 && styles.disabledButton]}
                isDisabled={selectedCities.length === 0}
                onPress={() => {
                    router.push({
                        pathname: "/screens/SelectDateScreen",
                    })
                }} // ✅ 선택 완료 시 실행
            >
                <Text style={styles.bottomButtonText}>
                    {selectedCities.length > 0
                        ? `${selectedCities[0]} ${
                            selectedCities.length > 1 ? `외 ${selectedCities.length - 1}개` : ""
                        } 선택 완료`
                        : "최소 1개 도시 선택"}
                </Text>
            </Button>
        </Box>
    );
};

export default SelectCityScreen;
