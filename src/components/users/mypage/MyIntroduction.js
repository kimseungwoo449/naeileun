import { Box, Button, Flex, Icon, Text, Tooltip, VStack, Skeleton, SkeletonText, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from '@chakra-ui/react';
import React, { useEffect, useState, useRef } from 'react';
import { useLogin } from '../../LoginContext';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineLibraryBooks } from "react-icons/md";
import { FaWrench, FaTrashAlt } from "react-icons/fa";

const MyIntroduction = () => {
    const navigate = useNavigate();
    const { user } = useLogin();
    const [introductions, setIntroductions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState({ show: false, title: '', description: '' });
    const cancelRef = useRef();

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
                    const flatData = Object.keys(data).map(key => ({
                        documentCode: key,
                        title: data[key][0].title,
                        updateDate: data[key][0].updateDate
                    }));
                    setIntroductions(flatData);
                }
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
            });
    }, [user]);

    const handleDelete = (documentCode) => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/self-introduction/${documentCode}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `ADMIN ${process.env.REACT_APP_ADMIN_KEY}`,
                'Content-Type': 'application/json;charset=UTF8'
            },
            body: JSON.stringify({
                "user_id": user.id,
                "document_code": documentCode
            })
        })
            .then(response => {
                if (response.ok) {
                    setIntroductions(introductions.filter(item => item.documentCode !== documentCode));
                } else {
                    setAlert({
                        show: true,
                        title: 'Error',
                        description: '삭제에 실패했습니다. 다시 시도해주세요.'
                    });
                }
            })
            .catch(error => {
                setAlert({
                    show: true,
                    title: 'Error',
                    description: '삭제에 실패했습니다. 다시 시도해주세요.'
                });
            });
    };

    return (
        <Box p={5}>
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

            <Flex justifyContent="space-between" alignItems="center" mb={4}>
                <Text as={'b'} fontSize="3xl">나의 자기소개서</Text>
                <Button colorScheme="teal" size="sm" onClick={() => navigate('/introduction/write')}>+</Button>
            </Flex>
            <VStack align="stretch" spacing={4}>
                {loading ? (
                    Array(5).fill("").map((_, index) => (
                        <Box key={index} p={5} borderWidth={1} borderRadius="lg" borderColor="gray.200">
                            <Skeleton height="20px" width="70%" mb={4} />
                            <SkeletonText mt="4" noOfLines={1} spacing="4" />
                        </Box>
                    ))
                ) : (
                    introductions.map((introduction, index) => (
                        <Box key={index} className='introduction-container' p={5} borderWidth={1} borderRadius="lg" borderColor="gray.200">
                            <Flex justifyContent="space-between" alignItems="center">
                                <Box>
                                    <Link to={`/introduction/viewDetail/${introduction.documentCode}`}>
                                        <Tooltip hasArrow label={`수정일: ${introduction.updateDate}`} bg='blue.300' color='white'>
                                            <Text as={'b'} fontSize={'20px'} display={'flex'} alignItems={'center'} ><Icon as={MdOutlineLibraryBooks} mr={'10px'} />{introduction.title}</Text>
                                        </Tooltip>
                                    </Link>
                                </Box>
                                <Box display="flex" gap="2">
                                    <Button leftIcon={<FaWrench />} variant={'outline'} colorScheme="blue" onClick={() => navigate(`/introduction/update/${introduction.documentCode}`)}>수정</Button>
                                    <Button leftIcon={<FaTrashAlt />} variant={'outline'} colorScheme="red" onClick={() => handleDelete(introduction.documentCode)}>삭제</Button>
                                </Box>
                            </Flex>
                        </Box>
                    ))
                )}
            </VStack>
        </Box>
    );
};

export default MyIntroduction;
