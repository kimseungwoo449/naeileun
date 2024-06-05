import React, { useState, useRef, useEffect } from 'react';
import { Box, Button, FormControl, Input, Textarea, VStack, HStack, IconButton, Heading, Select, Image } from '@chakra-ui/react';
import { FaRegSmile } from 'react-icons/fa';
import { BsImage } from 'react-icons/bs';
import { Form, useLocation, useNavigate } from 'react-router-dom';
import Picker from 'emoji-picker-react';
import { useLogin } from '../../LoginContext';

const UpdatePost = () => {
    const navigate = useNavigate(); // 페이지 이동을 위한 훅
    const location = useLocation(); // 현재 위치 정보를 가져오기 위한 훅
    const boardCode = location.state.boardCode; // 전달받은 boardCode
    const postCode = location.state.postCode; // 전달받은 postCode
    const boardList = location.state.boardList; // 전달받은 board 리스트
    const imagePath = location.state.imagePath; // 전달받은 imagePath

    const TITLE_MAX_LENGTH = 50; // 제목 최대 글자수
    const CONTENT_MAX_LENGTH = 4000; // 내용 최대 글자수

    const [post, setPost] = useState({}); // post 상태 초기값을 빈 객체로 설정
    const [title, setTitle] = useState(''); // 제목 상태
    const [content, setContent] = useState(''); // 내용 상태
    const [inputCount, setInputCount] = useState(0); // 입력된 글자수 상태
    const [selectedFile, setSelectedFile] = useState(null); // 선택된 파일 상태
    const [preview, setPreview] = useState(imagePath || null); // 파일 미리보기 URL 상태, 초기값으로 imagePath 설정
    const [showEmojiPicker, setShowEmojiPicker] = useState(false); // 이모티콘 선택기 표시 상태
    const [fileSelected, setFileSelected] = useState(false); // 파일이 선택되었는지 여부
    const { user } = useLogin(); // 로그인 상태를 가져오기 위한 훅

    const fileInputRef = useRef(null); // 파일 입력 요소에 접근하기 위한 ref

    // 게시글 데이터를 가져오는 함수
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
            navigate('/board'); // 게시글을 찾지 못한 경우 게시판 페이지로 이동
        } else {
            setPost(data.result); // 게시글 데이터를 상태로 설정
        }
    };

    // 컴포넌트가 마운트될 때 게시글 데이터를 가져옴
    useEffect(() => {
        fetchPost();
    }, []); // 빈 의존성 배열 추가하여 컴포넌트가 마운트될 때만 실행되도록 설정

    // post 상태가 업데이트될 때 title과 content 상태를 업데이트
    useEffect(() => {
        if (post.title) {
            setTitle(post.title); // 제목 상태 설정
            setContent(post.content); // 내용 상태 설정
        }
    }, [post]); // post 상태가 업데이트될 때 실행

    const submit = e => {
        e.preventDefault();

        const formData = new FormData(); // 새로운 FormData 객체 생성
        formData.append("title", title); // 제목 추가
        formData.append("content", content); // 내용 추가
        formData.append("user_id", user.id); // 사용자 ID 추가
        formData.append("board_code", boardCode); // 게시판 코드 추가
        formData.append("post_code", postCode); // 게시글 코드 추가

        if (fileSelected) {
            formData.append("file", selectedFile); // 파일이 선택된 경우 파일 추가
            formData.append("image_path", imagePath === "" ? "null" : imagePath); // 기존의 이미지 경로 추가
        }
        
        // 서버로 폼 데이터 전송
        fetch(`${process.env.REACT_APP_SERVER_URL}/board/update`, {
            method: 'PUT',
            headers: {
                Authorization: `ADMIN ${process.env.REACT_APP_ADMIN_KEY}`
            },
            body: formData, // 폼 데이터 전송
        })
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    const resBoardCode = data.boardCode;
                    const resPostCode = data.postCode;
                    navigate('/board/detail', { state: { boardCode: resBoardCode, postCode: resPostCode, boardList: boardList } }); // 게시글 상세 페이지로 이동
                } else {
                    navigate('/'); 
                }
            });
    };

    // 입력 핸들러
    const onInputHandler = (e) => {
        const { id, value } = e.target;

        if (id === 'title' && value.length > TITLE_MAX_LENGTH) {
            e.target.value = value.slice(0, TITLE_MAX_LENGTH); // 제목 길이 제한
        } else if (id === 'content' && value.length > CONTENT_MAX_LENGTH) {
            e.target.value = value.slice(0, CONTENT_MAX_LENGTH); // 내용 길이 제한
        }

        if (id === 'title') {
            setTitle(value); // 제목 상태 업데이트
        } else if (id === 'content') {
            setContent(value); // 내용 상태 업데이트
        }

        setInputCount(value.length); // 입력된 글자수 상태 업데이트
    };

    // 파일 선택 핸들러
    const handleFileChange = (e) => {
        const file = e.target.files[0]; // 선택된 파일
        if (file) {
            setSelectedFile(file); // 선택된 파일 상태 업데이트
            setFileSelected(true); // 파일이 선택되었음을 표시
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result); // 파일 미리보기 URL 생성 및 상태 업데이트
            };
            reader.readAsDataURL(file);
        }
    };

    // 이모티콘 선택 핸들러 
    const onEmojiClick = (emojiObject) => {
        const cursorPosition = document.getElementById('content').selectionStart;
        const text = content.slice(0, cursorPosition) + emojiObject.emoji + content.slice(cursorPosition); // 이모티콘을 포함한 새로운 내용 상태 업데이트
        setContent(text);
        setInputCount(text.length); // 새로운 내용의 길이 상태 업데이트
        setShowEmojiPicker(false); // 이모티콘 선택기 숨기기
    };

    return (
        <>
            <Box m={"60px 0"} p={5} shadow="md" borderWidth="1px" borderRadius={"md"} w="800px" mx="auto" minHeight="50vh">
                {/* 페이지 제목 */}
                <Box textAlign="center" mb={5} mt={5}>
                    <Heading as="h3" size="lg">게시글 수정</Heading>
                </Box>
                {/* 폼 시작 */}
                <Form method='POST' action={`${process.env.REACT_APP_SERVER_URL}/board/write`} onSubmit={submit} encType='multipart/form-data'>
                    <VStack spacing={4} align="stretch">
                        {/* 게시판 선택 */}
                        <Select variant='flushed' value={boardCode} disabled>
                            {boardList.map((board, index) => (
                                <option key={index} value={board.boardCode}>
                                    {board.boardName}
                                </option>
                            ))}
                        </Select>
                        {/* 제목 입력 */}
                        <FormControl id="title">
                            <Input id='title' name='reqTitle' minHeight="5vh" type="text" onChange={onInputHandler} maxLength={TITLE_MAX_LENGTH} value={title} />
                            <Box textAlign={"end"}>
                                <span>{title.length}</span>
                                {/* 글자수 표시 */}
                                <span>/{TITLE_MAX_LENGTH} 자</span>
                            </Box>
                        </FormControl>
                        {/* 내용 입력 */}
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
                                {/* 글자수 표시 */}
                                <span>/{CONTENT_MAX_LENGTH} 자</span>
                            </Box>
                        </FormControl>
                        {/* 파일 미리보기 */}
                        {preview && (
                            <Box>
                                <Image src={preview} alt="Selected File" maxHeight="200px" mb={4} />
                            </Box>
                        )}
                        {/* 이모티콘 및 파일 업로드 아이콘 */}
                        <HStack justifyContent="space-between">
                            <HStack>
                                <IconButton
                                    icon={<FaRegSmile />}
                                    aria-label="Emoji"
                                    onClick={() => setShowEmojiPicker(!showEmojiPicker)} // 아이콘 클릭 시 이모티콘 선택기 토글
                                />
                                {showEmojiPicker && (
                                    <Box position="absolute" zIndex="1">
                                        <Picker onEmojiClick={onEmojiClick} />
                                    </Box>
                                )}
                                <IconButton
                                    icon={<BsImage />}
                                    aria-label="Image"
                                    onClick={() => fileInputRef.current.click()} // 아이콘 클릭 시 파일 선택 창 열기
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
