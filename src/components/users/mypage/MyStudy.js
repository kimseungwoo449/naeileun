import { Box, Button, Flex, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { useLogin } from '../../LoginContext';

const MyStudy = () => {
    const [study, setStudy] = useState([]);
    const user = useLogin();
    
        useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/user/study`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(response => response.json())
            .then(data => setStudy(data))
            .catch(error => console.error('Error fetching resume data:', error));
    }, []);

    return (
        <div>
            <Box>
            <Flex justifyContent="space-between" alignItems="center" mb="4">
                <Text fontSize="2xl">나의 스터디</Text>
                <Button colorScheme="teal" size="sm">+</Button>
            </Flex>
            <VStack align="stretch" spacing="4">
                {study.map((study, index) => (
                    <Flex key={index} justifyContent="space-between" alignItems="center">
                        <Text>{study.title}</Text>
                        <Box>
                            <Button colorScheme="red" size="sm">삭제</Button>
                        </Box>
                    </Flex>
                ))}
            </VStack>
        </Box>
        </div>
    );
};

export default MyStudy;