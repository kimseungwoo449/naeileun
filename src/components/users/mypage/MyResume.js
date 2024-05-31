import { Box, Button, Flex, Icon, Text, Tooltip, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useLogin } from '../../LoginContext';
import { Link, useNavigate } from 'react-router-dom';
import { RiShoppingBag4Line, RiMoneyDollarCircleLine, RiMapPinLine } from "react-icons/ri";
import { FaWrench, FaTrashAlt } from "react-icons/fa";

const MyResume = () => {
    const [resumes, setResumes] = useState([]);
    const navigate = useNavigate();
    const { user } = useLogin();
    const splitValue = "wLYPvSwquc"; // useRef 대신 상수로 설정

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/user/resume`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF8'
            },
            body: JSON.stringify(user)
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    setResumes(data);
                } else {
                    console.error('No data received');
                }
            })
            .catch(error => console.error('Error fetching resume data:', error));
    }, [user]);

    const handleDelete = (resumeCode) => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/resume/${resumeCode}`, {
            method: 'DELETE',
            headers: {
                Authorization: `ADMIN ${process.env.REACT_APP_ADMIN_KEY}`,
                "Content-Type": "application/json;charset=UTF8"
            }
        })
            .then(response => {
                if (response.ok) {
                    setResumes(resumes.filter(resume => resume.resumeCode !== resumeCode));
                } else {
                    console.error('Failed to delete');
                }
            })
            .catch(error => console.error('Error deleting resume:', error));
    };

    return (
        <Box p={5}>
            <Flex justifyContent="space-between" alignItems="center" mb={4}>
                <Text as="b" fontSize="3xl">나의 이력서</Text>
                <Button colorScheme="teal" size="sm" onClick={() => navigate('/resume/write')}>+</Button>
            </Flex>
            <VStack align="stretch" spacing={4}>
                {resumes.map((resume, index) => {
                    const region = resume.expectedRegion.split(splitValue);
                    const formattedRegion = region.filter(Boolean).join(', ');

                    return (
                        <Box key={index} p={5} borderWidth={1} borderRadius="lg" borderColor="gray.200">
                            <Flex justifyContent="space-between" alignItems="center">
                                <Box>
                                    <Link to={`/resume/viewDetail/${resume.resumeCode}`}>
                                        <Tooltip hasArrow label={`수정일: ${resume.updateDate}`} bg='blue.300' color='white'>

                                            <Text as="b" fontSize="20px">{resume.title}</Text>
                                        </Tooltip>
                                    </Link>
                                    <Box mt={3}>
                                        <Box display="flex" alignItems="center" mb={2}>
                                            <Icon as={RiShoppingBag4Line} mr={2} />
                                            <Text>{resume.isNewBie ? "신입" : "경력"}</Text>
                                        </Box>
                                        <Box display="flex" alignItems="center" mb={2}>
                                            <Icon as={RiMoneyDollarCircleLine} mr={2} />
                                            <Text>희망연봉: {resume.expectedSalary}</Text>
                                        </Box>
                                        <Box display="flex" alignItems="center" mb={2}>
                                            <Icon as={RiMapPinLine} mr={2} />
                                            <Text>희망지역: {formattedRegion}</Text>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box display="flex" flexDir="column" gap={2}>
                                    <Button leftIcon={<FaWrench />} variant="outline" colorScheme="blue" size="md" onClick={() => navigate(`/resume/update/${resume.resumeCode}`)}>수정</Button>
                                    <Button leftIcon={<FaTrashAlt />} variant="outline" colorScheme="red" size="md" onClick={() => handleDelete(resume.resumeCode)}>삭제</Button>
                                </Box>
                            </Flex>
                        </Box>
                    );
                })}
            </VStack>
        </Box>
    );
};

export default MyResume;
