import axiosInstance from 'utils/axios';

const fetchUser = async (values) => {
  try {
    const fetchvalue = await axiosInstance.post('/setting/profile', values).then((response) => {
      return response.data;
    });
    return fetchvalue;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
};


export default {
    fetchUser,
}