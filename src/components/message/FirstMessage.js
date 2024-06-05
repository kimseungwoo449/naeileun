import { Box, Button, Flex, Text, Input, VStack, Heading, FormControl, FormLabel, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from '@chakra-ui/react';
import React, { useState, useRef } from 'react';
import { useLogin } from '../LoginContext';
import { useNavigate } from 'react-router-dom';

const FirstMessage = () => {
    const { user } = useLogin();
    const [newMessage, setNewMessage] = useState('');
    const [targetId, setTargetId] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [alert, setAlert] = useState({ show: false, title: '', description: '' });
    const cancelRef = useRef();
    const navigate = useNavigate();

    const handleSendMessage = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setAlert({ show: false, title: '', description: '' });

        const req = {
            "user_id": user.id,
            "target_id": targetId,
            "content": newMessage
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/message`, {
                method: 'POST',
                headers: {
                    Authorization: `ADMIN ${process.env.REACT_APP_ADMIN_KEY}`,
                    "Content-Type": "application/json;charset=UTF8"
                },
                body: JSON.stringify(req),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            setIsSubmitting(false);

            if (data.status) {
                navigate(`/message/${targetId}`);
            } else {
                setAlert({
                    show: true,
                    title: 'Error',
                    description: '메세지 전송에 실패했습니다. 대상 유저 ID가 잘못되었을 수 있습니다. 다시 시도해주세요.'
                });
            }

        } catch (error) {
            setIsSubmitting(false);
            setAlert({
                show: true,
                title: 'Error',
                description: '메세지 전송에 실패했습니다. 대상 유저 ID가 잘못되었을 수 있습니다. 다시 시도해주세요.'
            });
        }
    };

    return (
        <Flex direction="column" h="100vh" p={5} w={'50%'} m={'auto'} justifyContent={'center'}>
            <Heading mb={5} textAlign="center">새 쪽지 보내기</Heading>
            <Box flex="1" border={'1px solid lightgray'} p={5} borderRadius={'20px'} boxShadow={'lg'}>
                <form onSubmit={handleSendMessage}>
                    <VStack spacing={4} align="stretch">
                        <FormControl>
                            <FormLabel>대상 유저 ID</FormLabel>
                            <Input value={targetId} onChange={(e) => setTargetId(e.target.value)} placeholder="대상 유저 ID 입력" required />
                        </FormControl>
                        <FormControl>
                            <FormLabel>메세지 내용</FormLabel>
                            <Input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="메세지 내용 입력" required />
                        </FormControl>
                        <Button type='submit' colorScheme="teal" w="full" isLoading={isSubmitting}>전송</Button>
                    </VStack>
                </form>
            </Box>
            <AlertDialog
                isOpen={alert.show}
                leastDestructiveRef={cancelRef}
                onClose={() => setAlert({ show: false, title: '', description: '' })}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent backgroundColor='#eb7368'>
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
        </Flex>
    );
};

export default FirstMessage;
