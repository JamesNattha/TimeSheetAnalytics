import React, { useCallback, useState } from 'react';
import api from '_api';
import { useTheme } from '@mui/material/styles';
import { Dialog } from '@mui/material';
import AddWork from 'sections/apps/work_fetch/AddWork';
import Assignment from 'sections/apps/work_fetch/Assignment';
import ReactTable from './work_table';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';

import useNewPerson from './call_workdata';
import useColumns from './column_header';

import { useNavigate } from 'react-router-dom';

const CustomerList = () => {
  const theme = useTheme();
  const data = useNewPerson();
  const [customer, setCustomer] = useState(null);
  const [add, setAdd] = useState(false);
  const [ass, setAss] = useState(false);
  const navigate = useNavigate();
  const [worknoId, setWorknoId] = useState(null); // Add worknoId state

  const handleAdd = () => {
    setAdd(!add);
    if (customer && add) setCustomer(null);
  };

  const handleAssign = () => {
    setAss(!ass);
    if (customer && ass) setCustomer(null);
  };

  const handleDelete = (worknoId) => {
    setCustomer(null);
    setAdd(false);
    setWorknoId(worknoId); // Set the worknoId state
  };

  const columns = useColumns(handleAdd, setCustomer, handleDelete, worknoId, handleAssign);

  return (
    <MainCard content={false}>
      <ScrollX>
        <ReactTable
          columns={columns}
          data={data}
          handleAdd={handleAdd}
          handleAssign={handleAssign}
          getHeaderProps={(column) => column.getSortByToggleProps()}
        />
      </ScrollX>
      <Dialog maxWidth="sm" fullWidth onClose={handleAdd} open={add || ass} sx={{ '& .MuiDialog-paper': { p: 0 } }}>
        {add && <AddWork customer={customer} onCancel={handleAdd} />}
        {ass && <Assignment customer={customer} onCancel={handleAssign} />}
      </Dialog>
    </MainCard>
  );
};

export default CustomerList;
