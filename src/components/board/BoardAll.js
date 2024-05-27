import { Box, Button, Card, CardBody, Flex, Heading, Icon, Image, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const BoardAll = () => {
    const navigate = useNavigate();

    const [boardList, setBoardList] = useState([]);
    const [postList, setPostList] = useState([]);
    const [page, setPage] = useState(1);

    const boardsPerPage = 8; // 페이지당 보여줄 게시판 수
    const pageCount = useRef(1);

    const buttonScheme = useColorModeValue("blackAlpha", "whiteAlpha");

    const movePage = (e) => {
        const command = e.target.id;
        const code = e.target.getAttribute("name");
        const board = boardList;

        console.log("board : " + board);
        console.log("code : " + code);
        console.log("command : " + command);

        if (command === 'board-view')
            navigate('/board/view', { state: { code: code, board: board } } );
    }

    const fetchBoardAndPosts = async () => {
        console.log('fetchBoardAndPosts');
        console.log(`${process.env.REACT_APP_SERVER_URL}:`, process.env.REACT_APP_SERVER_URL);
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

        if (data.status) {
            navigate('/board');
        } else {
            const totalBoards = data.result[0].length; // 총 게시판 수
            pageCount.current = Math.ceil(totalBoards / boardsPerPage);
            pageCount.current = pageCount.current > 15 ? 15 : pageCount.current;

            console.log("totalBoards: " + totalBoards);
            console.log("pageCount.current: " + pageCount.current);

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
        <>
            <Box minW={'700px'} ml={'150px'} margin={"auto"}>
                <form method='GET' action='{`${process.env.REACT_SERVER_URL}/boardDetail`}'>
                    <Flex m={'10px 10px'} alignItems="center">
                        <Heading fontSize={'1.3em'}>게시판</Heading>
                        <Heading as={'h3'} fontSize={'1em'} ml={'80px'}>게시판 생성</Heading>
                        
                        <Icon id="create-board" as={FaPlus} h={'22px'} w={'22px'} mt={'5px'} backgroundColor={'RGBA(0, 0, 0, 0.08)'} borderRadius={'3px'} onClick={movePage} />
                    </Flex>
                    <Flex justifyContent={"flex-start"} wrap={"wrap"} h={'600px'} gap={"50px"} m={"40px 10px"} p={"0px 0px 0px 22px"} width={'1000px'}>
                        {currentBoards.map((board, index) => (
                            <Card key={index} onClick={movePage} justifyContent={"center"} id="board-view" boxSize={'200px'} height={'250px'} _hover={{ cursor: "pointer" }}>
                                <CardBody id="board-view" name={board.boardCode} display="flex" flexDirection="column" alignItems="center">
                                    <Image id="board-view" name={board.boardCode} w={'150px'} h={'120px'} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFXOOcZnaslyfjPTGV4q_PlLC9Ypmg8kzTgBP5Nrg_FA&s" alt="" />
                                    <Stack mt={'5px'} textAlign="center">
                                        <Text id="board-view" name={board.boardCode} as={'h4'} fontSize={'0.8em'}>{board.boardName}</Text>
                                        <Text id="board-view" name={board.boardCode} as={'h5'} fontSize={'0.7em'}>{board.description}</Text>
                                    </Stack>
                                </CardBody>
                            </Card>
                        ))}
                    </Flex>
                    <Flex mb={"40px"} justifyContent={"center"} wrap={"wrap"} margin={'50px'}>
                        {Array.from({ length: pageCount.current }, (_, index) => (
                            <Button
                                key={index}
                                colorScheme={page === index + 1 ? buttonScheme : "gray"}
                                onClick={(e) => {
                                    setPage(index + 1);
                                }}
                            >
                                {index + 1}
                            </Button>
                        ))}
                    </Flex>
                    <Flex m={'10px 10px'} alignItems="center">
                        <Heading fontSize={'1.3em'}>인기 게시글</Heading>
                    </Flex>
                    <Stack wrap={"wrap"} gap={"10px"}>
                        {postList.map((post, index) => (
                            <Box
                                key={index}
                                borderWidth={"1px"}
                                borderRadius={"lg"}
                                p={"10px"}
                                _hover={{ cursor: "pointer", backgroundColor: "gray.100" }}
                                onClick={() => navigate(`/post/view/${post.postId}`)}
                            >
                                <Flex justifyContent={"space-between"}>
                                    <Text fontSize='sm'>{post.userId}</Text>
                                    <Text fontSize='sm'>{post.writeDate}</Text>
                                </Flex>
                                <Box mt={"5px"}>
                                    <Text fontSize='xl' fontWeight={"bold"}>{post.title}</Text>
                                    <Text>{post.content}</Text>
                                </Box>
                                <Flex justifyContent={"space-between"} mt={"5px"}>
                                    <Text>{post.boardName}</Text>
                                    <Flex>
                                        <Text>👍 {post.recommendation}</Text>
                                        <Text>💬 {post.comments}</Text>
                                    </Flex>
                                </Flex>
                            </Box>
                        ))}
                    </Stack>
                </form>
            </Box>
        </>
    )
};

export default BoardAll;
