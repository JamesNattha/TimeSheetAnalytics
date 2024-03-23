import React, { useCallback, useState } from 'react';
import api from '_api';
import { useTheme } from '@mui/material/styles';
import { Dialog } from '@mui/material';
import CustomerView from 'sections/apps/customer/CustomerView';
import AddCustomer from 'sections/apps/customer/AddCustomer';
import Assignment from 'sections/apps/customer/Assignment';
import ReactTable from './work_table';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';

import useNewPerson from './call_workdata';
import useMonday from './call_Monday';
import useColumns from './column_header';

import { useNavigate } from 'react-router-dom';

const CustomerList = () => {
  const theme = useTheme();
  const databaseData = useMonday();
  const [customer, setCustomer] = useState(null);
  const [add, setAdd] = useState(false);
  const navigate = useNavigate();
  const [worknoId, setWorknoId] = useState(null);
  const newPersonData = useNewPerson((formattedData) => {});
  const data = databaseData;

  const handleAdd = () => {
    setAdd(!add);
    if (customer && add) setCustomer(null);
  };

  const handleDelete = (worknoId) => {
    setCustomer(null);
    setAdd(false);
    setWorknoId(worknoId);
  };

  const columns = useColumns(handleAdd, setCustomer, handleDelete, worknoId); // Pass handleDelete and worknoId as parameters

  const renderRowSubComponent = useCallback(({ row }) => <CustomerView data={data[row.id]} />, [data]);

  return (
    <MainCard content={false}>
      <ScrollX>
        <ReactTable
          columns={columns}
          data={data}
          handleAdd={handleAdd}
          getHeaderProps={(column) => column.getSortByToggleProps()}
          renderRowSubComponent={renderRowSubComponent}
        />
      </ScrollX>
      <Dialog maxWidth="sm" fullWidth onClose={handleAdd} open={add} sx={{ '& .MuiDialog-paper': { p: 0 } }}>
        {(add && <AddCustomer customer={customer} onCancel={handleAdd} />) || <Assignment customer={customer} onCancel={handleAdd} />}
      </Dialog>
    </MainCard>
  );
};

export default CustomerList;
