import React, { useState } from 'react';
import { useLogin } from '../LoginContext';
import { Navigate } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
const Delete = () => {
    const [password, setPassword] = useState('');
    const{user} = useLogin();
    const submit = async e =>{
        console.log('bb')
        e.preventDefault();
        if(user.password === password){
            try {
                const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/delete`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user)
                });
    
                const result = await response.json();
                if (response.ok) {
                    // 탈퇴 성공 시 메인 페이지로 이동
                
                    Navigate('/')
                } else {
                    // 탈퇴 실패 시 오류 메시지 출력
                   
                    console.error('탈퇴 실패:', result.message);
                }
                console.log('성공:', result);
            } catch (error) {
                console.error('오류:', error);
            }
        }
    }
    return (
        <div>
            <Box>
                <form method='POST' onSubmit={submit}>
                <input type='pasword' id ="pw" name = "pw" placeholder='비밀번호' value={password} onChange={e=>setPassword(e.target.value)}/>
                <input type='submit' value={'회원탈퇴'}/>
                </form>
            </Box>
        </div>
    );
};

export default Delete;