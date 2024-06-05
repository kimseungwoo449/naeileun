import {React, useState, useEffect} from 'react';
import { Heading, Box, HStack,Card,Image,Stack,CardBody,Text,Icon,Button} from '@chakra-ui/react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useLogin } from '../LoginContext';

const StudySetting = () =>{
    
    const navigate = useNavigate();
    const location = useLocation(); // 2번 라인

    const {user} = useLogin();

    if(location.state === null){
        navigate('/study/board');
    }

    const groupCode = location.state.groupCode;
    const adminCode = location.state.adminCode;

    if(user.userCode !== adminCode || groupCode === null)
        navigate('/study');
    else if(!user)
        navigate('/user/login');

    const move = (e) =>{
        const command = e.target.id;
        if(command === 'access')
            navigate('/study/setting/access',{state : {groupCode : groupCode , adminCode : adminCode}});
        else if(command === 'delete')
            navigate('/study/setting/delete',{state : {groupCode : groupCode , adminCode : adminCode}});
        else if(command === 'study')
            navigate('/study/setting/study',{state : {groupCode : groupCode , adminCode : adminCode}});
    }
    return(
        <>
            <Box minH={'75vh'} maxW={'900px'} ml={'15%'} mt={'50px'}>
                <HStack alignItems={'flex-start'}>
                    <Stack minW={'160px'}>
                        <Text as={'b'} fontSize={'1.2em'} fontStyle={''}>스터디그룹 관리</Text>
                        <Text id='access' mt={'10px'} _hover={{cursor : "pointer"}} onClick={move}>멤버승인</Text>
                        <Text id='delete' mt={'10px'} _hover={{cursor : "pointer"}} onClick={move}>멤버관리</Text>
                        <Text id='study' mt={'10px'} _hover={{cursor : "pointer"}} onClick={move}>스터디 관리</Text>
                    </Stack>
                    <Stack mt={'20px'}>
                        <Outlet />
                    </Stack>
                </HStack>
            </Box>
        </>
    );
}

export default StudySetting;