import Axios from "utils/axios";

export const fileFn = async (fileName) => {
  const res = await Axios.get(`file?fileName=${fileName}`);
  return res;
};
