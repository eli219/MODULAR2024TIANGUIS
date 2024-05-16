import React from 'react';
import Title from '../../../components/Title';
import { StyledTableWrapper, StyledTitle } from './styles';
import Menu from '../Menu/Menu';
import { Box, Flex, Image } from '@chakra-ui/react';
import configuracion from '../../../Images/configuracion.jpeg'
import ChatbotWrapper from '../../../components/ChatbotWrapper';

const Configuracion = () => (
    <Flex direction={{ base: 'column', md: 'row' }} minHeight="50vh">
        {/* Menú */}
        <Menu />

        {/* Contenido principal */}
        <Box flex="1" p={{ base: 4, md: 8 }}>
            {/* Título */}
            <StyledTitle>
                <Title text="Configuracion" />
            </StyledTitle>

            {/* Contenedor para el texto y la imagen */}
            <Box>
                {/* Contenedor para el texto */}
                <StyledTableWrapper>
                    <p>Para contactar cualquier error envíe un mensaje a nuestro correo</p>
                    <p>soportesistemaintegral@gmail.com</p>
                </StyledTableWrapper>

                {/* Contenedor para la imagen */}
                <Box mt={4}>
                    <Image
                        src={configuracion} // Reemplaza "URL_DE_LA_IMAGEN" con la URL de la imagen que deseas mostrar
                        alt="Contacto" // Proporciona una descripción alternativa de la imagen
                        maxW="100%" // Ajusta para que la imagen no se expanda más allá de su contenedor
                        height="auto" // Mantiene la relación de aspecto original de la imagen
                    />
                </Box>
            </Box>
            <ChatbotWrapper />
        </Box>
    </Flex>
);

export default Configuracion;
