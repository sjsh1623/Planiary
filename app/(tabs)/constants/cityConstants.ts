// app/(tabs)/constants/cityConstants.ts

export interface City {
    name: string;
    description: string;
    image: string;
    category: string;
    type: string;
}

export const CITY_DATA: City[] = [
    {
        name: "나가사키",
        description: "나가사키, 사가, 사세보, 운젠",
        image: "https://picsum.photos/250",
        category: "일본",
        type: "해외도시",
    },
    {
        name: "다카마쓰",
        description: "다카마쓰",
        image: "https://picsum.photos/251",
        category: "일본",
        type: "해외도시",
    },
    {
        name: "마쓰야마",
        description: "마쓰야마",
        image: "https://picsum.photos/252",
        category: "일본",
        type: "해외도시",
    },
    {
        name: "구마모토",
        description: "구마모토, 아소",
        image: "https://picsum.photos/253",
        category: "일본",
        type: "해외도시",
    },
    {
        name: "가평·양평",
        description: "가평, 양평",
        image: "https://picsum.photos/254",
        category: "국내도시",
        type: "국내도시",
    },
    {
        name: "강릉·속초",
        description: "강릉, 속초, 양양",
        image: "https://picsum.photos/255",
        category: "국내도시",
        type: "국내도시",
    },
    {
        name: "부산",
        description: "부산",
        image: "https://picsum.photos/256",
        category: "국내도시",
        type: "국내도시",
    },
    {
        name: "제주",
        description: "제주, 서귀포",
        image: "https://picsum.photos/277",
        category: "국내도시",
        type: "국내도시",
    },
];

// 해외도시 필터 옵션 (국내도시는 기본 '전체'만 있음)
export const FILTER_OPTIONS = {
    해외도시: ["전체", "일본", "동남아시아", "남태평양", "유럽", "미주", "중남미"],
    국내도시: ["전체"],
};

export const DEFAULT_SELECTED_FILTER = "전체";
