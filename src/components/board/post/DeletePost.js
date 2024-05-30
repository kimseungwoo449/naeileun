import React from 'react';
import { useLogin } from '../../LoginContext';
import { useLocation, useNavigate } from 'react-router-dom';

const DeletePost = () => {
    const navigate = useNavigate();
    const { user } = useLogin();

    const location = useLocation();
    const postCode = location.state.postCode;
    console.log("postCode: " + postCode)
    console.log("userIdL: " + user.id)

    const fetchPost = async () => {
        const url = `${process.env.REACT_APP_SERVER_URL}/board/delete`;
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                Authorization: `ADMIN ${process.env.REACT_APP_ADMIN_KEY}`
            },
            body: JSON.stringify({
                user_id: user.id,
                post_code: postCode
            }
            )
        });

        const data = await response.json();
        console.log(data);

        const boardCode = data.boardCode;
        const boardList = data.boardList;
        const postCode = data.postCode;

        if (data.status) {
            alert("게시글 삭제가 완료되었습니다.");
            navigate('/board', { state: { boardCode: boardCode, boardList: boardList } });
        } else {
            alert("게시글 삭제를 실패하였습니다.");
            navigate('/board/detail', { state: { boardCode: boardCode, postCode: postCode, boardList: boardList } });
        }
    };

    return (
        <>
            
        </>
    );
};

export default DeletePost;