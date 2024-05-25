import {React} from 'react';
import {Box, Text, Button, HStack, Image, Icon, Stack} from '@chakra-ui/react';
import {useNavigate, useLocation } from 'react-router-dom';
import { IoChatbubble } from "react-icons/io5";
import { MdSettings } from "react-icons/md";

const StudyBoard = () =>{

    const {state} = useLocation();	// 2번 라인
    const {groupCode} = state;


    const fetch = async =>{
        const req = {
            "group_code" : groupCode
        }

        fetch(`${process.env.REACT_APP_SERVER_URL}/study/board`, {
            method: 'POST',
            headers: {
                Authorization: `ADMIN ${process.env.REACT_APP_ADMIN_KEY}`,
                "Content-Type": "application/json;charset=UTF8"
            },
            body:JSON.stringify(req)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);

            });
    }

    return(
        <>
        <Box h={'80vh'} w={"650px"} ml={'25%'}>
            <form method="POST" action="">
                <HStack>
                    <Text>스터디 그룹명</Text>
                    <Text>그룹 채팅방 입장</Text>
                    <Icon as={IoChatbubble}></Icon>
                    <Button onClick={""} w={'60px'} id="cancle">탈퇴</Button>
                    <Button onClick={""} w={'60px'} colorScheme='blue'>가입신청</Button>
                </HStack>
                <HStack alignItems={'flex-start'}>
                    <Image src='' border={"solid 1px gray"} w={'100px'} h={'100px'}></Image>
                    <Stack alignItems={'flex-end'}>
                        <Text >스터디 그룹 소개</Text>
                        <Icon as={MdSettings}></Icon>
                    </Stack>
                </HStack>
                <Stack>
                    <Text>그룹 게시판</Text>
                    <HStack>
                        <Text>게시글 제목</Text>
                        <Text>작성시간</Text>
                    </HStack>
                </Stack>
                
            </form>
        </Box>
        </>
    )
}

export default StudyBoard;