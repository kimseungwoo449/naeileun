import React, { useState, useEffect, useRef } from 'react';
import { Box, Text, Button, HStack, Stack, Input, Icon } from '@chakra-ui/react';
import { useNavigate, useLocation, Form } from 'react-router-dom';
import { MdSettings, MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
} from '@chakra-ui/react'
import { useLogin } from '../LoginContext';

const StudyBoard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const groupCode = location.state.groupCode;

    const { user } = useLogin();

    const [post, setPost] = useState([]);
    const [study, setStudy] = useState([]);
    const [isMember, setIsMember] = useState(false);
    const [fetched, setFetched] = useState(false);
    const [page, setPage] = useState(1);
    const [startPage, setStartPage] = useState(1);
    const [maxPage, setMaxPage] = useState(0);
    const postsPerPage = 5;

    const [isOpen, setIsOpen] = useState(false);
    const cancelRef = useRef();

    const onClose = () => {
        setIsOpen(false);
        navigate('/user/login');
    }

    const fetchBoard = async () => {
        if (fetched) return;

        const response = await fetch(
            `${process.env.REACT_APP_SERVER_URL}/study/board?group_code=${groupCode}&user_code=${user.userCode}`, {
                method: 'GET',
                headers: {
                    Authorization: `ADMIN ${process.env.REACT_APP_ADMIN_KEY}`
                }
            }
        );

        const data = await response.json();

        setPost(data.result[0].post);
        setStudy(data.result[0].study);
        setIsMember(data.result[0].isMember.isMember);
        setFetched(true);
        const postSize = data.meta.total_count;
        const totalPage = Math.ceil(postSize / postsPerPage);
        setMaxPage(totalPage);
    }

    const getGroupPosts = async () => {
        const offset = (page - 1) * postsPerPage;
        const start = Math.ceil(page / 5) * 5 - 4;

        if (startPage !== start) {
            setStartPage(start);
        }
        const response = await fetch(
            `${process.env.REACT_APP_SERVER_URL}/study/groupPosts?group_code=${groupCode}&offset=${offset}`, {
                method: 'GET',
                headers: {
                    Authorization: `ADMIN ${process.env.REACT_APP_ADMIN_KEY}`
                }
            }
        );

        const data = await response.json();

        if (!data.status) {
            getGroupPosts();
            return;
        }
        setPost(data.result[0]);
    }

    const quit = async () => {
        const request = {
            "group_code": groupCode,
            "user_code": user.userCode
        }

        const response = await fetch(
            `${process.env.REACT_APP_SERVER_URL}/study/deleteMember`, {
                method: 'DELETE',
                headers: {
                    Authorization: `ADMIN ${process.env.REACT_APP_ADMIN_KEY}`,
                    "Content-Type": "application/json;charset=UTF8"
                },
                body: JSON.stringify(request)
            }
        );

        const data = await response.json();
        if (data.status === true) {
            navigate('/study');
        }
    }

    const join = async () => {
        if (study.autoMemberAccess === "false") {
            navigate("/study/join", { state: { groupCode: groupCode } });
            return;
        }

        const request = {
            "group_code": groupCode,
            "user_code": user.userCode
        }

        const response = await fetch(
            `${process.env.REACT_APP_SERVER_URL}/study/joinMember`, {
                method: 'POST',
                headers: {
                    Authorization: `ADMIN ${process.env.REACT_APP_ADMIN_KEY}`,
                    "Content-Type": "application/json;charset=UTF8"
                },
                body: JSON.stringify(request)
            }
        );

        const data = await response.json();
        if (data.status) {
            setIsMember(true);
        }
    }

    const movePage = (e) => {
        const command = e.target.getAttribute("name");

        if (command === 'setting' && study.adminCode == user.userCode) {
            navigate('/study/setting/access', { state: { groupCode: groupCode, adminCode: study.adminCode } });
            return;
        } else if (command === 'write-post') {
            navigate('/study/writePost', { state: { groupCode: groupCode } });
        } else if (command === 'postDetail') {
            const postCode = e.target.id;
            if (isMember || study.isPublic === "true") {
                navigate('/study/post', { state: { groupCode: groupCode, postCode: postCode } })
            } else {
                alert('스터디 멤버만 이용 가능합니다.');
            }
        }
    }

    const checkPage = (e) => {
        const command = e.target.id;

        if (command === 'previous-page') {
            if (page > 1) {
                setPage(page - 1);
            }
        } else if (command === 'next-page') {
            if (page < maxPage) {
                setPage(page + 1);
            }
        } else {
            const pageNum = parseInt(command);
            if (pageNum !== page && !isNaN(pageNum)) {
                setPage(pageNum);
            }
        }
    }

    useEffect(() => {
        if (user) {
            fetchBoard();
        } else {
            setIsOpen(true);
        }
    }, [user]);

    useEffect(() => {
        if (fetched) {
            getGroupPosts();
        }
    }, [page]);

    // user가 null일 때 아무것도 렌더링하지 않도록 조건 추가
    if (!user) {
        return (
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent backgroundColor='#eb7368'>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold" color={'white'}>
                            로그인 필요
                        </AlertDialogHeader>

                        <AlertDialogBody color={'white'}>
                        로그인 후 이용 가능합니다.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                확인
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        );
    }

    return (
        <Box h={'80vh'} minW={"750px"} maxW={'70vw'} ml={'14%'}>
            <Form method="POST" action="">
                <HStack mt={'30px'} ml={'15px'}>
                    <HStack w={'100%'}>
                        <Text as={'b'} fontSize={'1.5em'} ml={'5px'} mr={'10px'} textAlign={'center'}>{study.name}</Text>
                        {
                            user.userCode == study.adminCode ?
                                <Icon onClick={movePage} name='setting' as={MdSettings} boxSize={'1.8em'} _hover={{ cursor: "pointer" }} ml={'auto'} /> :
                                <Input type='hidden'></Input>
                        }
                    </HStack>

                    <HStack ml={'auto'}>
                        {
                            study.adminCode == user.userCode ?
                                <Input type='hidden'></Input> :
                                (
                                    isMember ?
                                        <Button onClick={quit} w={'60px'} id="cancle">탈퇴</Button> :
                                        <Button onClick={join} w={'60px'} colorScheme='blue'>가입신청</Button>
                                )
                        }
                    </HStack>
                </HStack>
                <HStack>
                    <Text as={'b'} ml={'20px'} textAlign={'center'} mt={'9px'}>{study.isPublic === "true" ? "public" : "private"}</Text>
                </HStack>
                <HStack >
                    <Text mt={'30px'} ml={'20px'} whiteSpace="pre-line">{study.decription}</Text>
                </HStack>
                <Stack>
                    <HStack wrap={"wrap"} h={'100px'} gap={"10px"} _hover={{ cursor: "pointer" }} ml={'20px'}>
                        <Text as={'b'} fontSize="1.2em">그룹 게시판</Text>
                        {
                            isMember === true ?
                                <Button name='write-post' onClick={movePage} ml={'auto'}>글쓰기</Button> :
                                <Input type='hidden'></Input>
                        }
                    </HStack>
                    <TableContainer w={"100%"} h={'300px'} mb={'20px'} key={'board'}>
                        <Table >
                            <Thead>
                                <Tr>
                                    <Th>순서</Th>
                                    <Th>제목</Th>
                                    <Th>작성자</Th>
                                    <Th>게시일</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {post.map((post, index) => (
                                    <Tr key={post.postCode} onClick={movePage} id={post.postCode} name='postDetail'>
                                        <Td id={post.postCode} name='postDetail' _hover={{ cursor: "pointer" }}>{((page - 1) * 5) + index + 1}</Td>
                                        <Td id={post.postCode} name='postDetail' _hover={{ cursor: "pointer" }} w={'200px'}>{post.title}</Td>
                                        <Td id={post.postCode} name='postDetail' _hover={{ cursor: "pointer" }} w={'200px'}>{post.userId}</Td>
                                        <Td id={post.postCode} name='postDetail' _hover={{ cursor: "pointer" }}>{post.updateDate}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                    <HStack m={'auto'}>
                        <Icon id='previous-page' onClick={checkPage} as={MdNavigateBefore} boxSize={'2em'} mr={'13px'} mt={'3px'} _hover={{ cursor: "pointer" }}></Icon>
                        {Array.from({ length: postsPerPage > maxPage - startPage + 1 ? maxPage - startPage + 1 : postsPerPage }, (_, index) => (
                            <Text
                                id={startPage + index}
                                key={index}
                                color={page === startPage + index ? "blue" : "black"}
                                onClick={checkPage}
                                fontSize={'1.3em'}
                                mt={'3px'}
                                mr={'8px'}
                                _hover={{ cursor: "pointer" }}
                            >
                                {startPage + index}
                            </Text>
                        ))}
                        <Icon id='next-page' onClick={checkPage} as={MdNavigateNext} boxSize={'2em'} mt={'3px'} ml={'5px'} _hover={{ cursor: "pointer" }}></Icon>
                    </HStack>
                </Stack>
            </Form>
        </Box>
    );
}

export default StudyBoard;
