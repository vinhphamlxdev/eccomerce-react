import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { getAllAddress } from "../services/AddressApi";

export default function useAddress(setFormValue, clearErrors) {
  const [provinceValue, setProvinceValue] = React.useState("");
  const [districtValue, setDistrictValue] = React.useState("");
  const [districts, setDistricts] = React.useState([]);

  const { data: provincesData } = useQuery({
    queryKey: ["provices"],
    onSuccess: () => {},
    queryFn: () => getAllAddress(),
    onError: (err) => {
      console.log(err);
    },
  });

  const handleChangeProvinces = (e) => {
    const provinceName = e.target.value;
    if (!provinceName) {
      setProvinceValue("");
      setDistricts([]);
    }
    setProvinceValue(provinceName);
    if (provinceName) {
      clearErrors("cityAddress");
      const currProvince = provincesData.find(
        (province) => province.name === provinceName
      );
      if (currProvince) {
        setDistricts(currProvince.districts);
      }
    }
    setDistrictValue("");
    setFormValue("districtAddress", "");
  };
  const handleChangeDistricts = (e) => {
    const districtName = e.target.value;
    if (districtName) {
      clearErrors("districtAddress");
      setDistrictValue(districtName);
    }
  };
  //

  return {
    handleChangeProvinces,
    handleChangeDistricts,
    provinceValue,
    districtValue,
    districts,
    setDistrictValue,
    setProvinceValue,
    provincesData,
    setDistricts,
  };
}
