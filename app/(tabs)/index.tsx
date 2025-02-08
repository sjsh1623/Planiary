import React, {useEffect, useRef, useState} from "react";
import {Animated, NativeScrollEvent, NativeSyntheticEvent, ScrollView} from "react-native";
import {Box} from "@/components/ui/box";
import Header from "@/components/Header";
import SearchSection from "@/components/SearchSection";
import PopularCities from "@/components/PopularCities";
import BlogList from "@/components/BlogList";
import Banner from "@/components/Banner";
import {HEADER_HEIGHT, SCREEN_WIDTH, ANIMATION_DURATION} from "./constants/homeConstants";
import {dividerStyle} from "./styles/homeStyles";
import {useRouter} from "expo-router";

/**
 * HomeScreen
 * - 메인 페이지의 전체 레이아웃과 애니메이션 로직 관리
 */
const index = () => {
    // 스크롤 위치에 따라 배너 애니메이션을 제어하기 위한 상태
    const [isTop, setIsTop] = useState(true);

    // Animated.Value 초기화 (배너 애니메이션)
    const bannerTranslateX = useRef(new Animated.Value(0)).current;
    const bannerImageTranslateX = useRef(new Animated.Value(0)).current;
    const opacity = useRef(new Animated.Value(1)).current;

    /**
     * 스크롤 이벤트 핸들러
     * - 스크롤이 최상단(10px 이하)인지 확인하여 isTop 상태 변경
     */
    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        setIsTop(offsetY <= 10);
    };

    // isTop 상태 변화에 따라 배너 애니메이션 동시 실행
    useEffect(() => {
        Animated.parallel([
            Animated.timing(bannerTranslateX, {
                toValue: isTop ? 0 : SCREEN_WIDTH,
                duration: ANIMATION_DURATION,
                useNativeDriver: true,
            }),
            Animated.timing(bannerImageTranslateX, {
                toValue: isTop ? 0 : SCREEN_WIDTH * 0.75,
                duration: ANIMATION_DURATION,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: isTop ? 1 : 0,
                duration: ANIMATION_DURATION,
                useNativeDriver: true,
            }),
        ]).start();
    }, [isTop, bannerTranslateX, bannerImageTranslateX, opacity]);

    return (
        <>
            {/* 상단 헤더 */}
            <Header/> {/* ✅ navigation 대신 router 사용 */}
            {/* 스크롤 가능한 메인 콘텐츠 영역 */}
            <Animated.ScrollView
                style={{paddingTop: HEADER_HEIGHT, backgroundColor: "white"}}
                scrollEventThrottle={16}
                onScroll={handleScroll}
            >
                {/* 검색창 및 카테고리 섹션 */}
                <SearchSection/>
                {/* 구분선 */}
                <Box style={dividerStyle.divider}/>
                {/* 인기 도시 리스트 */}
                <PopularCities/>
                {/* 블로그 리스트 */}
                <BlogList/>
            </Animated.ScrollView>
            {/* 하단 배너 (애니메이션 적용) */}
            <Banner
                isTop={isTop}
                setIsTop={setIsTop}
                bannerTranslateX={bannerTranslateX}
                bannerImageTranslateX={bannerImageTranslateX}
                opacity={opacity}
            />
        </>
    );
};

export default index;
