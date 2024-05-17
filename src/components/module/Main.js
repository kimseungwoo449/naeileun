import { Box } from '@chakra-ui/react';
import React from 'react';

const Main = () => {
    return (
        <Box>
            <h4>Main</h4>

            <form method='POST' action={`${process.env.REACT_APP_SERVER_URL}/test`}>
                <input type='hidden' id='command' name='command' value="test" />
                <input type='submit' value="submit" />
            </form>
        </Box>
    );
};

export default Main;