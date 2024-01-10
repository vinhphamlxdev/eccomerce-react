import React from "react";

import styled from "styled-components";
export default function HeadingSession({
  title = "",
  className = "",
  icon = "",
  leftContent = "",
  style = {},
  ...props
}) {
  return (
    <HeadingStyled
      style={style}
      {...props}
      className={` ${className} flex justify-between items-center`}
    >
      <div className="flex items-center gap-x-2">
        {icon && <i className={`${icon} text-xl text-secondary`}></i>}
        <span>{title}</span>
      </div>
      {leftContent}
    </HeadingStyled>
  );
}
const HeadingStyled = styled.div`
  background-color: #b21e02;
  background-image: linear-gradient(
    to bottom,
    #b21e02,
    #b21e02,
    #b93016,
    #b21e02,
    #b21e02
  );
  color: #fff;
  font-size: 1.2rem;
  padding: 0.5rem;
`;
