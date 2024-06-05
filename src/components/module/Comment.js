import React, { useState } from 'react';
import { Box, Avatar, Text, VStack, HStack, IconButton, Menu, MenuButton, MenuList, MenuItem, Textarea, Button } from '@chakra-ui/react';
import { FaThumbsUp, FaReply, FaEllipsisV } from 'react-icons/fa';
import { useLogin } from '../LoginContext';

const Comment = ({ comment, onUpdateComment, onDeleteComment }) => {
    const { user } = useLogin();

    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(comment.content);

    const handleSave = () => {
        onUpdateComment({ ...comment, content: editedContent });
        setIsEditing(false);
    };

    return (
        <Box flexDirection={"column"} borderWidth="1px" borderRadius="lg" p={4}>
            <HStack align="start" spacing={4}>
                <Avatar name={comment.userId} />
                <VStack align="start" spacing={1} w="full">
                    <HStack justify="space-between" w="full">
                        <Text fontWeight="bold" ml={3} mt={2}>{comment.userId}</Text>
                        <Text fontSize="sm" color="gray.500">{new Date(comment.writeDate).toLocaleString()}</Text>
                    </HStack>
                    {isEditing ? (
                        <Textarea
                            ml={3}
                            mt={3}
                            mb={3}
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                        />
                    ) : ( 
                        <Text ml={3} mt={3} mb={3} whiteSpace="pre-line">{comment.content}</Text>
                    )}
                    <HStack justify="space-between" w="full">
                        <HStack spacing={4} ml={3} mb={2}>
                            <IconButton icon={<FaThumbsUp />} aria-label="Like" size="sm" />
                            <IconButton icon={<FaReply />} aria-label="Reply" size="sm" />
                        </HStack>
                        <HStack spacing={4} ml={3} mb={2}>
                            {isEditing ? (
                                <Button size="sm" colorScheme="blue" onClick={handleSave}>저장</Button>
                            ) : (
                                user !== null && user.id === comment.userId && (
                                <Menu>
                                    <MenuButton as={IconButton} icon={<FaEllipsisV />} aria-label="Options" size="sm" />
                                    <MenuList>
                                        <MenuItem onClick={() => setIsEditing(true)}>수정</MenuItem>
                                        <MenuItem onClick={() => onDeleteComment(comment)}>삭제</MenuItem>
                                    </MenuList>
                                </Menu>
                                )
                            )}
                        </HStack>
                    </HStack>
                </VStack>
            </HStack>
        </Box>
    );
};

export default Comment;
