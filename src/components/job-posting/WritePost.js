import React from 'react';

const WritePost = () => {
    return (
        <div>
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
        </div>
    );
};

export default WritePost;