// app/(tabs)/styles/homeStyles.ts

import {StyleSheet} from "react-native";
import {
    HEADER_HEIGHT,
    PROFILE_IMAGE_SIZE,
    HORIZONTAL_PADDING,
    CONTENT_WIDTH,
    IMAGE_SIZE,
    BANNER_HEIGHT,
} from "../constants/homeConstants";

// 헤더 스타일
export const headerStyles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        backgroundColor: "white",
        zIndex: 50,
        paddingHorizontal: 24,
        paddingBottom: 8,
        paddingTop: 8 + 40,
        height: HEADER_HEIGHT + 40,
        justifyContent: "center",
    },
    innerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    profileContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    profileImage: {
        width: PROFILE_IMAGE_SIZE,
        height: PROFILE_IMAGE_SIZE,
        borderRadius: PROFILE_IMAGE_SIZE / 2,
    },
    profileName: {
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 8,
    },
    iconButton: {
        padding: 12,
    },
});

// 검색 및 카테고리 섹션 스타일
export const searchSectionStyles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        paddingVertical: 25,
        paddingHorizontal: 20,
        borderRadius: 12,
        alignSelf: "center",
        width: CONTENT_WIDTH,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        // 그림자 효과 (iOS)
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2, // 그림자 효과 (Android)
    },
    input: {
        borderWidth: 1,
        borderColor: "#D1D5DB",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 15,
        height: 55,
        fontSize: 16,
    },
    categoryList: {
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginTop: 16,
    },
    categoryItem: {
        alignItems: "center",
        width: "22%",
    },
    categoryImage: {
        width: 50,
        height: 50,
        marginBottom: 4,
        borderRadius: 8,
        resizeMode: "cover",
    },
    categoryLabel: {
        fontSize: 12,
        fontWeight: "bold",
    },
});

// 구분선 스타일
export const dividerStyle = StyleSheet.create({
    divider: {
        backgroundColor: "#E5E7EB",
        height: 10,
        width: "100%",
        marginVertical: 24,
        borderRadius: 5,
    },
});

// 인기 도시 섹션 스타일
export const popularCitiesStyles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        paddingHorizontal: HORIZONTAL_PADDING,
    },
    scrollContainer: {
        marginTop: 12,
    },
    cityItem: {
        alignItems: "center",
    },
    cityImage: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    cityName: {
        fontSize: 14,
        marginTop: 8,
    },
});

// 블로그 리스트 섹션 스타일
export const blogListStyles = StyleSheet.create({
    container: {
        alignSelf: "center",
        width: CONTENT_WIDTH,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        marginBottom: 16,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
    },
    headerButtonText: {
        fontSize: 14,
        color: "#2563EB",
    },
    blogItem: {
        backgroundColor: "white",
        borderRadius: 12,
        shadowOpacity: 0.1,
        shadowRadius: 4,
        overflow: "hidden",
        marginBottom: 16,
    },
    blogImage: {
        width: "100%",
        height: 300,
        borderRadius: 12,
    },
    blogContent: {
        paddingVertical: 16,
    },
    blogTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    blogDescription: {
        color: "#6B7280",
        marginTop: 4,
    },
    blogFooter: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
    },
    blogSourceBadge: {
        backgroundColor: "#2563EB",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        marginRight: 8,
    },
    blogSourceText: {
        fontSize: 12,
        color: "white",
    },
    blogDate: {
        fontSize: 14,
        color: "#9CA3AF",
    },
});

// 배너 섹션 스타일
export const bannerStyles = StyleSheet.create({
    imageContainer: {
        // 배너 이미지(작은 원형 이미지) 위치
        position: "absolute",
        bottom: 10,
        width: "90%",
        padding: 12,
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
        height: BANNER_HEIGHT,
        zIndex: 101,
    },
    image: {
        width: IMAGE_SIZE,
        height: IMAGE_SIZE,
        borderRadius: IMAGE_SIZE / 2,
        marginRight: 12,
        borderWidth: 2,
        borderColor: "white"
    },
    bannerContainer: {
        // 배너 전체 영역 (애니메이션 적용 대상)
        position: "absolute",
        bottom: 10,
        width: "90%",
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
        height: BANNER_HEIGHT,
        zIndex: 100,
        paddingLeft: IMAGE_SIZE + 25,
    },
    bannerContent: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    bannerTextContainer: {
        flex: 1,
    },
    bannerTitle: {
        color: "white",
        fontSize: 15,
        fontWeight: "bold",
    },
    bannerSubtitle: {
        color: "white",
        fontSize: 12,
    },
    scheduleButton: {
        flexDirection: "row",
        alignItems: "center",
    },
    scheduleButtonText: {
        color: "white",
        fontWeight: "bold",
        marginRight: 5,
    },
});
