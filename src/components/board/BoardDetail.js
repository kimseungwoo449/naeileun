// src/BoardDetail.js
import React, { useEffect, useRef, useState } from 'react';
import {
    Box,
    Text,
    VStack,
    HStack,
    Divider,
    IconButton,
    useColorModeValue,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
} from '@chakra-ui/react';
import { FaThumbsUp, FaCommentDots } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';

const BoardDetail = () => {
    const navigate = useNavigate();

    const [post, setPost] = useState([]);
    const [page, setPage] = useState(1);

    const pageCount = useRef(1);

    const buttonScheme = useColorModeValue("blackAlpha", "whiteAlpha");

    const location = useLocation();
    const postCode = location.state.postCode;
    const boardCode = location.state.boardCode;
    const boardList = location.state.board;
    console.log("postCode: " + postCode)
    console.log("boardCode: " + boardCode)
    console.log("boardList: " + boardList)

    const movePage = (e) => {
        const command = e.target.name;
        const code = boardCode;
        const board = boardList;

        console.log("board : " + board);
        console.log("postCode : " + postCode);
        console.log("command : " + command);

        if(command === 'update-post') {
            navigate('/board/update', { state: { code: code, board: board, postCode : postCode } } );
        }
    }

    const fetchPost = async () => {
        const url = `${process.env.REACT_APP_SERVER_URL}/board/view/${boardCode}/${postCode}`;
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
        console.log(data)

        if (data.status) {
            navigate('/board');
        } else {
            // pageCount.current = Math.ceil(data.meta.pageable_count / 10);
            // pageCount.current = Math.min(pageCount.current, 15);

            setPost(data.result);
        }
    }

    useEffect(() => {
        fetchPost();
    }, [page]);

    return (
        <Box p={4} w="1200px" mx="auto" bg="white" boxShadow="md" borderRadius="md" minHeight="90vh">
            <VStack align="start" spacing={3} w="full">
                <HStack justify="space-between" w="full">
                    <Text fontSize="xl" fontWeight="bold">
                        {post.title}
                    </Text>
                    <Menu>
                        <MenuButton
                            as={IconButton}
                            aria-label='Options'
                            icon={<GiHamburgerMenu />}
                            variant='outline'
                        />
                        <MenuList>
                            <MenuItem onClick={movePage} name='update-post'>
                                수정
                            </MenuItem>
                            <MenuDivider />
                            <MenuItem>
                                삭제
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </HStack>
                <HStack spacing={2} fontSize="sm" color="gray.500" w="full">
                    <Text>{post.userId}</Text>
                    <Divider orientation="vertical" height="16px" />
                    <Text>{post.writeDate}</Text>
                </HStack>
                <Text w="full">
                    <br />
                    {post.content}
                    <br />
                    <br />
                </Text>
                <HStack justify="space-between" w="full">
                    <HStack spacing={1}>
                        <IconButton
                            icon={<FaThumbsUp />}
                            size="sm"
                            isRound
                            aria-label="Like"
                        />
                        <Text fontSize="sm">{post.recommandation}</Text>
                    </HStack>
                    <HStack spacing={1}>
                        <IconButton
                            icon={<FaCommentDots />}
                            size="sm"
                            isRound
                            aria-label="Comment"
                        />
                        <Text fontSize="sm">21</Text>
                    </HStack>
                </HStack>
            </VStack>
        </Box>
    );
};

export default BoardDetail;
