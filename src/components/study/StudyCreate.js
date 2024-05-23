import {React} from 'react';

import {Box, HStack,Input,Text,Textarea} from '@chakra-ui/react';



const StudyCreate = () =>{




    return(
        <>
        <Box h={'80vh'} w={'600px'} m={"auto"}  mt={"100px"}>
            <form method="POST" action="/study/create">
                <HStack>
                    <Text as="h2" fontSize={"2xl"} margin={"auto"} mb={"30px"}>스터디 생성하기</Text>
                </HStack>
                
                <HStack>
                    <Input w={"400px"} m={"auto"} placeholder="스터디 그룹 이름" mb={"20px"}></Input>
                </HStack>
                <HStack>
                    <Textarea h={"250px"} w={"400px"} m={"auto"} placeholder="스터디 그룹 설명" mb={"30px"}></Textarea>
                </HStack>

            </form>
        </Box>
        </>
    )
}

export default StudyCreate;