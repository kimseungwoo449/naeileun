import {React, useState, useEffect} from 'react';
import { Heading, Box, HStack,Card,Image,Stack,CardBody,Text,Icon} from '@chakra-ui/react';
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
// import { useLogin } from '../LoginContext';

const StudyPage = () =>{
    const navigate = useNavigate();

    const [studyList,setStudyList] = useState([]);
    const [load, setLoad] = useState();
    const [popularList, setPopularList] = useState([]);
    
    //const {user} = useLogin;

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
        ).then(response => response.json())
        .then(data => {
            console.log(data);
            setStudyList(data.result);
        });



        const pgResponse = await fetch(
            `${process.env.REACT_APP_SERVER_URL}/study/popularGroup`,
            {
                method : "GET",
                headers: {
                    Authorization: `ADMIN ${process.env.REACT_APP_ADMIN_KEY}`,
                    "Content-Type": "application/json;charset=UTF8"
                }
            }
        ).then(response => response.json())
        .then(data => {
            console.log(data);
            setPopularList(data.result);
        });
    }
    
    
    const createStudy = (e) =>{
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
        const groupCode = e.target.id;
        console.log(groupCode);

        if(groupCode !== null){
            navigate('/study/board',{state :{groupCode : groupCode}});
            return;
        }
        
    }

    return(
        <>
            <Box minW={'750px'} ml={'150px'}>
                <form method='POST' action={`${process.env.REACT_SERVER_URL}/study/board`}>
                <input type='hidden' id="group_code" name="group_code" value="boardDetail"></input>

                    <HStack m={'40px 10px'}>
                        <Heading fontSize={'1.3em'}>나의 스터디 그룹</Heading>
                        <Heading as={'h3'} fontSize={'1em'} ml={'80px'}>스터디 그룹 생성</Heading>
                        
                        <Icon id="create-study" onClick={createStudy} as={FaPlus} h={'22px'} w={'22px'} mt={'5px'} backgroundColor={'RGBA(0, 0, 0, 0.08)'} borderRadius={'3px'} _hover={{cursor:"pointer"}}/>
                    </HStack>

                    <HStack wrap={"wrap"} minH={'200px'} maxw={'980px'} gap={"10px"} m={"40px 10px"} >
                        {studyList.map((study,index) =>(
                            <Card id={study.groupCode} key={study.groupCode} boxSize={'200px'} mr={'30px'} _hover={{ cursor:"pointer"}} onClick={submit} >
                                <CardBody id={study.groupCode}>
                                    <Image id={study.groupCode} w={'150px'} h={'120px'} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFXOOcZnaslyfjPTGV4q_PlLC9Ypmg8kzTgBP5Nrg_FA&s" alt="" />
                                    <Stack id={study.groupCode} mt={'5px'}>
                                        <Text id={study.groupCode} as={'h4'} fontSize={'0.8em'}>{study.name}</Text>
                                        <Text id={study.groupCode} as={'h5'} fontSize={'0.7em'}>{study.decription}</Text>    
                                    </Stack>
                                </CardBody>
                            </Card>
                        ))}
                    </HStack>

                    <HStack  m={'10px 10px'}>
                    <Heading fontSize={'1.3em'}>인기 스터디 그룹</Heading>
                    </HStack>
                    
                    <HStack wrap={"wrap"} minH={'200px'} maxw={'980px'} gap={"10px"} m={"40px 10px"} >
                        {popularList.map((popular,index) =>(
                            <Card id={popular.groupCode} key={popular.groupCode} boxSize={'200px'} mr={'30px'} _hover={{ cursor:"pointer"}} onClick={submit} >
                                <CardBody id={popular.groupCode}>
                                    <Image id={popular.groupCode} w={'150px'} h={'120px'} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFXOOcZnaslyfjPTGV4q_PlLC9Ypmg8kzTgBP5Nrg_FA&s" alt="" />
                                    <Stack id={popular.groupCode} mt={'5px'}>
                                        <Text id={popular.groupCode} as={'h4'} fontSize={'0.8em'}>{popular.name}</Text>
                                        <Text id={popular.groupCode} as={'h5'} fontSize={'0.7em'}>{popular.decription}</Text>    
                                    </Stack>
                                </CardBody>
                            </Card>
                        ))}
                        
                    </HStack>

                </form>
                
            </Box>
        </>
    )
}
export default StudyPage;