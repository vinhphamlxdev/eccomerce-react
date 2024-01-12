import React from "react";
import styled from "styled-components";
import ActionButton from "./ActionButton";
export default function CartItem() {
  return (
    <StyledCartItem className="cart-grid__header cart-item edit-status card-grid">
      <div className="header-item text-[#3E0B00]">
        <span>1</span>
      </div>
      <div className="header-item text-[#3E0B00]">
        <img
          className=""
          src="https://thegioidien.com/hmhB/WHD35_GY422725780.jpg"
          alt=""
        />
      </div>
      <div className="header-item product-item-code">
        <span>WHD35_GY</span>
      </div>
      <div className="header-item ">
        <span>Isolator 2P 35A 440V IP66</span>
      </div>
      <div className="header-item header-item-brand ">
        <span>MBA</span>
      </div>
      <div className="header-item__list cart-grid__item">
        <div className="flex p-[2px] header-quantity justify-center cart-item__quantity header-item">
          {/* <span>1</span> */}
          <input
            type="number"
            min={1}
            pattern="[0-9]*"
            defaultValue={1}
            inputMode="numeric"
            className="text-center quantity-input  text-base bg-white"
          />
        </div>
        <div className="flex justify-center header-unit header-item">
          <span>Cái</span>
        </div>
        <div className="flex justify-center header-saleprice header-item sale-price">
          <span> 1.316.700</span>
        </div>
        <div className="flex justify-center toltal-price header-item">
          <span>1.316.700</span>
        </div>
        <div className="flex justify-center header-item">
          <div className="flex items-center justify-center">
            <ActionButton title="Sửa">
              <i className="bi text-lg text-secondary bi-pencil-square"></i>
            </ActionButton>
            <ActionButton title="Xóa">
              <i className="bi text-lg text-secondary bi-trash"></i>
            </ActionButton>
          </div>
        </div>
      </div>
    </StyledCartItem>
  );
}
const StyledCartItem = styled.div`
  & .header-item.toltal-price,
  & .header-item.sale-price {
    justify-content: flex-end;
  }
  &.edit-status {
    background-color: #ffffcc;

    .action-btn {
      background-color: #ff6600;
      i {
        color: #ffff00;
      }
    }
    .quantity-input {
    }
    .cart-item__quantity {
      padding: 4px;
    }
  }
`;
