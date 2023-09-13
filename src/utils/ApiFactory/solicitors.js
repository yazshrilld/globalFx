import Axios from "utils/axios";

export const createSolicitorFn = (payload) => {
  const res = Axios.post(`solicitor`, payload);
  return res;
};

export const updateSolicitorFn = (id) => {
  const res = Axios.put(`solicitor/?${id}`);
  return res;
};

export const updateSolicitorApprovalFn = ({id}, payload) => {
  const res = Axios.patch(`solicitor/?${id}`, payload);
  return res;
};

export const solicitorReportFn = ({id, payload}) => {
  const res = Axios.post(`solicitor/report/${id}`, payload);
  return res;
};

export const resetSolicitorPasswordFn = (payload) => {
  const res = Axios.post("user/reset/", payload);
  return res;
};

export const validateUserFn = (username) => {
  const res = Axios.post(`user/validate/${username}`);
  return res;
};



export const approveSolicitorFn = ({ id, staffEmail, solicitorEmail }) => {
  const res = Axios.patch(
    `solicitor/approve/${id}/${staffEmail}?resetUrl=${
      process.env.REACT_APP_RESET_URL
    }/auth/reset-password/?p=${btoa(solicitorEmail)}`
  );
  return res;
};

export const getAllSolicitorFn = ({ page, size, sortBy, sortOrder }) => {
  const res = Axios.get(
    `solicitor?&page=${page}&size=${size}&sortBy=${sortBy}&sortOrder=${sortOrder}`
  );
  return res;
};

export const getSolicitorsByStatusFn = (status) => {
  const res = Axios.get(`solicitor/status/${status}`);
  return res;
}
