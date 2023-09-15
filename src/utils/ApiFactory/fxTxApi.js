import dayjs from "dayjs";
import Axios from "utils/axios";

export const fetchFxFn = async ({ startdate, enddate }) => {
  const res = await Axios.get(
    `/fetch?startdate=${dayjs(startdate).format('DD-MMM-YYYY')}&enddate=${dayjs(enddate).format('DD-MMM-YYYY')}`
  );
  return res;
};

export const updateStatusFn = async (payload) => {
  const res = await Axios.post(`/start_stop`, payload);
  return res;
};
