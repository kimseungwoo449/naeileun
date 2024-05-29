import { Box, Button, Flex, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useLogin } from '../../LoginContext';
import Sidebar from '../../module/SideBar';
import { Link, useNavigate } from 'react-router-dom';

const MyResume = () => {
    const [resumes, setResumes] = useState([]);
    const navigate = useNavigate();
    // const {user} = sessionStorage.getItem('user');
    const { user } = useLogin();

    

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/user/resume`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF8'
            },
            body: JSON.stringify(user)
        })
            .then(response => response.json())
            .then(data => setResumes(data))
            .catch(error => console.error('Error fetching resume data:', error));
    }, []);


    return (
        <div>
            <Box>

                <Flex justifyContent="space-between" alignItems="center" mb="4">
                    <Text fontSize="2xl">나의 이력서</Text>
                    <Button colorScheme="teal" size="sm" onClick={() => navigate('/resume/write')}>+</Button>
                </Flex>
                <VStack align="stretch" spacing="4">
                    {resumes.map((resume, index) => (
                        <Flex key={index} justifyContent="space-between" alignItems="center">
                            <Link to={`/resume/viewDetail/${resume.resumeCode}`}><Text>{resume.title}</Text></Link>
                            <Box>
                                <Button colorScheme="blue" size="sm" mr="2" onClick={()=>navigate(`/resume/update/${resume.resumeCode}`)}>수정</Button>
                                <Button colorScheme="red" size="sm" onClick={()=>{
                                    fetch(`${process.env.REACT_APP_SERVER_URL}/resume/${resume.resumeCode}`, {
                                        method: 'DELETE',
                                        headers: {
                                            Authorization: `ADMIN ${process.env.REACT_APP_ADMIN_KEY}`,
                                            "Content-Type": "application/json;charset=UTF8"
                                        }
                                    })
                                        .then(response => response.json())
                                        .then(data => {
                                            if(!data.status){
                                                navigate("/");
                                            }else{
                                                navigate("/user/resume");
                                            }
                                        });
                                }}>삭제</Button>
                            </Box>
                        </Flex>
                    ))}
                </VStack>
            </Box>
        </div>
    );
};

export default MyResume;