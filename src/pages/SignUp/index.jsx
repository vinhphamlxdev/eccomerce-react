import { yupResolver } from "@hookform/resolvers/yup";
import * as React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { styled } from "styled-components";
import useAddress from "../../hooks/useAddress";
import useRecaptcha from "../../hooks/useRecapcha";
import { RE_CAPCHA_KEY } from "../../common/constants";
import { registerValidate } from "../../common/validateSchema";
import BreadCrumb from "../../components/BreadCrumb";
import CheckBox from "../../components/Checkbox";
import Error from "../../components/Error";
import { Field } from "../../components/Field";
import HeadingSession from "../../components/HeadingSession";
import { Input } from "../../components/Input";
import Select from "../../components/Select";
import { registerUser } from "../../services/AuthApi";
import { useSelector } from "react-redux";
const breadcrumbPaths = [
  { label: "Trang chủ", url: "/" },
  { label: "Đăng ký", url: "/signup" },
];

export default function SignUpPage() {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user?.userInfo);
  const {
    control,
    handleSubmit,
    register,
    setValue: setFormValue,
    clearErrors,
    getValues,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(registerValidate),
  });

  const [isChecked, setIsChecked] = React.useState({
    agreeTerms: false,
    promoInfo: false,
  });

  const {
    reCapchaValue,
    recaptchaExpired,
    handleRecapchaChange,
    handleExpiredRecapcha,
  } = useRecaptcha();

  const { mutate: signUpMutation } = useMutation({
    mutationFn: (user) => registerUser(user),
    onSuccess: (data) => {
      console.log("success:", data);
      toast.success("Đăng ký tài khoản thành công");
      navigate("/signin");
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const handleSignUp = async (data) => {
    if (recaptchaExpired) {
      console.log("reCAPTCHA expired. Please refresh and try again.");
      return;
    }
    const {
      fullName,
      email,
      districtAddress,
      provinceAddress,
      address,
      phoneNumber,
      password,
    } = data;
    const phone = phoneNumber.slice(1);
    const formData = {
      email: email,
      password: password,
      phone: `+84${phone}`,
      name: fullName,
      address: `${address}, ${districtAddress}, ${provinceAddress}`,
    };
    console.log(formData);
    signUpMutation(formData);
  };
  const {
    districtValue,
    districts,
    handleChangeDistricts,
    handleChangeProvinces,
    provincesData,
    provinceValue,
  } = useAddress(setFormValue, clearErrors);
  const handleAgreeTerms = (e) => {
    const checked = e.target.checked;
    setIsChecked((prev) => ({ ...prev, agreeTerms: checked }));
  };
  const handleReceivePromoInfo = (e) => {
    const checked = e.target.checked;
    setIsChecked((prev) => ({ ...prev, promoInfo: checked }));
  };
  const handleInputChange = (e, keyName) => {
    const value = e.target.value;
    setFormValue(keyName, value);
  };
  React.useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, []);
  return (
    <StyledSignUp className="signup-page">
      <BreadCrumb paths={breadcrumbPaths} />

      <div className="signup-container border-session">
        <HeadingSession
          title="Đăng ký thành viên"
          icon="bi bi-person-plus-fill text-secondary text-lg"
        />

        <div className="p-3 flex flex-col">
          <div className="flex items-center gap-x-1 justify-end text-xs">
            <span className="text-red-400">*</span>
            <span className="text-gray-400">là thông tin bắt buộc</span>
          </div>
          <div className="flex justify-center">
            <form
              onSubmit={handleSubmit(handleSignUp)}
              action=""
              className="flex flex-col mt-10 form-layout items-end gap-y-4"
            >
              <Field className="flex">
                <div className="text-sm  text-right form-label  w-[450px] text-[#3B3B3B]">
                  Họ tên
                </div>
                <div className="flex items-center form-control__input relative gap-x-2">
                  <Input
                    onChange={(e) => handleInputChange(e, "fullName")}
                    name="fullName"
                    control={control}
                  />
                  <Error error={errors?.fullName?.message} />
                </div>
              </Field>
              <Field className="flex">
                <div className="text-sm  text-right form-label  w-[450px] text-[#3B3B3B]">
                  Điện thoại
                </div>
                <div className="flex items-center form-control__input relative gap-x-2">
                  <Input
                    onChange={(e) => handleInputChange(e, "phoneNumber")}
                    name="phoneNumber"
                    control={control}
                  />
                  <Error error={errors?.phoneNumber?.message} />
                </div>
              </Field>
              <Field className="flex">
                <div className="text-sm  text-right form-label  w-[450px] text-[#3B3B3B]">
                  Email
                </div>
                <div className="flex items-center form-control__input relative gap-x-2">
                  <Input
                    onChange={(e) => handleInputChange(e, "email")}
                    name="email"
                    control={control}
                  />
                  <Error error={errors?.email?.message} />
                </div>
              </Field>
              <Field className="flex">
                <div className="text-sm  text-right form-label  w-[450px] text-[#3B3B3B]">
                  Mật khẩu
                </div>
                <div className="flex items-center form-control__input relative gap-x-2">
                  <Input
                    onChange={(e) => handleInputChange(e, "password")}
                    name="password"
                    control={control}
                  />
                  <Error error={errors?.password?.message} />
                </div>
              </Field>
              <Field className="flex">
                <div className="text-sm  text-right form-label  w-[450px] text-[#3B3B3B]">
                  Xác nhận mật khẩu
                </div>
                <div className="flex items-center form-control__input relative gap-x-2">
                  <Input
                    onChange={(e) => handleInputChange(e, "passwordConfirm")}
                    name="passwordConfirm"
                    control={control}
                  />
                  <Error error={errors?.passwordConfirm?.message} />
                </div>
              </Field>
              <Field className="flex">
                <div className="text-sm  text-right form-label  w-[450px] text-[#3B3B3B]">
                  Địa chỉ
                </div>
                <div className="flex items-center form-control__input relative gap-x-2">
                  <Input
                    onChange={(e) => handleInputChange(e, "address")}
                    name="address"
                    control={control}
                  />
                  <Error error={errors?.address?.message} />
                </div>
              </Field>
              <Field className="flex">
                <div className="text-sm  text-right form-label  w-[450px] text-[#3B3B3B]">
                  Tỉnh/Thành
                </div>
                <div className="flex items-center form-control__input relative gap-x-2">
                  <Select
                    data={provincesData}
                    control={control}
                    onChange={handleChangeProvinces}
                    name="provinceAddress"
                    register={register}
                    label="Chọn tỉnh thành"
                    value={provinceValue}
                  />
                  <Error error={errors?.provinceAddress?.message} />
                </div>
              </Field>
              <Field className="flex">
                <div className="text-sm  text-right form-label  w-[450px] text-[#3B3B3B]">
                  Quận/Huyện
                </div>
                <div className="flex items-center form-control__input relative gap-x-2">
                  <Select
                    data={districts}
                    control={control}
                    onChange={handleChangeDistricts}
                    name="districtAddress"
                    register={register}
                    label="Chọn quận huyện"
                    value={districtValue}
                  />
                  <Error error={errors?.districtAddress?.message} />
                </div>
              </Field>
              <Field className="flex field-recapcha">
                <div className="text-sm form-label__recapchar  text-right form-label  w-[450px] text-[#3B3B3B]"></div>
                <div className="flex items-center form-control__input form-recapcha relative gap-x-2">
                  <div className="recapcha">
                    <ReCAPTCHA
                      sitekey={RE_CAPCHA_KEY}
                      onChange={handleRecapchaChange}
                      onExpired={handleExpiredRecapcha}
                    />
                  </div>
                  <span className="text-xs form-error font-normal text-errBg"></span>
                </div>
              </Field>
              <Field className="flex field-recapcha field-agreeTerms">
                <div className="text-sm form-label__recapchar  text-right form-label  w-[450px] text-[#3B3B3B]"></div>
                <div className="flex items-center form-control__input form-recapcha relative gap-x-2">
                  <div className="flex flex-col gap-y-1 justify-start">
                    <CheckBox
                      checked={isChecked?.agreeTerms}
                      name="agreeTerms"
                      register={register}
                      label="Tôi đồng ý với các điều khoản và quy định sử dụng tại thegioidien.com"
                      onChange={handleAgreeTerms}
                    />
                    <span className="text-xs form-error font-normal text-errBg">
                      {errors?.agreeTerms?.message}
                    </span>
                  </div>
                  <span className="text-xs form-error font-normal text-errBg"></span>
                </div>
              </Field>
              <Field className="flex field-recapcha field-agreeTerms field-promoinfo">
                <div className="text-sm form-label__recapchar  text-right form-label  w-[450px] text-[#3B3B3B]"></div>
                <div className="flex items-center form-control__input form-recapcha relative gap-x-2">
                  <div className="flex flex-col gap-y-1 justify-start">
                    <CheckBox
                      checked={isChecked?.promoInfo}
                      name="promoInfo"
                      register={register}
                      label="Nhận thông tin khuyến mãi qua email"
                      onChange={handleReceivePromoInfo}
                    />
                  </div>
                </div>
              </Field>
              <Field className="flex">
                <div className="text-sm  text-right form-label  w-[450px] text-[#3B3B3B]"></div>
                <div className="flex items-center form-control__input relative gap-x-2">
                  <div className="btn-signup ml-auto w-[500px]">
                    <button
                      type="submit"
                      className="bg-bgbtn submit-button mr-auto hover:opacity-75 transition-all text-white py-1 rounded-sm flex items-center px-3 gap-x-2"
                    >
                      <i className="bi text-base text-secondary bi-person-plus-fill"></i>
                      <span className="text-sm">Đăng ký</span>
                    </button>
                  </div>
                  <span className="text-xs form-error font-normal text-errBg"></span>
                </div>
              </Field>
            </form>
          </div>
        </div>
      </div>
    </StyledSignUp>
  );
}
const StyledSignUp = styled.div`
  .signup-contaner {
    border: 1px solid #b21e02;
  }
  .form-layout {
    align-items: center;
  }
  .signup-heading {
    background-color: #b21e02;
    background-image: linear-gradient(
      to bottom,
      #b21e02,
      #b21e02,
      #b93016,
      #b21e02,
      #b21e02
    );
    color: #fff;
    font-size: 1.2rem;
    padding: 0.5rem;
  }

  .field-control input[type="text"],
  .field-control input[type="password"],
  .field-control select {
    width: 500px;
  }
  .field-control,
  .form-layout {
    width: 100%;
  }
  .form-label {
    flex-shrink: 0;
  }
  .field-control.field-agreeTerms {
    margin-bottom: 0;
  }
  @media screen and (max-width: 1200px) {
    .field-recapcha {
      width: 100%;
    }
    .form-control__input.form-recapcha {
      margin-right: auto;
      width: 500px;
    }
    .field-control {
      width: initial;
    }

    .form-layout {
      align-items: flex-end;
      width: initial;
    }
    .field-control {
      display: flex;
      justify-content: center;
    }
    .field-control .form-label {
      width: auto;
    }
    .form-control__input {
      flex-direction: column;
      align-items: flex-start;
      .form-error {
        position: absolute;
        left: 0;
        top: 106%;
      }
    }
  }
  @media screen and (max-width: 992px) {
    .form-control__input.form-recapcha,
    .btn-signup,
    .field-control input[type="text"],
    .field-control input[type="password"],
    .field-control select {
      width: 400px;
    }
  }
  @media screen and (max-width: 768px) {
    .form-control__input.form-recapcha {
      width: 100%;
    }
    .field-control.field-promoinfo {
      margin-top: 14px;
    }
    .field-input,
    .field-select {
      width: 100%;
    }
    .btn-signup {
      width: 100%;
      display: flex;
      justify-content: center;
    }
    .submit-button {
      margin-right: 0;
    }
    .form-layout {
      width: 100%;
    }
    .field-control {
      flex-direction: column;
      width: 100%;
      align-items: flex-start;
    }
    .form-control__input {
      width: 100%;
    }
    .field-control input[type="text"],
    .field-control input[type="password"],
    .field-control select {
      width: 100%;
    }
  }

  input[type="text"],
  input[type="password"],
  select {
    padding: 0.5rem;
    font-size: 16px;
  }
`;
