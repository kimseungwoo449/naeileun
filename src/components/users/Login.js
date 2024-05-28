import { Box, Input, Button, Checkbox, FormControl, FormLabel, VStack, Text, HStack, Stack } from '@chakra-ui/react';

import LoginContext, { useLogin } from '../LoginContext';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';

const Login = () => {
    // const { setIsLoggedIn, setUser } = useLogin();
    const {login} = useContext(LoginContext);

    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        id: '',
        password: '',
    });
    const [touched, setTouched] = useState({});
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };
    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched({
            ...touched,
            [name]: true
        });
    };
    const submit = async e => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const data = {
            id: formData.get('id'),
            password: formData.get('password'),
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

            console.log(result);

            if (response.ok) {
                // 로그인 성공 시 메인 페이지로 이동
                // setIsLoggedIn(true);
                // setUser(result.user);

                login(result);
                navigate('/');
                // console.log(result);
                // console.log(result.user);
                // console.log('성공:', result);

            } else {
                // 로그인 실패 시 오류 메시지 출력  
                console.error('로그인 실패:', result.message);
            }
        } catch (error) {
            console.error('오류:', error);
        }
    };
    const isFieldInvalid = (name) => !formData[name] && touched[name];

    return (

        <Box p={4} maxW="md" mx="auto">
            <form method="POST" onSubmit={submit}>
                <VStack spacing={4} align="stretch">

                    <Box border="10px" p={0} rounded="md">
                        <FormControl isInvalid={isFieldInvalid('id')}>
                            <Input
                                type="text"
                                id="id"
                                name="id"
                                placeholder="아이디"
                                value={formData.id}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                borderColor={isFieldInvalid('id') ? 'red.500' : 'gray.200'}
                                focusBorderColor="green.500"
                                
                                mb={2}
                            />
                        </FormControl>

                        <FormControl isInvalid={isFieldInvalid('password')}>
                            <Input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="비밀번호"
                                value={formData.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                borderColor={isFieldInvalid('password') ? 'red.500' : 'gray.200'}
                                focusBorderColor="green.500"
                                
                                mb={0}
                            />
                        </FormControl>
                    </Box>
                    <Button type="submit" colorScheme="green" width="full">
                        로그인
                    </Button>
                </VStack>
            </form>
        </Box>
    );
};

export default Login;