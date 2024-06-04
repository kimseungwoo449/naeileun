import React, { useState, useRef } from 'react';
import { Box, Button, FormControl, Input, Textarea, VStack, HStack, IconButton, Heading, Select, Image, Alert, AlertIcon } from '@chakra-ui/react';
import { FaRegSmile } from 'react-icons/fa';
import { BsImage } from 'react-icons/bs';
import { Form, useLocation, useNavigate } from 'react-router-dom';
import Picker from 'emoji-picker-react';
import { useLogin } from '../../LoginContext';

const CreatePost = () => {
    const navigate = useNavigate(); // 페이지 이동을 위한 훅
    const location = useLocation(); // 현재 위치 정보를 가져오기 위한 훅
    const boardCode = parseInt(location.state.boardCode); // 전달받은 boardCode
    const boardList = location.state.boardList; // 전달받은 board 리스트

    const TITLE_MAX_LENGTH = 50; // 제목 최대 글자수
    const CONTENT_MAX_LENGTH = 4000; // 내용 최대 글자수
    const FILE_SIZE_MAX_LIMIT = 5 * 1024 * 1024;  // 5MB

    const { user } = useLogin();

    const [title, setTitle] = useState(''); // 제목 상태 추가
    const [content, setContent] = useState('');
    const [inputCount, setInputCount] = useState(0); // 입력된 글자수 상태 관리
    const [selectedFile, setSelectedFile] = useState(null); // 선택된 파일 상태 관리
    const [preview, setPreview] = useState(null); // 파일 미리보기 URL 상태 관리
    const [showEmojiPicker, setShowEmojiPicker] = useState(false); // 이모티콘 선택기 표시 상태 관리
    const [selectBoardCode, setselectBoardCode] = useState(boardCode); // 선택된 게시판 코드 상태 관리
    const [fileError, setFileError] = useState(false);

    const fileInputRef = useRef(null); // 파일 입력 요소에 접근하기 위한 ref

    // 폼 제출 핸들러
    const submit = e => {
        e.preventDefault(); // 기본 폼 제출 동작 방지

        const formData = new FormData(); // 새로운 FormData 객체 생성
        formData.append("title", title); // 제목 추가
        formData.append("content", content); // 내용 추가
        formData.append("user_id", user.id); // 사용자 ID 추가
        formData.append("board_code", selectBoardCode);
        console.log("boardCode : " + selectBoardCode);
        // formData.append("board_code", boardCode); // 게시판 코드 추가
        if (selectedFile) {
            formData.append("file", selectedFile); // 선택된 파일이 있을 경우 파일 추가
        }

        console.log("req : " + formData);
        
        // 서버로 폼 데이터 전송
        fetch(`${process.env.REACT_APP_SERVER_URL}/board/write`, {
            method: 'POST',
            headers: {
                Authorization: `ADMIN ${process.env.REACT_APP_ADMIN_KEY}`
            },
            body: formData, // 폼 데이터 전송
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);

                if (data.status) {
                    const resBoardCode = data.boardCode;
                    const postCode = data.postCode;
                    navigate('/board/detail', { state: { boardCode: resBoardCode, postCode: postCode, boardList: boardList } }); // 게시글 상세 페이지로 이동
                } else {
                    navigate('/'); 
                }
            });
    }

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
            setContent(value);
        }

        setInputCount(value.length); // 입력된 글자수 상태 업데이트
    };

    // 파일 선택 핸들러
    const handleFileChange = (e) => {
        const file = e.target.files[0]; // 선택된 파일
        if (file) {
            if (file.size > FILE_SIZE_MAX_LIMIT) {
                <Alert status='error'>
                    <AlertIcon />
                    파일 크기는 5MB를 초과할 수 없습니다.
                </Alert> // 경고 메시지 표시
                // alert("파일 크기는 5MB를 초과할 수 없습니다."); 
                setFileError(true); // 파일 크기 초과 경고 메시지 표시
                setSelectedFile(null); // 선택된 파일 초기화
                setPreview(null); // 파일 미리보기 초기화
            } else {
                setFileError(false); // 파일 크기 초과 경고 메시지 숨김
                setSelectedFile(file); // 선택된 파일 상태 업데이트
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreview(reader.result); // 파일 미리보기 URL 생성 및 상태 업데이트
                };
                reader.readAsDataURL(file);
            }
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

    // 게시판 선택 핸들러
    const handleBoardChange = (e) => {
        setselectBoardCode(parseInt(e.target.value)); // 선택된 게시판 코드 상태 업데이트
    };

    return (
        <>
            <Box m={"60px 0"} p={5} shadow="md" borderWidth="1px" borderRadius={"md"} w="800px" mx="auto" minHeight="50vh">
                {/* 페이지 제목 */}
                <Box textAlign="center" mb={5} mt={5}>
                    <Heading as="h3" size="lg">게시글 작성</Heading>
                </Box>
                {/* 폼 시작 */}
                <Form method='POST' action={`${process.env.REACT_APP_SERVER_URL}/board/write`} onSubmit={submit} encType='multipart/form-data'>
                    <VStack spacing={4} align="stretch">
                        {/* 게시판 선택 */}
                        <Select variant='flushed' onChange={handleBoardChange}>
                            <option value='option' disabled>게시판 선택</option>
                            {boardList.map((board, index) => (
                                <option id={"boardCode"} key={index} value={board.boardCode} selected={board.boardCode === boardCode}>{board.boardName}</option>
                            ))}
                        </Select>
                        {/* 제목 입력 */}
                        <FormControl id="title">
                            <Input id='title' name='reqTitle' minHeight="5vh" type="text" placeholder="제목" onChange={onInputHandler} maxLength={TITLE_MAX_LENGTH} />
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
                                placeholder="내용"
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
                                    onClick={() => fileInputRef.current.click()} // 아이콘 클릭 시 파일 입력 창 열기
                                />
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                    accept="image/*" // 이미지 파일만 선택 가능
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
