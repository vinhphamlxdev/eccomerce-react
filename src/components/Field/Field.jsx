import React from "react";
import styled from "styled-components";

const Field = ({ children }) => {
  return <FieldStyles>{children}</FieldStyles>;
};
const FieldStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 10px;
  margin-bottom: 26px;
`;
export default Field;
