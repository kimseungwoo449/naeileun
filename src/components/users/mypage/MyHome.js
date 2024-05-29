import React from 'react';
import { Box, Image, Text, VStack, HStack, Button, Grid } from '@chakra-ui/react';
import Calendar from '../../module/Calendar';

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
              경상국립대학교 (칠암)에서 공부했어요
            </Text>
            <Text>경상국립대학교 (칠암) 기계공학부 졸업</Text>
            <HStack spacing={2} mt={2}>
              <Button size="sm" colorScheme="teal">AutoCAD</Button>
              <Button size="sm" colorScheme="teal">CAD</Button>
              <Button size="sm" colorScheme="teal">CATIA</Button>
              <Button size="sm" colorScheme="teal">노력</Button>
            </HStack>
          </Box>
        </Box>
        <Grid templateColumns="repeat(2, 1fr)" gap={5}>
          <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={5}>
            <Text fontWeight="bold" fontSize="xl" mb={3}>스크랩한 채용정보</Text>
            <Box bg="gray.100" h="200px" borderRadius="md" />
          </Box>
          <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={5}>
            <Text fontWeight="bold" fontSize="xl" mb={3}>취업달력</Text>
            <Calendar/>
            <Box bg="gray.100" h="200px" borderRadius="md" />
          </Box>
          <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={5}>
            <Text fontWeight="bold" fontSize="xl" mb={3}>합격자 자소서 후기</Text>
            <Box bg="gray.100" h="200px" borderRadius="md" />
          </Box>
          <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={5}>
            <Text fontWeight="bold" fontSize="xl" mb={3}>인기글</Text>
            <Box bg="gray.100" h="200px" borderRadius="md" />
          </Box>
        </Grid>
      </VStack>
    </Box>
  );
};

export default MyHome;
