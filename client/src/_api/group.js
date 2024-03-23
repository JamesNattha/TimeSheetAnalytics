import axiosInstance from 'utils/axios';

const getGroup = async (values) => {
  //Use this to fetch Client
  try {
    const getGroup = await axiosInstance.post('/group/getGroup', values).then((response) => {
      return response.data;
    });
    return getGroup;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
};

export default {
  getGroup
};