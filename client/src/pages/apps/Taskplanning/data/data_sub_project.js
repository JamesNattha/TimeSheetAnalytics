import { useState, useEffect, useMemo } from 'react';
import api from '_api';

const useNewPerson = (DatafromIndex) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(DatafromIndex);
  }, [DatafromIndex]);

  const formattedData = useMemo(() => {
    const rows = [];
    if (data) {
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          const person = data[key];

          const row = {
            subclient_id: person.subclient_id,
            client_incharge: person.client_incharge,
            client_nickname: person.client_nickname,
            createdAt: person.createdAt,
            email: person.email,
            client_phone: person.client_phone,
            client_detail: person.client_detail
          };

          rows.push(row);
        }
      }
    }
    // console.log('row row row row ', rows);
    return rows;
  }, [data]);

  return formattedData;
};

export default useNewPerson;
