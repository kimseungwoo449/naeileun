import React, { createContext, useState, useContext } from 'react';

const LoginContext = createContext(null);

export const LoginProvider = ({ children }) => {
    const [user, setUser] = useState(null); 

    const login = (response) => {

        if(response && response.status == 200) {
            setUser(response.user);
         
        }
    }
    const logout = () => {
        setUser(null);
    }

    return (
        <LoginContext.Provider value={{ user,setUser ,login, logout }}>
            {children}
        </LoginContext.Provider>
    );
};

export default LoginContext;

export const useLogin = () => useContext(LoginContext);

