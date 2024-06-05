import React, { useState } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody,
  ModalFooter, Button, Input, FormControl, FormLabel, Tabs, TabList, TabPanels, Tab, TabPanel
} from '@chakra-ui/react';


import { useLogin } from '../LoginContext';
import SearchPost from './SearchPost';

const WritePost = ({ isOpen, onClose, fetchJobData }) => {
  const [newEvent, setNewEvent] = useState({ companyName: '', jobTitle: '', applicationStart: '', applicationEnd: '', jobDescription: '', status: '' });
  const { user } = useLogin();

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
        fetchJobData();
      } else {
        console.error('Failed to add event');
      }
    } catch (error) {
      console.error('Error adding event:', error);
    }

    setNewEvent({ companyName: '', jobTitle: '', applicationStart: '', applicationEnd: '', jobDescription: '', status: '' });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>일정 관리</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Tabs>
            <TabList>
              <Tab>내 일정 등록</Tab>
              <Tab>채용 검색하기</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
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
                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={handleAddEvent}>
                    추가
                  </Button>
                  <Button variant="ghost" onClick={onClose}>취소</Button>
                </ModalFooter>
              </TabPanel>
              <TabPanel>
                <SearchPost onClose={onClose} fetchJobData={fetchJobData} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default WritePost;
