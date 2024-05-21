import { Box, Flex, Grid, Input } from '@chakra-ui/react';
import React from 'react';
import { Form } from 'react-router-dom';

const WriteResume = () => {
    return (
        <>
            <h2>이력서 작성</h2>
            <Form>
                <Flex flexDir={"column"}>
                    <Box id='user_info-container'>
                        <Input type='text' name='title' id='resume-title' />
                        <Input type='text' name='name' id='user-name' />
                        <Input type='number' name='age' id='user-age' />
                    </Box>
                    <Box id='career-container'>
                        <Input type='text' name='career1' id='resume-career1' />
                        <Input type='text' name='career2' id='resume-career2' />
                        <Input type='text' name='career3' id='resume-career3' />
                    </Box>
                    <Box id='academic-career-container'>
                        <Input type='text' name='academic-career1' id='resume-academic-career1' />
                        <Input type='text' name='academic-career2' id='resume-academic-career2' />
                        <Input type='text' name='academic-career3' id='resume-academic-career3' />
                    </Box>
                    <Box>
                        <Box id='certificate-container'>
                            <Input type='text' name='certificate1' id='resume-certificate1' />
                            <Input type='text' name='certificate2' id='resume-certificate2' />
                            <Input type='text' name='certificate3' id='resume-certificate3' />
                        </Box>
                        <Box id='language-container'>
                            <Input type='text' name='lanquage1' id='resume-lanquage1' />
                            <Input type='text' name='lanquage2' id='resume-lanquage2' />
                            <Input type='text' name='lanquage3' id='resume-lanquage3' />
                        </Box>
                    </Box>
                    <Box>
                        <Box id='skill-container'>
                            <Input type='text' name='skill1' id='resume-skill1' />
                            <Input type='text' name='skill2' id='resume-skill2' />
                            <Input type='text' name='skill3' id='resume-skill3' />
                        </Box>
                        <Box id='award-container'>
                            <Input type='text' name='award1' id='resume-award1' />
                            <Input type='text' name='award2' id='resume-award2' />
                            <Input type='text' name='award3' id='resume-award3' />
                        </Box>
                    </Box>
                </Flex>
            </Form>
        </>
    );
};

export default WriteResume;