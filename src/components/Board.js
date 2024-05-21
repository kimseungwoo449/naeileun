import { Box, Button, Heading, Input, Menu, MenuButton, MenuItem, MenuList, Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';
import React from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';
import { TiArrowUnsorted } from 'react-icons/ti';

const Board = () => {


    return (
        <>
            <Box display={'flex'} alignItems={'center'}>
                <Heading size='xl' margin={'30px'}>게시판 명</Heading>
                <Menu>
                    <MenuButton as={Button} rightIcon={<RiArrowDownSLine />}>
                        게시판 명
                    </MenuButton>
                    <MenuList>
                        <MenuItem>자유게시판</MenuItem>
                        <MenuItem>신입</MenuItem>
                        <MenuItem>IT 목표</MenuItem>
                        <MenuItem>디자이너</MenuItem>
                        <MenuItem>중견 취업</MenuItem>
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
                                <Th>글쓴이</Th>
                                <Th>작성일</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td></Td>
                                <Td></Td>
                                <Td></Td>
                                <Td></Td>
                            </Tr>
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
            </Box>
        </>
    );
};

export default Board;