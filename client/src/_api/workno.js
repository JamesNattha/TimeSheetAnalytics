import axiosInstance from 'utils/axios';

const createWorkNo = async (values) => {
  try {
    const createWorkNo = await axiosInstance.post('/workno/createworkno', values).then((response) => {
      return response.data;
    });
    console.log(createWorkNo)
    return createWorkNo;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
};

  const fetchWorkTable = async (values) => {
    try {
      const fetchvalue = await axiosInstance.post('/workno', values).then((response) => {
        return response.data;
      });
      return fetchvalue;
    } catch (err) {
      return { isStatus: false, data: null, message: err.message };
    }
  };


  const updateWorkNo = async (values) => {
    try {
      const fetchvalue = await axiosInstance.post('/workno/updateworkno', values).then((response) => {
        return response.data;
      });
      return fetchvalue;
    } catch (err) {
      return { isStatus: false, data: null, message: err.message };
    }
  };
  
  const updateSendTo = async (values) => {
    try {
      const fetchvalue = await axiosInstance.post('/workno/updatesendto', values).then((response) => {
        return response.data;
      });
      return fetchvalue;
    } catch (err) {
      return { isStatus: false, data: null, message: err.message };
    }
  };

  const deleteWorkNo = async (values) => {
    try {
      const fetchvalue = await axiosInstance.post('/workno/deleteworkno', values).then((response) => {
        return response.data;
      });
      return fetchvalue;
    } catch (err) {
      return { isStatus: false, data: null, message: err.message };
    }
  };

  
  export default {
    fetchWorkTable,
    createWorkNo,
    updateWorkNo,
    deleteWorkNo,
    updateSendTo,
  };