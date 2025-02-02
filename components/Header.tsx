// app/components/ui/Header.tsx

import React from "react";
import {Image, Pressable} from "react-native";
import {HStack} from "@/components/ui/hstack"; 
import {Box} from "@/components/ui/box"; 
import {Text} from "@/components/ui/text"; 
import {Icon, SearchIcon, CalendarDaysIcon, MenuIcon} from "@/components/ui/icon";
import {headerStyles} from "@/app/(tabs)/styles/homeStyles"; // 절대 경로 혹은 상대경로로 수정 가능
import {DEFAULT_PROFILE_IMAGE} from "@/app/(tabs)/constants/homeConstants";

/**
 * Header 컴포넌트
 * - 앱 상단의 프로필 및 아이콘 버튼 영역을 렌더링
 */
const Header = () => {
    return (
        <Box style={headerStyles.container}>
            <HStack style={headerStyles.innerContainer}>
                {/* 왼쪽: 프로필 이미지와 유저 이름 */}
                <HStack style={headerStyles.profileContainer}>
                    <Image source={{uri: DEFAULT_PROFILE_IMAGE}} style={headerStyles.profileImage}/>
                    <Text style={headerStyles.profileName}>석현님</Text>
                </HStack>
                {/* 오른쪽: 아이콘 버튼 (검색, 캘린더, 메뉴) */}
                <HStack style={{flexDirection: "row"}}>
                    <Pressable style={headerStyles.iconButton}>
                        <Icon as={SearchIcon} size="xl"/>
                    </Pressable>
                    <Pressable style={headerStyles.iconButton}>
                        <Icon as={CalendarDaysIcon} size="xl"/>
                    </Pressable>
                    <Pressable style={headerStyles.iconButton}>
                        <Icon as={MenuIcon} size="xl"/>
                    </Pressable>
                </HStack>
            </HStack>
        </Box>
    );
};

export default Header;
