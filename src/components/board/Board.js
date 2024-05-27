import { Box, Button, Flex, HStack, Heading, Input, Menu, MenuButton, MenuItem, MenuList, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';
import { TiArrowUnsorted } from 'react-icons/ti';
import { useLocation, useNavigate } from 'react-router-dom';

const Board = () => {
    const navigate = useNavigate();

    const [postList, setPostList] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');

    const pageCount = useRef(1);

    const buttonScheme = useColorModeValue("blackAlpha", "whiteAlpha");

    const location = useLocation();
    const code = location.state.code;
    const boardList = location.state.board;
    console.log("code: " + code)
    console.log("boardList: " + boardList)
    
    const movePage = (e) => {
        const command = e.target.id;
        const bordCode = code;
        const postCode = e.target.getAttribute("name");
        const board = boardList;

        console.log("board : " + board);
        console.log("postCode : " + postCode);
        console.log("command : " + command);

        if (command === 'board-detail')
            navigate('/board/detail', { state: { bordCode: bordCode, postCode: postCode, board: board } } );
    }

    const fetchPosts = async () => {
        const url = `${process.env.REACT_APP_SERVER_URL}/board/view/${code}`;
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
            pageCount.current = Math.ceil(data.meta.pageable_count / 10);
            pageCount.current = Math.min(pageCount.current, 15);

            setPostList(data.result);
        }
    }

    const changeSearch = e => {
        setSearch(e.target.value);
    }

    useEffect(() => {
        fetchPosts();
    }, [page, search]);

    return (
        // Flex 컨테이너를 사용하여 전체 레이아웃을 세로로 정렬합니다.
        <Flex minW={'900px'} ml={'150px'} margin={"auto"} direction="column">
            {/* 상단 헤더 및 검색창 */}
            <Box p="6">
                {boardList.map((board, index) => (
                    <Heading size='lg' mb="4">{board.boardCode == code ? board.boardName : ""}</Heading>
                ))}
                <Menu>
                    <MenuButton as={Button} rightIcon={<RiArrowDownSLine />}>
                        게시판 선택
                    </MenuButton>
                    <MenuList>
                        {boardList.map((board, index) => (
                            <MenuItem key={index}>{board.boardName}</MenuItem>
                        ))}
                    </MenuList>
                </Menu>
                <Input 
                    placeholder="검색어 입력" 
                    size="md" 
                    w={"300px"} 
                    mt="4" 
                    value={search}
                    onChange={changeSearch}
                />
                <Menu>
                    <MenuButton as={Button} rightIcon={<TiArrowUnsorted />}>
                        통합 검색
                    </MenuButton>
                    <MenuList>
                        <MenuItem>제목 검색</MenuItem>
                        <MenuItem>작성자 아이디</MenuItem>
                    </MenuList>
                </Menu>
            </Box>

            {/* 게시글 목록 */}
            <Box p="6" minHeight="70vh">
                {postList.map((post, index) => (
                    <Box onClick={movePage} id = "board-detail"  name={post.postCode} key={index} p="4" borderWidth="1px" borderRadius="md" mb="4" _hover={{ cursor: "pointer" }}>
                        <Text id = "board-detail"  name={post.postCode} fontSize='xl' fontWeight={"bold"}>{post.title}</Text>
                        <Text id = "board-detail"  name={post.postCode}>{post.content}</Text>
                        <HStack id = "board-detail"  name={post.postCode} spacing="4" mt="2">
                            <Text id = "board-detail"  name={post.postCode}>작성자 {post.userId}</Text>
                            <Text id = "board-detail"  name={post.postCode}>추천 {post.recommandation}</Text>
                            <Text id = "board-detail"  name={post.postCode}>댓글 {post.comments}</Text>
                            <Text id = "board-detail"  name={post.postCode}>작성일자 {post.writeDate}</Text>
                        </HStack>
                    </Box>
                ))}
            </Box>

            {/* 페이지 네비게이션 */}
            <Box mt="6" mb="4" textAlign="center">
                <HStack spacing="4" justify="center">
                    {Array.from({ length: pageCount.current }, (_, index) => (
                        <Button
                            key={index}
                            colorScheme={page === index + 1 ? "gray" : buttonScheme}
                            onClick={() => setPage(index + 1)}
                        >
                            {index + 1}
                        </Button>
                    ))}
                </HStack>
            </Box>
        </Flex>
    );
};

export default Board;
