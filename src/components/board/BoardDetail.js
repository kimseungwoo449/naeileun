import { Box, Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';
import React from 'react';

const BoardDetail = () => {
    return (
        <>
            <Box>
                <TableContainer w={"1000px"}>
                    <Table  m={"40px 0"}>
                        <Thead>
                            <Tr>
                                <Th>제목</Th>
                                <Th>작성자</Th>
                                <Th>작성일</Th>
                                <Th>추천수</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <>
                                <Tr>
                                    <Td>제목</Td>
                                    <Td>작성자</Td>
                                    <Td>작성일</Td>
                                    <Td>추천수</Td>
                                </Tr>
                            </>
                        </Tbody>
                        <Tfoot>

                        </Tfoot>
                    </Table>
                </TableContainer>
            </Box>
        </>
    );
};

export default BoardDetail;