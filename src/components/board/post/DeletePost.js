import React, { useEffect, useState } from 'react';
import { useLogin } from '../../LoginContext';
import { useLocation, useNavigate } from 'react-router-dom';

const DeletePost = () => {
    const navigate = useNavigate();
    const { user } = useLogin();
    const location = useLocation();
    const boardCode = location.state.code;
    const boardList = location.state.board;
    const postCode = location.state.postCode;

    console.log("postCode: " + postCode);
    console.log("userId: " + user.id);

    const [isFetched, setIsFetched] = useState(false);
    const [fetchStatus, setFetchStatus] = useState(null);

    const req = {
        "user_id": user.id,
        "post_code": postCode,
        "board_code": boardCode
    }

    const fetchPost = async () => {
        if (isFetched) return;
        setIsFetched(true);

        const url = `${process.env.REACT_APP_SERVER_URL}/board/delete`;
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `ADMIN ${process.env.REACT_APP_ADMIN_KEY}`
            },
            body: JSON.stringify(req)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            console.log("data.status:" + data.status);

            if (data.status) {
                alert("게시글 삭제가 완료되었습니다.");
                navigate('/board/view', { state: { boardCode: boardCode, board: boardList } });
            } else {
                alert("게시글 삭제를 실패하였습니다.");
                navigate('/board/detail', { state: { boardCode: boardCode, postCode: postCode, board: boardList } });
            }
        });
    };

    useEffect(() => {
        fetchPost();
    }, []);
};

export default DeletePost;
