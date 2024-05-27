
import { Outlet } from 'react-router-dom';

import { Flex } from '@chakra-ui/react';
import Sidebar from './module/SideBar';
import Header from './module/Header';
import Footer from './module/Footer';

const MyPage = () => {
    
    return (
      <>
        <Flex direction="column">
      <Header />
      <Flex>
        <Sidebar />
        <Outlet/>
      </Flex>
        <Footer />
    </Flex>
    </>
    );
};

export default MyPage;