import React from 'react';
import styled from 'styled-components';

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 0px;
  font-family: 'Arial', sans-serif;
  & label {
    font-size: 18px;
    font-weight: 600;
    font-family: 'Arial', sans-serif;
    color: ${(props) => (props.error ? '#ee4a4a' : '#383838')};
    margin-bottom: 5px;
  }
  & input {
    font-size: 16px;
    border: 1.5px solid ${(props) => (props.error ? '#ee4a4a' : '#e9e9e9')};
    outline: none;
    padding: 8px;
    border-radius: 5px;
    width:400px;
    transition: all 0.3s;
    color: ${(props) => (props.error ? '#ee4a4a' : '#383838')};
    &:focus {
      border: 1.5px solid ${(props) => (props.error ? '#ee4a4a' : '#2b8bc2')};
    }
  }

  & span {
    color: #ee4a4a;
    font-size: 12px;
    visibility: ${(props) => (props.error ? '' : 'hidden')};
  }
`;

const Input = ({
  id,
  name,
  label,
  type,
  onChange,
  required,
  error,
  refer,
  errorMessage,
  defaultValue,
  disabled,
  maxLength,
  minLength,
  pattern,
  autoFocus,
  placeholder,
}) => (
  <FormGroup error={error} className="FormGroup">
    {label ? <label htmlFor={id}>{label}:</label> : null}
    <input
      ref={refer}
      id={id}
      name={name}
      type={type}
      defaultValue={defaultValue}
      onChange={onChange}
      required={required}
      disabled={disabled}
      maxLength={maxLength}
      minLength={minLength}
      pattern={pattern}
      autoFocus={autoFocus}
      placeholder={placeholder}
    />
    <span>{errorMessage}</span>
  </FormGroup>
);

export default Input;
