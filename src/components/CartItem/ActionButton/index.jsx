import React from "react";
import styled from "styled-components";
export default function ActionButton({
  onClick,
  children,
  title = "",
  className = "",
  style = {},
  ...props
}) {
  return (
    <StyledActionButton
      style={style}
      {...props}
      onClick={onClick}
      className={`action-btn ${className}`}
    >
      {children}
      <span className="text-white font-medium">{title}</span>
    </StyledActionButton>
  );
}

const StyledActionButton = styled.button`
  margin: 5px;
  column-gap: 2px;
  display: flex;
  align-items: center;
  padding: 3px 5px;
  margin: 0.3rem;
  background-color: #1d5161;
  border-radius: 3px;
  color: #fff;
  text-decoration: none;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #30606d;
  }
`;
