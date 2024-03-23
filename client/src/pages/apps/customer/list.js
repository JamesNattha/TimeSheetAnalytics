import React, { useCallback, useState } from 'react';
import api from '_api';
import { useTheme } from '@mui/material/styles';
import { Dialog } from '@mui/material';
import CustomerView from 'sections/apps/customer/CustomerView';
import AddCustomer from 'sections/apps/customer/AddCustomer';
import ReactTable from './work_table';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';

import useNewPerson from './call_workdata';
import useColumns from './column_header';

// ==============================|| CUSTOMER - LIST VIEW ||============================== //

const CustomerList = () => {
  const theme = useTheme();
  const data = useNewPerson();
  const [customer, setCustomer] = useState(null);
  const [add, setAdd] = useState(false);

  const handleAdd = () => {
    setAdd(!add);
    if (customer && add) setCustomer(null);
  };

  const columns = useColumns(handleAdd, setCustomer);

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
        {add && <AddCustomer customer={customer} onCancel={handleAdd} />}
      </Dialog>
    </MainCard>
  );
};

export default CustomerList;
