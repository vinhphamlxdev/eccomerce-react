import React from "react";
import { TbLock } from "react-icons/tb";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../../../../Button";
import Error from "../../../../Error";
import { Input } from "../../../../Input";
import { REGEX_PASSWORD } from "../../../../../common/constants";
const EMAIL_AND_PHONE_REG_EXP =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$|^\d{10,11}$/;
const schemaValidate = Yup.object({
  emailAndPhone: Yup.string()
    .required("Vui lòng nhập email hoặc số điện thoại!")
    .matches(EMAIL_AND_PHONE_REG_EXP, "Email hoặc số điện thoại không hợp lệ!"),
  password: Yup.string()
    .required("Vui lòng nhập mật khẩu!")
    .matches(
      REGEX_PASSWORD,
      "Mật khẩu phải có ít nhất 8 ký tự, ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt!"
    ),
});
export default function HeaderLogin() {
  const {
    control,
    handleSubmit,
    register,
    clearErrors,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schemaValidate),
  });
  const handleSignin = async (data) => {
    console.log(data);
  };
  return (
    <form
      onSubmit={handleSubmit(handleSignin)}
      className="p-2 bg-[#DBDBDB] header-signin col-span-3 rounded-sm flex flex-col gap-y-2"
    >
      <div className="flex  justify-between items-center">
        <div className="flex w-[128px] flex-shrink-0 gap-x-2   items-center">
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
            name="emailAndPhone"
            type="text"
            placeholder="Email hoặc điện thoại"
          />

          <Error isRequired={false} error={errors?.emailAndPhone?.message} />
        </div>
      </div>
      <div className="flex  justify-between items-center">
        <div className="flex w-[128px] gap-x-2  items-center">
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
        <div className="w-[128px] flex-shrink-0">
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
  );
}
