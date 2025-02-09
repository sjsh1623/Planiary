// app/(tabs)/components/BottomSelection.tsx

import React from "react";
import {ScrollView, Image} from "react-native";
import {Box} from "@/components/ui/box";
import {Pressable} from "@/components/ui/pressable";
import {Text} from "@/components/ui/text";
import {HStack} from "@/components/ui/hstack";
import {VStack} from "@/components/ui/vstack";
import {styles} from "@/app/(tabs)/styles/cityStyles";
import {CITY_DATA} from "@/app/(tabs)/constants/cityConstants";

interface BottomSelectionProps {
    selectedCities: string[];
    onDeselect: (cityName: string) => void;
}

/**
 * BottomSelection
 * – 선택된 도시 목록(이미지와 이름, 삭제 버튼)을 가로 스크롤로 보여줌
 */
const BottomSelection: React.FC<BottomSelectionProps> = ({selectedCities, onDeselect}) => {
    return (
        <Box style={styles.bottomContainer}>
            {selectedCities.length > 0 && (
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.selectedCitiesContainer}
                >
                    {selectedCities.map((cityName) => {
                        const cityData = CITY_DATA.find((c) => c.name === cityName);
                        return (
                            <VStack key={cityName} style={styles.selectedCityItem}>
                                <Image source={{uri: cityData?.image}} style={styles.selectedCityImage}/>
                                <HStack style={styles.selectedCityNameContainer}>
                                    <Text style={styles.selectedCityText}>{cityName}</Text>
                                    <Pressable onPress={() => onDeselect(cityName)}>
                                        {/* 간단하게 × 문자 아이콘 사용 */}
                                        <Text style={{fontSize: 16, color: "gray"}}>×</Text>
                                    </Pressable>
                                </HStack>
                            </VStack>
                        );
                    })}
                </ScrollView>
            )}
        </Box>
    );
};

export default BottomSelection;
