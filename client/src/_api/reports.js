import axiosInstance from 'utils/axios';

const fetchReport = async (values) => {
  try {
    const fetchvalue = await axiosInstance.post('/reports/project', values).then((response) => {
      return response.data;
    });
    return fetchvalue;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
};

const fetchUser = async (values) => {
  try {
    const fetchvalue = await axiosInstance.post('/reports/profile', values).then((response) => {
      return response.data;
    });
    return fetchvalue;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
};

const fetchTimesheet = async (values) => {
  try {
    const fetchvalue = await axiosInstance.post('/reports/timesheet', values).then((response) => {
      return response.data;
    });
    return fetchvalue;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
};

const fetchProjectGroup = async (values) => {
  try {
    const fetchvalue = await axiosInstance.post('/reports/group', values).then((response) => {
      return response.data;
    });
    return fetchvalue;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
}

const fetchUserByGroup = async (values) => {
  try {
    const fetchvalue = await axiosInstance.post('/reports/group/user', values).then((response) => {
      return response.data;
    });
    return fetchvalue;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
}

const fetchUserPosition = async (values) => {
  try {
    const fetchvalue = await axiosInstance.post('/reports/position', values).then((response) => {
      return response.data;
    });
    return fetchvalue;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
}

const fetchMonday = async (values) => {
  try {
    const fetchvalue = await axiosInstance.post('/reports/monday', values).then((response) => {
      return response.data;
    });
    return fetchvalue;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
}

export default {
  fetchReport,
  fetchUser,
  fetchTimesheet,
  fetchProjectGroup,
  fetchUserByGroup,
  fetchMonday,
  fetchUserPosition
};
