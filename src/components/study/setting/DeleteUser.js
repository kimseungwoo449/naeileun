import {React, useState, useEffect} from 'react';
import {HStack,Stack,Text,Button,Input} from '@chakra-ui/react';
import {useNavigate, useLocation } from 'react-router-dom';
import { useLogin } from '../../LoginContext';

const DeleteUser = () =>{
    const navigate = useNavigate();
    const location = useLocation();
    const groupCode = location.state.groupCode;
    const adminCode = location.state.adminCode;
    const [members,setMember] = useState([]);
    const {user} = useLogin();

    const getMembers = async() =>{

        const req ={
            "group_code" : groupCode
        }

        const request = await fetch(
            `${process.env.REACT_APP_SERVER_URL}/study/getMember`,{
                method: 'POST',
                headers: {
                    Authorization: `ADMIN ${process.env.REACT_APP_ADMIN_KEY}`,
                    "Content-Type": "application/json;charset=UTF8"
                },
                body:JSON.stringify(req)
            }
        )

        const data = await request.json();
        console.log(data);
        setMember(data.result);
        console.log(members);
    }

    const deleteMember =(e) =>{
        const code = e.target.id;
        console.log(e.target.id);
        if(code !== null){
            deleteByMemberCode(code);
        }
    }

    const deleteByMemberCode = async (code) =>{
        const req = {
            "member_code" : code
        }

        const response = await fetch(
            `${process.env.REACT_APP_SERVER_URL}/study/deleteMemberByMemberCode`,{
                method: 'DELETE',
                headers: {
                    Authorization: `ADMIN ${process.env.REACT_APP_ADMIN_KEY}`,
                    "Content-Type": "application/json;charset=UTF8"
                },
                body:JSON.stringify(req)
            })

        const data = await response.json();

        if(data.status === true){
            getMembers();
        }
    }

    useEffect(()=>(
        getMembers
    ),[]);
    

    return(
        <>
            <Stack ml={'45px'} >
                <Text as={'b'} fontSize={'1.2em'} >멤버 관리</Text>
                {members.map((member,index) => (
                    member.userCode=== adminCode ?
                    <Input type='hidden' key={index}></Input> :
                    (<HStack key={index}>
                        <Text   id={member.memberCode} w={'140px'}>{member.userId}</Text>
                        <Button id={member.memberCode} onClick={deleteMember} h={'35px'} fontSize={'0.9em'} colorScheme='red'>강제퇴장</Button>
                    </HStack>)
                ))}
            </Stack>
        </>
    )
}

export default DeleteUser;