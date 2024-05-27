import {React, useState, useEffect} from 'react';
import { Heading, Box, HStack,Card,Image,Stack,CardBody,Text,Icon,Button} from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

const StudySetting = () =>{


    return(
        <>
            <Box minH={'75vh'} ml={'50px'}>
                <HStack>
                    <Stack>
                        <Text as={'b'} fontSize={'1.2em'} fontStyle={''} mt={'50px'}>스터디그룹 관리</Text>
                        <Button>멤버승인</Button>
                        <Button>멤버관리</Button>
                    </Stack>
                    <Outlet />
                </HStack>
            </Box>
        </>
    );
}

export default StudySetting;