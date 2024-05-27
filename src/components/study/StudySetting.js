import {React, useState, useEffect} from 'react';
import { Heading, Box, HStack,Card,Image,Stack,CardBody,Text,Icon} from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

const StudySetting = () =>{


    return(
        <>
            <Box>
                <HStack>
                    <Stack>
                        <Text>아이</Text>
                        <Text>아이</Text>
                    </Stack>
                    <Outlet />
                </HStack>
            </Box>
        </>
    );
}

export default StudySetting;