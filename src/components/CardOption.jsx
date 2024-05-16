import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StyledCardOption = styled.div`
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 10px;
  cursor: pointer;
  margin: 50px;
  margin-left:260px;
  margin-right:0px;
  box-shadow: 0px 0px 13px 0px rgba(0, 0, 0, 0.1);
  padding: 10px;
  box-sizing: border-box;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.1s;
  & .icon {
    background-color: ${(props) => props.color}99;
    color: ${(props) => props.color};
    display: block;
    padding: 30px;
    border-radius: 50%;
    height: 20px;
    width: 20px;
    transition: inherit;
  }
  & .title {
    margin: 20px 0px;
    font-size: 18px;
    font-weight: bold;
    transition: inherit;
    color: #3a3a3a;
  }
  & .description {
    color: #777777;
    font-size: 12px;
  }
  &:hover {
    transform: scale(1.02);
    color: white;
    background: radial-gradient(circle, rgba(128, 13, 97, 1) 0%, rgba(80, 8, 61, 1) 100%);
    & .icon {
      transform: rotate(-5deg) scale(1.02);
    }
    & .title {
      color: inherit;
    }
    & .description {
      color: inherit;
    }
  }
`;
const StyledSpace = styled.div`
  width:-0px;
  
`;
const CardOption = ({ displayName, icon, description, color, redirectTo }) => {

  return (
    <StyledSpace> 
      <StyledCardOption color={color}>
        <FontAwesomeIcon icon={icon} className="icon" />
        <span className="title">{displayName}</span>
        <span className="description">{description}</span>
      </StyledCardOption>
    </StyledSpace>
  );
};
export default CardOption;
