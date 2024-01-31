import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { LuLogIn } from "react-icons/lu";
import { NavLink } from "react-router-dom";
import { loginValidate } from "../../../common/validateSchema";
import Button from "../../../components/Button";
import { Field } from "../../../components/Field";
import { Input } from "../../../components/Input";
import useRecaptcha from "../../../hooks/useRecapcha";
import { EMAIL_REG_EXP } from "../../../common/constants";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { loginUser } from "../../../services/AuthApi";

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
    mutate: loginMutatetion,
    isPending,
    isLoading,
  } = useMutation({
    mutationFn: (reqest) => loginUser(reqest),
    onSuccess: (data) => {
      console.log("success:", data);
      const { accessToken, refreshToken } = data;
      dispatch(setAccessTokenAndRefreshToken({ accessToken, refreshToken }));
      reset();
      toast.success("Đăng  nhập thành công!");
      dispatch(setRender());
      // setRender((prevRender) => !prevRender);
    },
    onError: (error) => {
      console.log(error);
      toast.error("Đăng nhập thất bại!");
    },
  });
  const {
    reCapchaValue,
    recaptchaExpired,
    handleRecapchaChange,
    handleExpiredRecapcha,
  } = useRecaptcha();
  const handleLogin = (data) => {
    const { emailOrPhone, password } = data;
    const key = EMAIL_REG_EXP.test(emailOrPhone) ? "email" : "phone";
    const formData = {
      [key]: emailOrPhone,
      password: password,
      mfaCode: "",
    };
    loginMutatetion(formData);
  };

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
