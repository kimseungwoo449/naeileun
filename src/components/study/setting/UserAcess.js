import {React, useState, useEffect} from 'react';
import { Heading, Box, HStack,Card,Image,Stack,CardBody,Text,Icon,Button} from '@chakra-ui/react';

const UserAcess = () =>{

    return(
        <>
            <Stack mt={'50px'} ml={'45px'}>
                <Text as={'b'} fontSize={'1.2em'} >멤버 승인</Text>
                <HStack>
                    <Text w={'140px'}>유저 아이디</Text>
                    <Text w={'220px'}>가입신청 내용</Text>
                    <Button h={'35px'} fontSize={'0.9em'}>거절</Button>
                    <Button h={'35px'} fontSize={'0.9em'} colorScheme='blue'>승인</Button>
                </HStack>
            </Stack>
        </>
    )
}

export default UserAcess;