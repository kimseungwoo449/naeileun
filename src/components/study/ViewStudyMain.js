import React, { useState, useEffect } from 'react';
import { Heading, Box, HStack, Card, Image, VStack, CardBody, Text, SimpleGrid } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const ViewStudyMain = () => {
    const navigate = useNavigate(); 

    const [popularList, setPopularList] = useState([]);

    const fetchPopularStudy = async () => {
        const response = await fetch(
            `${process.env.REACT_APP_SERVER_URL}/study/popular`,
            {
                method: "POST",
                headers: {
                    Authorization: `ADMIN ${process.env.REACT_APP_ADMIN_KEY}`,
                    "Content-Type": "application/json;charset=UTF8"
                }
            }
        );

        const studyData = await response.json();

        if (studyData.status === false) {
            return;
        }
        setPopularList(studyData.result);
    };

    const submit = (e) => {
        e.preventDefault();
        const groupCode = e.currentTarget.id;
        if (groupCode) {
            navigate('/study/board', { state: { groupCode: groupCode } });
        }
    };

    useEffect(() => {
        fetchPopularStudy();
    }, []);

    return (
        <Box minW="980px" margin="auto">
            <form method="POST" action={`${process.env.REACT_SERVER_URL}/study/board`}>
                <input type="hidden" id="group_code" name="group_code" value="boardDetail" />
                <HStack m="40px" justifyContent="start">
                    <Heading fontSize="2xl" color="black">인기 스터디 그룹</Heading>
                </HStack>
                <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={5} m="40px">
                    {popularList.map((popular, index) => (
                        <Card 
                            id={popular.groupCode} 
                            key={index + 1000} 
                            boxShadow="md" 
                            borderRadius="md" 
                            overflow="hidden" 
                            _hover={{ cursor: "pointer" }} 
                            onClick={submit}
                        >
                            <CardBody id={popular.groupCode}>
                                <Image id={popular.groupCode} w="100%" h="120px" objectFit="cover" src="" alt="" />
                                <VStack id={popular.groupCode} mt="5px" align="start" spacing={2}>
                                    <Text id={popular.groupCode} as="h4" fontSize="1em" fontWeight="bold">{popular.name}</Text>
                                    <Text id={popular.groupCode} as="h5" fontSize="0.9em" color="gray.600">{popular.description}</Text>
                                </VStack>
                            </CardBody>
                        </Card>
                    ))}
                </SimpleGrid>
            </form>
        </Box>
    );
};

export default ViewStudyMain;
