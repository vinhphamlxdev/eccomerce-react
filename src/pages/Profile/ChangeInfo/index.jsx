import React, { useEffect, useState } from "react";
import Button from "../../../components/Button";
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  changePasswordValidate,
  infoValidate,
} from "../../../common/validateSchema";
import Field from "../../../components/Field/Field";
import Input from "../../../components/Input/Input";
import useAddress from "../../../Hooks/useAddress";
import Select from "../../../components/Select";
import { getAllAddress } from "../../../services/AddressApi";
import { RxUpdate } from "react-icons/rx";
import { useSelector } from "react-redux";

const objUser = {
  fullName: "vinhpham",
  phoneNumber: "0345678978",
  address: "Tran Hung Dao",
  cityAddress: "Thành phố Hồ Chí Minh",
  districtAddress: "Quận 12",
};
export default function ChangeInfo({ setIsEdit }) {
  const userInfo = useSelector((state) => state.auth.userInfo);
  console.log(userInfo);
  const {
    control,
    handleSubmit,
    clearErrors,
    reset,
    setValue: setFormValue,
    register,
    getValues,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(infoValidate),
  });
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
  const handleChangeInfo = async (data) => {
    console.log(data);
  };

  useEffect(() => {
    const newArrInfo = Object.entries(userInfo);
    for (const arrVal of newArrInfo) {
      const [key, value] = arrVal;
      setFormValue(key, value);
    }
    setProvinceValue(objUser.cityAddress);
    // setDistrictValue(objUser.districtAddress);
  }, []);
  const handleChange = (e, keyName) => {
    const value = e.target.value;
    setFormValue(keyName, value);
  };

  return (
    <div className="p-4 flex flex-col gap-y-1">
      <form
        onSubmit={handleSubmit(handleChangeInfo)}
        className="edit-infomation"
        action=""
      >
        <Field style={{ marginBottom: "8px" }}>
          <div className="label">Họ tên</div>
          <div className="relative w-full mt-1">
            <Input
              onChange={(e) => handleChange(e, "fullName")}
              name="fullName"
              control={control}
            />
            <span className="absolute text-errBg text-sm right-[-10px] top-0">
              *
            </span>
          </div>
          <span className="text-xs font-normal text-red-600">
            {errors?.fullName?.message}
          </span>
        </Field>
        <Field style={{ marginBottom: "8px" }}>
          <div className="label">Điện thoại</div>
          <div className="relative w-full mt-1">
            <Input
              onChange={(e) => handleChange(e, "phoneNumber")}
              name="phoneNumber"
              control={control}
            />
            <span className="absolute text-errBg text-sm right-[-10px] top-0">
              *
            </span>
          </div>
          <span className="text-xs font-normal text-red-600">
            {errors?.phoneNumber?.message}
          </span>
        </Field>
        <Field style={{ marginBottom: "8px" }}>
          <div className="label">Địa chỉ</div>
          <div className="relative w-full mt-1">
            <Input
              onChange={(e) => handleChange(e, "address")}
              name="address"
              control={control}
            />
            <span className="absolute text-errBg text-sm right-[-10px] top-0">
              *
            </span>
          </div>
          <span className="text-xs font-normal text-red-600">
            {errors?.address?.message}
          </span>
        </Field>
        <Field style={{ marginBottom: "8px" }}>
          <div className="label">Tỉnh thành</div>
          <div className="relative w-full mt-1">
            <Select
              data={provicesData}
              control={control}
              onChange={handleChangeProvinces}
              name="cityAddress"
              register={register}
              label="Chọn tỉnh thành"
              value={provinceValue}
            />
            <span className="absolute text-errBg text-sm right-[-10px] top-0">
              *
            </span>
          </div>
          <span className="text-xs font-normal text-red-600">
            {errors?.cityAddress?.message}
          </span>
        </Field>
        <Field style={{ marginBottom: "8px" }}>
          <div className="label">Quận huyện</div>
          <div className="relative w-full mt-1">
            <Select
              data={districts}
              control={control}
              onChange={handleChangeDistricts}
              name="districtAddress"
              register={register}
              label="Chọn quận huyện"
              value={districtValue}
            />
            <span className="absolute text-errBg text-sm right-[-10px] top-0">
              *
            </span>
          </div>
          <span className="text-xs font-normal text-red-600">
            {errors?.districtAddress?.message}
          </span>
        </Field>
        <div className="mt-4 flex justify-center items-center gap-x-3">
          <Button type="submit" title="Cập nhật">
            <RxUpdate className="text-base text-secondary" />
          </Button>
          <Button
            onClick={() =>
              setIsEdit((prev) => ({
                ...prev,
                isEditContactInfo: false,
              }))
            }
            title="Hủy"
          >
            <i className="bi bi-x-lg text-base text-secondary"></i>
          </Button>
        </div>
      </form>
    </div>
  );
}
