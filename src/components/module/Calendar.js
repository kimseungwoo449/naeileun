import React, { useState, useEffect } from 'react';
import { Box, Grid, GridItem, Text, HStack, IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [jobData, setJobData] = useState([]);
  const today = new Date();

//   useEffect(() => {
//     fetchJobData();
//   }, [currentDate]);

//   const fetchJobData = async () => {
//     try {
//       const response = await fetch(`https://api.example.com/jobs?date=${currentDate.toISOString().slice(0, 10)}&apiKey=YOUR_API_KEY`);
//       const data = await response.json();
//       setJobData(data.jobs);
//     } catch (error) {
//       console.error('Error fetching job data:', error);
//     }
//   };
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
            {/* {jobData
              .filter(job => new Date(job.date).toDateString() === day.toDateString())
              .map(job => (
                <Text key={job.id} fontSize="xs">{job.company}</Text>
              ))} */}
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

  return (
    <Box p={5}>
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
    </Box>
  );
};

export default Calendar;
