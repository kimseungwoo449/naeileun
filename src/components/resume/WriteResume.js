import { Box, Button, Flex, Grid, Input, Text, VStack, HStack, Select } from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import LoginContext, { useLogin } from '../LoginContext';

const WriteResume = () => {
    const navigate = useNavigate();
    const { user } = useLogin();
    const [careerShow, setCareerShow] = useState(false);
    console.log(user.name);

    const careerChange = e => {
        console.log(e.target.value);
        if (e.target.value === "newbie") {
            setCareerShow(false);
        } else {
            setCareerShow(true);
        }
    }

    const submit = e => {
        e.preventDefault();

        const splitValue = "wLYPvSwquc";

        const req = {
            "user_id": user.id,
            "name": e.target.name.value,
            "title": e.target.title.value,
            "user_age": e.target.age.value,
            "phone": e.target.phone.value,
            "is_newbie": e.target.careerable.value === "experienced-person" ? false : true,
            "career": careerShow ? e.target.career1.value + splitValue + e.target.career2.value + splitValue + e.target.career3.value : splitValue + splitValue,
            "academic_career": e.target.ac.value,
            "skill": e.target.skill1.value + splitValue + e.target.skill2.value + splitValue + e.target.skill3.value,
            "certificate": e.target.certificate1.value + splitValue + e.target.certificate2.value + splitValue + e.target.certificate3.value,
            "language": e.target.language1.value + splitValue + e.target.language2.value + splitValue + e.target.language3.value,
            "award": e.target.award1.value + splitValue + e.target.award2.value + splitValue + e.target.award3.value,
            "expected_salary": e.target.es.value === '' ? "회사 내규에 따름" : e.target.es.value,
            "expected_region": e.target.er1.value + splitValue + e.target.er2.value + splitValue + e.target.er3.value
        }

        console.log(req);

        fetch(`${process.env.REACT_APP_SERVER_URL}/resume`, {
            method: 'POST',
            headers: {
                Authorization: `ADMIN ${process.env.REACT_APP_ADMIN_KEY}`,
                "Content-Type": "application/json;charset=UTF8"
            },
            body: JSON.stringify(req),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);

                if (data.status) {
                    navigate('/');
                }
            });
    }

    return (
        <Box w={{ base: '90%', md: '1100px' }} m="auto" p={5} borderWidth="1px" borderRadius="lg" boxShadow="lg" bg="gray.50">
            <Form method='POST' action={`${process.env.REACT_APP_SERVER_URL}/resume`} onSubmit={submit}>
                <Flex direction="column" alignItems="center">
                    <Text as='b' fontSize="3xl" textAlign="center" mb={5} color="black">이력서 작성</Text>
                    <VStack spacing={6} align="stretch" w="100%">
                        <Box id='user_info-container' p={4} bg="white" borderRadius="md" boxShadow="sm">
                            <Input type='text' name='title' id='resume-title' placeholder='이력서 제목' mb={4} />
                            <Input type='text' name='name' id='user-name' placeholder='이름' mb={4} value={user.name} disabled />
                            <Input type='number' name='age' id='user-age' placeholder='나이' mb={4} value={user.age} disabled />
                            <Input type='phone' name='phone' id='user-phone' placeholder='핸드폰 번호' value={user.phone} disabled />
                        </Box>
                        <Select name='careerable' placeholder='경력유무' onChange={careerChange}>
                            <option value='newbie' selected>신입</option>
                            <option value='experienced-person'>경력</option>
                        </Select>
                        {
                            careerShow &&
                            <Box id='career-container' p={4} bg="white" borderRadius="md" boxShadow="sm">
                                <Text as='b' fontSize="xl" mb={4}>경력</Text>
                                <Input type='text' name='career1' id='resume-career1' placeholder='경력1' mb={4} />
                                <Input type='text' name='career2' id='resume-career2' placeholder='경력2' mb={4} />
                                <Input type='text' name='career3' id='resume-career3' placeholder='경력3' />
                            </Box>
                        }
                        <Box id='academic-career-container' p={4} bg="white" borderRadius="md" boxShadow="sm">
                            <Text as='b' fontSize="xl" mb={4}>학력</Text>
                            <Input type='text' name='ac' id='resume-academic-career' placeholder='최종학력' />
                        </Box>
                        <HStack spacing={4} w="100%">
                            <Box id='certificate-container' p={4} bg="white" borderRadius="md" boxShadow="sm" w="50%">
                                <Text as='b' fontSize="xl" mb={4}>자격증</Text>
                                <Input type='text' name='certificate1' id='resume-certificate1' placeholder='자격증1' mb={4} />
                                <Input type='text' name='certificate2' id='resume-certificate2' placeholder='자격증2' mb={4} />
                                <Input type='text' name='certificate3' id='resume-certificate3' placeholder='자격증3' />
                            </Box>
                            <Box id='language-container' p={4} bg="white" borderRadius="md" boxShadow="sm" w="50%">
                                <Text as='b' fontSize="xl" mb={4}>언어</Text>
                                <Input type='text' name='language1' id='resume-language1' placeholder='언어1' mb={4} />
                                <Input type='text' name='language2' id='resume-language2' placeholder='언어2' mb={4} />
                                <Input type='text' name='language3' id='resume-language3' placeholder='언어3' />
                            </Box>
                        </HStack>
                        <HStack spacing={4} w="100%">
                            <Box id='skill-container' p={4} bg="white" borderRadius="md" boxShadow="sm" w="50%">
                                <Text as='b' fontSize="xl" mb={4}>기술</Text>
                                <Input type='text' name='skill1' id='resume-skill1' placeholder='기술1' mb={4} />
                                <Input type='text' name='skill2' id='resume-skill2' placeholder='기술2' mb={4} />
                                <Input type='text' name='skill3' id='resume-skill3' placeholder='기술3' />
                            </Box>
                            <Box id='award-container' p={4} bg="white" borderRadius="md" boxShadow="sm" w="50%">
                                <Text as='b' fontSize="xl" mb={4}>수상이력</Text>
                                <Input type='text' name='award1' id='resume-award1' placeholder='수상이력1' mb={4} />
                                <Input type='text' name='award2' id='resume-award2' placeholder='수상이력2' mb={4} />
                                <Input type='text' name='award3' id='resume-award3' placeholder='수상이력3' />
                            </Box>
                        </HStack>
                        <Box id='expected-salary-container' p={4} bg="white" borderRadius="md" boxShadow="sm">
                            <Text as='b' fontSize="xl" mb={4}>희망연봉</Text>
                            <Input type='text' name='es' id='expected-salary' placeholder='회사 내규에 따름' />
                        </Box>
                        <Box id='expected-region-container' p={4} bg="white" borderRadius="md" boxShadow="sm">
                            <Text as='b' fontSize="xl" mb={4}>희망지역</Text>
                            <Input type='text' name='er1' id='expected-region1' placeholder='희망지역1' mb={4} />
                            <Input type='text' name='er2' id='expected-region2' placeholder='희망지역2' mb={4} />
                            <Input type='text' name='er3' id='expected-region3' placeholder='희망지역3' />
                        </Box>
                    </VStack>
                    <HStack spacing={4} mt={6}>
                        <Button type='submit' bg="teal.500" color="white" _hover={{ bg: 'teal.600' }}>저장하기</Button>
                        <Button bg="red.500" color="white" _hover={{ bg: 'red.600' }} onClick={() => navigate('/')}>취소하기</Button>
                    </HStack>
                </Flex>
            </Form>
        </Box>
    );
};

export default WriteResume;
