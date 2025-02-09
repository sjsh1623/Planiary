// app/(tabs)/components/SearchBar.tsx

import React from "react";
import {TextInput} from "react-native";
import {Pressable} from "@/components/ui/pressable";
import {HStack} from "@/components/ui/hstack";
import {Icon} from "@/components/ui/icon";
import {Ionicons} from "@expo/vector-icons";
import {styles} from "@/app/(tabs)//styles/cityStyles";

interface SearchBarProps {
    searchText: string;
    onChangeText: (text: string) => void;
    onBackPress: () => void;
}

/**
 * SearchBar
 * – 뒤로가기 버튼과 검색 입력창을 렌더링
 */
const SearchBar: React.FC<SearchBarProps> = ({searchText, onChangeText, onBackPress}) => {
    return (
        <HStack style={styles.navBar}>
            <Pressable style={styles.iconButton} onPress={onBackPress}>
                <Icon as={Ionicons} name="arrow-back" size="4xl" color="$textDark400"/>
            </Pressable>
            <HStack style={styles.searchBox}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="여행, 어디로 떠나시나요?"
                    placeholderTextColor="#9CA3AF"
                    value={searchText}
                    onChangeText={onChangeText}
                />
            </HStack>
        </HStack>
    );
};

export default SearchBar;
