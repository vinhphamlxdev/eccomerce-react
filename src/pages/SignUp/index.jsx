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
    setValueField,
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
  };

  console.log("render");
  const handleChangeProvinces = (e) => {
    const provinceName = e.target.value;
    if (!provinceName) {
      setProvinceValue("");
      setDistricts([]);
    }
    setProvinceValue(provinceName);
    if (provinceName) {
      delete errors.cityAddress;
      const currProvince = provicesData.find(
        (province) => province.name === provinceName
      );
      if (currProvince) {
        setDistricts(currProvince.districts);
      }
    }
    setDistrictValue("");
  };
  console.log(provinceValue, districtValue, "error", errors);
  const handleChangeDistricts = (e) => {
    const districtName = e.target.value;
    setDistrictValue(districtName);

    // if (districtName) {
    //   setError("districtAddress", { message: "" });
    //   delete errors.districtAddress;
    // }
  };
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
                <div className="text-sm  text-right form-label w-[450px] text-[#3B3B3B]">
                  Họ tên
                </div>
                <div className="flex items-center form-control__input relative gap-x-2">
                  <Input name="fullName" control={control} />
                  <span className="text-xs form-error font-normal text-red-600">
                    * {errors?.fullName?.message}
                  </span>
                </div>
              </Field>
              <Field className="flex">
                <div className="text-sm  text-right form-label w-[450px] text-[#3B3B3B]">
                  Điện thoại
                </div>
                <div className="flex items-center form-control__input relative gap-x-2">
                  <Input name="phoneNumber" control={control} />
                  <span className="text-xs form-error font-normal text-red-600">
                    * {errors?.phoneNumber?.message}
                  </span>
                </div>
              </Field>
              <Field className="flex">
                <div className="text-sm  text-right form-label w-[450px] text-[#3B3B3B]">
                  Email
                </div>
                <div className="flex items-center form-control__input relative gap-x-2">
                  <Input name="email" control={control} />
                  <span className="text-xs form-error font-normal text-red-600">
                    * {errors?.email?.message}
                  </span>
                </div>
              </Field>
              <Field className="flex">
                <div className="text-sm  text-right form-label w-[450px] text-[#3B3B3B]">
                  Mật khẩu
                </div>
                <div className="flex items-center form-control__input relative gap-x-2">
                  <Input name="password" control={control} />
                  <span className="text-xs form-error font-normal text-red-600">
                    * {errors?.password?.message}
                  </span>
                </div>
              </Field>
              <Field className="flex">
                <div className="text-sm  text-right form-label w-[450px] text-[#3B3B3B]">
                  Xác nhận mật khẩu
                </div>
                <div className="flex items-center form-control__input relative gap-x-2">
                  <Input name="passwordConfirm" control={control} />
                  <span className="text-xs form-error font-normal text-red-600">
                    * {errors?.passwordConfirm?.message}
                  </span>
                </div>
              </Field>
              <Field className="flex">
                <div className="text-sm  text-right form-label w-[450px] text-[#3B3B3B]">
                  Địa chỉ
                </div>
                <div className="flex items-center form-control__input relative gap-x-2">
                  <Input name="address" control={control} />
                  <span className="text-xs form-error font-normal text-red-600">
                    * {errors?.address?.message}
                  </span>
                </div>
              </Field>
              <Field className="flex">
                <div className="text-sm  text-right form-label w-[450px] text-[#3B3B3B]">
                  Tỉnh/Thành
                </div>
                <div className="flex items-center form-control__input relative gap-x-2">
                  <Select
                    data={provicesData}
                    control={control}
                    onChange={handleChangeProvinces}
                    name="cityAddress"
                    register={register}
                    label="Chọn tỉnh thành"
                    value={provinceValue}
                  />
                  <span className="text-xs form-error font-normal text-red-600">
                    * {errors?.cityAddress?.message}
                  </span>
                </div>
              </Field>
              <Field className="flex">
                <div className="text-sm  text-right form-label w-[450px] text-[#3B3B3B]">
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
                  <span className="text-xs form-error font-normal text-red-600">
                    * {errors?.districtAddress?.message}
                  </span>
                </div>
              </Field>
              <Field className="flex">
                <div className="text-sm  text-right form-label w-[450px] text-[#3B3B3B]"></div>
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
                  <span className="text-xs form-error font-normal text-red-600"></span>
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
  @media screen and (max-width: 1200px) {
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
    .btn-signup,
    .field-control input[type="text"],
    .field-control input[type="password"],
    .field-control select {
      width: 400px;
    }
  }
  @media screen and (max-width: 768px) {
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
