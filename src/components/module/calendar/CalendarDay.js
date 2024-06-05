// import React from 'react';
// import { GridItem, Text } from '@chakra-ui/react';

// const CalendarDay = ({ day, isToday, jobData }) => {
//     const isSameDay = (dateString, day) => {
//       const date = new Date(dateString);
//       return date.toDateString() === day.toDateString();
//     };
  

//   return (
//     <GridItem
//     border="1px solid"
//     borderColor={isToday ? 'blue.500' : 'gray.200'}
//     p={2}
//     minH="50px"
//     verticalAlign="top"
//     bg={isToday ? 'blue.50' : 'white'}
//   >
//     <Text fontSize="sm" color={isToday ? 'blue.600' : 'black'}>
//       {day.getDate()}
//     </Text>
//     {jobData
//         .filter(job => isSameDay(job.applicationStart, day))
//         .map(job => (
//           <Text key={`${job.postingId}-start`} fontSize="xs">
//             {job.companyName} - {job.jobTitle} 
//           </Text>
//         ))}
//       {jobData
//         .filter(job => isSameDay(job.applicationEnd, day))
//         .map(job => (
//           <Text color="tomato" key={`${job.postingId}-end`} fontSize="xs">
//             {job.companyName} - {job.jobTitle} 
//           </Text>
//         ))}
//   </GridItem>
//   );
// };

// export default CalendarDay;
import React, { useState } from 'react';
import { GridItem, Text } from '@chakra-ui/react';
import UpdatePost from '../../job-posting/UpdatePost';
import DeletePost from '../../job-posting/DeletePost';

const CalendarDay = ({ day, isToday, jobData, fetchJobData }) => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleClick = (job, action) => {
    setSelectedJob(job);
    if (action === 'update') {
      setIsUpdateModalOpen(true);
    } else if (action === 'delete') {
      setIsDeleteModalOpen(true);
    }
  };

  return (
    <>
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
            <Text key={job.postingId} fontSize="xs" onClick={() => handleClick(job, 'update')}>
              {job.companyName} - {job.jobTitle} 
            </Text>
          ))}
        {jobData
          .filter(job => new Date(job.applicationEnd).toDateString() === day.toDateString())
          .map(job => (
            <Text color="tomato" key={`${job.postingId}-end`} fontSize="xs" onClick={() => handleClick(job, 'delete')}>
              {job.companyName} - {job.jobTitle} 
            </Text>
          ))}
      </GridItem>

      {selectedJob && (
        <UpdatePost
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          job={selectedJob}
          fetchJobData={fetchJobData}
        />
      )}
      {selectedJob && (
        <DeletePost
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          job={selectedJob}
          fetchJobData={fetchJobData}
        />
      )}
    </>
  );
};

export default CalendarDay;
