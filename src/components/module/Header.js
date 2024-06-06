import { Box, Button, Flex, Icon, Img, Text, HStack } from '@chakra-ui/react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLogin } from '../LoginContext';
import { IoMdMailOpen } from "react-icons/io";

const Header = () => {
    const { user } = useLogin();
    const navigate = useNavigate();

    const movePage = (e) => {
        const command = e.target.id;

        if (command === 'logo-img')
            navigate('/');
        else if (command === 'home')
            navigate('/');
        else if (command === 'board')
            navigate('/board');
        else if (command === 'mypage')
            navigate('/user/info');
        else if (command === 'study-group')
            navigate('/study');
        else if (command === 'login')
            navigate('/user/login');
        else if (command === 'join')
            navigate('/user/join');
        else if (command === 'logout')
            navigate('/user/logout');
        else if (command === 'myhome')
            navigate('/user/home');
    }

    return (
        <Box w='100%' bg='white'  m={'20px auto 20px auto'}>
            <Flex w='70%' mx='auto' justifyContent='space-between' alignItems='center'>
                <Box id='logo' display='flex' alignItems='center'>
                    <Img id='logo-img' src='https://i.ibb.co/Zf814Wd/logo.png' _hover={{ cursor: 'pointer' }} onClick={movePage} />
                </Box>
                <Flex justifyContent='flex-end' alignItems='center' w='100%'>
                    <HStack spacing={8} fontSize='1.3em' mr={10}>
                        <Text id='home' _hover={{ cursor: 'pointer', color: 'gray.600' }} onClick={movePage}>홈</Text>
                        <Text id='board' _hover={{ cursor: 'pointer', color: 'gray.600' }} onClick={movePage}>게시판</Text>
                        <Text id='study-group' _hover={{ cursor: 'pointer', color: 'gray.600' }} onClick={movePage}>스터디그룹</Text>
                    </HStack>
                    <HStack spacing={4}>
                        {user ? (
                            <>
                                <Link to='/message/myMessageBox'>
                                    <Icon w={6} h={6} as={IoMdMailOpen} />
                                </Link>
                                <Button id='myhome' colorScheme='gray' variant='outline' borderRadius='50px' onClick={movePage}>마이페이지</Button>
                                <Button id='logout' colorScheme='gray' variant='outline' borderRadius='50px' onClick={movePage}>로그아웃</Button>
                            </>
                        ) : (
                            <>
                                <Button id='login' colorScheme='gray' variant='outline' borderRadius='50px' onClick={movePage}>로그인</Button>
                                <Button id='join' colorScheme='gray' variant='outline' borderRadius='50px' onClick={movePage}>회원가입</Button>
                            </>
                        )}
                    </HStack>
                </Flex>
            </Flex>
        </Box>
    );
};

export default Header;
