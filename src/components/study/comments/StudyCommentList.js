import React, { useEffect, useState } from 'react';
import { Box, VStack, Textarea, Button } from '@chakra-ui/react';
import Comment from '../../module/Comment';
import { useLogin } from '../../LoginContext';

const StudyCommentList = ({ postCode }) => {
    const [commentList, setCommentList] = useState([]);
    const [newComment, setNewComment] = useState('');
    const { user } = useLogin();

    const fetchComments = async () => {
        const url = `${process.env.REACT_APP_SERVER_URL}/groupComment?post_code=${postCode}`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `ADMIN ${process.env.REACT_APP_ADMIN_KEY}`
            }
        });

        const data = await response.json();
        console.log(data);

        if (data.status) {
            alert("댓글 읽기에 실패하였습니다.");
        } else {
            const totalComments = data.result.length; // 총 댓글 수
            console.log("totalComments: " + totalComments);

            setCommentList(data.result);
        }
    };

    useEffect(() => {
        fetchComments();
    }, []);

    const addComment = async () => {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/groupComment/add`, {
            method: 'POST',
            headers: {
                Authorization: `ADMIN ${process.env.REACT_APP_ADMIN_KEY}`
            },
            body: JSON.stringify({
                user_id: user.id,
                post_code: postCode,
                content: newComment
            })
        });

        const data = await response.json();
        console.log(data);

        if (data.status) {
            setNewComment('');
            fetchComments(); // 댓글 목록을 다시 불러옵니다.
        } else {
            alert("댓글 등록에 실패하였습니다.");
        }
    };

    const updateComment = (comment) => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/groupComment/update`, {
            method: 'PUT',
            headers: {
                Authorization: `ADMIN ${process.env.REACT_APP_ADMIN_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: user.id,
                post_code: postCode,
                comment_code: comment.commentCode,
                content: comment.content // 수정된 내용을 서버에 보내기 위해 comment.content 사용
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);

            if (data.status) {
                alert("댓글이 수정되었습니다.");
                fetchComments(); // 댓글 목록을 다시 불러옵니다.
            } else {
                alert("댓글 수정에 실패하였습니다.");
            }
        });
    };
    
    const deleteComment = (comment) => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/groupComment/delete`, {
            method: 'DELETE',
            headers: {
                Authorization: `ADMIN ${process.env.REACT_APP_ADMIN_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                comment_code: comment.commentCode
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);

            if (data.status) {
                alert("댓글이 삭제되었습니다.");
                fetchComments(); // 댓글 목록을 다시 불러옵니다.
            } else {
                alert("댓글 삭제에 실패하였습니다.");
            }
        });
    };

    return (
        <Box p={4}>
            <VStack spacing={4} align="stretch" w={900}>
                {commentList.map((comment, index) => (
                    <Comment key={index} comment={comment} onUpdateComment={updateComment} onDeleteComment={deleteComment} />
                ))}
                {user != null && (
                    <Box display={"flex"} flexDirection={"column"} alignItems={"end"}>
                        <Textarea
                            placeholder="댓글을 입력하세요..."
                            mb={2}
                            value={newComment}
                            w={900}
                            minH={150}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <Button colorScheme="blue" onClick={addComment}>댓글 등록</Button>
                    </Box>
                )}
            </VStack>
        </Box>
    );
};

export default StudyCommentList;