import React, { useEffect, useState } from 'react';
import { useLogin } from '../../LoginContext';
import { useLocation, useNavigate } from 'react-router-dom';

const DeleteGroupPost = () => {
    const navigate = useNavigate();
    const { user } = useLogin();
    const location = useLocation();
    const postCode = location.state.postCode;
    const groupCode = location.state.groupCode;


    const [isFetched, setIsFetched] = useState(false);
    const [success,setSuccess] = useState(true);

    const req = {
        "post_code": postCode
    }

    const fetchPost = async () => {
        if (isFetched) {return;}

        const url = `${process.env.REACT_APP_SERVER_URL}/study/deletePost`;
        fetch(
            url, 
            {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json;charset=UTF8',
                Authorization: `ADMIN ${process.env.REACT_APP_ADMIN_KEY}`
            },
            body: JSON.stringify(req)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            console.log("data.status:" + data.status);

            if (data.status && !isFetched) {
                alert("게시글 삭제가 완료되었습니다.");
                setIsFetched(true);
                setSuccess(true);
            }
        });
    };

    useEffect(() => {
        fetchPost();
    }, []);

    useEffect(()=>{
        if(success){
            navigate('/study/board', { state: { groupCode: groupCode, postCode: postCode } });
        }else{
            navigate('/study/post', { state: { groupCode: groupCode, postCode: postCode} });
        }
    },[success])
};

export default DeleteGroupPost;