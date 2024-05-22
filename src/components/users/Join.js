import { Box } from '@chakra-ui/react';
import React from 'react';
import { PiSquareHalfBottomLight } from 'react-icons/pi';

const Join = () => {

    const submit = e => {
        e.preventDefault();
    }

    return (
        
        <div>
            <Box>
            <form method = "POST" onSubmit={PiSquareHalfBottomLight
            }
            action = {`${process.env.REACT_APP_SERVER_URL}/user/join`}
            >
            <input type = "text" id = "id" name = "id" placeholder='아이디'/>
            <input type = "text" id ="pw" name = "pw" placeholder='비밀번호'/>
            <input type = "text" id = "email" name = "email"placeholder='이메일'/>
            <input type = "text" id='name' name = "name" placeholder='이름'/>
            <input type = "text" id='resident' name = "first" placeholder='주민등록번호앞자리'/>
            <input type = "text" id='resident' name = "last" placeholder='주민등록번호뒷자리'/>
            <input type = "text" id='phone' name = "phone" placeholder='핸드폰번호'/>
            <input type='checkbox' id='agree' name='agree'/>
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