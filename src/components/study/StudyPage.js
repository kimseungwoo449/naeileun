import React, { useState, useEffect } from 'react';
import { Heading, Box, HStack, Card, Image, Stack, CardBody, Text, IconButton } from '@chakra-ui/react';
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../LoginContext';

const StudyPage = () => {
    const navigate = useNavigate(); 
    const { user } = useLogin();

    const [studyList, setStudyList] = useState([]);
    const [popularList, setPopularList] = useState([]);

    const fetchMyStudy = async (userId, userCode) => {
        const req = {
            "user_id" : userId,
            "user_code" : userCode
        };

        const response = await fetch(
            `${process.env.REACT_APP_SERVER_URL}/study/myGroup`,
            {
                method: "POST",
                headers: {
                    Authorization: `ADMIN ${process.env.REACT_APP_ADMIN_KEY}`,
                    "Content-Type": "application/json;charset=UTF8"
                },
                body: JSON.stringify(req)
            }
        );

        const studyData = await response.json();
        if (studyData.status === false) {
            return;
        }

        setStudyList(studyData.result[0]);
        setPopularList(studyData.result[1]);
    };

    const createStudy = () => {
        navigate('/study/create');
    };

    useEffect(() => {
        if (user) {
            fetchMyStudy(user.id, user.userCode);
        } else {
            alert("로그인 후 이용가능합니다.");
            navigate('/user/login');
            return;
        }
    }, [user, navigate]);

    const submit = (e) => {
        e.preventDefault();
        const groupCode = e.currentTarget.id;
        if (groupCode) {
            navigate('/study/board', { state: { groupCode: groupCode } });
        }
    };

    return (
        <Box minW="980px" margin="auto">
            <form method="POST" action={`${process.env.REACT_SERVER_URL}/study/board`}>
                <input type="hidden" id="group_code" name="group_code" value="boardDetail" />

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
                                <Image id={study.groupCode} w="130px" h="100px" src="" alt="" />
                                <Stack id={study.groupCode} mt="5px">
                                    <Text id={study.groupCode} as="h4" fontSize="0.8em">{study.name}</Text>
                                    <Text id={study.groupCode} as="h5" fontSize="0.7em">{study.description}</Text>
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
                                <Image id={popular.groupCode} w="130px" h="100px" src="" alt="" />
                                <Stack id={popular.groupCode} mt="5px">
                                    <Text id={popular.groupCode} as="h4" fontSize="0.8em">{popular.name}</Text>
                                    <Text id={popular.groupCode} as="h5" fontSize="0.7em">{popular.description}</Text>
                                </Stack>
                            </CardBody>
                        </Card>
                    ))}
                </HStack>
            </form>
        </Box>
    );
};

export default StudyPage;
