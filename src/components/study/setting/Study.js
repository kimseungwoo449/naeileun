import {React, useState, useEffect} from 'react';
import { Heading, Box, HStack,Card,Image,Stack,CardBody,Text,Icon,Button} from '@chakra-ui/react';
import {useNavigate, useLocation } from 'react-router-dom';
const Study= () =>{
    const navigate = useNavigate();
    const location = useLocation();
    const groupCode = location.state.groupCode;
    const adminCode = location.state.adminCode;

    const fetchDelete = async() =>{
        console.log(groupCode);

        const req ={
            "group_code" : groupCode
        }

        const response = await fetch(
            `${process.env.REACT_APP_SERVER_URL}/study/delete`,
            {
                method : "POST",
                headers: {
                    Authorization: `ADMIN ${process.env.REACT_APP_ADMIN_KEY}`,
                    "Content-Type": "application/json;charset=UTF8"
                },
                body:JSON.stringify(req)
            }
        )

        const data = await response.json();

        if(data.state === true){
            navigate('/study');
        }else{
            alert("스터디 삭제 실패");
        }
        
    }

    const studyDelete=()=>{
        fetchDelete();
    }
    return(
        <>
            <Stack mt={'15px'} ml={'45px'}>
                <Text as={'b'} fontSize={'1.2em'} >스터디 관리</Text>ㄴ
                <HStack>
                    <Text w={'140px'}>유저 아이디</Text>
                    <Text w={'220px'}>가입신청 내용</Text>
                    <Button h={'35px'} fontSize={'0.9em'} colorScheme='red' onClick={studyDelete}>스터디 삭제</Button>
                    <Button h={'35px'} fontSize={'0.9em'} colorScheme='blue'>승인</Button>
                </HStack>
            </Stack>
        </>
    )
}

export default Study;