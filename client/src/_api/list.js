
import axiosInstance from 'utils/axios';

const fetchwork = async (values) => {
  try {
    const fetchvalue = await axiosInstance.post('/list/getwork', values).then((response) => {
      return response.data;
    });
    return fetchvalue;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
};

const fetchUsers = async (values) => {
    try {
      const fetchvalue = await axiosInstance.post('/list', values).then((response) => {
        return response.data;
      });
      return fetchvalue;
    } catch (err) {
      return { isStatus: false, data: null, message: err.message };
    }
  };

  const deleteWork = async (values) => {
    try {
      const fetchvalue = await axiosInstance.post('list/deletework', values).then((response) => {
        return response.data;
      });
      return fetchvalue;
    } catch (err) {
      return { isStatus: false, data: null, message: err.message };
    }
  };

  export default {
    fetchwork,
    fetchUsers,
    deleteWork
  };
  