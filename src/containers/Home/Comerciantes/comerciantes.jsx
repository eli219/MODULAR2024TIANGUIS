
import React, { useState, useRef, useEffect } from 'react';
import Title from '../../../components/Title';
import { StyledHome, StyledTitle, Styledtarifa, StyledModal, StyledTableWrapper } from './styles';
import Button from '../../../components/Button';
import Menu from '../Menu/Menu';
import jsPDF from 'jspdf';
import QRCode from 'qrcode.react';
import styled from 'styled-components';
import QRious from 'qrious';
import Axios from "axios";
import { Box, Flex } from '@chakra-ui/react';
import ChatbotWrapper from '../../../components/ChatbotWrapper';

const PrepaidCard = styled.div`
  background-color: #f9f2f7;
  border: 2px solid #6b5b95;
  border-radius: 10px;
  padding: 20px;
  margin: 10px;
  height: 150px;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: black;
  font-family: Arial, sans-serif;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
`;

const PrepaidCardContent = styled.div`
  flex-grow: 1;
  text-align: left;
`;

const PrepaidCardQR = styled(QRCode)`
  margin-left: 20px;
  color: black;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: black;
`;

const CardContent = styled.div`
  font-size: 1rem;
  line-height: 1.5;
  color: black;
`;

const Comerciantes = () => {
  const [comerciantes, setComerciantes] = useState([]);
  const [tablaComerciantes, settablaComerciantes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [nuevaComerciante, setNuevoComerciante] = useState({});
  const [codigoQR, setCodigoQR] = useState('');
  const tableRef = useRef(null);

  const abrirModal = () => {
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
    setNuevoComerciante({});
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNuevoComerciante((prevComerciante) => ({
      ...prevComerciante,
      [name]: value,
    }));
  };

  const agregarComerciante = () => {
    const nuevoComercianteConPago = {
      ...nuevaComerciante,
      pago: (
        (parseFloat(nuevaComerciante.metros) * 9) +
        parseFloat(nuevaComerciante.basura) +
        parseFloat(nuevaComerciante.piso)
      ).toFixed(2),
      pagoRealizado: false,
      fechaPago: '',
    };
    Axios.post('https://node.sistemaintegraldetianguis.com/registrarComerciante', {
      nuevoComerciante: nuevoComercianteConPago,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    setComerciantes((prevComerciante) => [...prevComerciante, nuevoComercianteConPago]);
    setCodigoQR(JSON.stringify(nuevoComercianteConPago));
    listarComerciantes();
    cerrarModal();
  };

  const generarPDF = () => {
    comerciantes.forEach((comerciante, index) => {
      const yPos = index * 90 + 10;
      const idUnico = generarIDUnico();

      const canvas = document.createElement('canvas');
      canvas.width = 350;
      canvas.height = 150;

      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#f9f2f7';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const qrCodeString = JSON.stringify(comerciante);

      ctx.font = 'bold 16px Arial';
      ctx.fillStyle = '#8c52ff';
      ctx.fillText('Sistema Integral de Tianguis', 10, 30);

      ctx.font = '14px Arial';
      ctx.fillStyle = '#8c52ff';
      ctx.fillText(` ${comerciante.nombre}`, 10, 60);
      ctx.fillText(` ${idUnico}`, 10, 80);

      // Dibujar círculos
      ctx.beginPath();
      ctx.arc(20, 110, 10, 0, Math.PI * 2);
      ctx.fillStyle = '#aa8ed6';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(40, 110, 10, 0, Math.PI * 2);
      ctx.fillStyle = '#5e17eb';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(60, 110, 10, 0, Math.PI * 2);
      ctx.fillStyle = '#ff66c4';
      ctx.fill();

      // Generar código QR con qrious
      const qr = new QRious({
        value: qrCodeString,
        size: 50, // Tamaño del código QR
      });

      const qrImg = new Image();
      qrImg.src = qr.toDataURL('image/png');

      qrImg.onload = function () {
        ctx.drawImage(qrImg, 200, 40, 110, 100);

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 10, yPos + 10, 90, 60);

        if (index !== comerciantes.length - 1) {
          pdf.addPage();
        }

        if (index === comerciantes.length - 1) {
          pdf.save('comerciantes.pdf');
        }
      };
    });
  };

  const generarIDUnico = () => {
    return Math.floor(Math.random() * 1000000);
  };

  const listarComerciantes = () => {
    Axios.get('https://node.sistemaintegraldetianguis.com/registrarComerciante')
    .then(function (response) {
      console.log(response.data);
      settablaComerciantes(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  useEffect(() => {
    listarComerciantes();
  }, []);

  return (
    <Flex direction={{ base: 'column', md: 'row' }} minHeight="50vh">
    {/* Menú */}
    <Menu />
     {/* Contenido principal */}
     <Box flex="1" p={{ base: 4, md: 8 }}>
      <StyledTitle>
        <Title text="Comerciantes" />
      </StyledTitle>      
      <Button onClick={abrirModal}>Registrar Comerciante</Button>
        
        <StyledTableWrapper>
          <table ref={tableRef}>
            <thead>
              <tr>
                <th>Nombre del comerciante</th>
                <th>Tianguis</th>
                <th>Metros</th>
                <th>Giro</th>
                <th>Piso</th>
                <th>Basura</th>
              </tr>
            </thead>
            <tbody id="comerciantesTable">
              {tablaComerciantes.map((comerciante, index) => (
                <tr key={index}>
                  <td>{comerciante.nombre}</td>
                  <td>{comerciante.tianguis}</td>
                  <td>{comerciante.metros}</td>
                  <td>{comerciante.giro}</td>
                  <td>{comerciante.piso}</td>
                  <td>{comerciante.basura}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </StyledTableWrapper>
        {modalVisible && (
          <StyledModal className='modal'>
            <div className='subtitle'>Datos del comerciante</div>
            <div>
              <label>Nombre:</label>
              <input
                type="text"
                name="nombre"
                value={nuevaComerciante.nombre || ''}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Tianguis:</label>
              <input
                type="text"
                name="tianguis"
                value={nuevaComerciante.tianguis || ''}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Metros:</label>
              <input
                type="text"
                name="metros"
                value={nuevaComerciante.metros || ''}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Giro:</label>
              <input
                type="text"
                name="giro"
                value={nuevaComerciante.giro || ''}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Piso:</label>
              <input
                type="text"
                name="piso"
                value={nuevaComerciante.piso || ''}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Basura:</label>
              <input
                type="text"
                name="basura"
                value={nuevaComerciante.basura || ''}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Telefono:</label>
              <input
                type="text"
                name="telefono"
                value={nuevaComerciante.telefono || ''}
                onChange={handleInputChange}
              />
            </div>
            <Button onClick={agregarComerciante}>Agregar</Button>
            <Button onClick={cerrarModal}>Cancelar</Button>
          </StyledModal>
        )}
        <ChatbotWrapper />
 </Box>
    </Flex>
  );
};

export default Comerciantes;

