import React, { useState } from 'react';
import { Box, Avatar, Text, VStack, HStack, IconButton, Menu, MenuButton, MenuList, MenuItem, Textarea, Button } from '@chakra-ui/react';
import { FaThumbsUp, FaReply, FaEllipsisV } from 'react-icons/fa';
import { useLogin } from '../LoginContext';

const Comment = ({ comment, onUpdateComment, onDeleteComment }) => {
    const { user } = useLogin();

    const [isEditing, setIsEditing] = useState(false); // 수정 모드를 위한 상태 추가
    const [editedContent, setEditedContent] = useState(comment.content); // 수정된 댓글 내용을 위한 상태 추가

    const handleSave = () => { // 저장 버튼 클릭 시 호출되는 함수 추가
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
                    {isEditing ? ( // 수정 모드일 때 Textarea 표시
                        <Textarea
                            ml={3}
                            mt={3}
                            mb={3}
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                        />
                    ) : ( // 일반 모드일 때 Text 표시
                        <Text ml={3} mt={3} mb={3} whiteSpace="pre-line">{comment.content}</Text>
                    )}
                    <HStack justify="space-between" w="full">
                        <HStack spacing={4} ml={3} mb={2}>
                            <IconButton icon={<FaThumbsUp />} aria-label="Like" size="sm" />
                            <IconButton icon={<FaReply />} aria-label="Reply" size="sm" />
                        </HStack>
                        <HStack spacing={4} ml={3} mb={2}>
                            {isEditing ? ( // 수정 모드일 때 저장 버튼 표시
                                <Button size="sm" colorScheme="blue" onClick={handleSave}>저장</Button>
                            ) : ( // 일반 모드일 때 점 세 개 메뉴 표시
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
