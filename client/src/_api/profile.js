import axiosInstance from 'utils/axios';

const fetchProfile = async (values) => {
  try {
    const fetchvalue = await axiosInstance.post('setting-profile', values).then((response) => {
      return response.data;
    });
    return fetchvalue;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
};

const updateProfile = async (values) => {
  try {
    const fetchvalue = await axiosInstance.post('/update-profile', values).then((response) => {
      return response.data;
    });
    return fetchvalue;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
};

const deleteProfile = async (values) => {
  try {
    const fetchvalue = await axiosInstance.post('delete-profile', values).then((response) => {
      return response.data;
    });
    return fetchvalue;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
};

const resendEmail = async (values) => {
  try {
    const fetchvalue = await axiosInstance.post('resendEmail', values).then((response) => {
      return response.data;
    });
    return fetchvalue;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
};

const updateLevel = async (values) => {
  try {
    const fetchvalue = await axiosInstance.post('update/level', values).then((response) => {
      return response.data;
    });
    return fetchvalue;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
};

const updateRole = async (values) => {
  try {
    const fetchvalue = await axiosInstance.post('update/role', values).then((response) => {
      return response.data;
    });
    return fetchvalue;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
};

const uploadProfile = async (values) => {
  try {
    const fetchvalue = await axiosInstance.post('/upload-profile', values).then((response) => {
      return response.data;
    });
    return fetchvalue;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
};

const uploadSettingProfile = async (values) => {
  try {
    const fetchvalue = await axiosInstance.post('/update-setting-profile', values).then((response) => {
      return response.data;
    });
    return fetchvalue;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
};

const changePassword = async (values) => {
  try {
    const fetchvalue = await axiosInstance.post('/update/change-password', values).then((response) => {
      return response.data;
    });
    return fetchvalue;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
};

const fetchImg = async (values) => {
  try {
    const fetchvalue = await axiosInstance.post('/profile/avatar', values).then((response) => {
      return response.data;
    });
    return fetchvalue;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
};

export default {
  fetchProfile,
  updateProfile,
  deleteProfile,
  resendEmail,
  updateLevel,
  updateRole,
  uploadProfile,
  uploadSettingProfile,
  changePassword,
  fetchImg
};
