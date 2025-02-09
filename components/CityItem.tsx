// app/(tabs)/components/CityItem.tsx

import React from "react";
import { Image } from "react-native";
import {Pressable} from "@/components/ui/pressable";
import {Text} from "@/components/ui/text";
import {HStack} from "@/components/ui/hstack";
import {VStack} from "@/components/ui/vstack";
import { styles } from "@/app/(tabs)//styles/cityStyles";
import { City } from "@/app/(tabs)//constants/cityConstants";

interface CityItemProps {
    city: City;
    isSelected: boolean;
    onSelect: (cityName: string) => void;
}

/**
 * CityItem
 * – FlatList의 각 아이템으로 도시 정보와 선택/취소 버튼을 렌더링
 */
const CityItem: React.FC<CityItemProps> = ({ city, isSelected, onSelect }) => {
    return (
        <HStack style={styles.cityItem}>
        <Image source={{ uri: city.image }} style={styles.cityImage} />
    <VStack style={styles.cityInfo}>
    <Text style={styles.cityName}>{city.name}</Text>
        <Text style={styles.cityDescription}>{city.description}</Text>
        </VStack>
        <Pressable
    style={[styles.selectButton, isSelected && styles.selectedButton]}
    onPress={() => onSelect(city.name)}
>
    <Text style={[styles.selectButtonText, isSelected && styles.selectedButtonText]}>
    {isSelected ? "취소" : "선택"}
    </Text>
    </Pressable>
    </HStack>
);
};

export default CityItem;
