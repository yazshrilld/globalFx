import Axios from "utils/axios";

export const getAllRequestFn = ({ page, size, sortBy, sortOrder }) => {
  const res = Axios.get(
    `request?&page=${page}&size=${size}&sortBy=${sortBy}&sortOrder=${sortOrder}`
  );
  return res;
};

export const getAllRequestByStatusFn = ({ page, size, sortBy, sortOrder, status }) => {
  const res = Axios.get(
    `request?&page=${page}&size=${size}&sortBy=${sortBy}&sortOrder=${sortOrder}&status=${status}`
  );
  return res;
};

export const getRequestByCSOFn = async ({
  email,
  page,
  size,
  sortBy,
  sortOrder,
}) => {
  const res = await Axios.get(
    `request/cso?&email=${email}&page=${page}&size=${size}&sortBy=${sortBy}&sortOrder=${sortOrder}`
  );
  return res;
};

export const getRequestByCSOFnByStatus = async ({
  email,
  page,
  size,
  sortBy,
  sortOrder,
  status
}) => {
  const res = await Axios.get(
    `request/cso?&email=${email}&page=${page}&size=${size}&sortBy=${sortBy}&sortOrder=${sortOrder}&status=${status}`
  );
  return res;
};

export const getRequestBySolicitorFn = async ({
  page,
  size,
  solicitorId,
  sortBy,
  sortOrder,
}) => {
  const res = await Axios.get(
    `request/solicitor?page=${page}&size=${size}&solicitorId=${solicitorId}&sortBy=${sortBy}&sortOrder=${sortOrder}`
  );
  return res;
};
export const createRequestFn = (payload) => {
  const res = Axios.post(`request`, payload);
  return res;
};

export const getSingleRequestFn = (id) => {
  const res = Axios.get(`request/?${id}`);
  return res;
};

export const updateRequestFn = (id) => {
  const res = Axios.put(`request/?${id}`);
  return res;
};

export const updateRequestStatusFn = ({ id, payload }) => {
  const res = Axios.patch(`request/${id}`, payload);
  return res;
};

export const assignRequestToSolicitorFn = async ({
  id,
  solicitorId,
  staffUsername,
}) => {
  const res = await Axios.patch(
    `request/assign/${id}?solicitorId=${solicitorId}&staffUsername=${staffUsername}`
  );
  return res;
};

export const getCompletedRequestBySolicitor = async ({page,
  size,
  solicitorId,
  sortBy,
  sortOrder,status}) => {
  const res = await Axios.get(`request/solicitor?page=${page}&size=${size}&solicitorId=${solicitorId}&sortBy=${sortBy}&sortOrder=${sortOrder}&status=${status}`)
  return res;
}