import React from 'react';
import { Box, Image, Stack } from '@chakra-ui/react';
import { faHome, faHandHoldingDollar, faShapes, faCogs, faAddressCard, faCoins } from '@fortawesome/free-solid-svg-icons';
import MenuItem from '../../../components/MenuItem';
import logo from '../../../Images/logo.png';

const menuDefault = [
  {
    displayName: 'Inicio',
    path: '/home',
    icon: faHome,
  },
  {
    displayName: 'Tarifas de tianguis',
    path: '/tarifas',
    icon: faCoins,
  },
  {
    displayName: 'Registro Comerciantes',
    path: '/comerciantes',
    icon: faAddressCard,
  },
  {
    displayName: 'Pagos Comerciantes',
    path: '/pagos',
    icon: faHandHoldingDollar,
  },
  {
    displayName: 'Aplicación móvil',
    path: '/movil',
    icon: faShapes,
  },
  {
    displayName: 'Configuración',
    path: '/configuracion',
    icon: faCogs,
  },
];

const Menu = () => (
<Box
    borderRadius='40px' mr='10px' bg="linear-gradient(90deg, rgba(210,186,219,1) 0%, rgba(172,136,181,1) 35%, rgba(147,172,203,1) 100%)"
    w={{ base: '100%', md: '250px' }}
    minH="60vh"
    p={4}
>
    <Stack spacing={6}>
        <Image src={logo} className='logo' alt='logo' maxWidth="120px" maxHeight="120px" />
        {menuDefault.map((item, index) => (
            <MenuItem
                key={index}
                displayName={item.displayName}
                path={item.path}
                icon={item.icon}
            />
        ))}
    </Stack>
    
</Box>

);

export default Menu;
