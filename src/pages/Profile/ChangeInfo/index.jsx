import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { set, useForm } from "react-hook-form";
import { RxUpdate } from "react-icons/rx";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import useAddress from "../../../hooks/useAddress";
import Button from "../../../components/Button";
import Field from "../../../components/Field/Field";
import Input from "../../../components/Input/Input";
import Select from "../../../components/Select";
import { updateContactInfo } from "../../../services/UserApi";
import { PHONE_REG_EXP } from "../../../common/constants";
import LoadingSpinner from "../../../components/Loading/LoadingSreen";
import { toast } from "react-toastify";
import { setRender } from "../../../store/auth/authSlice";
import { getAllDistrict } from "../../../services/AddressApi";
//change info validate
export const infoValidate = Yup.object({
  fullName: Yup.string().required("Vui lòng nhập họ tên!"),
  phoneNumber: Yup.string()
    .matches(PHONE_REG_EXP, "Vui lòng nhập đúng định dạng số điện thoại!")
    .required("Vùi lòng nhập số điện thoại!"),
  address: Yup.string().required("Vui lòng nhập địa chỉ!"),
  provinceAddress: Yup.string().required("Vui lòng chọn tỉnh thành!"),
  districtAddress: Yup.string().required("Vui lòng chọn quận huyện!"),
});
export default function ChangeInfo({ setIsEdit }) {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth?.userInfo);
  const addressValues = userInfo?.address;
  const arrAddress = addressValues.split(", ").reverse();
  const [provinceAddress, districtAddress, ...address] = arrAddress;

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
    defaultValues: {
      fullName: userInfo?.fullName,
      phoneNumber: userInfo?.phoneNumber.replace("+84", ""),
      address: address.reverse().join(", "),
      provinceAddress: provinceAddress?.trim(),
      districtAddress: districtAddress?.trim(),
    },
  });
  const {
    isFetchingAddress,
    handleChangeDistricts,
    handleChangeProvinces,
    districtValue,
    districts,
    provinceValue,
    provincesData,
    setProvinceValue,
    setDistrictValue,
    setDistricts,
    setIsFetchingAddress,
  } = useAddress(setFormValue, clearErrors);
  const mutation = useMutation({
    mutationFn: (updateData) => updateContactInfo(updateData),
    onSuccess: (data) => {
      setIsEdit((prev) => ({
        ...prev,
        isEditContactInfo: false,
      }));
      toast.success("Cập nhật thông tin thành công!");
      reset();
      dispatch(setRender());
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleChangeInfo = (data) => {
    const {
      fullName,
      email,
      phoneNumber,
      address,
      districtAddress,
      provinceAddress,
    } = data;

    const updateData = {
      email: email,
      phone: `+84${phoneNumber}`,
      name: fullName,
      address: `${address}, ${districtAddress}, ${provinceAddress}`,
    };

    mutation.mutate(updateData);
  };

  useEffect(() => {
    const provinceId = provincesData.find(
      (item) => item.province_name === provinceAddress.trim()
    )?.province_id;
    if (!provinceId) return;
    const getDistricts = async () => {
      const response = await getAllDistrict(provinceId);
      console.log(response?.results);
      setDistricts(response?.results);
    };
    getDistricts();
  }, [provincesData]);
  const handleChange = (e, keyName) => {
    const value = e.target.value;
    setFormValue(keyName, value);
  };

  return (
    <div className="p-4 flex flex-col gap-y-1">
      {mutation.isLoading && <LoadingSpinner />}
      {isFetchingAddress && <LoadingSpinner />}
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
        {/*  */}

        {/*  */}
        <Field style={{ marginBottom: "8px" }}>
          <div className="label">Tỉnh thành</div>
          <div className="relative w-full mt-1">
            <Select
              data={provincesData}
              control={control}
              onChange={handleChangeProvinces}
              name="provinceAddress"
              register={register}
              label="Chọn tỉnh thành"
              value={provinceValue || provinceAddress}
              keyName="province_name"
              keyId="province_name"
            />
            <span className="absolute text-errBg text-sm right-[-10px] top-0">
              *
            </span>
          </div>
          <span className="text-xs font-normal text-red-600">
            {errors?.provinceAddress?.message}
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
              value={districtValue || districtAddress}
              keyName="district_name"
              keyId="district_name"
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
