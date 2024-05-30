
// export default Join;
import React, { useState } from 'react';
import { Box, Input, Button, Checkbox, FormControl, FormLabel, VStack, Text, HStack, Stack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Join = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        id: '',
        password: '',
        email: '',
        name: '',
        residentNumber1: '',
        residentNumber2: '',
        phone: '',
        agree: false
    });
    const [touched, setTouched] = useState({});
    const [errorBox1, setErrorBox1] = useState({});
    const [errorBox2, setErrorBox2] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched({
            ...touched,
            [name]: true
        });

        if (name === 'id' && !formData.id) {
            setErrorBox1(prev => ({ ...prev, id: '아이디는 필수 정보입니다.' }));
        } else if (name === 'password' && !formData.password) {
            setErrorBox1(prev => ({ ...prev, password: '비밀번호는 필수 정보입니다.' }))
        } else if (name === 'name' && !formData.name) {
            setErrorBox2(prev => ({ ...prev, name: '이름은 필수 정보입니다.' }))
        }
        else if (name === 'residentNumber1' && !formData.residentNumber1) {
            setErrorBox2(prev => ({ ...prev, residentNumber1: '주민등록번호는 필수 정보입니다.' }))
        } else if (name === 'residentNumber2' && !formData.residentNumber2) {
            setErrorBox2(prev => ({ ...prev, residentNumber2: '주민등록번호는 필수 정보입니다.' }))
        }
        else if (name === 'phone' && !formData.phone) {
            setErrorBox2(prev => ({ ...prev, phone: '전화번호는 필수 정보입니다.' }))
        }


    };

    const checkIdAvailability = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/check`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ check: formData.id })
            });
            const result = await response.json();
            if (result.isAvailable) {
                setErrorBox1(prev => ({ ...prev, id: '' })); // 에러 메시지 제거
            } else {
                setErrorBox1(prev => ({ ...prev, id: '사용할 수 없는 아이디입니다. 다른 아이디를 입력해 주세요.' }));
            }
        }
        catch (error) {
            console.error('오류:', error);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
      


        const data = formData;

    if (!data.id || !data.password || !data.name || !data.residentNumber1 || !data.residentNumber2 || !data.phone || !data.agree) {
        console.log(data.agree);
        alert('모든 필수 항목을 입력하고 약관에 동의해야 합니다.');
        return;
    }

    const payload = {
        id: data.id,
        password: data.password,
        email: data.email,
        name: data.name,
        resident_number: `${data.residentNumber1}-${data.residentNumber2}`,
        phone: data.phone,
        admin: false // 이 폼에서는 'admin'이 항상 false라고 가정합니다
    };

        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/join`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Server Error: ${errorText}`);
            }
            const result = await response.json();
            console.log('성공:', result);
            navigate("/");
        } catch (error) {
            console.error('오류:', error);
        }
    };

    const isFieldInvalid = (name) => !formData[name] && touched[name];

    return (
        <Box p={4} maxW="md" mx="auto">
            <form method="POST" onSubmit={handleSubmit}>
                <VStack spacing={4} align="stretch">

                    <Box border="none" p={0} >
                        <FormControl isInvalid={isFieldInvalid('id')}>
                            <Input
                                type="text"
                                id="id"
                                name="id"
                                placeholder="아이디"
                                value={formData.id}
                                onChange={handleChange}
                                onBlur={checkIdAvailability}
                                borderColor={isFieldInvalid('id') ? 'red.500' : 'gray.200'}
                                focusBorderColor="rgb(202, 244, 255)"
                                borderRadius="10px 10px 0 0"
                                mb={0}
                            />
                        </FormControl>

                        <FormControl isInvalid={isFieldInvalid('password')}>
                            <Input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="비밀번호"
                                value={formData.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                borderColor={isFieldInvalid('password') ? 'red.500' : 'gray.200'}
                                focusBorderColor="rgb(202, 244, 255)"
                                borderRadius="0"
                                mb={0}
                            />
                        </FormControl>

                        <FormControl>
                            <Input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="[선택] 이메일주소 (비밀번호 찾기 등 본인 확인용)"
                                value={formData.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                borderColor={'gray.200'}
                                focusBorderColor="rgb(202, 244, 255)"
                                borderRadius="0 0 10px 10px"
                                mb={0}
                            />
                        </FormControl>
                        {Object.values(errorBox1).map((error, index) => (
                            error && <Text key={index} color="red.500">{error}</Text>
                        ))}
                    </Box>

                   <Box border="none" p={0} >
                        <FormControl isInvalid={isFieldInvalid('name')}>
                            <Input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="이름"
                                value={formData.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                borderColor={isFieldInvalid('name') ? 'red.500' : 'gray.200'}
                                focusBorderColor="rgb(202, 244, 255)"
                                borderRadius="10px 10px 0 0"
                                mb={0}
                            />
                        </FormControl>

                        <FormControl isInvalid={isFieldInvalid('residentNumber1') || isFieldInvalid('residentNumber2')}>
                            <HStack  >
                                <Input
                                    type="text"
                                    id="residentNumber1"
                                    name="residentNumber1"
                                    placeholder="주민등록번호 앞자리"
                                    value={formData.residentNumber1}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    borderColor={isFieldInvalid('residentNumber1') ? 'red.500' : 'gray.200'}
                                    focusBorderColor="rgb(202, 244, 255)"
                                    borderRadius="0"
                                    maxLength="6"
                                />
                                <Text>-</Text>
                                <Input
                                    type="password"
                                    id="residentNumber2"
                                    name="residentNumber2"
                                    placeholder="주민등록번호 뒷자리"
                                    value={formData.residentNumber2}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    borderColor={isFieldInvalid('residentNumber2') ? 'red.500' : 'gray.200'}
                                    focusBorderColor="rgb(202, 244, 255)"
                                    borderRadius="0"
                                    maxLength="7"
                                />

                            </HStack>
                        </FormControl>

                        <FormControl isInvalid={isFieldInvalid('phone')}>
                            <Input
                                type="text"
                                id="phone"
                                name="phone"
                                placeholder="휴대전화번호"
                                value={formData.phone}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                borderColor={isFieldInvalid('phone') ? 'red.500' : 'gray.200'}
                                focusBorderColor="rgb(202, 244, 255)"
                                borderRadius="0 0 10px 10px"
                            />
                        </FormControl>
                        {Object.values(errorBox2).map((error, index) => (
                            error && <Text key={index} color="red.500">{error}</Text>
                        ))}
                    </Box>

                    <Box border="1px" borderColor="gray.200" p={0} rounded="md">
                        <FormControl isInvalid={isFieldInvalid('agree')}>
                            <Checkbox
                              
                                id="agree"
                                name="agree"
                                isChecked={formData.agree}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                colorScheme="green"
                            >
                                <FormLabel htmlFor="agree" mb={0}>
                                    <Text as="b">[필수]</Text> 인증 약관 전체동의
                                </FormLabel>
                            </Checkbox>
                        </FormControl>

                    </Box>

                    <Button type="submit" bg="rgb(160, 222, 255)" color="white" width="full">
                        가입하기
                    </Button>
                </VStack>
            </form>
        </Box>

    );
};

export default Join;
