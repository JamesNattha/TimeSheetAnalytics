import axiosInstance from 'utils/axios';

const getEnum = async (values) => {
  //Use this to fetch Client
  try {
    const getEnum = await axiosInstance.post('/enum/getEnum', values).then((response) => {
      return response.data;
    });
    return getEnum;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
};

const getEnumLevel = async (values) => {
  //Use this to fetch Client
  try {
    const getEnumLevel = await axiosInstance.post('/enum/level', values).then((response) => {
      return response.data;
    });
    return getEnumLevel;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
};

const getEnumGender = async (values) => {
  //Use this to fetch Client
  try {
    const getEnumLevel = await axiosInstance.post('/enum/gender', values).then((response) => {
      return response.data;
    });
    return getEnumLevel;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
};

const getEnumCalendar = async (values) => {
  //Use this to fetch Client
  try {
    const getEnumLevel = await axiosInstance.post('/enum/calendar', values).then((response) => {
      return response.data;
    });
    return getEnumLevel;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
};

export default {
  getEnum,
  getEnumLevel,
  getEnumGender,
  getEnumCalendar
};
