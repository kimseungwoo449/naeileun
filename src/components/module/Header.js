import { Box, Button, Flex, Grid, Icon, Img, Text } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import  { useLogin } from '../LoginContext';
import { IoMdMailOpen } from "react-icons/io";
const Header = () => {
    const {user} = useLogin();

    const navigate = useNavigate();
   
    const movePage = (e)=>{
        const command = e.target.id;

        if(command==='logo-img')
            navigate('/');
        else if(command==='home')
            navigate('/');
        // else if(command==='job-posting')
        //     navigate('/jobPosting');
        else if(command==='board')
            navigate('/board');
        // else if(command==='notice')
        //     navigate('/notice');
        else if(command==='mypage')
            navigate('/user/info');
        else if(command==='study-group')
            navigate('/study');
        else if(command==='login')
            navigate('/user/login');
        else if(command==='join')
            navigate('/user/join');
        else if(command==='logout')
            navigate('/user/logout')
        else if(command==='myhome')
            navigate('/user/home');
    }

    return (
        <>
            <Grid id='header' w={'70%'} m={'20px auto 50px auto'} gridTemplateColumns={'20% 60% 20%'}>
                <Box id='logo' display={'flex'} alignItems={'center'} mr={'30px'}>
                    <Img id='logo-img' src='https://i.ibb.co/Zf814Wd/logo.png' _hover={{
                        cursor : 'pointer'
                    }} onClick={movePage} />
                </Box>
                <Box id='navs' display={'flex'} justifyContent='space-around' alignItems={'center'} fontSize={'auto'}>
                    <Text id='home' _hover={{
                        cursor : 'pointer'
                    }} onClick={movePage}>홈</Text>
                    
                    <Text id='board' _hover={{
                        cursor : 'pointer'
                    }} onClick={movePage}>게시판</Text>
                    
                    {/* <Text id='mypage' _hover={{
                        cursor : 'pointer'
                    }} onClick={movePage}>마이페이지</Text> */}
                    <Text id='study-group' _hover={{
                        cursor : 'pointer'
                    }} onClick={movePage}>스터디그룹</Text>
                </Box>
                <Box id='buttons' display={'flex'} alignItems={'center'} justifyContent='space-around' >
                    {user ? (
                        // 로그인 상태일 때 보여줄 버튼들
                        <>
                            <Link to='/message/myMessageBox'><Icon w={8} h={8} as={IoMdMailOpen} mr='20px' /></Link>
                            <Button id='myhome' colorScheme='gray' variant='outline' borderRadius={'50px'} onClick={movePage}>마이페이지</Button>
                            <Button id='logout' colorScheme='gray' variant='outline' borderRadius={'50px'} onClick={movePage}>로그아웃</Button>
                        </>
                    ) : (
                        // 로그아웃 상태일 때 보여줄 버튼들
                        <>
                            <Button id='login' colorScheme='gray' variant='outline' borderRadius={'50px'} onClick={movePage}>로그인</Button>
                            <Button id='join' colorScheme='gray' variant='outline' borderRadius={'50px'} onClick={movePage}>회원가입</Button>
                        </>
                    )}
                </Box>
            </Grid>
        </>
    );
};

export default Header;

{/* <Text id='job-posting' _hover={{
                        cursor : 'pointer'
                    }} onClick={movePage}>채용공고</Text>
                    <Text id='notice' _hover={{
                        cursor : 'pointer'
                    }} onClick={movePage}>공지사항</Text> */}