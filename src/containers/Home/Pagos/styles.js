// styles.js
import styled, { keyframes } from 'styled-components';

const StyledHome = styled.div`
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-direction: column;
  background: white;
  height: auto; /* Altura automática */
  min-height: 100vh; /* Altura mínima del 100% del viewport */
`;

const StyledTitle = styled.div`
  margin-top: 20px; /* Cambio el margen para un espacio más adecuado */
  text-align: center; /* Centrar el texto */
`;

const Styledtarifa = styled.div`
  margin-left: auto; /* Mover el elemento hacia la derecha */
  margin-right: auto; /* Mover el elemento hacia la izquierda */
  width: 100%; /* Ancho completo */
  max-width: 800px; /* Ancho máximo */
  height: auto; /* Altura automática */
`;
const StyledTableWrapper = styled.div`
  overflow-x: auto;
  font-family: 'Arial', sans-serif;
  font-size: 18px;
  max-width: 100%;
  margin-top: 20px;

  table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    background-color: #ffffff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);

    th, td {
      padding: 12px 15px;
      text-align: left;
    }

    th {
      background-color: #f2f2f2;
      font-weight: bold;
    }

    tr:nth-child(even) {
      background-color: #f2f2f2;
    }

    tr:hover {
      background-color: #ddd;
    }
  }
`;

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  padding: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  z-index: 1000;

  label {
    display: block;
    margin-bottom: 8px;
  }

  input {
    width: 100%;
    padding: 8px;
    margin-bottom: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    margin-right: 8px;
  }
`;
const StyledModalTarjetaQR = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3);
  z-index: 9999;
  overflow: hidden;
  width:550px;
  height: 330px;

  .subtitle {
    margin: 0;
    background-color:#ddd;
    font-size: 24px;
    font-weight: bold;
    text-align:center;
  }
  .close{
    float: right;
    margin-top:-25px;
    cursor: pointer;
    color:red;
    height:30px;
    &:hover {
      opacity: 0.7;
    }
  }
  .modal-content {
    max-height: 400px;
    overflow-y: auto;
  }
`;

const ImgCodigoQR = styled.img`
width: 400px;
height: 400px;
`;

const ImgCodigoQRTarjeta = styled.img`
width: 300px;
height: 300px;
`;

const StyledModalPago = styled.div`
position: fixed;
width:800px;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
background-color: #ffffff;
padding: 20px;
box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
z-index: 1000;

label {
  display: block;
  margin-bottom: 8px;
}

input {
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  margin-right: 8px;
}
subtitle {
  color:linear-gradient(63.29deg, #EBC0E1 0.45%, #272244 100%);
}
`;

const Spinner = styled.div`

`;

const ModalTarjeta = styled.label`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const DivTxtTarjeta = styled.div`
  width: 40%;
`;
const LabelNombre = styled.label`
  font-size: 1.5em;
  margin-left: 20px;
`;

const LabelNombreTianguis = styled.label`
  font-size: 0%.9;
  color: gray;
  margin-left: 20px;
`;
const StyledTableContent = styled.div`
  max-height: 300px;
  overflow-y: auto;
`;

const StyledOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9998;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const SpinnerWrapper = styled.div`
  width: 40px;
  height: 40px;
  border: 6px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: ${rotate} 1s linear infinite;
`;

export { StyledHome, StyledTitle, StyledModal, 
  ImgCodigoQR, StyledModalPago, Styledtarifa, StyledTableWrapper, 
  StyledTableContent, StyledOverlay, SpinnerWrapper, LabelNombre, 
  LabelNombreTianguis, StyledModalTarjetaQR, ImgCodigoQRTarjeta,
  ModalTarjeta, DivTxtTarjeta
 };