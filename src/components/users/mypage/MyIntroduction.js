// import { Box, Flex, VStack } from '@chakra-ui/react';
// import React, { useEffect, useState } from 'react';
// import { useLogin } from '../../LoginContext';
// import { useNavigate } from 'react-router-dom';

// const MyIntroduction = () => {
//     const navigate = useNavigate();
//     const { user } = useLogin();
    
//     const[introductions,setIntroductions] = useState({});

//     useEffect(() => {
//         fetch(`${process.env.REACT_APP_SERVER_URL}/self-introduction`, {
//             method: 'GET',
//             headers: {
//                 "Authorization": `ADMIN ${process.env.REACT_APP_ADMIN_KEY}`,
//                 'Content-Type': 'application/json;charset=UTF8'
//             },
//             body: {
//                 "user_id" : user.id
//             }
//         })
//             .then(response => response.json())
//             .then(data => {
//                 if (data) {
//                     setIntroductions(data);
//                 } else {
//                     console.error('No data received');
//                 }
//             })
//             .catch(error => console.error('Error fetching resume data:', error));
//     }, [user]);

//     return (
//         <Box>
//             <Flex justifyContent="space-between" alignItems="center" mb="4">
//                     <Text as={'b'} fontSize="3xl">나의 자기소개서</Text>
//                     <Button colorScheme="teal" size="sm" onClick={() => navigate('/')}>+</Button>
//             </Flex>
//             <VStack align="stretch" spacing="4">
//                 {introductions.map((introduction,index)=>{

//                 })}
//             </VStack>
//         </Box>
//     );
// };

// export default MyIntroduction;

// import { Box, Button, Flex, Text, Tooltip, VStack } from '@chakra-ui/react';
// import React, { useEffect, useState } from 'react';
// import { useLogin } from '../../LoginContext';
// import { Link, useNavigate } from 'react-router-dom';

// const MyIntroduction = () => {
//     const navigate = useNavigate();
//     const { user } = useLogin();
//     const [introductions, setIntroductions] = useState([]);

//     useEffect(() => {
//         fetch(`${process.env.REACT_APP_SERVER_URL}/self-introduction?user_id=${user.id}`, {
//             method: 'GET',
//             headers: {
//                 "Authorization": `ADMIN ${process.env.REACT_APP_ADMIN_KEY}`,
//                 'Content-Type': 'application/json;charset=UTF8'
//             }
//         })
//             .then(response => response.json())
//             .then(data => {
//                 if (data) {
//                     // Flatten the data to get one item per document_code
//                     const flatData = Object.keys(data).map(key => ({
//                         documentCode: key,
//                         title: data[key][0].title,
//                         updateDate: data[key][0].updateDate
//                     }));
//                     setIntroductions(flatData);
//                 } else {
//                     console.error('No data received');
//                 }
//             })
//             .catch(error => console.error('Error fetching introduction data:', error));
//     }, [user]);

//     return (
//         <Box p={5}>
//             <Flex justifyContent="space-between" alignItems="center" mb={4}>
//                 <Text as={'b'} fontSize="3xl">나의 자기소개서</Text>
//                 <Button colorScheme="teal" size="sm" onClick={() => navigate('/introduction/write')}>+</Button>
//             </Flex>
//             <VStack align="stretch" spacing={4}>
//                 {introductions.map((introduction, index) => (
//                     <Box key={index} className='introduction-container' p={5} borderWidth={1} borderRadius="lg" borderColor="gray.200">
//                         <Flex justifyContent="space-between" alignItems="center">
//                             <Box>
//                                 <Link to={`/introduction/viewDetail/${introduction.documentCode}`}>
//                                     <Tooltip hasArrow label={`수정일: ${introduction.updateDate}`} bg='blue.300' color='white'>
//                                         <Text as={'b'} fontSize={'20px'}>{introduction.title}</Text>
//                                     </Tooltip>
//                                 </Link>
//                             </Box>
//                         </Flex>
//                     </Box>
//                 ))}
//             </VStack>
//         </Box>
//     );
// };

// export default MyIntroduction;

import { Box, Button, Flex, Text, Tooltip, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useLogin } from '../../LoginContext';
import { Link, useNavigate } from 'react-router-dom';

const MyIntroduction = () => {
    const navigate = useNavigate();
    const { user } = useLogin();
    const [introductions, setIntroductions] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/self-introduction?user_id=${user.id}`, {
            method: 'GET',
            headers: {
                "Authorization": `ADMIN ${process.env.REACT_APP_ADMIN_KEY}`,
                'Content-Type': 'application/json;charset=UTF8'
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    // Flatten the data to get one item per document_code
                    const flatData = Object.keys(data).map(key => ({
                        documentCode: key,
                        title: data[key][0].title,
                        updateDate: data[key][0].updateDate
                    }));
                    setIntroductions(flatData);
                } else {
                    console.error('No data received');
                }
            })
            .catch(error => console.error('Error fetching introduction data:', error));
    }, [user]);

    const handleDelete = (documentCode) => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/self-introduction/${documentCode}`, {
            method: 'DELETE',
            headers: {
                Authorization: `ADMIN ${process.env.REACT_APP_ADMIN_KEY}`,
                'Content-Type': 'application/json;charset=UTF8'
            },
            body: JSON.stringify({
                "user_id" : user.id,
                "document_code" : documentCode
            }) 
        })
            .then(response => {
                if (response.ok) {
                    setIntroductions(introductions.filter(item => item.documentCode !== documentCode));
                } else {
                    console.error('Failed to delete');
                }
            })
            .catch(error => console.error('Error deleting introduction:', error));
    };

    return (
        <Box p={5}>
            <Flex justifyContent="space-between" alignItems="center" mb={4}>
                <Text as={'b'} fontSize="3xl">나의 자기소개서</Text>
                <Button colorScheme="teal" size="sm" onClick={() => navigate('/introduction/write')}>+</Button>
            </Flex>
            <VStack align="stretch" spacing={4}>
                {introductions.map((introduction, index) => (
                    <Box key={index} className='introduction-container' p={5} borderWidth={1} borderRadius="lg" borderColor="gray.200">
                        <Flex justifyContent="space-between" alignItems="center">
                            <Box>
                                <Link to={`/introduction/viewDetail/${introduction.documentCode}`}>
                                    <Tooltip hasArrow label={`수정일: ${introduction.updateDate}`} bg='blue.300' color='white'>
                                        <Text as={'b'} fontSize={'20px'}>{introduction.title}</Text>
                                    </Tooltip>
                                </Link>
                            </Box>
                            <Box display="flex" gap="2">
                                <Button colorScheme="blue" onClick={() => navigate(`/introduction/update/${introduction.documentCode}`)}>수정</Button>
                                <Button colorScheme="red" onClick={() => handleDelete(introduction.documentCode)}>삭제</Button>
                            </Box>
                        </Flex>
                    </Box>
                ))}
            </VStack>
        </Box>
    );
};

export default MyIntroduction;
