import axiosInstance from 'utils/axios';

const createTimeSheet = async (values) => {
  try {
    const createTimeSheet = await axiosInstance.post('timesheet/create', values).then((response) => {
      return response.data;
    });
    return createTimeSheet;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
};

const fetchTimeSheetByDate = async (values) => {
  try {
    const fetchvalue = await axiosInstance.post('timesheet/fetchTimeSheetByDate', values).then((response) => {
      return response.data;
    });
    return fetchvalue;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
};

const deleteTimeSheet = async (values) => {
  try {
    const fetchvalue = await axiosInstance.post('timesheet/deleteTimeSheet', values).then((response) => {
      return response.data;
    });
    return fetchvalue;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
};

const updateTimeSheet = async (values) => {
  try {
    const fetchvalue = await axiosInstance.post('timesheet/updateTimeSheet', values).then((response) => {
      return response.data;
    });
    return fetchvalue;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
};

const createWorkno = async (values) => {
  try {
    const createWorkno = await axiosInstance.post('timesheet/create', values).then((response) => {
      return response.data;
    });
    return createWorkno;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
};

export default {
  createWorkno,
  createTimeSheet,
  fetchTimeSheetByDate,
  deleteTimeSheet,
  updateTimeSheet
};
