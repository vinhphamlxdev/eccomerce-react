import React from "react";
import styled from "styled-components";

const Field = ({ children }) => {
  return (
    <FieldStyles className="grid grid-cols-3 items-center gap-x-2">
      {children}
    </FieldStyles>
  );
};
const FieldStyles = styled.div`
  margin-bottom: 16px;
  column-gap: 8px;
`;
export default Field;
