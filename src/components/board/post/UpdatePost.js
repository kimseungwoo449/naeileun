import React, { useState, useRef, useEffect } from 'react';
import { Box, Button, FormControl, Input, Textarea, VStack, HStack, IconButton, Heading, Select, Image } from '@chakra-ui/react';
import { FaRegSmile } from 'react-icons/fa';
import { BsImage } from 'react-icons/bs';
import { Form, useLocation, useNavigate } from 'react-router-dom';
import Picker from 'emoji-picker-react';
import { useLogin } from '../../LoginContext';

const UpdatePost = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const boardCode = location.state.boardCode;
    const postCode = location.state.postCode;
    const boardList = location.state.boardList;
    const imagePath = location.state.imagePath;

    const TITLE_MAX_LENGTH = 50;
    const CONTENT_MAX_LENGTH = 4000; 

    const [post, setPost] = useState({}); 
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [inputCount, setInputCount] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(imagePath || null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [fileSelected, setFileSelected] = useState(false);
    const { user } = useLogin();

    const fileInputRef = useRef(null);

    const fetchPost = async () => {
        const url = `${process.env.REACT_APP_SERVER_URL}/board/view/${boardCode}/${postCode}`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `ADMIN ${process.env.REACT_APP_ADMIN_KEY}`
            },
        });

        const data = await response.json();

        if (data.status) {
            navigate('/board');
        } else {
            setPost(data.result);
        }
    };

    useEffect(() => {
        fetchPost();
    }, []);

    useEffect(() => {
        if (post.title) {
            setTitle(post.title);
            setContent(post.content);
        }
    }, [post]);

    const submit = e => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("user_id", user.id); 
        formData.append("board_code", boardCode);
        formData.append("post_code", postCode); 

        if (fileSelected) {
            formData.append("file", selectedFile);
            formData.append("image_path", imagePath === "" ? "null" : imagePath);
        }
        
        fetch(`${process.env.REACT_APP_SERVER_URL}/board/update`, {
            method: 'PUT',
            headers: {
                Authorization: `ADMIN ${process.env.REACT_APP_ADMIN_KEY}`
            },
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    const resBoardCode = data.boardCode;
                    const resPostCode = data.postCode;
                    navigate('/board/detail', { state: { boardCode: resBoardCode, postCode: resPostCode, boardList: boardList } });
                } else {
                    navigate('/'); 
                }
            });
    };

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
            setSelectedFile(file);
            setFileSelected(true);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const onEmojiClick = (emojiObject) => {
        const cursorPosition = document.getElementById('content').selectionStart;
        const text = content.slice(0, cursorPosition) + emojiObject.emoji + content.slice(cursorPosition);
        setContent(text);
        setInputCount(text.length);
        setShowEmojiPicker(false);
    };

    return (
        <>
            <Box m={"60px 0"} p={5} shadow="md" borderWidth="1px" borderRadius={"md"} w="800px" mx="auto" minHeight="50vh">
                <Box textAlign="center" mb={5} mt={5}>
                    <Heading as="h3" size="lg">게시글 수정</Heading>
                </Box>
                <Form method='POST' action={`${process.env.REACT_APP_SERVER_URL}/board/write`} onSubmit={submit} encType='multipart/form-data'>
                    <VStack spacing={4} align="stretch">
                        <Select variant='flushed' value={boardCode} disabled>
                            {boardList.map((board, index) => (
                                <option key={index} value={board.boardCode}>
                                    {board.boardName}
                                </option>
                            ))}
                        </Select>
                        <FormControl id="title">
                            <Input id='title' name='reqTitle' minHeight="5vh" type="text" onChange={onInputHandler} maxLength={TITLE_MAX_LENGTH} value={title} />
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
                            <Button type='submit' colorScheme="gray" size="md">수정</Button>
                        </HStack>
                    </VStack>
                </Form>
            </Box>
        </>
    );
};

export default UpdatePost;
