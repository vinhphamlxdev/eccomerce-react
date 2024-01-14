import React from "react";
import { useController } from "react-hook-form";
import styled from "styled-components";
export default function TextArea({ name = "", control, placeholder = "" }) {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });

  return (
    <StyledTextArea>
      <textarea
        placeholder={placeholder}
        name=""
        rows={3}
        cols={20}
        id={name}
        {...field}
      />
    </StyledTextArea>
  );
}
const StyledTextArea = styled.div`
  width: 826px;
  textarea {
    width: 100%;
    outline: none;
    background-color: transparent;
    border: 1px solid #888181;
    border-radius: 2px;
    transition: all 0.2s linear;
    color: #aaaaaa;
    font-size: 14px;
    padding: 8px;
  }
  textarea:focus {
    border: 1px solid #000;
  }
  textarea::-webkit-textarea-placeholder {
    color: #b2b3bd;
  }
  textarea::-moz-textarea-placeholder {
    color: #b2b3bd;
  }
`;
