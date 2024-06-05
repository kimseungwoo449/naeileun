import { Box, Button, Card, CardBody, Flex, HStack, Heading, Image, Stack, Text, useColorModeValue, SimpleGrid, VStack, Badge } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ViewBoardMain = () => {
    const navigate = useNavigate();

    const [boardList, setBoardList] = useState([]);
    const [postList, setPostList] = useState([]);
    const [page, setPage] = useState(1);

    const boardsPerPage = 4; // 페이지당 보여줄 게시판 수
    const pageCount = useRef(1);

    const buttonScheme = useColorModeValue("blackAlpha", "whiteAlpha");

    const movePage = (e) => {
        const classLength = e.target.classList.length;

        for (let i = 0; i < classLength; i++) {
            const command = e.target.classList.item(i);

            const boardCode = e.target.id;

            if (command === 'board-view') {
                navigate('/board/view', { state: { boardCode: boardCode, boardList: boardList } });
            }
            else if (command === 'board-detail') {
                const postCode = e.target.getAttribute("name");
                console.log("postCode : " + postCode);

                navigate('/board/detail', { state: { boardCode: boardCode, postCode: postCode, boardList: boardList } });
            }
        }
    }

    const fetchBoardAndPosts = async () => {
        const url = `${process.env.REACT_APP_SERVER_URL}/board`;

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

        if (data.status) {
            navigate('/board');
        } else {
            const totalBoards = data.result[0].length; // 총 게시판 수
            pageCount.current = Math.ceil(totalBoards / boardsPerPage);
            pageCount.current = pageCount.current > 15 ? 15 : pageCount.current;

            setBoardList(data.result[0]);
            setPostList(data.result[1]);
        }
    }

    useEffect(() => {
        console.log('useEffect');
        fetchBoardAndPosts();
    }, [page]);

    // 현재 페이지에 표시할 게시판 데이터
    const currentBoards = boardList.slice((page - 1) * boardsPerPage, page * boardsPerPage);

    return (
        <Box minW="980px" margin="auto">
            <form method='GET' action='{`${process.env.REACT_SERVER_URL}/boardDetail`}'>
                <HStack m="40px" justifyContent="start">
                    <Heading fontSize="2xl" color="black">인기 게시글</Heading>
                </HStack>
                <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={5} m="40px">
                    {postList.map((post, index) => (
                        <Card key={index} boxShadow="md" borderRadius="md" overflow="hidden" _hover={{ cursor: "pointer", backgroundColor: "gray.100" }} onClick={movePage} className="board-detail" id={post.boardCode} name={post.postCode}>
                            <CardBody className="board-detail" id={post.boardCode} name={post.postCode}>
                                <VStack align="start" spacing={3}>
                                    <Text fontSize='sm' className="board-detail" id={post.boardCode} name={post.postCode}>{post.userId}</Text>
                                    <Text fontSize='sm' className="board-detail" id={post.boardCode} name={post.postCode}>{post.writeDate}</Text>
                                    <Heading size="md" className="board-detail" id={post.boardCode} name={post.postCode}>{post.title}</Heading>
                                    <Text className="board-detail" id={post.boardCode} name={post.postCode}>{post.content}</Text>
                                    <Flex justifyContent={"space-between"} w="100%">
                                        <Badge className="board-detail" id={post.boardCode} name={post.postCode}>{post.boardName}</Badge>
                                        <Flex>
                                            <Text className="board-detail" id={post.boardCode} name={post.postCode}>👍 {post.recommendation}</Text>
                                            <Text className="board-detail" id={post.boardCode} name={post.postCode}>&emsp;💬 {post.commentCount}&emsp;</Text>
                                        </Flex>
                                    </Flex>
                                </VStack>
                            </CardBody>
                        </Card>
                    ))}
                </SimpleGrid>
                <HStack m="40px" justifyContent="start">
                    <Heading fontSize="2xl" color="black">게시판</Heading>
                </HStack>
                <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={5} m="40px">
                    {currentBoards.map((board, index) => (
                        <Card key={index} onClick={movePage} justifyContent={"center"} className="board-view" boxShadow="md" borderRadius="md" overflow="hidden" _hover={{ cursor: "pointer" }}>
                            <CardBody className="board-view" id={board.boardCode} display="flex" flexDirection="column" alignItems="center">
                                <Image className="board-view" id={board.boardCode} w={'150px'} h={'120px'} objectFit="cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFXOOcZnaslyfjPTGV4q_PlLC9Ypmg8kzTgBP5Nrg_FA&s" alt="" />
                                <VStack mt={'5px'} textAlign="center">
                                    <Heading size="sm" className="board-view" id={board.boardCode}>{board.boardName}</Heading>
                                    <Text className="board-view" id={board.boardCode} fontSize="0.9em" color="gray.600">{board.description}</Text>
                                </VStack>
                            </CardBody>
                        </Card>
                    ))}
                </SimpleGrid>
                <Flex mb={"40px"} justifyContent={"center"} wrap={"wrap"} margin={'50px'} gap={'5px'}>
                    {Array.from({ length: pageCount.current }, (_, index) => (
                        <Button
                            key={index}
                            colorScheme={page === index + 1 ? buttonScheme : "gray"}
                            onClick={() => setPage(index + 1)}
                        >
                            {index + 1}
                        </Button>
                    ))}
                </Flex>
            </form>
        </Box>
    );
};

export default ViewBoardMain;
