import React from "react";
import styled from "styled-components";

const Field = ({ children, className = "", style = {}, ...props }) => {
  return (
    <FieldStyles
      {...props}
      style={style}
      className={`field-control  grid-cols-3 items-center gap-x-2 ${className}`}
    >
      {children}
    </FieldStyles>
  );
};
const FieldStyles = styled.div`
  margin-bottom: 16px;
  column-gap: 8px;
`;
export default Field;
