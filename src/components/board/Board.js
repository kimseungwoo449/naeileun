import { Box, Button, HStack, Heading, Input, Menu, MenuButton, MenuItem, MenuList, Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';
import { TiArrowUnsorted } from 'react-icons/ti';
import { useLocation, useNavigate } from 'react-router-dom';

const Board = () => {
    const navigate = useNavigate();

    const [postList, setPostList] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState(' ');

    const pageCount = useRef(1);

    const buttonScheme = useColorModeValue("blackAlpha", "whiteAlpha");

    const {state} = useLocation();
    const {code} = state;
    
    const fetchPosts = async() => {
        console.log('fetchPosts');
        console.log('${process.env.REACT_APP_SERVER_URL}:', process.env.REACT_APP_SERVER_URL);
        console.log('Authorization:', process.env.REACT_APP_ADMIN_KEY);
        const url = `${process.env.REACT_APP_SERVER_URL}/board/view/${code}`;
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
            pageCount.current = data.meta.pageable_count % 10 > 0 ? data.meta.pageable_count / 10 + 1 : data.meta.pageable_count / 10;
            pageCount.current = Math.floor(pageCount.current);
            pageCount.current = pageCount.current > 15 ? 15 : pageCount.current;
    
            setPostList(data.result);
        }

    }
    
    const changeSearch = e => {
        if(e.target.value.length >= 2)
            setSearch(e.target.value);
    }

    useEffect(() => {
        console.log('useEffect');
        fetchPosts();
    }, [page, search]);

    return (
        <>
            <Box>
                <Heading size='xl' margin={'30px'}>게시판 명</Heading>
                    <Menu>
                        <MenuButton as={Button} rightIcon={<RiArrowDownSLine />}>
                            게시판 명
                        </MenuButton>
                        <MenuList>
                            {postList.map((post, index) => (
                                <MenuItem>{post.boardName}</MenuItem>
                            ))}
                        </MenuList>
                    </Menu>
            </Box>
            <Box margin={'auto'}>
                <TableContainer w={"1000px"}>
                    <Table  m={"40px 0"}>
                        <Thead>
                            <Tr>
                                <Th>번호</Th>
                                <Th>제목</Th>
                                <Th>작성자</Th>
                                <Th>작성일</Th>
                                <Th>추천수</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {postList.map((post, index) => (
                                <>
                                    <Tr>
                                        <Td>{(page - 1) * 10 + index + 1}</Td>
                                        <Td>{post.title}</Td>
                                        <Td>{post.userId}</Td>
                                        <Td>{post.writeDate}</Td>
                                        <Td>{post.recommandation}</Td>
                                    </Tr>
                                </>
                            ))}
                        </Tbody>
                        <Tfoot>

                        </Tfoot>
                    </Table>
                </TableContainer>
                <Input type="text" placeholder="검색어 입력" size="lg" w={"600px"} />
                <Menu>
                    <MenuButton as={Button} rightIcon={<TiArrowUnsorted />}>
                        통합 검색
                    </MenuButton>
                    <MenuList>
                        <MenuItem>제목 검색</MenuItem>
                        <MenuItem>작성자 아이디</MenuItem>
                    </MenuList>
                </Menu>
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
            </Box>
        </>
    );
};

export default Board;