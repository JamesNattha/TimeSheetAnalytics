import { useMemo } from 'react';

const useNewPerson = (fetchData) => {
  const data = fetchData;
  const formattedData = useMemo(() => {
    const rows = [];

    if (data) {
      data.forEach((person, index) => {
        if (data.length > 0) {
          person.SubClients.forEach((subClient) => {
            const row = {
              client_id: person.client_id,
              client_code: person.client_code,
              client_name: person.client_name,
              created_date: person.created_date,
              client_detail: subClient.client_detail,
              client_incharge: subClient.client_incharge,
              client_nickname: subClient.client_nickname,
              client_phone: subClient.client_phone,
              email: subClient.email,
              is_active: person.is_active,
              is_deleted: person.is_deleted
            };
            rows.push(row);
          });
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
