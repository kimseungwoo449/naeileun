// Sidebar.js
import React from 'react';
import { Box, VStack, Text, Link } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();
    const movePage = (e) => {
        const command = e.target.id;
        if (command === 'resume')
            navigate('/user/resume');
        else if (command === 'study')
            navigate('/user/study');
        else if (command === 'home')
            navigate('/user/home');
    }
    return (
        <Box bg="gray.100" w="250px" p="4">
            <VStack align="stretch">

                <Text id='home' _hover={{
                    cursor: 'pointer'
                }} onClick={movePage}>MY홈</Text>
                <Text id='home' _hover={{
                    cursor: 'pointer'
                }} onClick={movePage}>스크랩/관심기업</Text>

                <Text id='resume' _hover={{
                    cursor: 'pointer'
                }} onClick={movePage}>나의 이력서</Text>
                <Text id='study' _hover={{
                    cursor: 'pointer'
                }} onClick={movePage}>나의 스터디</Text>

                <Link href="/applications">
                    <Text>지원 내역</Text>
                </Link>
                <Link href="/companies">
                    <Text>기업 알아보기</Text>
                </Link>
                <Link href="/tests">
                    <Text>진단/검사</Text>
                </Link>
                <Link href="/interview">
                    <Text>면접현황</Text>
                </Link>
                <Link href="/career">
                    <Text>커리어 마일리지</Text>
                </Link>
            </VStack>
        </Box>
    );
};

export default Sidebar;
