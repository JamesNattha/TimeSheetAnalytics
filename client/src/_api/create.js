import axiosInstance from 'utils/axios';

const createGroup = async (values) => {
  try {
    const fetchvalue = await axiosInstance.post('/createdgroup', values).then((response) => {
      return response.data;
    });
    return fetchvalue;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
};

const createDepartment = async (values) => {
  try {
    const fetchvalue = await axiosInstance.post('/createddepartment', values).then((response) => {
      return response.data;
    });
    return fetchvalue;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
};

const createLevel = async (values) => {
  try {
    const fetchvalue = await axiosInstance.post('/createdlevel', values).then((response) => {
      return response.data;
    });
    return fetchvalue;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
};

const createPosition = async (values) => {
  try {
    const fetchvalue = await axiosInstance.post('/createdposition', values).then((response) => {
      return response.data;
    });
    return fetchvalue;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
};

export default { createGroup, createDepartment, createLevel, createPosition };
