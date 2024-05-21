import { Box, Button, Flex, Grid, Input, Text } from '@chakra-ui/react';
import React from 'react';
import { Form } from 'react-router-dom';

const WriteResume = () => {
    return (
        <Box w={'70%'} m={'auto'}>
            <Form action={`${process.env.REACT_APP_SERVER_URL}/user/resume/writeAction`}>
                <Flex flexDir={'column'}>
                <Text as='b' fontSize={'2xl'} textAlign={'center'} mb={'20px'}>이력서 작성</Text>
                    <Box id='user_info-container' mb={'10px'} >
                        <Input type='text' name='title' id='resume-title' placeholder='이력서 제목' mb={'10px'} />
                        <Input type='text' name='name' id='user-name' placeholder='이름' mb={'10px'} />
                        <Input type='number' name='age' id='user-age' placeholder='나이' />
                    </Box>
                    <Box id='career-container' mb={'10px'}>
                        <Text as='b' fontSize={'xl'} >경력</Text>
                        <Input type='text' name='career1' id='resume-career1' placeholder='경력1' m={'10px 0 10px 0'} />
                        <Input type='text' name='career2' id='resume-career2' placeholder='경력2' mb={'10px'} />
                        <Input type='text' name='career3' id='resume-career3' placeholder='경력3' />
                    </Box>
                    <Box id='academic-career-container' mb={'10px'} >
                        <Text as='b' fontSize={'xl'}>학력</Text>
                        <Input type='text' name='academic-career1' id='resume-academic-career1' placeholder='학력1' m={'10px 0 10px 0'} />
                        <Input type='text' name='academic-career2' id='resume-academic-career2' placeholder='학력2' mb={'10px'} />
                        <Input type='text' name='academic-career3' id='resume-academic-career3' placeholder='학력3' />
                    </Box>
                    <Box  display={'flex'} mb={'10px'} >
                        <Box id='certificate-container' mr={'20px'} w={'50%'} >
                            <Text as='b' fontSize={'xl'} >자격증</Text>
                            <Input type='text' name='certificate1' id='resume-certificate1' placeholder='자격증1' m={'10px 0 10px 0'} />
                            <Input type='text' name='certificate2' id='resume-certificate2' placeholder='자격증2' mb={'10px'} />
                            <Input type='text' name='certificate3' id='resume-certificate3' placeholder='자격증3' />
                        </Box>
                        <Box id='language-container' w={'50%'} >
                            <Text as='b' fontSize={'xl'} >언어</Text>
                            <Input type='text' name='lanquage1' id='resume-lanquage1' placeholder='언어1' m={'10px 0 10px 0'} />
                            <Input type='text' name='lanquage2' id='resume-lanquage2' placeholder='언어2' mb={'10px'} />
                            <Input type='text' name='lanquage3' id='resume-lanquage3' placeholder='언어3' />
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
                            <Input type='text' name='award3' id='resume-award3' placeholder='수상이력3'/>
                        </Box>
                    </Box>
                    <Box alignSelf={'center'} w={'50%'} display={'grid'} gridTemplateColumns={'30% 30%'} justifyContent={'space-around'}>
                        <Input _hover={{cursor:'pointer'}} type='submit' value={'저장하기'} backgroundColor={'black'} color={'white'} />
                        <Button backgroundColor={'red'} color={'white'} >취소하기</Button>
                    </Box>
                </Flex>
                <Input type='hidden' name='command' value='write' />
            </Form>
        </Box>
    );
};

export default WriteResume;