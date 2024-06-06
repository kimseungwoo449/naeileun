import React, { useState } from 'react';
import { Box, VStack, Text, Icon, Button, Collapse } from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaHome, FaFileAlt, FaBook, FaBars, FaTimes } from 'react-icons/fa';
import { RiSettings4Fill } from 'react-icons/ri';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(true);

    const movePage = (e) => {
        const command = e.currentTarget.id;
        if (command === 'resume')
            navigate('/user/resume');
        else if (command === 'home')
            navigate('/user/home');
        else if (command === 'info')
            navigate('/user/info');
        else if(command ==='introduction')
            navigate('/user/introduction');
        else if(command ==='search')
            navigate('/job/search');
    };


    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const isActive = (path) => location.pathname === path;

    return (
        <Box borderWidth={1} borderTop={'none'} w={isOpen ? "250px" : "60px"} h="100vh" position="relative">
            <Box position="absolute" top="10px" left="10px">
                <Button 
                    onClick={toggleSidebar} 
                    bg="gray.200" 
                    _hover={{ bg: 'gray.300' }}
                >
                    {isOpen ? <FaTimes /> : <FaBars />}
                </Button>
            </Box>
            <VStack align="stretch" spacing={4} mt={12} p="4">
                <Collapse in={isOpen} animateOpacity>
                    <Box>
                        <VStack align="stretch" spacing={2}>
                            <Box
                                id='home'
                                display="flex"
                                alignItems="center"
                                _hover={{ cursor: 'pointer', bg: 'blue.50' }}
                                onClick={movePage}
                                bg={isActive('/user/home') ? 'blue.100' : 'transparent'}
                                p={3}
                                borderRadius="md"
                            >
                                <Icon as={FaHome} mr={2} color="blue.500" />
                                <Text color="blue.500">MY홈</Text>
                            </Box>
                            <Box
                                id='resume'
                                display="flex"
                                alignItems="center"
                                _hover={{ cursor: 'pointer', bg: 'blue.50' }}
                                onClick={movePage}
                                bg={isActive('/user/resume') ? 'blue.100' : 'transparent'}
                                p={3}
                                borderRadius="md"
                            >
                                <Icon as={FaFileAlt} mr={2} color="blue.500" />
                                <Text color="blue.500">나의 이력서</Text>
                            </Box>
                            <Box
                                id='introduction'
                                display="flex"
                                alignItems="center"
                                _hover={{ cursor: 'pointer', bg: 'blue.50' }}
                                onClick={movePage}
                                bg={isActive('/user/introduction') ? 'blue.100' : 'transparent'}
                                p={3}
                                borderRadius="md"
                            >
                                <Icon as={FaBook} mr={2} color="blue.500" />
                                <Text color="blue.500">나의 자기소개서</Text>
                            </Box>
                            <Box
                                id='search'
                                display="flex"
                                alignItems="center"
                                _hover={{ cursor: 'pointer', bg: 'blue.50' }}
                                onClick={movePage}
                                bg={isActive('/job/search') ? 'blue.100' : 'transparent'}
                                p={3}
                                borderRadius="md"
                            >
                                <Icon as={RiSettings4Fill} mr={2} color="blue.500" />
                                <Text color="blue.500">채용정보검색</Text>
                            </Box>
                            <Box
                                id='info'
                                display="flex"
                                alignItems="center"
                                _hover={{ cursor: 'pointer', bg: 'blue.50' }}
                                onClick={movePage}
                                bg={isActive('/user/info') ? 'blue.100' : 'transparent'}
                                p={3}
                                borderRadius="md"
                            >
                                <Icon as={RiSettings4Fill} mr={2} color="blue.500" />
                                <Text color="blue.500">나의 정보</Text>
                            </Box>
                          
                        </VStack>
                    </Box>
                </Collapse>
                {!isOpen && (
                    <VStack spacing={4}>
                        <Icon as={FaHome} boxSize={6} _hover={{ cursor: 'pointer', color: 'blue.500' }} onClick={() => navigate('/user/home')} />
                        <Icon as={FaFileAlt} boxSize={6} _hover={{ cursor: 'pointer', color: 'blue.500' }} onClick={() => navigate('/user/resume')} />
                        <Icon as={RiSettings4Fill} boxSize={6} _hover={{ cursor: 'pointer', color: 'blue.500' }} onClick={() => navigate('/user/info')} />
                        
                 
                    </VStack>
                )}

            </VStack>
        </Box>
    );
};

export default Sidebar;
