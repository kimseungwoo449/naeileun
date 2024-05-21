import { Box, Button, Flex, Grid, Img, Text } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const movePage = (e)=>{
        const command = e.target.id;

        if(command==='logo-img')
            navigate('/');
        else if(command==='home')
            navigate('/');
        else if(command==='job-posting')
            navigate('/jobPosting');
        else if(command==='board')
            navigate('/board/view');
        else if(command==='notice')
            navigate('/notice');
        else if(command==='mypage')
            navigate('/users/mypage');
        else if(command==='study-group')
            navigate('/study');
        else if(command==='login')
            navigate('/users/login');
        else if(command==='join')
            navigate('/users/join');
    }

    return (
        <>
            <Grid id='header' w={'70%'} m={'auto'} gridTemplateColumns={'20% 60% 20%'}>
                <Box id='logo' alignItems={'center'} mr={'30px'}>
                    <Img id='logo-img' src='https://i.ibb.co/Zf814Wd/logo.png' _hover={{
                        cursor : 'pointer'
                    }} onClick={movePage} />
                </Box>
                <Box id='navs' display={'flex'} justifyContent='space-around' alignItems={'center'} fontSize={'auto'}>
                    <Text id='home' _hover={{
                        cursor : 'pointer'
                    }} onClick={movePage}>홈</Text>
                    <Text id='job-posting' _hover={{
                        cursor : 'pointer'
                    }} onClick={movePage}>채용공고</Text>
                    <Text id='board' _hover={{
                        cursor : 'pointer'
                    }} onClick={movePage}>게시판</Text>
                    <Text id='notice' _hover={{
                        cursor : 'pointer'
                    }} onClick={movePage}>공지사항</Text>
                    <Text id='mypage' _hover={{
                        cursor : 'pointer'
                    }} onClick={movePage}>마이페이지</Text>
                    <Text id='study-group' _hover={{
                        cursor : 'pointer'
                    }} onClick={movePage}>스터디그룹</Text>
                </Box>
                <Box id='buttons' display={'flex'} alignItems={'center'} justifyContent='space-around' >
                    <Button id='login' colorScheme='gray' variant='outline' borderRadius={'50px'} onClick={movePage}>로그인</Button>
                    <Button id='join' colorScheme='gray' variant='outline' borderRadius={'50px'} onClick={movePage}>회원가입</Button>
                </Box>
            </Grid>
        </>
    );
};

export default Header;