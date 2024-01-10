import * as React from "react";
import { styled } from "styled-components";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Controller, useForm, useFormContext } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Field } from "../../components/Field";
import { Input } from "../../components/Input";
import useDisabled from "../../Hooks/useDisabled";
import axios from "axios";
import { LoadingButton } from "../../components/Loading";
import Select from "../../components/Select";
import { getAllAddress } from "../../services/AddressApi";
import { useQuery } from "@tanstack/react-query";
import BreadCrumb from "../../components/BreadCrumb";
import HeadingSession from "../../components/HeadingSession";
import useAddress from "../../Hooks/useAddress";
const breadcrumbPaths = [
  { label: "Trang chủ", url: "/" },
  { label: "Đăng ký", url: "/signup" },
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
export default function SignUp() {
  const navigate = useNavigate();
  const [districts, setDistricts] = React.useState([]);
  const [provinceValue, setProvinceValue] = React.useState("");
  const [districtValue, setDistrictValue] = React.useState("");
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

  const { data: provicesData } = useQuery({
    queryKey: ["provices"],
    onSuccess: () => {},
    queryFn: () => getAllAddress(),
    onError: (err) => {
      console.log(err);
    },
  });
  const handleSignUp = async (data) => {
    console.log(data);
    const { fullName, phoneNumber, email, password, address, cityAddress } =
      data;
  };

  const handleChangeProvinces = (e) => {
    const provinceName = e.target.value;
    setProvinceValue(provinceName);
    setDistrictValue("");
    if (provinceName) {
      delete errors.cityAddress;
      const currProvince = provicesData.find(
        (province) => province.name === provinceName
      );
      if (currProvince) {
        setDistricts(currProvince.districts);
      }
    }
  };

  const handleChangeDistricts = (e) => {
    const districtName = e.target.value;
    setDistrictValue(districtName);
    if (districtName) {
      setError("districtAddress", { message: "" });
      delete errors.districtAddress;
    }
  };
  const { disabledStyle, isDisabled } = useDisabled(isSubmitting);
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
          <form
            onSubmit={handleSubmit(handleSignUp)}
            action=""
            className="flex flex-col mt-10 form-layout"
          >
            <Field className="grid">
              <span className="text-sm text-right text-[#3B3B3B]">Họ tên</span>
              <Input name="fullName" control={control} />
              <span className="text-xs font-normal text-red-600">
                * {errors?.fullName?.message}
              </span>
            </Field>
            <Field className="grid">
              <span className="text-sm text-right text-[#3B3B3B]">
                Điện thoại
              </span>
              <Input name="phoneNumber" control={control} />
              <span className="text-xs font-normal text-red-600">
                * {errors?.phoneNumber?.message}
              </span>
            </Field>
            <Field className="grid">
              <span className="text-sm text-right text-[#3B3B3B]">Email</span>
              <Input name="email" control={control} />
              <span className="text-xs font-normal text-red-600">
                * {errors?.email?.message}
              </span>
            </Field>
            <Field className="grid">
              <span className="text-sm text-right text-[#3B3B3B]">
                Mật khẩu
              </span>
              <Input name="password" type="password" control={control} />
              <span className="text-xs font-normal text-red-600">
                * {errors?.password?.message}
              </span>
            </Field>
            <Field className="grid">
              <span className="text-sm text-right text-[#3B3B3B]">
                Xác nhận mật khẩu
              </span>
              <Input name="passwordConfirm" type="password" control={control} />
              <span className="text-xs font-normal text-red-600">
                * {errors?.passwordConfirm?.message}
              </span>
            </Field>
            <Field className="grid">
              <span className="text-sm text-right text-[#3B3B3B]">Địa chỉ</span>
              <Input
                placeholder="Số nhà, tên đường, phường/xã"
                name="address"
                control={control}
              />
              <span className="text-xs font-normal text-red-600">
                * {errors?.address?.message}
              </span>
            </Field>
            <Field className="grid">
              <span className="text-sm text-right text-[#3B3B3B]">
                Tỉnh/Thành
              </span>
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
                * {errors?.cityAddress?.message}
              </span>
            </Field>
            <Field className="grid">
              <span className="text-sm text-right text-[#3B3B3B]">
                Quận/Huyện
              </span>
              <Select
                data={districts}
                control={control}
                name="districtAddress"
                register={register}
                onChange={handleChangeDistricts}
                label="Chọn quận huyện"
                value={districtValue}
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
    </StyledSignUp>
  );
}
const StyledSignUp = styled.div`
  .signup-contaner {
    border: 1px solid #b21e02;
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
`;
