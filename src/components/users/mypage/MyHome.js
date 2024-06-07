import React from 'react';
import { Box, Image, Text, VStack, HStack, Button, Grid, Tag } from '@chakra-ui/react';
import Calendar from '../../module/calendar/Calendar';

const MyHome = () => {
  return (
    <Box p={5} maxW="container.lg" mx="auto">
    <VStack spacing={5} align="stretch">
      <Box
        p={5}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        display="flex"
        alignItems="center"
        bg="white"
        boxShadow="sm"
      >
        <Image
          borderRadius="full"
          boxSize="150px"
          src="https://via.placeholder.com/150"
          alt="Profile Image"
          mr={5}
        />
        <Box>
          <Text fontWeight="bold" fontSize="2xl">
            서울대학교에서 공부했어요
          </Text>
          <Text>서울대학교 기계공학부 졸업</Text>
          <HStack spacing={2} mt={2}>
            <Tag size="sm" colorScheme="teal">AutoCAD</Tag>
            <Tag size="sm" colorScheme="teal">CAD</Tag>
            <Tag size="sm" colorScheme="teal">CATIA</Tag>
            <Tag size="sm" colorScheme="teal">노력</Tag>
          </HStack>
        </Box>
      </Box>
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={5} bg="white" boxShadow="sm">
        <Text fontWeight="bold" fontSize="xl" mb={3}>취업달력</Text>
        <Calendar />
      </Box>
    </VStack>
  </Box>
  );
};

export default MyHome;
