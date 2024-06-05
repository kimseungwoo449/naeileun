
import React, { useState } from 'react';
import { GridItem, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from '@chakra-ui/react';
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
            <Text key={job.postingId} fontSize="xs" onClick={() => handleClick(job)}>
              {job.companyName} - {job.jobTitle} (Start)
            </Text>
          ))}
        {jobData
          .filter(job => new Date(job.applicationEnd).toDateString() === day.toDateString())
          .map(job => (
            <Text color="tomato" key={`${job.postingId}-end`} fontSize="xs" onClick={() => handleClick(job)}>
              {job.companyName} - {job.jobTitle} (End)
            </Text>
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
                <Text fontWeight="bold">{selectedJob.jobTitle}</Text>
                <Text>{selectedJob.companyName}</Text>
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
