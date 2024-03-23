import axiosInstance from "utils/axios";

//------------------------------------------------------------- Fetch Data Zone -------------------------------------------------------------
const fetchDataClient = async (values) => {
  try {
    const fetchDataClient = await axiosInstance.post("/work/fetchDataClient", values).then((response) => {
      return response.data;
    });
    return fetchDataClient;
  } catch (err) {
    return {isStatus: false, data: null, message: err.message};
  }
};
const fetchSubDataClient = async (values) => {
  //Use this to fetch Client
  try {
    const fetchSubDataClient = await axiosInstance.post("/work/fetchSubDataClient", values).then((response) => {
      // console.log('fetchDataClient ======>', response.data);
      return response.data;
    });

    return fetchSubDataClient;
  } catch (err) {
    return {isStatus: false, data: null, message: err.message};
  }
};
const fetchSubDataProject = async (values) => {
  try {
    const fetchSubDataProject = await axiosInstance.post("/work/fetchSubDataProject", values).then((response) => {
      return response.data;
    });
    return fetchSubDataProject;
  } catch (err) {
    return {isStatus: false, data: null, message: err.message};
  }
};

const fetchTaskProject = async (values) => {
  try {
    const fetchTaskProject = await axiosInstance.post("/work/fetchTaskProject", values).then((response) => {
      return response.data;
    });
    return fetchTaskProject;
  } catch (err) {
    return {isStatus: false, data: null, message: err.message};
  }
};

const fetchDataProject = async (values) => {
  try {
    const fetchDataProject = await axiosInstance.post("/work/fetchDataProject", values).then((response) => {
      return response.data;
    });
    return fetchDataProject;
  } catch (err) {
    return {isStatus: false, data: null, message: err.message};
  }
};
const fetchDataWork = async (values) => {
  try {
    const fetchDataWork = await axiosInstance.post("/work/fetchDataWork", values).then((response) => {
      // console.log('fetchDataWork', response.data);
      return response.data;
    });
    return fetchDataWork;
  } catch (err) {
    return {isStatus: false, data: null, message: err.message};
  }
};

const fetchGetWorkCode = async (values) => {
  try {
    const fetchDataWork = await axiosInstance.post("/work/fetchGetWorkCode", values).then((response) => {
      // console.log('fetchDataWork', response.data);
      return response.data;
    });
    return fetchDataWork;
  } catch (err) {
    return {isStatus: false, data: null, message: err.message};
  }
};

//------------------------------------------------------------- Create Zone -------------------------------------------------------------
const createClient = async (values) => {
  try {
    const createClient = await axiosInstance.post("/work/createClient", values).then((response) => {
      return response.data;
    });
    console.log(createClient);
    return createClient;
  } catch (err) {
    return {isStatus: false, data: null, message: err.message};
  }
};
const createProject = async (values) => {
  try {
    const createProject = await axiosInstance.post("/work/createProject", values).then((response) => {
      return response.data;
    });
    console.log(createProject);
    return createProject;
  } catch (err) {
    return {isStatus: false, data: null, message: err.message};
  }
};
const createWork = async (values) => {
  try {
    const createWork = await axiosInstance.post("/work/createWork", values).then((response) => {
      return response.data;
    });
    console.log(createWork);
    return createWork;
  } catch (err) {
    return {isStatus: false, data: null, message: err.message};
  }
};

//------------------------------------------------------------- Delete Zone -------------------------------------------------------------
const deleteClient = async (values) => {
  try {
    const deleteClient = await axiosInstance.post("/work/deleteClient", values).then((response) => {
      return response.data;
    });
    console.log(deleteClient);
    return deleteClient;
  } catch (err) {
    return {isStatus: false, data: null, message: err.message};
  }
};
const deleteProject = async (values) => {
  try {
    const deleteProject = await axiosInstance.post("/work/deleteProject", values).then((response) => {
      return response.data;
    });
    console.log(deleteProject);
    return deleteProject;
  } catch (err) {
    return {isStatus: false, data: null, message: err.message};
  }
};
const deleteWork = async (values) => {
  try {
    const deleteWork = await axiosInstance.post("/work/deleteWork", values).then((response) => {
      return response.data;
    });
    console.log(deleteWork);
    return deleteWork;
  } catch (err) {
    return {isStatus: false, data: null, message: err.message};
  }
};

//------------------------------------------------------------- Update Zone -------------------------------------------------------------
const updateClient = async (values) => {
  try {
    const updateClient = await axiosInstance.post("/work/updateClient", values).then((response) => {
      return response.data;
    });
    console.log(updateClient);
    return updateClient;
  } catch (err) {
    return {isStatus: false, data: null, message: err.message};
  }
};
const updateProject = async (values) => {
  try {
    const updateProject = await axiosInstance.post("/work/updateProject", values).then((response) => {
      return response.data;
    });
    console.log(updateProject);
    return updateProject;
  } catch (err) {
    return {isStatus: false, data: null, message: err.message};
  }
};
const updateWork = async (values) => {
  try {
    const updateProject = await axiosInstance.post("/work/updateWork", values).then((response) => {
      return response.data;
    });
    console.log(updateProject);
    return updateProject;
  } catch (err) {
    return {isStatus: false, data: null, message: err.message};
  }
};
const updateStatusSuccess = async (values) => {
  try {
    const updateStatusSuccess = await axiosInstance.post("/work/updateStatusSuccess", values).then((response) => {
      return response.data;
    });
    console.log(updateStatusSuccess);
    return updateStatusSuccess;
  } catch (err) {
    return {isStatus: false, data: null, message: err.message};
  }
};
const updateStatusInprogress = async (values) => {
  try {
    const updateStatusInprogress = await axiosInstance.post("/work/updateStatusInprogress", values).then((response) => {
      return response.data;
    });
    console.log(updateStatusInprogress);
    return updateStatusInprogress;
  } catch (err) {
    return {isStatus: false, data: null, message: err.message};
  }
};
const updateStopwatchStop = async (values) => {
  try {
    const updateStopwatchStop = await axiosInstance.post("/work/updateStopwatchStop", values).then((response) => {
      return response.data;
    });
    console.log(updateStopwatchStop);
    return updateStopwatchStop;
  } catch (err) {
    return {isStatus: false, data: null, message: err.message};
  }
};
const updateStopwatch = async (values) => {
  try {
    const updateStopwatch = await axiosInstance.post("/work/updateStopwatch", values).then((response) => {
      return response.data;
    });
    console.log(updateStopwatch);
    return updateStopwatch;
  } catch (err) {
    return {isStatus: false, data: null, message: err.message};
  }
};

export default {
  fetchDataClient,
  fetchSubDataClient,
  fetchSubDataProject,
  fetchTaskProject,
  fetchDataProject,
  fetchDataWork,
  fetchGetWorkCode,
  createClient,
  createProject,
  createWork,
  deleteClient,
  deleteProject,
  deleteWork,
  updateClient,
  updateProject,
  updateWork,
  updateStatusSuccess,
  updateStatusInprogress,
  updateStopwatch,
  updateStopwatchStop
};
