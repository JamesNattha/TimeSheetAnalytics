import { useMemo } from 'react';
import moment from 'moment';

const useNewPerson = (fetchData) => {
  const data = fetchData;
  const formattedData = useMemo(() => {
    const rows = [];

    if (data) {
      data.forEach((person, index) => {
        if (data.length > 0) {
          console.log('data person', person);

          if (person.Profiles.length > 0) {
            const profile_id = person.Profiles?.map((profile) => profile.User.user_id);
            const nickname = person.Profiles?.map((profile) => profile.User.nick_name);
            const email = person.Profiles?.map((profile) => profile.User.username);
            const startDate = person.Profiles?.map((profile) => profile.User.starting_working_date);
            const profile_date = person.Profiles?.map((profile) => profile.created_date);
            const role = person.Profiles?.map((profile) => profile.role);
            const first_name = person.Profiles?.map((profile) => profile.User.first_name);
            const lastname = person.Profiles?.map((profile) => profile.User.last_name);
            // console.log('data profile_code', profile_code);
            const row = {
              position_id: person.position_id,
              position_code: person.position_code,
              position_name: person.position_name,
              created_date: person.created_date,
              department_id: person.Department.department_id,
              department_name: person.Department.department_name,
              is_disabled: true,
              //---------------------------
              profile_id: profile_id,
              profile_firstname: first_name,
              profile_lastname: lastname,
              profile_nickname: nickname,
              profile_email: email,
              profile_startworkdate: startDate,
              profile_role: role,
              profile_date: profile_date
            };
            rows.push(row);
          } else {
            const disable = person.Profiles.length >= 1;
            const row = {
              position_id: person.position_id,
              position_code: person.position_code,
              position_name: person.position_name,
              created_date: person.created_date,
              department_name: person.Department.department_name,
              is_disabled: disable,
              //---------------------------
              profile_id: person.Profiles?.User?.user_id,
              profile_firstname: person.Profiles?.User?.first_name,
              profile_lastname: person.Profiles?.User?.last_name,
              profile_nickname: person.Profiles?.User?.nick_name,
              profile_email: person.Profiles?.User?.username,
              profile_startworkdate: person.Profiles?.User?.starting_working_date,
              profile_role: person.Profiles?.role,
              profile_date: person.Profiles?.created_date,
              //------------------
              department_id: person.department_id
              //   department_code: person.department_code,
              //   department_name: person.department_name,
              //   created_date: person.created_date,
              //   position_id: person.Positions[0]?.position_id,
              //   position_code: person.Positions[0]?.position_code,
              //   position_name: person.Positions[0]?.position_name,
              //   position_date: person.Positions[0]?.created_date,
              //   is_active: person.is_active,
              //   is_deleted: person.is_deleted
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
