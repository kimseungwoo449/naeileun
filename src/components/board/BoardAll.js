import { Box, Button, Card, CardBody, HStack, Heading, Icon, Image, Stack, Table, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const BoardAll = () => {
    const navigate = useNavigate();

    const [boardList, setBoardList] = useState([]);
    const [postList, setPostList] = useState([]);
    const [page, setPage] = useState(1);

    const pageCount = useRef(1);

    const buttonScheme = useColorModeValue("blackAlpha", "whiteAlpha");
    
    const movePage = (e)=>{
        const command = e.target.id;
        const code = e.target.getAttribute("name");
        console.log("code : "+code);
        console.log("command : "+command);
        
        if(command === 'board-view')
            navigate('/board/view', {state : {code: code}});
    }

    const submit= (e) =>{
        const form = document.querySelector('form');
        form.submit();
    }

    const fetchBoardAndPosts = async() => {
        console.log('fetchBoardAndPosts');
        console.log('${process.env.REACT_APP_SERVER_URL}:', process.env.REACT_APP_SERVER_URL);
        console.log('Authorization:', process.env.REACT_APP_ADMIN_KEY);
        const url = `${process.env.REACT_APP_SERVER_URL}/board`;
        console.log('Fetching posts from:', url);
        const response = await fetch(
            url,
            {
                method: "GET",
                headers: {
                    Authorization: `ADMIN ${process.env.REACT_APP_ADMIN_KEY}`
                },
            }
        );

        const data = await response.json();
        console.log(data);

        if(data.status){
            navigate('/board');
        } else {
            pageCount.current = data.meta.pageable_count % 8 > 0 ? data.meta.pageable_count / 8 + 1 : data.meta.pageable_count / 8;
            pageCount.current = Math.floor(pageCount.current);
            pageCount.current = pageCount.current > 15 ? 15 : pageCount.current;
    
            console.log("pageCount.current : "+pageCount.current);
            setBoardList(data.result[0]);
            setPostList(data.result[1]);
        }

    }

    useEffect(() => {
        console.log('useEffect');
        fetchBoardAndPosts();
    }, [page]);


    return(
        <>
            <Box minW={'700px'} ml={'150px'} margin={"auto"}>
                <form method='GET' action='{`${process.env.REACT_SERVER_URL}/boardDetail`}'>
                    <HStack m={'10px 10px'}>
                        <Heading fontSize={'1.3em'}>게시판</Heading>
                        <Heading as={'h3'} fontSize={'1em'} ml={'80px'}>게시판 생성</Heading>
                        
                        <Icon id="create-board" as={FaPlus} h={'22px'} w={'22px'} mt={'5px'} backgroundColor={'RGBA(0, 0, 0, 0.08)'} borderRadius={'3px'} onClick={movePage}/>

                        
                    </HStack>
                    <HStack justifyContent={"space-between"} wrap={"wrap"} minH={'200px'} gap={"50px"} m={"40px 10px"} width={'1000px'}>
                        {boardList.map((board, index) => (
                            
                            <Card onClick={movePage} justifyContent={"center"} id="board-view" boxSize={'200px'} _hover={{ cursor:"pointer"}}>
                                <CardBody id="board-view" name={board.boardCode}>
                                    <Image id="board-view" name={board.boardCode} w={'150px'} h={'120px'} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFXOOcZnaslyfjPTGV4q_PlLC9Ypmg8kzTgBP5Nrg_FA&s" alt="" />
                                    <Stack mt={'5px'}>
                                        <Text id="board-view" name={board.boardCode} as={'h4'} fontSize={'0.8em'}>{board.boardName}</Text>
                                        <Text id="board-view" name={board.boardCode} as={'h5'} fontSize={'0.7em'}>{board.description}</Text>    
                                    </Stack>
                                </CardBody>
                            </Card>
                        ))}
                    </HStack>
                    <HStack mb={"40px"} justifyContent={"center"} wrap={"wrap"} margin={'50px'}>
                        {Array.from({ length: pageCount.current }, (_, index) => (
                            <>
                            <Button
                                colorScheme={page === index + 1 ? "gray" : buttonScheme}
                                onClick={(e) => {
                                setPage(index + 1);
                                }}
                            >
                                {index + 1}
                            </Button>
                            </>
                        ))}
                    </HStack>
                    <HStack  m={'10px 10px'}>
                    <Heading fontSize={'1.3em'}>인기 게시글</Heading>
                    </HStack>
                    <HStack wrap={"wrap"} h={'200px'} gap={"10px"} _hover={{ cursor:"pointer"}}>
                        <TableContainer w={"1000px"}>
                            <Table  m={"40px 0"}>
                                <Thead>
                                    <Tr>
                                        <Th>작성자</Th>
                                        <Th>제목</Th>
                                        <Th>추천수</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {postList.map((post, index) => (
                                        <>
                                            <Tr>
                                                <Td>{post.userId}</Td>
                                                <Td>{post.title}</Td>
                                                <Td>{post.recommandation}</Td>
                                            </Tr>
                                        </>
                                    ))}
                                </Tbody>
                                <Tfoot>
                                </Tfoot>
                            </Table>
                        </TableContainer>
                    </HStack>

                </form>
                
            </Box>
        </>
    )
};

export default BoardAll;