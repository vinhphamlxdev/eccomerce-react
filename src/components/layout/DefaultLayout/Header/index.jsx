import React, { useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { IoIosShareAlt } from "react-icons/io";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../../../../assets/logo.jpg";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../../../common/constants";
import { setClearUser, setUserInfo } from "../../../../store/auth/authSlice";
import { isRefreshTokenExpired } from "../../../../utils/isRefreshTokenExpired";
import { categoryData } from "../../../Data";
import LoadingSpinner from "../../../Loading/LoadingSreen";
import CategoryMenu from "./CategoryMenu";
import HeaderLogin from "./HeaderLogin";
import HeaderUser from "./HeaderUser";
import LogoutButton from "./LogoutButton";
import { getUserInfo } from "../../../../services/UserApi";

export const Header = React.memo(function Header({
  showCategoryMenu = false,
  setShowCategoryMenu,
  categoryRef,
  categoryPopupRef,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.cart.cartItems);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const render = useSelector((state) => state.auth.render);
  const token = localStorage.getItem(ACCESS_TOKEN);
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);
  const query = useQuery({
    enabled: !!refreshToken,
    queryKey: ["userInfo", render],
    queryFn: () => getUserInfo(token),
    onSuccess: (data) => {
      data?.data && dispatch(setUserInfo(data.data));
      // console.log("get user info success:");
    },
    onError: (err) => {
      console.log("header error:", err);
    },
  });
  useEffect(() => {
    if (refreshToken && isRefreshTokenExpired(refreshToken)) {
      dispatch(setClearUser());
      navigate("/signin");
    }
  }, [refreshToken]);
  return (
    <StyledHeader className="header w-full flex flex-col">
      {query.isLoading && <LoadingSpinner />}
      <div className="flex bg-[#6A1300] items-center justify-between">
        <div className="flex items-center">
          <div className="px-2 gap-x-2 py-1 flex items-center h-full">
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
        {!userInfo && (
          <NavLink
            to={"/signup"}
            className="signup-btn items-center flex gap-x-2 bg-[#B21E02] text-[#F1F3E4] py-2 px-2 text-sm"
          >
            <i className="bi text-[#FFFF00] text-base bi-person-plus-fill"></i>
            <span>Đăng ký</span>
          </NavLink>
        )}
        {userInfo && <LogoutButton />}
        <NavLink
          to={"/"}
          className="acount-btn hidden items-center  gap-x-2 bg-[#B21E02] text-[#F1F3E4] py-2 px-2 text-sm"
        >
          <i className="bi text-[#FFFF00] text-base bi-person-fill"></i>
          <span>Tài khoản</span>
        </NavLink>
      </div>
      {userInfo && (
        <Link
          to={"/profile"}
          className="mt-[1px] bg-primary flex justify-center gap-x-2 py-2 px-3"
        >
          <i className="bi bi-person-circle text-base text-secondary"></i>
          <span className="text-white text-sm leading-[22px]">
            {userInfo?.fullName}
          </span>
        </Link>
      )}
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
          {userInfo ? <HeaderUser userInfo={userInfo} /> : <HeaderLogin />}
        </div>
      </div>
      <div className="relative z-[200]">
        <div className="grid grid-cols-12 gap-x-3 grid-search">
          <div
            ref={categoryRef}
            onClick={() => setShowCategoryMenu(!showCategoryMenu)}
            className="col-span-3 category-accordion cursor-pointer select-none transition-all hover:opacity-75 flex items-center  bg-primary justify-between text-white px-3 py-2"
          >
            <FaBars className="text-lg" />
            <span className="uppercase text-lg font-semibold">
              DANH MỤC SẢN PHẨM
            </span>
            {showCategoryMenu ? (
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
              <span className="text-lg font-semibold">
                {carts?.length || 0} Sản phẩm
              </span>
            </NavLink>
          </div>
        </div>

        <div
          ref={categoryPopupRef}
          className="category-menu absolute top-full w-full flex flex-col bg-[#CBCBCB]"
        >
          {showCategoryMenu &&
            categoryData.map((item, index) => {
              return <CategoryMenu key={index} data={item} />;
            })}
        </div>
      </div>
    </StyledHeader>
  );
});

export default Header;

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
    .header-logo {
      grid-column: span 5 / span 5;
    }
    .header-signin {
      grid-column: span 7 / span 7;
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
