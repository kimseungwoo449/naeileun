import { Box, Button, Input, Menu } from '@chakra-ui/react';
import React, { useState } from 'react';

const SearchPost = () => {
    const [input, setInput] = useState('');
    const [totalListCount, setTotalListCount] = useState(null);
    const [searchType, setSearchType] = useState();
    // const [result, setResult] = useState([]);
    const result = [];
    const apiURL =`http://openapi.seoul.go.kr:8088/(${process.env.OPEN_API_KEY}/json/GetJobInfo/`;
    const fetchTotalListCount = async (e) => {
        try {
           const data = await fetchData(1,1);
            setTotalListCount(data.GetJobInfo.list_total_count);  
        } catch (error) {
            console.error('Error fetching total list count:', error);
        }
    };
    const fetchData = async(START_INDEX,END_INDEX) => {
        try {
            const response = await fetch(`${apiURL}${START_INDEX}/${END_INDEX}/`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching total list count:', error);
        }
    }
    const onSearch = async(e) =>{
        e.preventDefault();
        fetchTotalListCount();
        try {
            let x = 1;
            while(x<totalListCount){
                try {
                    const data = await fetchData(x,x+1000 < totalListCount? x+1000 : totalListCount)
                    data.map((job,index) =>{
                        if(job[searchType].includes(input)){

                        }
                    })
                    x += 1000;

                } catch (error) {
                    
                }
            }
        } catch (error) {
            
        }
      

    }
    return (
        <div>
             <Box as="form" onSubmit={onSearch}>
                <Menu>


                </Menu>
            <Input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter search query"
            />
            <Button type="submit" mt={2}>Search</Button>
            {totalListCount !== null && (
                <Box mt={4}>
                    Total List Count: {totalListCount}
                </Box>
            )}
        </Box>
        </div>
    );
};

export default SearchPost;