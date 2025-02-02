// app/tabs/constants/homeConstants.ts

import { Dimensions } from "react-native";

// 화면 및 컴포넌트 크기, 애니메이션 지속 시간 등의 상수 정의
export const HEADER_HEIGHT = 65;
export const PROFILE_IMAGE_SIZE = 37;
export const SCREEN_WIDTH = Dimensions.get("window").width;
export const CONTENT_WIDTH = "85%"; // 콘텐츠 영역 너비 (퍼센트)
export const CONTENT_WIDTH_RATIO = parseFloat(CONTENT_WIDTH) / 100; // 85% → 0.85 변환
export const REMAINING_SPACE_RATIO = 1 - CONTENT_WIDTH_RATIO; // 남은 공간 비율 (15%)
export const HORIZONTAL_PADDING = (SCREEN_WIDTH * REMAINING_SPACE_RATIO) / 2; // 좌우 패딩 (각 7.5%)
// 배너 관련 상수
export const IMAGE_SIZE = 45;
export const BANNER_HEIGHT = 75;
export const ANIMATION_DURATION = 180; // ms

// 색상 및 테두리 관련 상수 (필요에 따라 확장)
export const BORDER_COLOR_LIGHT = "#E5E7EB";
export const BORDER_COLOR_INPUT = "#D1D5DB";
export const TEXT_PRIMARY = "#2563EB";
export const BG_BANNER = "#06B6D4";
export const TEXT_SECONDARY = "#6B7280";
export const TEXT_TERTIARY = "#9CA3AF";

// 기본 이미지 URL 등 (더미 데이터)
export const DEFAULT_PROFILE_IMAGE = "https://i.pravatar.cc/101";
export const DEFAULT_BANNER_IMAGE = "https://picsum.photos/200";

// 샘플 데이터 – 블로그 포스트
export const blogPosts = [
    {
        id: 1,
        image: "https://picsum.photos/800/800",
        title: "여럿이서 즐겁게, 추억 쌓기 좋은 이곳 📸",
        description: "맛과 멋이 있는 이 도시로!",
        source: "트리플",
        date: "1월 5주차",
    },
    {
        id: 2,
        image: "https://picsum.photos/800/800",
        title: "지친 일상을 떠나 바다로 🌊",
        description: "힐링이 필요할 때 떠나는 여행",
        source: "트리플",
        date: "2월 1주차",
    },
    {
        id: 3,
        image: "https://picsum.photos/800/800",
        title: "자연 속에서의 힐링 타임 🌲",
        description: "맑은 공기와 함께하는 산책",
        source: "트리플",
        date: "2월 2주차",
    },
    {
        id: 4,
        image: "https://picsum.photos/800/800",
        title: "자연 속에서의 힐링 타임 🌲",
        description: "맑은 공기와 함께하는 산책",
        source: "트리플",
        date: "2월 2주차",
    },
    {
        id: 5,
        image: "https://picsum.photos/800/600",
        title: "자연 속에서의 힐링 타임 🌲",
        description: "맑은 공기와 함께하는 산책",
        source: "트리플",
        date: "2월 2주차",
    },
];

// 샘플 데이터 – 카테고리 목록
export const categories = [
    { id: 1, image: "https://picsum.photos/210", label: "국내여행" },
    { id: 2, image: "https://picsum.photos/211", label: "해외여행" },
    { id: 3, image: "https://picsum.photos/222", label: "캠핑·글램핑" },
    { id: 4, image: "https://picsum.photos/233", label: "데이트" },
];

// 샘플 데이터 – 인기 도시 목록
export const cities = [
    { id: 1, image: "https://picsum.photos/221", name: "오사카" },
    { id: 2, image: "https://picsum.photos/220", name: "후쿠오카" },
    { id: 3, image: "https://picsum.photos/223", name: "도쿄" },
    { id: 4, image: "https://picsum.photos/224", name: "다낭" },
    { id: 5, image: "https://picsum.photos/225", name: "교토" },
    { id: 6, image: "https://picsum.photos/226", name: "방콕" },
];
