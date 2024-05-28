import {React, useState, useEffect} from 'react';
import { Heading, Box, HStack,Card,Image,Stack,CardBody,Text,Icon,Button} from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

const StudySetting = () =>{


    return(
        <>
            <Box minH={'75vh'} ml={'50px'}>
                <HStack mt={'50px'}>
                    <Stack>
                        <Text as={'b'} fontSize={'1.2em'} fontStyle={''}>스터디그룹 관리</Text>
                        <Text>멤버승인</Text>
                        <Text>멤버관리</Text>
                    </Stack>
                    <Outlet />
                </HStack>
            </Box>
        </>
    );
}

export default StudySetting;