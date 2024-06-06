import {React, useState, useEffect } from 'react';
import {useNavigate, useLocation,Form} from 'react-router-dom';
import { Box, Button, FormControl, Input, Textarea, VStack, HStack, Heading,Stack,Text} from '@chakra-ui/react';
import { useLogin } from '../../LoginContext';

const UpdateGroupPost = () =>{
    const navigate = useNavigate();

    const location = useLocation(); 
    const groupCode = location.state.groupCode;
    const postCode = location.state.postCode;

    const TITLE_MAX_LENGTH = 50; 
    const CONTENT_MAX_LENGTH = 4000;

    const { user } = useLogin();

    const [post, setPost] = useState({}); 
    const [title, setTitle] = useState(''); 
    const [content, setContent] = useState('');

    const fetchPost = async () => {
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

        if(data.status){
            setPost(data.result);
        }
    }

    const updatePost = async () =>{
        const req ={
            title : title,
            content : content,
            postCode : postCode
        }

        fetch(
            `${process.env.REACT_APP_SERVER_URL}/study/updatePost`, {
                method: 'PUT',
                headers: {
                    Authorization: `ADMIN ${process.env.REACT_APP_ADMIN_KEY}`,
                    "Content-Type": "application/json;charset=UTF8"
                },
                body:JSON.stringify(req)
        })
        .then(response => response.json())
        .then(data => {
            if (data.status) {
                navigate('/study/post',{state:{groupCode : groupCode,postCode : postCode}});
            }
        });
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

    const movePage = (e) =>{
        const command = e.target.name;
        if(command === "back"){
            navigate('/study/post',{state : {groupCode : groupCode,postCode: postCode}});
        }
    }

    useEffect(()=>{
        if(!user){
            navigate('/user/login');
        }else{
            fetchPost();
        }
    },[])

    useEffect(() => {
        if (post.title) {
            setTitle(post.title);
            setContent(post.content); 
        }
    }, [post]); 


    return(
        <>
            <Box m={"60px 0"} p={5} shadow="md" borderWidth="1px" borderRadius={"md"} w="800px" mx="auto" minHeight="50vh">
                <Box textAlign="center" mb={5} mt={5}>
                    <Heading as="h3" size="lg">게시글 수정</Heading>
                </Box>
                <Form method='POST' action={`${process.env.REACT_APP_SERVER_URL}/study/updatePost`} onSubmit={submit}>
                    <VStack spacing={4} align="stretch">
                        <FormControl id="title">
                            <Input id='title' className='title' name='reqTitle' minHeight="5vh" type="text" placeholder="제목" value={title} onChange={onInputHandler} maxLength={TITLE_MAX_LENGTH} />
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