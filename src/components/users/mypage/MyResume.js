import { Box, Button, Flex, Icon, Text, Tooltip, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useLogin } from '../../LoginContext';
import Sidebar from '../../module/SideBar';
import { Link, useNavigate } from 'react-router-dom';
import { RiShoppingBag4Line, RiMoneyDollarCircleLine, RiMapPinLine } from "react-icons/ri";
import { FaWrench,FaTrashAlt } from "react-icons/fa";

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

    return (
        <div>
            <Box>
                <Flex justifyContent="space-between" alignItems="center" mb="4">
                    <Text as={'b'} fontSize="3xl">나의 이력서</Text>
                    <Button colorScheme="teal" size="sm" onClick={() => navigate('/resume/write')}>+</Button>
                </Flex>
                <VStack align="stretch" spacing="4">
                    {resumes.map((resume, index) => {
                        const region = resume.expectedRegion.split(splitValue);
                        return (
                            <Box display={'flex'} justifyContent={'space-between'} key={index} className='resume-container' m='10px 0 10px 0' p='20px' border='solid 1px lightgray' borderLeft={'none'} borderRight={'none'}>
                                <Box>
                                    <Flex justifyContent="space-between" flexDir={'column'} >
                                        <Box mb={'30px'}><Link to={`/resume/viewDetail/${resume.resumeCode}`}><Tooltip hasArrow label={resume.updateDate+'수정'} bg='blue.300' color='white'><Text as={'b'} fontSize={'20px'}>{resume.title}</Text></Tooltip></Link></Box>
                                        <Box display={'flex'} alignItems={'center'} mb={'10px'}><Icon as={RiShoppingBag4Line} mr={'10px'} /><Text >{resume.isNewBie ? "신입" : "경력"}</Text></Box>
                                        <Box display={'flex'} alignItems={'center'} mb={'10px'}><Icon as={RiMoneyDollarCircleLine} mr={'10px'} /><Text>희망연봉 : {resume.expectedSalary}</Text></Box>
                                        <Box display={'flex'} alignItems={'center'} mb={'10px'}><Icon as={RiMapPinLine} mr={'10px'} /><Text>희망지역 : {region[0] ? region[0] : ''}{region[1] ? ', '+region[1] : ''}{region[2] ? ', '+region[2] : ''}</Text></Box>
                                    </Flex>
                                </Box>
                                <Box display={'flex'} flexDir={'column'} gap={'10px'}>
                                    <Button leftIcon={<FaWrench />} variant={'outline'} colorScheme="blue" size="md" onClick={() => navigate(`/resume/update/${resume.resumeCode}`)}>수정</Button>
                                    <Button leftIcon={<FaTrashAlt />} variant={'outline'} colorScheme="red" size="md" onClick={() => {
                                        fetch(`${process.env.REACT_APP_SERVER_URL}/resume/${resume.resumeCode}`, {
                                            method: 'DELETE',
                                            headers: {
                                                Authorization: `ADMIN ${process.env.REACT_APP_ADMIN_KEY}`,
                                                "Content-Type": "application/json;charset=UTF8"
                                            }
                                        })
                                            .then(response => response.json())
                                            .then(data => {
                                                if (!data.status) {
                                                    navigate("/");
                                                } else {
                                                    navigate("/user/resume");
                                                }
                                            });
                                    }}>삭제</Button>
                                </Box>
                            </Box>
                        );
                    })}
                </VStack>
            </Box>
        </div>
    );
};

export default MyResume;
