import styled from 'styled-components';

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

export { StyledHome, StyledTitle, Styledtarifa, StyledTableWrapper, StyledModal };
