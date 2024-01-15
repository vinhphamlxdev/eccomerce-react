import React from "react";
import BreadCrumb from "../../components/BreadCrumb";
import HeadingSession from "../../components/HeadingSession";
import styled from "styled-components";
import { Input } from "../../components/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { Field } from "../../components/Field";
import { IoLogInOutline } from "react-icons/io5";
import {
  EMAIL_REG_EXP,
  REGEX_PASSWORD,
  RE_CAPCHA_KEY,
} from "../../common/constants";
import ReCAPTCHA from "react-google-recaptcha";
import useRecaptcha from "../../Hooks/useRecapcha";
import Button from "../../components/Button";
import Error from "../../components/Error";
import { Link } from "react-router-dom";
const breadcrumbPaths = [
  { label: "Trang chủ", url: "/" },
  { label: "Tài khoản", url: "/signin" },
];
const schemaValidate = Yup.object({
  email: Yup.string()
    .required("Vui lòng nhập email!")
    .matches(EMAIL_REG_EXP, "Email không đúng định dạng!"),
  signinPassword: Yup.string()
    .required("Vui lòng nhập mật khẩu!")
    .matches(
      REGEX_PASSWORD,
      "Mật khẩu phải có ít nhất 8 ký tự, ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt!"
    ),
});
export default function SignInPage() {
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
  const handleSignIn = async (data) => {
    if (recaptchaExpired) {
      // Xử lý khi reCAPTCHA hết hạn
      console.log("reCAPTCHA expired. Please refresh and try again.");
      return;
    }

    console.log(data);
  };
  const {
    reCapchaValue,
    recaptchaExpired,
    handleRecapchaChange,
    handleExpiredRecapcha,
  } = useRecaptcha();
  return (
    <StyledForgotPassword className="forgot-password">
      <BreadCrumb paths={breadcrumbPaths} />
      <div className="border-session forgot-passwork-layout">
        <HeadingSession
          title="Đăng nhập"
          icon="bi-person"
          leftContent={
            <Link
              to={"/signup"}
              className="text-[#002F3F] text-xs px-2 rounded-sm transition-all hover:opacity-80 bg-[#DBDBDB] flex gap-x-1 items-center py-1"
            >
              <i className="bi  bi-person-fill-add text-[#8D1802] text-base" />
              <span>Đăng ký thành viên</span>
            </Link>
          }
        />
        <div className="p-3">
          <div className="flex text-sm mb-5 justify-end gap-x-2">
            <span className="text-errBg">*</span>
            <span className="text-[#8D8D8D] texr-sm">
              là thông tin bắt buộc
            </span>
          </div>
          <form
            onSubmit={handleSubmit(handleSignIn)}
            className="flex flex-col gap-y-3 justify-center"
          >
            <div className="flex gap-x-3 form-field items-center">
              <div className="w-[450px] mb-7 form-label text-base text-[#3B3B3B] flex justify-end">
                Tài khoản
              </div>
              <div className="relative flex flex-col gap-y-2 form-field__input">
                <Input
                  name="email"
                  placeholder="Email hoặc số điện thoại"
                  control={control}
                />
                <Error error={errors?.email?.message} isRequired={false} />
                <span className="absolute text-errBg text-sm right-[-10px] top-0">
                  *
                </span>
              </div>
            </div>
            <div className="flex gap-x-3 form-field items-center">
              <div className="w-[450px] mb-7 form-label text-base text-[#3B3B3B] flex justify-end">
                Mật khẩu
              </div>
              <div className="relative flex flex-col gap-y-2 form-field__input">
                <Input name="signinPassword" control={control} />
                <Error error={errors?.password?.message} isRequired={false} />
                <span className="absolute text-errBg text-sm right-[-10px] top-0">
                  *
                </span>
              </div>
            </div>
            <div className="flex gap-x-3 items-center">
              <div className="w-[450px] form-label form-label__capcha  text-base text-[#3B3B3B] flex justify-end"></div>
              <ReCAPTCHA
                sitekey={RE_CAPCHA_KEY}
                onChange={handleRecapchaChange}
                onExpired={handleExpiredRecapcha}
              />
            </div>
            <div className="flex gap-x-3 items-center">
              <div className="w-[450px] form-label form-label__capcha text-base text-[#3B3B3B] flex justify-end"></div>
              <Button type="submit" className="bg-bgbtn" title="Đăng nhập">
                <IoLogInOutline className="text-secondary text-base " />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </StyledForgotPassword>
  );
}

const StyledForgotPassword = styled.div`
  .form-error span {
    margin-top: 6px;
    display: inline-block;
  }
  .form-label {
    width: 450px;
  }
  input[type="text"],
  input[type="password"],
  input[type="email"],
  select {
    padding: 0.5rem;
    font-size: 16px;
  }
  input[type="text"],
  input[type="password"],
  input[type="email"],
  select {
    width: 500px;
  }

  @media screen and (max-width: 1200px) {
    .form-label {
      width: 350px;
    }
  }

  @media screen and (max-width: 992px) {
    .form-label {
      width: 250px;
    }
    input[type="text"],
    input[type="password"],
    input[type="email"],
    select {
      width: 400px;
    }
  }
  @media screen and (max-width: 768px) {
    .form-label {
      width: 160px;
      justify-content: flex-start;
      margin-bottom: 0px;
    }
    .form-field__input {
      width: 100%;
    }
    input[type="text"],
    input[type="password"],
    input[type="email"],
    select {
      width: 100%;
    }
    .form-field {
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
    }
    .form-label__capcha {
      display: none;
    }
  }
`;
