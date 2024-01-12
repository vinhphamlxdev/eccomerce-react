import React, { useState } from "react";
import { IoIosShareAlt } from "react-icons/io";
import logo from "../../../../assets/logo.jpg";
import { TbLock } from "react-icons/tb";
import { FaBars } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import styled from "styled-components";
import { categoryData } from "../../../Data";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import Button from "../../../Button";
import * as Yup from "yup";
import { EMAIL_REG_EXP, REGEX_PASSWORD } from "../../../../common/constants";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Error from "../../../Error";
import { Input } from "../../../Input";
import { Field } from "../../../Field";

const schemaValidate = Yup.object({
  email: Yup.string()
    .matches(EMAIL_REG_EXP, "Email không đúng định dạng!")
    .required("Vui lòng nhập email!"),
  password: Yup.string()
    .required("Vui lòng nhập mật khẩu!")
    .matches(
      REGEX_PASSWORD,
      "Mật khẩu phải có ít nhất 8 ký tự, ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt!"
    ),
});
export default function Header() {
  const [showCategory, setShowCategory] = React.useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const {
    control,
    handleSubmit,
    register,
    setValue: setFormValue,
    clearErrors,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schemaValidate),
  });
  const handleSignin = async (data) => {
    console.log(data);
  };
  const handleMenuClick = (index) => {
    activeMenu === index ? setActiveMenu(null) : setActiveMenu(index);
  };
  const handleSubMenuClick = (index) => {
    activeSubMenu === index ? setActiveSubMenu(null) : setActiveSubMenu(index);
  };
  return (
    <StyledHeader className="header w-full flex flex-col">
      <div className="flex bg-[#6A1300] items-center justify-between">
        <div className="flex items-center">
          <div className="px-2 gap-x-2 py-1 flex items-center">
            <button className="flex text-white items-center rounded-sm gap-x-1 bg-blue-500 px-1 py-1">
              <i className="bi bi-hand-thumbs-up-fill"></i>
              <span>Theo dõi 333</span>
            </button>
            <button className="flex text-white items-center rounded-sm gap-x-1 bg-blue-500 px-1 py-1">
              <IoIosShareAlt />
              <span>Chia sẻ</span>
            </button>
          </div>
          <div className="flex header-navlink items-center">
            <button className="btn btn-header border-solid border-r border-l border-gray-950 py-3 px-2 gap-x-2">
              <i className="bi text-secondary bi-file-earmark-pdf"></i>
              <span>Tài liệu kỹ thuật</span>
            </button>
            <button className="btn btn-header border-solid border-r border-gray-950 py-3 px-2 gap-x-2">
              <i className="bi bi-question-circle text-secondary"></i>
              <span>Hướng dẫn</span>
            </button>
            <button className="btn btn-header border-solid border-r border-gray-950 py-3 px-2 gap-x-2">
              <i className="bi text-secondary bi-database"></i>
              <span>Bảng giá sản phẩm</span>
            </button>
            <button className="btn btn-header border-solid border-r border-gray-950 py-3 px-2 gap-x-2">
              <i className="bi text-secondary bi-file-earmark-person"></i>
              <span>Liên hệ</span>
            </button>
          </div>
        </div>
        <NavLink
          to={"/signup"}
          className="signup-btn items-center flex gap-x-2 bg-[#B21E02] text-[#F1F3E4] py-2 px-2 text-sm"
        >
          <i className="bi text-[#FFFF00] text-base bi-person-plus-fill"></i>
          <span>Đăng ký</span>
        </NavLink>
        <button className="acount-btn hidden items-center  gap-x-2 bg-[#B21E02] text-[#F1F3E4] py-2 px-2 text-sm">
          <i className="bi text-[#FFFF00] text-base bi-person-fill"></i>
          <span>Tài khoản</span>
        </button>
      </div>
      <div className="flex flex-col py-3">
        <div className="bg-white   justify-between header-grid items-center grid gap-x-3 grid-cols-12">
          <NavLink
            to={"/"}
            className="header-logo cursor-pointer col-span-3 p-2"
          >
            <img src={logo} alt="" />
          </NavLink>
          <div className=" col-span-6 justify-center header-contact grid grid-cols-2 gap-x-3">
            <div className="flex gap-x-3 items-center">
              <i className="bi text-blue-500 text-2xl bi-telephone"></i>
              <div className="flex flex-col">
                <span className="text-[#0D427A] font-medium text-base">
                  028 3720 2968 - 0967 266 277
                </span>
                <span className="text-[#8D8D8D] text-sm">
                  Thứ 2-6: 8-17H; Thứ 7: 8-12H
                </span>
              </div>
            </div>
            <div className="flex gap-x-3 items-center">
              <i className="bi text-blue-500 text-2xl bi-envelope"></i>
              <div className="flex flex-col">
                <span className="text-[#0D427A] font-medium text-base">
                  sales@thegioidien.com
                </span>
                <span className="text-[#8D8D8D] text-sm">
                  Thứ 2-6: 8-17H; Thứ 7: 8-12H
                </span>
              </div>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(handleSignin)}
            className="p-2 bg-[#DBDBDB] header-signin col-span-3 rounded-sm flex flex-col gap-y-2"
          >
            <div className="flex  justify-between items-center">
              <div className="flex w-[135px] flex-shrink-0 gap-x-2   items-center">
                <i className="bi text-[#003B4F] text-lg bi-person"></i>
                <span className="text-sm text-red-800">Tài khoản</span>
              </div>
              <div className="relative flex-1">
                <Input
                  style={{
                    paddingTop: "8px",
                    paddingBottom: "8px",
                    backgroundColor: "#fff",
                  }}
                  control={control}
                  name="email"
                  type="email"
                  placeholder="Email hoặc số điện thoại"
                />

                <Error isRequired={false} error={errors?.email?.message} />
              </div>
            </div>
            <div className="flex  justify-between items-center">
              <div className="flex w-[135px] gap-x-2  items-center">
                <i className="bi text-[#003B4F] text-lg bi-key"></i>
                <span className="text-sm text-red-800">Mật khẩu</span>
              </div>
              <div className="relative flex-1">
                <Input
                  style={{
                    paddingTop: "8px",
                    paddingBottom: "8px",
                    backgroundColor: "#fff",
                  }}
                  control={control}
                  name="password"
                  type="password"
                  placeholder="Mật khẩu"
                />
                <Error isRequired={false} error={errors?.password?.message} />
              </div>
            </div>
            <div className="flex items-center ">
              <div className="w-[135px] flex-shrink-0">
                <span className="text-gray-500 transition-all hover:opacity-75 cursor-pointer">
                  Quên mật khẩu?
                </span>
              </div>
              <div className="relative flex flex-1 justify-start">
                <Button
                  type="submit"
                  className=" bg-primaryBtn btn-login"
                  title="Đăng Nhập"
                >
                  <TbLock className="text-secondary text-lg" />
                </Button>
                {/* <button className="flex transition-all hover:opacity-80 gap-x-2 items-center text-white rounded-sm bg-[#1C8DD9] px-2 py-2">
                  <TbLock className="text-secondary text-lg" />
                  <span>Đăng Nhập</span>
                </button> */}
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="relative z-[200]">
        <div className="grid grid-cols-12 gap-x-3 grid-search">
          <div
            onClick={() => setShowCategory(!showCategory)}
            className="col-span-3 category-accordion cursor-pointer select-none transition-all hover:opacity-75 flex items-center  bg-primary justify-between text-white px-3 py-2"
          >
            <FaBars className="text-lg" />
            <span className="uppercase text-lg font-semibold">
              DANH MỤC SẢN PHẨM
            </span>
            {showCategory ? (
              <i className="bi text-lg bi-chevron-up"></i>
            ) : (
              <FaPlus className="text-lg" />
            )}
          </div>
          <div className="col-span-6 search-control">
            <div className="rounded-md header-search">
              <div className="bg-[#FFFFE6] flex items-center relative">
                <input
                  className="text-gray-400 w-full text-base outline-none pl-3 pr-6 py-2"
                  placeholder="Tìm sản phẩm..."
                  type="text"
                />
                <i className="bi text-lg  text-[#1D8DD9] absolute top-2/4 right-2 -translate-y-2/4 bi-search"></i>
              </div>
            </div>
          </div>
          <div className="col-span-3 cart-session justify-center flex items-center  bg-primary text-white px-3 py-2">
            <NavLink
              to={"/cart"}
              className="flex btn gap-x-3 justify-center items-center"
            >
              <i className="bi bi-cart text-secondary text-xl hover:opacity-75 transition-all"></i>
              <span className="text-lg font-semibold">0 Sản phẩm</span>
            </NavLink>
          </div>
        </div>
        {showCategory && (
          <div className="category-menu absolute top-full w-full flex flex-col bg-[#CBCBCB]">
            {categoryData.map((item, index) => {
              return (
                <div key={item.id} className="relative category-menu__item">
                  <div
                    onClick={() => handleMenuClick(index)}
                    className="py-[2px] px-3 cursor-pointer transition-all hover:bg-[#B82F15] text-white bg-bgCategoryItem mb-[1px] flex justify-between items-center"
                  >
                    <div className="flex items-center gap-x-3">
                      <i className="bi pointer-events-none text-base text-white cursor-pointer bi-caret-right-fill"></i>
                      <div className="text-white hover:bg-[#0000CC] inline-block px-2 py-2 text-base">
                        {item.name}
                      </div>
                    </div>
                    <i className="bi text-white text-xl cursor-pointer pointer-events-none bi-plus"></i>
                  </div>
                  {activeMenu === index && (
                    <div className="caterory-panel  bg-[#CBCBCB]  flex-col">
                      {item?.children?.map((child, index) => {
                        return (
                          <div key={child.name} className="">
                            <div
                              onClick={() => handleSubMenuClick(index)}
                              className="py-[2px] pl-7 pr-3 cursor-pointer transition-all  text-white bg-[#646461] border-b border-[#F1FAFE] flex justify-between items-center"
                            >
                              <div className="flex justify-between items-center w-full caterory-panel__content">
                                <div className="flex items-center gap-x-3">
                                  <i className="bi pointer-events-none text-base text-white cursor-pointer bi-chevron-right"></i>
                                  <div className="text-white hover:bg-[#0000CC] inline-block px-2 py-2 text-base">
                                    {child.name}
                                  </div>
                                </div>
                                <i
                                  className={`bi text-white text-xl cursor-pointer pointer-events-none bi-plus`}
                                ></i>
                              </div>
                            </div>
                            {activeSubMenu === index && (
                              <div className="category-panel__submenu pb-2 flex-wrap gap-y-[2px] pl-3 pr-7 flex items-center gap-x-[2px]">
                                {child?.lastMenu?.map((last, index) => {
                                  return (
                                    <button
                                      key={index}
                                      className="bg-[#ECECEC] hover:bg-white transition-all border-solid  text-[##002343] py-1 rounded-sm flex items-center pr-3 pl-7 gap-x-1"
                                    >
                                      <AiOutlineThunderbolt className="text-base text-[#B21E02]" />
                                      <span className="text-sm">
                                        {last.name}
                                      </span>
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </StyledHeader>
  );
}
const StyledHeader = styled.div`
  .header-search {
    background-color: #6a1300;
    padding: 4px;
    background-image: linear-gradient(
      to top right,
      #b21e02,
      #bf3e26,
      #ff6600,
      #bf442d,
      #ff6600,
      #b21e02
    );
  }
  .caterory-panel__content:hover {
    background-color: #646461;
    background-image: linear-gradient(
      to right,
      #646461,
      #c55540,
      #c24d37,
      #bf442d
    );
  }
  .signup-btn:hover,
  .btn-header:hover {
    background-color: #b9331a;
    background-image: linear-gradient(
      to bottom,
      #f8ead9,
      #c24d37,
      #b9331a,
      #b9331a,
      #b9331a,
      #b21e02,
      #b21e02
    );
    color: #fff;
  }

  @media screen and (max-width: 1200px) {
    .header-contact {
      display: flex;
      flex-direction: column-reverse;
      align-items: center;
      row-gap: 16px;
    }
    .header-grid {
      /* grid-template-columns: repeat(2, 1fr); */
    }
    .header-logo,
    .header-contact,
    .header-signin,
    .category-accordion,
    .search-control,
    .cart-session {
      grid-column: span 4 / span 4;
    }
  }
  .btn-login {
    padding-top: 8px;
    padding-bottom: 8px;
  }
  @media screen and (max-width: 1180px) {
    .header-grid {
      /* grid-template-columns: repeat(2, 1fr); */
    }
  }
  @media screen and (max-width: 990px) {
    .header-navlink {
      display: none;
    }
    .header-signin,
    .header-logo {
      grid-column: span 6 / span 6;
      order: 1;
    }
    .header-contact {
      order: 2;
      grid-column: span 12 / span 12;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap-reverse;
      justify-content: space-around;
      align-items: center;
      height: 100%;
    }
  }
  @media screen and (max-width: 840px) {
    .grid-search {
      row-gap: 1rem;
    }
    .header-search {
      border-radius: 0;
    }
    .search-control {
      grid-column: span 12 / span 12;
      order: 1;
    }
    .cart-session,
    .category-accordion {
      order: 2;
      grid-column: span 6 / span 6;
    }
  }
  @media screen and (max-width: 768px) {
    .header-contact {
      flex-direction: column-reverse;
    }
  }
  @media screen and (max-width: 628px) {
    .header-contact {
      flex-direction: column-reverse;
    }
  }
  @media screen and (max-width: 580px) {
    .header-signin {
      display: none;
    }
    .header-logo {
      grid-column: span 12 / span 12;
      justify-content: center;
      display: flex;
      img {
        max-width: 80%;
      }
    }
    .search-control {
      order: 2;
    }
    .cart-session {
      grid-column: span 12 / span 12;
      order: 1;
    }
    .category-accordion {
      grid-column: span 12 / span 12;
      order: 3;
    }
    .signup-btn {
      display: none;
    }
    .acount-btn {
      display: flex;
    }
  }
`;
