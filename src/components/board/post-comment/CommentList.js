// CommentList.js
import React from 'react';
import Comment from './Comment';
import { Box, VStack, Textarea, Button } from '@chakra-ui/react';

const comments = [
    {
        author: 'V6shWh2b9v1HRc',
        time: '2시간 전',
        content: '보통 연봉협상 시 일단 높게 부르라고들 많이들 하는데 그게 정말 방법일까요?'
    },
    {
        author: '너와나의연결캡테님',
        time: '2시간 전',
        content: '안녕하세요. 현재 재직중인 곳에서의 연봉협상을 말씀하시는건가요? 무조건적인 인상협상 카드는 오히려 좋지 않은 결과를 초래 할 가능성이 있습니다...'
    },
    {
        author: '히냥님',
        time: '2시간 전',
        content: '정보 감사합니다~'
    }
];

const CommentList = () => {
    return (
        <Box p={4}>
            <VStack spacing={4} align="stretch">
                {comments.map((comment, index) => (
                    <Comment key={index} comment={comment} />
                ))}
                <Box>
                    <Textarea placeholder="댓글을 입력하세요..." mb={2} />
                    <Button colorScheme="blue">댓글 등록</Button>
                </Box>
            </VStack>
        </Box>
    );
};

export default CommentList;
