// app/(tabs)/styles/cityStyles.ts

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 16,
    },
    // 네비게이션(뒤로가기 + 검색)
    navBar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    iconButton: {
        padding: 8,
    },
    searchBox: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 8,
        paddingVertical: 10,
        marginLeft: 7,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        paddingHorizontal: 8,
    },
    // 탭 내비게이션
    tabContainer: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB",
        marginBottom: 8,
    },
    tabItem: {
        flex: 1,
        paddingVertical: 12,
        alignItems: "center",
    },
    selectedTab: {
        borderBottomWidth: 2,
        borderBottomColor: "#06B6D4",
    },
    tabText: {
        fontSize: 16,
        color: "#9CA3AF",
        fontWeight: "bold",
    },
    selectedTabText: {
        color: "#06B6D4",
    },
    // 필터 바
    filterContainer: {
        marginVertical: 10,
        flexGrow: 0,
        height: 40,
    },
    filterButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: "#F3F4F6",
        marginRight: 8,
        alignSelf: "flex-start",
    },
    selectedFilterButton: {
        backgroundColor: "#06B6D4",
    },
    filterText: {
        fontSize: 14,
        color: "#6B7280",
    },
    selectedFilterText: {
        color: "white",
    },
    // 도시 아이템
    cityItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        minHeight: 50,
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB",
    },
    cityImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    cityInfo: {
        flex: 1,
        marginLeft: 12,
    },
    cityName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    cityDescription: {
        fontSize: 12,
        color: "#9CA3AF",
    },
    selectButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        backgroundColor: "#E5E7EB",
    },
    selectedButton: {
        backgroundColor: "#06B6D4",
    },
    selectButtonText: {
        fontSize: 14,
        color: "#6B7280",
    },
    selectedButtonText: {
        color: "white",
    },
    // 하단 선택 영역
    bottomContainer: {
        padding: 5,
    },
    selectedCitiesContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 16,
    },
    selectedCityItem: {
        alignItems: "center",
        marginRight: 12,
    },
    selectedCityImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginBottom: 4,
    },
    selectedCityNameContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F3F4F6",
        borderRadius: 12,
        paddingVertical: 4,
        paddingHorizontal: 10,
    },
    selectedCityText: {
        fontSize: 14,
        marginRight: 5,
    },
    bottomButton: {
        borderRadius: 5,
        backgroundColor: "#06B6D4",
        alignItems: "center",
        height: 50,
        justifyContent: "center",
        width: "100%",
        marginTop: 16,
    },
    disabledButton: {
        backgroundColor: "#9CA3AF",
    },
    bottomButtonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
    },
});
