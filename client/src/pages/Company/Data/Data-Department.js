import { useMemo } from 'react';

const useDepartmentPerson = (datanow) => {
  console.log('easy data in for', datanow);
  const formattedData = useMemo(() => {
    const rows = [];

    if (datanow) {
      let counter = 0;
      datanow.map((person) => {
        counter++;
        if (datanow.length > 0) {
          const row = {
            no: counter,
            code: person.department_code,
            profile: person.Positions,
            name: person.department_name,
            company: 'department',
            createAt: person.created_date
          };
          rows.push(row);
        }
      });
    }

    console.log('department data', rows);
    return rows;
  }, [datanow]);

  const sortedData = formattedData.slice().sort((a, b) => {
    // Convert the date strings to Date objects for comparison
    const dateA = new Date(a.createAt);
    const dateB = new Date(b.createAt);

    // Compare the dates in descending order
    return dateA - dateB;
  });

  // Set autoNumber based on the sorted order
  sortedData.forEach((row, index) => {
    row.autoNumber = index + 1;
  });

  return sortedData; // Return sortedData instead of formattedData
};

export default useDepartmentPerson;
