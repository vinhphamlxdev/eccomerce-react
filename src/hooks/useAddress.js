import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { getAllDistrict, getAllProvince } from "../services/AddressApi";

export default function useAddress(setFormValue, clearErrors) {
  const [provinceValue, setProvinceValue] = React.useState("");
  const [districtValue, setDistrictValue] = React.useState("");
  const [districts, setDistricts] = React.useState([]);
  const [isFetchingAddress, setIsFetchingAddress] = React.useState(false);

  const { data: provincesData } = useQuery({
    queryKey: ["provices"],
    queryFn: () => getAllProvince(),
    staleTime: Infinity,
    onError: (err) => {
      console.log(err);
    },
  });
  const handleChangeProvinces = async (e) => {
    const provinceName = e.target.value;
    if (!provinceName) {
      setProvinceValue("");
      setDistricts([]);
    }
    setProvinceValue(provinceName);
    if (provinceName) {
      //call api to get array district
      const provinceId = provincesData?.results.find(
        (province) => province.province_name === provinceName
      )?.province_id;
      clearErrors("provinceAddress");
      setIsFetchingAddress(true);
      if (provinceId) {
        const response = await getAllDistrict(provinceId);
        response?.results && setDistricts(response?.results);
      }
      setIsFetchingAddress(false);
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
    provincesData: provincesData?.results || [],
    setDistricts,
    isFetchingAddress,
  };
}
