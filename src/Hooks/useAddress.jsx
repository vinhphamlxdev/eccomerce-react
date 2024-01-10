import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllAddress } from "../services/AddressApi";

export default function useAddress(errors, setError) {
  const [districts, setDistricts] = React.useState([]);
  const { data: provicesData } = useQuery({
    queryKey: ["provinces"],
    onSuccess: () => {},
    queryFn: () => getAllAddress(),
    onError: (err) => {
      console.log(err);
    },
  });
  const handleChangeProvinces = (e) => {
    const provinceName = e.target.value;
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
    if (districtName) {
      setError("districtAddress", { message: "" });
      delete errors.districtAddress;
    }
  };
  return {
    handleChangeProvinces,
    handleChangeDistricts,
    districts,
    provicesData,
  };
}
