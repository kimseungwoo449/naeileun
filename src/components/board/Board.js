import { Box, Button, Flex, HStack, Heading, Input, Menu, MenuButton, MenuItem, MenuList, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { FaPencil } from 'react-icons/fa6';
import { RiArrowDownSLine } from 'react-icons/ri';
import { TiArrowUnsorted } from 'react-icons/ti';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLogin } from '../LoginContext';

const Board = () => {
    const navigate = useNavigate();

    const [postList, setPostList] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    
    const { user } = useLogin();

    const postsPerPage = 10; // 페이지당 보여줄 게시판 수
    const pageCount = useRef(1);

    const buttonScheme = useColorModeValue("blackAlpha", "whiteAlpha");

    const location = useLocation();
    const code = location.state.boardCode;
    const boardList = location.state.boardList;
    console.log("code: " + code)
    console.log("boardList: " + boardList)
    
    const movePage = (e) => {
        const command = e.target.id;
        const boardCode = code;
        const postCode = e.target.getAttribute("name");

        console.log("boardList : " + boardList);
        console.log("postCode : " + postCode);
        console.log("command : " + command);

        if (command === 'board-detail')
            navigate('/board/detail', { state: { boardCode: boardCode, postCode: postCode, boardList: boardList } } );
        else if(command === 'write-post') {
            navigate('/board/write', { state: { boardCode: boardCode, boardList: boardList } } );
        }
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
        console.log(data);

        if (data.status) {
            navigate('/board');
        } else {
            const totalPosts = data.result.length; // 총 게시판 수
            pageCount.current = Math.ceil(totalPosts / postsPerPage);
            pageCount.current = pageCount.current > 15 ? 15 : pageCount.current;

            console.log("totalPosts: " + totalPosts);
            console.log("pageCount.current: " + pageCount.current);

            setPostList(data.result);
        }
    }

    const changeSearch = e => {
        setSearch(e.target.value);
    }

    useEffect(() => {
        fetchPosts();
    }, [page, search]);

    const currentPosts = postList.slice((page - 1) * postsPerPage, page * postsPerPage);
    return (
        // Flex 컨테이너를 사용하여 전체 레이아웃을 세로로 정렬합니다.
        <Flex minW={'900px'} ml={'150px'} margin={"auto"} direction="column">
            {/* 상단 헤더 및 검색창 */}
            <Box p="6" display={"flex"} justifyContent={"space-between"} m={"20px"}>
                <Box display={"flex"}>
                    {boardList.map((board, index) => (
                        <Heading size='lg' mb="4" mr="0.5">{board.boardCode == code ? board.boardName : ""}</Heading>
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
                </Box>
                <Box>
                    <Input 
                        placeholder="검색어 입력" 
                        size="md" 
                        w={"300px"}
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
            </Box>
            {(user != null)
            &&
            <Stack direction='row' spacing={4} justify={"end"} mr="10">
                <Button id='write-post' size='lg' rightIcon={<FaPencil />} colorScheme='gray' variant='solid' onClick={movePage}>
                    글쓰기
                </Button>
            </Stack>
            }

            {/* 게시글 목록 */}
            <Box p="6" minHeight="70vh">
                {currentPosts.map((post, index) => (
                    <Box onClick={movePage} id = "board-detail"  name={post.postCode} key={index} p="4" borderWidth="1px" borderRadius="md" mb="4" _hover={{ cursor: "pointer" }}>
                        <Text id = "board-detail"  name={post.postCode} fontSize='xl' fontWeight={"bold"}>{post.title}</Text>
                        <Text id = "board-detail"  name={post.postCode}>{post.content}</Text>
                        <HStack id = "board-detail"  name={post.postCode} spacing="4" mt="2">
                            <Text id = "board-detail"  name={post.postCode}>작성자 {post.userId}</Text>
                            <Text id = "board-detail"  name={post.postCode}>추천 {post.recommendation}</Text>
                            <Text id = "board-detail"  name={post.postCode}>댓글 {post.comments}</Text>
                            <Text id = "board-detail"  name={post.postCode}>작성일자 {new Date(post.writeDate).toLocaleString()}</Text>
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
                            colorScheme={page === index + 1 ? buttonScheme : "gray"}
                            onClick={(e) => {
                                setPage(index + 1);
                            }}
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
