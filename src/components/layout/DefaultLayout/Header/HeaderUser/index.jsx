import React from "react";
import { TbReportMoney } from "react-icons/tb";
import { Link } from "react-router-dom";
import styled from "styled-components";
export default function HeaderUser({ userInfo }) {
  return (
    <StyledHeaderUser className="p-2 bg-[#DBDBDB] header-account rounded-sm w-full flex flex-col gap-y-2 col-span-3">
      <span className="text-[#003B4F] text-sm ">Xin chào {userInfo?.name}</span>
      <Link
        to="/profile"
        className="px-[0.7rem] h-10 cursor-pointer transition-all hover:opacity-80 py-[0.4rem] flex items-center gap-x-2 rounded-sm bg-[#EAEAEA]"
      >
        <i className="bi bi-person-badge text-base text-[#003B4F]"></i>
        <span className="text-[#6A1300] text-xs">Quản lý tài khoản</span>
      </Link>
      <div className="px-[0.7rem] h-10 cursor-pointer transition-all hover:opacity-80 py-[0.4rem] flex items-center gap-x-2 rounded-sm bg-[#EAEAEA]">
        <TbReportMoney className="text-base text-[#003B4F]" />
        <span className="text-[#6A1300] text-xs">Tạo dự toán đơn hàng mới</span>
      </div>
    </StyledHeaderUser>
  );
}
const StyledHeaderUser = styled.div`
  @media screen and (max-width: 1200px) {
    grid-column: span 4 / span 4;
  }
  @media screen and (max-width: 990px) {
    grid-column: span 6 / span 6;
    order: 1;
  }
  @media screen and (max-width: 768px) {
    grid-column: span 7 / span 7;
    order: 1;
  }
  @media screen and (max-width: 580px) {
    display: none;
  }
`;
