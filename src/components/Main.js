import React from 'react';
import ViewStudyMain from './study/ViewStudyMain';
import BoardAll from './board/BoardAll';
import { Box } from '@chakra-ui/react';
import ViewJobMain from './job-posting/ViewJobMain';
import ViewBoardMain from './board/ViewBoardMain';

const Main = () => {
    return (
        <Box m={'auto'} width={'70vw'}>
            <ViewJobMain></ViewJobMain>
            <ViewStudyMain></ViewStudyMain>
            <ViewBoardMain></ViewBoardMain>
        </Box>
    );
};

export default Main;