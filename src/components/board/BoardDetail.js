// src/BoardDetail.js
import React from 'react';
import {
    Box,
    Text,
    VStack,
    HStack,
    Divider,
    IconButton,
} from '@chakra-ui/react';
import { FaThumbsUp, FaCommentDots } from 'react-icons/fa';

const BoardDetail = () => {
    return (
        <Box p={4} w="1200px" mx="auto" bg="white" boxShadow="md" borderRadius="md">
            <VStack align="start" spacing={3} w="full">
                <HStack justify="space-between" w="full">
                    <Text fontSize="xl" fontWeight="bold">
                        제목
                    </Text>
                </HStack>
                <HStack spacing={2} fontSize="sm" color="gray.500" w="full">
                    <Text>아이디</Text>
                    <Divider orientation="vertical" height="16px" />
                    <Text>작성일</Text>
                </HStack>
                <Text w="full">
                    본문
                    <br />
                    <br />
                </Text>
                <HStack justify="space-between" w="full">
                    <HStack spacing={1}>
                        <IconButton
                            icon={<FaThumbsUp />}
                            size="sm"
                            isRound
                            aria-label="Like"
                        />
                        <Text fontSize="sm">6</Text>
                    </HStack>
                    <HStack spacing={1}>
                        <IconButton
                            icon={<FaCommentDots />}
                            size="sm"
                            isRound
                            aria-label="Comment"
                        />
                        <Text fontSize="sm">21</Text>
                    </HStack>
                </HStack>
            </VStack>
        </Box>
    );
};

export default BoardDetail;
