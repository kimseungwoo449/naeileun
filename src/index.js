import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider, Grid } from '@chakra-ui/react';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <Grid templateRows={"160px auto 100px"}>
      <App />
      </Grid>
    </ChakraProvider>
  </React.StrictMode>
);
