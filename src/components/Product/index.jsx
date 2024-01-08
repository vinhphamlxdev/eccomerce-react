import React from "react";
import styled from "styled-components";
import productlogo from "../../assets/productlogo.jpg";
import discount from "../../assets/discount.png";
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
            <div className="product-item flex flex-col relative items-center">
              <div className="product-item__discount">
                <span className="text-[#FFFF00] text-sm">-30%</span>
              </div>
              <div className="flex flex-col">
                <div className="product-item__image">
                  <img
                    src="https://thegioidien.com/hmhB/A24225274574112.jpg"
                    alt=""
                  />
                </div>
                <div className="mt-3 text-[#000] font-semibold transition-all hover:opacity-75 flex justify-center items-center">
                  A242/25
                </div>
                <div className="p-2 flex transition-all hover:opacity-75  items-center text-sm font-normal">
                  Khớp nối trơn Ø25 mm
                </div>
                <div className="mt-auto flex justify-center gap-x-1">
                  <span className="text-[#936B62] text-base">2.300</span>
                  <span className="text-xs text-[#585858]">đ</span>
                </div>
              </div>
              <div className="product-item__price w-full gap-x-1 p-2 flex justify-center items-center">
                <span className="text-[#890F00] text-xl font-semibold">
                  1.600
                </span>
                <span className="text-xs text-[#585858]">đ</span>
              </div>
            </div>
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
  .product-item {
    display: flex;
    flex-direction: column;
    background-color: #dbdbdb;
    background-image: linear-gradient(to bottom, #fff, #fff, #e6e6e6);
  }
  .product-item__discount {
    position: absolute;
    top: 0;
    right: 0;
    width: 42px;
    height: 42px;
    line-height: 42px;
    text-align: center;
    z-index: 100;
    color: #ffff00;
    background-image: url(${discount});
    background-repeat: no-repeat;
  }
  .product-item__price {
    border-top: 1px solid #fff;
    background-image: linear-gradient(to top, #d5d5d5, #ebebeb, #ebebeb);
  }
`;
