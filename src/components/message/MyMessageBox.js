import { Box, Button, Flex, Icon, Text, VStack, List, ListItem, Badge, Tooltip, Grid, GridItem } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useLogin } from '../LoginContext';
import { MdOutlineMessage } from "react-icons/md";
import { FaEnvelopeOpenText } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const MyMessageBox = () => {
    const { user } = useLogin();
    const [userMessages, setUserMessages] = useState({});
    const [latestMessages, setLatestMessages] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
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
                if (data) {
                    const userMessagesCount = {};
                    const latestMessageDetails = {};

                    Object.keys(data).forEach(key => {
                        const messages = data[key];
                        messages.sort((a, b) => new Date(b.sendDate) - new Date(a.sendDate)); // 최신 메시지로 정렬

                        const uncheckedCount = messages.filter(msg =>
                            msg.receiveUserCode === parseInt(user.userCode) && !msg.isChecked
                        ).length;

                        const latestMessage = messages[0];

                        userMessagesCount[key] = uncheckedCount;
                        latestMessageDetails[key] = latestMessage;
                    });

                    setUserMessages(userMessagesCount);
                    setLatestMessages(latestMessageDetails);
                } else {
                    console.error('No data received');
                }
            } catch (error) {
                console.error('Error fetching message details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, [user]);

    if (loading) {
        return <Text>Loading...</Text>;
    }

    return (
        <Flex justifyContent={'center'}>
            <Box p={5} w={'70%'}>
                <Flex justifyContent="space-between" alignItems="center" mb={4}>
                    <Text as={'b'} fontSize="3xl">나의 쪽지 목록</Text>
                    <Button colorScheme="teal" size="sm" leftIcon={<MdOutlineMessage />} onClick={()=>{
                        navigate("/message/newTarget");
                    }}>새 쪽지</Button>
                </Flex>
                <VStack align="stretch" spacing={4}>
                    <List spacing={3} width="100%">
                        {Object.keys(userMessages).map((userId) => {
                            const latestMessage = latestMessages[userId];
                            const latestMessageContent = latestMessage
                                ? (latestMessage.sendUserCode === parseInt(user.userCode)
                                    ? `나 : ${latestMessage.content}`
                                    : `${userId} : ${latestMessage.content}`)
                                : '메세지가 없습니다.';

                            return (
                                <Tooltip key={userId} label={`가장 최근 메세지 시간: ${new Date(latestMessage.sendDate).toLocaleString()}`} fontSize="md" hasArrow>
                                    <ListItem p={3} borderWidth={1} borderRadius="lg" borderColor="gray.200">
                                        <Grid templateColumns="1fr 2fr 1fr" alignItems="center">
                                            <GridItem>
                                                <Text fontSize="lg" display={'flex'} alignItems={'center'}>
                                                    <Icon as={FaEnvelopeOpenText} mr={5} />
                                                    {userId === user.id ? "나와의 쪽지함" : userId + "님과의 쪽지함"}
                                                </Text>
                                            </GridItem>
                                            <GridItem ml={5} textAlign="start">
                                                <Text fontSize="md" color="gray.500">
                                                    {latestMessageContent}
                                                </Text>
                                            </GridItem>
                                            <GridItem display="flex" justifyContent="flex-end" alignItems="center">
                                                {userMessages[userId] > 0 && (
                                                    <Badge colorScheme="red" ml={2}>
                                                        {userMessages[userId]} new
                                                    </Badge>
                                                )}
                                                <Button onClick={()=>{
                                                    navigate(`/message/${userId}`)
                                                }} size="sm" colorScheme="teal" ml={2}>보기</Button>
                                            </GridItem>
                                        </Grid>
                                    </ListItem>
                                </Tooltip>
                            );
                        })}
                    </List>
                </VStack>
            </Box>
        </Flex>
    );
};

export default MyMessageBox;
