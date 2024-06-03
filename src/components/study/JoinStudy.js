import {React, useRef, useState,useEffect } from 'react';
import {useNavigate, useLocation, Form} from 'react-router-dom';
import {Textarea,Button,Stack,Text,Box} from '@chakra-ui/react';

const JoinStudy = () =>{
    const navigate = useNavigate();
    const location = useLocation();
    const groupCode = location.state.groupCode;
    //const {setIsLoggedIn, setUser} = useLogin();
    //const userCode = setIsLoggedIn.userCode;
    const [comment,setComment] = useState("");

    const checkComment =(e) =>{
        const data = e.target.value;
        console.log(data);
        if(data.length <= 30)
            setComment(data);
        else
            e.target.value = comment;
    }


    const checkAwait = async () =>{
        const req ={
            "group_code" : groupCode,
            "user_code" : "2"   //userCode
        }

        const response = await fetch(
            `${process.env.REACT_APP_SERVER_URL}/study/checkAwaiter`, {
                method: 'POST',
                headers: {
                    Authorization: `ADMIN ${process.env.REACT_APP_ADMIN_KEY}`,
                    "Content-Type": "application/json;charset=UTF8"
                },
                body:JSON.stringify(req)}
        ) 

        const data = await response.json();
        console.log(data.status);
        if(data.status === true){
            alert("이미 가입 신청했습니다.");
            navigate('/study/board',{state:{groupCode : groupCode}});
        }

    }

    const addAwaiter = async() =>{
        const req={
            "group_code" : groupCode,
            "user_code" : "2", //로그인 완성 시 수정userCode
            "comment" : comment
        }

        const response = await fetch(
            `${process.env.REACT_APP_SERVER_URL}/study/addAwaiter`, {
                method: 'POST',
                headers: {
                    Authorization: `ADMIN ${process.env.REACT_APP_ADMIN_KEY}`,
                    "Content-Type": "application/json;charset=UTF8"
                },
                body:JSON.stringify(req)}
        )

        const data = await response.json();
        if(data.status === true){
            navigate('/study');
        }

    }

    const submit = (e) =>{
        e.preventDefault();
        addAwaiter();
    }


    useEffect(()=>{
        checkAwait()
    },[])

    return(
        <>
            <Form method="POST" onSubmit={submit}>
                <Box h={'70vh'}>
                    <Stack mt={'50px'}>
                        <Text as={'b'} fontSize={'1.5em'} textAlign={'center'}>스터디 가입 신청</Text>
                    </Stack>
                    <Stack as={'b'} fontSize={'2em'} w={'600px'} m={'auto'} mt={'50px'}>
                        <Textarea id="comment" onChange={checkComment} w={'500px'} h={'300px'} m={'auto'} placeholder='30자 이내'></Textarea>
                        <Button onClick={submit} w={'200px'} m={'auto'} mt={'30px'}>제출</Button>
                    </Stack>
                </Box>
            </Form>
        </>
    )
}

export default JoinStudy;