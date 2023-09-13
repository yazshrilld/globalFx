import Axios from "utils/axios";
import axios from "axios";


export const providusLoginFn = async (payload) => {
  const res = await Axios.post(`/login`, payload);
  return res;
};


// export const providusLoginFn = async (payload) => {
//   const res = await axios.post(`${process.env.REACT_APP_AD_VERIFY}/login`, payload);
//   return res;
// };