import { Box, Button, Flex, Input, Text, Textarea, VStack, IconButton, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from '@chakra-ui/react';
import React, { useState, useRef } from 'react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../LoginContext';

const WriteIntroduction = () => {
    const navigate = useNavigate();
    const { user } = useLogin();
    const [title, setTitle] = useState('');
    const [introductions, setIntroductions] = useState([{ head: '', body: '' }]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [alert, setAlert] = useState({ show: false, title: '', description: '' });
    const cancelRef = useRef();

    const handleAddField = () => {
        setIntroductions([...introductions, { head: '', body: '' }]);
    };

    const handleRemoveField = (index) => {
        const newIntroductions = introductions.filter((_, i) => i !== index);
        setIntroductions(newIntroductions);
    };

    const handleInputChange = (index, field, value) => {
        const newIntroductions = [...introductions];
        newIntroductions[index][field] = value;
        setIntroductions(newIntroductions);
    };

    const handleSubmit = () => {
        setIsSubmitting(true);
        setAlert({ show: false, title: '', description: '' });

        const payload = {
            introductions: introductions.map(intro => ({
                ...intro,
                title: title,
                id: user.id
            }))
        };

        fetch(`${process.env.REACT_APP_SERVER_URL}/self-introduction`, {
            method: 'POST',
            headers: {
                "Authorization": `ADMIN ${process.env.REACT_APP_ADMIN_KEY}`,
                'Content-Type': 'application/json;charset=UTF8'
            },
            body: JSON.stringify(payload)
        })
            .then(response => response.json())
            .then(data => {
                setIsSubmitting(false);
                if (data.status) {
                    navigate('/user/introduction');
                } else {
                    setAlert({
                        show: true,
                        title: 'Error',
                        description: '저장에 실패했습니다. 다시 시도해주세요.'
                    });
                }
            })
            .catch(error => {
                setIsSubmitting(false);
                setAlert({
                    show: true,
                    title: 'Error',
                    description: '저장에 실패했습니다. 다시 시도해주세요.'
                });
            });
    };

    return (
        <Box p={5} width="60%" m={'auto'} borderRadius="lg" boxShadow="dark-lg">
            <AlertDialog
                isOpen={alert.show}
                leastDestructiveRef={cancelRef}
                onClose={() => setAlert({ show: false, title: '', description: '' })}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent backgroundColor = '#eb7368'>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold" color={'white'}>
                            {alert.title}
                        </AlertDialogHeader>
                        <AlertDialogBody color={'white'}>
                            {alert.description}
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button backgroundColor='lightgray' ref={cancelRef} onClick={() => setAlert({ show: false, title: '', description: '' })}>
                                OK
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>

            <Flex alignItems="center" mb={4} justifyContent="center">
                <Box>
                    <Text as="b" fontSize="3xl" mb={5} textAlign="center">자기소개서 작성</Text>
                </Box>
            </Flex>
            <VStack align="stretch" spacing={6}>
                <Box>
                    <Text mb={2} color="teal.800">자기소개서 이름</Text>
                    <Input 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        placeholder="자기소개서 이름을 입력하세요" 
                        size="lg"
                        height="50px"
                        borderRadius="md"
                        borderColor="gray.300"
                        _hover={{ borderColor: 'gray.400' }}
                        _focus={{ borderColor: 'teal.400', boxShadow: '0 0 0 1px teal.400' }}
                    />
                </Box>
                {introductions.map((intro, index) => (
                    <Box key={index} p={5} borderWidth={1} borderRadius="md" borderColor="gray.300" bg="white" position="relative">
                        <Box mb={4}>
                            <Text mb={2} color="teal.800">문항</Text>
                            <Input
                                value={intro.head}
                                onChange={(e) => handleInputChange(index, 'head', e.target.value)}
                                placeholder="문항을 입력하세요 (공백 포함 500자)"
                                size="md"
                                height="50px"
                                borderRadius="md"
                                borderColor="gray.300"
                                _hover={{ borderColor: 'gray.400' }}
                                _focus={{ borderColor: 'teal.400', boxShadow: '0 0 0 1px teal.400' }}
                            />
                        </Box>
                        <Box>
                            <Text mb={2} color="teal.800">내용</Text>
                            <Textarea
                                value={intro.body}
                                onChange={(e) => handleInputChange(index, 'body', e.target.value)}
                                placeholder="내용을 입력해주세요 (공백 포함 2000자)"
                                size="md"
                                height="150px"
                                borderRadius="md"
                                borderColor="gray.300"
                                _hover={{ borderColor: 'gray.400' }}
                                _focus={{ borderColor: 'teal.400', boxShadow: '0 0 0 1px teal.400' }}
                            />
                        </Box>
                        <IconButton
                            icon={<MinusIcon />}
                            onClick={() => handleRemoveField(index)}
                            colorScheme="red"
                            aria-label="항목 삭제"
                            size="sm"
                            position="absolute"
                            top="5px"
                            right="5px"
                        />
                    </Box>
                ))}
                <Flex justify="flex-end">
                    <IconButton
                        icon={<AddIcon />}
                        onClick={handleAddField}
                        colorScheme="blue"
                        aria-label="항목 추가"
                        size="sm"
                    />
                </Flex>
                <Box display={'flex'} justifyContent={'center'}>
                    <Button width={'20%'} variant="outline" colorScheme="blue" size="lg" onClick={handleSubmit} isLoading={isSubmitting}>작성 완료</Button>
                </Box>
            </VStack>
        </Box>
    );
};

export default WriteIntroduction;
