import React from "react";
import BreadCrumb from "../../components/BreadCrumb";
import styled from "styled-components";
import { FaFileInvoiceDollar } from "react-icons/fa";
import CartItem from "../../components/CartItem";
import Button from "../../components/Button";
import { useSelector } from "react-redux";
const breadcrumbPaths = [
  { label: "Trang chủ", url: "/" },
  { label: "Dự toán đơn hàng", url: "/cart" },
];
export default function Cart() {
  const carts = useSelector((state) => state.cart.cartItems);
  console.log(carts);
  const handleChangeCategory = (e) => {
    const value = e.target.value;
  };
  return (
    <StyledCart className="cart-page">
      <BreadCrumb paths={breadcrumbPaths} />
      <div className="flex flex-col mb-4 cart-container">
        <div className="heading items-center flex justify-between">
          <div className="flex px-3 items-center gap-x-2 py-[6px]">
            <FaFileInvoiceDollar className="text-sm text-secondary" />
            <span className="text-sm text-white font-medium">
              Chi tiết đơn hàng, dự án
            </span>
          </div>
          <button className="text-[#002F3F] text-xs px-2 rounded-sm transition-all hover:opacity-80 bg-[#DBDBDB] flex gap-x-1 items-center py-1">
            <i className="bi  bi-trash text-red-500 text-xs" />
            <span>Xóa đơn hàng</span>
          </button>
        </div>
        <div className="p-3 flex flex-col gap-y-4">
          <span className="text-sm text-[#430B01]">Chọn sản phẩm nhanh</span>
          <div className="select-category">
            <select
              onChange={handleChangeCategory}
              className="w-[690px] category-option px-3 py-1 rounded-md"
              name=""
            >
              <option selected="selected" value="0" text-align="left">
                -- Chọn danh mục sản phẩm
              </option>
              <option value="1">Công Tắc Ổ Cắm và Phụ Kiện</option>
              <option value="9">Phụ Kiện Tủ Điện, Vỏ Tủ Điện</option>
              <option value="13">Dụng cụ cầm tay, Dụng Cụ Tools</option>
              <option value="10">Thiết Bị Chống Sét, Kim Thu Sét</option>
              <option value="6">Điện Dân Dụng và Phụ Kiện</option>
              <option value="2">Thiết Bị Đóng Cắt, Chống Rò Điện</option>
              <option value="3">Đèn Chiếu Sáng - Đèn Trang Trí</option>
              <option value="8">Thiết Bị Điều Khiển, Tự Động Hóa</option>
              <option value="4">ATS, MTS, UPS, Cầu Dao Đảo</option>
              <option value="5">Cáp Điện, Cáp Tín Hiệu - Điều Khiển</option>
              <option value="7">Thiết Bị Điện Trung Thế, Đường Dây</option>
              <option value="12">Biến Áp, Ổn Áp, Tụ bù, Cuộn kháng</option>
            </select>
          </div>
          <div className="select-brand">
            <select
              onChange={handleChangeCategory}
              className="w-[690px] brand-option px-3 py-1 rounded-md"
              name=""
            >
              <option selected="selected" value={0} text-align="left">
                -- Chọn nhãn hiệu
              </option>
              <option value={1}>Clipsal/Schneider</option>
              <option value={2}>Panasonic</option>
              <option value={257}>Nano</option>
              <option value={20}>Mennekes</option>
              <option value={113}>PCE</option>
              <option value={208}>Himel</option>
              <option value={112}>Lioa</option>
              <option value={3}>MPE</option>
            </select>
          </div>
        </div>
        <div className="cart-table">
          <div className="cart-heading">
            <span className="font-semibold">BẢNG DỰ TOÁN ĐƠN HÀNG</span>
          </div>
          <div className="cart-grid__header card-grid">
            <div className="header-item text-[#3E0B00]">
              <span>STT</span>
            </div>
            <div className="header-item text-[#3E0B00]">
              <span>Hình</span>
            </div>
            <div className="header-item product-item-code text-[#3E0B00]">
              <span>Mã sản phẩm</span>
            </div>
            <div className="header-item text-[#3E0B00]">
              <span>Tên sản phẩm</span>
            </div>
            <div className="header-item header-item-brand text-[#3E0B00]">
              <span>Nhãn hiệu</span>
            </div>
            <div className="header-item__list cart-grid__item text-[#3E0B00]">
              <div className="flex justify-center header-quantity header-item product-quantity text-[#3E0B00]">
                <span> Số lượng</span>
              </div>
              <div className="flex justify-center header-quantity header-item product-unit text-[#3E0B00]">
                <span> ĐVT</span>
              </div>
              <div className="flex justify-center header-item header-saleprice text-[#3E0B00]">
                <span> Đơn giá</span>
              </div>
              <div className="flex justify-center header-item toltal-price text-[#3E0B00]">
                <span>Thành tiền</span>
              </div>
              <div className="flex justify-center header-item text-[#3E0B00]">
                <span> Hành động</span>
              </div>
            </div>
          </div>
          {carts?.length > 0 &&
            carts.map((cart, index) => {
              return <CartItem product={cart} key={cart.id} />;
            })}
          <div className="cart-toltal">
            <div className="flex items-center justify-end py-3">
              <span className="mr-4 text-lg font-medium text-[#430B01]">
                Tạm tính:
              </span>
            </div>
            <div className="flex items-center justify-end py-3">
              <span className="mr-4 text-lg font-medium">718.700</span>
            </div>
            <div className=""></div>
          </div>
        </div>
        <div className="p-3 flex justify-between items-center">
          <Button title="Chọn thêm sản phẩm" className="bg-primaryBtn">
            <i className="bi text-secondary text-base bi-chevron-double-left"></i>
          </Button>
          <Button
            to="/checkout"
            title="Tiếp tục đặt hàng"
            className="bg-primaryBtn flex-row-reverse"
          >
            <i className="bi text-secondary text-base bi-chevron-double-right"></i>
          </Button>
        </div>
      </div>
    </StyledCart>
  );
}
const StyledCart = styled.div`
  .cart-container {
    border: 1px solid #b21e02;
  }
  .cart-table {
    border-left: 1px solid #cbcbcb;
    border-right: 1px solid #cbcbcb;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    margin: 0rem 0.5rem 0.5rem 0.5rem;
  }
  .heading {
    background-color: #b21e02;
    background-image: linear-gradient(
      to bottom,
      #b21e02,
      #b21e02,
      #b93016,
      #b21e02,
      #b21e02
    );
    display: flex;
  }
  select {
    border-radius: 4px;
    border: 1px solid #8d99ae;
    color: #000;
  }
  .cart-heading {
    background-color: #cbcbcb;
    background-image: linear-gradient(to bottom, #cbcbcb, #dfdfdf, #cbcbcb);
    font-size: 1.2rem;
    padding: 1rem;
    color: #430b01;
    display: flex;
    justify-content: center;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  .card-grid {
    display: grid;
    grid-template-columns: 50px 60px 1fr minmax(90px, 2fr) 1fr 600px;
    border-bottom: 1px solid #cbcbcb;
  }
  .cart-grid__item {
    display: grid;
    grid-template-columns: 80px 80px 120px 120px 200px;
  }
  .cart-grid__header {
    background-color: #eeeeee;
    color: #3e0b00;
    .header-item {
      display: flex;
      align-items: center;
      border-right: 1px solid #cbcbcb;
      overflow: hidden;
      color: #3e0b00;
      font-size: 16px;
      justify-content: center;
      span {
        margin: 5px;
      }
    }
    .header-item__list {
    }
  }
  .cart-toltal {
    display: grid;
    grid-template-columns: minmax(60px, 1fr) 136px 200px;
    border-bottom: 1px solid #cbcbcb;
  }
  @media screen and (max-width: 1400px) {
    .cart-grid__header {
      grid-template-columns: 40px 50px 2fr minmax(60px, 5fr) 600px;
    }
    .header-item.header-item-brand {
      display: none;
    }
  }
  @media screen and (max-width: 990px) {
    .cart-grid__header {
      grid-template-columns: 40px 50px minmax(50px, 1fr) 600px;
    }
    .header-item.product-item-code {
      display: none;
    }
  }
  @media screen and (max-width: 768px) {
    .cart-grid__item {
      display: block;
    }
    .cart-grid__header {
      grid-template-columns: 40px 50px minmax(60px, 1fr) 200px;
    }
    .brand-option,
    .category-option {
      width: 100%;
    }
    .header-item.header-saleprice,
    .header-item.toltal-price,
    .header-item.header-unit,
    .header-item.header-quantity {
      display: none;
    }
  }
`;
