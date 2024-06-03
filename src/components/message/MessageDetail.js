import { Box, Button, Flex, Text, Input, VStack, Grid, GridItem, Heading } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLogin } from '../LoginContext';

const MessageDetail = () => {
    const { target } = useParams();
    const { user } = useLogin();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isSubmit, setIsSubmit] = useState(false);

    const fetchMessages = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/message?user=${user.id}`, {
                method: 'GET',
                headers: {
                    "Authorization": `ADMIN ${process.env.REACT_APP_ADMIN_KEY}`,
                    'Content-Type': 'application/json;charset=UTF8'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data && data[target]) {
                setMessages(data[target]);
            } else {
                console.error('No messages found for user');
            }
        } catch (error) {
            console.error('Error fetching message details:', error);
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
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Messages updated:", data);
        } catch (error) {
            console.error('Error updating messages:', error);
        }
    };

    const combinedFetchAndUpdate = async () => {
        await Promise.all([fetchMessages(), updateMessages()]);
    };

    useEffect(() => {
        combinedFetchAndUpdate();

        // const interval = setInterval(() => {
        //     combinedFetchAndUpdate();
        // }, 5000); // 5초마다 실행

        // return () => clearInterval(interval); // Cleanup on unmount
    }, [user, target, isSubmit]);

    const handleSendMessage = async (e) => {
        e.preventDefault();

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
            setIsSubmit(!isSubmit);
            setNewMessage('');  // Clear the input field after sending the message
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <Flex direction="column" h="100vh" p={5} w={'50%'} m={'auto'} justifyContent={'center'} >
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
                        <Button type='submit' colorScheme="teal" ml={2}>전송</Button>
                    </Flex>
                </Box>
            </form>
        </Flex>
    );
};

export default MessageDetail;