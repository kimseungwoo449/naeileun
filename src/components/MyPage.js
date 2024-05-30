
import { Outlet } from 'react-router-dom';

import { Box, Flex } from '@chakra-ui/react';
import Sidebar from './module/SideBar';
import Header from './module/Header';
import Footer from './module/Footer';

const MyPage = () => {
    
    return (
        <>
            <Flex direction="column" minHeight="100vh">
                <Header />
                <Flex flex="1">
                    <Sidebar />
                    <Box flex="1" display="flex" justifyContent="center"  p={4}>
                        <Box width="100%" maxWidth="1200px">
                            <Outlet />
                        </Box>
                    </Box>
                </Flex>
                <Footer />
            </Flex>
        </>
 
    );
};

export default MyPage;