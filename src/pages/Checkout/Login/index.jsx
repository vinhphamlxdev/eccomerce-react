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
  agreeTerms: Yup.boolean().oneOf([true], "Vui lòng đồng ý để tiếp tục!"),
});
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
    resolver: yupResolver(schemaValidate),
  });

  const {
    reCapchaValue,
    recaptchaExpired,
    handleRecapchaChange,
    handleExpiredRecapcha,
  } = useRecaptcha();
  const handleLogin = async (data) => {
    // if (recaptchaExpired) {
    //   // Xử lý khi reCAPTCHA hết hạn
    //   console.log("reCAPTCHA expired. Please refresh and try again.");
    //   return;
    // }

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
  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      className="checkout-form__control"
    >
      <Field>
        <div className="flex flex-col gap-y-1 items-start">
          <span className="text-[#3B3B3B] text-sm">Tài khoản</span>
          <Input
            name="email"
            control={control}
            placeholder="Nhập email hoặc điện thoại"
          />
        </div>
        <span className="text-xs font-normal text-red-600">
          {errors?.email?.message}
        </span>
      </Field>
      <Field>
        <div className="flex flex-col gap-y-1 items-start">
          <span className="text-[#3B3B3B] text-sm">Mật khẩu</span>
          <Input
            name="password"
            control={control}
            placeholder="Nhập mật khẩu"
          />
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
        <Button title="Đăng nhập" className="bg-bgbtn">
          <LuLogIn className="text-base text-secondary" />
        </Button>
      </div>
    </form>
  );
}
