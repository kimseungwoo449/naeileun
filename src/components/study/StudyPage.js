import {React, useState, useEffect} from 'react';
import { Heading, Box, HStack,Card,Image,Stack,CardBody,Text,Icon} from '@chakra-ui/react';
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const StudyPage = () =>{
    const navigate = useNavigate();

    const [studyList,setStudyList] = useState([]);
    const [load, setLoad] = useState([]);
    
    const myStudyList = null;
    const FaStudyList = null;

    const fetchMyStudy = async() =>{

        const response = await fetch(
            `${process.env.REACT_APP_SERVER_URL}/study/myGroup`,
            {
                method : "GET",
                headers: {
                    Authorization: `ADMIN ${process.env.REACT_APP_ADMIN_KEY}`,
                    "Content-Type": "application/json;charset=UTF8"
                }
            }
        );

        const data = await response.json();
        console.log(data);

        setStudyList(data.result);
    }
    
    
    const movePage = (e) =>{
        const command = e.target.id;
        console.log(command);
        if(command === "create-study"){
            navigate('/study/create');
            return;
        }
    }

    useEffect(() =>{
        fetchMyStudy();
    },[load]);

    
    const submit= (e) =>{
        e.preventDefault();
        const form = document.querySelector('form');
        console.log("submit " + e.target);
    }

    return(
        <>
            <Box minW={'700px'} ml={'150px'} >
                <form method='GET' action={`${process.env.REACT_SERVER_URL}/studyDetail`}>
                <input type='hidden' name="command" value="boardDetail"></input>
                    <HStack m={'10px 10px'}>
                        <Heading fontSize={'1.3em'}>나의 스터디 그룹</Heading>
                        <Heading as={'h3'} fontSize={'1em'} ml={'80px'}>스터디 그룹 생성</Heading>
                        
                        <Icon id="create-study" as={FaPlus} h={'22px'} w={'22px'} mt={'5px'} backgroundColor={'RGBA(0, 0, 0, 0.08)'} borderRadius={'3px'} onClick={movePage}/>

                        
                    </HStack>
                    <HStack wrap={"wrap"} minH={'200px'} gap={"10px"} m={"40px 10px"}>
                        {/* {studyList.map((study,index) =>())} */}
                        <Card id="" boxSize={'200px'} _hover={{ cursor:"pointer"}} onClick={submit}>
                            <CardBody>
                                <Image w={'150px'} h={'120px'} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFXOOcZnaslyfjPTGV4q_PlLC9Ypmg8kzTgBP5Nrg_FA&s" alt="" />
                                <Stack mt={'5px'}>
                                    <Text as={'h4'} fontSize={'0.8em'}>스터디 그룹명</Text>
                                    <Text as={'h5'} fontSize={'0.7em'}>스터디 소개명</Text>    
                                </Stack>
                            </CardBody>
                        </Card>
                    </HStack>
                    <HStack  m={'10px 10px'}>
                    <Heading fontSize={'1.3em'}>인기 스터디 그룹</Heading>
                    </HStack>
                    <HStack wrap={"wrap"} h={'200px'} gap={"10px"} m={"40px 10px"} _hover={{ cursor:"pointer"}}>
                        
                        <Card boxSize={'200px'} _hover={{ cursor:"pointer"}} onClick={submit}>
                            <CardBody>
                                <Image w={'150px'} h={'120px'} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFXOOcZnaslyfjPTGV4q_PlLC9Ypmg8kzTgBP5Nrg_FA&s" alt="" />
                                <Stack mt={'5px'}>                                    <Text as={'h4'} fontSize={'0.8em'}>스터디 그룹명</Text>
                                    <Text as={'h5'} fontSize={'0.7em'}>스터디 소개명</Text>    
                                </Stack>
                            </CardBody>
                        </Card>

                    </HStack>

                </form>
                
            </Box>
        </>
    )
}
export default StudyPage;