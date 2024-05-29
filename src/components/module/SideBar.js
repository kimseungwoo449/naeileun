import React, { useState } from 'react';
import { Box, VStack, Text, Icon, Button, Collapse } from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaHome, FaFileAlt, FaBook, FaBars, FaTimes } from 'react-icons/fa';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(true);

    const movePage = (e) => {
        const command = e.currentTarget.id;
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

    const isActive = (path) => location.pathname === path;

    return (
        <Box bg="gray.100" w={isOpen ? "250px" : "60px"} h="100vh" position="relative">
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
                                id='study'
                                display="flex"
                                alignItems="center"
                                _hover={{ cursor: 'pointer', bg: 'blue.50' }}
                                onClick={movePage}
                                bg={isActive('/user/study') ? 'blue.100' : 'transparent'}
                                p={3}
                                borderRadius="md"
                            >
                                <Icon as={FaBook} mr={2} color="blue.500" />
                                <Text color="blue.500">나의 스터디</Text>
                            </Box>
                            {/* Add other items here in similar fashion */}
                        </VStack>
                    </Box>
                </Collapse>
                {!isOpen && (
                    <VStack spacing={4}>
                        <Icon as={FaHome} boxSize={6} _hover={{ cursor: 'pointer', color: 'blue.500' }} onClick={() => navigate('/user/home')} />
                        <Icon as={FaFileAlt} boxSize={6} _hover={{ cursor: 'pointer', color: 'blue.500' }} onClick={() => navigate('/user/resume')} />
                        <Icon as={FaBook} boxSize={6} _hover={{ cursor: 'pointer', color: 'blue.500' }} onClick={() => navigate('/user/study')} />
                        {/* Add other icons here in similar fashion */}
                    </VStack>
                )}

            </VStack>
        </Box>
    );
};

export default Sidebar;
