import { useMemo } from 'react';
import moment from 'moment';

const useNewPerson = (projectData, fetchData, timesheetData, mondayData) => {
  const data = projectData;
  const datais = fetchData;
  const datats = timesheetData;
  const datamonday = mondayData;
  // console.log('raw data', data);
  // console.log('data from monday', datamonday);
  // console.log('datats', datats.total);
  const formattedData = useMemo(() => {
    const rows = [];

    if (data) {
      data.forEach((person, index) => {
        let positionrows = [];
        let timesheetrows = [];

        if (Array.isArray(datais)) {
          datais.forEach((position, index) => {
            const rowss = {
              position_code: position.position_code,
              position_name: position.position_name,
              profile: position.Profiles?.map((item) => item.user_id)
            };
            positionrows.push(rowss);
          });
        }

        console.log('positionrows', positionrows);

        if (Array.isArray(datats)) {
          datats.forEach((timesheet, index) => {
            const rowss = {
              total: timesheet.total,
              timesheet_user: timesheet.created_by,
              timesheetworkid: timesheet.work_id
              // profile: position.Profies?.map((item) => item.user_id)
            };
            timesheetrows.push(rowss);
          });
        }

        console.log('timesheetrows', timesheetrows);
        
        const calculateSumary = (int, data) => {
          let summary = 0;
          console.log('datamonday', data);
          for (let i = 0; i < int.length; i++) {
            console.log('int', int[i]);
            if (data && data.length > 0) {
              data.map((item) => {
                console.log('test datamonday', datamonday);
                if (item.mondayhd_name) {
                  console.log('test datamonday', item.mondayhd_name);
                }
              });
            }
            summary += parseInt(int[i]); // Accumulate the sum
            console.log('int sum', summary);
          }
          return summary;
        };

        const calculateArraySumary = (int) => {
          let summary = 0;
          for (let i = 0; i < int.length; i++) {
            console.log('int', int[i]);
            summary += parseInt(int[i]); // Accumulate the sum
            console.log('int sum', summary);
          }
          if (isNaN(summary)) {
            return (summary = 0);
          } else {
            return summary;
          }
        };

        if (data.length > 0) {
         
          const row = {
            project_id: person.project_id,
            client_id: person.client_id,
            project_code: person.project_code,
            project_name: person.project_name,
            created_date: person.created_date,
            start_date: moment(person.start_date).format('DD-MM-YYYY'),
            finish_date: moment(person.finish_date).format('DD-MM-YYYY'),
            due_date: moment(person.due_date).format('DD-MM-YYYY'),
            is_active: person.is_active,
            is_deleted: person.is_deleted,
            // =============================WORK========================= //
            work_id: person.Works.map((item) => item.work_id),
            work_name: person.Works.map((item) => item.work_name),
            total: person.Works.map((item) => item.total),
            send_to: person.Works.map((item) => item.send_to),
            status: person.Works.map((item) => item.work_status).length > 0 ? person.Works.map((item) => item.work_status) : 'not started',
            // sum: calculateSumary(person.Works.map((item) => item.total)),
            sum:
              calculateArraySumary(person.Works.map((item) => item.TimeSheetDTs.map((item) => item.total))) !== 0
                ? calculateSumary(person.Works.map((item) => item.total, datamonday)) -
                  calculateArraySumary(person.Works.map((item) => item.TimeSheetDTs.map((item) => item.total)))
                : 0,
            work_code: person.Works.map((item) => item.work_code),
            total_ts: person.Works.map((item) => item.TimeSheetDTs.map((item) => item.total)),
            // position_name: datais?.map((item) => item.position_name),
            position: positionrows,
            timesheets: person.Works.map((item) => item.TimeSheetDTs.map((item) => item.created_by))
            // ============================Position======================= //
          };
          rows.push(row);
        }
      });
    }
    return rows;
  }, [data, datais]);

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
