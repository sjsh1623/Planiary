import {Image, Animated, Pressable} from 'react-native';
import {Text} from "@/components/ui/text";
import {HStack} from "@/components/ui/hstack";
import ScrollView = Animated.ScrollView;
import {Box} from "@/components/ui/box";
import {Input, InputField} from "@/components/ui/input"
import {Icon, SearchIcon, CalendarDaysIcon, MenuIcon} from '@/components/ui/icon';
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

export default function HomeScreen() {
    return (
        <>
            {/* 고정된 헤더 */}
            <Box className="absolute top-0 left-0 w-full bg-white shadow-md z-50 px-4 pt-6 pb-4">
                <HStack className="justify-between items-center">
                    {/* 🔥 프로필 & 유저 정보 (왼쪽) */}
                    <HStack className="items-center space-x-4">
                        <Image
                            source={{ uri: "https://i.pravatar.cc/110" }} // 임시 프로필 이미지
                            className="w-12 h-12 rounded-full"
                        />
                        <Text className="text-lg font-bold">석현님</Text>
                    </HStack>

                    {/* 🔥 아이콘 버튼 (오른쪽) */}
                    <HStack className="space-x-6">
                        <Pressable className="p-3">
                            <Icon as={SearchIcon} size="lg" />
                        </Pressable>
                        <Pressable className="p-3">
                            <Icon as={CalendarDaysIcon} size="lg" />
                        </Pressable>
                        <Pressable className="p-3">
                            <Icon as={MenuIcon} size="lg" />
                        </Pressable>
                    </HStack>
                </HStack>
            </Box>

            {/* 스크롤 가능한 본문 (헤더 높이만큼 padding 추가) */}
            <ScrollView className="pt-16">
                {/* 검색창 + 카테고리 */}
                <Box className="bg-white p-5 rounded-lg shadow-md w-[80%] self-center mt-4">
                    <Input className="border border-gray-300 rounded-md mb-6 px-4 py-3">
                        <InputField placeholder="어디로 떠나시나요?" className="text-lg"/>
                    </Input>
                    <HStack className="justify-between mb-6">
                        <Pressable className="items-center"><Text className="text-md font-bold">항공권</Text></Pressable>
                        <Pressable className="items-center"><Text className="text-md font-bold">숙소</Text></Pressable>
                        <Pressable className="items-center"><Text className="text-md font-bold">투어·티켓</Text></Pressable>
                        <Pressable className="items-center">
                            <Text className="text-md font-bold text-red-500">배낭톡</Text>
                            <Box className="bg-red-500 px-2 py-1 rounded-full mt-1">
                                <Text className="text-xs text-white">일본 게시판</Text>
                            </Box>
                        </Pressable>
                    </HStack>
                </Box>

                {/* 회색 구분선 */}
                <Box className="bg-gray-200 h-[10px] w-full my-6 rounded-lg"/>

                {/* 블로그 리스트 */}
                <VStack className="space-y-4 px-4 w-[80%] self-center">
                    <Box className="flex-row justify-between items-center mt-6 mb-4">
                        <Text className="text-lg font-bold">트리플 매거진</Text>
                        <Pressable>
                            <Text className="text-sm text-blue-500">더보기</Text>
                        </Pressable>
                    </Box>

                    {blogPosts.map((post) => (
                        <Box key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            {/* 🔥 이미지 둥글게 처리 */}
                            <Image source={{uri: post.image}} className="w-full h-[200px] rounded-lg"/>
                            <Box className="p-4">
                                <Text className="text-lg font-bold">{post.title}</Text>
                                <Text className="text-gray-500 mt-1">{post.description}</Text>
                                <Box className="flex-row items-center mt-2">
                                    <Box className="bg-blue-500 px-2 py-1 rounded-full mr-2">
                                        <Text className="text-xs text-white">{post.source}</Text>
                                    </Box>
                                    <Text className="text-sm text-gray-400">{post.date}</Text>
                                </Box>
                            </Box>
                        </Box>
                    ))}
                </VStack>
            </ScrollView>
        </>
    )
};
