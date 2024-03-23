import { useState, useEffect, useMemo } from 'react';
import api from '_api';
import moment from 'moment';

const useNewPerson = (onNewWorkData) => {
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState([]);
  const [fetchtUser, setFetchtUser] = useState([]);
  const [selectUser, setSelectUser] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [work, setWork] = useState([]);
  const [callof, setCallof] = useState([]);

  const fetchData = async () => {
    try {
      const { data, isStatus } = await api.monday.fetchDataAll();
      // console.log('Response Data:', data.data.boards);
      if (isStatus) setData(data.data.boards);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false); // Set isLoading to false in case of error
    }
  };

  const fetchUserRep = async () => {
    try {
      const { data, isStatus } = await api.report.fetchUser();
      if (isStatus) setCallof(data);
      // console.log('api : 1');
    } catch (error) {
      console.error(error);
    }
  };

  const fetchWorkTable = async () => {
    try {
      const { data, isStatus } = await api.work.fetchDataWork();
      if (isStatus) setWork(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMondayUser = async () => {
    try {
      const { data, isStatus } = await api.monday.fetchMondayUser();
      if (isStatus) setUserId(data.data.users);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUser = async () => {
    try {
      const { data, isStatus } = await api.monday.fetchUser();
      if (isStatus) setFetchtUser(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserRep();
    fetchData();
    fetchMondayUser();
    fetchUser();
    // fetchMonday();
    fetchWorkTable();
  }, []);

  useEffect(() => {
    const foundUser = userId.find((user) => fetchtUser.some((fetchUser) => fetchUser.username === user.email));
    if (foundUser) {
      setSelectUser(foundUser.id);
    }
  }, [userId, fetchtUser]);

  const subitemsData = data.filter((board) => board.name.startsWith('Subitems of'));
  // console.log('data nakub', subitemsData);
  const filteredSubitems = subitemsData.filter((subitem) => {
    const personColumn = subitem.items.find((item) => {
      return (
        item.column_values &&
        item.column_values.some((columnValue) => {
          if (columnValue.id === 'person' && columnValue.value) {
            const parsedValue = JSON.parse(columnValue.value);
            return parsedValue;
          }
          return false;
        })
      );
    });
    return personColumn !== undefined;
  });

  const formattedData = useMemo(() => {
    const rows = [];

    if (filteredSubitems) {
      filteredSubitems.forEach((board) => {
        board.items.forEach((item) => {
          const personColumn = item.column_values.find((columnValue) => columnValue.id === 'person');
          if (personColumn && personColumn.value && personColumn.value !== '') {
            const parsedValue = JSON.parse(personColumn.value);
            const ids = parsedValue.personsAndTeams.map((person) => person.id);
            if (ids) {
              const Owners = userId
                .filter((user) => ids.includes(user.id))
                .map((user) => user.name)
                .join('\n');

              const Email = userId
                .filter((user) => ids.includes(user.id))
                .map((user) => user.email)
                .join('\n');

              const status = item.column_values.find((columnValue) => columnValue.id === 'status');
              const row = {
                id: item.id,
                projectName: board.name.replace('Subitems of', ''),
                subitemName: item.name,
                startDate: moment(board.startDate).format(),
                endDate: moment(board.endDate).format(),
                status: status ? status.text : null,
                email: Email,
                owner: Owners
              };

              rows.push(row);
            }
          }
        });
      });
    }

    return rows;
  }, [filteredSubitems, work]);

  const createMondayToDatabase = async (data) => {
    try {
      const response = await api.monday.createMonday(data);
      // if (response.isStatus) console.log('Monday records created in the database:', response.data);
    } catch (error) {
      // console.error('Error creating Monday records:', error.message);
    }
  };

  useEffect(() => {
    if (formattedData.length > 0) {
      createMondayToDatabase(formattedData);
    }
  }, [formattedData]);

  // console.log('formattedData', formattedData);

  return formattedData;
};

export default useNewPerson;
