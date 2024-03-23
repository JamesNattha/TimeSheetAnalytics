import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import api from '_api';

const useNewPerson2 = (fetchData) => {
  const [fetchUser, setFetchUser] = useState([]);

  useEffect(() => {
    const fetchDataUser = async () => {
      try {
        const { data, isStatus } = await api.users.fetchMyself();
        if (isStatus) {
          setFetchUser(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchDataUser();
  }, []);

  const formattedData = useMemo(() => {
    const checkAll = fetchUser.some((user) => user.is_all === true);
    const userGroupIds = new Set(fetchUser.map((user) => user.group_id));

    return fetchData
      .filter((item) => checkAll || userGroupIds.has(item.group_id))
      .map((item) => ({
        client_id: item.client_id,
        client_name: item.client_name,
        project_id: item.project_id,
        project_name: item.project_name,
        start_date: moment(item.start_date).format('DD/MM/YYYY'),
        finish_date: moment(item.finish_date).format('DD/MM/YYYY'),
        due_date: moment(item.due_date).format('DD/MM/YYYY'),
        group_id: item.group_id,
        group_name: item.group_name
      }));
  }, [fetchData, fetchUser]);

  const sortedData = [...formattedData].sort((a, b) => new Date(b.created_date) - new Date(a.created_date));

  // Add autoNumber to the sorted data
  sortedData.forEach((row, index) => (row.autoNumber = index + 1));

  return sortedData;
};

export default useNewPerson2;
