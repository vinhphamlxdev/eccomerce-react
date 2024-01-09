import React from "react";
import styled from "styled-components";

const Field = ({ children }) => {
  return <FieldStyles className="field-input">{children}</FieldStyles>;
};
const FieldStyles = styled.div`
  margin-bottom: 16px;
  column-gap: 8px;
`;
export default Field;
