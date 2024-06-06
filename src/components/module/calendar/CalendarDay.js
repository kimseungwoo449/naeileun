
import React, { useState } from 'react';
import { GridItem, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Box } from '@chakra-ui/react';
import UpdatePost from '../../job-posting/UpdatePost';
import DeletePost from '../../job-posting/DeletePost';

const CalendarDay = ({ day, isToday, jobData, fetchJobData }) => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleClick = (job) => {
    setSelectedJob(job);
    setIsActionModalOpen(true);
  };

  const handleUpdateClick = () => {
    setIsActionModalOpen(false);
    setIsUpdateModalOpen(true);
  };

  const handleDeleteClick = () => {
    setIsActionModalOpen(false);
    setIsDeleteModalOpen(true);
  };

  return (
    // <>
    //   <GridItem
    //     border="1px solid"
    //     borderColor={isToday ? 'blue.500' : 'gray.200'}
    //     p={2}
    //     minH="100px"
    //     verticalAlign="top"
    //     bg={isToday ? 'blue.50' : 'white'}
    //     _hover={{ bg: 'gray.100', cursor: 'pointer' }}
    //   >
    //     <Text fontSize="sm" color={isToday ? 'blue.600' : 'black'}>
    //       {day.getDate()}
    //     </Text>
    //     {jobData
    //       .filter(job => new Date(job.applicationStart).toDateString() === day.toDateString())
    //       .map(job => (
    //         <Box 
    //           key={job.postingId} 
    //           onClick={() => handleClick(job)} 
    //           whiteSpace="nowrap" 
    //           overflow="hidden" 
    //           textOverflow="ellipsis"
    //           maxW="100%"  // 추가
    //         >
    //            <Text fontSize="xs" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">{job.companyName} - {job.jobTitle}</Text>
    //         </Box>
    //       ))}
    //     {jobData
    //       .filter(job => new Date(job.applicationEnd).toDateString() === day.toDateString())
    //       .map(job => (
    //         <Box 
    //           key={`${job.postingId}-end`} 
    //           onClick={() => handleClick(job)} 
    //           color="tomato" 
    //           whiteSpace="nowrap" 
    //           overflow="hidden" 
    //           textOverflow="ellipsis"
    //           maxW="100%"  // 추가
    //         >
    //          <Text fontSize="xs" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">{job.companyName} - {job.jobTitle}</Text>
    //         </Box>
    //       ))}
    //   </GridItem>

    //   {selectedJob && (
    //     <>
    //       <Modal isOpen={isActionModalOpen} onClose={() => setIsActionModalOpen(false)}>
    //         <ModalOverlay />
    //         <ModalContent>
    //           <ModalHeader>Manage Job Posting</ModalHeader>
    //           <ModalCloseButton />
    //           <ModalBody>
    //             <Text fontWeight="bold">{selectedJob.companyName}</Text>
    //             <Text>{selectedJob.jobTitle}</Text>
    //           </ModalBody>
    //           <ModalFooter>
    //             <Button colorScheme="blue" mr={3} onClick={handleUpdateClick}>
    //               Update
    //             </Button>
    //             <Button colorScheme="red" onClick={handleDeleteClick}>
    //               Delete
    //             </Button>
    //             <Button variant="ghost" onClick={() => setIsActionModalOpen(false)}>Cancel</Button>
    //           </ModalFooter>
    //         </ModalContent>
    //       </Modal>

    //       <UpdatePost
    //         isOpen={isUpdateModalOpen}
    //         onClose={() => setIsUpdateModalOpen(false)}
    //         job={selectedJob}
    //         fetchJobData={fetchJobData}
    //       />

    //       <DeletePost
    //         isOpen={isDeleteModalOpen}
    //         onClose={() => setIsDeleteModalOpen(false)}
    //         job={selectedJob}
    //         fetchJobData={fetchJobData}
    //       />
    //     </>
    //   )}
    // </>
    <>
      <GridItem
        border="1px solid"
        borderColor={isToday ? 'blue.500' : 'gray.200'}
        p={2}
        minH="100px"
        verticalAlign="top"
        bg={isToday ? 'blue.50' : 'white'}
        _hover={{ bg: 'gray.100', cursor: 'pointer' }}
        overflow="hidden"
      >
        <Text fontSize="sm" color={isToday ? 'blue.600' : 'black'}>
          {day.getDate()}
        </Text>
        {jobData
          .filter(job => new Date(job.applicationStart).toDateString() === day.toDateString())
          .map(job => (
            <Box 
              key={job.postingId} 
              onClick={() => handleClick(job)} 
              maxW="100%" 
              whiteSpace="nowrap" 
              overflow="hidden" 
              textOverflow="ellipsis"
            >
              <Text fontSize="xs" isTruncated>{job.companyName} - {job.jobTitle}</Text>
            </Box>
          ))}
        {jobData
          .filter(job => new Date(job.applicationEnd).toDateString() === day.toDateString())
          .map(job => (
            <Box 
              key={`${job.postingId}-end`} 
              onClick={() => handleClick(job)} 
              maxW="100%" 
              whiteSpace="nowrap" 
              overflow="hidden" 
              textOverflow="ellipsis"
            >
              <Text fontSize="xs" color="tomato" isTruncated>{job.companyName} - {job.jobTitle}</Text>
            </Box>
          ))}
      </GridItem>

      {selectedJob && (
        <>
          <Modal isOpen={isActionModalOpen} onClose={() => setIsActionModalOpen(false)}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Manage Job Posting</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text fontWeight="bold">{selectedJob.companyName}</Text>
                <Text>{selectedJob.jobTitle}</Text>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleUpdateClick}>
                  Update
                </Button>
                <Button colorScheme="red" onClick={handleDeleteClick}>
                  Delete
                </Button>
                <Button variant="ghost" onClick={() => setIsActionModalOpen(false)}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          <UpdatePost
            isOpen={isUpdateModalOpen}
            onClose={() => setIsUpdateModalOpen(false)}
            job={selectedJob}
            fetchJobData={fetchJobData}
          />

          <DeletePost
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            job={selectedJob}
            fetchJobData={fetchJobData}
          />
        </>
      )}
    </>
  );
};

export default CalendarDay;
