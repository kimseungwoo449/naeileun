import { Box, Button, Flex, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { useLogin } from '../../LoginContext';

const MyResume = () => {
    const [resumes, setResumes] = useState([]);
    const user = useLogin();
    
        useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/user/resume`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
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
                <Button colorScheme="teal" size="sm">+</Button>
            </Flex>
            <VStack align="stretch" spacing="4">
                {resumes.map((resume, index) => (
                    <Flex key={index} justifyContent="space-between" alignItems="center">
                        <Text>{resume.title}</Text>
                        <Box>
                            <Button colorScheme="blue" size="sm" mr="2">수정</Button>
                            <Button colorScheme="red" size="sm">삭제</Button>
                        </Box>
                    </Flex>
                ))}
            </VStack>
        </Box>
        </div>
    );
};

export default MyResume;