import { Box, Button, Flex, Text, Input, VStack, Grid, GridItem, Heading, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from '@chakra-ui/react';
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useLogin } from '../LoginContext';

const MessageDetail = () => {
    const { target } = useParams();
    const { user } = useLogin();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [alert, setAlert] = useState({ show: false, title: '', description: '' });
    const cancelRef = useRef();

    const fetchMessages = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/message?user=${user.id}`, {
                method: 'GET',
                headers: {
                    "Authorization": `ADMIN ${process.env.REACT_APP_ADMIN_KEY}`,
                    'Content-Type': 'application/json;charset=UTF8'
                }
            });
            
            const data = await response.json();

            if (data && data[target]) {
                setMessages(data[target]);
            } else {
                setAlert({
                    show: true,
                    title: 'Error',
                    description: '쪽지를 가져오는 중 오류가 발생했습니다. 다시 시도해주세요.'
                });
            }
        } catch (error) {
            setAlert({
                show: true,
                title: 'Error',
                description: '쪽지를 가져오는 중 오류가 발생했습니다. 다시 시도해주세요.'
            });
        }
    };

    const updateMessages = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/message`, {
                method: 'PUT',
                headers: {
                    Authorization: `ADMIN ${process.env.REACT_APP_ADMIN_KEY}`,
                    "Content-Type": "application/json;charset=UTF8"
                },
                body: JSON.stringify({
                    "send_user_id": target,
                    "receive_user_id": user.id
                }),
            });

            if (!response.ok) {
                setAlert({
                    show: true,
                    title: 'Error',
                    description: '쪽지를 업데이트 중 오류가 발생했습니다. 다시 시도해주세요.'
                });
            }

            const data = await response.json();
        } catch (error) {
            setAlert({
                show: true,
                title: 'Error',
                description: '쪽지를 업데이트 중 오류가 발생했습니다. 다시 시도해주세요.'
            });
        }
    };

    const combinedFetchAndUpdate = async () => {
        await Promise.all([fetchMessages(), updateMessages()]);
    };

    useEffect(() => {
        combinedFetchAndUpdate();
    }, [user, target, isSubmitting]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const req = {
            "user_id": user.id,
            "target_id": target,
            "content": newMessage
        };

        setNewMessage('');

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
            setNewMessage('');  // Clear the input field after sending the message
        } catch (error) {
            setIsSubmitting(false);
            setAlert({
                show: true,
                title: 'Error',
                description: '메세지 전송에 실패했습니다. 다시 시도해주세요.'
            });
        }
    };

    return (
        <Flex direction="column" h="100vh" p={5} w={'50%'} m={'auto'} justifyContent={'center'}>
            <Heading mb={5} textAlign="center">{target}과의 쪽지함</Heading>
            <Box flex="1" overflowY="auto" border={'1px solid lightgray'} p={'50px'} borderRadius={'20px'} boxShadow={'lg'}>
                <VStack spacing={4} align="stretch">
                    {messages.map((msg, index) => (
                        <Grid
                            key={index}
                            templateColumns="1fr auto 1fr"
                            gap={2}
                            justifyItems={msg.sendUserCode === parseInt(user.userCode) ? 'flex-end' : 'flex-start'}
                        >
                            <GridItem colStart={msg.sendUserCode === parseInt(user.userCode) ? 5 : 1}>
                                <Box
                                    maxW="300px"
                                    bg={msg.sendUserCode === parseInt(user.userCode) ? 'teal.100' : 'gray.100'}
                                    borderRadius="md"
                                    p={3}
                                >
                                    <Text>{msg.content}</Text>
                                    <Text fontSize="xs" color="gray.500" textAlign="right">
                                        {new Date(msg.sendDate).toLocaleString()}
                                    </Text>
                                </Box>
                            </GridItem>
                        </Grid>
                    ))}
                </VStack>
            </Box>
            <form onSubmit={handleSendMessage}>
                <Box mt={4}>
                    <Flex>
                        <Input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="메세지 입력" />
                        <Button type='submit' colorScheme="teal" ml={2} isLoading={isSubmitting}>전송</Button>
                    </Flex>
                </Box>
            </form>
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

export default MessageDetail;
