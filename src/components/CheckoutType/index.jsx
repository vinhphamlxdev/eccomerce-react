import React from "react";
import styled from "styled-components";
export default function CheckoutType({
  checked,
  handleChecked,
  type = 1,
  label = "",
}) {
  return (
    <CheckoutTypeStyled className="radio-check cursor-pointer select-none gap-x-3 flex px-2 items-center">
      <input
        onChange={() => handleChecked(type)}
        type="radio"
        id={`checked-type-${type}`}
        checked={checked}
      />
      <label
        className="cursor-pointer checkout-label"
        htmlFor={`checked-type-${type}`}
      >
        {label}
      </label>
      <i className="bi bi-chevron-right absolute top-2/4 right-2 pointer-events-none -translate-y-2/4"></i>
    </CheckoutTypeStyled>
  );
}
const CheckoutTypeStyled = styled.div`
  background-color: #d1d1d1;
  position: relative;
  font-size: 1.1rem;
  i {
    line-height: 0;
    transition: all 0.3s ease-in-out;
  }
  &:hover i {
    transform: rotate(90deg);
    top: 36%;
  }
  .checkout-label {
    width: 100%;
    padding: 0.7rem 0rem;
    width: 100%;
    color: #6a1300;
  }
`;
