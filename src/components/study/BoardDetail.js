import {React, userEffect} from 'react';
import { Radio, RadioGroup } from '@chakra-ui/react'
import {Box, Stack, HStack,Input,Text,Textarea,Button} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

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
}

export default BoardDetail;