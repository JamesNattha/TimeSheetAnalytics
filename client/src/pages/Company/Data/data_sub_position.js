import { useState, useEffect, useMemo } from 'react';
// import api from '_api';
import moment from 'moment';

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
          if (Array.isArray(person.profile_id)) {
            if (person.profile_id.length > 0) {
              for (let i = 0; i < person.profile_id.length; i++) {
                const fullname =
                  person.profile_firstname[i] && person.profile_lastname[i]
                    ? `${person.profile_firstname[i]} ${person.profile_lastname[i]}`
                    : null;
                const formattedStartDate = moment(person.profile_startworkdate[i]).format('DD/MM/YYYY');
                const row = {
                  no: person.profile_id.length - i,
                  profile_id: person.profile_id[i],
                  profile_name: fullname,
                  profile_nickname: person.profile_nickname[i],
                  profile_email: person.profile_email[i],
                  profile_startworkdate: formattedStartDate,
                  profile_role: person.profile_role[i],
                  profile_date: person.profile_date[i]
                };
                rows.push(row);
              }
            } else {
              const row = {
                no: person.profile_id.length,
                profile_id: person.profile_id,
                profile_name: fullname,
                profile_nickname: person.profile_nickname,
                profile_email: person.profile_email,
                profile_startworkdate: formattedStartDate,
                profile_role: person.profile_role,
                profile_date: person.profile_date
              };
              rows.push(row);
            }
          }
        }
      }
    }
    // console.log('row row row row ', rows);
    return rows;
  }, [data]);

  return formattedData;
};

export default useNewPerson;
