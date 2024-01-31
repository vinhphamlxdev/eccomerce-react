import axios from "axios";
// export const getAllAddress = async () => {
//   const response = await axios.get(
//     `https://provinces.open-api.vn/api/?depth=2`
//   );
//   return response.data;
// };
export const getAllProvince = async () => {
  const response = await axios.get(`https://vapi.vnappmob.com/api/province`);
  return response.data;
};
export const getAllDistrict = async (provinceId) => {
  const response = await axios.get(
    `https://vapi.vnappmob.com/api/province/district/${provinceId}`
  );
  return response.data;
};
