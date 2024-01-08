import React from "react";
import styled from "styled-components";
import { useController } from "react-hook-form";
const Input = ({
  name = "",
  placeholder = "",
  type = "text",
  control,
  error,
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
        className="px-3 py-2"
        id={name}
        type={type}
        placeholder={placeholder}
        {...field}
      />
      <span className="text-xs font-normal text-red-500">{error || ""}</span>
    </InputStyles>
  );
};

export default Input;

const InputStyles = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  input {
    width: 100%;
    outline: none;
    background-color: transparent;
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    transition: all 0.2s linear;
    color: #aaaaaa;
    font-size: 14px;
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
