import axiosInstance from "utils/axios";


const updateSendto = async (values) => {
    try {
      const fetchvalue = await axiosInstance.post('/assign/update', values).then((response) => {
        return response.data;
      });
      return fetchvalue;
    } catch (err) {
      return { isStatus: false, data: null, message: err.message };
    }
  };

export default {updateSendto};
