import { useState, useEffect, useMemo } from 'react';
import api from '_api';
import moment from 'moment';
import { useLocation } from 'react-router-dom';

const useNewPerson = () => {
  const [data, setData] = useState([]);
  const location = useLocation();

  const fetchWorkTable = async () => {
    try {
      const { data: responseData, isStatus } = await api.work.fetchDataProject();
      console.log('data data data data', location.state);
      const filteredData = responseData.filter((item) => item.customerId === location.state.id);
      console.log('filteredData', filteredData);
      if (isStatus) {
        setData(filteredData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchWorkTable();
  }, []);

  const formattedData = useMemo(() => {
    const rows = [];

    if (Array.isArray(data)) {
      data.forEach((person) => {
        const row = {
          id: person.projectId,
          projectName: person.projectName,
          startDate: moment(person.startDate).format('DD-MM-YYYY'),
          endDate: moment(person.endDate).format('DD-MM-YYYY'),
          createdAt: moment(person.createdAt).format('DD-MM-YYYY'),
          createdBy: person.createdBy,
          sumTime: person.sumTime
        };

        rows.push(row);
      });
    }

    return rows;
  }, [data]);

  return formattedData;
};

export default useNewPerson;
