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

const breadcrumbPaths = [
  { label: "Trang chủ", url: "/" },
  { label: "Điền Thông Tin", url: "/checkout" },
];
const REGEX_PASSWORD =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const PHONE_REG_EXP = /^[0-9]{10}$/;
const schemaValidate = Yup.object({
  fullName: Yup.string().required("Vui lòng nhập họ tên!!"),
  phoneNumber: Yup.string()
    .matches(PHONE_REG_EXP, "Vui lòng nhập đúng định dạng số điện thoại!")
    .required("Vùi lòng nhập số điện thoại!"),
  email: Yup.string()
    .email("Email không đúng định dạng!")
    .required("Vui lòng nhập email!!"),
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
});
export default function Checkout() {
  const {
    control,
    handleSubmit,
    register,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schemaValidate),
  });

  const handleSignUp = async (data) => {
    console.log(data);
  };
  const {
    districts,
    handleChangeDistricts,
    handleChangeProvinces,
    provicesData,
  } = useAddress(errors, setError);
  return (
    <CheckoutStyled className="checkout-page">
      <BreadCrumb paths={breadcrumbPaths} />
      <div className="checkout-container border-session">
        <HeadingSection
          title="Vui lòng điền thông tin để tiếp tục mua hàng"
          icon="bi-card-heading"
        />
        <div className="p-3 grid grid-cols-2 gap-x-3">
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
                    onSubmit={handleSubmit(handleSignUp)}
                    action=""
                    className="flex flex-col mt-10 form-layout"
                  >
                    <Field>
                      <span className="text-sm text-right text-[#3B3B3B]">
                        Họ tên
                      </span>
                      <Input name="fullName" control={control} />
                      <span className="text-xs font-normal text-red-600">
                        * {errors?.fullName?.message}
                      </span>
                    </Field>
                    <Field>
                      <span className="text-sm text-right text-[#3B3B3B]">
                        Điện thoại
                      </span>
                      <Input name="phoneNumber" control={control} />
                      <span className="text-xs font-normal text-red-600">
                        * {errors?.phoneNumber?.message}
                      </span>
                    </Field>
                    <Field>
                      <span className="text-sm text-right text-[#3B3B3B]">
                        Email
                      </span>
                      <Input name="email" control={control} />
                      <span className="text-xs font-normal text-red-600">
                        * {errors?.email?.message}
                      </span>
                    </Field>
                    <Field>
                      <span className="text-sm text-right text-[#3B3B3B]">
                        Mật khẩu
                      </span>
                      <Input
                        name="password"
                        type="password"
                        control={control}
                      />
                      <span className="text-xs font-normal text-red-600">
                        * {errors?.password?.message}
                      </span>
                    </Field>
                    <Field>
                      <span className="text-sm text-right text-[#3B3B3B]">
                        Xác nhận mật khẩu
                      </span>
                      <Input
                        name="passwordConfirm"
                        type="password"
                        control={control}
                      />
                      <span className="text-xs font-normal text-red-600">
                        * {errors?.passwordConfirm?.message}
                      </span>
                    </Field>
                    <Field>
                      <span className="text-sm text-right text-[#3B3B3B]">
                        Địa chỉ
                      </span>
                      <Input
                        placeholder="Số nhà, tên đường, phường/xã"
                        name="address"
                        control={control}
                      />
                      <span className="text-xs font-normal text-red-600">
                        * {errors?.address?.message}
                      </span>
                    </Field>
                    <Field>
                      <span className="text-sm text-right text-[#3B3B3B]">
                        Tỉnh/Thành
                      </span>
                      <Select
                        data={provicesData}
                        control={control}
                        onChange={handleChangeProvices}
                        name="cityAddress"
                        register={register}
                      />
                      <span className="text-xs font-normal text-red-600">
                        * {errors?.cityAddress?.message}
                      </span>
                    </Field>
                    <Field>
                      <span className="text-sm text-right text-[#3B3B3B]">
                        Quận/Huyện
                      </span>
                      <Select
                        data={districts}
                        control={control}
                        name="districtAddress"
                        register={register}
                        onChange={handleChangeDistricts}
                      />

                      <span className="text-xs font-normal text-red-600">
                        * {errors?.districtAddress?.message}
                      </span>
                    </Field>
                    <div className="grid grid-cols-3 gap-x-2">
                      <span></span>
                      <div className="btn-signup">
                        <button
                          type="submit"
                          className="bg-bgbtn hover:opacity-75 transition-all text-white py-1 rounded-sm flex items-center px-3 gap-x-2"
                        >
                          <i className="bi text-base text-secondary bi-person-plus-fill"></i>
                          <span className="text-sm">Đăng ký</span>
                        </button>
                      </div>
                      <span></span>
                    </div>
                  </form>
                </div>
              </div>
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
`;
