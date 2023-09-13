import Axios from "utils/axios";

export const legalStatisticsFn = () => {
  const res = Axios.get("statistics");
  return res;
};

export const csoStatisticsFn = (csoEmail) => {
  const res = Axios.get(`statistics/cso/${csoEmail}`);
  return res;
};

export const solicitorStatisticsFn = (id) => {
  const res = Axios.get(`statistics/solicitor/${id}`);
  return res;
};
