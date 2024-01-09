import React from "react";
import styled from "styled-components";
import productlogo from "../../assets/productlogo.jpg";
import ProductItem from "../ProductItem";
export default function Product() {
  return (
    <StyledProduct className="product-session pt-session pb-session">
      <div className="bg-primary   w-full">
        <button className="px-3 inline-block py-2 text-lg transition-all hover:text-secondary cursor-pointer text-white font-semibold capitalize">
          Công Tắc Ổ Cắm và Phụ Kiện
        </button>
      </div>
      <div className="border border-primary">
        <div className="p-3 grid grid-cols-12 gap-x-3 product-logo__list">
          <div className="product-logo__item overflow-hidden hover:border hover:border-primary cursor-pointer border border-transparent">
            <img className="rounded-sm" src={productlogo} alt="" />
          </div>
          <div className="product-logo__item overflow-hidden hover:border hover:border-primary cursor-pointer border border-transparent">
            <img className="rounded-sm" src={productlogo} alt="" />
          </div>
          <div className="product-logo__item overflow-hidden hover:border hover:border-primary cursor-pointer border border-transparent">
            <img className="rounded-sm" src={productlogo} alt="" />
          </div>
          <div className="product-logo__item overflow-hidden hover:border hover:border-primary cursor-pointer border border-transparent">
            <img className="rounded-sm" src={productlogo} alt="" />
          </div>
        </div>
        <div className="p-3 product-container">
          <div className="grid grid-cols-6 gap-x-3">
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
          </div>
        </div>
      </div>
    </StyledProduct>
  );
}
const StyledProduct = styled.div`
  .product-logo__list {
    background-color: #dbdbdb;
    background-image: linear-gradient(
      to bottom,
      #d4bbb6,
      #dbdbdb,
      #dbdbdb,
      #dbdbdb,
      #dbdbdb
    );
  }
`;
