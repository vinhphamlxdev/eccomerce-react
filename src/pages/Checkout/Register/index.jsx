import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { RE_CAPCHA_KEY } from "../../../common/constants";
import { registerValidate } from "../../../common/validateSchema";
import Button from "../../../components/Button";
import CheckBox from "../../../components/Checkbox";
import { Field } from "../../../components/Field";
import { Input } from "../../../components/Input";
import LoadingScreen from "../../../components/Loading/LoadingSreen";
import Select from "../../../components/Select";
import useAddress from "../../../hooks/useAddress";
import useRecaptcha from "../../../hooks/useRecapcha";

export default function Register() {
  const [isChecked, setIsChecked] = React.useState({
    agreeTerms: false,
    promoInfo: false,
  });
  const [showType, setShowType] = React.useState({
    isLogin: true,
    isBuyNow: false,
    isRegister: false,
  });
  const {
    control,
    handleSubmit,
    register,
    setValue: setFormValue,
    clearErrors,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(registerValidate),
  });

  const {
    reCapchaValue,
    recaptchaExpired,
    handleRecapchaChange,
    handleExpiredRecapcha,
  } = useRecaptcha();
  const handleRegister = async (data) => {
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
    provincesData,
    provinceValue,
    setDistrictValue,
    setDistricts,
    setProvinceValue,
    isFetchingAddress,
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
    <div className="checkout-form__control">
      {isFetchingAddress && <LoadingScreen />}
      <div className="flex justify-end items-center">
        <span className="text-[#FF6600]  text-sm">*</span>
        <span className="text-[#8D8D8D]  text-sm">là thông tin bắt buộc</span>
      </div>
      <form
        onSubmit={handleSubmit(handleRegister)}
        action=""
        className="flex flex-col mt-10 form-layout"
      >
        <Field>
          <div className="flex gap-x-1 items-center">
            <Input
              name="fullName"
              placeholder="Họ tên"
              control={control}
              onChange={(e) => handleInputChange(e, "fullName")}
            />
            <span className="text-xs font-normal text-red-600">*</span>
          </div>
          <span className="text-xs font-normal text-red-600">
            {errors?.fullName?.message}
          </span>
        </Field>
        <Field>
          <div className="flex gap-x-1 items-center">
            <Input
              placeholder="Điện thoại"
              name="phoneNumber"
              control={control}
              onChange={(e) => handleInputChange(e, "phoneNumber")}
            />
            <span className="text-xs font-normal text-red-600">*</span>
          </div>
          <span className="text-xs font-normal text-red-600">
            {errors?.phoneNumber?.message}
          </span>
        </Field>
        <Field>
          <div className="flex gap-x-1 items-center">
            <Input
              placeholder="Email"
              name="email"
              control={control}
              onChange={(e) => handleInputChange(e, "email")}
            />
            <span className="text-xs font-normal text-red-600">*</span>
          </div>
          <span className="text-xs font-normal text-red-600">
            {errors?.email?.message}
          </span>
        </Field>
        <Field>
          <div className="flex gap-x-1 items-center">
            <Input
              placeholder="Mật khẩu"
              name="password"
              type="password"
              control={control}
              onChange={(e) => handleInputChange(e, "password")}
            />
            <span className="text-xs font-normal text-red-600">*</span>
          </div>
          <span className="text-xs font-normal text-red-600">
            {errors?.password?.message}
          </span>
        </Field>
        <Field>
          <div className="flex gap-x-1 items-center">
            <Input
              placeholder="Xác nhận mật khẩu"
              name="passwordConfirm"
              type="password"
              control={control}
              onChange={(e) => handleInputChange(e, "passwordConfirm")}
            />
            <span className="text-xs font-normal text-red-600">*</span>
          </div>
          <span className="text-xs font-normal text-red-600">
            {errors?.passwordConfirm?.message}
          </span>
        </Field>
        <Field>
          <div className="flex gap-x-1 items-center">
            <Input
              placeholder="Địa chỉ (số nhà, tên đường, phường/xã)"
              name="address"
              control={control}
              onChange={(e) => handleInputChange(e, "address")}
            />
            <span className="text-xs font-normal text-red-600">*</span>
          </div>
          <span className="text-xs font-normal text-red-600">
            {errors?.address?.message}
          </span>
        </Field>
        <Field>
          <div className="flex gap-x-1 items-center">
            <Select
              data={provincesData}
              control={control}
              onChange={handleChangeProvinces}
              name="provinceAddress"
              register={register}
              label="Chọn tỉnh thành"
              value={provinceValue}
              keyName="province_name"
              keyId="province_name"
            />
            <span className="text-xs font-normal text-red-600">*</span>
          </div>
          <span className="text-xs font-normal text-red-600">
            {errors?.provinceAddress?.message}
          </span>
        </Field>
        <Field>
          <div className="flex gap-x-1 items-center">
            <Select
              data={districts}
              control={control}
              onChange={handleChangeDistricts}
              name="districtAddress"
              register={register}
              label="Chọn quận huyện"
              value={districtValue}
              keyName="district_name"
              keyId="district_name"
            />
            <span className="text-xs font-normal text-red-600">*</span>
          </div>

          <span className="text-xs font-normal text-red-600">
            {errors?.districtAddress?.message}
          </span>
        </Field>
        <Field>
          <div className="flex gap-x-1 items-center">
            <div className="recapcha">
              <ReCAPTCHA
                sitekey={RE_CAPCHA_KEY}
                onChange={handleRecapchaChange}
                onExpired={handleExpiredRecapcha}
              />
            </div>
            <span className="text-xs font-normal text-red-600">*</span>
          </div>

          <span className="text-xs font-normal text-red-600">
            {errors?.districtAddress?.message}
          </span>
        </Field>
        <Field>
          <div className="flex gap-x-1 items-center">
            <CheckBox
              name="agreeTerms"
              register={register}
              label="Tôi đồng ý với các điều khoản và quy định sử dụng tại thegioidien.com"
              onChange={handleAgreeTerms}
              checked={isChecked?.agreeTerms}
            />
            <span className="text-xs font-normal text-red-600">*</span>
          </div>

          <span className="text-xs font-normal text-red-600">
            {errors?.agreeTerms?.message}
          </span>
        </Field>
        <div className="grid grid-cols-3 gap-x-2">
          <span></span>
          <div className="btn-checkout">
            <Button
              title="Tiếp tục"
              type="submit"
              className="bg-primaryBtn flex-row-reverse"
            >
              <i className="bi text-base text-secondary bi-chevron-double-right"></i>
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
