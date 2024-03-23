import axiosInstance from "utils/axios";

const getfetchDepartment = async (values) => {
    try {
      const department = await axiosInstance.post('/setting/team/department', values).then((response) => {
        return response.data;
      });
      return department;
    } catch (err) {
      return { isStatus: false };
    }
  };

  const getfetchGroup = async (values) => {
    try {
      const group = await axiosInstance.post('/setting/team/group', values).then((response) => {
        return response.data;
      });
      return group;
    } catch (err) {
      return { isStatus: false };
    }
  };

  const createProject = async (values) => {
    try {
      const group = await axiosInstance.post('/setting/create/project-team', values).then((response) => {
        return response.data;
      });
      return group;
    } catch (err) {
      return { isStatus: false };
    }
  };

  const userProject = async (values) => {
    try {
      const group = await axiosInstance.post('/setting/team/fetch-user', values).then((response) => {
        return response.data;
      });
      return group;
    } catch (err) {
      return { isStatus: false };
    }
  };

  const getteamProject = async (values) => {
    try {
      const team = await axiosInstance.post('/setting/team/fetch-team-project', values).then((response) => {
        return response.data;
      });
      return team;
    } catch (err) {
      return { isStatus: false };
    }
  };

 
  export default {
    getfetchDepartment,
    getfetchGroup,
    createProject,
    userProject,
    getteamProject
  }