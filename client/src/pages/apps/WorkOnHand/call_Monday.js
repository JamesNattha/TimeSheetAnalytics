import { useState, useEffect, useMemo } from 'react';
import api from '_api';
import moment from 'moment';

const useMonday = () => {
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState([]);
  const [fetchtUser, setFetchtUser] = useState([]);
  const [selectUser, setSelectUser] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [work, setWork] = useState([]);
  const [callof, setCallof] = useState([]);

  //ดึงชื่อจาก Time Sheet
  const fetchUserRep = async () => {
    try {
      const { data, isStatus } = await api.report.fetchUser();
      if (isStatus) setCallof(data);
    } catch (error) {
      console.error(error);
    }
  };

  //ดึงข้อมลจาก Monday
  const fetchMonday = async () => {
    try {
      const { data, isStatus } = await api.monday.fetchMonday();
      if (isStatus) setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  //ดึงงานจาก Work
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
      // console.log('data.data.users', data.data.users);
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
    fetchUser();
    fetchMondayUser();
    fetchMonday();
    fetchWorkTable();
  }, []);

  const formattedData = useMemo(() => {
    const rows = [];

    if (data) {
      data.forEach((person) => {
        const foundUser = fetchtUser.some((fetchUser) => fetchUser.username == person.email);
        if (foundUser) {
          const row = {
            id: person.mondayId,
            projectName: person.mondayProName,
            subitemName: person.mondaySubName,
            startDate: moment(person.startDate).format('DD-MM-YYYY'),
            endDate: moment(person.endDate).format('DD-MM-YYYY'),
            createdAt: moment(person.createdAt).format('DD-MM-YYYY'),
            owner: person.owner,
            email: person.email,
            status: person.status,
            timer: person.timer
          };
          rows.push(row);
        }
      });

      work.forEach((person) => {
        const currentUser = callof.some((user) => user.username === person.sendTo);
        if (currentUser) {
          const row = {
            id: person.worknoId,
            subitemName: person.workName,
            startDate: moment(person.startDate).format('DD-MM-YYYY'),
            endDate: moment(person.endDate).format('DD-MM-YYYY'),
            createdAt: moment(person.createdAt).format('DD-MM-YYYY'),
            createdBy: person.createdBy,
            detail: person.detail,
            email: person.sendTo,
            note: person.note,
            status: person.status,
            timer: person.timer
          };
          rows.push(row);
        }
      });
    }

    return rows;
  }, [data]);

  return formattedData;
};

export default useMonday;
