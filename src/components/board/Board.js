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
    const [selectedBoardCode, setSelectedBoardCode] = useState(null);
    
    const { user } = useLogin();

    const pageCount = useRef(1);

    const buttonScheme = useColorModeValue("blackAlpha", "whiteAlpha");

    const location = useLocation();
    const boardCode = location.state.boardCode;
    const boardList = location.state.boardList;

    useEffect(() => {
        setSelectedBoardCode(boardCode);
    }, [boardCode]);
    
    const movePage = (e) => {
        const command = e.target.id;
        const postCode = e.target.getAttribute("name");

        if (command === 'board-detail')
            navigate('/board/detail', { state: { boardCode: selectedBoardCode, postCode: postCode, boardList: boardList } } );
        else if(command === 'write-post') {
            navigate('/board/write', { state: { boardCode: selectedBoardCode, boardList: boardList } } );
        }
    }

    const fetchPosts = async () => {
        const url = `${process.env.REACT_APP_SERVER_URL}/board/view/${selectedBoardCode}?search=${search}&page=${page}`;
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
            pageCount.current = data.meta.pageable_count % 10 > 0 ? data.meta.pageable_count / 10 + 1 : data.meta.pageable_count / 10;
            pageCount.current = Math.floor(pageCount.current);
            pageCount.current = pageCount.current > 15 ? 15 : pageCount.current;

            setPostList(data.result);
        }
    }

    const changeSearch = e => {
        // if(e.target.value.length >= 2)
        setSearch(e.target.value);
    }

    const handleBoardSelect = (boardCode) => {
        setSelectedBoardCode(boardCode);
        setPage(1);  // 페이지를 처음으로 리셋
    }

    useEffect(() => {
        if (selectedBoardCode) {
            fetchPosts();
        }
    }, [selectedBoardCode, page, search]);

    return (
        <Flex minW={'900px'} ml={'150px'} margin={"auto"} direction="column">
            <Box p="6" display={"flex"} justifyContent={"space-between"} m={"20px"}>
                <Box display={"flex"}>
                    {boardList.map((board, index) => (
                        <Heading size='lg' mb="4" mr="0.5" key={index}>{board.boardCode == selectedBoardCode ? board.boardName : ""}</Heading>
                    ))}
                    <Menu>
                        <MenuButton as={Button} rightIcon={<RiArrowDownSLine />}>
                            게시판 선택
                        </MenuButton>
                        <MenuList>
                            {boardList.map((board, index) => (
                                <MenuItem key={index} onClick={() => handleBoardSelect(board.boardCode)}>{board.boardName}</MenuItem>
                            ))}
                        </MenuList>
                    </Menu>
                </Box>
                <Box>
                    <Input 
                        type="text" 
                        placeholder="검색어 입력" 
                        size="md" 
                        w={"300px"}
                        onChange={changeSearch}
                    />
                    {/* <Menu>
                        <MenuButton as={Button} rightIcon={<TiArrowUnsorted />}>
                            통합 검색
                        </MenuButton>
                        <MenuList>
                            <MenuItem>제목 검색</MenuItem>
                            <MenuItem>작성자 아이디</MenuItem>
                        </MenuList>
                    </Menu> */}
                    
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

            <Box p="6" minHeight="70vh">
                {postList.map((post, index) => (
                    <Box onClick={movePage} id = "board-detail"  name={post.postCode} key={index} p="4" borderWidth="1px" borderRadius="md" mb="4" _hover={{ cursor: "pointer" }}>
                        <Text id = "board-detail"  name={post.postCode} fontSize='xl' fontWeight={"bold"}>{post.title}</Text>
                        <Text id = "board-detail"  name={post.postCode}>{post.content}</Text>
                        <HStack id = "board-detail"  name={post.postCode} spacing="4" mt="2">
                            <Text id = "board-detail"  name={post.postCode}>작성자 {post.userId}</Text>
                            <Text id = "board-detail"  name={post.postCode}>추천 {post.recommendation}</Text>
                            <Text id = "board-detail"  name={post.postCode}>댓글 {post.commentCount}</Text>
                            <Text id = "board-detail"  name={post.postCode}>작성일자 {new Date(post.writeDate).toLocaleString()}</Text>
                        </HStack>
                    </Box>
                ))}
            </Box>

            <Box mt="6" mb="4" textAlign="center">
                <HStack spacing="4" justify="center">
                    {Array.from({ length: pageCount.current }, (_, index) => (
                        <Button
                            colorScheme={page === index + 1 ? buttonScheme : "gray"}
                            onClick={(e) => {
                                setPage(index + 1);
                            }}
                            key={index}
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
