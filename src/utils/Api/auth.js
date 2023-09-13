import Axios from "utils/axios";

export const providusLoginFn = async (payload) => {
  const res = await Axios.post(`/login`, payload);
  return res;
};
