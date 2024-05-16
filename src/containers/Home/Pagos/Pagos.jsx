
import React, { useState, useEffect } from 'react';
import Title from '../../../components/Title';
import Button from '../../../components/Button';
import Menu from '../Menu/Menu';
import { StyledHome, StyledTitle, StyledModal, StyledModalPago, 
  StyledTableWrapper, Styledtarifa, SpinnerWrapper, 
  ImgCodigoQR, LabelNombre, LabelNombreTianguis, 
  StyledModalTarjetaQR, ImgCodigoQRTarjeta,
  ModalTarjeta, DivTxtTarjeta
 } from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faClosedCaptioning, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import Axios from "axios";
import QRious from 'qrious';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Box, Flex } from '@chakra-ui/react';
import ChatbotWrapper from '../../../components/ChatbotWrapper';

const Pagos = () => {
  const [comerciantes, setComerciantes] = useState([]);
  const [historialVisible, setHistorialVisible] = useState(false);
  const [historialPagos, setHistorialPagos] = useState('');
  const [qrPago, setqrPago] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedComercianteIndex, setSelectedComercianteIndex] = useState(null);
  const [nuevoComerciante, setNuevoComerciante] = useState({});
  const [showSpinner, setshowSpinner] = useState(false);
  const [showInputs, setShowInputs] = useState(false);
  const [showButtonBuscar, setShowButtonBuscar] = useState(true);
  const [imagen, setImagen] = useState('');
  const [folioComerciante, setFolioComerciante] = useState({});
  const [monto, setMonto] = useState('');
  const [tarjetaQr, setTarjetaQr] = useState(false);
  const [nombreComerciante, setNombreComerciante] = useState('');
  const [nombreTianguis, setNombreTianguis] = useState('');

  const listarPagosComerciantes = () => {
    Axios.get('https://node.sistemaintegraldetianguis.com/listarPagosComerciante')
    .then(function (response) {
      setComerciantes(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  
  useEffect(() => {
    listarPagosComerciantes();
  }, []);
  
  const abrirModal = () => {
    setModalVisible(true);
  };

  const mostrarCodigoQR = (codigoqr) => {
    if (codigoqr !== undefined && codigoqr !== null && codigoqr !== '') {
      setHistorialPagos(codigoqr);
      setHistorialVisible(true);
      Axios.post('https://node.sistemaintegraldetianguis.com/mostrarImagen', {
        codigoqr: codigoqr,
      },
      {
        responseType: "arraybuffer"
      }
      )
      .then(function (response) {
        const base64 = btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        )
        const url = `data:image/png;base64,${base64}`;
        setqrPago(url);
      })
      .catch(function (error) {
        alert(`Ocurrio un erro al mostrar la imagen: ${error}`)
      });
    } else {
      console.error('Índice de comerciante inválido');
    }
  };

  const cerrarImgQR = () => {
    setSelectedComercianteIndex(null);
    setHistorialPagos('');
    setHistorialVisible(false);
  };
  const cerrarTarjetaQR = () => {
    setTarjetaQr(false);
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNuevoComerciante((prevComerciante) => ({
      ...prevComerciante,
      [name]: value,
    }));
  };


  const handleInputMonto = (event) =>{
    setMonto(event.target.value);
  }
  const cerrarModal = () => {
    setModalVisible(false);
    setNuevoComerciante({});
  };

  const handleFileChange = (event) => {
    setImagen(event.target.files[0]);
  }

  const cargarIMG = () => {
    if (!imagen) {
      console.log('No se ha seleccionado ninguna imagen');
      return;
    }
    const formData = new FormData();
    formData.append('file', imagen);
    formData.append('folioComerciante', JSON.stringify(folioComerciante));
    formData.append('monto', JSON.stringify(monto));
    Axios.post('https://node.sistemaintegraldetianguis.com/subirimagen', 
    formData, 
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
    })
    .then(function (response) {
      alert('Se ha cargado el monto y el codigo QR exitosamente');
      setModalVisible(false);   
    })
    .catch(function (error) {
      console.log(error);
    }); 
  }

  const buscarComerciante = () => {
    setshowSpinner(true);
    Axios.post('https://node.sistemaintegraldetianguis.com/buscarComerciante', {
      nombre: nuevoComerciante.nombre,
    })
    .then(function (response) {
      if(response.data.length === 0){
        alert('usuario no encontrado!');
      }
      else{
        setNuevoComerciante(response.data[0]);
        setFolioComerciante(response.data[0]);
        setShowInputs(true);
        setshowSpinner(false);
        setShowButtonBuscar(false);
      }      
    })
    .catch(function (error) {
      console.log(error);
      setShowInputs(false);
      setShowButtonBuscar(true);
    });    
    setshowSpinner(false);
  }

  const generarPDF = (comerciante) => {
    setNombreComerciante(comerciante.nombre);
    setNombreTianguis(comerciante.tianguis);
    Axios.post('https://node.sistemaintegraldetianguis.com/mostrarImagen', {
        codigoqr: comerciante.codigoqr,
      },
      {
        responseType: "arraybuffer"
      }
      )
      .then(function (response) {
        const base64 = btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        )
        const url = `data:image/png;base64,${base64}`;
        setqrPago(url);
        setTarjetaQr(true);
        setTimeout(() => {
          let elementToCapture = document.getElementById('modalTarjeta');
          html2canvas(elementToCapture).then(function(canvas) {
            let pdf = new jsPDF();

            let imgData = canvas.toDataURL('image/png');
            pdf.addImage(imgData, 'PNG', 10, 10, 100, 50);
            pdf.save('documento.pdf'); 
            setTarjetaQr(false);
          });
        }, 500);
        
      })
      .catch(function (error) {
        alert(`Ocurrio un error al mostrar la imagen: ${error}`)
    });

    
    // const yPos = 1 * 90 + 10;

    // const canvas = document.createElement('canvas');
    // canvas.width = 350;
    // canvas.height = 150;

    // const ctx = canvas.getContext('2d');
    // ctx.fillStyle = '#f9f2f7';
    // ctx.fillRect(0, 0, canvas.width, canvas.height);

    // const qrCodeString = JSON.stringify(comerciante);

    // ctx.font = 'bold 16px Arial';
    // ctx.fillStyle = '#8c52ff';
    // ctx.fillText('Sistema Integral de Tianguis', 10, 30);

    // ctx.font = '14px Arial';
    // ctx.fillStyle = '#8c52ff';
    // ctx.fillText(` ${comerciante.nombre}`, 10, 60);
    // ctx.fillText(` ${comerciante.folio}`, 10, 80);

    // // Dibujar círculos
    // ctx.beginPath();
    // ctx.arc(20, 110, 10, 0, Math.PI * 2);
    // ctx.fillStyle = '#aa8ed6';
    // ctx.fill();

    // ctx.beginPath();
    // ctx.arc(40, 110, 10, 0, Math.PI * 2);
    // ctx.fillStyle = '#5e17eb';
    // ctx.fill();

    // ctx.beginPath();
    // ctx.arc(60, 110, 10, 0, Math.PI * 2);
    // ctx.fillStyle = '#ff66c4';
    // ctx.fill();

    // // Generar código QR con qrious
    // const qr = new QRious({
    //   value: qrCodeString,
    //   size: 50, // Tamaño del código QR
    // });

    // const qrImg = new Image();
    // qrImg.src = qr.toDataURL('image/png');

    // qrImg.onload = function () {
    //   ctx.drawImage(qrImg, 200, 40, 110, 100);

    //   const imgData = canvas.toDataURL('image/png');
    //   const pdf = new jsPDF();
    //   pdf.addImage(imgData, 'PNG', 10, yPos + 10, 90, 60);

    //   pdf.save('comerciante.pdf');
    // };

  };

  return (
    <Flex direction={{ base: 'column', md: 'row' }} minHeight="50vh">
    {/* Menú */}
    <Menu />
     {/* Contenido principal */}
     <Box flex="1" p={{ base: 4, md: 8 }}>
      <StyledTitle>
        <Title text="Pagos Comerciantes" />
      </StyledTitle> 
 
      <Button onClick={abrirModal}>Registrar Nuevo Pago</Button>
      <StyledTableWrapper>
        <table>
          <thead>
            <tr>
              <th>Nombre del comerciante</th>
              <th>Nombre Tianguis</th>
              <th>Fecha</th>
              <th>Ver codigo QR</th>
              <th>Generar Tarjeta QR</th>
            </tr>
          </thead>
          <tbody id="comerciantesTable">
            {comerciantes.map((comerciante, index) => (
              <tr key={index}>
                <td>{comerciante.nombre}</td>
                <td>{comerciante.tianguis}</td>
                <td>{comerciante.fecha}</td>
                <td>
                  <Button onClick={() => mostrarCodigoQR(comerciante.codigoqr,)}>Ver codigo QR</Button>
                </td>
                <td>
                  <Button onClick={() => generarPDF(comerciante)}>Generar tarjeta</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </StyledTableWrapper>
      {historialVisible && (
        <StyledModal className="modal">
          <div className="subtitle">Codigo QR</div>
          <FontAwesomeIcon icon={faWindowClose} className='close' onClick={cerrarImgQR}></FontAwesomeIcon>
          <ImgCodigoQR src={qrPago} alt='Codigo QR para hacer el pago' ></ImgCodigoQR>
        </StyledModal>
      )}
      {tarjetaQr && (
        <StyledModalTarjetaQR className="modal" >
          <div className="subtitle">Codigo QR</div>
          <FontAwesomeIcon icon={faWindowClose} className='close' onClick={cerrarTarjetaQR}></FontAwesomeIcon>
          <ModalTarjeta id='modalTarjeta'>
            <DivTxtTarjeta>
            <LabelNombre>{nombreComerciante}</LabelNombre><br></br>
            <LabelNombreTianguis>{nombreTianguis}</LabelNombreTianguis>
            </DivTxtTarjeta>
            <ImgCodigoQRTarjeta src={qrPago} alt='Codigo QR para hacer el pago' ></ImgCodigoQRTarjeta>            
          </ModalTarjeta>
        </StyledModalTarjetaQR>
        )}
        
      {/*
        Modal agregar pago        
      */}

        {modalVisible && (
          <StyledModalPago className='modal'>
            <div className='subtitle'>Datos del comerciante</div>
            <div>
              <label>Nombre:</label>
              <input
                type="text"
                name="nombre"
                value={nuevoComerciante.nombre || ''}
                onChange={handleInputChange}
              />
            </div>
            {showInputs && (
              <div>
                <label>Tianguis:</label>
                <input
                  type="text"
                  name="tianguis"
                  value={nuevoComerciante.tianguis}
                  disabled 
                />
              </div>
            )}
            {showInputs && (
              <div>
                <label>Monto:</label>
                <input
                  type="text"
                  name="monto"
                  value={monto}
                  onChange={handleInputMonto}
                />
              </div>
            )}
            {showInputs && (
              <div>
                <label>Codigo QR:</label>
                <input
                  type="file"
                  accept="image/*" 
                  onChange={handleFileChange}
                />
              </div>
            )}
            { showSpinner && 
              ( 
                <SpinnerWrapper />
              )
            }
            { showButtonBuscar &&
              (
                <Button onClick={buscarComerciante}>Buscar</Button>
              )
            }
            { !showButtonBuscar &&
              (
                <Button onClick={cargarIMG}>Cargar QR y monto</Button>
              )
            }            
            <Button onClick={cerrarModal}>Cancelar</Button>
          </StyledModalPago>
        )}
        <ChatbotWrapper />
    </Box>
    </Flex>
  );
};

export default Pagos;

