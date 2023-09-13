import Axios from "utils/axios";

export const solicitorLoginFn = async (payload) => {
  const res = await Axios.post("user/login", payload);
  return res;
};

export const setPasswordFn = async (payload) => {
  const res = await Axios.post("user/reset", payload);
  return res;
};

export const validateUserFn = async (username) => {
  const res = await Axios.post(`user/validate/${username}`)
  return res;
}
