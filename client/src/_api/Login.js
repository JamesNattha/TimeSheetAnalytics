import axiosInstance from 'utils/axios';


const userLogin = async (values) => {
  try {
    const login = await axiosInstance.post('login', values).then((response) => {
      console.log(response)
      if (response.data.message === "it's Not your Time") {
        return response.data;
      } else {
        localStorage.setItem('accessToken', response.data.data.token);
        return response.data.data;
      }
    });
    return login;
  } catch (err) {
    return { isStatus: false ,data: null, message: err.message };
  }
};

const onAuthApi = () => {
  try {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post('login/onauth', { token: localStorage.getItem('accessToken') })
        .then((response) => {
          resolve(response);
        })
        .catch((err) => reject(err));
    });
  } catch (err) {
    return { isStatus: false };
  }
};

const userRegister = async (values) => {
  try {
    const register = await axiosInstance.post('/register', values).then((response) => {
      return response.data;
    });
    console.log(register)
    return register;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
};

const userActivate = async (values) => {
  try {
    const response = await axiosInstance.post('activate', values);
    return response.data;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
};

const forgotPassword = async (values) => {
  try {
    const response = await axiosInstance.post('forgotpassword', values);
    return response.data;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
};

const resetPassword = async (values) => {
  try {
    const response = await axiosInstance.post('resetpassword', values);
    return response.data;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
};

export default {
  userLogin,
  onAuthApi,
  userRegister,
  userActivate,
  forgotPassword,
  resetPassword
};
