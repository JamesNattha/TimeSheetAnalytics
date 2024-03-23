import axiosInstance from 'utils/axios';

const fetchUsers = async (values) => {
  //Use this to fetch Client
  try {
    const fetchUsers = await axiosInstance.post('/user/fetchUser', values).then((response) => {
      return response.data;
    });
    return fetchUsers;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
};
const fetchMyself = async (values) => {
  //Use this to fetch Client
  try {
    const fetchMyself = await axiosInstance.post('/user/fetchMyself', values).then((response) => {
      return response.data;
    });
    return fetchMyself;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
};

export default {
  fetchUsers,
  fetchMyself
};
