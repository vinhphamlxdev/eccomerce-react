import React from "react";
import styled from "styled-components";
import zalo from "../../assets/zalo.png";
import messeger from "../../assets/mesenger.png";
import telegram from "../../assets/telegram.png";
import { TbMessageCircle } from "react-icons/tb";
import { Field } from "../../components/Field";
import { Input } from "../../components/Input";
import * as Yup from "yup";
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextArea from "../../components/TextArea";
import Button from "../../components/Button";
import { FaBarsStaggered } from "react-icons/fa6";
import ProductItem from "../../components/ProductItem";
import BreadCrumb from "../../components/BreadCrumb";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import ProductList from "../../components/ProductList";
import { EMAIL_REG_EXP } from "../../common/constants";
import Error from "../../components/Error";
import { useDispatch } from "react-redux";
import handleAddToCart from "../../utils/handleAddToCart";
import Quantity from "../../components/Quantity";
const breadcrumbPaths = [
  { label: "Trang chủ", url: "/" },
  { label: "Sản phẩm", url: "/cart" },
];
const schemaValidate = Yup.object({
  fullName: Yup.string().required("Vui lòng nhập họ tên!"),
  email: Yup.string()
    .matches(EMAIL_REG_EXP, "Email không đúng định dạng!")
    .required("Vui lòng nhập email!"),
  content: Yup.string().required("Vui lòng nhập nội dung!"),
});
export default function ProductDeatail() {
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = React.useState(1);
  const {
    control,
    handleSubmit,
    register,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schemaValidate),
  });
  const handlePostComment = async (data) => {
    console.log(errors);
    console.log(data);
  };
  const handleChangeQuantity = (e) => {
    const value = +e.target.value;
    value < 1 ? 1 : setQuantity(value);
  };
  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };
  const handleDecreaseQuantity = () => {
    quantity === 1 ? 1 : setQuantity(quantity - 1);
  };
  const handleAddProductToCart = () => {
    const product = {
      id: 1,
      name: "Công tắc 1 chiều 16A 250VAC",
      price: 9500,
      quantity: quantity,
      image: "https://thegioidien.com/PrdGallery/WNG5001701-W1600334684.jpg",
    };
    handleAddToCart(product, quantity, dispatch);
    navigate("/cart");
  };
  return (
    <StyledProductDeatail className="product-detail">
      <BreadCrumb paths={breadcrumbPaths} />
      <div className="product-detail__container flex flex-col mb-4">
        <div className="heading items-center flex justify-between">
          <div className="flex items-center gap-x-2 py-[6px]">
            <i className="bi text-secondary text-lg bi-lightning-fill"></i>
            <span className="text-sm text-white font-medium">
              WNV5001-7W - Công tắc 1 chiều 16A 250VAC
            </span>
          </div>
          <button className="text-[#002F3F] text-xs px-2 rounded-sm transition-all hover:opacity-80 bg-[#DBDBDB] flex gap-x-1 items-center py-1">
            <i className="bi-question-circle text-secondary text-xs"></i>
            <span>Hướng dẫn mua hàng</span>
          </button>
        </div>
        <div className="py-4 bg-[#EFEFEF] px-3">
          <div className="grid product-viewtop grid-cols-12">
            <div className="col-span-5 chat-list__logo ">
              <div className="flex gap-x-3 flex-wrap items-center">
                <span className="text-sm">Chát:</span>
                <img src={zalo} alt="" />
                <img src={messeger} alt="" />
                <img src={telegram} alt="" />
              </div>
            </div>
            <div className="col-span-7 product-change__quantity">
              <div className="flex flex-col gap-y-3 rowgap">
                <div className="flex items-center gap-x-4 flex-wrap">
                  <div className="flex gap-x-1 items-center">
                    <span className="text-base text-[#430B01]">Giá bán:</span>
                    <span className="text-lg text-blue-600">9.500</span>
                    <span className="text-[#430B01] text-xs">vnđ/Cái.</span>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <div className="flex gap-x-1 items-center">
                      <span className="text-sm text-[#3B3B3B]">
                        Giá thị trường:
                      </span>
                      <span className=" text-[#936B62] text-sm line-through">
                        13.500
                      </span>
                      <span className="text-[#3B3B3B] text-xs">vnđ/Cái.</span>
                    </div>
                    <div className="flex gap-x-1 items-center">
                      <span className="text-sm text-[#3B3B3B]">Tiết kiệm:</span>
                      <span className=" text-blue-500 text-sm">30%</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-x-3 cart-buy">
                  <div className="flex gap-x-2 items-center">
                    <span className="text-[#430B01] text-sm">Số lượng</span>
                    <Quantity
                      handleDecrease={handleDecreaseQuantity}
                      handleIncrease={handleIncreaseQuantity}
                      setQuantity={handleChangeQuantity}
                      quantity={quantity}
                    />
                    <span className="text-[#430B01] text-sm">Cái</span>
                  </div>
                  <button
                    onClick={handleAddProductToCart}
                    className="bg-bgbtn hover:opacity-75 transition-all text-white py-2 rounded-sm flex items-center px-3 gap-x-2"
                  >
                    <i className="bi text-base text-secondary bi-cart"></i>
                    <span className="text-sm">Mua hàng</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-2 py-2">
          <div className="grid grid-cols-12 product-detail__layout">
            <div className="col-span-5 detail-image__main">
              <div className="flex flex-col product-detail-image__session h-[484px]">
                <div className="product-detail__image relative flex justify-center">
                  <img
                    src="https://thegioidien.com/PrdGallery/WNG5001701-W1600334684.jpg"
                    alt=""
                  />
                  <div className="absolute prev-slide top-2/4 -translate-y-2/4 left-2  py-3 px-2 cursor-pointer">
                    <i className="bi text-xl text-[#D27B6B] cursor-pointer bi-chevron-left"></i>
                  </div>
                  <div className="absolute prev-slide top-2/4 -translate-y-2/4 right-2  py-3 px-2 cursor-pointer">
                    <i className="bi text-xl text-[#D27B6B] cursor-pointer bi-chevron-right"></i>
                  </div>
                </div>
                <div className="flex justify-center bg-[#F6F6F6] rounded-md py-2 gap-x-3 items-center">
                  <div className="product-detail__preview">
                    <img
                      src="https://thegioidien.com/ThumbG/WNG5001701-W1600334684.jpg"
                      alt=""
                    />
                  </div>
                  <div className="product-detail__preview">
                    <img
                      src="https://thegioidien.com/ThumbG/WNG5001701-W2336628734.jpg"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-7 product-information">
              <div className="h-[484px] product-detail__information overflow-y-scroll">
                <div className="flex flex-col gap-y-3">
                  <span className="text-[#003b4f] font-semibold text-base">
                    Công tắc 1 chiều 16A 250VAC
                  </span>
                  <div className="flex items-center gap-x-2">
                    <img
                      src="https://thegioidien.com/fckupload/image/tc_sd.png"
                      alt=""
                    />
                    <span className="text-sm ">Mã sản phẩm:</span>
                    <span className="text-[#ff6600] font-semibold text-lg">
                      WNV5001-7W
                    </span>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <img
                      src="https://thegioidien.com/fckupload/image/tc_sd.png"
                      alt=""
                    />
                    <span className="text-sm ">Thương hiệu:</span>
                    <span className="text-[#000] mb-1 font-semibold text-lg">
                      Panasonic
                    </span>
                  </div>
                </div>
                {/*  */}
                <table style={{ borderCollapse: "collapse", width: "100%" }}>
                  <tbody>
                    <tr>
                      <th colSpan={2} style={{}}>
                        <img
                          alt=""
                          height={16}
                          className="inline-block"
                          src="https://thegioidien.com/fckupload/tc_kt.png"
                          style={{ verticalAlign: "middle" }}
                          width={16}
                        />
                        <span
                          style={{ paddingLeft: 5, verticalAlign: "middle" }}
                        >
                          Thông số kỹ thuật
                        </span>
                      </th>
                    </tr>
                    <tr>
                      <td
                        style={{
                          width: "40%",
                        }}
                      >
                        Chất liệu
                      </td>
                      <td
                        style={{
                          width: "60%",
                          fontWeight: "600",
                        }}
                      >
                        Nhựa Urea Resin, Đồng
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          width: "40%",
                        }}
                      >
                        Màu sắc
                      </td>
                      <td
                        style={{
                          width: "60%",
                          fontWeight: "600",
                        }}
                      >
                        Trắng
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          width: "40%",
                        }}
                      >
                        Thiết bị tương thích
                      </td>
                      <td
                        style={{
                          width: "60%",
                          fontWeight: "600",
                        }}
                      >
                        Dòng Full Color
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          width: "40%",
                        }}
                      >
                        Loại
                      </td>
                      <td
                        style={{
                          width: "60%",
                          fontWeight: "600",
                        }}
                      >
                        Thiết bị rời, module
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          width: "40%",
                        }}
                      >
                        Chức năng
                      </td>
                      <td
                        style={{
                          width: "60%",
                          fontWeight: "600",
                        }}
                      >
                        Công tắc 1 chiều
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          width: "40%",
                        }}
                      >
                        Dòng định mức
                      </td>
                      <td
                        style={{
                          width: "60%",
                          fontWeight: "600",
                        }}
                      >
                        16A 250VAC 50/60 Hz
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          width: "40%",
                        }}
                      >
                        Tiêu chuẩn
                      </td>
                      <td
                        style={{
                          width: "60%",
                          fontWeight: "600",
                        }}
                      >
                        IEC 60669, IEC 60884
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          width: "40%",
                        }}
                      >
                        Quy cách đóng gói
                      </td>
                      <td
                        style={{
                          width: "60%",
                          fontWeight: "600",
                        }}
                      >
                        10 cái/hộp
                      </td>
                    </tr>
                  </tbody>
                </table>
                {/*  */}
                <div className="mt-5">
                  <div className="flex items-center gap-x-2">
                    <img
                      src="https://thegioidien.com/fckupload/image/tc_sd.png"
                      alt=""
                    />
                    <span className="text-sm ">Xuất xứ:</span>
                    <span className="text-[#ff6600] mb-1 font-semibold text-lg">
                      Việt Nam
                    </span>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <img
                      src="https://thegioidien.com/fckupload/image/tc_sd.png"
                      alt=""
                    />
                    <span className="text-sm ">Chất lượng:</span>
                    <span className=" mb-1 text-sm">
                      Mới 100%, chưa sử dụng
                    </span>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <img
                      src="https://thegioidien.com/fckupload/image/tc_sd.png"
                      alt=""
                    />
                    <span className="text-sm ">Chất lượng:</span>
                    <span className=" mb-1 text-sm">Hóa đơn VAT</span>
                  </div>
                  <div className="flex gap-x-3 items-center">
                    <i className="bi text-blue-500  bi-arrow-down"></i>
                    <span className="text-base font-semibold">
                      Giảm thêm chiết khấu cao khi mua số lượng lớn
                    </span>
                  </div>
                  <div className="flex gap-y-3 mt-4 flex-col">
                    <div className="flex gap-x-2">
                      <img
                        src="https://thegioidien.com/fckupload/image/tc_sd.png"
                        alt=""
                      />
                      <span className="text-sm ">Giới thiệu sản phẩm:</span>
                    </div>
                    <span className=" mb-1 text-sm">
                      Với bề dày kinh nghiệm trong lĩnh vực sản xuất thiết bị
                      điện từ Nhật Bản, Công tắc ổ cắm Panasonic không chỉ an
                      toàn mà còn được thiết kế sang trọng, đằng cấp, trang nhã
                      hòa hợp mọi không gian. Dòng Full Color là tiêu chuẩn của
                      chất lượng, vẻ đẹp cho mọi thiết kế.{" "}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*comment  */}
        <div className="comment-session mt-4 pt-2 px-2 pb-6 bg-[#F9F9F9] flex flex-col gap-y-3">
          <div>
            <button className="comment-amount text-white flex items-center gap-x-2">
              <TbMessageCircle className="text-secondary text-lg" />
              <span>Đánh Giá Sản Phẩm (0)</span>
            </button>
          </div>
          <form
            onSubmit={handleSubmit(handlePostComment)}
            className="flex flex-col gap-y-3"
          >
            <div className="flex gap-x-3 field-container items-baseline">
              <div className="flex items-center form-field form-field__input gap-x-2">
                <div className="w-[320px]">
                  <Input
                    placeholder="Họ tên..."
                    name="fullName"
                    control={control}
                  />
                </div>
                <div
                  className={`${errors?.fullName?.message ? "w-[166px]" : ""}`}
                >
                  <span className="text-sm font-normal text-red-600">
                    * {errors?.fullName?.message}
                  </span>
                </div>
              </div>
              <div className="flex items-center form-field form-field__input  gap-x-2">
                <div className="w-[320px]">
                  <Input
                    placeholder="Email..."
                    name="email"
                    control={control}
                  />
                </div>
                <Error error={errors?.email?.message} />
              </div>
            </div>
            <div className="form-field field-textarea flex items-center gap-x-2">
              <TextArea
                control={control}
                placeholder="Nội dung..."
                name="content"
              />
              <Error error={errors?.content?.message} />
            </div>
            <div className="btn-send__comment">
              <Button
                isDisabled={isSubmitting}
                type="submit"
                title="Gửi đánh giá"
                className="bg-[#646461]"
              >
                <i className="bi text-secondary text-base bi-send-fill"></i>
              </Button>
            </div>
          </form>
        </div>
        {/*  */}
        {/* similar product */}
        <div className="similar-product">
          <div className="similar-product__heading">
            <div className=" gap-x-2 inline-block cursor-pointer hover:opacity-80  items-center">
              <FaBarsStaggered className="text-[#E24B01] inline mr-2 text-base" />
              <span className="text-sm">
                Sản Phẩm Khác Thuộc Series 56, Isolator IP66 - Clipsal/Schneider
              </span>
            </div>
          </div>
          <div className="product-similar-container p-3">
            <ProductList />
          </div>
        </div>
      </div>
    </StyledProductDeatail>
  );
}
const StyledProductDeatail = styled.div`
  .product-detail__container {
    border: 1px solid #b21e02;
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
  /* Ẩn spinner trên input type number */
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }
  .prev-slide {
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
      color: #b21e02;
    }
  }
  td {
    border: 1px dotted #cbcbcb;
    padding: 5px;
  }
  th {
    border: 1px dotted #cbcbcb;
    padding: 8px 0px 8px 5px;
    background-color: #fff;
    color: #000;
    text-align: left;
    width: 100%;
    font-weight: bold;
  }
  .comment-amount {
    padding: 0.5rem 1rem;
    text-decoration: none;
    background-color: #48322a;
    background-image: linear-gradient(to top, #48322a, #604d46);
    color: #fff;
  }
  .similar-product {
    .similar-product__heading {
      padding: 0.5rem;
      background-color: #f2d9d4;
      background-image: linear-gradient(to bottom, #f2d9d4, #fff);
      border-top: 1px solid #b21e02;
    }
  }
  @media screen and (max-width: 1040px) {
    .form-field {
      flex-direction: column;
      align-items: flex-start;
      align-items: baseline;
    }
  }
  @media screen and (max-width: 1200px) {
    .chat-list__logo {
      grid-column: span 4 / span 4;
    }
    .product-change__quantity {
      grid-column: span 8 / span 8;
      & .rowgap {
        row-gap: 30px;
      }
    }
    .detail-image__main,
    .product-information {
      grid-column: span 6 / span 6;
    }
  }
  @media screen and (max-width: 768px) {
    .product-viewtop,
    .product-detail__layout {
      display: flex;
      flex-direction: column;
    }

    .cart-buy {
      justify-content: center;
    }
    .field-container {
      flex-direction: column;
    }
    .form-field,
    .form-field__input > div,
    .form-field__input {
      width: 100%;
    }
  }
`;
