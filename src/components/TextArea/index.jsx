import React from "react";
import styled from "styled-components";
export default function TextArea() {
  return (
    <StyledTextArea>
      <textarea
        name=""
        rows={3}
        cols={20}
        id="ctl13_txtNoidung"
        placeholder="Nội dung..."
        defaultValue={""}
      />
    </StyledTextArea>
  );
}
const StyledTextArea = styled.div`
  width: 768px;
  textarea {
    width: 100%;
    outline: none;
    background-color: transparent;
    border: 1px solid #e4e4e4;
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
