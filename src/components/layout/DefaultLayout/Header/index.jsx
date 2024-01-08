import React, { useState } from "react";
import { IoIosShareAlt } from "react-icons/io";
import logo from "../../../../assets/logo.jpg";
import { TbLock } from "react-icons/tb";
import { FaBars } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import styled from "styled-components";
import { categoryData } from "../../../Data";
import { AiOutlineThunderbolt } from "react-icons/ai";

export default function Header() {
  const [show, setShow] = React.useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const handleMenuClick = (index) => {
    activeMenu === index ? setActiveMenu(null) : setActiveMenu(index);
  };
  const handleSubMenuClick = (index) => {
    activeSubMenu === index ? setActiveSubMenu(null) : setActiveSubMenu(index);
  };
  return (
    <StyledHeader className="header flex flex-col">
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
          <div className="flex items-center">
            <button className="btn border-solid border-r border-l border-gray-950 py-3 px-2 gap-x-2">
              <i className="bi text-secondary bi-file-earmark-pdf"></i>
              <span>Tài liệu kỹ thuật</span>
            </button>
            <button className="btn border-solid border-r border-gray-950 py-3 px-2 gap-x-2">
              <i className="bi bi-question-circle text-secondary"></i>
              <span>Hướng dẫn</span>
            </button>
            <button className="btn border-solid border-r border-gray-950 py-3 px-2 gap-x-2">
              <i className="bi text-secondary bi-database"></i>
              <span>Bảng giá sản phẩm</span>
            </button>
            <button className="btn border-solid border-r border-gray-950 py-3 px-2 gap-x-2">
              <i className="bi text-secondary bi-file-earmark-person"></i>
              <span>Liên hệ</span>
            </button>
          </div>
        </div>
        <button className="signup-btn items-center flex gap-x-2 bg-[#B21E02] text-[#F1F3E4] py-2 px-2 text-sm">
          <i className="bi text-[#FFFF00] text-base bi-person-plus-fill"></i>
          <span>Đăng ký</span>
        </button>
      </div>
      <div className="flex flex-col py-3">
        <div className="bg-white   justify-between items-center grid gap-x-3 grid-cols-4">
          <div className="header-logo col-span-1 p-2">
            <img src={logo} alt="" />
          </div>
          <div className=" col-span-2 justify-center grid grid-cols-2 gap-x-3">
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
                  028 3720 2968 - 0967 266 277
                </span>
                <span className="text-[#8D8D8D] text-sm">
                  Thứ 2-6: 8-17H; Thứ 7: 8-12H
                </span>
              </div>
            </div>
          </div>
          <div className="p-3 bg-[#DBDBDB] col-span-1 rounded-sm flex flex-col gap-y-2">
            <div className="flex gap-x-3 justify-between items-center">
              <div className="flex gap-x-2  items-center">
                <i className="bi text-[#003B4F] text-lg bi-person"></i>
                <span className="text-sm text-red-800">Tài khoản</span>
              </div>
              <div className="relative">
                <input
                  className="text-sm border bg-white border-gray-500 outline-none py-2 px-3"
                  placeholder="Email hoặc điện thoại"
                  type="text"
                />
              </div>
            </div>
            <div className="flex gap-x-3 justify-between items-center">
              <div className="flex gap-x-2  items-center">
                <i className="bi text-[#003B4F] text-lg bi-key"></i>
                <span className="text-sm text-red-800">Mật khẩu</span>
              </div>
              <div className="relative">
                <input
                  className="text-sm border bg-white border-gray-500 outline-none py-2 px-3"
                  placeholder="Mật khẩu"
                  type="text"
                />
              </div>
            </div>
            <div className="flex items-center gap-x-3">
              <div className="">
                <span className="text-gray-500 transition-all hover:opacity-75 cursor-pointer">
                  Quên mật khẩu?
                </span>
              </div>
              <button className="flex transition-all hover:opacity-80 gap-x-2 items-center text-white rounded-sm bg-[#1C8DD9] px-2 py-2">
                <TbLock className="text-secondary text-lg" />
                <span>Đăng Nhập</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-x-3">
        <div className="col-span-1 flex items-center  bg-primary justify-between text-white px-3 py-2">
          <FaBars className="text-lg" />
          <span className="uppercase text-lg font-semibold">
            DANH MỤC SẢN PHẨM
          </span>
          <FaPlus className="text-lg" />
        </div>
        <div className="col-span-2">
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
        <div className="col-span-1 justify-center flex items-center  bg-primary text-white px-3 py-2">
          <button className="flex btn gap-x-3 justify-center items-center">
            <i className="bi bi-cart text-secondary text-xl hover:opacity-75 transition-all"></i>
            <span className="text-lg font-semibold">0 Sản phẩm</span>
          </button>
        </div>
      </div>
      <div className="category-menu w-full flex flex-col bg-[#CBCBCB]">
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
                            <i className="bi text-white text-xl cursor-pointer pointer-events-none bi-plus"></i>
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
                                  <span className="text-sm">{last.name}</span>
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
`;
