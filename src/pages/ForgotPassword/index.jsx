import React from "react";
import BreadCrumb from "../../components/BreadCrumb";
import HeadingSession from "../../components/HeadingSession";
import styled from "styled-components";
import { Input } from "../../components/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { Field } from "../../components/Field";
import { EMAIL_REG_EXP, RE_CAPCHA_KEY } from "../../common/constants";
import ReCAPTCHA from "react-google-recaptcha";
import useRecaptcha from "../../hooks/useRecapcha";
import Button from "../../components/Button";
import Error from "../../components/Error";
const breadcrumbPaths = [
  { label: "Trang chủ", url: "/" },
  { label: "Quên mật khẩu", url: "/forgot-password" },
];
const schemaValidate = Yup.object({
  email: Yup.string()
    .required("Vui lòng nhập email!")
    .matches(EMAIL_REG_EXP, "Email không đúng định dạng!"),
});
export default function ForgotPassword() {
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
  const handleGetPassword = async (data) => {
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
        <HeadingSession title="Cấp lại mật khẩu" icon="bi-key" />
        <div className="p-3">
          <div className="flex text-sm mb-5 justify-end gap-x-2">
            <span className="text-errBg">*</span>
            <span className="text-[#8D8D8D] texr-sm">
              là thông tin bắt buộc
            </span>
          </div>
          <form
            onSubmit={handleSubmit(handleGetPassword)}
            className="flex flex-col gap-y-3 justify-center"
          >
            <div className="flex gap-x-3 form-field items-center">
              <div className="w-[450px] mb-7 form-label text-base text-[#3B3B3B] flex justify-end">
                Email
              </div>
              <div className="relative flex flex-col gap-y-2 form-field__input">
                <Input name="email" control={control} />
                <Error error={errors?.email?.message} isRequired={false} />
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
              <Button
                type="submit"
                className="bg-bgbtn"
                title="Yêu cầu cấp lại mật khẩu"
              >
                <i className="bi text-secondary text-base bi-cursor-fill"></i>
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
