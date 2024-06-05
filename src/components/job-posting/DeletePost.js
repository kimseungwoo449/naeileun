import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Text, useToast } from '@chakra-ui/react';

const DeletePost = ({ isOpen, onClose, job, fetchJobData }) => {
  const toast = useToast();

  const handleDelete = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/job/delete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=UTF8'
        },
        body: JSON.stringify(job)
      });
      if (response.ok) {
        toast({
          title: "Job deleted.",
          description: "The job has been deleted successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        fetchJobData();
      } else {
        throw new Error('Failed to delete job');
      }
    } catch (error) {
      toast({
        title: "Error deleting job.",
        description: "There was an error deleting the job.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Job</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>정말 이 채용공고를 삭제 하시겠습니까?</Text>
          <Text fontWeight="bold">{job.jobTitle}</Text>
          <Text>{job.companyName}</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeletePost;
