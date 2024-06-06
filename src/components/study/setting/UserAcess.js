import {React, useState, useEffect} from 'react';
import { HStack,Stack,Text,Button} from '@chakra-ui/react';
import {useNavigate, useLocation } from 'react-router-dom';
import { useLogin } from '../../LoginContext';
const UserAcess = () =>{
    const navigate = useNavigate();
    const location = useLocation();

    const [standbymembers,setStandbyMembers] = useState([]);
    const [size, setSize] = useState();
    const [load,setLoad] = useState(1);

    const {user} = useLogin();

    const groupCode = location.state.groupCode;

    const getStandbyMembers = async() =>{

        const response = await fetch(
            `${process.env.REACT_APP_SERVER_URL}/study/getStandbyMembers?user_code=${user.userCode}&group_code=${groupCode}`,{
                method: 'GET',
                headers: {
                    Authorization: `ADMIN ${process.env.REACT_APP_ADMIN_KEY}`
                }
            }
        )

        const data = await response.json();
        setStandbyMembers(data.result);
    }

    const refuse = async (e) =>{
        const userCode = e.target.id;

        const req ={
            "group_code" : groupCode,
            "user_code" : userCode
        }

        const response = await fetch(
            `${process.env.REACT_APP_SERVER_URL}/study/deleteStandbyMember`,{
                method: 'DELETE',
                headers: {
                    Authorization: `ADMIN ${process.env.REACT_APP_ADMIN_KEY}`,
                    "Content-Type": "application/json;charset=UTF8"
                },
                body:JSON.stringify(req)
        })

        const data = await response.json();
        if(data.status === false)
            refuse();

        else
            setLoad(load+1);

    }
    const addMember = async (e) =>{
        const userCode = e.target.id;

        const req ={
            "group_code" : groupCode,
            "user_code" : userCode
        }

        const response = await fetch(
            `${process.env.REACT_APP_SERVER_URL}/study/getMemberFromStandbyMember`,{
                method: 'POST',
                headers: {
                    Authorization: `ADMIN ${process.env.REACT_APP_ADMIN_KEY}`,
                    "Content-Type": "application/json;charset=UTF8"
                },
                body:JSON.stringify(req)
        })

        const data = await response.json();
        if(data.status === false)
            refuse();

        else
            setLoad(1);

    }

    useEffect(()=>(
        getStandbyMembers
    ),[load]);
    

    return(
        <>
            <Stack ml={'45px'}>
                <Text as={'b'} fontSize={'1.2em'} >멤버 승인</Text>
                {standbymembers.map((standbymember,index) =>(
                    <HStack key={index}>
                        <Text w={'140px'}>{standbymember.userId}</Text>
                        <Text w={'220px'}>{standbymember.comment}</Text>
                        <Button id={standbymember.userCode} onClick={refuse} h={'35px'} fontSize={'0.9em'}>거절</Button>
                        <Button id={standbymember.userCode} onClick={addMember} h={'35px'} fontSize={'0.9em'} colorScheme='blue'>승인</Button>
                    </HStack>
                ))}
                
            </Stack>
        </>
    )
}

export default UserAcess;