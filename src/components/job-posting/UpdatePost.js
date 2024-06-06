import React, { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Input, useToast, FormControl, FormLabel } from '@chakra-ui/react';

const UpdatePost = ({ isOpen, onClose, job, fetchJobData }) => {
    const [updatedJob, setUpdatedJob] = useState({ ...job });
    const toast = useToast();

    const handleUpdate = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/job/update`, {
                method: 'POST',
                headers: {
                    "Authorization": `ADMIN ${process.env.REACT_APP_ADMIN_KEY}`,
                    'Content-Type': 'application/json;charset=UTF8'
                },
                body: JSON.stringify(updatedJob)
            });
            if (response.ok) {
                toast({
                    title: "Job updated.",
                    description: "The job has been updated successfully.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
                fetchJobData();
            } else {
                throw new Error('Failed to update job');
            }
        } catch (error) {
            console.error('Error updating job:', error);
            toast({
                title: "Error updating job.",
                description: "There was an error updating the job.",
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
                <ModalHeader>Update Job</ModalHeader>
                <ModalCloseButton />
                <ModalBody>

                    <FormControl>
                        <FormLabel>회사 이름</FormLabel>
                        <Input
                            placeholder="Company Name"
                            value={updatedJob.companyName}
                            onChange={(e) => setUpdatedJob({ ...updatedJob, companyName: e.target.value })}
                        />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>직책</FormLabel>
                        <Input
                            placeholder="Job Title"
                            value={updatedJob.jobTitle}
                            onChange={(e) => setUpdatedJob({ ...updatedJob, jobTitle: e.target.value })}
                        />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>지원 시작 날짜</FormLabel>
                        <Input
                            type="date"
                            value={updatedJob.applicationStart}
                            onChange={(e) => setUpdatedJob({ ...updatedJob, applicationStart: e.target.value })}
                        />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>지원 마감 날짜</FormLabel>
                        <Input
                            type="date"
                            value={updatedJob.applicationEnd}
                            onChange={(e) => setUpdatedJob({ ...updatedJob, applicationEnd: e.target.value })}
                        />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>설명</FormLabel>
                        <Input
                            placeholder="Job Description"
                            value={updatedJob.jobDescription}
                            onChange={(e) => setUpdatedJob({ ...updatedJob, jobDescription: e.target.value })}
                        />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>상태</FormLabel>
                        <Input
                            placeholder="Status"
                            value={updatedJob.status}
                            onChange={(e) => setUpdatedJob({ ...updatedJob, status: e.target.value })}
                        />
                    </FormControl>
                    {/* Add other fields as necessary */}
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleUpdate}>
                        Update
                    </Button>
                    <Button variant="ghost" onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default UpdatePost;
