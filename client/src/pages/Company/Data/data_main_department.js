import { useMemo } from 'react';

const useNewPerson = (fetchData) => {
  const data = fetchData;
  const formattedData = useMemo(() => {
    const rows = [];

    if (data) {
      data.forEach((person, index) => {
        if (data.length > 0) {
          console.log('data person', person);

          if (person.Positions.length > 1) {
            // Handle the case where a person has multiple positions
            const client_id = person.Positions.map((position) => position.position_id);
            const client_code = person.Positions.map((position) => position.position_code);
            // const client_code = person.Positions.map((position, index) => {
            //   if (index === 0) {
            //     return null; // Exclude the first position's code
            //   }
            //   return position.position_code;
            // });
            // const client_name = person.Positions.map((position, index) => {
            //   if (index === 0) {
            //     return null; // Exclude the first position's code
            //   }
            //   return position.position_code;
            // });
            const client_name = person.Positions.map((position) => position.position_name);
            const client_date = person.Positions.map((position) => position.created_date);
            console.log('data client_code',client_code)
            const row = {
              department_id: person.department_id,
              department_code: person.department_code,
              department_name: person.department_name,
              created_date: person.created_date,
              position_id: client_id,
              position_code: client_code,
              position_name: client_name,
              position_date: client_date,
              is_disabled: true,
              is_active: person.is_active,
              is_deleted: person.is_deleted
            };
            rows.push(row);
          } else {
            const disable = person.Positions.length >= 1 || person.Profiles.length >= 1
            const row = {
              department_id: person.department_id,
              department_code: person.department_code,
              department_name: person.department_name,
              created_date: person.created_date,
              position_id: person.Positions[0]?.position_id,
              position_code: person.Positions[0]?.position_code,
              position_name: person.Positions[0]?.position_name,
              position_date: person.Positions[0]?.created_date,
              is_disabled: disable,
              is_active: person.is_active,
              is_deleted: person.is_deleted
            };
            rows.push(row);
          }
        }
      });
    }
    return rows;
  }, [data]);

  const sortedData = formattedData.slice().sort((a, b) => {
    // Convert the date strings to Date objects for comparison
    const dateA = new Date(a.created_date);
    const dateB = new Date(b.created_date);

    // Compare the dates in descending order
    return dateA - dateB;
  });

  // Set autoNumber based on the sorted order
  sortedData.forEach((row, index) => {
    row.autoNumber = index + 1;
  });

  return sortedData; // Return sortedData instead of formattedData
};

export default useNewPerson;
