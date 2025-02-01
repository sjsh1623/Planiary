import {Image, Animated, Pressable} from 'react-native';
import {Text} from "@/components/ui/text";
import {HStack} from "@/components/ui/hstack";
import ScrollView = Animated.ScrollView;
import {Box} from "@/components/ui/box";
import {Input, InputField} from "@/components/ui/input"
import {Icon, SearchIcon, CalendarDaysIcon, MenuIcon} from '@/components/ui/icon';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Entypo from '@expo/vector-icons/Entypo';
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
    {id: 1, image: "https://picsum.photos/200", label: "국내여행"},
    {id: 2, image: "https://picsum.photos/200", label: "해외여행"},
    {id: 3, image: "https://picsum.photos/200", label: "캠핑·글램핑"},
    {id: 4, image: "https://picsum.photos/200", label: "데이트"},
];


const HEADER_HEIGHT = 60;
const PROFILE_IMAGE_SIZE = 37;
const CONTENT_WIDTH = "85%";

export default function HomeScreen() {
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
                <ScrollView style={{paddingTop: HEADER_HEIGHT, backgroundColor: "white"}}>
                    {/* 검색창 + 카테고리 */}
                    <Box
                        style={{
                            backgroundColor: "white",
                            padding: 20,
                            borderRadius: 12,
                            alignSelf: "center",
                            width: CONTENT_WIDTH,
                            borderWidth: 1,
                            borderColor: "#E5E7EB", // 테두리 색상 추가 (연한 회색)

                            // 🔥 아주 살짝 그림자 효과 추가
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 1 },
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
                                        marginBottom: 16, // 각 아이템 간 여백
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
                </ScrollView>
        </>
    );
};
