import axiosInstance from 'utils/axios';

const getImage = async (values) => {
  //Use this to fetch Client
  try {
    const filename = '6d19d4c0-a025-41cf-a898-8a6c78d1d7a3.jpg'
    const getImage = await axiosInstance.post(`/public/avatar/${filename}`, values).then((response) => {
      return response.data;
    });
    return getImage;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
};

export default {
  getImage
};
