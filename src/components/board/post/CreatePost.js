import React, { useState } from 'react';
import { Box, Button, FormControl, Input, Textarea, VStack, HStack, IconButton, Menu, MenuButton, MenuList, MenuItem, Heading, Select } from '@chakra-ui/react';
import { FaRegSmile } from 'react-icons/fa';
import { BsImage } from 'react-icons/bs';
import { AiOutlineLink } from 'react-icons/ai';
import { useLocation, useNavigate } from 'react-router-dom';

const CreatePost = () => {
    const location = useLocation();
    const boardCode = location.state.boardCode;
    const boardList = location.state.board;
    console.log("boardCode: " + boardCode)
    console.log("boardList: " + boardList)

    const TITLE_MAX_LENGTH = 50;
    const CONTENT_MAX_LENGTH = 4000;

    let [inputCount, setInputCount] = useState(0);

    const onInputHandler = (e) => {
        console.log("id : "+e.target.id)
        if(e.target.id === 'title') {
            if (e.target.value.length > TITLE_MAX_LENGTH) {
                e.target.value = e.target.value.slice(0, TITLE_MAX_LENGTH);
            }
        }else if(e.target.id === 'content') {
            if (e.target.value.length > CONTENT_MAX_LENGTH) {
                e.target.value = e.target.value.slice(0, CONTENT_MAX_LENGTH);
            }
        }
        setInputCount(e.target.value.length);
    };

    return (
        <>
            <Box m={"60px 0"} p={5} shadow="md" borderWidth="1px" borderRadius={"md"} w="800px" mx="auto" minHeight="50vh">
                <Box textAlign="center" mb={5} mt={5}>
                    <Heading as="h3" size="lg">게시글 작성</Heading>
                </Box>
                <VStack spacing={4} align="stretch">
                    <Select variant='flushed'>
                        <option value='option' disabled>게시판 선택</option>
                        {boardList.map((board, index) => (
                            <option id='board-code' value={board.boardCode} selected={board.boardCode === boardCode}>{board.boardName}</option>
                        ))}
                    </Select>
                    <FormControl id="title">
                        <Input id='title' minHeight="5vh" type="text" placeholder="제목" onChange={onInputHandler} maxLength={TITLE_MAX_LENGTH} wordBreak={"break-all"} />
                        <Box textAlign={"end"}>
                            <span>{inputCount}</span> {/* 글자수 표시하는 부분 */}
                            <span>/{TITLE_MAX_LENGTH} 자</span>
                        </Box>
                    </FormControl>
                    <FormControl id="content">
                        <Textarea id='content' minHeight="30vh" placeholder="내용" onChange={onInputHandler} maxLength={CONTENT_MAX_LENGTH} wordBreak={"break-all"}  />
                        <Box textAlign={"end"}>
                            <span>{inputCount}</span> {/* 글자수 표시하는 부분 */}
                            <span>/{CONTENT_MAX_LENGTH} 자</span>
                        </Box>
                    </FormControl>
                    <HStack justifyContent="space-between">
                        <HStack>
                            <IconButton icon={<FaRegSmile />} aria-label="Emoji" />
                            <IconButton icon={<BsImage />} aria-label="Image" />
                            <IconButton icon={<AiOutlineLink />} aria-label="Link" />
                        </HStack>
                        <Button colorScheme="gray" size="md">등록</Button>
                    </HStack>
                </VStack>
            </Box>
        </>
    );
};

export default CreatePost;
