// app/components/ui/PopularCities.tsx

import React from "react";
import {ScrollView, Image, Pressable} from "react-native";
import {HStack} from "@/components/ui/hstack";
import {VStack} from "@/components/ui/vstack";
import {Text} from "@/components/ui/text";
import {popularCitiesStyles} from "@/app/(tabs)/styles/homeStyles";
import {cities, HORIZONTAL_PADDING} from "@/app/(tabs)/constants/homeConstants";

/**
 * PopularCities 컴포넌트
 * - 수평 스크롤로 인기 도시 목록을 렌더링
 */
const PopularCities = () => {
    return (
        <VStack style={popularCitiesStyles.container}>
            <Text style={popularCitiesStyles.title}>
                요즘 해외 인기
                <Text style={{color: "#2563EB", fontSize: 18}}>도시</Text>
            </Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={popularCitiesStyles.scrollContainer}
                contentContainerStyle={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    paddingHorizontal: HORIZONTAL_PADDING,
                }}
            >
                <HStack style={{flexDirection: "row", gap: 13}}>
                    {cities.map((city) => (
                        <Pressable key={city.id} style={popularCitiesStyles.cityItem}>
                            <Image source={{uri: city.image}} style={popularCitiesStyles.cityImage}/>
                            <Text style={popularCitiesStyles.cityName}>{city.name}</Text>
                        </Pressable>
                    ))}
                </HStack>
            </ScrollView>
        </VStack>
    );
};

export default PopularCities;
