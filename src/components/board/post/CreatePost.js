import React, { useState } from 'react';
import { Box, Button, FormControl, Input, Textarea, VStack, HStack, IconButton, Menu, MenuButton, MenuList, MenuItem, Heading, Select } from '@chakra-ui/react';
import { FaRegSmile } from 'react-icons/fa';
import { BsImage } from 'react-icons/bs';
import { AiOutlineLink } from 'react-icons/ai';
import { Form, useLocation, useNavigate } from 'react-router-dom';

const CreatePost = () => {
    const navigate = useNavigate();

    const location = useLocation();
    const boardCode = location.state.boardCode;
    const boardList = location.state.board;
    console.log("boardCode: " + boardCode)
    console.log("boardList: " + boardList)

    const TITLE_MAX_LENGTH = 50;
    const CONTENT_MAX_LENGTH = 4000;

    const userStr = sessionStorage.getItem('user');
    const user = JSON.parse(userStr);

    let [inputCount, setInputCount] = useState(0);

    const submit = e => {
        e.preventDefault();
    
        const req = {
            "title": e.target.reqTitle.value,
            "content": e.target.reqContent.value,
            "user_id": user.id,
            "board_code": e.target.reqBoardCode.value
        }
        console.log("req : "+req);
    
        fetch(`${process.env.REACT_APP_SERVER_URL}/board/write`, {
            method: 'POST',
            headers: {
                Authorization: `ADMIN ${process.env.REACT_APP_ADMIN_KEY}`,
                "Content-Type": "application/json;charset=UTF8"
            },
            body: JSON.stringify(req),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);

                if(data.status){
                    navigate('/');
                }else{
                    const resBoardCode = data.result.boardCode;
                    const postCode = data.result.postCode;
                    navigate('/board/detail', { state: { boardCode: resBoardCode, postCode: postCode, boardList: boardList } });
                }
            });
    }

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
                <Form method='POST' action={`${process.env.REACT_APP_SERVER_URL}/board/write`} onSubmit={submit}>
                    <VStack spacing={4} align="stretch">
                        <Select variant='flushed'>
                            <option value='option' disabled>게시판 선택</option>
                            {boardList.map((board, index) => (
                                <option id='board-code' name='reqBoardCode' value={board.boardCode} selected={board.boardCode == boardCode}>{board.boardName}</option>
                            ))}
                        </Select>
                        <FormControl id="title">
                            <Input id='title' name='reqTitle' minHeight="5vh" type="text" placeholder="제목" onChange={onInputHandler} maxLength={TITLE_MAX_LENGTH} />
                            <Box textAlign={"end"}>
                                <span>{inputCount}</span> {/* 글자수 표시하는 부분 */}
                                <span>/{TITLE_MAX_LENGTH} 자</span>
                            </Box>
                        </FormControl>
                        <FormControl id="content">
                            <Textarea id='content' name='reqContent' minHeight="50vh" placeholder="내용" onChange={onInputHandler} maxLength={CONTENT_MAX_LENGTH} wordBreak={"break-all"}  />
                            <Box textAlign={"end"}>
                                <span>{inputCount}</span> {/* 글자수 표시하는 부분 */}
                                <span>/{CONTENT_MAX_LENGTH} 자</span>
                            </Box>
                        </FormControl>
                        <HStack justifyContent="space-between">
                            <HStack>
                                <IconButton icon={<FaRegSmile />} aria-label="Emoji" />
                                <IconButton icon={<BsImage />} aria-label="Image" />
                            </HStack>
                            <Button type='submit' colorScheme="gray" size="md">등록</Button>
                        </HStack>
                    </VStack>
                </Form>
            </Box>
        </>
    );
};

export default CreatePost;
