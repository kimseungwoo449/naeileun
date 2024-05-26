import { Box } from '@chakra-ui/react';
import { useLogin } from '../LoginContext';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const {setIsLoggedIn, setUser} = useLogin();
    const navigate = useNavigate();
    const submit = async e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        const data = {
            id: formData.get('id'),
            password: formData.get('pw'),
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            

            if (response.ok) {
                // 로그인 성공 시 메인 페이지로 이동
                setIsLoggedIn(true);
                setUser(result.user);
                sessionStorage.setItem('user', JSON.stringify(result.user));

                navigate('/');
                console.log(result);
                console.log(result.user);
                console.log('성공:', result);
                
            } else {
                // 로그인 실패 시 오류 메시지 출력
                if (response.headers.get('Content-Type').includes('application/json')) {
                    const result = await response.json();
                    console.error('로그인 실패:', result.message);
                } else {
                    console.error('로그인 실패:', await response.text());
                }
            }
        } catch (error) {
            console.error('오류:', error);
        }
    };
    return (
        <div>
            <Box>
            <form method = "POST" onSubmit={submit
            }>
            <input type = "text" id = "id" name = "id" placeholder='아이디'/>
            <input type = "text" id ="pw" name = "pw" placeholder='비밀번호'/>
            <input type='submit'/>
            </form>
            </Box>
        </div>
    );
};

export default Login;