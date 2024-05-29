import React, { createContext, useState, useContext } from 'react';

// 로그인 정보를 저장할 Context 생성
const LoginContext = createContext(null);

// 로그인 정보를 제공하는 Provider 컴포넌트
export const LoginProvider = ({ children }) => {
    const [user, setCurrentUser] = useState(null);  // 사용자 정보를 저장할 상태 변수

    const login = (response) => {

        if(response && response.status == 200) {
            setCurrentUser(response.user);
            console.log('로그인 처리 완료');
            console.log(user);
        }
    }

    const logout = () => {
        setCurrentUser(null);
    }

    return (
        <LoginContext.Provider value={{ user, login, logout }}>
            {children}
        </LoginContext.Provider>
    );
};

export default LoginContext;

// 로그인 정보를 사용하는 커스텀 훅
export const useLogin = () => useContext(LoginContext);

