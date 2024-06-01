// import { Box, Button, Flex, Text, Input, VStack, Grid, GridItem, Heading } from '@chakra-ui/react';
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { useLogin } from '../LoginContext';

// const FirstMessage = () => {
//     const { user } = useLogin();
//     const [newMessage, setNewMessage] = useState('');
//     const [isSubmit, setIsSubmit] = useState(false);

//     const handleSendMessage = async (e) => {
//         e.preventDefault();

//         const req = {
//             "user_id": user.id,
//             "target_id": target,
//             "content": newMessage
//         };

//         setNewMessage('');

//         try {
//             const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/message`, {
//                 method: 'POST',
//                 headers: {
//                     Authorization: `ADMIN ${process.env.REACT_APP_ADMIN_KEY}`,
//                     "Content-Type": "application/json;charset=UTF8"
//                 },
//                 body: JSON.stringify(req),
//             });

//             // Check for a successful response
//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//             const data = await response.json();
//             setIsSubmit(!isSubmit);
//             setNewMessage('');  // Clear the input field after sending the message
//         } catch (error) {
//             console.error('Error sending message:', error);
//         }
//     };

//     return (
//         <Flex direction="column" h="100vh" p={5} w={'70%'} m={'auto'} justifyContent={'center'} >
//             <Heading mb={5} textAlign="center">새 쪽지 보내기</Heading>
//             <Box flex="1" overflowY="auto" border={'1px solid lightgray'} p={'50px'} borderRadius={'20px'} boxShadow={'lg'}>
//                 <VStack spacing={4} align="stretch">
//                     {messages.map((msg, index) => (
//                         <Grid
//                             key={index}
//                             templateColumns="1fr auto 1fr"
//                             gap={2}
//                             justifyItems={msg.sendUserCode === parseInt(user.userCode) ? 'flex-end' : 'flex-start'}
//                         >
//                             <GridItem colStart={msg.sendUserCode === parseInt(user.userCode) ? 5 : 1}>
//                                 <Box
//                                     maxW="300px"
//                                     bg={msg.sendUserCode === parseInt(user.userCode) ? 'teal.100' : 'gray.100'}
//                                     borderRadius="md"
//                                     p={3}
//                                 >
//                                     <Text>{msg.content}</Text>
//                                     <Text fontSize="xs" color="gray.500" textAlign="right">
//                                         {new Date(msg.sendDate).toLocaleString()}
//                                     </Text>
//                                 </Box>
//                             </GridItem>
//                         </Grid>
//                     ))}
//                 </VStack>
//             </Box>
//             <form onSubmit={handleSendMessage}>
//                 <Box mt={4}>
//                     <Flex>
//                         <Input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="메세지 입력" />
//                         <Button type='submit' colorScheme="teal" ml={2}>전송</Button>
//                     </Flex>
//                 </Box>
//             </form>
//         </Flex>
//     );
// };

// export default FirstMessage;

import { Box, Button, Flex, Text, Input, VStack, Heading, FormControl, FormLabel } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useLogin } from '../LoginContext';
import { useNavigate } from 'react-router-dom';

const FirstMessage = () => {
    const { user } = useLogin();
    const [newMessage, setNewMessage] = useState('');
    const [targetId, setTargetId] = useState('');
    const navigate = useNavigate();

    const handleSendMessage = async (e) => {
        e.preventDefault();


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

            // Check for a successful response
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Message sent:', data);

            if (data.status) {
                navigate(`/message/${targetId}`);
            } else {
                navigate(`/`);
            }

        } catch (error) {
            console.error('Error sending message:', error);
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
                        <Button type='submit' colorScheme="teal" w="full">전송</Button>
                    </VStack>
                </form>
            </Box>
        </Flex>
    );
};

export default FirstMessage;
