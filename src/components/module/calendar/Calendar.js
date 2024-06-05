import React, { useState, useEffect } from 'react';
import { 
  Box, Grid, GridItem, Text, HStack, IconButton, Button 
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

import CalendarDay from './CalendarDay';
import WritePost from '../../job-posting/WritePost';
import { useLogin } from '../../LoginContext';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [jobData, setJobData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const today = new Date();
  const { user } = useLogin();

  useEffect(() => {
    fetchJobData();
  }, [currentDate],user.userCode);

  const fetchJobData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/job/read`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=UTF8'
        },
        body: user.userCode
      });
      const data = await response.json();
      console.log(data);
      setJobData(data);
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

    // 첫 주의 빈 칸을 렌더링
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(<GridItem key={`empty-${i}`} />);
    }

    while (day.getMonth() === currentDate.getMonth()) {
      const isToday = day.toDateString() === today.toDateString();
      

      days.push(
        <CalendarDay
        key={day.toDateString()}
        day={new Date(day)}
        isToday={isToday}
        jobData={jobData}
        fetchJobData={fetchJobData}
      />
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

  const openAddEventModal = () => {
    setIsModalOpen(true);
  };

  return (
    <Box p={5}>
      <Button onClick={openAddEventModal}>일정추가</Button>
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

      <WritePost isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} fetchJobData={fetchJobData} />
    </Box>
  );
};

export default Calendar;
