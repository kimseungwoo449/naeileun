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
    Image,
} from '@chakra-ui/react';
import { FaThumbsUp, FaCommentDots } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useLogin } from '../LoginContext';
import CommentList from './post-comment/CommentList'; // CommentList import

const BoardDetail = () => {
    const navigate = useNavigate();
    const [post, setPost] = useState([]);
    const [page, setPage] = useState(1);
    const { user } = useLogin();
    const [totalComments, setTotalComments] = useState(0); // totalComments 상태 추가
    {user != null ? console.log("userId : " + user.id) : console.log("user : " + user) }
    const pageCount = useRef(1);
    const buttonScheme = useColorModeValue("blackAlpha", "whiteAlpha");
    const location = useLocation();
    const postCode = location.state.postCode;
    const boardCode = location.state.boardCode;
    const boardList = location.state.boardList;
    console.log("postCode: " + postCode)
    console.log("boardCode: " + boardCode)
    console.log("boardList: " + boardList)

    const movePage = (e) => {
        const command = e.target.name;
        const imagePath = e.target.value;
        console.log("command : " + command);
        console.log("boardCode : " + boardCode);
        console.log("boardList : " + boardList);
        console.log("postCode : " + postCode);
        console.log("imagePath : " + imagePath);
        if(command === 'update-post') {
            navigate('/board/update', { state: { boardCode: boardCode, boardList: boardList, postCode: postCode, imagePath: imagePath } } );
        }
        else if(command === 'delete-post') {
            navigate('/board/delete', { state: { boardCode: boardCode, boardList: boardList, postCode: postCode, imagePath: imagePath }})
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
            setPost(data.result);
        }
    }

    const updateRecommendation = (comment) => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/board/recommendation?post_code=${postCode}`, {
            method: 'PUT',
            headers: {
                Authorization: `ADMIN ${process.env.REACT_APP_ADMIN_KEY}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.status) {
                alert("게시글 추천이 완료되었습니다.");
                fetchPost(); // 댓글 목록을 다시 불러옵니다.
            } else {
                alert("게시글 추천에 실패하였습니다.");
            }
        });
    };

    useEffect(() => {
        fetchPost();
    }, [page]);

    return (
        <Box p={4} w="1000px" padding="30px" mx="auto" bg="white" boxShadow="md" borderRadius="md" minHeight="90vh">
            <VStack align="start" spacing={3} w="full">
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
                            <MenuItem onClick={movePage} name='update-post' value={post.imagePath}>
                                수정
                            </MenuItem>
                            <MenuDivider />
                            <MenuItem onClick={movePage} name='delete-post' value={post.imagePath}>
                                삭제
                            </MenuItem>
                        </MenuList>
                    </Menu>
                    }
                </HStack>
                <HStack spacing={2} fontSize="sm" color="gray.500" w="full" mb={5}>
                    <Text>{post.userId}</Text>
                    <Divider orientation="vertical" height="16px" />
                    <Text>{new Date(post.writeDate).toLocaleString()}</Text>
                </HStack>
                <Divider />
                <Text w="full" whiteSpace="pre-line" ml={10}>
                    <br />
                    {post.content}
                    <br />
                    <br />
                </Text>
                <Image src={post.imagePath} />
                <Divider />
                <HStack justify="space-between" w="full" p={"40px"}>
                    <HStack spacing={1}>
                        <IconButton
                            icon={<FaThumbsUp />}
                            size="sm"
                            isRound
                            aria-label="Like"
                            onClick={updateRecommendation}
                        />
                        <Text fontSize="sm">&emsp;{post.recommendation}</Text>
                    </HStack>
                    <HStack spacing={1}>
                        <IconButton
                            icon={<FaCommentDots />}
                            size="sm"
                            isRound
                            aria-label="Comment"
                        />
                        <Text fontSize="sm">&emsp;{totalComments}</Text> {/* totalComments 사용 */}
                    </HStack>
                </HStack>
                <CommentList postCode={postCode} setTotalComments={setTotalComments} /> {/* CommentList에 setTotalComments 전달 */}
            </VStack>
        </Box>
    );
};

export default BoardDetail;
