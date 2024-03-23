import { useState, useEffect, useMemo } from 'react';
// import api from '_api';

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
          if (Array.isArray(person.client_incharge)) {
            for (let i = 0; i < person.client_incharge.length; i++) {
              const row = {
                // subclient_id: person.subclient_id[i],
                client_incharge: person.client_incharge[i],
                client_nickname: person.client_nickname[i],
                createdAt: person.created_date[i],
                email: person.email[i],
                client_phone: person.client_phone[i]
              };
              rows.push(row);
            }
          }
        }
      }
    }
    return rows;
  }, [data]);

  return formattedData;
};

export default useNewPerson;
