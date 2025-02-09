// app/components/ui/LargeSearchSection.tsx

import React from "react";
import { Image, Pressable } from "react-native";
import {HStack} from "@/components/ui/hstack";
import {Box} from "@/components/ui/box";
import {Text} from "@/components/ui/text";
import { Input, InputField } from "@/components/ui/input";
import { searchSectionStyles } from "@/app/(tabs)/styles/homeStyles";
import { categories } from "@/app/(tabs)/constants/homeConstants";

/**
 * LargeSearchSection 컴포넌트
 * - 검색창과 카테고리 목록을 렌더링
 */
const LargeSearchSection = () => {
    return (
        <Box style={searchSectionStyles.container}>
            {/* 검색 입력 필드 */}
            <Input style={searchSectionStyles.input}>
                <InputField placeholder="어디로 떠나시나요?" />
            </Input>
            {/* 카테고리 목록 */}
            <HStack style={searchSectionStyles.categoryList}>
                {categories.map((item) => (
                    <Pressable key={item.id} style={searchSectionStyles.categoryItem}>
                        <Image source={{ uri: item.image }} style={searchSectionStyles.categoryImage} />
                        <Text style={searchSectionStyles.categoryLabel}>{item.label}</Text>
                    </Pressable>
                ))}
            </HStack>
        </Box>
    );
};

export default LargeSearchSection;
