import React from "react";
import styled from "styled-components";
import productlogo from "../../assets/productlogo.jpg";
import ProductItem from "../ProductItem";
import Button from "../Button";
import ProductList from "../ProductList";
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
        <div className="px-3 pt-3 product-container mb-3">
          <ProductList />
          <div className="viewmore-button mt-3 hidden justify-end items-center p-3">
            <Button title="Xem thêm" className="viewmore-btn ">
              <i className="bi text-secondary text-base bi-chevron-double-right"></i>
            </Button>
          </div>
        </div>
      </div>
    </StyledProduct>
  );
}
const StyledProduct = styled.div`
  .product-logo__list {
    grid-gap: 0.5rem !important;
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
  @media screen and (max-width: 1200px) {
    .viewmore-button {
      display: flex;
    }
    .viewmore-btn {
      text-decoration: none;
      background-color: #b21e02;
      background-image: linear-gradient(
        to bottom,
        #b21e02,
        #b21e02,
        #b93016,
        #b21e02,
        #b21e02
      );
      border-radius: 3px;
      color: #ededed;
      display: flex;
      align-items: center;
      padding: 0.5rem 0.7rem;
    }
  }
  @media screen and (max-width: 990px) {
    .product-logo__list {
      grid-template-columns: repeat(8, minmax(0, 1fr));
    }
  }
  @media screen and (max-width: 768px) {
    .product-logo__list {
      grid-template-columns: repeat(6, minmax(0, 1fr));
    }
  }
  @media screen and (max-width: 610px) {
    .product-logo__list {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }
`;
