import { Box, Button, Flex, Text, VStack, HStack, SimpleGrid, Divider } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ResumeDetail = () => {
    const navigate = useNavigate();
    const { resumeCode } = useParams();
    const [resume, setResume] = useState({});
    const splitValue = 'wLYPvSwquc';
    
    const fetchResume = async () => {
        await fetch(`${process.env.REACT_APP_SERVER_URL}/resume/${resumeCode}`, {
            method: 'GET',
            headers: {
                Authorization: `ADMIN ${process.env.REACT_APP_ADMIN_KEY}`,
                "Content-Type": "application/json;charset=UTF8"
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log('fetch-data', data);
                setResume(data);
            });
    }

    const deleteResume = async () => {
        await fetch(`${process.env.REACT_APP_SERVER_URL}/resume/${resumeCode}`, {
            method: 'DELETE',
            headers: {
                Authorization: `ADMIN ${process.env.REACT_APP_ADMIN_KEY}`,
                "Content-Type": "application/json;charset=UTF8"
            }
        })
            .then(response => response.json())
            .then(data => {
                if(data.status){
                    navigate("/");
                }
            });
    }

    const buttonAction = e => {
        if(e.target.id === 'button-delete'){
            deleteResume();
        }else if(e.target.id ==='button-update'){
            console.log("update")
        }
    }

    useEffect(() => {
        fetchResume();
    }, [])

    return (
        <Box w={{ base: '90%', md: '70%' }} m="auto" p={5} borderWidth="1px" borderRadius="lg" boxShadow="lg" bg="gray.50">
            <Flex direction="column" alignItems="center">
                <Text as="b" fontSize="3xl" textAlign="center" mb={5} color="teal.500">{resume.title}</Text>
                <VStack spacing={6} align="stretch" w="100%">
                    <Box id="user_info-container" p={4} bg="white" borderRadius="md" boxShadow="sm">
                        <Text fontSize="lg" fontWeight="bold" mb={2}>개인 정보</Text>
                        <Text>이름: {resume.name}</Text>
                        <Text>나이: {resume.user_age}</Text>
                    </Box>
                    <Box id="career-container" p={4} bg="white" borderRadius="md" boxShadow="sm">
                        <Text fontSize="lg" fontWeight="bold" mb={2}>경력</Text>
                        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                            <Text>경력1: {resume.career?.split(splitValue)[0]}</Text>
                            <Text>경력2: {resume.career?.split(splitValue)[1]}</Text>
                            <Text>경력3: {resume.career?.split(splitValue)[2]}</Text>
                        </SimpleGrid>
                    </Box>
                    <Box id="academic-career-container" p={4} bg="white" borderRadius="md" boxShadow="sm">
                        <Text fontSize="lg" fontWeight="bold" mb={2}>학력</Text>
                        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                            <Text>학력1: {resume.academic_career?.split(splitValue)[0]}</Text>
                            <Text>학력2: {resume.academic_career?.split(splitValue)[1]}</Text>
                            <Text>학력3: {resume.academic_career?.split(splitValue)[2]}</Text>
                        </SimpleGrid>
                    </Box>
                    <HStack spacing={4} w="100%">
                        <Box id="certificate-container" p={4} bg="white" borderRadius="md" boxShadow="sm" w="50%">
                            <Text fontSize="lg" fontWeight="bold" mb={2}>자격증</Text>
                            <SimpleGrid columns={1} spacing={2}>
                                <Text>자격증1: {resume.certificate?.split(splitValue)[0]}</Text>
                                <Text>자격증2: {resume.certificate?.split(splitValue)[1]}</Text>
                                <Text>자격증3: {resume.certificate?.split(splitValue)[2]}</Text>
                            </SimpleGrid>
                        </Box>
                        <Box id="language-container" p={4} bg="white" borderRadius="md" boxShadow="sm" w="50%">
                            <Text fontSize="lg" fontWeight="bold" mb={2}>언어</Text>
                            <SimpleGrid columns={1} spacing={2}>
                                <Text>언어1: {resume.language?.split(splitValue)[0]}</Text>
                                <Text>언어2: {resume.language?.split(splitValue)[1]}</Text>
                                <Text>언어3: {resume.language?.split(splitValue)[2]}</Text>
                            </SimpleGrid>
                        </Box>
                    </HStack>
                    <HStack spacing={4} w="100%">
                        <Box id="skill-container" p={4} bg="white" borderRadius="md" boxShadow="sm" w="50%">
                            <Text fontSize="lg" fontWeight="bold" mb={2}>기술</Text>
                            <SimpleGrid columns={1} spacing={2}>
                                <Text>기술1: {resume.skill?.split(splitValue)[0]}</Text>
                                <Text>기술2: {resume.skill?.split(splitValue)[1]}</Text>
                                <Text>기술3: {resume.skill?.split(splitValue)[2]}</Text>
                            </SimpleGrid>
                        </Box>
                        <Box id="award-container" p={4} bg="white" borderRadius="md" boxShadow="sm" w="50%">
                            <Text fontSize="lg" fontWeight="bold" mb={2}>수상이력</Text>
                            <SimpleGrid columns={1} spacing={2}>
                                <Text>수상이력1: {resume.award?.split(splitValue)[0]}</Text>
                                <Text>수상이력2: {resume.award?.split(splitValue)[1]}</Text>
                                <Text>수상이력3: {resume.award?.split(splitValue)[2]}</Text>
                            </SimpleGrid>
                        </Box>
                    </HStack>
                </VStack>
                <HStack spacing={4} mt={6}>
                    <Button id="button-delete" onClick={buttonAction} bg="red.500" color="white" _hover={{ bg: 'red.600' }}>삭제</Button>
                    <Button id="button-update" onClick={buttonAction} bg="teal.500" color="white" _hover={{ bg: 'teal.600' }}>수정</Button>
                </HStack>
            </Flex>
        </Box>
    );
};

export default ResumeDetail;
