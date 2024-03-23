import { validateDate } from '@mui/x-date-pickers/internals';
import axiosInstance from 'utils/axios';

const sendEmail = async (values) => {
  try {
    const fetchvalue = await axiosInstance.post('/sendinvite/', values).then((response) => {
      return response.data;
    });
    return fetchvalue;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
};

const sendConfirm = async (values) => {
  try {
    const fetchvalue = await axiosInstance.post('/sendconfirm/', values).then((response) => {
      return response.data;
    });
    return fetchvalue;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
};

const sendReset = async (values) => {
  try {
    const fetchvalue = await axiosInstance.post('/password/reset', values)
      .then((response) => {
        return response.data;
      });
    return fetchvalue;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
};

export default { sendEmail, sendConfirm, sendReset };
