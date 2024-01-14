import React from "react";
import useRecaptcha from "../../../Hooks/useRecapcha";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import useAddress from "../../../Hooks/useAddress";
import {
  EMAIL_REG_EXP,
  PHONE_REG_EXP,
  REGEX_PASSWORD,
} from "../../../common/constants";
import * as Yup from "yup";
import { Field } from "../../../components/Field";
import { Input } from "../../../components/Input";
import CheckBox from "../../../components/Checkbox";
import ReCAPTCHA from "react-google-recaptcha";
import Button from "../../../components/Button";
import Select from "../../../components/Select";

const RE_CAPCHA_KEY = import.meta.env.VITE_RE_CAPCHA_KEY;

const schemaValidate = Yup.object({
  fullName: Yup.string().required("Vui lòng nhập họ tên!!"),
  phoneNumber: Yup.string()
    .matches(PHONE_REG_EXP, "Vui lòng nhập đúng định dạng số điện thoại!")
    .required("Vùi lòng nhập số điện thoại!"),
  email: Yup.string()
    .matches(EMAIL_REG_EXP, "Email không đúng định dạng!")
    .required("Vui lòng nhập email!"),
  password: Yup.string()
    .required("Vui lòng nhập mật khẩu!")
    .matches(
      REGEX_PASSWORD,
      "Mật khẩu phải có ít nhất 8 ký tự, ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt!"
    ),
  passwordConfirm: Yup.string()
    .required("Vui lòng xác nhận mật khẩu!!")
    .oneOf([Yup.ref("password")], "Mật khẩu xác nhận không đúng!"),
  address: Yup.string().required("Vui lòng nhập địa chỉ!"),
  cityAddress: Yup.string().required("Vui lòng chọn tỉnh thành!"),
  districtAddress: Yup.string().required("Vui lòng chọn quận huyện!"),
  agreeTerms: Yup.boolean().oneOf([true], "Vui lòng đồng ý để tiếp tục!"),
});
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
    resolver: yupResolver(schemaValidate),
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
              placeholder="Mật khẩu"
              name="password"
              type="password"
              control={control}
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
