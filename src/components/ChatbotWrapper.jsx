import React, { useState } from 'react';
import { Button, Box } from '@chakra-ui/react';
import Chatbot from './Chatbot'; // Asegúrate de importar tu componente Chatbot desde la ubicación correcta

// Define el estilo del botón flotante
const floatingButtonStyle = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    padding: '10px',
    backgroundColor: '#800D61',
    color: '#fff',
    borderRadius: '50%',
    cursor: 'pointer',
    zIndex: 1000,
    minHeight: '60px',
    minWidth: '60px',
};

// Define el componente ChatbotWrapper
const ChatbotWrapper = () => {
    const [isChatVisible, setIsChatVisible] = useState(false);

    // Función para alternar la visibilidad del chatbot
    const toggleChatVisibility = () => {
        setIsChatVisible(!isChatVisible);
    };

    return (
        <>
            {/* Botón flotante para mostrar el chatbot */}
            {!isChatVisible && (
                <Button style={floatingButtonStyle} onClick={toggleChatVisibility}>
                    Chat
                </Button>
            )}

            {/* Renderiza el chatbot si isChatVisible es true */}
            {isChatVisible && (
                <Box
                    style={{
                        position: 'fixed',
                        bottom: '20px',
                        right: '20px',
                        width: '300px', // Ancho del contenedor del chatbot
                        zIndex: 1000,
                        backgroundColor: 'white',
                        borderRadius: '10px',
                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                        padding: '10px',
                    }}
                >
                    <Chatbot onClose={toggleChatVisibility} />
                </Box>
            )}
        </>
    );
};

export default ChatbotWrapper;
