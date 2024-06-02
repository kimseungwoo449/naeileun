import React, { useState, useEffect } from 'react';
import { 
  Box, Grid, GridItem, Text, HStack, IconButton, Button, Modal, 
  ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, 
  ModalBody, ModalFooter, Input, FormControl, FormLabel 
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useLogin } from '../LoginContext';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [jobData, setJobData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({ userCode: '', companyName: '', jobTitle: '', applicationStart: '', applicationEnd: '', jobDescription: '', status: '' });
  const today = new Date();
  const {user} = useLogin();

  useEffect(() => {
    fetchJobData();
  }, [currentDate]);

  const fetchJobData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/job/read`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF8'
        },
        body: user.userCode
    }); // userId를 실제 사용자 ID로 교체해야 합니다.
      const data = await response.json();
      console.log(data)
      if(data){
      setJobData(data);
      }
    } catch (error) {
      console.error('Error fetching job data:', error);
    }
  };

  const renderCalendar = () => {
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startDayOfWeek = startOfMonth.getDay();
    const daysInMonth = endOfMonth.getDate();
    const days = [];
    let day = new Date(startOfMonth);

    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(<GridItem key={`empty-${i}`} />);
    }

    while (day.getMonth() === currentDate.getMonth()) {
      const isToday = day.toDateString() === today.toDateString();
      days.push(
        <GridItem
          key={day}
          border="1px solid"
          borderColor={isToday ? 'blue.500' : 'gray.200'}
          p={2}
          minH="50px"
          verticalAlign="top"
          bg={isToday ? 'blue.50' : 'white'}
        >
          <Text fontSize="sm" color={isToday ? 'blue.600' : 'black'}>
            {day.getDate()}
          </Text>
          {jobData
            .filter(job => new Date(job.application_start).toDateString() === day.toDateString())
            .map(job => (
              <Text key={job.posting_id} fontSize="xs">{job.company_name} - {job.job_title}</Text>
            ))}
            
        </GridItem>
      );
      day.setDate(day.getDate() + 1);
    }

    return days;
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  const handleAddEvent = async () => {
    const event = { 
      userCode: user.userCode, 
      companyName: newEvent.companyName, 
      jobTitle: newEvent.jobTitle, 
      applicationStart: newEvent.applicationStart, 
      applicationEnd: newEvent.applicationEnd, 
      jobDescription: newEvent.jobDescription, 
      status: newEvent.status 
    };
  
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/job/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
      });
      if (response.ok) {
        console.log('Event added successfully');
        fetchJobData(); // 새로운 데이터를 다시 불러옵니다.
      } else {
        console.error('Failed to add event');
      }
    } catch (error) {
      console.error('Error adding event:', error);
    }

    setNewEvent({ companyName: '', jobTitle: '', applicationStart: '', applicationEnd: '', jobDescription: '', status: '' });
    setIsModalOpen(false);
  };

  return (
    <Box p={5}>
      <Button onClick={() => setIsModalOpen(true)}>일정추가</Button>
      <HStack justifyContent="space-between" mb={5}>
        <IconButton icon={<ChevronLeftIcon />} onClick={prevMonth} />
        <Text fontSize="2xl">{currentDate.getFullYear()}.{String(currentDate.getMonth() + 1).padStart(2, '0')}</Text>
        <IconButton icon={<ChevronRightIcon />} onClick={nextMonth} />
      </HStack>
      <Grid templateColumns="repeat(7, 1fr)" gap={2}>
        <GridItem fontWeight="bold" textAlign="center">일</GridItem>
        <GridItem fontWeight="bold" textAlign="center">월</GridItem>
        <GridItem fontWeight="bold" textAlign="center">화</GridItem>
        <GridItem fontWeight="bold" textAlign="center">수</GridItem>
        <GridItem fontWeight="bold" textAlign="center">목</GridItem>
        <GridItem fontWeight="bold" textAlign="center">금</GridItem>
        <GridItem fontWeight="bold" textAlign="center">토</GridItem>
        {renderCalendar()}
      </Grid>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>일정 추가</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>회사 이름</FormLabel>
              <Input 
                placeholder="Company Name" 
                value={newEvent.companyName} 
                onChange={(e) => setNewEvent({ ...newEvent, companyName: e.target.value })} 
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>직책</FormLabel>
              <Input 
                placeholder="Job Title" 
                value={newEvent.jobTitle} 
                onChange={(e) => setNewEvent({ ...newEvent, jobTitle: e.target.value })} 
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>지원 시작 날짜</FormLabel>
              <Input 
                type="date" 
                value={newEvent.applicationStart} 
                onChange={(e) => setNewEvent({ ...newEvent, applicationStart: e.target.value })} 
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>지원 마감 날짜</FormLabel>
              <Input 
                type="date" 
                value={newEvent.applicationEnd} 
                onChange={(e) => setNewEvent({ ...newEvent, applicationEnd: e.target.value })} 
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>설명</FormLabel>
              <Input 
                placeholder="Job Description" 
                value={newEvent.jobDescription} 
                onChange={(e) => setNewEvent({ ...newEvent, jobDescription: e.target.value })} 
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>상태</FormLabel>
              <Input 
                placeholder="Status" 
                value={newEvent.status} 
                onChange={(e) => setNewEvent({ ...newEvent, status: e.target.value })} 
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddEvent}>
              추가
            </Button>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>취소</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Calendar;
