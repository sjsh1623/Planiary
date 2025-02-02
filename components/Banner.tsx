import React, {useEffect, useRef, useState} from "react";
import {Animated, Image, Pressable} from "react-native";
import {HStack} from "@/components/ui/hstack";
import {VStack} from "@/components/ui/vstack";
import {Text} from "@/components/ui/text";
import {Icon, CalendarDaysIcon} from "@/components/ui/icon";
import {bannerStyles} from "@/app/(tabs)/styles/homeStyles";
import {IMAGE_SIZE, DEFAULT_BANNER_IMAGE} from "@/app/(tabs)/constants/homeConstants";

interface BannerProps {
    isTop: boolean;
    setIsTop: (value: boolean) => void; // 🔥 isTop 상태를 변경하는 함수 추가
    bannerTranslateX: Animated.Value;
    bannerImageTranslateX: Animated.Value;
    opacity: Animated.Value;
}

/**
 * Banner 컴포넌트
 * - 하단 배너를 애니메이션 효과와 함께 렌더링
 */
const Banner: React.FC<BannerProps> = ({
                                           isTop,
                                           setIsTop,
                                           bannerTranslateX,
                                           bannerImageTranslateX,
                                           opacity,
                                       }) => {
    // ✅ 배너 클릭 시 애니메이션 실행 함수
    const handleImageClick = () => {
        if (!isTop) {
            setIsTop(true); // 🔥 isTop을 true로 변경
        }
    };

    return (
        <>
            {/* 배너 내 원형 이미지 (애니메이션 적용 대상) */}
            <Animated.View
                style={[
                    bannerStyles.imageContainer,
                    {transform: [{translateX: bannerImageTranslateX}]},
                ]}
            >
                <Pressable onPress={handleImageClick}> {/* 🔥 클릭 이벤트 추가 */}
                    <Image source={{uri: DEFAULT_BANNER_IMAGE}} style={bannerStyles.image}/>
                </Pressable>
            </Animated.View>

            {/* 배너 본문 영역 */}
            <Animated.View
                style={[
                    bannerStyles.bannerContainer,
                    {
                        backgroundColor: "#06B6D4",
                        padding: isTop ? 12 : 0,
                        borderRadius: isTop ? 15 : IMAGE_SIZE / 2,
                        transform: [{translateX: bannerTranslateX}],
                        opacity: opacity,
                    },
                ]}
            >
                <HStack style={bannerStyles.bannerContent}>
                    <VStack style={bannerStyles.bannerTextContainer}>
                        <Text style={bannerStyles.bannerTitle}>도쿄 여행</Text>
                        <Text style={bannerStyles.bannerSubtitle}>
                            D-6 | 2.8 (Sat) - 2.13 (Thu)
                        </Text>
                    </VStack>
                    <Pressable style={bannerStyles.scheduleButton}>
                        <Text style={bannerStyles.scheduleButtonText}>내 일정</Text>
                        <Icon as={CalendarDaysIcon} size="sm" color="white"/>
                    </Pressable>
                </HStack>
            </Animated.View>
        </>
    );
};

export default Banner;
