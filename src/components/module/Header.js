import { Heading } from '@chakra-ui/react';
import React from 'react';

const Header = () => {
    return (
        <>
            <Heading>{process.env.REACT_APP_SERVER_URL}</Heading>
        </>
    );
};

export default Header;