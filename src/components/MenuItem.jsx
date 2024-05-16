
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledMenuItem = styled.div`
  padding: 0px 20px;
  box-sizing: border-box;
  font-family: 'Arial', sans-serif;
  & a {
    box-sizing: border-box;
    font-family: 'Arial', sans-serif;
    width: 100%;
    padding: 10px 20px;
    font-size: 18px;
    font-weight: bolder;
    text-decoration: none;
    color: #353535;
    text-transform: capitalize;
    display: flex;
    align-items: center;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    &:hover {
      color: #800d61;
      transform: translateX(5px);
      height:40px;
      width:200px;
      background:white;
      border-radius:5px;
    }
  }
  & .selected {
    color: #ffffff;
    border-radius: 5px;
    font-family: 'Arial', sans-serif;
    background: linear-gradient(70deg, #c6409a, #b03933);
    box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.25);
    &:hover {
      color: #ffffff;
      transform: scale(1.02);
    }
  }
  & .icon {
    width: 22px;
    height: 22px;
    margin-right: 20px;
  }
`;

const MenuItem = ({ displayName, path, icon }) => (
  <StyledMenuItem>
    <Link to={path}>
      <FontAwesomeIcon icon={icon} className="icon"/>
      {displayName}
    </Link>
  </StyledMenuItem>
);

export default MenuItem;
