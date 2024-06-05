import { Box, Button, Flex, Text, VStack, HStack, SimpleGrid, Grid, GridItem } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ResumeDetail = () => {
    const navigate = useNavigate();
    const { resumeCode } = useParams();
    const [resume, setResume] = useState({});
    const splitValue = 'wLYPvSwquc';
    const [careerShow, setCareerShow] = useState(false);

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
                setCareerShow(data.is_newbie);
                setResume(data);
            });
    };

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
                if (data.status) {
                    navigate("/user/resume");
                }
            });
    };

    const buttonAction = e => {
        if (e.target.id === 'button-delete') {
            deleteResume();
        } else if (e.target.id === 'button-update') {
            navigate(`/resume/update/${resumeCode}`)
        }
    };

    useEffect(() => {
        fetchResume();
    }, [resumeCode]);

    const formatData = (data) => {
        return data ? data.split(splitValue).filter(Boolean).join(', ') : '';
    };

    return (
        <Box w={{ base: '90%', md: '1100px' }} m="auto" p={5} border={'1px'} borderWidth="1px" borderRadius="md" boxShadow="dark-lg" bg="white">
            <Flex direction="column" alignItems="center">
                <Text as="b" fontSize="2xl" textAlign="center" mb={5} color="black">{resume.title}</Text>
                <VStack spacing={6} align="stretch" w="100%">
                    <Box id="user_info-container" p={4} borderTop='1px' borderBottom='1px' borderColor='lightgray' boxShadow="sm">
                        <Text fontSize="lg" fontWeight="bold" mb={2}>개인 정보</Text>
                        <Grid 
                        gridTemplateColumns={"20% 80%"}
                        gridTemplateRows={'1fr 1fr 1fr 1fr'}
                        templateAreas={`
                            "n nr"
                            "a ar"
                            "p pr"
                            "c cr"`
                        }
                        spacing={2}
                        gap={'10px'}
                        >
                        <GridItem border={'1px'} mb={'2'} mr={'20px'} borderRadius={'10px'} backgroundColor={'#f0f0f0'} textAlign={'start'} area={'n'} p='7px 7px 7px 30px'>이름</GridItem><GridItem bg='blue.100' area={'nr'} border={"1px solid black"} borderRadius='10px' p='7px 7px 7px 15px' mb={'2'}>{resume.name}</GridItem>
                        <GridItem border={'1px'} mb={'2'} mr={'20px'} borderRadius={'10px'} backgroundColor={'#f0f0f0'} textAlign={'start'} area={'a'} p='7px 7px 7px 30px'>나이</GridItem><GridItem bg='blue.100' area={'ar'} border={"1px solid black"} borderRadius='10px' p='7px 7px 7px 15px' mb={'2'}>{resume.user_age}</GridItem>
                        <GridItem border={'1px'} mb={'2'} mr={'20px'} borderRadius={'10px'} backgroundColor={'#f0f0f0'} textAlign={'start'} area={'p'} p='7px 7px 7px 30px'>핸드폰</GridItem><GridItem bg='blue.100' area={'pr'} border={"1px solid black"}  borderRadius='10px' p='7px 7px 7px 15px' mb={'2'}>{resume.phone}</GridItem>
                        <GridItem border={'1px'} mb={'2'} mr={'20px'} borderRadius={'10px'} backgroundColor={'#f0f0f0'} textAlign={'start'} area={'c'} p='7px 7px 7px 30px'>경력 유무</GridItem><GridItem bg='blue.100'  area={'cr'} border={"1px solid black"}  borderRadius='10px' p='7px 7px 7px 15px' mb={'2'} >{resume.is_newbie ? "신입" : "경력직"}</GridItem>
                        </Grid>
                    </Box>
                    {!careerShow && (
                        <Box id="career-container" p={4} borderTop='1px' borderBottom='1px' borderColor='lightgray' boxShadow="sm">
                            <Text fontSize="lg" fontWeight="bold" mb={2}>경력</Text>
                            <SimpleGrid columns={1} spacing={2}>
                                {formatData(resume.career).split(', ').map((career, index) => (
                                    <Text backgroundColor={'blue.100'} boxShadow={'lg'} border={"1px solid black"} borderRadius='10px' p='7px 7px 7px 15px' key={index}>{career}</Text>
                                ))}
                            </SimpleGrid>
                        </Box>
                    )}
                    <Box id="academic-career-container" p={4} borderTop='1px' borderBottom='1px' borderColor='lightgray' boxShadow="sm">
                        <Text fontSize="lg" fontWeight="bold" mb={2}>학력</Text>
                        <SimpleGrid columns={1} spacing={2}>
                            <Text backgroundColor={'blue.100'} border={"1px solid black"}  borderRadius='10px' p='7px 7px 7px 15px'>{resume.academic_career}</Text>
                        </SimpleGrid>
                    </Box>
                    
                    <HStack spacing={4} w="100%" alignItems="stretch">
                        <Box id="certificate-container" p={4} borderTop='1px' borderBottom='1px' borderColor='lightgray' boxShadow="sm" w="50%" display="flex" flexDirection="column" justifyContent="space-between">
                            <Text fontSize="lg" fontWeight="bold" mb={2}>자격증</Text>
                            <SimpleGrid columns={1} spacing={2} flex="1">
                                {formatData(resume.certificate).split(', ').map((certificate, index) => (
                                    <Text backgroundColor={'blue.100'} border={"1px solid black"} borderRadius='10px' p='7px 7px 7px 15px' key={index}>{certificate}</Text>
                                ))}
                            </SimpleGrid>
                        </Box>
                        <Box id="language-container" p={4} borderTop='1px' borderBottom='1px' borderColor='lightgray' boxShadow="sm" w="50%" display="flex" flexDirection="column" justifyContent="space-between">
                            <Text fontSize="lg" fontWeight="bold" mb={2}>언어</Text>
                            <SimpleGrid columns={1} spacing={2} flex="1">
                                {formatData(resume.language).split(', ').map((language, index) => (
                                    <Text backgroundColor={'blue.100'} border={"1px solid black"} borderRadius='10px' p='7px 7px 7px 15px' key={index}>{language}</Text>
                                ))}
                            </SimpleGrid>
                        </Box>
                    </HStack>
                    <HStack spacing={4} w="100%" alignItems="stretch">
                        <Box id="skill-container" p={4} borderTop='1px' borderBottom='1px' borderColor='lightgray' boxShadow="sm" w="50%" display="flex" flexDirection="column" justifyContent="space-between">
                            <Text fontSize="lg" fontWeight="bold" mb={2}>기술</Text>
                            <SimpleGrid columns={1} spacing={2} flex="1">
                                {formatData(resume.skill).split(', ').map((skill, index) => (
                                    <Text backgroundColor={'blue.100'} border={"1px solid black"} borderRadius='10px' p='7px 7px 7px 15px' key={index}>{skill}</Text>
                                ))}
                            </SimpleGrid>
                        </Box>
                        <Box id="award-container" p={4} borderTop='1px' borderBottom='1px' borderColor='lightgray' boxShadow="sm" w="50%" display="flex" flexDirection="column" justifyContent="space-between">
                            <Text fontSize="lg" fontWeight="bold" mb={2}>수상이력</Text>
                            <SimpleGrid columns={1} spacing={2} flex="1">
                                {formatData(resume.award).split(', ').map((award, index) => (
                                    <Text backgroundColor={'blue.100'} border={"1px solid black"} borderRadius='10px' p='7px 7px 7px 15px' key={index}>{award}</Text>
                                ))}
                            </SimpleGrid>
                        </Box>
                    </HStack>
                    <Box id="expected-salary-container" p={4} borderTop='1px' borderBottom='1px' borderColor='lightgray' boxShadow="sm">
                        <Text fontSize="lg" fontWeight="bold" mb={2}>희망 연봉</Text>
                        <SimpleGrid columns={1} spacing={2}>
                            <Text backgroundColor={'blue.100'} border={"1px solid black"} borderRadius='10px' p='7px 7px 7px 15px'>{resume.expected_salary}</Text>
                        </SimpleGrid>
                    </Box>
                    <Box id="expected-region-container" p={4} borderTop='1px' borderBottom='1px' borderColor='lightgray' boxShadow="sm">
                        <Text fontSize="lg" fontWeight="bold" mb={2}>희망 지역</Text>
                        <SimpleGrid columns={1} spacing={2}>
                            {formatData(resume.expected_region).split(', ').map((region, index) => (
                                <Text backgroundColor={'blue.100'} border={"1px solid black"} borderRadius='10px' p='7px 7px 7px 15px' key={index}>{region}</Text>
                            ))}
                        </SimpleGrid>
                    </Box>
                </VStack>
                <HStack spacing={4} mt={6}>
                    <Button id="button-delete" onClick={buttonAction} bg="red.500" color="white" _hover={{ bg: 'red.600' }}>삭제</Button>
                    <Button id="button-update" onClick={buttonAction} bg="blue.500" color="white" _hover={{ bg: 'blue.600' }}>수정</Button>
                </HStack>
            </Flex>
        </Box>
    );
};

export default ResumeDetail;
