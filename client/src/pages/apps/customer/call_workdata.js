import { useState, useEffect, useMemo } from 'react';
import api from '_api';
import moment from 'moment';

const useNewPerson = () => {
  const [data, setData] = useState([]);
  const [callof, setCallof] = useState([]);

  const fetchWorkUser = async () => {
    try {
      const { data, isStatus } = await api.report.fetchUser();
      if (isStatus) setCallof(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchWorkTable = async () => {
    try {
      const { data, isStatus } = await api.workno.fetchWorkTable();
      if (isStatus) setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchWorkUser();
    fetchWorkTable();
  }, []);

  const formattedData = useMemo(() => {
    const rows = [];

    if (data) {
      data.forEach((person) => {
        if (data.length > 0) {
          const row = {
            id: person.worknoId,
            workNo: person.workName,
            startDate: moment(person.startDate).format('DD-MM-YYYY'),
            endDate: moment(person.endDate).format('DD-MM-YYYY'),
            createdAt: moment(person.createdAt).format('DD-MM-YYYY'),
            createdBy: person.createdBy,
            detail: person.detail,
            sendTo: person.sendTo,
            note: person.note
          };

          rows.push(row);
        }
      });
    }

    return rows;
  }, [data]);

  return formattedData;
};

export default useNewPerson;
