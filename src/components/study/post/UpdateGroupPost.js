import {React, useRef, useState, useEffect } from 'react';
import {useNavigate, useLocation,Form} from 'react-router-dom';
import { Box, Button, FormControl, Input, Textarea, VStack, HStack, Heading,Stack,Text} from '@chakra-ui/react';
import { useLogin } from '../../LoginContext';

const UpdateGroupPost = () =>{
    const navigate = useNavigate();
    const location = useLocation(); // 2번 라인
    const groupCode = location.state.groupCode;
    const postCode = location.state.postCode;

    const TITLE_MAX_LENGTH = 50; // 제목 최대 글자수
    const CONTENT_MAX_LENGTH = 4000; // 내용 최대 글자수

    const { user } = useLogin();

    const [post, setPost] = useState({}); // post 상태 초기값을 빈 객체로 설정
    const [title, setTitle] = useState(''); // 제목 상태 추가
    const [content, setContent] = useState('');

    const fetchPost = async () => {
        console.log(postCode);
        const url = `${process.env.REACT_APP_SERVER_URL}/study/post?post_code=${postCode}`;
        const response = await fetch(
            url,
            {
                method: "GET",
                headers: {
                    Authorization: `ADMIN ${process.env.REACT_APP_ADMIN_KEY}`,
                    "Content-Type": "application/json;charset=UTF8"
                }
            }
        );

        const data = await response.json();
        console.log(data)

        if(data.status){
            setTitle(data.result.title);
            setContent(data.result.content);

            const titleInput = document.querySelector('.title');
            titleInput.value = data.result.title;
        }
    }

    const updatePost = async () =>{
        const req={
            "group_code" : groupCode,
            "user_code" : user.userCode,
            "title" : title,
            "content" : content,
            "post" : post
        }

        const response = await fetch(
            `${process.env.REACT_APP_SERVER_URL}/study/updatePost`, {
                method: 'POST',
                headers: {
                    Authorization: `ADMIN ${process.env.REACT_APP_ADMIN_KEY}`,
                    "Content-Type": "application/json;charset=UTF8"
                },
                body:JSON.stringify(req)
        })

        const data = await response.json();
        if(data.status === true){
            navigate('/study/post',{state:{groupCode : groupCode,postCode : postCode}});
        }
    }

    const submit = (e) =>{
        e.preventDefault();

        let isValid = true;
        if(title.length === 0){
            const error = document.querySelector('#title-none-error');
            error.style.display = 'block';
            isValid = false;
        }
        if(content.length === 0){
            const error = document.querySelector('#content-none-error');
            error.style.display = 'block';
            isValid = false;
        }

        if(isValid === false){
            return;
        }
        
        updatePost();
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

        if(title.length > 0){
            const error = document.querySelector('#title-none-error');
            error.style.display = 'none';
        }
        if(content.length > 0){
            const error = document.querySelector('#content-none-error');
            error.style.display = 'none';
        }
    };

    const movePage = (e) =>{
        const command = e.target.name;
        if(command === "back"){
            navigate('/study/post',{state : {groupCode : groupCode,postCode: postCode}});
        }
    }

    // 컴포넌트가 마운트될 때 게시글 데이터를 가져옴
    useEffect(()=>{
        if(!user){
            navigate('/user/login');
        }else{
            fetchPost();
        }
    },[navigate])

    // post 상태가 업데이트될 때 title과 content 상태를 업데이트
    useEffect(() => {
        if (post.title) {
            setTitle(post.title); // 제목 상태 설정
            setContent(post.content); // 내용 상태 설정
        }
    }, [post]); // post 상태가 업데이트될 때 실행


    return(
        <>
            <Box m={"60px 0"} p={5} shadow="md" borderWidth="1px" borderRadius={"md"} w="800px" mx="auto" minHeight="50vh">
                {/* 페이지 제목 */}
                <Box textAlign="center" mb={5} mt={5}>
                    <Heading as="h3" size="lg">게시글 수정</Heading>
                </Box>
                {/* 폼 시작 */}
                <Form method='POST' action={`${process.env.REACT_APP_SERVER_URL}/board/write`} onSubmit={submit}>
                    <VStack spacing={4} align="stretch">
                        {/* 제목 입력 */}
                        <FormControl id="title">
                            <Input id='title' className='title' name='reqTitle' minHeight="5vh" type="text" placeholder="제목" onChange={onInputHandler} maxLength={TITLE_MAX_LENGTH} />
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
                        <Stack mt={'10px'}>
                            <Text id='title-none-error' display={'none'} textAlign={"end"} color={'red'} >* 제목은 필수 항목입니다.</Text>
                            <Text id='content-none-error' display={'none'} textAlign={"end"} color={'red'}>* 게시글 내용은 필수 항목입니다.</Text>
                        </Stack>
                        <HStack ml={'auto'}>
                            <Button onClick={movePage} name='back' colorScheme="red" size="md" >취소</Button>
                            <Button type='submit' colorScheme="gray" size="md" >수정</Button>
                        </HStack>
                    </VStack>
                </Form>
            </Box>
        </>
    )
}

export default UpdateGroupPost;