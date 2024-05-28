

import React, { useState } from 'react';
import { Box, VStack, Text, Link, Icon, Button, Collapse } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaFileAlt, FaBook, FaClipboardList, FaBuilding, FaClipboardCheck, FaUserTie, FaMedal, FaBars, FaTimes } from 'react-icons/fa';

const Sidebar = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(true);

    const movePage = (e) => {
        const command = e.target.id;
        if (command === 'resume')
            navigate('/user/resume');
        else if (command === 'study')
            navigate('/user/study');
        else if (command === 'home')
            navigate('/user/home');
    };


    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <Box bg="gray.100" w={isOpen ? "250px" : "60px"} position="relative">
            <Box position="absolute" top="10px" left="10px">
                <Button 
                    onClick={toggleSidebar} 
                    bg="gray.200" 
                    _hover={{ bg: 'gray.300' }}
                >
                    {isOpen ? <FaTimes /> : <FaBars />}
                </Button>
            </Box>
            <VStack align="stretch" spacing={4}  mt={12} p="4">
                <Collapse in={isOpen} animateOpacity>
                    <Box>
                        <VStack align="stretch" spacing={2}>

                            <Text id='home' _hover={{ cursor: 'pointer', color: 'blue.500' }} onClick={movePage}>
                            <Icon as={FaHome} mr={isOpen ? 2 : 0} />MY홈
                            </Text>
                            <Text id='resume' _hover={{ cursor: 'pointer', color: 'blue.500' }} onClick={movePage}>
                            <Icon as={FaFileAlt} mr={isOpen ? 2 : 0} />나의 이력서
                            </Text>
                            <Text id='study' _hover={{ cursor: 'pointer', color: 'blue.500' }} onClick={movePage}>
                            <Icon as={FaHome} mr={isOpen ? 2 : 0} />나의 스터디
                            </Text>
                            <Text id='dataDisplay' _hover={{ cursor: 'pointer', color: 'blue.500' }} onClick={movePage}>
                            <Icon as={FaHome} mr={isOpen ? 2 : 0} />데이터 전송 및 표시
                            </Text>
                            <Text id='authError' _hover={{ cursor: 'pointer', color: 'blue.500' }} onClick={movePage}>
                            <Icon as={FaHome} mr={isOpen ? 2 : 0} />인증 오류: 서버 요청
                            </Text>
                            <Text id='updateInfo' _hover={{ cursor: 'pointer', color: 'blue.500' }} onClick={movePage}>
                            <Icon as={FaHome} mr={isOpen ? 2 : 0} /> 업데이트 정보 표시
                            </Text>
                            <Text id='dataTransfer' _hover={{ cursor: 'pointer', color: 'blue.500' }} onClick={movePage}>
                            <Icon as={FaHome} mr={isOpen ? 2 : 0} />수집 및 전송 방법
                            </Text>
                        </VStack>
                    </Box>
                </Collapse>
                {!isOpen && (
                    <VStack spacing={4}>
                        <Icon as={FaHome} boxSize={6} _hover={{ cursor: 'pointer', color: 'blue.500' }} onClick={() => navigate('/user/home')} />
                        <Icon as={FaClipboardList} boxSize={6} _hover={{ cursor: 'pointer', color: 'blue.500' }} onClick={() => navigate('/user/home')} />
                        <Icon as={FaFileAlt} boxSize={6} _hover={{ cursor: 'pointer', color: 'blue.500' }} onClick={() => navigate('/user/resume')} />
                        <Icon as={FaBook} boxSize={6} _hover={{ cursor: 'pointer', color: 'blue.500' }} onClick={() => navigate('/user/study')} />
                        <Link href="/applications" _hover={{ color: 'blue.500' }}>
                            <Icon as={FaClipboardCheck} boxSize={6} />
                        </Link>
                        <Link href="/companies" _hover={{ color: 'blue.500' }}>
                            <Icon as={FaBuilding} boxSize={6} />
                        </Link>
                        <Link href="/tests" _hover={{ color: 'blue.500' }}>
                            <Icon as={FaClipboardCheck} boxSize={6} />
                        </Link>
                        <Link href="/interview" _hover={{ color: 'blue.500' }}>
                            <Icon as={FaUserTie} boxSize={6} />
                        </Link>
                        <Link href="/career" _hover={{ color: 'blue.500' }}>
                            <Icon as={FaMedal} boxSize={6} />
                        </Link>
                    </VStack>
                )}

            </VStack>
        </Box>
    );
};

export default Sidebar;
