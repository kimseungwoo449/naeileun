// Comment.js
import React from 'react';
import { Box, Avatar, Text, VStack, HStack, IconButton } from '@chakra-ui/react';
import { FaThumbsUp, FaReply } from 'react-icons/fa';

const Comment = ({ comment }) => {
    return (
        <Box borderWidth="1px" borderRadius="lg" p={4} mb={4}>
            <HStack align="start" spacing={4}>
                <Avatar name={comment.username} />
                <VStack align="start" spacing={2} w="full">
                    <HStack justify="space-between" w="full">
                        <Text fontWeight="bold">{comment.username}</Text>
                        <Text fontSize="sm" color="gray.500">{new Date(comment.write_date).toLocaleString()}</Text>
                    </HStack>
                    <Text>{comment.content}</Text>
                    <HStack spacing={4}>
                        <IconButton icon={<FaThumbsUp />} aria-label="Like" size="sm" />
                        <IconButton icon={<FaReply />} aria-label="Reply" size="sm" />
                    </HStack>
                </VStack>
            </HStack>
        </Box>
    );
};

export default Comment;
