import React from "react";
import styled from "styled-components";
import ProductItem from "../ProductItem";
export default function ProductList() {
  return (
    <StyledProductList className="grid grid-cols-6 gap-x-3 gap-y-5 product-list">
      {new Array(12).fill(0).map((item, index) => (
        <ProductItem key={index} />
      ))}
    </StyledProductList>
  );
}
const StyledProductList = styled.div`
  @media screen and (max-width: 1200px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
  @media screen and (max-width: 990px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
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
    grid-template-columns: repeat(2, minmax(0, 1fr));
    .product-logo__list {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }
`;
