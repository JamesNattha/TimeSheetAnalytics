//React
import React, { useState, useCallback, useEffect } from 'react';

//MUI
import { useTheme } from '@mui/material/styles';
import { Dialog } from '@mui/material';

//Component
import ReactTable from 'components/third-party/GobalTable';
import ScrollX from 'components/ScrollX';

//Other
import api from '_api';
import AddClient from 'sections/apps/customer_ev2/add_edit/AddClient';
import useNewPerson from './data/data_main_client';
import useColumns from './column/column_main_client';
import Swal from 'sweetalert2';
import SubItems from './subitems_client';
import handleDelete from './modal/delete_modal';

const CustomerList = () => {
  const [customer, setCustomer] = useState(null);
  const [add, setAdd] = useState(false);
  const [fetchData, setFetchData] = useState([]);
  const [isAddCustomerDialogOpen, setIsAddCustomerDialogOpen] = useState(false);
  const data = useNewPerson(fetchData);

  const fetchWorkTable = async () => {
    try {
      const { data, isStatus } = await api.work.fetchSubDataClient();
      // console.log('after fetch', data);
      if (isStatus) setFetchData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchWorkTable();
  }, []);

  const handleAdd = async () => {
    setAdd(!add);
    if (customer && add) setCustomer(null);
    setIsAddCustomerDialogOpen(true);
    setIsAddCustomerDialogOpen(!isAddCustomerDialogOpen);
  };

  const handleDeleteCustomer = (values) => {
    handleDelete(values, fetchWorkTable, 'client'); // Use the imported handleDelete function
  };

  const columns = useColumns(handleAdd, setCustomer, handleDeleteCustomer);

  const renderRowSubComponent = useCallback(({ row }) => <SubItems DatafromIndex={data[row.id]} />, [data]);

  //Send to Table
  const propsData = {
    columns,
    data,
    renderRowSubComponent,
    getHeaderProps: (column) => column.getSortByToggleProps(),
    nameCreateButton: 'Clients',
    handleAdd: () => handleAdd(),
    handleDelete: () => handleDelete(),
    sortColumn: 'created_date'
  };
  return (
    <>
      <div>
        <ScrollX>
          <ReactTable {...propsData} />
        </ScrollX>
        <Dialog
          maxWidth="lg"
          fullWidth
          open={isAddCustomerDialogOpen}
          PaperProps={{
            sx: {
              borderRadius: '10px'
            }
          }}
        >
          {isAddCustomerDialogOpen && <AddClient customer={customer} onCancel={handleAdd} fetchWorkTable={fetchWorkTable} />}
        </Dialog>
      </div>
    </>
  );
};

export default CustomerList;
