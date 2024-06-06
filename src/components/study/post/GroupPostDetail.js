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
import { useLogin } from '../../LoginContext';
// import CommentList from '././post-comment/CommentList'; // CommentList import

const GroupPostDetail = () => {
    const navigate = useNavigate();

    const [post, setPost] = useState([]);
    const [page, setPage] = useState(1);
    const { user } = useLogin();

    const pageCount = useRef(1);

    const buttonScheme = useColorModeValue("blackAlpha", "whiteAlpha");

    const location = useLocation();
    const groupCode = location.state.groupCode;
    const postCode = location.state.postCode;

    const movePage = (e) => {
        const command = e.target.name;

        if(command === 'update-post') {
            navigate('/study/postUpdate', { state: {groupCode: groupCode, postCode: postCode} } );
        }
        else if(command === 'delete-post') {
            navigate('/study/postDelete', { state: {groupCode: groupCode, postCode: postCode}})
        }
    }

    const fetchPost = async () => {
        console.log(postCode);
        const url = `${process.env.REACT_APP_SERVER_URL}/study/post?post_code=${postCode}`;
        const response = await fetch(
            url,
            {
                method: "GET",
                headers: {
                    Authorization: `ADMIN ${process.env.REACT_APP_ADMIN_KEY}`,
                    "Content-Type": "application/json;charset=UTF8"
                }
            }
        );

        const data = await response.json();

        if(data.status){
            setPost(data.result);
        }
    }

    useEffect(() => {
        fetchPost();
    }, [page]);

    return (
        <Box p={4} w="900px" padding="30px" mx="auto" bg="white" boxShadow="md" borderRadius="md" minHeight="60vh" mt={'50px'} mb={'100px'}>
            <VStack align="start" spacing={3} w="full" mb={'30px'}>
                <HStack justify="space-between" w="full" mb={4}>
                    <Text fontSize="xl" fontWeight="bold">
                        {post.title}
                    </Text>
                    {(user != null && user.id === post.userId) && 
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
                            <MenuItem onClick={movePage} name='delete-post'>
                                삭제
                            </MenuItem>
                        </MenuList>
                    </Menu>
                    }
                </HStack>
                <HStack spacing={2} fontSize="sm" color="gray.500" w="full" mb={5}>
                    <Text>{post.userId}</Text>
                    <Divider orientation="vertical" height="16px" />
                    <Text>{post.updateDate}</Text>
                </HStack>
                <Divider />
                <Text w="full" whiteSpace="pre-line" ml={10}>
                    <br />
                    {post.content}
                    <br />
                </Text>
            </VStack>
        </Box>
    );
};

export default GroupPostDetail;
