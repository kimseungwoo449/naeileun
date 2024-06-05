import { Box, Input, Button, Checkbox, FormControl, FormLabel, VStack, Text, HStack, Stack } from '@chakra-ui/react';

import LoginContext, { useLogin } from '../LoginContext';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';

const Login = () => {

    const { login } = useContext(LoginContext);

    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

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
        if (!data.id) {
            setErrorMessage('아이디를 입력해주세요.');
            return;
        } else if (!data.password) {
            setErrorMessage('비밀번호를 입력해주세요.');
            return;
        } else if (!data.id && !data.password) {
            setErrorMessage('아이디를 입력해주세요.');
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/login`, {
                method: 'POST',
                headers: {
                    "Authorization": `ADMIN ${process.env.REACT_APP_ADMIN_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            if (result.status === 200) {
              
                login(result);
                navigate('/');
                setErrorMessage('')
            } else {
                setErrorMessage('아이디와 비밀번호를 확인해주세요.');
                return;
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
                                borderColor="gray.200"
                                focusBorderColor="rgb(202, 244, 255)"

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
                                borderColor="gray.200"
                                focusBorderColor="rgb(202, 244, 255)"

                                mb={0}
                            />
                        </FormControl>
                        {errorMessage && <Text color="red.500">{errorMessage}</Text>}
                    </Box>
                    <Button type="submit" bg="rgb(160, 222, 255)" color="white" width="full">
                        로그인
                    </Button>
                </VStack>
            </form>
        </Box>
    );
};

export default Login;