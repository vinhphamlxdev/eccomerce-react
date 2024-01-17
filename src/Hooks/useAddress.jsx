import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllAddress } from "../services/AddressApi";

export default function useAddress(setFormValue, clearErrors) {
  const [provinceValue, setProvinceValue] = React.useState("");
  const [districtValue, setDistrictValue] = React.useState("");
  const [districts, setDistricts] = React.useState([]);

  const { data: provicesData } = useQuery({
    queryKey: ["provices"],
    onSuccess: () => {},
    queryFn: () => getAllAddress(),
    onError: (err) => {
      console.log(err);
    },
  });

  const handleChangeProvinces = (e) => {
    const provinceName = e.target.value;
    setFormValue("districtAddress", "");
    if (!provinceName) {
      setProvinceValue("");
      setDistricts([]);
    }
    setProvinceValue(provinceName);
    if (provinceName) {
      clearErrors("cityAddress");
      const currProvince = provicesData.find(
        (province) => province.name === provinceName
      );
      if (currProvince) {
        setDistricts(currProvince.districts);
      }
    }
    setDistrictValue("");
  };
  const handleChangeDistricts = (e) => {
    const districtName = e.target.value;
    if (districtName) {
      clearErrors("districtAddress");
      setDistrictValue(districtName);
    }
  };
  return {
    handleChangeProvinces,
    handleChangeDistricts,
    provinceValue,
    districtValue,
    districts,
    setDistrictValue,
    setProvinceValue,
    provicesData,
    setDistricts,
  };
}
