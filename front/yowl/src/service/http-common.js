import axios from "axios";
import store from "@/store";

const axiosClient = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true,
  headers: {
   // Authorization: 'token',
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})


axiosClient.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${store.state.currentUser.token}`
  return config;
})

export default axiosClient;