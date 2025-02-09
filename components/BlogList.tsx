// app/components/ui/BlogList.tsx

import React from "react";
import {Image, Pressable} from "react-native";
import {HStack} from "@/components/ui/hstack";
import {VStack} from "@/components/ui/vstack";
import {Text} from "@/components/ui/text";
import {Box} from "@/components/ui/box";
import {blogListStyles} from "@/app/(tabs)/styles/homeStyles";
import {blogPosts} from "@/app/(tabs)/constants/homeConstants";

/**
 * BlogList 컴포넌트
 * - 블로그 포스트 리스트를 렌더링하며 '더보기' 버튼 포함
 */
const BlogList = () => {
    return (
        <VStack style={blogListStyles.container}>
            {/* 리스트 헤더: 타이틀 및 '더보기' 버튼 */}
            <HStack style={blogListStyles.header}>
                <Text style={blogListStyles.headerTitle}>Planiary 매거진</Text>
                <Pressable>
                    <Text style={blogListStyles.headerButtonText}>더보기</Text>
                </Pressable>
            </HStack>
            {/* 각 블로그 포스트 아이템 */}
            {blogPosts.map((post) => (
                <Box key={post.id} style={blogListStyles.blogItem}>
                    <Image source={{uri: post.image}} style={blogListStyles.blogImage}/>
                    <Box style={blogListStyles.blogContent}>
                        <Text style={blogListStyles.blogTitle}>{post.title}</Text>
                        <Text style={blogListStyles.blogDescription}>{post.description}</Text>
                        <HStack style={blogListStyles.blogFooter}>
                            <Box style={blogListStyles.blogSourceBadge}>
                                <Text style={blogListStyles.blogSourceText}>{post.source}</Text>
                            </Box>
                            <Text style={blogListStyles.blogDate}>{post.date}</Text>
                        </HStack>
                    </Box>
                </Box>
            ))}
        </VStack>
    );
};

export default BlogList;
