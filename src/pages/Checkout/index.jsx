import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import BreadCrumb from "../../components/BreadCrumb";
import Button from "../../components/Button";
import CheckoutType from "../../components/CheckoutType";
import HeadingSection from "../../components/HeadingSession";
import OrderItem from "../../components/OrderItem";
import BuyNow from "./BuyNow";
import Login from "./Login";
import Register from "./Register";
const breadcrumbPaths = [
  { label: "Trang chủ", url: "/" },
  { label: "Điền Thông Tin", url: "/checkout" },
];

export default function Checkout() {
  const carts = useSelector((state) => state.cart.cartItems);
  console.log("carts", carts);
  const [showType, setShowType] = React.useState({
    isLogin: true,
    isBuyNow: false,
    isRegister: false,
  });

  const handleChangeType = (type) => {
    if (type === 1) {
      setShowType((prev) => ({
        ...prev,
        isLogin: true,
        isBuyNow: false,
        isRegister: false,
      }));
    }
    if (type === 2) {
      setShowType((prev) => ({
        ...prev,
        isLogin: false,
        isBuyNow: true,
        isRegister: false,
      }));
    }
    if (type === 3) {
      setShowType((prev) => ({
        ...prev,
        isLogin: false,
        isBuyNow: false,
        isRegister: true,
      }));
    }
  };

  return (
    <CheckoutStyled className="checkout-page">
      <BreadCrumb paths={breadcrumbPaths} />
      <div className="checkout-container border-session">
        <HeadingSection
          title="Vui lòng điền thông tin để tiếp tục mua hàng"
          icon="bi-card-heading"
        />
        <div className="p-3 grid grid-cols-2 gap-x-4 checkout-layout">
          <div className="checkout-form gap-y-4 flex flex-col">
            <div className="form-container">
              <CheckoutType
                type={1}
                checked={showType.isLogin}
                handleChecked={handleChangeType}
                label="  Đã là thành viên - Đăng nhập"
              />
              {showType.isLogin && <Login />}
            </div>
            <div className="form-container">
              <CheckoutType
                type={2}
                checked={showType.isBuyNow}
                handleChecked={handleChangeType}
                label="Mua hàng ngay - Không cần đăng ký"
              />
              {showType.isBuyNow && <BuyNow />}
            </div>
            <div className="form-conainer">
              <CheckoutType
                checked={showType.isRegister}
                type={3}
                handleChecked={handleChangeType}
                label="Chưa là thành viên - Đăng ký"
              />
              {showType.isRegister && <Register />}
            </div>
          </div>
          <div className="checkout-invoice flex flex-col gap-y-4">
            <div className="invoice-container">
              <div className="invoice-heading">ĐƠN HÀNG</div>
              <div className="invoice-grid invoice-firstgrid">
                <div className="invoice-item__header">
                  <span>STT</span>
                </div>
                <div className="invoice-item__header">
                  <span>Hình</span>
                </div>
                <div className="invoice-item__header">
                  <span>Tên sản phẩm</span>
                </div>
                <div className="invoice-item__header">
                  <span>Thành tiền</span>
                </div>
              </div>
              {carts?.length > 0 &&
                carts?.map((cart, index) => {
                  return (
                    <OrderItem product={cart} key={cart.id} index={index} />
                  );
                })}
              <div className="invoice-grid">
                <div className="invoice-item__header invoice-flexend">
                  <span>Tạm tính:</span>
                </div>
                <div className="invoice-item__header invoice-flexend">
                  <span>891.400</span>
                </div>
              </div>
            </div>
            {/*  */}
            <div className="flex justify-between items-center">
              <Button
                title="Chọn thêm sản phẩm"
                type="submit"
                className="bg-primaryBtn"
              >
                <i className="bi text-base text-secondary bi-chevron-double-left"></i>
              </Button>
              <Button
                title="Xóa đơn hàng"
                type="submit"
                className="bg-primaryBtn"
              >
                <i className="bi text-base text-secondary bi-trash"></i>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </CheckoutStyled>
  );
}
const CheckoutStyled = styled.div`
  .checkout-form__control {
    border: 1px solid #d1d1d1;
    padding: 1rem;
  }
  .invoice-container {
    border-left: 1px solid #fedbd7;
    border-right: 1px solid #fedbd7;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  .invoice-heading {
    padding: 0.7rem;
    font-size: 1.1rem;
    background-color: #fedbd7;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #002f3f;
  }
  .invoice-grid {
    color: #002f3f;
    display: grid;
    background-color: #fff;
    grid-template-columns: 40px 60px minmax(60px, 1fr) 190px;
    border-bottom: 1px solid #fedbd7;
    &.invoice-firstgrid {
      background-color: #fff1f0;
    }
    &:last-child {
      grid-template-columns: minmax(60px, 1fr) 190px;
      border-bottom: 1px solid #fedbd7;
    }
  }

  .invoice-item__header {
    display: flex;
    align-items: center;
    border-right: 1px solid #fedbd7;
    overflow: hidden;
    padding: 5px;
    justify-content: center;
    &.caculate-total {
      justify-content: space-between;
    }
    &.invoice-flexend {
      justify-content: flex-end;
    }
  }
  .field-input,
  .field-select {
    width: 100%;
  }

  @media screen and (max-width: 768px) {
    .checkout-layout {
      display: flex;
      flex-direction: column;
    }
  }
`;
