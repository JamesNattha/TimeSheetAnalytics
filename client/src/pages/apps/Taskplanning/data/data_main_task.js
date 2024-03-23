import { useMemo, useEffect, useState } from 'react';
import moment from 'moment';
import api from '_api';

const useNewPerson = (fetchData) => {
  const data = fetchData;

  const formattedData = useMemo(() => {
    const rows = [];

    if (data && data.length > 0) {
      data.forEach((item) => {
        const row = {
          client_name: item.client_name,
          project_name: item.project_name,
          work_id: item.work_id,
          work_code: item.work_code,
          work_name: item.work_name,
          work_type: item.work_type,
          work_type_name: item.work_type_name,
          work_level: item.work_level,
          work_status: item.work_status,
          detail: item.detail,
          start_date: item.start_date,
          end_date: item.end_date,
          created_date: item.created_date,
          is_active: item.is_active,
          is_deleted: item.is_deleted
        };
        rows.push(row);
      });
    }
    return rows;
  }, [data]);

  const sortedData = formattedData.slice().sort((a, b) => {
    // Convert the date strings to Date objects for comparison
    const dateA = new Date(a.created_date);
    const dateB = new Date(b.created_date);

    // Compare the dates in descending order
    return dateB - dateA;
  });

  // Set autoNumber based on the sorted order
  sortedData.forEach((row, index) => {
    row.autoNumber = index + 1;
  });

  return sortedData; // Return sortedData instead of formattedData
};

export default useNewPerson;
