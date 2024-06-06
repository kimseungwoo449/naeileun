import React, { useState } from 'react';
import { useLogin } from '../LoginContext';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Heading,
    Text,
    VStack,
    useToast
} from '@chakra-ui/react';

const Delete = () => {
    const [password, setPassword] = useState('');
    const { user } = useLogin();
    const navigate = useNavigate();
    const toast = useToast();

    const combinedFetchDeleteInfo = async () => {
        await Promise.all([deleteResumeAll(), deleteIntroductionAll(),deleteMessageAll()]);
    };

    const deleteResumeAll = ()=>{
        fetch(`${process.env.REACT_APP_SERVER_URL}/resume`, {
            method: 'DELETE',
            headers: {
                Authorization: `ADMIN ${process.env.REACT_APP_ADMIN_KEY}`,
                "Content-Type": "application/json;charset=UTF8"
            },
            body: JSON.stringify({
                "user_id" : user.id
            }),
        })
            .then(response => response.json())
    }

    const deleteIntroductionAll = ()=>{
        fetch(`${process.env.REACT_APP_SERVER_URL}/self-introduction`, {
            method: 'DELETE',
            headers: {
                Authorization: `ADMIN ${process.env.REACT_APP_ADMIN_KEY}`,
                "Content-Type": "application/json;charset=UTF8"
            },
            body: JSON.stringify({
                "user_id" : user.id
            }),
        })
            .then(response => response.json()) 
    }

    const deleteMessageAll = ()=>{
        fetch(`${process.env.REACT_APP_SERVER_URL}/message`, {
            method: 'DELETE',
            headers: {
                Authorization: `ADMIN ${process.env.REACT_APP_ADMIN_KEY}`,
                "Content-Type": "application/json;charset=UTF8"
            },
            body: JSON.stringify({
                "send_user_id" : user.id,
                "receive_user_id" : user.id
            }),
        })
            .then(response => response.json())
    }

    const submit = async e => {
        e.preventDefault();
        if (user.password === password) {
            combinedFetchDeleteInfo();
            try {
                const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/delete`, {
                    method: 'DELETE',
                    headers: {
                        "Authorization": `ADMIN ${process.env.REACT_APP_ADMIN_KEY}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user)
                });

                const result = await response.json();
                if (response.ok) {
                    toast({
                        title: "탈퇴 성공",
                        description: "회원 탈퇴가 성공적으로 처리되었습니다.",
                        status: "success",
                        duration: 3000,
                        isClosable: true,
                    });
                    navigate('/user/logout');
                } else {
                
                    toast({
                        title: "탈퇴 실패",
                        description: result.message || "회원 탈퇴에 실패했습니다.",
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                    });
                    console.error('탈퇴 실패:', result.message);
                }
            } catch (error) {
                toast({
                    title: "오류",
                    description: "오류가 발생했습니다. 다시 시도해주세요.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
                console.error('오류:', error);
            }
        } else {
            toast({
                title: "비밀번호 오류",
                description: "비밀번호가 일치하지 않습니다.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    }

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            bg="gray.50"
            py={10}
        >
            <Box
                maxW="md"
                w="full"
                bg="white"
                boxShadow="md"
                rounded="lg"
                p={6}
            >
                <VStack spacing={4} align="flex-start" w="full">
                    <Heading size="lg" mb={4}>회원 탈퇴</Heading>
                    <Text color="gray.600">계정을 삭제하려면 비밀번호를 입력하세요.</Text>
                    <form method="POST" onSubmit={submit}>
                        <VStack spacing={4} align="flex-start" w="full">
                            <FormControl id="pw" isRequired>
                                <FormLabel>비밀번호</FormLabel>
                                <Input
                                    type="password"
                                    placeholder="비밀번호"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </FormControl>
                            <Button type="submit" colorScheme="red" width="full">회원탈퇴</Button>
                        </VStack>
                    </form>
                </VStack>
            </Box>
        </Box>
    );
};

export default Delete;
