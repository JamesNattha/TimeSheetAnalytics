import { useMemo } from 'react';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import ReactTable from 'components/ReactTableUC';
import { rowColumn } from './row-column';
import api from '_api';
import { useState, useEffect } from 'react';

const useNewPerson = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchAllUser = async () => {
      try {
        const { data, isStatus } = await api.report.fetchAllUsers();
        if (isStatus) setData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllUser();
  }, []);

  const formattedData = useMemo(() => {
    return data.map((person) => ({
      id: person.userId,
      firstName: person.firstName,
      lastName: person.lastName,
      email: person.username,
      age: person.createdAt,
      visits: person.createdBy
    }));
  }, [data]);

  return formattedData;
};

const RowSelectionTable = () => {
  const data = useNewPerson();

  return (
    <MainCard content={false} title="Row Selection (Pagination)">
      <ScrollX>
        <ReactTable columns={rowColumn} data={data} />
      </ScrollX>
    </MainCard>
  );
};

export default RowSelectionTable;
