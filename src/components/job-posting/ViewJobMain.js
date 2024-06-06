import React, { useEffect, useState } from 'react';
import { Box, SimpleGrid, Skeleton, Text, Card, CardBody, HStack, Heading, VStack, Badge } from '@chakra-ui/react';

const ViewJobMain = () => {
    const [jobData, setJobData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lastIndex, setLastIndex] = useState();

    useEffect(() => {
        fetch(`http://openapi.seoul.go.kr:8088/${process.env.REACT_APP_OPEN_API_KEY}/json/GetJobInfo/1/1/`)
            .then(response => response.json())
            .then(data => {
                if (data.GetJobInfo && data.GetJobInfo.list_total_count) {
                    setLastIndex(data.GetJobInfo.list_total_count);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching job data:', error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (lastIndex) {
            setLoading(true);
            fetch(`http://openapi.seoul.go.kr:8088/${process.env.REACT_APP_OPEN_API_KEY}/json/GetJobInfo/${lastIndex - 3}/${lastIndex}/`)
                .then(response => response.json())
                .then(data => {
                    if (data.GetJobInfo && data.GetJobInfo.row) {
                        setJobData(data.GetJobInfo.row);
                    } else {
                        console.error('No job data found');
                    }
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching job data:', error);
                    setLoading(false);
                });
        }
    }, [lastIndex]);

    return (
        <Box p={4}>
            <HStack m="40px" justifyContent="start">
                <Heading fontSize="2xl" color="black">실시간 채용공고</Heading>
            </HStack>
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={5}>
                {loading ? (
                    Array.from({ length: 4 }).map((_, index) => (
                        <Skeleton key={index} height="200px" borderRadius="md" />
                    ))
                ) : (
                    jobData.map((job, index) => (
                        <Card key={index} borderRadius="md" overflow="hidden" boxShadow="md">
                            <CardBody>
                                <VStack align="start" spacing={3}>
                                    <Heading size="md">{job.CMPNY_NM}</Heading>
                                    <Text color="gray.500">{job.JO_SJ}</Text>
                                    <Badge colorScheme="green">{job.HOPE_WAGE}</Badge>
                                    <Text>{job.WORK_PARAR_BASS_ADRES_CN}</Text>
                                    <Text color="gray.600" fontSize="sm">{job.RCEPT_CLOS_NM}</Text>
                                </VStack>
                            </CardBody>
                        </Card>
                    ))
                )}
            </SimpleGrid>
        </Box>
    );
};

export default ViewJobMain;
