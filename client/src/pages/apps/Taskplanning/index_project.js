//React
import React, { useState, useCallback, useEffect } from 'react';

//MUI
import { useTheme } from '@mui/material/styles';
import { Dialog } from '@mui/material';
// import { Typography } from '@mui/material';

//Component
import ReactTable from 'components/third-party/GobalTable';

//Other
import api from '_api';
import AddProject from 'sections/apps/customer_ev2/add_edit/AddProject';
import AddSelect from 'sections/apps/customer_ev2/add_edit/FetchProjects';
import useNewPerson from './data/data_main_project';
import useColumns from './column/column_main_project';
import handleDelete from './modal/delete_modal';

const ProjectList = () => {
  const theme = useTheme();
  const [customer, setCustomer] = useState(null);
  const [add, setAdd] = useState(false);
  const [select, setSelect] = useState(false);
  const [fetchData, setFetchData] = useState();
  const [isSelectDialogOpen, setIsSelectDialogOpen] = useState(false);
  const data = useNewPerson(fetchData);

  const fetchWorkTable = async () => {
    try {
      const { data, isStatus } = await api.work.fetchSubDataProject();
      // console.log('ดูแค่อันนี้นะ', data);
      if (isStatus) setFetchData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchWorkTable();
  }, []);

  const handleAdd = () => {
    setAdd(!add);
    if (customer && add) setCustomer(null);
    setIsAddCustomerDialogOpen(true);
    setIsAddCustomerDialogOpen(!isAddCustomerDialogOpen);
  };

  const handleSelect = async () => {
    setSelect(!select);
    if (customer && select) setCustomer(null);
    setIsSelectDialogOpen(true);
    setIsSelectDialogOpen(!isSelectDialogOpen);
  };

  const handleDeleteCustomer = (values) => {
    handleDelete(values, fetchWorkTable, 'project'); // Use the imported handleDelete function
  };

  const [isAddCustomerDialogOpen, setIsAddCustomerDialogOpen] = useState(false);

  // Step 3: Create function to open and close the dialog
  const columns = useColumns(handleAdd, setCustomer, handleDeleteCustomer);

  // const renderRowSubComponent = useCallback(({ row }) => <SubItems DatafromIndex={data[row.id]} />, [data]);

  const propsProject = {
    customer,
    onCancel: () => handleAdd(),
    fetchWorkTable: () => fetchWorkTable()
  };

  const propsData = {
    columns,
    data,
    // renderRowSubComponent,
    getHeaderProps: (column) => column.getSortByToggleProps(),
    handleAdd: () => handleAdd(),
    handleSelect: () => handleSelect(),
    nameCreateButton: 'Project',
    sortColumn: 'created_date',
    fixColumnR: 'action',
    fixColumnL: 'autoNumber',
    checkProject: 'thisIsProject'
  };

  return (
    <>
      <div>
        <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
          <ReactTable {...propsData} />
        </div>
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
          {isAddCustomerDialogOpen && <AddProject {...propsProject} />}
        </Dialog>
        <Dialog
          maxWidth="sm"
          fullWidth
          open={isSelectDialogOpen}
          PaperProps={{
            sx: {
              borderRadius: '10px'
            }
          }}
        >
          {isSelectDialogOpen && <AddSelect customer={customer} onCancel={handleSelect} fetchWorkTable={fetchWorkTable} />}
        </Dialog>
      </div>
    </>
  );
};

export default ProjectList;
