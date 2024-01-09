import axiosConfig from "./apiConfig";

export default async function refreshAccessToken() {
  try {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) {
      throw new Error("No refresh token found");
    }
    const response = await axiosConfig.post(
      "http://localhost:3000/api/refresh-token",
      {
        refreshToken,
      }
    );
    if (response.status === 200) {
      return response.data.access_token;
    } else {
      throw new Error("Failed to refresh access token");
    }
  } catch (error) {
    console.error("Failed to refresh access token: ", error);
    throw error;
  }
}
