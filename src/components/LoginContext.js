import React, { createContext, useState, useContext } from 'react';

// 로그인 정보를 저장할 Context 생성
const LoginContext = createContext();

// 로그인 정보를 제공하는 Provider 컴포넌트
export const LoginProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);  // 사용자 정보를 저장할 상태 변수

    return (
        <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
            {children}
        </LoginContext.Provider>
    );
};

// 로그인 정보를 사용하는 커스텀 훅
export const useLogin = () => {
    return useContext(LoginContext);
};
