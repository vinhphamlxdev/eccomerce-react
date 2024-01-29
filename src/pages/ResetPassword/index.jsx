import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import styled from "styled-components";
import * as Yup from "yup";
import { REGEX_PASSWORD, RE_CAPCHA_KEY } from "../../common/constants";
import BreadCrumb from "../../components/BreadCrumb";
import Button from "../../components/Button";
import Error from "../../components/Error";
import HeadingSession from "../../components/HeadingSession";
import { Input } from "../../components/Input";
import LoadingSreen from "../../components/Loading/LoadingSreen";
import useRecaptcha from "../../hooks/useRecapcha";
import { changePassword } from "../../services/UserApi";
import { confirmResetPassword } from "../../services/AuthApi";
import { useNavigate } from "react-router-dom";
const breadcrumbPaths = [
  { label: "Trang chủ", url: "/" },
  { label: "Quên mật khẩu", url: "/forgot-password" },
];
const schemaValidate = Yup.object({
  newPassword: Yup.string()
    .required("Vui lòng nhập mật khẩu mới!")
    .matches(
      REGEX_PASSWORD,
      "Mật khẩu phải có ít nhất 8 ký tự, ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt!"
    ),
  passwordConfirm: Yup.string()
    .required("Vui lòng xác nhận mật khẩu mới!")
    .oneOf([Yup.ref("newPassword")], "Mật khẩu xác nhận không đúng!"),
  token: Yup.string().required("Vui lòng nhập mã xác nhận!"),
});
export default function ResetPassword() {
  const navigate = useNavigate();
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
  const mutation = useMutation({
    mutationFn: (requestData) => confirmResetPassword(requestData),
    onSuccess: (data) => {
      console.log(data);
      toast.success("Cấp lại mật khẩu thành công, đăng nhập lại để tiếp tục!");
      navigate("/signin");
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const handleGetPassword = (data) => {
    if (recaptchaExpired) {
      return;
    }
    const { newPassword, token } = data;
    const requestData = {
      newPassword,
      token,
    };
    console.log(requestData);
    mutation.mutate(requestData);
  };
  const {
    reCapchaValue,
    recaptchaExpired,
    handleRecapchaChange,
    handleExpiredRecapcha,
  } = useRecaptcha();
  return (
    <StyledForgotPassword className="forgot-password">
      {mutation.isLoading && <LoadingSreen />}
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
                Mật khâu mới
              </div>
              <div className="relative flex flex-col gap-y-2 form-field__input">
                <Input name="newPassword" control={control} type="password" />
                <Error
                  error={errors?.newPassword?.message}
                  className="error-msg"
                />
                <span className="absolute text-errBg text-sm right-[-10px] top-0">
                  *
                </span>
              </div>
            </div>
            <div className="flex gap-x-3 form-field items-center">
              <div className="w-[450px] mb-7 form-label text-base text-[#3B3B3B] flex justify-end">
                Xác nhận mật khẩu mới
              </div>
              <div className="relative flex flex-col gap-y-2 form-field__input">
                <Input
                  name="passwordConfirm"
                  control={control}
                  type="password"
                />
                <Error
                  error={errors?.passwordConfirm?.message}
                  className="error-msg"
                />
                <span className="absolute text-errBg text-sm right-[-10px] top-0">
                  *
                </span>
              </div>
            </div>
            <div className="flex gap-x-3 form-field items-center">
              <div className="w-[450px] mb-7 form-label text-base text-[#3B3B3B] flex justify-end">
                Mã xác nhận
              </div>
              <div className="relative flex flex-col gap-y-2 form-field__input">
                <Input name="token" control={control} />
                <Error error={errors?.token?.message} className="error-msg" />
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
                title="Xác nhận mật khẩu"
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
  .error-msg .error-required {
    display: none;
  }
`;
