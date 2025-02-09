// app/(tabs)/components/TabNavigation.tsx

import React from "react";
import {Pressable} from "@/components/ui/pressable";
import {Text} from "@/components/ui/text";
import {HStack} from "@/components/ui/hstack";
import { styles } from "@/app/(tabs)/styles/cityStyles";

interface TabNavigationProps {
    selectedCategory: "해외도시" | "국내도시";
    onSelectCategory: (category: "해외도시" | "국내도시") => void;
}

/**
 * TabNavigation
 * – 해외도시와 국내도시 탭을 렌더링하여 카테고리 선택을 처리
 */
const TabNavigation: React.FC<TabNavigationProps> = ({ selectedCategory, onSelectCategory }) => {
    return (
        <HStack style={styles.tabContainer}>
            <Pressable
                style={[styles.tabItem, selectedCategory === "해외도시" && styles.selectedTab]}
                onPress={() => onSelectCategory("해외도시")}
            >
                <Text style={[styles.tabText, selectedCategory === "해외도시" && styles.selectedTabText]}>
                    해외도시
                </Text>
            </Pressable>
            <Pressable
                style={[styles.tabItem, selectedCategory === "국내도시" && styles.selectedTab]}
                onPress={() => onSelectCategory("국내도시")}
            >
                <Text style={[styles.tabText, selectedCategory === "국내도시" && styles.selectedTabText]}>
                    국내도시
                </Text>
            </Pressable>
        </HStack>
    );
};

export default TabNavigation;
