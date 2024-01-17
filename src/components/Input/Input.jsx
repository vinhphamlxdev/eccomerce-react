import React from "react";
import styled from "styled-components";
import { useController } from "react-hook-form";
const Input = ({
  name = "",
  type = "text",
  control,
  placeholder = "",
  style = {},
  value = "",
  onChange,
  className = "",
  onBlur,
  ...props
}) => {
  const { field } = useController({
    control: control,
    name: name,
    onChange,
  });
  return (
    <InputStyles className={`field-input ${className}`}>
      <input
        style={style}
        className="px-3 py-2"
        placeholder={placeholder}
        type={type}
        {...field}
        value={field.value || ""}
        onBlur={onBlur}
      />
    </InputStyles>
  );
};

export default Input;

const InputStyles = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  input {
    width: 100%;
    outline: none;
    background-color: transparent;
    border: 1px solid #888181;
    border-radius: 2px;
    transition: all 0.2s linear;
    color: #aaaaaa;
    font-size: 14px;
  }
  input:focus {
    border: 1px solid #fb8500;
  }
  input::-webkit-input-placeholder {
    color: #b2b3bd;
  }
  input::-moz-input-placeholder {
    color: #b2b3bd;
  }
  input[type="text"],
  input[type="password"],
  input[type="email"] {
    padding: 0.5rem;
    font-size: 16px;
  }
  .input-icon {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
`;
