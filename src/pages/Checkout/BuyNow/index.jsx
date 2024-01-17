import React from "react";
import useRecaptcha from "../../../Hooks/useRecapcha";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import useAddress from "../../../Hooks/useAddress";
import {
  EMAIL_REG_EXP,
  PHONE_REG_EXP,
  REGEX_PASSWORD,
  RE_CAPCHA_KEY,
} from "../../../common/constants";
import * as Yup from "yup";
import { Field } from "../../../components/Field";
import { Input } from "../../../components/Input";
import CheckBox from "../../../components/Checkbox";
import ReCAPTCHA from "react-google-recaptcha";
import Button from "../../../components/Button";
import Select from "../../../components/Select";
import { buynowValidate } from "../../../common/validateSchema";

export default function BuyNow() {
  const [isChecked, setIsChecked] = React.useState({
    agreeTerms: false,
    promoInfo: false,
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
    resolver: yupResolver(buynowValidate),
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
    <div className="checkout-form__control">
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
            <Input name="fullName" placeholder="Họ tên" control={control} />
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
            />
            <span className="text-xs font-normal text-red-600">*</span>
          </div>
          <span className="text-xs font-normal text-red-600">
            {errors?.phoneNumber?.message}
          </span>
        </Field>
        <Field>
          <div className="flex gap-x-1 items-center">
            <Input placeholder="Email" name="email" control={control} />
            <span className="text-xs font-normal text-red-600">*</span>
          </div>
          <span className="text-xs font-normal text-red-600">
            {errors?.email?.message}
          </span>
        </Field>
        <Field>
          <div className="flex gap-x-1 items-center">
            <Input
              placeholder="Địa chỉ (số nhà, tên đường, phường/xã)"
              name="address"
              control={control}
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
              data={provicesData}
              control={control}
              onChange={handleChangeProvinces}
              name="cityAddress"
              register={register}
              label="Chọn tỉnh thành"
              value={provinceValue}
            />
            <span className="text-xs font-normal text-red-600">*</span>
          </div>
          <span className="text-xs font-normal text-red-600">
            {errors?.cityAddress?.message}
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
