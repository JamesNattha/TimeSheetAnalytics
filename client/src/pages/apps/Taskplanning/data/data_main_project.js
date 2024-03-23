import { useMemo } from 'react';
import moment from 'moment';

const useNewPerson = (fetchData) => {
  const data = fetchData;
  const formattedData = useMemo(() => {
    const rows = [];

    if (data) {
      data.forEach((person, index) => {
        if (data.length > 0) {
          person.Projects.forEach((subClient) => {
            const row = {
              project_id: subClient.project_id,
              client_id: person.client_id,
              client_name: person.client_name,
              group_id: subClient.Group.group_id,
              group_name: subClient.Group.group_name,
              project_code: subClient.project_code,
              project_name: subClient.project_name,
              created_date: subClient.created_date,
              start_date: moment(subClient.start_date).format('DD-MM-YYYY'),
              finish_date: moment(subClient.finish_date).format('DD-MM-YYYY'),
              due_date: moment(subClient.due_date).format('DD-MM-YYYY'),
              is_active: subClient.is_active,
              is_deleted: subClient.is_deleted
            };
            rows.push(row);
          });
        }
      });
    }
    // console.log('UPPER ROWNOR', rows);
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
