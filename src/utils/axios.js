import axios from "axios";

const Axios = axios.create({
  baseUrl: process.env.REACT_APP_AD_VERIFY,
});

Axios.interceptors.request.use(
  function (config) {
    const token = JSON.parse(sessionStorage.getItem("token"));
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default Axios
