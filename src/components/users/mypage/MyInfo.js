import React, { useContext, useState } from 'react';
import LoginContext, { useLogin } from '../../LoginContext';
import { Box, Flex, Text, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Input } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const MyInfo = () => {
    const navigate = useNavigate();
    // const { user, setUser } = useLogin();
    const {user, setUser} = useLogin();

   

    const [isOpen, setIsOpen] = useState(false);
    const [field, setField] = useState('');
    const [value, setValue] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const openModal = (fieldName) => {
        setField(fieldName);
        setValue(user[fieldName] || '');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleSave = () => {

        const payload = { field : field,
            value : value,
            id : user.id
         };
        const updateInfo = {
            id: user.id,
            [field]: value,
            payload,
            name: user.name,
            resident_number: user.resident_number,
            user_age: user.age,
            phone: user.phone,
            email: user.email,
            address: user.address,
            admin: user.admin
        };
        console.log(updateInfo);
        //update action 에서 처리하기
        if (field === 'password') {
            if (currentPassword !== user.password) {
                alert('현재비밀번호가 일치하지 않습니다.');
                return;
            }
            if (newPassword !== confirmNewPassword) {
                alert('새 비밀번호가 일치하지 않습니다.');
                return;
            }
            payload.currentPassword = currentPassword;
            payload.newPassword = newPassword;
        }

        fetch(`${process.env.REACT_APP_SERVER_URL}/user/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
                'authorization': 'ADMIN ${process.env.REACT_APP_ADMIN_KEY}'
            },
            
            body: JSON.stringify(payload),
           
        })
        .then(response => response.json())
        .then(data => {
            setUser({ ...user, [field]: value });
            closeModal();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        
        
        
        <Box bg="blue.100" p={4} borderRadius="md" justifyContent={"center"}>
            
            <Text fontSize="lg" fontWeight="bold" mb={2}>{user.name}</Text>
            <Flex alignItems="center" mb={2}>
                <Text flex="1" fontSize="md">+82 {user.phone}</Text>
                <Button size="sm" onClick={() => openModal('phone')}>수정</Button>
            </Flex>
            <Flex alignItems="center" mb={2}>
                <Text flex="1" fontSize="md">{user.email}</Text>
                <Button size="sm" onClick={() => openModal('email')}>수정</Button>
            </Flex>
            <Flex alignItems="center" mb={2}>
                <Text flex="1" fontSize="md">비밀번호 변경</Text>
                <Button size="sm" onClick={() => openModal('password')}>수정</Button>
            </Flex>
        <Button onClick={() => navigate('/user/delete')}>회원 탈퇴</Button>
            <Modal isOpen={isOpen} onClose={closeModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{field === 'password' ? '비밀번호 변경' : `${field} 수정`}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {field === 'password' ? (
                            <>
                                <Input
                                    placeholder="현재 비밀번호"
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    mb={3}
                                />
                                <Input
                                    placeholder="새 비밀번호"
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    mb={3}
                                />
                                <Input
                                    placeholder="새 비밀번호 확인"
                                    type="password"
                                    value={confirmNewPassword}
                                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                                    mb={3}
                                />
                            </>
                        ) : (
                            <Input 
                                placeholder={field} 
                                value={value}
                                onChange={(e) => setValue(e.target.value)} 
                            />
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button bg={'blue.100'} mr={3} onClick={handleSave}>
                            저장
                        </Button>
                        <Button variant="ghost" onClick={closeModal}>취소</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
        
    );
};

export default MyInfo;
