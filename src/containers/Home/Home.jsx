import React, { useEffect, useState } from 'react';
import Title from '../../components/Title';
import { Box, Flex } from '@chakra-ui/react'; // Importa los componentes de Chakra UI que necesitas
import Menu from './Menu/Menu';
import ChatbotWrapper from '../../components/ChatbotWrapper';

const Home = () => {
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    setChatOpen(true);
  }, []);

  return (
    <Flex direction={{ base: 'column', md: 'row' }} minHeight="10vh">
     
      <Menu />

     
      <Box flex="1" p={{ base: 4, md: 7 }}>
        <Title text="Inicio" />
        <ChatbotWrapper />
      </Box>
    </Flex>
  );
};

export default Home;
