import axiosInstance from 'utils/axios';

const inviteUser = async (values) => {
  try {
    const invite = await axiosInstance.post('/created', values).then((response) => {
      return response.data;
    });
    return invite;
  } catch (err) {
    return { isStatus: false };
  }
};

const getDepartment = async (values) => {
    try {
      const invite = await axiosInstance.post('/created/department', values).then((response) => {
         return response.data;
      });
      return invite;
    } catch (err) {
      return { isStatus: false };
    }
  };

  const getGender = async (values) => {
    try {
      const invite = await axiosInstance.post('/created/gender', values).then((response) => {
         return response.data;
      });
      return invite;
    } catch (err) {
      return { isStatus: false };
    }
  };

  const getGroup = async (values) => {
    try {
      const invite = await axiosInstance.post('/created/group', values).then((response) => {
         return response.data;
      });
      return invite;
    } catch (err) {
      return { isStatus: false };
    }
  };

  const getLevel = async (values) => {
    try {
      const invite = await axiosInstance.post('/created/level', values).then((response) => {
         return response.data;
      });
      return invite;
    } catch (err) {
      return { isStatus: false };
    }
  };

  const getPosition = async (values) => {
    try {
      const invite = await axiosInstance.post('/created/position', values).then((response) => {
         return response.data;
      });
      return invite;
    } catch (err) {
      return { isStatus: false };
    }
  };

  const getProfile = async (values) => {
    try {
      const invite = await axiosInstance.post('/created/profile', values).then((response) => {
         return response.data;
      });
      return invite;
    } catch (err) {
      return { isStatus: false };
    }
  };

export default {
    inviteUser,
    getDepartment,
    getGender,
    getGroup,
    getLevel,
    getPosition,
    getProfile
}