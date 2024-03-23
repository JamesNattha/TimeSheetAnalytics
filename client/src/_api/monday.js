import axiosInstance from 'utils/axios';

const fetchMonday121 = async (values) => {
  try {
    const fetchMonday = await axiosInstance.post('/monday', values).then((response) => {
      return response.data;
    });
    return fetchMonday;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
};

const fetchUser = async (values) => {
  try {
    const fetchUser = await axiosInstance.post('/user/fetchUser', values).then((response) => {
      return response.data;
    });
    return fetchUser;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
};

const getBoardId = async (values) => {
  try {
    const getBoardId = await axiosInstance.post('/monday/getBoardId', values).then((response) => {
      return response.data;
    });
    return getBoardId;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
};

const fetchMondayUser = async (values) => {
  try {
    const fetchMondayUser = await axiosInstance.post('/monday/fetchMondayUser', values).then((response) => {
      return response.data;
    });
    return fetchMondayUser;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
};

const fetchDataAll = async (values) => {
  try {
    const fetchMondayUser = await axiosInstance.post('/monday/getDataAll', values).then((response) => {
      return response.data;
    });
    return fetchMondayUser;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
};

const fetchAllUser = async (values) => {
  try {
    const fetchMondayUser = await axiosInstance.post('/user/fetchAllUser', values).then((response) => {
      return response.data;
    });
    return fetchMondayUser;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
};

const fetchMonday = async (values) => {
  try {
    const fetchMondayUser = await axiosInstance.post('/monday/fetchMonday', values).then((response) => {
      return response.data;
    });
    return fetchMondayUser;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
};

const createMonday = async (values) => {
  try {
    const createMonday = await axiosInstance.post('/monday/createMonday', values).then((response) => {
      return response.data;
    });
    return createMonday;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
};

const userProject = async (values) => {
  try {
    const createMonday = await axiosInstance.post('/monday/getProject', values).then((response) => {
      return response.data;
    });
    return createMonday;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
};

export default {
  fetchMonday121,
  getBoardId,
  fetchMondayUser,
  fetchDataAll,
  fetchUser,
  fetchAllUser,
  createMonday,
  fetchMonday,
  userProject
};
