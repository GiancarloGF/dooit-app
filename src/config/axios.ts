import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
});

axiosInstance.interceptors.request.use((request) => {
  console.log("Starting Request", JSON.stringify(request, null, 2));
  return request;
});

axiosInstance.interceptors.response.use((response) => {
  console.log("Response:", JSON.stringify(response, null, 2));
  return response;
});

export default axiosInstance;
