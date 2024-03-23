import axiosInstance from 'utils/axios';

const roleCreate = async (values) => {
  try {
    const fetchvalue = await axiosInstance.post('/role/createrole', values).then((response) => {
      return response.data;
    });
    return fetchvalue;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
};

const RoleTable = async (values) => {
  try {
    const fetchvalue = await axiosInstance.post('/role', values).then((response) => {
      return response.data;
    });
    return fetchvalue;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
};

const RolefetchTable = async (values) => {
  try {
    const fetchvalue = await axiosInstance.post('/role/fetch', values).then((response) => {
      return response.data;
    });
    return fetchvalue;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
};

const UpdateRole = async (values) => {
  try {
    const fetchvalue = await axiosInstance.post('/role/update', values).then((response) => {
      return response.data;
    });
    return fetchvalue;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
};

const getMyRole = async (values) => {
  try {
    const fetchvalue = await axiosInstance.post('/role/getmyrole', values).then((response) => {
      return response.data;
    });
    return fetchvalue;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
};

export default {
  RoleTable,
  roleCreate,
  RolefetchTable,
  UpdateRole,
  getMyRole
};

