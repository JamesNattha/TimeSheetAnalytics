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
          // let count = 1;
          if (Array.isArray(person.position_name)) {
            if (person.position_name.length > 0) {
              for (let i = 0; i < person.position_name.length; i++) {
                const row = {
                  no: person.position_name.length - i,
                  position_id: person.position_id[i],
                  position_code: person.position_code[i],
                  position_name: person.position_name[i],
                  position_date: person.position_date[i]
                };
                rows.push(row);
              }
            } else {
              const row = {
                no: person.position_name.length,
                position_id: person.position_id,
                position_code: person.position_code,
                position_name: person.position_name,
                position_date: person.position_date
              };
              rows.push(row);
            }
          } else {
            const row = {
              no: 1,
              position_id: person.position_id,
              position_code: person.position_code,
              position_name: person.position_name,
              position_date: person.position_date
            };
            rows.push(row);
          }
        }
      }
    }
    console.log('row row row row ', rows);
    return rows;
  }, [data]);

  return formattedData;
};

export default useNewPerson;
