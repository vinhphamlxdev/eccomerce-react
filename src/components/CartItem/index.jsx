import React from "react";
import styled from "styled-components";
import ActionButton from "./ActionButton";
import { removeFromCart, updateQuantity } from "../../store/cart/cartSlice";
import { useDispatch } from "react-redux";
import { RxUpdate } from "react-icons/rx";
import formatVnd from "../../utils/formatVnd";
export default function CartItem({ product = {} }) {
  const dispatch = useDispatch();
  const { name, price, quantity } = product;
  const [quantityValue, setQuantityValue] = React.useState(quantity);
  const [isEdit, setIsEdit] = React.useState(false);
  const handleChangeQuantity = (event) => {
    const value = +event.target.value;
    value < 1 ? setQuantityValue(1) : setQuantityValue(Math.floor(value));
  };
  const handleUpdateQuantity = () => {
    setIsEdit(false);
    dispatch(updateQuantity({ id: product.id, quantity: quantityValue }));
  };
  const handleDeleteProductFromCart = () => {
    dispatch(removeFromCart(product.id));
  };
  const handleCancelEdit = () => {
    setIsEdit(false);
    setQuantityValue(quantity); // reset quantity value
  };
  return (
    <StyledCartItem
      className={`cart-grid__header cart-item  card-grid ${
        isEdit ? "edit-status" : ""
      }`}
    >
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
          {isEdit ? (
            <input
              onChange={handleChangeQuantity}
              type="number"
              value={quantityValue}
              min={1}
              className="text-center quantity-input  text-base bg-white"
            />
          ) : (
            <span>{quantity}</span>
          )}
        </div>
        <div className="flex justify-center header-unit header-item">
          <span>Cái</span>
        </div>
        <div className="flex justify-center header-saleprice header-item sale-price">
          <span> {formatVnd(price)}</span>
        </div>
        <div className="flex justify-center toltal-price header-item">
          <span>{formatVnd(price * quantityValue)}</span>
        </div>
        <div className="flex justify-center header-item">
          <div className="flex items-center justify-center">
            {!isEdit && (
              <>
                <ActionButton onClick={() => setIsEdit(true)} title="Sửa">
                  <i className="bi text-lg text-secondary bi-pencil-square"></i>
                </ActionButton>

                <ActionButton onClick={handleDeleteProductFromCart} title="Xóa">
                  <i className="bi text-lg text-secondary bi-trash"></i>
                </ActionButton>
              </>
            )}
            {isEdit && (
              <>
                <ActionButton onClick={handleUpdateQuantity} title="Cập nhật">
                  <RxUpdate className="text-lg text-secondary" />
                </ActionButton>
                <ActionButton onClick={handleCancelEdit} title="Huỷ">
                  <i className="bi text-lg text-secondary bi-ban"></i>
                </ActionButton>
              </>
            )}
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
  &.cart-item.edit-status {
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
