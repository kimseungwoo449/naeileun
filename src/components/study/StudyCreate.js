import {React, useState} from 'react';
import { Radio, RadioGroup } from '@chakra-ui/react'
import {Box, Stack, HStack,Input,Text,Textarea,Button} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const StudyCreate = () =>{
    const navigate = useNavigate();

    const [isPublic,setIsPublic] = useState(true);
    const [access, setAccess] = useState(true);

    const createStudy = async() =>{

        const name = document.querySelector('#name').value;
        const dec = document.querySelector('#decription').value;

        const req = {
                "group_name" : name,
                "is_public" : isPublic,
                "auto_member_access" : access,
                "decription" : dec
        };

        console.log(req);

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
        console.log(data);

        if(data.state === true)
            navigate('/study');
    }


    const movePage = (e) =>{
        const command = e.target.id;
        console.log(command);
        if(command === "cancle"){
            navigate('/study');
            return;
        }
    }

    const submit = (e) =>{
        e.preventDefault();
        const command = e.target.id;
        console.log(command);
        if(command !== "create-study"){
            return;
        }

        const name = document.querySelector('#name').value;
        const dec = document.querySelector('#decription').value;

        let isValid = true;

        console.log(name);
        console.log(dec);
        console.log(isPublic);
        console.log(access);

        if(name===""){
            const error = document.querySelector('#name-none-error');
            error.style.display = 'block';
            isValid = false;
        }else if(name.length > 20){
            const error = document.querySelector('#name-long-error');
            error.style.display = 'block';
            isValid = false;
        }else if(dec.length > 20){
            const error = document.querySelector('#dec-long-error');
            error.style.display = 'block';
            isValid = false;
        }

        if(isValid === false)
            return;   
        
        

        createStudy();
    }


    return(
        <>
        <Box h={'75vh'} w={'600px'} m={"auto"}  mt={"50px"} mb={'20px'}>
            <form method="POST" action="/study/create" >
                <HStack>
                    <Text as="h2" fontSize={"2xl"} margin={"auto"} mb={"30px"}>스터디 생성하기</Text>
                </HStack>
                
                <HStack>
                    <Input id='name' name='name' w={"400px"} m={"auto"} placeholder="스터디 그룹명" mb={"20px"} ></Input>
                </HStack> 
                <HStack>
                    <Textarea id='decription' h={"250px"} w={"400px"} m={"auto"} placeholder="스터디 그룹 설명" mb={"30px"}></Textarea>
                </HStack>
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
            </form>
        </Box>
        </>
    )
}

export default StudyCreate;