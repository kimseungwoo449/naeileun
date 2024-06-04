

import { Box, Button, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaWrench,FaTrashAlt } from "react-icons/fa";
import { useLogin } from '../LoginContext';

const IntroductionDetail = () => {
    const {user} = useLogin();
    const { documentCode } = useParams();
    const navigate = useNavigate();
    const [details, setDetails] = useState([]);
    const [isLoaded,setIsLoaded] = useState(false);

    console.log("docCode : ",documentCode);

    useEffect(() => {
        console.log("docCode : ",documentCode);
        console.log("user_id : ",user.id)
        fetch(`${process.env.REACT_APP_SERVER_URL}/self-introduction/details?user=${user.id}&document_code=${documentCode}`, {
            method: 'GET',
            headers: {
                "Authorization": `ADMIN ${process.env.REACT_APP_ADMIN_KEY}`,
                'Content-Type': 'application/json;charset=UTF8'
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    setDetails(data);
                    setIsLoaded(true);
                } else {
                    console.error('No data received');
                }
            })
            .catch(error => console.error('Error fetching introduction details:', error));
    }, [documentCode]);

    const handleDelete = () => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/self-introduction/${documentCode}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `ADMIN ${process.env.REACT_APP_ADMIN_KEY}`,
                'Content-Type': 'application/json;charset=UTF8'
            },
            body:JSON.stringify(
                {
                    "user_id":user.id,
                    "document_code":documentCode
                }
            )
        })
            .then(response => {
                if (response.ok) {
                    navigate('/introduction');
                } else {
                    console.error('Failed to delete');
                }
            })
            .catch(error => console.error('Error deleting introduction:', error));
    };

    return (
        <Box p={5} w='70%' m='auto' borderRadius='10px' boxShadow='dark-lg'>
            <Flex justifyContent="space-around" flexDir='column' alignItems="center" mb={5}>
                <Text as={'b'} fontSize="2xl">{details.length > 0 ? details[0].title  : ""}</Text>  
            </Flex>
            <VStack align="stretch" spacing={4} mb={7}>
                {details.map((detail, index) => (
                    <Box key={index} className='detail-container' p={5} borderWidth={1} borderRadius="lg" borderColor="gray.200">
                        <Flex justifyContent="space-between" alignItems="center">
                            <Box>
                                <Text as={'b'} fontSize={'20px'}>{detail.head}</Text>
                                <Text mt={2}>{detail.body}</Text>
                            </Box>
                        </Flex>
                    </Box>
                ))}
            </VStack>
            <Flex justifyContent="space-around" alignItems="center">
            <HStack spacing={4} mt={6}>
                <Button leftIcon={<FaWrench />} variant='outline' colorScheme="blue" onClick={() => navigate(`/introduction/update/${documentCode}`)}>수정</Button>
                <Button leftIcon={<FaTrashAlt />} variant='outline' colorScheme="red" onClick={handleDelete}>삭제</Button>
            </HStack>
            </Flex>
        </Box>
    );
};

export default IntroductionDetail;
