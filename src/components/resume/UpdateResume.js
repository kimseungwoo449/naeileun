import { Box, Button, Flex, HStack, Input, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Form, useNavigate, useParams } from 'react-router-dom';

const UpdateResume = () => {
    const [resume, setResume] = useState({});
    const [formValues, setFormValues] = useState({
        title: '',
        career1: '',
        career2: '',
        career3: '',
        ac1: '',
        ac2: '',
        ac3: '',
        certificate1: '',
        certificate2: '',
        certificate3: '',
        language1: '',
        language2: '',
        language3: '',
        skill1: '',
        skill2: '',
        skill3: '',
        award1: '',
        award2: '',
        award3: '',
    });
    const { resumeCode } = useParams();
    const navigate = useNavigate();
    const splitValue = 'wLYPvSwquc';
    const userStr = sessionStorage.getItem('user');
    const user = JSON.parse(userStr);

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
                setResume(data);
                setFormValues({
                    title: data.title || '',
                    career1: data.career?.split(splitValue)[0] || '',
                    career2: data.career?.split(splitValue)[1] || '',
                    career3: data.career?.split(splitValue)[2] || '',
                    ac1: data.academic_career?.split(splitValue)[0] || '',
                    ac2: data.academic_career?.split(splitValue)[1] || '',
                    ac3: data.academic_career?.split(splitValue)[2] || '',
                    certificate1: data.certificate?.split(splitValue)[0] || '',
                    certificate2: data.certificate?.split(splitValue)[1] || '',
                    certificate3: data.certificate?.split(splitValue)[2] || '',
                    language1: data.language?.split(splitValue)[0] || '',
                    language2: data.language?.split(splitValue)[1] || '',
                    language3: data.language?.split(splitValue)[2] || '',
                    skill1: data.skill?.split(splitValue)[0] || '',
                    skill2: data.skill?.split(splitValue)[1] || '',
                    skill3: data.skill?.split(splitValue)[2] || '',
                    award1: data.award?.split(splitValue)[0] || '',
                    award2: data.award?.split(splitValue)[1] || '',
                    award3: data.award?.split(splitValue)[2] || '',
                });
            });
    };

    useEffect(() => {
        fetchResume();
        if(user==null||user.id!==resume.user_id){
            navigate("/");
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const submit = e => {
        e.preventDefault();

        const req = {
            "user_id": user.id,
            "name": resume.name,
            "title": formValues.title,
            "user_age": resume.user_age,
            "academic_career": formValues.ac1 + splitValue + formValues.ac2 + splitValue + formValues.ac3,
            "career": formValues.career1 + splitValue + formValues.career2 + splitValue + formValues.career3,
            "skill": formValues.skill1 + splitValue + formValues.skill2 + splitValue + formValues.skill3,
            "certificate": formValues.certificate1 + splitValue + formValues.certificate2 + splitValue + formValues.certificate3,
            "language": formValues.language1 + splitValue + formValues.language2 + splitValue + formValues.language3,
            "award": formValues.award1 + splitValue + formValues.award2 + splitValue + formValues.award3,
            "resume_code": resumeCode
        };

        fetch(`${process.env.REACT_APP_SERVER_URL}/resume`, {
            method: 'PUT',
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
                } else {
                    navigate(`/resume/update/${resumeCode}`);
                }
            });
    };

    return (
        <Box w={{ base: '90%', md: '70%' }} m="auto" p={5} borderWidth="1px" borderRadius="lg" boxShadow="lg" bg="gray.50">
            <Form method='POST' action={`${process.env.REACT_APP_SERVER_URL}/resume`} onSubmit={submit}>
                <Flex direction="column" alignItems="center">
                    <Text as='b' fontSize="3xl" textAlign="center" mb={5} color="black">이력서 수정</Text>
                    <VStack spacing={6} align="stretch" w="100%">
                        <Box id='user_info-container' p={4} bg="white" borderRadius="md" boxShadow="sm">
                            <Input
                                type='text'
                                name='title'
                                id='resume-title'
                                placeholder='이력서 제목'
                                mb={4}
                                value={formValues.title}
                                onChange={handleInputChange}
                            />
                            <Input
                                type='text'
                                name='name'
                                id='user-name'
                                placeholder='이름'
                                mb={4}
                                value={resume.name}
                                disabled
                            />
                            <Input
                                type='number'
                                name='age'
                                id='user-age'
                                placeholder='나이'
                                value={resume.user_age}
                                disabled
                            />
                        </Box>
                        <Box id='career-container' p={4} bg="white" borderRadius="md" boxShadow="sm">
                            <Text as='b' fontSize="xl" mb={4}>경력</Text>
                            <Input
                                type='text'
                                name='career1'
                                id='resume-career1'
                                placeholder='경력1'
                                mb={4}
                                value={formValues.career1}
                                onChange={handleInputChange}
                            />
                            <Input
                                type='text'
                                name='career2'
                                id='resume-career2'
                                placeholder='경력2'
                                mb={4}
                                value={formValues.career2}
                                onChange={handleInputChange}
                            />
                            <Input
                                type='text'
                                name='career3'
                                id='resume-career3'
                                placeholder='경력3'
                                value={formValues.career3}
                                onChange={handleInputChange}
                            />
                        </Box>
                        <Box id='academic-career-container' p={4} bg="white" borderRadius="md" boxShadow="sm">
                            <Text as='b' fontSize="xl" mb={4}>학력</Text>
                            <Input
                                type='text'
                                name='ac1'
                                id='resume-academic-career1'
                                placeholder='학력1'
                                mb={4}
                                value={formValues.ac1}
                                onChange={handleInputChange}
                            />
                            <Input
                                type='text'
                                name='ac2'
                                id='resume-academic-career2'
                                placeholder='학력2'
                                mb={4}
                                value={formValues.ac2}
                                onChange={handleInputChange}
                            />
                            <Input
                                type='text'
                                name='ac3'
                                id='resume-academic-career3'
                                placeholder='학력3'
                                value={formValues.ac3}
                                onChange={handleInputChange}
                            />
                        </Box>
                        <HStack spacing={4} w="100%">
                            <Box id='certificate-container' p={4} bg="white" borderRadius="md" boxShadow="sm" w="50%">
                                <Text as='b' fontSize="xl" mb={4}>자격증</Text>
                                <Input
                                    type='text'
                                    name='certificate1'
                                    id='resume-certificate1'
                                    placeholder='자격증1'
                                    mb={4}
                                    value={formValues.certificate1}
                                    onChange={handleInputChange}
                                />
                                <Input
                                    type='text'
                                    name='certificate2'
                                    id='resume-certificate2'
                                    placeholder='자격증2'
                                    mb={4}
                                    value={formValues.certificate2}
                                    onChange={handleInputChange}
                                />
                                <Input
                                    type='text'
                                    name='certificate3'
                                    id='resume-certificate3'
                                    placeholder='자격증3'
                                    value={formValues.certificate3}
                                    onChange={handleInputChange}
                                />
                            </Box>
                            <Box id='language-container' p={4} bg="white" borderRadius="md" boxShadow="sm" w="50%">
                                <Text as='b' fontSize="xl" mb={4}>언어</Text>
                                <Input
                                    type='text'
                                    name='language1'
                                    id='resume-language1'
                                    placeholder='언어1'
                                    mb={4}
                                    value={formValues.language1}
                                    onChange={handleInputChange}
                                />
                                <Input
                                    type='text'
                                    name='language2'
                                    id='resume-language2'
                                    placeholder='언어2'
                                    mb={4}
                                    value={formValues.language2}
                                    onChange={handleInputChange}
                                />
                                <Input
                                    type='text'
                                    name='language3'
                                    id='resume-language3'
                                    placeholder='언어3'
                                    value={formValues.language3}
                                    onChange={handleInputChange}
                                />
                            </Box>
                        </HStack>
                        <HStack spacing={4} w="100%">
                            <Box id='skill-container' p={4} bg="white" borderRadius="md" boxShadow="sm" w="50%">
                                <Text as='b' fontSize="xl" mb={4}>기술</Text>
                                <Input
                                    type='text'
                                    name='skill1'
                                    id='resume-skill1'
                                    placeholder='기술1'
                                    mb={4}
                                    value={formValues.skill1}
                                    onChange={handleInputChange}
                                />
                                <Input
                                    type='text'
                                    name='skill2'
                                    id='resume-skill2'
                                    placeholder='기술2'
                                    mb={4}
                                    value={formValues.skill2}
                                    onChange={handleInputChange}
                                />
                                <Input
                                    type='text'
                                    name='skill3'
                                    id='resume-skill3'
                                    placeholder='기술3'
                                    value={formValues.skill3}
                                    onChange={handleInputChange}
                                />
                            </Box>
                            <Box id='award-container' p={4} bg="white" borderRadius="md" boxShadow="sm" w="50%">
                                <Text as='b' fontSize="xl" mb={4}>수상이력</Text>
                                <Input
                                    type='text'
                                    name='award1'
                                    id='resume-award1'
                                    placeholder='수상이력1'
                                    mb={4}
                                    value={formValues.award1}
                                    onChange={handleInputChange}
                                />
                                <Input
                                    type='text'
                                    name='award2'
                                    id='resume-award2'
                                    placeholder='수상이력2'
                                    mb={4}
                                    value={formValues.award2}
                                    onChange={handleInputChange}
                                />
                                <Input
                                    type='text'
                                    name='award3'
                                    id='resume-award3'
                                    placeholder='수상이력3'
                                    value={formValues.award3}
                                    onChange={handleInputChange}
                                />
                            </Box>
                        </HStack>
                    </VStack>
                    <HStack spacing={4} mt={6}>
                        <Button type="submit" bg="teal.500" color="white" _hover={{ bg: 'teal.600' }}>저장하기</Button>
                        <Button bg="red.500" color="white" _hover={{ bg: 'red.600' }} onClick={() => navigate('/')}>취소하기</Button>
                    </HStack>
                </Flex>
            </Form>
        </Box>
    );
};

export default UpdateResume;
