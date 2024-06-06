import {React, useState,useEffect } from 'react';
import { Radio, RadioGroup } from '@chakra-ui/react'
import {Box, Stack, HStack,Input,Text,Textarea,Button} from '@chakra-ui/react';
import { Form,useNavigate} from 'react-router-dom';
import { useLogin } from '../LoginContext';

const StudyCreate = () =>{
    const navigate = useNavigate();

    const [isPublic,setIsPublic] = useState(true);
    const [access, setAccess] = useState(true);
    const {user} = useLogin();

    const [name,setName] = useState('');
    const [decription,setDecription] = useState('');
    const NAME_MAX_LENGTH = 20;
    const CONTENT_MAX_LENGTH = 500;

    const createStudy = async() =>{
        const req = {
                "group_name" : name,
                "is_public" : isPublic,
                "auto_member_access" : access,
                "decription" : decription,
                "user_code" : user.userCode
        };

        const response = await fetch(
            `${process.env.REACT_APP_SERVER_URL}/study/createStudy`, {
                method: 'POST',
                headers: {
                    Authorization: `ADMIN ${process.env.REACT_APP_ADMIN_KEY}`,
                    "Content-Type": "application/json;charset=UTF8"
                },
                body:JSON.stringify(req)
        });

        const data = await response.json();

        if(data.status)
            navigate('/study');
    }


    const movePage = (e) =>{
        const command = e.target.id;
        if(command === "cancle"){
            navigate('/study');
            return;
        }
    }

    const onInputHandler =(e) =>{
        const content = e.target.value;
        const command = e.target.id;

        if(command === "name" && content.length <= NAME_MAX_LENGTH){
            setName(content);
        }else if(command === "decription" && content.length <= CONTENT_MAX_LENGTH){
            setDecription(content);
        }
    }

    const submit = (e) =>{
        e.preventDefault();
        const command = e.target.id;
        if(command !== "create-study"){
            return;
        }

        const name = document.querySelector('#name').value;
        const dec = document.querySelector('#decription').value;

        let isValid = true;

        if(name===""){
            const error = document.querySelector('#name-none-error');
            error.style.display = 'block';
            isValid = false;
        }else if(name.length > 20){
            const error = document.querySelector('#name-long-error');
            error.style.display = 'block';
            isValid = false;
        }else if(dec.length > 500){
            const error = document.querySelector('#dec-long-error');
            error.style.display = 'block';
            isValid = false;
        }

        if(!isValid)
            return;   

        createStudy();
    }

    useEffect(()=>{
        if(!user){
            navigate('/user/login');
        }
    },[])

    return(
        <>
        <Box h={'75vh'} w={'600px'} m={"auto"}  mt={"50px"} mb={'20px'}>
            <Form method="POST" action="/study/create" >
                <HStack>
                    <Text as="h2" fontSize={"2xl"} margin={"auto"} mb={"30px"}>스터디 생성하기</Text>
                </HStack>
                
                <Stack>
                    <Input id='name' onChange={onInputHandler} name='name' w={"400px"} m={"auto"} placeholder="스터디 그룹명"></Input>
                    <Box textAlign={"end"} mr={'100px'} mb={"5px"} >
                        <span>{name.length}</span>
                        <span>/{NAME_MAX_LENGTH} 자</span>
                    </Box>
                </Stack> 
                
                <Stack>
                    <Textarea id='decription' onChange={onInputHandler} h={"250px"} w={"400px"} m={"auto"} placeholder="스터디 그룹 설명" ></Textarea>
                    <Box textAlign={"end"} mr={'100px'} mb={"20px"}>
                        <span>{decription.length}</span>
                        <span>/{CONTENT_MAX_LENGTH} 자</span>
                    </Box>
                </Stack>
                <RadioGroup id='isPublic' onChange={setIsPublic} defaultValue='true'>
                    <Stack spacing={5} direction='row' ml={'100px'}>
                        <Text>그룹 형식</Text>
                        <Radio name='isPublic' colorScheme='blue' value='true' mr={'11px'}>
                        Public
                        </Radio>
                        <Radio name='isPublic' colorScheme='red' value='false'>
                        Private
                        </Radio>
                        
                    </Stack>
                </RadioGroup>
                <RadioGroup id='auto-user-access' onChange={setAccess} defaultValue='true'>
                    <Stack spacing={5} direction='row' ml={'100px'}>
                        <Text>가입 방식</Text>
                        <Radio name='access' colorScheme='blue' value='true'>
                        자동승인
                        </Radio>
                        <Radio name='access' colorScheme='red' value='false'>
                        승인 확인
                        </Radio>
                    </Stack>
                </RadioGroup>
                <Stack ml={'100px'} mt={'10px'}>
                    <Text id='name-none-error' display={'none'} color={'red'} >* 스터디명은 필수 항목입니다.</Text>
                    <Text id='name-long-error' display={'none'} color={'red'}>* 스터디명의 최대 길이는 20자입니다.</Text>
                    <Text id='dec-long-error' display={'none'} color={'red'}>* 스터디명 설명의 최대 길이는 500자입니다.</Text>
                </Stack>
                <HStack justify={'right'} mt={'20px'} mr={'100px'}>
                    <Button onClick={movePage} w={'60px'} id="cancle">취소</Button>
                    <Button onClick={submit} w={'60px'} colorScheme='blue' id='create-study'>생성</Button>
                </HStack>
            </Form>
        </Box>
        </>
    )
}

export default StudyCreate;