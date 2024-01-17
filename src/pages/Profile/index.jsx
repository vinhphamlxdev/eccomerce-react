import React, { useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import styled from "styled-components";
import HeadingSession from "../../components/HeadingSession";
import Button from "../../components/Button";
import Field from "../../components/Field/Field";
import Input from "../../components/Input/Input";
import Error from "../../components/Error";
import {
  EMAIL_REG_EXP,
  REGEX_New_PASSWORD,
  REGEX_PASSWORD,
} from "../../common/constants";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { RxUpdate } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { changePasswordValidate } from "../../common/validateSchema";
import ChangePassword from "./ChangePassword";
import ChangeInfo from "./ChangeInfo";
const breadcrumbPaths = [
  { label: "Trang chủ", url: "/" },
  { label: "Thành viên", url: "/profile" },
];
const navLink = [
  { label: "Dự toán đơn hàng (0)", url: "/", icon: "bi-file-earmark-text" },
  { label: "Yêu cầu giá dự án (0)", url: "/", icon: "bi-file-earmark-ruled" },
  { label: "Bảng báo giá (0)", url: "/", icon: "bi-file-earmark-richtext" },
  {
    label: "Đơn hàng đã đặt (0)",
    url: "/",
    icon: "bi-file-earmark-spreadsheet",
  },
  { label: "Đơn hàng đã nhận (0)", url: "/", icon: "bi-file-earmark-text" },
  { label: "Đơn hàng đã hủy (0)", url: "/", icon: "bi-file-earmark-richtext" },
];

export default function Profile() {
  const [isEdit, setIsEdit] = useState({
    isChangePassword: false,
    isEditContactInfo: false,
  });

  return (
    <StyledProfile className="profile-page">
      <BreadCrumb paths={breadcrumbPaths} />
      <div className="grid grid-cols-6 gap-x-[1px] member-nav__list">
        {navLink.map((item, index) => (
          <div
            key={index}
            className="px-[0.7rem] w-full transition-all hover:bg-primary justify-start whitespace-nowrap py-[0.5rem] flex gap-x-2 items-center bg-bgbtn"
          >
            <i className={`bi ${item.icon} text-secondary text-base`}></i>
            <span className="text-white text-sm">{item.label}</span>
          </div>
        ))}
      </div>
      <div className="profile-container border-session">
        <HeadingSession
          title="Thông tin"
          icon="bi bi-person text-secondary text-lg"
        />
        <div className="member-id py-3 px-2 bg-[#FEDBD7] flex items-center gap-x-3">
          <div className="flex gap-x-1 items-center">
            <span className="text-[#3B3B3B] text-sm ">ID:</span>
            <span className="text-[#000]">50049.</span>
          </div>
          <div className="flex gap-x-1 items-center">
            <span className="text-[#3B3B3B] text-sm ">Ngày đăng ký:</span>
            <span className="text-[#000]">16/1/2024</span>
          </div>
        </div>
        <div className="p-3 grid grid-cols-2 gap-x-3 member-user">
          <div className="flex flex-col bg-[#EDEDED] border border-[#CBCBCB]">
            <div className="p-[0.5rem] flex justify-center items-center bg-[#CBCBCB] gap-x-2 text-primary text-[1.1rem]">
              <i className="bi bi-person-vcard text-[#0D427A] text-lg"></i>
              <span className="text-primary">Thông tin đăng nhập</span>
            </div>
            <div className="p-4 flex flex-col gap-y-1">
              <div className="flex items-center">
                <span className="text-[#3B3B3B] w-[110px] label">Email</span>
                <span className="text-[#000] text-base">
                  Vinhpham@gmail.com
                </span>
              </div>
              {!isEdit.isChangePassword && (
                <div className="flex  items-center">
                  <span className="label w-[110px]">Mật khẩu</span>
                  <span className="text-[#000] text-base">
                    *****************
                  </span>
                </div>
              )}
              {isEdit.isChangePassword && (
                <ChangePassword setIsEdit={setIsEdit} />
              )}
              {!isEdit.isChangePassword && (
                <div className="flex justify-center">
                  <Button
                    onClick={() =>
                      setIsEdit((prev) => ({
                        ...prev,
                        isChangePassword: true,
                      }))
                    }
                    title="Đổi mật khẩu"
                    className="bg-bgbtn mt-2"
                  >
                    <i className="bi text-secondary text-sm bi-pencil-square"></i>
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col bg-[#EDEDED] border border-[#CBCBCB]">
            <div className="p-[0.5rem] flex justify-center items-center bg-[#CBCBCB] gap-x-2 text-primary text-[1.1rem]">
              <i className="bi bi-key text-[#0D427A] text-lg"></i>
              <span className="text-primary">Thông tin liên hệ</span>
            </div>
            {!isEdit?.isEditContactInfo && (
              <div className="p-4 flex flex-col gap-y-1">
                <div className="flex items-center">
                  <span className="text-[#3B3B3B] text-sm w-[110px]">
                    Họ tên
                  </span>
                  <span className="text-[#000] text-base">Vinh Pham</span>
                </div>
                <div className="flex items-center">
                  <span className="text-[#3B3B3B] text-sm w-[110px]">
                    Điện thoại
                  </span>
                  <span className="text-[#000] text-base">0364216354</span>
                </div>
                <div className="flex items-center">
                  <span className="text-[#3B3B3B] text-sm w-[110px]">
                    Địa chỉ
                  </span>
                  <span className="text-[#000] text-base">HCM Viet Nam</span>
                </div>
                <div className="flex justify-center">
                  <Button
                    onClick={() =>
                      setIsEdit((prev) => ({
                        ...prev,
                        isEditContactInfo: true,
                      }))
                    }
                    title="Sửa"
                    className="bg-bgbtn mt-2"
                  >
                    <i className="bi text-secondary text-sm bi-pencil-square"></i>
                  </Button>
                </div>
              </div>
            )}
            {isEdit.isEditContactInfo && <ChangeInfo setIsEdit={setIsEdit} />}
          </div>
        </div>
      </div>
    </StyledProfile>
  );
}
const StyledProfile = styled.div`
  .member-nav__list {
    column-gap: 1px !important;
    row-gap: 1px !important;
  }
  @media screen and (max-width: 1400px) {
    .member-nav__list {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }
  @media screen and (max-width: 768px) {
    .member-nav__list {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .member-user {
      display: flex;
      flex-direction: column;
    }
  }
`;
