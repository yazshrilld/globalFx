import Axios from "utils/axios";

export const fetchFxFn = async ({ startdate, enddate }) => {
  const res = await Axios.get(
    `/fetch?startdate=${startdate}&enddate=${enddate}`
  );
  return res;
};

export const updateStatusFn = async (payload) => {
  const res = await Axios.post(`/start_stop`, payload);
  return res;
};
