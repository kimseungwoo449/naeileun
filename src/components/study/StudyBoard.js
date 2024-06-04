import {React, useRef, useState } from 'react';
import {Box, Text, Button, HStack, Image, Icon, Stack, Input} from '@chakra-ui/react';
import {useNavigate, useLocation} from 'react-router-dom';
import { IoChatbubble } from "react-icons/io5";
import { MdSettings, MdMoreHoriz, MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { useEffect } from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableContainer,
} from '@chakra-ui/react'
import { useLogin } from '../LoginContext';

const StudyBoard = () =>{
    const navigate = useNavigate();
    const location = useLocation(); // 2번 라인
    const groupCode = location.state.groupCode;

    const { user } = useLogin();

    const [post, setPost] = useState([]);
    const [study, setStudy] = useState([]);
    const [isMember,setIsMember] = useState(false);

    const [page, setPage] = useState(1);
    const [load, setLoad] = useState();

    const postsPerPage = 5; // 페이지당 보여줄 게시판 수
    const pageCount = useRef(1);

    const fetchBoard = async(userCode) => {
        const req = {
            "group_code" : groupCode,
            //user 수정 연결 후 수정 **********
            "user_code" : userCode
        }

        console.log(req);

        const response = await fetch(
            `${process.env.REACT_APP_SERVER_URL}/study/board`, {
                method: 'POST',
                headers: {
                    Authorization: `ADMIN ${process.env.REACT_APP_ADMIN_KEY}`,
                    "Content-Type": "application/json;charset=UTF8"
                },
                body:JSON.stringify(req)
        });

        const data  = await response.json();
        console.log(data.result[0]);
        console.log(data.result[0].isMember);
        console.log(data.meta);
        setPost(data.result[0].post);
        setStudy(data.result[0].study);
        setIsMember(data.result[0].isMember.isMember);

        const postSize = data.meta.total_count;
        console.log(postSize);

        const totalPosts = data.meta.total_count; // 총 게시판 수
        pageCount.current = Math.ceil(totalPosts / postsPerPage);
        pageCount.current = pageCount.current > 5 ? 5 : pageCount.current;
    }
    

    const quit = async() =>{
        const request = { 
            "group_code" : groupCode,
            "user_code" : user.userCode //login 구현 후 수정
        }

        const response = await fetch(
            `${process.env.REACT_APP_SERVER_URL}/study/deleteMember`, {
                method: 'DELETE',
                headers: {
                    Authorization: `ADMIN ${process.env.REACT_APP_ADMIN_KEY}`,
                    "Content-Type": "application/json;charset=UTF8"
                },
                body:JSON.stringify(request)
        });

        const data = await response.json();
        console.log(data);
        if(data.status === true){
            navigate('/study');
        }
    }

    const join = async () =>{
        if(study.autoMemberAccess === "false"){
            navigate("/study/join",{state :{groupCode : groupCode}});
            return;
        }

        const request = { 
            "group_code" : groupCode,
            "user_code" : user.userCode  //userId일 시 백도 수정
        }

        const response = await fetch(
            `${process.env.REACT_APP_SERVER_URL}/study/joinMember`, {
                method: 'POST',
                headers: {
                    Authorization: `ADMIN ${process.env.REACT_APP_ADMIN_KEY}`,
                    "Content-Type": "application/json;charset=UTF8"
                },
                body:JSON.stringify(request)
        });

        const data = await response.json();
        console.log(data);
        console.log("status : "+data.status);
        if(data.status === true){
            setLoad(1);
        }
        
    }

    const setting =(e)=>{
        if(study.adminCode === user.userCode){
            navigate('/study/setting/access',{state :{groupCode : groupCode, adminCode :study.adminCode}});
            return;
        }

        navigate('/study/board',{state:{groupCode : groupCode}});
    }

    useEffect(()=>{
        if (user) {
            fetchBoard(user.userCode);
        } else {
            navigate('/user/login');
        }
    },[load,page,user,navigate]);
    

    return(
        <>
        <Box h={'80vh'} w={"750px"} margin={'auto'}>
            <form method="POST" action="">
                <HStack ml={'20px'}>
                    <Text as={'b'} fontSize={'1.5em'} ml={'5px'} mr={'10px'} textAlign={'center'}>{study.name}</Text>
                    <Text>그룹 채팅방 입장</Text>
                    <Icon as={IoChatbubble}></Icon>
                    <HStack ml={'auto'}>
                        {
                             //user //need user update
                            study.adminCode === user.userCode ?
                            <Input type='hidden'></Input> : 
                            (
                                isMember === true ?
                                <Button onClick={quit} w={'60px'} id="cancle">탈퇴</Button>:
                                <Button onClick={join} w={'60px'} colorScheme='blue'>가입신청</Button>
                            )
                        }
                    </HStack>
                </HStack>
                <HStack mt={"20px"} mb={"20px"}  h={'100px'} ml={'20px'}>
                    <Image src='' border={"solid 1px gray"} w={'100px'} h={'100px'}></Image>
                    <Text h={'100px'} w={"300px"} pl={"10px"}>{study.decription}</Text>
                    <Stack  ml={'auto'} h={'100px'}>
                        {
                            //수정 수정 수정 수정 수정 수정
                            //user code 가져오기 //수정요함
                            user.userCode === study.adminCode ?
                            <Icon as={MdSettings} onClick={setting} boxSize={'1.4em'}></Icon> : 
                            <Input type='hidden'></Input>
                        }
                        
                    </Stack>
                </HStack>
                <HStack wrap={"wrap"} h={'200px'} gap={"10px"} _hover={{ cursor:"pointer"}} ml={'20px'}>
                    <Text as={'b'} fontSize="1.2em" mt={'10px'}>그룹 게시판</Text>
                    <Button ml={'auto'}>글쓰기</Button>
                    <TableContainer w={"1000px"} key={'board'}>
                            <Table >
                                <Thead>
                                    <Tr>
                                        <Th>순서</Th>
                                        <Th>제목</Th>
                                        <Th>게시일</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {post.map((post, index) => (
                                        <Tr key={post.postCode}>
                                            <Td>{((page-1) * 6) + index+1}</Td>
                                            <Td w={'200px'}>{post.title}</Td>
                                            <Td>{post.updateDate}</Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                                <Tfoot>
                                </Tfoot>
                            </Table>
                        </TableContainer>
                        <HStack m={'auto'}>
                            <Icon as={MdNavigateBefore} boxSize={'1.4em'} mt={'3px'} _hover={{ cursor:"pointer"}}></Icon>
                            <Text fontSize={'1.1em'}  textAlign={'center'} _hover={{ cursor:"pointer"}}>{page}</Text>
                            <Icon as={MdNavigateNext} boxSize={'1.4em'} mt={'3px'} _hover={{ cursor:"pointer"}}></Icon>
                        </HStack>
                </HStack>
                
            </form>
        </Box>
        </>
    )
}

export default StudyBoard;