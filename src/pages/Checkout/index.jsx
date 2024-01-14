import React from "react";
import BreadCrumb from "../../components/BreadCrumb";
import HeadingSection from "../../components/HeadingSession";
import styled from "styled-components";
import CheckoutType from "../../components/CheckoutType";
import Select from "../../components/Select";
import { Field } from "../../components/Field";
import { Input } from "../../components/Input";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { getAllAddress } from "../../services/AddressApi";
import { useQuery } from "@tanstack/react-query";
import useAddress from "../../Hooks/useAddress";
import Button from "../../components/Button";
import useRecaptcha from "../../Hooks/useRecapcha";
import CheckBox from "../../components/Checkbox";
import ReCAPTCHA from "react-google-recaptcha";
const RE_CAPCHA_KEY = import.meta.env.VITE_RE_CAPCHA_KEY;
const breadcrumbPaths = [
  { label: "Trang chủ", url: "/" },
  { label: "Điền Thông Tin", url: "/checkout" },
];
const EMAIL_REG_EXP = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
const REGEX_PASSWORD =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const PHONE_REG_EXP = /^[0-9]{10}$/;
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
export default function Checkout() {
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
    resolver: yupResolver(schemaValidate),
  });

  const {
    reCapchaValue,
    recaptchaExpired,
    handleRecapchaChange,
    handleExpiredRecapcha,
  } = useRecaptcha();
  const handleOrder = async (data) => {
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
    <CheckoutStyled className="checkout-page">
      <BreadCrumb paths={breadcrumbPaths} />
      <div className="checkout-container border-session">
        <HeadingSection
          title="Vui lòng điền thông tin để tiếp tục mua hàng"
          icon="bi-card-heading"
        />
        <div className="p-3 grid grid-cols-2 gap-x-4 checkout-layout">
          <div className="checkout-form flex flex-col">
            <CheckoutType />
            <div className="mt-4">
              <CheckoutType />
              <div>
                <div className="checkout-form__control">
                  <div className="flex justify-end items-center">
                    <span className="text-[#FF6600]  text-sm">*</span>
                    <span className="text-[#8D8D8D]  text-sm">
                      là thông tin bắt buộc
                    </span>
                  </div>
                  <form
                    onSubmit={handleSubmit(handleOrder)}
                    action=""
                    className="flex flex-col mt-10 form-layout"
                  >
                    <Field>
                      <div className="flex gap-x-1 items-center">
                        <Input
                          name="fullName"
                          placeholder="Họ tên"
                          control={control}
                        />
                        <span className="text-xs font-normal text-red-600">
                          *
                        </span>
                      </div>
                      <span className="text-xs font-normal text-red-600">
                        {errors?.fullName?.message}
                      </span>
                    </Field>
                    <Field>
                      <div className="flex gap-x-1 items-center">
                        <Input
                          placeholder="Số điện thoại"
                          name="phoneNumber"
                          control={control}
                        />
                        <span className="text-xs font-normal text-red-600">
                          *
                        </span>
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
                        />
                        <span className="text-xs font-normal text-red-600">
                          *
                        </span>
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
                        <span className="text-xs font-normal text-red-600">
                          *
                        </span>
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
                        <span className="text-xs font-normal text-red-600">
                          *
                        </span>
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
                        <span className="text-xs font-normal text-red-600">
                          *
                        </span>
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
                        <span className="text-xs font-normal text-red-600">
                          *
                        </span>
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
                        <span className="text-xs font-normal text-red-600">
                          *
                        </span>
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
                        <span className="text-xs font-normal text-red-600">
                          *
                        </span>
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
                        <span className="text-xs font-normal text-red-600">
                          *
                        </span>
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
              </div>
            </div>
          </div>
          <div className="checkout-invoice flex flex-col gap-y-4">
            <div className="invoice-container">
              <div className="invoice-heading">ĐƠN HÀNG</div>
              <div className="invoice-grid invoice-firstgrid">
                <div className="invoice-item__header">
                  <span>STT</span>
                </div>
                <div className="invoice-item__header">
                  <span>Hình</span>
                </div>
                <div className="invoice-item__header">
                  <span>Tên sản phẩm</span>
                </div>
                <div className="invoice-item__header">
                  <span>Thành tiền</span>
                </div>
              </div>
              <div className="invoice-grid">
                <div className="invoice-item__header">
                  <span>1</span>
                </div>
                <div className="invoice-item__header">
                  <img
                    src="https://thegioidien.com/hmhB/E8332RJS5_WG_G19714880800.jpg"
                    alt=""
                  />
                </div>
                <div className="invoice-item__header">
                  <span>Bộ 2 ổ cắm mạng cat5e</span>
                </div>
                <div className="invoice-item__header caculate-total">
                  <div className="flex flex-col w-full gap-y-2">
                    <div className="flex items-center w-full justify-between">
                      <span>ĐVT: Cái</span>
                      <div className="flex gap-x-[3px] items-center">
                        <span className="text-red-500 text-sm">X</span>
                        <span className="mb-1">2</span>
                      </div>
                    </div>
                    <div className="flex items-center w-full justify-between">
                      <span>Đơn giá</span>
                      <div className="flex gap-x-[3px] items-center">
                        <span className="text-gray-700 text-sm">445.700</span>
                      </div>
                    </div>
                    <div className="flex items-center w-full justify-end gap-x-2">
                      <span className="text-red-500">=</span>
                      <span className="text-gray-700 text-sm">891.400</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="invoice-grid">
                <div className="invoice-item__header invoice-flexend">
                  <span>Tạm tính:</span>
                </div>
                <div className="invoice-item__header invoice-flexend">
                  <span>891.400</span>
                </div>
              </div>
            </div>
            {/*  */}
            <div className="flex justify-between items-center">
              <Button
                title="Chọn thêm sản phẩm"
                type="submit"
                className="bg-primaryBtn"
              >
                <i className="bi text-base text-secondary bi-chevron-double-left"></i>
              </Button>
              <Button
                title="Xóa đơn hàng"
                type="submit"
                className="bg-primaryBtn"
              >
                <i className="bi text-base text-secondary bi-trash"></i>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </CheckoutStyled>
  );
}
const CheckoutStyled = styled.div`
  .checkout-form__control {
    border: 1px solid #d1d1d1;
    padding: 1rem;
  }
  .invoice-container {
    border-left: 1px solid #fedbd7;
    border-right: 1px solid #fedbd7;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  .invoice-heading {
    padding: 0.7rem;
    font-size: 1.1rem;
    background-color: #fedbd7;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #002f3f;
  }
  .invoice-grid {
    color: #002f3f;
    display: grid;
    background-color: #fff;
    grid-template-columns: 40px 60px minmax(60px, 1fr) 190px;
    border-bottom: 1px solid #fedbd7;
    &.invoice-firstgrid {
      background-color: #fff1f0;
    }
    &:last-child {
      grid-template-columns: minmax(60px, 1fr) 190px;
      border-bottom: 1px solid #fedbd7;
    }
  }

  .invoice-item__header {
    display: flex;
    align-items: center;
    border-right: 1px solid #fedbd7;
    overflow: hidden;
    padding: 5px;
    justify-content: center;
    &.caculate-total {
      justify-content: space-between;
    }
    &.invoice-flexend {
      justify-content: flex-end;
    }
  }
  .field-input,
  .field-select {
    width: 100%;
  }

  @media screen and (max-width: 768px) {
    .checkout-layout {
      display: flex;
      flex-direction: column;
    }
  }
`;
