import React from 'react';
import Title from '../../../components/Title';
import { StyledTableWrapper, StyledContainer, StyledHome, StyledTitle } from './styles';
import Menu from '../Menu/Menu';
import Button from '../../../components/Button';
import lector from '../../../Images/lector.png';
import SistemaIntegralMovilAPK from '../../../APK/SistemaIntegralmovil.apk'; 
import { Box, Flex } from '@chakra-ui/react';

const Movil = () => {
  const handleDownload = () => {
    const apkDownloadUrl = SistemaIntegralMovilAPK;

    const downloadLink = document.createElement('a');
    downloadLink.href = apkDownloadUrl;
    downloadLink.download = 'SistemaIntegralmovil.apk';

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <Flex direction={{ base: 'column', md: 'row' }} minHeight="50vh">
    {/* Menú */}
    <Menu />
     {/* Contenido principal */}
     <Box flex="1" p={{ base: 4, md: 8 }}>
      <StyledTitle>
        <Title text="App Móvil" />
      </StyledTitle> 
  
      <StyledTableWrapper>
        <img src={lector} className='lector' alt="Lector" />
        <p>En este apartado podrás descargar la aplicación para el Recaudador</p>
        <p>Dale clic en el botón para descargar la aplicación móvil</p>
        <Button width='500px' onClick={handleDownload}>
          Descargar Aplicación Móvil
        </Button>
      </StyledTableWrapper>
      </Box>
    </Flex>
  );
};

export default Movil;
