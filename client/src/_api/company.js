import axiosInstance from 'utils/axios';

const getGroup = async (values) => {
  try {
    const fetchvalue = await axiosInstance.post('/getgroup', values).then((response) => {
      return response.data;
    });
    return fetchvalue;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
};

const getDepartment = async (values) => {
  try {
    const fetchvalue = await axiosInstance.post('/getdepartment', values).then((response) => {
      return response.data;
    });
    return fetchvalue;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
};

const getPosition = async (values) => {
  try {
    const fetchvalue = await axiosInstance.post('/getposition', values).then((response) => {
      return response.data;
    });
    return fetchvalue;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
};

const updateDepartment = async (values) => {
  try {
    const fetchvalue = await axiosInstance.post('/update/department', values).then((response) => {
      return response.data;
    });
    return fetchvalue;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
};

const updatePosition = async (values) => {
  try {
    const fetchvalue = await axiosInstance.post('/update/position', values).then((response) => {
      return response.data;
    });
    return fetchvalue;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
};

const updateGroup = async (values) => {
  try {
    const fetchvalue = await axiosInstance.post('/update/group', values).then((response) => {
      return response.data;
    });
    return fetchvalue;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
};

const deleteDepartment = async (values) => {
  try {
    const fetchvalue = await axiosInstance.post('/delete/department', values).then((response) => {
      return response.data;
    });
    return fetchvalue;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
};

const deletePosition = async (values) => {
  try {
    const fetchvalue = await axiosInstance.post('/delete/position', values).then((response) => {
      return response.data;
    });
    return fetchvalue;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
};

const deleteGroup = async (values) => {
  try {
    const fetchvalue = await axiosInstance.post('/delete/group', values).then((response) => {
      return response.data;
    });
    return fetchvalue;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
};

export default {
  getGroup,
  getDepartment,
  getPosition,
  updateDepartment,
  updatePosition,
  updateGroup,
  deleteDepartment,
  deletePosition,
  deleteGroup
};
