import React from "react";
import { Field } from "../../../components/Field";
import { Input } from "../../../components/Input";
import { NavLink } from "react-router-dom";
import Button from "../../../components/Button";
import { LuLogIn } from "react-icons/lu";
import * as Yup from "yup";
import {
  EMAIL_REG_EXP,
  PHONE_REG_EXP,
  REGEX_PASSWORD,
} from "../../../common/constants";
import useAddress from "../../../Hooks/useAddress";
import useRecaptcha from "../../../Hooks/useRecapcha";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginValidate } from "../../../common/validateSchema";

export default function Login() {
  const {
    control,
    handleSubmit,
    register,
    setValue: setFormValue,
    clearErrors,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(loginValidate),
  });

  const {
    reCapchaValue,
    recaptchaExpired,
    handleRecapchaChange,
    handleExpiredRecapcha,
  } = useRecaptcha();
  const handleLogin = async (data) => {
    if (recaptchaExpired) {
      // Xử lý khi reCAPTCHA hết hạn
      console.log("reCAPTCHA expired. Please refresh and try again.");
      return;
    }

    console.log(data);
  };
  const {
    districtValue,
    districts,
    handleChangeDistricts,
    handleChangeProvinces,
    provicesData,
    provinceValue,
    setDistrictValue,
    setDistricts,
    setProvinceValue,
  } = useAddress(setFormValue, clearErrors);
  const handleAgreeTerms = (e) => {
    const checked = e.target.checked;
    setIsChecked((prev) => ({ ...prev, agreeTerms: checked }));
  };
  const handleInputChange = (e, keyName) => {
    const value = e.target.value;
    setFormValue(keyName, value);
  };
  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      className="checkout-form__control"
    >
      <Field>
        <div className="flex flex-col gap-y-1 items-start">
          <span className="text-[#3B3B3B] text-sm">Tài khoản</span>
          <div className="relative w-full">
            <Input
              name="email"
              control={control}
              placeholder="Nhập email hoặc điện thoại"
              onChange={(e) => handleInputChange(e, "email")}
            />
            <span className="absolute text-errBg text-sm right-[-10px] top-0">
              *
            </span>
          </div>
        </div>
        <span className="text-xs font-normal text-red-600">
          {errors?.email?.message}
        </span>
      </Field>
      <Field>
        <div className="flex flex-col gap-y-1 items-start">
          <span className="text-[#3B3B3B] text-sm">Mật khẩu</span>
          <div className="relative w-full">
            <Input
              name="password"
              control={control}
              placeholder="Nhập mật khẩu"
              onChange={(e) => handleInputChange(e, "password")}
            />
            <span className="absolute text-errBg text-sm right-[-10px] top-0">
              *
            </span>
          </div>
        </div>
        <span className="text-xs font-normal text-red-600">
          {errors?.password?.message}
        </span>
      </Field>
      <NavLink
        to="/forgot-password"
        className="flex text-[#003B4F]  items-center gap-x-1"
      >
        <i className="bi bi-key"></i>
        <span className="text-sm text-[#003B4F]">Quên mật khẩu?</span>
      </NavLink>
      <div className="flex justify-center">
        <Button type="submit" title="Đăng nhập" className="bg-bgbtn">
          <LuLogIn className="text-base text-secondary" />
        </Button>
      </div>
    </form>
  );
}
