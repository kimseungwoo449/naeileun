import {React, useRef, useState, useEffect } from 'react';
import {useNavigate, useLocation,Form} from 'react-router-dom';
import { Box, Button, FormControl, Input, Textarea, VStack, HStack, Heading,Stack,Text} from '@chakra-ui/react';
import { useLogin } from '../../LoginContext';

const CreatePost = () =>{
    const navigate = useNavigate();
    const location = useLocation();
    const groupCode = location.state.groupCode;

    const TITLE_MAX_LENGTH = 50;
    const CONTENT_MAX_LENGTH = 4000; 

    const { user } = useLogin();

    const [title, setTitle] = useState(''); 
    const [content, setContent] = useState('');


    const createPost = async () =>{
        const response = await fetch(
            `${process.env.REACT_APP_SERVER_URL}/study/createPost`, {
                method: 'POST',
                headers: {
                    Authorization: `ADMIN ${process.env.REACT_APP_ADMIN_KEY}`,
                    "Content-Type": "application/json;charset=UTF8"
                },
                body:JSON.stringify({
                    title : title,
                    content : content,
                    userCode : user.userCode,
                    groupCode : groupCode
                })
        })

        const data = await response.json();
        if(data.status === true){
            navigate('/study/board',{state:{groupCode : groupCode}});
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
        
        createPost();
    }

    useEffect(()=>{
        if(!user){
            navigate('/user/login');
        }
    },[])

    // 입력 핸들러
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

        if(title.length > 0){
            const error = document.querySelector('#title-none-error');
            error.style.display = 'none';
        }
        if(content.length > 0){
            const error = document.querySelector('#content-none-error');
            error.style.display = 'none';
        }
    };

    return(
        <>
            <Box m={"60px 0"} p={5} shadow="md" borderWidth="1px" borderRadius={"md"} w="800px" mx="auto" minHeight="50vh">
                <Box textAlign="center" mb={5} mt={5}>
                    <Heading as="h3" size="lg">게시글 작성</Heading>
                </Box>
                <Form method='POST' action={`${process.env.REACT_APP_SERVER_URL}/board/write`} onSubmit={submit} encType='multipart/form-data'>
                    <VStack spacing={4} align="stretch">
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
                        <Stack mt={'10px'}>
                            <Text id='title-none-error' display={'none'} textAlign={"end"} color={'red'} >* 제목은 필수 항목입니다.</Text>
                            <Text id='content-none-error' display={'none'} textAlign={"end"} color={'red'}>* 게시글 내용은 필수 항목입니다.</Text>
                        </Stack>
                        <HStack ml={'auto'}>
                            <Button type='submit' colorScheme="gray" size="md" >등록</Button>
                        </HStack>
                    </VStack>
                </Form>
            </Box>
        </>
    )
}

export default CreatePost