import React from 'react';
import styled from 'styled-components';

const StyledTitle = styled.h2`
  font-size: 40px;
  margin: ${(props) => (props.border ? '16.5px 0' : '0')};
  color:black;
  font-family: 'Arial', sans-serif;
`;

const TitleLogin = ({ text, border }) =>

  <StyledTitle border={border}>{text}</StyledTitle>;
  
export default TitleLogin;
