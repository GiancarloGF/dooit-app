import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://192.168.18.20:3000",
});

export default axiosInstance;
