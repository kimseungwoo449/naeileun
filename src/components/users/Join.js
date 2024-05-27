// import { Box } from '@chakra-ui/react';
// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const Join = () => {
//     const navigate = useNavigate();
//     const submit = async e => {

//         e.preventDefault();
//         const formData = new FormData(e.target);
      
        
//         const id = formData.get('id');
//         const password = formData.get('pw');
//         const email = formData.get('email');
//         const name = formData.get('name');
//         const residentFirst = formData.get('first');
//         const residentLast = formData.get('last');
//         const phone = formData.get('phone');
//         const agree = formData.get('agree');

        
//         // if (!id || !password || !name || !residentFirst || !residentLast || !phone || !agree) {
//         //     alert('모든 필수 항목을 입력하고 약관에 동의해야 합니다.');
//         //     return;
//         // }

//         const data = {
//             id,
//             password,
//             email,
//             name,
//             resident_number: `${residentFirst}-${residentLast}`,
//             phone,
//             admin: false // 이 폼에서는 'admin'이 항상 false라고 가정합니다
//         };


//         try {
//             const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/join`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(data)
//             });

//             const result = await response.json();
//             console.log('성공:', result);
//             navigate("/");
//         } catch (error) {
//             console.error('오류:', error);
//         }
//     };

//     return (
        
//         <div>
//             <Box>
//             <form method = "POST" onSubmit={submit
//             }
//             >
//             <input type = "text" id = "id" name = "id" placeholder='아이디'/>//필수 항목
//             <input type = "text" id ="pw" name = "pw" placeholder='비밀번호'/> //필수 항목
//             <input type = "text" id = "email" name = "email"placeholder='이메일'/>
//             <input type = "text" id='name' name = "name" placeholder='이름'/>//필수 항목
//             <input type = "text" id='resident' name = "first" placeholder='주민등록번호앞자리'/>//필수 항목
//             <input type = "text" id='resident' name = "last" placeholder='주민등록번호뒷자리'/>//필수 항목
//             <input type = "text" id='phone' name = "phone" placeholder='핸드폰번호'/>//필수 항목
//             <input type='checkbox' id='agree' name='agree'/>//필수 항목
//             <label for="agree" id="agree-label">
// 					<p><b>[필수]</b><span>&nbsp;인증 약관 전체동의</span></p>
// 				</label>
//                 <input type = "hidden" id = "command" name = "command" value = "join"/>
//             <input type='submit' />
//             </form>
//             </Box>
//         </div>
//     );
    
// };

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
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.id || !formData.password || !formData.name || !formData.residentNumber1 || !formData.residentNumber2 || !formData.phone || !formData.agree) {
            alert('모든 필수 항목을 입력하고 약관에 동의해야 합니다.');
            return;
        }

        const data = {
            id: formData.id,
            password: formData.password,
            email: formData.email,
            name: formData.name,
            resident_number: `${formData.residentNumber1}-${formData.residentNumber2}`,
            phone: formData.phone,
            admin: false // 이 폼에서는 'admin'이 항상 false라고 가정합니다
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/join`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

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

                    <Box border="none"  p={0} >
                        <FormControl isInvalid={isFieldInvalid('id')}>
                            <Input
                                type="text"
                                id="id"
                                name="id"
                                placeholder="아이디"
                                value={formData.id}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                borderColor={isFieldInvalid('id') ? 'red.500' : 'gray.200'}
                                focusBorderColor="green.500"
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
                                focusBorderColor="green.500"
                                borderRadius= "0"
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
                                focusBorderColor="green.500"
                                borderRadius="0 0 10px 10px"
                                mb={0}
                            />
                        </FormControl>
                    </Box>

                    <Box border="none"  p={0} >
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
                                focusBorderColor="green.500"
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
                                    focusBorderColor="green.500"
                                    borderRadius= "0"
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
                                    focusBorderColor="green.500"
                                    borderRadius= "0"
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
                                focusBorderColor="green.500"
                                borderRadius="0 0 10px 10px"
                            />
                        </FormControl>
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

                    <Button type="submit" colorScheme="green" width="full">
                        가입하기
                    </Button>
                </VStack>
            </form>
        </Box>
      
    );
};

export default Join;
