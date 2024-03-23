import { useState, useEffect, useMemo } from 'react';
import api from '_api';
import moment from 'moment';

const useNewPerson = () => {
  const [data, setData] = useState([]);

  const fetchWorkTable = async () => {
    try {
      const { data, isStatus } = await api.work.fetchDataCustomer();
      // console.log('data data data data', data);
      if (isStatus) setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchWorkTable();
  }, []);

  const formattedData = useMemo(() => {
    const rows = [];

    if (data) {
      data.forEach((person) => {
        if (data.length > 0) {
          const row = {
            id: person.customerId,
            customerName: person.customerName,
            startDate: moment(person.startDate).format('DD-MM-YYYY'),
            endDate: moment(person.endDate).format('DD-MM-YYYY'),
            createdAt: moment(person.createdAt).format('DD-MM-YYYY'),
            createdBy: person.createdBy,
            sumTime: person.sumTime,
            customerStatus: person.customerStatus,
            customerEmail: person.customerEmail,
            customerPhone: person.customerPhone,
            customerAddress: person.customerAddress
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
