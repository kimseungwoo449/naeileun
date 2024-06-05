import {React, useState, useEffect} from 'react';
import { HStack,Stack,Text,Button} from '@chakra-ui/react';
import {useNavigate, useLocation } from 'react-router-dom';
const UserAcess = () =>{
    const navigate = useNavigate();
    const location = useLocation();

    const [awaiters,setAwaiter] = useState([]);
    const [size, setSize] = useState();
    const [load,setLoad] = useState();

    const groupCode = location.state.groupCode;

    const getAwaiters = async() =>{

        const req ={
            "group_code" : groupCode,
            "user_id" : "2"  //user 수정 요함
        }

        const response = await fetch(
            `${process.env.REACT_APP_SERVER_URL}/study/getAwaiter`,{
                method: 'POST',
                headers: {
                    Authorization: `ADMIN ${process.env.REACT_APP_ADMIN_KEY}`,
                    "Content-Type": "application/json;charset=UTF8"
                },
                body:JSON.stringify(req)
            }
        )

        const data = await response.json();
        console.log(data.result);
        console.log(data);
        setAwaiter(data.result);

        console.log(awaiters);
    }

    const refuse = async (e) =>{
        const awaiterCode = e.target.id;

        const req ={
            "group_code" : groupCode,
            "user_code" : awaiterCode
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
            setLoad(1);

    }
    const addMember = async (e) =>{
        const awaiterCode = e.target.id;

        const req ={
            "group_code" : groupCode,
            "user_code" : awaiterCode
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
        getAwaiters
    ),[load]);
    

    return(
        <>
            <Stack ml={'45px'}>
                <Text as={'b'} fontSize={'1.2em'} >멤버 승인</Text>
                {awaiters.map((awaiter,index) =>(
                    <HStack key={index}>
                        <Text w={'140px'}>{awaiter.userId}</Text>
                        <Text w={'220px'}>{awaiter.comment}</Text>
                        <Button id={awaiter.userCode} onClick={refuse} h={'35px'} fontSize={'0.9em'}>거절</Button>
                        <Button id={awaiter.userCode} onClick={addMember} h={'35px'} fontSize={'0.9em'} colorScheme='blue'>승인</Button>
                    </HStack>
                ))}
                
            </Stack>
        </>
    )
}

export default UserAcess;