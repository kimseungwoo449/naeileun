import {React} from 'react';
import {Box} from '@chakra-ui/react';
import {useNavigate, useLocation } from 'react-router-dom';

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
        <Box h={'80vh'} >
        

        </Box>
        </>
    )
}

export default StudyBoard;