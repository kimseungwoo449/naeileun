import React, { useState, useRef } from 'react';
import { Box, Button, FormControl, Input, Textarea, VStack, HStack, IconButton, Heading, Select, Image, Alert, AlertIcon } from '@chakra-ui/react';
import { FaRegSmile } from 'react-icons/fa';
import { BsImage } from 'react-icons/bs';
import { Form, useLocation, useNavigate } from 'react-router-dom';
import Picker from 'emoji-picker-react';
import { useLogin } from '../../LoginContext';

const CreatePost = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const boardCode = parseInt(location.state.boardCode);
    const boardList = location.state.boardList; 

    const TITLE_MAX_LENGTH = 50;
    const CONTENT_MAX_LENGTH = 4000; 
    const FILE_SIZE_MAX_LIMIT = 5 * 1024 * 1024; 

    const { user } = useLogin();

    const [title, setTitle] = useState(''); 
    const [content, setContent] = useState('');
    const [inputCount, setInputCount] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null); 
    const [preview, setPreview] = useState(null); 
    const [showEmojiPicker, setShowEmojiPicker] = useState(false); 
    const [selectBoardCode, setselectBoardCode] = useState(boardCode);
    const [fileError, setFileError] = useState(false);

    const fileInputRef = useRef(null);

    const submit = e => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("user_id", user.id);
        formData.append("board_code", selectBoardCode);
        if (selectedFile) {
            formData.append("file", selectedFile);
        }

        fetch(`${process.env.REACT_APP_SERVER_URL}/board/write`, {
            method: 'POST',
            headers: {
                Authorization: `ADMIN ${process.env.REACT_APP_ADMIN_KEY}`
            },
            body: formData,
        })
            .then(response => response.json())
            .then(data => {

                if (data.status) {
                    const resBoardCode = data.boardCode;
                    const postCode = data.postCode;
                    navigate('/board/detail', { state: { boardCode: resBoardCode, postCode: postCode, boardList: boardList } }); 
                } else {
                    navigate('/'); 
                }
            });
    }

    const onInputHandler = (e) => {
        const { id, value } = e.target;

        if (id === 'title' && value.length > TITLE_MAX_LENGTH) {
            e.target.value = value.slice(0, TITLE_MAX_LENGTH);
        } else if (id === 'content' && value.length > CONTENT_MAX_LENGTH) {
            e.target.value = value.slice(0, CONTENT_MAX_LENGTH);
        }

        if (id === 'title') {
            setTitle(value);
        } else if (id === 'content') {
            setContent(value);
        }

        setInputCount(value.length);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > FILE_SIZE_MAX_LIMIT) {
                <Alert status='error'>
                    <AlertIcon />
                    파일 크기는 5MB를 초과할 수 없습니다.
                </Alert> 
                setFileError(true);
                setSelectedFile(null); 
                setPreview(null);
            } else {
                setFileError(false);
                setSelectedFile(file);
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreview(reader.result);
                };
                reader.readAsDataURL(file);
            }
        }
    };

    const onEmojiClick = (emojiObject) => {
        const cursorPosition = document.getElementById('content').selectionStart;
        const text = content.slice(0, cursorPosition) + emojiObject.emoji + content.slice(cursorPosition);
        setContent(text);
        setInputCount(text.length);
        setShowEmojiPicker(false);
    };

    const handleBoardChange = (e) => {
        setselectBoardCode(parseInt(e.target.value));
    };

    return (
        <>
            <Box m={"60px 0"} p={5} shadow="md" borderWidth="1px" borderRadius={"md"} w="800px" mx="auto" minHeight="50vh">
                <Box textAlign="center" mb={5} mt={5}>
                    <Heading as="h3" size="lg">게시글 작성</Heading>
                </Box>
                <Form method='POST' action={`${process.env.REACT_APP_SERVER_URL}/board/write`} onSubmit={submit} encType='multipart/form-data'>
                    <VStack spacing={4} align="stretch">
                        <Select variant='flushed' onChange={handleBoardChange}>
                            <option value='option' disabled>게시판 선택</option>
                            {boardList.map((board, index) => (
                                <option id={"boardCode"} key={index} value={board.boardCode} selected={board.boardCode === boardCode}>{board.boardName}</option>
                            ))}
                        </Select>
                        <FormControl id="title">
                            <Input id='title' name='reqTitle' minHeight="5vh" type="text" placeholder="제목" onChange={onInputHandler} maxLength={TITLE_MAX_LENGTH} />
                            <Box textAlign={"end"}>
                                <span>{title.length}</span>
                                <span>/{TITLE_MAX_LENGTH} 자</span>
                            </Box>
                        </FormControl>
                        <FormControl id="content">
                            <Textarea
                                id='content'
                                name='reqContent'
                                minHeight="50vh"
                                placeholder="내용"
                                value={content}
                                onChange={onInputHandler}
                                maxLength={CONTENT_MAX_LENGTH}
                                wordBreak={"break-all"}
                            />
                            <Box textAlign={"end"}>
                                <span>{content.length}</span>
                                <span>/{CONTENT_MAX_LENGTH} 자</span>
                            </Box>
                        </FormControl>
                        {preview && (
                            <Box>
                                <Image src={preview} alt="Selected File" maxHeight="200px" mb={4} />
                            </Box>
                        )}

                        <HStack justifyContent="space-between">
                            <HStack>
                                <IconButton
                                    icon={<FaRegSmile />}
                                    aria-label="Emoji"
                                    onClick={() => setShowEmojiPicker(!showEmojiPicker)} 
                                />
                                {showEmojiPicker && (
                                    <Box position="absolute" zIndex="1">
                                        <Picker onEmojiClick={onEmojiClick} />
                                    </Box>
                                )}
                                <IconButton
                                    icon={<BsImage />}
                                    aria-label="Image"
                                    onClick={() => fileInputRef.current.click()} 
                                />
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                    accept="image/*"
                                />
                            </HStack>
                            <Button type='submit' colorScheme="gray" size="md">등록</Button>
                        </HStack>
                        {fileError && (
                            <Alert status='error' mt={4}>
                                <AlertIcon />
                                파일 크기는 5MB를 초과할 수 없습니다.
                            </Alert>
                        )}
                    </VStack>
                </Form>
            </Box>
        </>
    );
};

export default CreatePost;
