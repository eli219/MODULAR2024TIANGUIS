import styled from 'styled-components';

const StyledHome = styled.div`
  display: flex;
  height: 950px;
  padding: 20px;
  box-sizing: border-box;
  flex-direction: column;
  background: white;
`;

const StyledTitle = styled.div`
  /* Ajusta o elimina estos márgenes para asegurarte de que el título esté visible */
  margin-top: 20px;
  margin-left: 0;
  text-align: center; /* Alinea el título al centro */
`;

const StyledTableWrapper = styled.div`
  overflow-x: auto;
  font-family: 'Arial', sans-serif;
  font-size: 18px;
  max-width: 100%;
  margin: 20px auto;
  color: black; /* Asegura que el color del texto sea visible */

  table {
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
    border-collapse: collapse;
    background-color: #fff;
    color: #000;
  }

  th, td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #eee;
  }
`;

export { StyledHome, StyledTitle, StyledTableWrapper };
