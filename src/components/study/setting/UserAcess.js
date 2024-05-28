import {React, useState, useEffect} from 'react';
import { Heading, Box, HStack,Card,Image,Stack,CardBody,Text,Icon,Button} from '@chakra-ui/react';
import {useNavigate, useLocation } from 'react-router-dom';
const UserAcess = () =>{
    const navigate = useNavigate();
    const location = useLocation();
    const groupCode = location.state.groupCode;
    const adminCode = location.state.adminCode;

    const fetchAccess = async() =>{
        const response = await fetch(

        )
    }

    return(
        <>
            <Stack mt={'15px'} ml={'45px'}>
                <Text as={'b'} fontSize={'1.2em'} >멤버 승인</Text>
                <HStack>
                    <Text w={'140px'}>유저 아이디</Text>
                    <Text w={'220px'}>가입신청 내용</Text>
                    <Button h={'35px'} fontSize={'0.9em'}>거절</Button>
                    <Button h={'35px'} fontSize={'0.9em'} colorScheme='blue'>승인</Button>
                </HStack>
            </Stack>
        </>
    )
}

export default UserAcess;