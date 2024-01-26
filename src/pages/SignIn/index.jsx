import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { IoLogInOutline } from "react-icons/io5";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import * as Yup from "yup";
import useDisabled from "../../Hooks/useDisabled";
import useRecaptcha from "../../Hooks/useRecapcha";
import {
  EMAIL_REG_EXP,
  REGEX_PASSWORD,
  RE_CAPCHA_KEY,
} from "../../common/constants";
import BreadCrumb from "../../components/BreadCrumb";
import Button from "../../components/Button";
import Error from "../../components/Error";
import HeadingSession from "../../components/HeadingSession";
import { Input } from "../../components/Input";
import { loginUser } from "../../services/AuthApi";
import { setAccessTokenAndRefreshToken } from "../../store/auth/authSlice";
const breadcrumbPaths = [
  { label: "Trang chủ", url: "/" },
  { label: "Tài khoản", url: "/signin" },
];
const schemaValidate = Yup.object({
  emailOrPhone: Yup.string().required(
    "Vui lòng nhập email hoặc số điện thoại!"
  ),
  signinPassword: Yup.string().required("Vui lòng nhập mật khẩu!"),
});
export default function SignInPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const {
    control,
    handleSubmit,
    register,
    setValue: setFormValue,
    clearErrors,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schemaValidate),
  });
  const { mutate: signinMutation, isPending } = useMutation({
    mutationFn: (user) => loginUser(user),
    onSuccess: (data) => {
      console.log("success:", data);
      const { accessToken, refreshToken } = data;
      dispatch(setAccessTokenAndRefreshToken({ accessToken, refreshToken }));
      reset();
      navigate("/");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Đăng nhập thất bại!");
    },
  });
  const handleSignIn = (data) => {
    if (recaptchaExpired) {
      console.log("reCAPTCHA expired. Please refresh and try again.");
      return;
    }
    const { emailOrPhone, signinPassword } = data;
    const key = EMAIL_REG_EXP.test(emailOrPhone) ? "email" : "phone";

    const formData = {
      [key]: emailOrPhone,
      password: signinPassword,
      mfaCode: "",
    };

    signinMutation(formData);
  };
  const {
    reCapchaValue,
    recaptchaExpired,
    handleRecapchaChange,
    handleExpiredRecapcha,
  } = useRecaptcha();
  const handleInputChange = (e, keyName) => {
    const value = e.target.value;
    setFormValue(keyName, value);
  };
  const { disabledStyle, isDisabled } = useDisabled(isSubmitting);
  React.useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, []);
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
              <div className="w-[450px] label mb-7 form-label text-[#3B3B3B] flex justify-end">
                Tài khoản
              </div>
              <div className="relative flex flex-col gap-y-2 form-field__input">
                <Input
                  name="emailOrPhone"
                  placeholder="Email hoặc số điện thoại"
                  control={control}
                  onChange={(e) => handleInputChange(e, "emailOrPhone")}
                />
                <Error
                  error={errors?.emailOrPhone?.message}
                  isRequired={false}
                />
                <span className="absolute text-errBg text-sm right-[-10px] top-0">
                  *
                </span>
              </div>
            </div>

            <div className="flex gap-x-3 form-field items-center">
              <div className="w-[450px] label mb-7 form-label text-[#3B3B3B] flex justify-end">
                Mật khẩu
              </div>
              <div className="relative flex flex-col gap-y-2 form-field__input">
                <Input
                  name="signinPassword"
                  control={control}
                  onChange={(e) => handleInputChange(e, "signinPassword")}
                />
                <Error
                  error={errors?.signinPassword?.message}
                  isRequired={false}
                />
                <span className="absolute text-errBg text-sm right-[-10px] top-0">
                  *
                </span>
              </div>
            </div>
            <div className="flex gap-x-3 items-center">
              <div className="w-[450px] label form-label form-label__capcha  text-[#3B3B3B] flex justify-end"></div>
              <ReCAPTCHA
                sitekey={RE_CAPCHA_KEY}
                onChange={handleRecapchaChange}
                onExpired={handleExpiredRecapcha}
              />
            </div>
            <div className="flex gap-x-3 items-center">
              <div className="w-[450px] label form-label form-label__capcha text-[#3B3B3B] flex justify-end"></div>
              <Button
                style={disabledStyle}
                isDisabled={isDisabled}
                type="submit"
                className="bg-bgbtn"
                title="Đăng nhập"
              >
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
