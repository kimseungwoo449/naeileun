import React, { useState, useEffect } from 'react';
import {
    Heading, Box, HStack, Card, Stack, CardBody, Text, IconButton, Input,
    AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Button
} from '@chakra-ui/react';
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../LoginContext';

const StudyPage = () => {
    const navigate = useNavigate();
    const { user } = useLogin();

    const [studyList, setStudyList] = useState([]);
    const [popularList, setPopularList] = useState([]);
    const [fetched, setFetched] = useState(false);
    const [load, setLoad] = useState(1);

    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => {
        setIsOpen(false);
        navigate('/user/login');
    };
    const cancelRef = React.useRef();

    const fetchMyStudy = async (userCode) => {
        if (fetched) {
            return;
        }

        const response = await fetch(
            `${process.env.REACT_APP_SERVER_URL}/study/myGroup?user_code=${userCode}`,
            {
                method: "GET",
                headers: {
                    Authorization: `ADMIN ${process.env.REACT_APP_ADMIN_KEY}`,
                    "Content-Type": "application/json;charset=UTF8"
                }
            }
        );

        const studyData = await response.json();

        if (studyData.status) {
            setFetched(true);
        } else {
            setLoad(load + 1);
        }

        setStudyList(studyData.result[0]);
        setPopularList(studyData.result[1]);
    };

    const createStudy = () => {
        navigate('/study/create');
    };

    useEffect(() => {
        if (user) {
            fetchMyStudy(user.userCode);
        } else {
            setIsOpen(true);
        }
    }, [user]);

    const submit = (e) => {
        e.preventDefault();
        const groupCode = e.currentTarget.id;
        if (groupCode) {
            navigate('/study/board', { state: { groupCode } });
        }
    };

    return (
        <Box minW="980px" margin="auto">
            <Input type="hidden" id="group_code" name="group_code" value="boardDetail" />

            <HStack m="40px">
                <Heading fontSize="1.3em">나의 스터디 그룹</Heading>
                <Heading as="h3" fontSize="1em" ml="80px">스터디 그룹 생성</Heading>
                <IconButton
                    id="create-study"
                    onClick={createStudy}
                    icon={<FaPlus />}
                    size="sm"
                    mt="1px"
                    ml="10px"
                    backgroundColor="RGBA(0, 0, 0, 0.08)"
                    borderRadius="3px"
                    _hover={{ cursor: "pointer" }}
                />
            </HStack>

            <HStack wrap="wrap" minH="200px" maxW="900px" gap="10px" m="40px">
                {studyList.map((study, index) => (
                    <Card key={index} id={study.groupCode} boxSize="180px" mr="20px" _hover={{ cursor: "pointer" }} onClick={submit}>
                        <CardBody id={study.groupCode}>
                            <Stack id={study.groupCode} mt="5px">
                                <Text id={study.groupCode} as="h4" fontSize="1.3em" isTruncated>{study.name}</Text>
                                <Text id={study.groupCode} as="h5" fontSize="0.9em" isTruncated>{study.decription}</Text>
                                <Text id={study.groupCode} as="h5" fontSize="0.9em" isTruncated>관리자 : {study.adminId}</Text>
                            </Stack>
                        </CardBody>
                    </Card>
                ))}
            </HStack>

            <HStack m="40px">
                <Heading fontSize="1.3em">인기 스터디 그룹</Heading>
            </HStack>

            <HStack wrap="wrap" minH="200px" maxW="900px" gap="10px" m="40px">
                {popularList.map((popular, index) => (
                    <Card id={popular.groupCode} key={index + 1000} boxSize="180px" mr="20px" _hover={{ cursor: "pointer" }} onClick={submit}>
                        <CardBody id={popular.groupCode}>
                            <Stack id={popular.groupCode} mt="5px">
                                <Text id={popular.groupCode} as="h4" fontSize="1.3em" isTruncated>{popular.name}</Text>
                                <Text id={popular.groupCode} as="h5" fontSize="0.9em" isTruncated>{popular.decription}</Text>
                                <Text id={popular.groupCode} as="h5" fontSize="0.9em" isTruncated>관리자:{popular.adminId}</Text>
                            </Stack>
                        </CardBody>
                    </Card>
                ))}
            </HStack>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent backgroundColor='#eb7368'>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold" color={'white'}>
                            로그인 필요
                        </AlertDialogHeader>
                        <AlertDialogBody color={'white'}>
                            로그인 후 이용 가능합니다.
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                확인
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </Box>
    );
};

export default StudyPage;
