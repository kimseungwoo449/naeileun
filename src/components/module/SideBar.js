// Sidebar.js
import React from 'react';
import { Box, VStack, Text, Link } from '@chakra-ui/react';

const Sidebar = () => {
    return (
        <Box bg="gray.100" w="250px" p="4">
            <VStack align="stretch">
                <Link href="/home">
                    <Text>MY홈</Text>
                </Link>
                <Link href="/resume">
                    <Text>이력서/자소서</Text>
                </Link>
                <Link href="/scraps">
                    <Text>스크랩/관심기업</Text>
                </Link>
                <Link href="/applicable">
                    <Text>지원할 만한 공고</Text>
                </Link>
                <Link href="/offers">
                    <Text>받은 제안</Text>
                </Link>
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
