import { jwtDecode } from "jwt-decode";
export const isTokenExpired = (token = "") => {
  if (!token) {
    return true;
  }
  const decodedToken = jwtDecode(token);
  const currentTime = Math.floor(Date.now() / 1000);
  const tokenTime = decodedToken?.exp;
  return tokenTime < currentTime;
};
