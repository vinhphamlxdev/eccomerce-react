import React from "react";
import styled from "styled-components";
import { useController } from "react-hook-form";
const Input = ({
  name = "",
  type = "text",
  control,
  placeholder = "",
  ...props
}) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });

  return (
    <InputStyles>
      <input
        className="px-3 py-1"
        placeholder={placeholder}
        id={name}
        type={type}
        {...field}
      />
    </InputStyles>
  );
};

export default Input;

const InputStyles = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  input {
    width: 100%;
    outline: none;
    background-color: transparent;
    border: 1px solid #e4e4e4;
    border-radius: 2px;
    transition: all 0.2s linear;
    color: #aaaaaa;
    font-size: 14px;
  }
  input:focus {
    border: 1px solid #000;
  }
  input::-webkit-input-placeholder {
    color: #b2b3bd;
  }
  input::-moz-input-placeholder {
    color: #b2b3bd;
  }
  .input-icon {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
`;
