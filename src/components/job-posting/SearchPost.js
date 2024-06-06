import React, { useState, useEffect } from 'react';
import { 
  Box, Button, Input, Select, Text, Spinner, Flex, Accordion, AccordionItem, 
  AccordionButton, AccordionPanel, AccordionIcon 
} from '@chakra-ui/react';
import { useLogin } from '../LoginContext';

const SearchPost = ({ onClose, fetchJobData }) => {
    const [input, setInput] = useState('');
    const [totalListCount, setTotalListCount] = useState(null);
    const [searchListCount, setSearchListCount] = useState();
    const [searchType, setSearchType] = useState('JO_SJ');
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
   
    const itemsPerPage = 10;
    const apiURL = `http://openapi.seoul.go.kr:8088/${process.env.REACT_APP_OPEN_API_KEY}/json/GetJobInfo/`;
    const { user } = useLogin();

    useEffect(() => {
        const fetchTotalListCount = async () => {
            try {
                const response = await fetch(`${apiURL}1/1/`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setTotalListCount(data.GetJobInfo.list_total_count);
            } catch (error) {
                console.error('Error fetching total list count:', error);
            }
        };

        fetchTotalListCount();
    }, [apiURL]);

    const fetchData = async (START_INDEX, END_INDEX) => {
        try {
            const response = await fetch(`${apiURL}${START_INDEX}/${END_INDEX}/`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data.GetJobInfo.row; 
        } catch (error) {
            console.error('Error fetching data:', error);
            return [];
        }
    };

    const onSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResult([]);
        if (totalListCount === null) {
            console.error('Total list count is not fetched yet.');
            setLoading(false);
            return;
        }
        try {
            let promises = [];
            for (let x = 1; x <= totalListCount; x += 1000) {
                promises.push(
                    fetchData(x, x + 999 < totalListCount ? x + 999 : totalListCount)
                );
            }
            const results = await Promise.all(promises);
            const filteredResults = results.flat().filter(job => job[searchType] && job[searchType].includes(input));
            setResult(filteredResults);
            setSearchListCount(filteredResults.length);
            setCurrentPage(1);
        } catch (error) {
            console.error('Error in onSearch:', error);
        } finally {
            setLoading(false);
        }
    };
    const handleAddEvent = async (job) => {
        const selectedJob = { ...job };
        const processJobData = (selectedJob) => {
            const rceptClosNm = selectedJob.RCEPT_CLOS_NM;
            if (rceptClosNm) {
                const dateMatch = rceptClosNm.match(/\((\d{4}-\d{2}-\d{2})\)/);
                if (dateMatch) {
                    selectedJob.RCEPT_CLOS_NM = dateMatch[1];
                }
            }
            return selectedJob;
        };

        const processedJob = processJobData(selectedJob);

        const event = {
            userCode: user.userCode,
            companyName: processedJob.CMPNY_NM,
            jobTitle: processedJob.JO_SJ,
            applicationStart: processedJob.JO_REG_DT,
            applicationEnd: processedJob.RCEPT_CLOS_NM,
            jobDescription: processedJob.DTY_CN,
            status: 'Open'
        };
    
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/job/create`, {
                method: 'POST',
                headers: {
                    "Authorization": `ADMIN ${process.env.REACT_APP_ADMIN_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(event)
            });
            if (response.ok) {
                console.log('Event added successfully');
                fetchJobData(); 
            } else {
                console.error('Failed to add event');
            }
        } catch (error) {
            console.error('Error adding event:', error);
        }
        onClose();
    };

   
    const paginatedResults = result.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  
    const totalPages = Math.ceil(result.length / itemsPerPage);

    return (
        <div>
            <Box as="form" onSubmit={onSearch}>
                <Select value={searchType} onChange={(e) => setSearchType(e.target.value)} mb={2}>
                    <option value="JO_SJ">구인제목</option>
                    <option value="CMPNY_NM">기업이름</option>
                    <option value="WORK_PARAR_BASS_ADRES_CN">근무예정지 주소</option>
                </Select>
                <Input 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="검색어 입력"
                    mb={2}
                />
                <Button type="submit" mb={2}>Search</Button>
                {loading && <Spinner size="xl" />}
                {totalListCount !== null && (
                    <Box mt={4}>
                        검색된 리스트: {searchListCount}
                    </Box>
                )}
                <Accordion allowToggle mt={4}>
                    {paginatedResults.map((job, index) => (
                        <AccordionItem key={index}>
                        <h2>
                            <AccordionButton>
                                <Box flex="1" textAlign="left" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
                                <Text><strong>구인제목:</strong> {job.JO_SJ}</Text>
                                <Text><strong>기업이름:</strong> {job.CMPNY_NM}</Text>
                                <Text><strong>모집요강:</strong> {job.DTY_CN}</Text>
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            <Text><strong>급여조건:</strong> {job.HOPE_WAGE}</Text>
                            <Text><strong>근무시간:</strong> {job.WORK_TIME_NM}</Text>
                            <Text><strong>근무형태:</strong> {job.HOLIDAY_NM}</Text>
                            <Text><strong>마감일:</strong> {job.RCEPT_CLOS_NM}</Text>
                            <Text><strong>등록일:</strong> {job.JO_REG_DT}</Text>
                            <Text><strong>기업 주소:</strong> {job.BASS_ADRES_CN}</Text>
                            <Text><strong>직무내용:</strong> {job.DTY_CN}</Text>
                            <Button mt={2} colorScheme="blue" onClick={() => handleAddEvent(job)}>
                                일정 추가
                            </Button>
                        </AccordionPanel>
                    </AccordionItem>
                    ))}
                </Accordion>
                <Flex mt={4} justifyContent="center">
                    <Button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                        Previous
                    </Button>
                    <Text mx={4}>Page {currentPage} of {totalPages}</Text>
                    <Button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
                        Next
                    </Button>
                </Flex>
            </Box>
        </div>
    );
};

export default SearchPost;
