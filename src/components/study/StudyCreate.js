import {React, userEffect} from 'react';
import { Radio, RadioGroup } from '@chakra-ui/react'
import {Box, Stack, HStack,Input,Text,Textarea,Button} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';


const StudyCreate = () =>{
    const navigate = useNavigate();




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
        if(command === "create-study"){
            navigate('/study/create');
            return;
        }
    }


    return(
        <>
        <Box h={'75vh'} w={'600px'} m={"auto"}  mt={"100px"}>
            <form method="POST" action="/study/create" >
                <HStack>
                    <Text as="h2" fontSize={"2xl"} margin={"auto"} mb={"30px"}>스터디 생성하기</Text>
                </HStack>
                
                <HStack>
                    <Input w={"400px"} m={"auto"} placeholder="스터디 그룹 이름" mb={"20px"}></Input>
                </HStack>
                <HStack>
                    <Textarea h={"250px"} w={"400px"} m={"auto"} placeholder="스터디 그룹 설명" mb={"30px"}></Textarea>
                </HStack>
                <RadioGroup defaultValue='2'>
                    <Stack spacing={5} direction='row' ml={'100px'}>
                        <Text>그룹 형식</Text>
                        <Radio colorScheme='blue' value='public' mr={'10px'} >
                        Public
                        </Radio>
                        <Radio colorScheme='red' value='private'>
                        Private
                        </Radio>
                        
                    </Stack>
                </RadioGroup>
                <RadioGroup defaultValue='2'>
                    <Stack spacing={5} direction='row' ml={'100px'}>
                        <Text>가입 방식</Text>
                        <Radio colorScheme='blue' value='auto' >
                        자동승인
                        </Radio>
                        <Radio colorScheme='red' value='check'>
                        승인 확인
                        </Radio>
                    </Stack>
                </RadioGroup>
                <HStack justify={'right'} mt={'20px'} mr={'100px'}>
                    <Button onClick={movePage} w={'60px'} id="cancle">취소</Button>
                    <Button onClick={submit} w={'60px'} colorScheme='blue'>생성</Button>
                </HStack>
            </form>
        </Box>
        </>
    )
}

export default StudyCreate;