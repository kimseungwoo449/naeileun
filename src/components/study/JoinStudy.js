import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation, Form } from 'react-router-dom';
import { Textarea, Button, Stack, Text, Box, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from '@chakra-ui/react';
import { useLogin } from '../LoginContext';

const JoinStudy = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const groupCode = location.state.groupCode;

    const [comment, setComment] = useState("");
    const { user } = useLogin();

    const [isOpen, setIsOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState("");
    const cancelRef = useRef();

    const onClose = () => setIsOpen(false);

    const checkComment = (e) => {
        const data = e.target.value;
        if (data.length <= 30)
            setComment(data);
        else
            e.target.value = comment;
    }

    const checkStandbyMember = async () => {
        const req = {
            "group_code": groupCode,
            "user_code": user.userCode
        }

        const response = await fetch(
            `${process.env.REACT_APP_SERVER_URL}/study/checkStandbyMember`, {
                method: 'POST',
                headers: {
                    Authorization: `ADMIN ${process.env.REACT_APP_ADMIN_KEY}`,
                    "Content-Type": "application/json;charset=UTF8"
                },
                body: JSON.stringify(req)
            }
        )

        const data = await response.json();
        if (data.status) {
            setDialogMessage("이미 가입 신청했습니다.");
            setIsOpen(true);
        }
    }

    const addStandbyMember = async () => {
        const req = {
            "group_code": groupCode,
            "user_code": user.userCode,
            "comment": comment
        }

        const response = await fetch(
            `${process.env.REACT_APP_SERVER_URL}/study/addStandbyMember`, {
                method: 'POST',
                headers: {
                    Authorization: `ADMIN ${process.env.REACT_APP_ADMIN_KEY}`,
                    "Content-Type": "application/json;charset=UTF8"
                },
                body: JSON.stringify(req)
            }
        )

        const data = await response.json();
        if (data.status) {
            navigate('/study');
        }
    }

    const submit = (e) => {
        e.preventDefault();
        addStandbyMember();
    }

    useEffect(() => {
        checkStandbyMember();
    }, []);

    return (
        <>
            <Form method="POST" onSubmit={submit}>
                <Box h={'70vh'}>
                    <Stack mt={'50px'}>
                        <Text as={'b'} fontSize={'1.5em'} textAlign={'center'}>스터디 가입 신청</Text>
                    </Stack>
                    <Stack as={'b'} fontSize={'2em'} w={'600px'} m={'auto'} mt={'50px'}>
                        <Textarea id="comment" onChange={checkComment} w={'500px'} h={'300px'} m={'auto'} placeholder='30자 이내'></Textarea>
                        <Button type="submit" w={'200px'} m={'auto'} mt={'30px'}>제출</Button>
                    </Stack>
                </Box>
            </Form>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent backgroundColor='#eb7368'>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold" color={'white'}>
                            알림
                        </AlertDialogHeader>
                        <AlertDialogBody color={'white'}>
                            {dialogMessage}
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                확인
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
}

export default JoinStudy;
