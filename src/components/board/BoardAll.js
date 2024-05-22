import { Box, Card, CardBody, HStack, Heading, Icon, Image, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { FaPlus } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const BoardAll = () => {
    const navigate = useNavigate();

    const myBoardList = null;
    const FaBoardList = null;
    

    const movePage = (e) =>{
        const command = e.target.id;
        console.log(command);
        if(command === "create-board"){
            navigate('/board/createAction');
            return;
        }
    }

    const submit= (e) =>{
        const form = document.querySelector('form');
        form.submit();
    }

    return(
        <>
            <Box minW={'700px'} ml={'150px'} >
                <form method='GET' action='{`${process.env.REACT_SERVER_URL}/boardDetail`}'>
                    <HStack m={'10px 10px'}>
                        <Heading fontSize={'1.3em'}>게시판</Heading>
                        <Heading as={'h3'} fontSize={'1em'} ml={'80px'}>게시판 생성</Heading>
                        
                        <Icon id="create-board" as={FaPlus} h={'22px'} w={'22px'} mt={'5px'} backgroundColor={'RGBA(0, 0, 0, 0.08)'} borderRadius={'3px'} onClick={movePage}/>

                        
                    </HStack>
                    <HStack wrap={"wrap"} minH={'200px'} gap={"10px"} m={"40px 10px"}>
                        <Card id="board-board-detail" boxSize={'200px'} _hover={{ cursor:"pointer"}} onClick={submit}>
                            <CardBody>
                                <input type='hidden' name="command" value="board-board-detail"></input>
                                <input type='hidden' name="code" value="4"></input>
                                <Image w={'150px'} h={'120px'} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFXOOcZnaslyfjPTGV4q_PlLC9Ypmg8kzTgBP5Nrg_FA&s" alt="" />
                                <Stack mt={'5px'}>
                                    <Text as={'h4'} fontSize={'0.8em'}>게시판 명</Text>
                                    <Text as={'h5'} fontSize={'0.7em'}>게시판 소개</Text>    
                                </Stack>
                            </CardBody>
                        </Card>
                    </HStack>
                    <HStack  m={'10px 10px'}>
                    <Heading fontSize={'1.3em'}>인기 게시글</Heading>
                    </HStack>
                    <HStack wrap={"wrap"} h={'200px'} gap={"10px"} m={"40px 10px"} _hover={{ cursor:"pointer"}}>
                        
                        {/* <Card boxSize={'200px'}>
                            <CardBody>
                                <Image w={'150px'} h={'120px'} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFXOOcZnaslyfjPTGV4q_PlLC9Ypmg8kzTgBP5Nrg_FA&s" alt="" />
                                <Stack mt={'5px'}>                                    <Text as={'h4'} fontSize={'0.8em'}>스터디 그룹명</Text>
                                    <Text as={'h5'} fontSize={'0.7em'}>스터디 소개명</Text>    
                                </Stack>
                            </CardBody>
                        </Card> */}

                    </HStack>

                </form>
                
            </Box>
        </>
    )
};

export default BoardAll;