import React from 'react';
import { GridItem, Text } from '@chakra-ui/react';

const CalendarDay = ({ day, isToday, jobData }) => {
  return (
    <GridItem
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
      .filter(job => new Date(job.applicationStart).toDateString() === day.toDateString())
      .map(job => (
        <Text key={job.postingId} fontSize="xs">{job.companyName} - {job.jobTitle}</Text>
      ))}
  </GridItem>
  );
};

export default CalendarDay;
