// // Sidebar.js
// import React from 'react';
// import { Box, VStack, Text, Link } from '@chakra-ui/react';
// import { useNavigate } from 'react-router-dom';

// const Sidebar = () => {
//     const navigate = useNavigate();
//     const movePage = (e) => {
//         const command = e.target.id;
//         if (command === 'resume')
//             navigate('/user/resume');
//         else if (command === 'study')
//             navigate('/user/study');
//         else if (command === 'home')
//             navigate('/user/home');
//     }
//     return (
//         <Box bg="gray.100" w="250px" p="4">
//             <VStack align="stretch">

//                 <Text id='home' _hover={{
//                     cursor: 'pointer'
//                 }} onClick={movePage}>MY홈</Text>
//                 <Text id='home' _hover={{
//                     cursor: 'pointer'
//                 }} onClick={movePage}>스크랩/관심기업</Text>

//                 <Text id='resume' _hover={{
//                     cursor: 'pointer'
//                 }} onClick={movePage}>나의 이력서</Text>
//                 <Text id='study' _hover={{
//                     cursor: 'pointer'
//                 }} onClick={movePage}>나의 스터디</Text>

//                 <Link href="/applications">
//                     <Text>지원 내역</Text>
//                 </Link>
//                 <Link href="/companies">
//                     <Text>기업 알아보기</Text>
//                 </Link>
//                 <Link href="/tests">
//                     <Text>진단/검사</Text>
//                 </Link>
//                 <Link href="/interview">
//                     <Text>면접현황</Text>
//                 </Link>
//                 <Link href="/career">
//                     <Text>커리어 마일리지</Text>
//                 </Link>
//             </VStack>
//         </Box>
//     );
// };

// export default Sidebar;
// Sidebar.js
import React, { useState } from 'react';
import { Box, VStack, Text, Link, Icon, Collapse } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaFileAlt, FaBook, FaClipboardList, FaBuilding, FaClipboardCheck, FaUserTie, FaMedal } from 'react-icons/fa';

const Sidebar = () => {
    const navigate = useNavigate();
    const [homeOpen, setHomeOpen] = useState(true);
    const [resumeOpen, setResumeOpen] = useState(true);
    const [studyOpen, setStudyOpen] = useState(true);

    const movePage = (e) => {
        const command = e.target.id;
        if (command === 'resume')
            navigate('/user/resume');
        else if (command === 'study')
            navigate('/user/study');
        else if (command === 'home')
            navigate('/user/home');
    };

    const toggleSection = (section) => {
        if (section === 'home') {
            setHomeOpen(!homeOpen);
        } else if (section === 'resume') {
            setResumeOpen(!resumeOpen);
        } else if (section === 'study') {
            setStudyOpen(!studyOpen);
        }
    };

    return (
        <Box bg="gray.100" w="250px" p="4">
            <VStack align="stretch" spacing={4}>
                <Text onClick={() => toggleSection('home')} _hover={{ cursor: 'pointer', color: 'blue.500' }}>
                    <Icon as={FaHome} mr={2} /> MY홈
                </Text>
                <Collapse in={homeOpen}>
                    <VStack align="stretch" pl={6} spacing={2}>
                        <Text id='home' _hover={{ cursor: 'pointer', color: 'blue.500' }} onClick={movePage}>
                            <Icon as={FaClipboardList} mr={2} /> 스크랩/관심기업
                        </Text>
                    </VStack>
                </Collapse>

                <Text onClick={() => toggleSection('resume')} _hover={{ cursor: 'pointer', color: 'blue.500' }}>
                    <Icon as={FaFileAlt} mr={2} /> 나의 이력서
                </Text>
                <Collapse in={resumeOpen}>
                    <VStack align="stretch" pl={6} spacing={2}>
                        <Text id='resume' _hover={{ cursor: 'pointer', color: 'blue.500' }} onClick={movePage}>
                            이력서 관리
                        </Text>
                    </VStack>
                </Collapse>

                <Text onClick={() => toggleSection('study')} _hover={{ cursor: 'pointer', color: 'blue.500' }}>
                    <Icon as={FaBook} mr={2} /> 나의 스터디
                </Text>
                <Collapse in={studyOpen}>
                    <VStack align="stretch" pl={6} spacing={2}>
                        <Text id='study' _hover={{ cursor: 'pointer', color: 'blue.500' }} onClick={movePage}>
                            스터디 관리
                        </Text>
                    </VStack>
                </Collapse>

                <Link href="/applications" _hover={{ textDecoration: 'none', color: 'blue.500' }}>
                    <Text>
                        <Icon as={FaClipboardCheck} mr={2} /> 지원 내역
                    </Text>
                </Link>
                <Link href="/companies" _hover={{ textDecoration: 'none', color: 'blue.500' }}>
                    <Text>
                        <Icon as={FaBuilding} mr={2} /> 기업 알아보기
                    </Text>
                </Link>
                <Link href="/tests" _hover={{ textDecoration: 'none', color: 'blue.500' }}>
                    <Text>
                        <Icon as={FaClipboardCheck} mr={2} /> 진단/검사
                    </Text>
                </Link>
                <Link href="/interview" _hover={{ textDecoration: 'none', color: 'blue.500' }}>
                    <Text>
                        <Icon as={FaUserTie} mr={2} /> 면접현황
                    </Text>
                </Link>
                <Link href="/career" _hover={{ textDecoration: 'none', color: 'blue.500' }}>
                    <Text>
                        <Icon as={FaMedal} mr={2} /> 커리어 마일리지
                    </Text>
                </Link>
            </VStack>
        </Box>
    );
};

export default Sidebar;
