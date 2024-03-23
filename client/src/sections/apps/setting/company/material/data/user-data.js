import { useState, useEffect, useMemo } from 'react';
import api from '_api';
import moment from 'moment';

const useUserGetPerson = (dataDepartment, name) => {
  const [data, setData] = useState([]);
  console.log('dataDepartment is easy', dataDepartment);
  console.log('name', name);

  const formattedData = useMemo(() => {
    const rows = [];
    if (name === 'department') {
      let counter = 0;
      dataDepartment.forEach((person) => {
        counter++;
        if (dataDepartment.length > 0) {
          const row = {
            no: counter,
            name: `${person.position_code}`,
            nickname: person.position_name,
            page: name
          };
          rows.push(row);
        }
      });
    } else if (dataDepartment) {
      let counter = 0;
      dataDepartment.forEach((person) => {
        counter++;
        if (dataDepartment.length > 0) {
          const name = person.User.first_name && person.User.last_name ? `${person.User.first_name} ${person.User.last_name}` : null;
          const formattedStartDate = moment(person.User.starting_working_date).format('DD/MM/YYYY');
          const row = {
            no: counter,
            name: name,
            nickname: person.User.nick_name,
            email: person.User.username,
            startDate: formattedStartDate,
            created_date: person.created_date,
            role: person.role
          };
          rows.push(row);
        }
      });
    }
    console.log('hello is here', rows);
    return rows;
  }, [dataDepartment]);

  return formattedData;
};

export default useUserGetPerson;
