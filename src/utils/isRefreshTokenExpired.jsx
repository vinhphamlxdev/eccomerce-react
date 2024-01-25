import { jwtDecode } from "jwt-decode";
export const isRefreshTokenExpired = (refreshToken = "") => {
  if (!refreshToken) {
    return true;
  }
  const decodedrefreshToken = jwtDecode(refreshToken);
  const currentTime = Math.floor(Date.now() / 1000);
  const tokenTime = decodedrefreshToken?.exp;
  return tokenTime < currentTime;
};
