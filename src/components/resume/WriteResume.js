import { Box, Button, Flex, Grid, Input, Text } from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import { Form, useNavigate, useParams} from 'react-router-dom';
import { useLogin } from '../LoginContext';

const WriteResume = () => {
    const navigate = useNavigate();
    const { user } = useLogin();

    const submit = e => {
        e.preventDefault();
    
        const splitValue = "wLYPvSwquc";
    
        const req = {
            "user_id": user.id,
            "name": e.target.name.value,
            "title": e.target.title.value,
            "user_age": e.target.age.value,
            "academic_career": e.target.ac1.value + splitValue + e.target.ac2.value + splitValue + e.target.ac3.value,
            "career": e.target.career1.value + splitValue + e.target.career2.value + splitValue + e.target.career3.value,
            "skill": e.target.skill1.value + splitValue + e.target.skill2.value + splitValue + e.target.skill3.value,
            "certificate": e.target.certificate1.value + splitValue + e.target.certificate2.value + splitValue + e.target.certificate3.value,
            "language": e.target.language1.value + splitValue + e.target.language2.value + splitValue + e.target.language3.value,
            "award": e.target.award1.value + splitValue + e.target.award2.value + splitValue + e.target.award3.value,
            "split_value": splitValue
        }
    
    
    
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

                if(data.status){
                    navigate('/');
                }else{
                    navigate('/resume/write');
                }
            });
    }


    return (
        <Box w={'70%'} m={'auto'}>
            <Form method='POST' action={`${process.env.REACT_APP_SERVER_URL}/resume`} onSubmit={submit}>
                <Flex flexDir={'column'}>
                    <Text as='b' fontSize={'2xl'} textAlign={'center'} mb={'20px'}>이력서 작성</Text>
                    <Box id='user_info-container' mb={'10px'} >
                        <Input type='text' name='title' id='resume-title' placeholder='이력서 제목' mb={'10px'} />
                        <Input type='text' name='name' id='user-name' placeholder='이름' mb={'10px'} value={user.name} disabled/>
                        <Input type='number' name='age' id='user-age' placeholder='나이' value={user.age} disabled />
                    </Box>
                    <Box id='career-container' mb={'10px'}>
                        <Text as='b' fontSize={'xl'} >경력</Text>
                        <Input type='text' name='career1' id='resume-career1' placeholder='경력1' m={'10px 0 10px 0'} />
                        <Input type='text' name='career2' id='resume-career2' placeholder='경력2' mb={'10px'} />
                        <Input type='text' name='career3' id='resume-career3' placeholder='경력3' />
                    </Box>
                    <Box id='academic-career-container' mb={'10px'} >
                        <Text as='b' fontSize={'xl'}>학력</Text>
                        <Input type='text' name='ac1' id='resume-academic-career1' placeholder='학력1' m={'10px 0 10px 0'} />
                        <Input type='text' name='ac2' id='resume-academic-career2' placeholder='학력2' mb={'10px'} />
                        <Input type='text' name='ac3' id='resume-academic-career3' placeholder='학력3' />
                    </Box>
                    <Box display={'flex'} mb={'10px'} >
                        <Box id='certificate-container' mr={'20px'} w={'50%'} >
                            <Text as='b' fontSize={'xl'} >자격증</Text>
                            <Input type='text' name='certificate1' id='resume-certificate1' placeholder='자격증1' m={'10px 0 10px 0'} />
                            <Input type='text' name='certificate2' id='resume-certificate2' placeholder='자격증2' mb={'10px'} />
                            <Input type='text' name='certificate3' id='resume-certificate3' placeholder='자격증3' />
                        </Box>
                        <Box id='language-container' w={'50%'} >
                            <Text as='b' fontSize={'xl'} >언어</Text>
                            <Input type='text' name='language1' id='resume-language1' placeholder='언어1' m={'10px 0 10px 0'} />
                            <Input type='text' name='language2' id='resume-language2' placeholder='언어2' mb={'10px'} />
                            <Input type='text' name='language3' id='resume-language3' placeholder='언어3' />
                        </Box>
                    </Box>
                    <Box display={'flex'} mb={'10px'}>
                        <Box id='skill-container' mr={'20px'} w={'50%'} >
                            <Text as='b' fontSize={'xl'} >기술</Text>
                            <Input type='text' name='skill1' id='resume-skill1' placeholder='기술1' m={'10px 0 10px 0'} />
                            <Input type='text' name='skill2' id='resume-skill2' placeholder='기술2' mb={'10px'} />
                            <Input type='text' name='skill3' id='resume-skill3' placeholder='기술3' />
                        </Box>
                        <Box id='award-container' w={'50%'} >
                            <Text as='b' fontSize={'xl'} >수상이력</Text>
                            <Input type='text' name='award1' id='resume-award1' placeholder='수상이력1' m={'10px 0 10px 0'} />
                            <Input type='text' name='award2' id='resume-award2' placeholder='수상이력2' mb={'10px'} />
                            <Input type='text' name='award3' id='resume-award3' placeholder='수상이력3' />
                        </Box>
                    </Box>
                    <Box alignSelf={'center'} w={'50%'} display={'grid'} gridTemplateColumns={'30% 30%'} justifyContent={'space-around'}>
                        <Input _hover={{ cursor: 'pointer' }} type='submit' value={'저장하기'} backgroundColor={'black'} color={'white'} />
                        <Button backgroundColor={'red'} color={'white'} >취소하기</Button>
                    </Box>
                </Flex>
                <Input type='hidden' name='id' value={'djdjdjd'} />
            </Form>
        </Box>
    );
};

export default WriteResume;