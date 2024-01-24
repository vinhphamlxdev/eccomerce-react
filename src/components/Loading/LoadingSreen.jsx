import ReactDOM from "react-dom";
import * as React from "react";
import styled from "styled-components";
export default function LoadingSpinner() {
  if (typeof document === "undefined")
    return <div className="modal-loading"></div>;
  return ReactDOM.createPortal(
    <SpinnerStyled className="flex w-full h-full inset-0 fixed z-[500]">
      <div className="absolute inset-0 z-20 bg-black opacity-60 overlay "></div>
      <div className={` inset-0 m-auto  z-[600] spinner`}></div>
    </SpinnerStyled>,
    document.querySelector("body")
  );
}
const SpinnerStyled = styled.div`
  .spinner {
    width: 56px;
    height: 56px;
    display: grid;
    border: 4.5px solid #0000;
    border-radius: 50%;
    border-color: #dbdcef #0000;
    animation: spinner-e04l1k 1s infinite linear;
    &::before,
    &::after {
      content: "";
      grid-area: 1/1;
      margin: 2.2px;
      border: inherit;
      border-radius: 50%;
    }

    &::before {
      border-color: #474bff #0000;
      animation: inherit;
      animation-duration: 0.5s;
      animation-direction: reverse;
    }

    &::after {
      margin: 8.9px;
    }
  }

  @keyframes spinner-e04l1k {
    100% {
      transform: rotate(1turn);
    }
  }
`;
