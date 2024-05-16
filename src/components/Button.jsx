import React from 'react';
import styled, { css } from 'styled-components';

const ButtonContainer = styled.button`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  outline: none;
  border: 0;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-right: ${(props) => (props.margin ? css`5px` : css`0px`)};
  margin-left: ${(props) => (props.margin ? css`5px` : css`0px`)};
  background: ${(props) => props.background};
  opacity: ${(props) => (props.disabled ? css`0.7` : css`1`)};
  color: ${(props) => props.color};
  cursor: ${(props) => (props.disabled ? css`` : css`pointer`)};
  font-size: 16px;
  font-weight: 600;
  transition: all 0.2s;
  font-family: 'Arial', sans-serif;
  ${(props) =>
    props.disabled
      ? css``
      : css`
          &:hover {
            background: ${(propss) => propss.hoverColor};
          }
        `};
`;

const Button = ({
  children,
  type = 'button',
  onClick,
  width = 'auto',
  height = 'auto',
  background,
  margin,
  disabled,
}) => {
  const typeButton = () => {
    switch (background) {
      case 'light':
        return (
          <ButtonContainer
            type={type}
            onClick={onClick}
            width={width}
            height={height}
            color="#757575"
            background="#ebebeb"
            hoverColor="#e0e0e0"
            margin={margin}
            disabled={disabled}
          >
            {children}
          </ButtonContainer>
        );
      case 'delete':
        return (
          <ButtonContainer
            type={type}
            onClick={onClick}
            width={width}
            height={height}
            color="#ca1111"
            background="transparent"
            hoverColor="transparent"
            margin={margin}
            disabled={disabled}
          >
            {children}
          </ButtonContainer>
        );

      default:
        return (
          <ButtonContainer
            type={type}
            onClick={onClick}
            width={width}
            height={height}
            color="#ffffff"
            background="radial-gradient(circle, rgba(128, 13, 97, 1) 0%, rgba(80, 8, 61, 1) 100%);"
            hoverColor="radial-gradient(circle, rgba(128, 13, 97, 1) 50%, rgba(80, 8, 61, 1) 100%)"
            margin={margin}
            disabled={disabled}
          >
            {children}
          </ButtonContainer>
        );
    }
  };
  return typeButton();
};
export default Button;
