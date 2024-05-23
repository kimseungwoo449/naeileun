import { Box } from '@chakra-ui/react';
import React from 'react';
import { PiSquareHalfBottomLight } from 'react-icons/pi';

const Join = () => {

    const submit = async e => {
        e.preventDefault();
        const formData = new FormData(e.target);
      
        
        const id = formData.get('id');
        const password = formData.get('pw');
        const email = formData.get('email');
        const name = formData.get('name');
        const residentFirst = formData.get('first');
        const residentLast = formData.get('last');
        const phone = formData.get('phone');
        const agree = formData.get('agree');

        
        if (!id || !password || !name || !residentFirst || !residentLast || !phone || !agree) {
            alert('모든 필수 항목을 입력하고 약관에 동의해야 합니다.');
            return;
        }

        const data = {
            id,
            password,
            email,
            name,
            resident_number: `${residentFirst}-${residentLast}`,
            phone,
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
        } catch (error) {
            console.error('오류:', error);
        }
    };

    return (
        
        <div>
            <Box>
            <form method = "POST" onSubmit={submit
            }
            >
            <input type = "text" id = "id" name = "id" placeholder='아이디'/>//필수 항목
            <input type = "text" id ="pw" name = "pw" placeholder='비밀번호'/> //필수 항목
            <input type = "text" id = "email" name = "email"placeholder='이메일'/>
            <input type = "text" id='name' name = "name" placeholder='이름'/>//필수 항목
            <input type = "text" id='resident' name = "first" placeholder='주민등록번호앞자리'/>//필수 항목
            <input type = "text" id='resident' name = "last" placeholder='주민등록번호뒷자리'/>//필수 항목
            <input type = "text" id='phone' name = "phone" placeholder='핸드폰번호'/>//필수 항목
            <input type='checkbox' id='agree' name='agree'/>//필수 항목
            <label for="agree" id="agree-label">
					<p><b>[필수]</b><span>&nbsp;인증 약관 전체동의</span></p>
				</label>
                <input type = "hidden" id = "command" name = "command" value = "join"/>
            <input type='submit' />
            </form>
            </Box>
        </div>
    );
    
};

export default Join;