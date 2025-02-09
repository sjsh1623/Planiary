// app/(tabs)/components/CityHorizontalFilter.tsx

import React from "react";
import {ScrollView} from "react-native";
import {Pressable} from "@/components/ui/pressable";
import {Text} from "@/components/ui/text";
import {styles} from "@/app/(tabs)//styles/cityStyles";
import {FILTER_OPTIONS} from "@/app/(tabs)//constants/cityConstants";

interface FilterBarProps {
    selectedCategory: "해외도시" | "국내도시";
    selectedFilter: string;
    onSelectFilter: (filter: string) => void;
}

/**
 * CityHorizontalFilter
 * – 해외도시일 경우에만 필터 옵션을 가로 스크롤로 표시
 */
const CityHorizontalFilter: React.FC<FilterBarProps> = ({
                                                 selectedCategory,
                                                 selectedFilter,
                                                 onSelectFilter,
                                             }) => {
    if (selectedCategory !== "해외도시") return null;

    const filters = FILTER_OPTIONS[selectedCategory];

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
            {filters.map((filter) => (
                <Pressable
                    key={filter}
                    style={[styles.filterButton, selectedFilter === filter && styles.selectedFilterButton]}
                    onPress={() => onSelectFilter(filter)}
                >
                    <Text style={[styles.filterText, selectedFilter === filter && styles.selectedFilterText]}>
                        {filter}
                    </Text>
                </Pressable>
            ))}
        </ScrollView>
    );
};

export default CityHorizontalFilter;
