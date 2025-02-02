import {Image, Animated, Pressable, Dimensions, NativeScrollEvent, NativeSyntheticEvent, View} from "react-native";
import {Text} from "@/components/ui/text";
import {HStack} from "@/components/ui/hstack";
import ScrollView = Animated.ScrollView;
import {Box} from "@/components/ui/box";
import {Input, InputField} from "@/components/ui/input"
import {Icon, SearchIcon, CalendarDaysIcon, MenuIcon} from '@/components/ui/icon';
import {useEffect, useRef, useState} from "react";
import {VStack} from "@/components/ui/vstack";


const blogPosts = [
    {
        id: 1,
        image: "https://picsum.photos/800/800", // 이미지 URL
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

// 📌 카테고리 데이터 (이미지 URL 사용)
const categories = [
    {id: 1, image: "https://picsum.photos/210", label: "국내여행"},
    {id: 2, image: "https://picsum.photos/211", label: "해외여행"},
    {id: 3, image: "https://picsum.photos/222", label: "캠핑·글램핑"},
    {id: 4, image: "https://picsum.photos/233", label: "데이트"},
];

const cities = [
    {id: 1, image: "https://picsum.photos/221", name: "오사카"},
    {id: 2, image: "https://picsum.photos/220", name: "후쿠오카"},
    {id: 3, image: "https://picsum.photos/223", name: "도쿄"},
    {id: 4, image: "https://picsum.photos/224", name: "다낭"},
    {id: 5, image: "https://picsum.photos/225", name: "교토"},
    {id: 6, image: "https://picsum.photos/226", name: "방콕"},
];


const HEADER_HEIGHT = 60;
const PROFILE_IMAGE_SIZE = 37;
const SCREEN_WIDTH = Dimensions.get("window").width;
const CONTENT_WIDTH = "85%"; // 🔥 85% 값을 문자열로 저장
const CONTENT_WIDTH_RATIO = parseFloat(CONTENT_WIDTH) / 100; // 🔥 "85%" → 0.85 변환
const REMAINING_SPACE_RATIO = 1 - CONTENT_WIDTH_RATIO; // 🔥 남는 공간 계산 (15%)
const HORIZONTAL_PADDING = (SCREEN_WIDTH * REMAINING_SPACE_RATIO) / 2; // 🔥 좌우 7.5%씩 적용
const IMAGE_SIZE = 50; // 🔥 작은 배너일 때 유지되는 이미지 크기
const BANNER_HEIGHT = 85; // 🔥 배너 높이 설정
const ANIMATION_DURATION = 180; // 애니메이션 지속 시간 (ms)


export default function HomeScreen() {
    const [isTop, setIsTop] = useState(true);

    // 🔥 스크롤 이벤트 핸들러 (TypeScript 타입 적용)
    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        setIsTop(offsetY <= 10); // 🔥 10px 이하일 때 최상단으로 판단
    };

    // 🔥 애니메이션 상태 (위치 및 투명도)
    const bannerTranslateX = useRef(new Animated.Value(0)).current;
    const bannerImageTranslateX = useRef(new Animated.Value(0)).current;
    const opacity = useRef(new Animated.Value(1)).current;

    // 🔥 `isTop`이 변경될 때 애니메이션 실행
    useEffect(() => {
        console.log('test')
        Animated.parallel([
            Animated.timing(bannerTranslateX, {
                toValue: isTop ? 0 : SCREEN_WIDTH, // 오른쪽으로 이동
                duration: ANIMATION_DURATION,
                useNativeDriver: true,
            }),
            Animated.timing(bannerImageTranslateX, {
                toValue: isTop ? 0 : SCREEN_WIDTH * 0.75, // 오른쪽으로 이동
                duration: ANIMATION_DURATION,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: isTop ? 1 : 0, // 투명도 조절
                duration: ANIMATION_DURATION,
                useNativeDriver: true,
            }),
        ]).start();
    }, [isTop]);

    return (
        <>
            {/* 🔥 고정된 헤더 */}
            <Box
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    backgroundColor: "white",
                    zIndex: 50,
                    paddingHorizontal: 24,
                    paddingBottom: 8,
                    paddingTop: 8,
                    height: HEADER_HEIGHT,
                    justifyContent: "center",
                }}
            >
                <HStack style={{justifyContent: "space-between", alignItems: "center"}}>
                    {/* 🔥 프로필 & 유저 정보 (왼쪽) */}
                    <HStack style={{flexDirection: "row", alignItems: "center"}}>
                        <Image
                            source={{uri: "https://i.pravatar.cc/101"}}
                            style={{
                                width: PROFILE_IMAGE_SIZE,
                                height: PROFILE_IMAGE_SIZE,
                                borderRadius: PROFILE_IMAGE_SIZE / 2,
                            }}
                        />
                        <Text style={{fontSize: 20, fontWeight: "bold", marginLeft: 8}}>석현님</Text>
                    </HStack>

                    {/* 🔥 아이콘 버튼 (오른쪽) */}
                    <HStack style={{flexDirection: "row"}}>
                        <Pressable style={{padding: 12}}>
                            <Icon as={SearchIcon} size="xl"/>
                        </Pressable>
                        <Pressable style={{padding: 12}}>
                            <Icon as={CalendarDaysIcon} size="xl"/>
                        </Pressable>
                        <Pressable style={{padding: 12}}>
                            <Icon as={MenuIcon} size="xl"/>
                        </Pressable>
                    </HStack>
                </HStack>
            </Box>

            {/* 🔥 스크롤 가능한 본문 (헤더 높이만큼 padding 추가) */}
            <Animated.ScrollView
                style={{paddingTop: HEADER_HEIGHT, backgroundColor: "white"}}
                scrollEventThrottle={16}
                onScroll={handleScroll}
            >
                {/* 검색창 + 카테고리 */}
                <Box
                    style={{
                        backgroundColor: "white",
                        paddingVertical: 25,
                        paddingHorizontal: 20,
                        borderRadius: 12,
                        alignSelf: "center",
                        width: CONTENT_WIDTH,
                        borderWidth: 1,
                        borderColor: "#E5E7EB", // 테두리 색상 추가 (연한 회색)

                        // 🔥 아주 살짝 그림자 효과 추가
                        shadowColor: "#000",
                        shadowOffset: {width: 0, height: 1},
                        shadowOpacity: 0.1,
                        shadowRadius: 2,
                        elevation: 2, // Android용 그림자
                    }}
                >
                    <Input style={{
                        borderWidth: 1,
                        borderColor: "#D1D5DB",
                        borderRadius: 8,
                        paddingHorizontal: 12,
                        paddingVertical: 15,
                        height: 55
                    }}>
                        <InputField placeholder="어디로 떠나시나요?" style={{fontSize: 16}}/>
                    </Input>
                    {/* 🔥 Responsive한 Pressable 카테고리 리스트 */}
                    <HStack
                        style={{
                            flexWrap: "wrap",
                            justifyContent: "space-between",
                            marginTop: 16,
                        }}
                    >
                        {categories.map((item) => (
                            <Pressable
                                key={item.id}
                                style={{
                                    alignItems: "center",
                                    width: "22%", // 한 줄에 4개씩 배치
                                }}
                            >
                                {/* 🔥 이미지 URL 사용 */}
                                <Image
                                    source={{uri: item.image}}
                                    style={{
                                        width: 50,
                                        height: 50,
                                        marginBottom: 4,
                                        borderRadius: 8,
                                        resizeMode: "cover",
                                    }}
                                />
                                <Text style={{fontSize: 12, fontWeight: "bold"}}>{item.label}</Text>
                            </Pressable>
                        ))}
                    </HStack>
                </Box>

                {/* 🔥 회색 구분선 */}
                <Box style={{
                    backgroundColor: "#E5E7EB",
                    height: 10,
                    width: "100%",
                    marginVertical: 24,
                    borderRadius: 5
                }}/>

                {/* 🔥 인기 도시 리스트 (수평 스크롤) */}
                <VStack style={{marginBottom: 16}}>
                    <Text style={{fontSize: 18, fontWeight: "bold", alignSelf: "center", width: CONTENT_WIDTH}}>
                        요즘 해외 인기<Text style={{color: "#2563EB", fontSize: 18}}>도시</Text>
                    </Text>

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={{marginTop: 12,}} // 🔥 텍스트와 동일한 너비 설정
                        contentContainerStyle={{
                            flexDirection: "row",
                            justifyContent: "flex-start",
                        }} // 🔥 내부 요소가 좌측 정렬되도록 설정
                    >
                        <HStack style={{flexDirection: "row", gap: 13, paddingHorizontal: HORIZONTAL_PADDING}}>
                            {cities.map((city) => (
                                <Pressable key={city.id} style={{alignItems: "center"}}>
                                    <Image
                                        source={{uri: city.image}}
                                        style={{
                                            width: 70,
                                            height: 70,
                                            borderRadius: 35, // 원형 처리
                                        }}
                                    />
                                    <Text style={{fontSize: 14, marginTop: 8}}>{city.name}</Text>
                                </Pressable>
                            ))}
                        </HStack>
                    </ScrollView>
                </VStack>

                {/* 🔥 블로그 리스트 */}
                <VStack style={{alignSelf: "center", width: CONTENT_WIDTH}}>
                    <HStack style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 24,
                        marginBottom: 16
                    }}>
                        <Text style={{fontSize: 20, fontWeight: "bold"}}>트리플 매거진</Text>
                        <Pressable>
                            <Text style={{fontSize: 14, color: "#2563EB"}}>더보기</Text>
                        </Pressable>
                    </HStack>

                    {blogPosts.map((post) => (
                        <Box key={post.id} style={{
                            backgroundColor: "white",
                            borderRadius: 12,
                            shadowOpacity: 0.1,
                            shadowRadius: 4,
                            overflow: "hidden",
                            marginBottom: 16
                        }}>
                            {/* 🔥 이미지 둥글게 처리 */}
                            <Image source={{uri: post.image}}
                                   style={{width: "100%", height: 300, borderRadius: 12}}/>
                            <Box style={{paddingVertical: 16}}>
                                <Text style={{fontSize: 18, fontWeight: "bold"}}>{post.title}</Text>
                                <Text style={{color: "#6B7280", marginTop: 4}}>{post.description}</Text>
                                <HStack style={{flexDirection: "row", alignItems: "center", marginTop: 8}}>
                                    <Box style={{
                                        backgroundColor: "#2563EB",
                                        paddingHorizontal: 8,
                                        paddingVertical: 4,
                                        borderRadius: 12,
                                        marginRight: 8
                                    }}>
                                        <Text style={{fontSize: 12, color: "white"}}>{post.source}</Text>
                                    </Box>
                                    <Text style={{fontSize: 14, color: "#9CA3AF"}}>{post.date}</Text>
                                </HStack>
                            </Box>
                        </Box>
                    ))}
                </VStack>
            </Animated.ScrollView>

            {/* 🔥 하단 배너 (스크롤 최상단일 때 전체 배너 표시) */}
            <Animated.View style={{
                position: "absolute",
                bottom: 80,
                width: '90%',
                padding: 12,
                borderRadius: isTop ? 15 : IMAGE_SIZE / 2,
                flexDirection: "row",
                alignItems: "center",
                alignSelf: "center",
                height: BANNER_HEIGHT,
                zIndex: 101,
                transform: [{translateX: bannerImageTranslateX}],
            }}>
                <Image
                    source={{uri: "https://picsum.photos/200"}}
                    style={{
                        width: IMAGE_SIZE,
                        height: IMAGE_SIZE,
                        borderRadius: IMAGE_SIZE / 2,
                        marginRight: 12,
                        opacity: 1
                    }}
                />
            </Animated.View>
            <Animated.View
                style={{
                    position: "absolute",
                    bottom: 80,
                    width: '90%',
                    backgroundColor: "#06B6D4",
                    padding: isTop ? 12 : 0,
                    borderRadius: isTop ? 15 : IMAGE_SIZE / 2,
                    flexDirection: "row",
                    alignItems: "center",
                    alignSelf: "center",
                    height: BANNER_HEIGHT,
                    zIndex: 100,
                    transform: [{translateX: bannerTranslateX}],
                    opacity: opacity,
                    paddingLeft: IMAGE_SIZE + 25
                }}
            >
                {/* 🔥 배너 내의 이미지 */}


                {/* 🔥 최상단일 때만 텍스트 & 버튼 표시 */}

                <HStack style={{flex: 1, alignItems: "center"}}>
                    {/* 🔥 왼쪽: 여행 정보 */}
                    <VStack style={{flex: 1}}>
                        <Text style={{color: "white", fontSize: 15, fontWeight: "bold"}}>도쿄 여행</Text>
                        <Text style={{color: "white", fontSize: 12}}>D-6 | 2.8 (Sat) - 2.13 (Thu)</Text>
                    </VStack>

                    {/* 🔥 오른쪽: 내 일정 버튼 */}
                    <Pressable style={{flexDirection: "row", alignItems: "center"}}>
                        <Text style={{color: "white", fontWeight: "bold", marginRight: 5}}>내 일정</Text>
                        <Icon as={CalendarDaysIcon} size="sm" color="white"/>
                    </Pressable>
                </HStack>

            </Animated.View>

        </>
    );
};
