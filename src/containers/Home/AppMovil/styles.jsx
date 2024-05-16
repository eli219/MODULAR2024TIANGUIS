import styled from 'styled-components';

const StyledHome = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
  background: white;
  font-family: 'Arial', sans-serif;
`;

const StyledTitle = styled.div`
  margin-top: 20px;
  margin-left: 20px;
  font-size: 20px;
`;

const StyledTableWrapper = styled.div`
  overflow-x: auto;
  font-family: 'Arial', sans-serif;
  font-size: 18px;
  max-width: 100%;
  margin: 20px auto;

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

const StyledModal = styled.div`
  position: fixed;
  width: 90%;
  max-width: 800px;
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
    color: linear-gradient(63.29deg, #ebc0e1 0.45%, #272244 100%);
  }
`;

const Styledtarifa = styled.div`
  margin-left: 20px;
  height: auto;
  .modal {
    background-color: white;
  }
`;

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
  background-color: #f8f8f8;
  
  .qr-code {
    margin-top: 10px;
  }
`;

export { StyledHome, StyledTitle, StyledModal, StyledTableWrapper, Styledtarifa, StyledCard };
