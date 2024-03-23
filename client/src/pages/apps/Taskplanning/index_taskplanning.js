//React
import React, { useState, useEffect } from 'react';

//MUI
import { Dialog } from '@mui/material';

//Component
import ReactTable from 'components/third-party/TaskTable';
import ScrollX from 'components/ScrollX';

//Other
import api from '_api';
import AddTask from 'sections/apps/customer_ev2/add_edit/AddTask';
import useNewPerson from './data/data_main_task_all';
import useNewPerson2 from './data/data_main_task_assigned';
import useNewPerson3 from './data/data_main_task_inprogress';
import useColumns from './column/column_main_task_all';
import useColumns2 from './column/column_main_task_assigned';
import useColumns3 from './column/column_main_task_inprogress';
import Swal from 'sweetalert2';
import { useRecoilValue } from 'recoil';
import { selectTab } from 'components/third-party/recoil';
import handleUpdate from './modal/updateSuccess';

const PersonalList = () => {
  const [customer, setCustomer] = useState(null);
  const [add, setAdd] = useState(false);
  const [fetchData, setFetchData] = useState([]);
  const [isAddCustomerDialogOpen, setIsAddCustomerDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchUser, setFetchUser] = useState([]);
  const [fetchUserAll, setFetchUserAll] = useState([]);
  const [mondayData, setMondayData] = useState([]);

  const activeTab = useRecoilValue(selectTab);
  // console.log('customer', customer);

  const fetchWorkTable = async () => {
    setIsLoading(true); // Set loading state to true while fetching
    try {
      const { data, isStatus } = await api.work.fetchDataWork();
      if (isStatus) { 
        console.log(data);
        setFetchData(data);
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false); // Set loading state to false in case of an error
    }
  };

  const fetchDataUser = async () => {
    try {
      const { data, isStatus } = await api.users.fetchMyself();
      console.log('mySelf', data)
      if (isStatus) {
        setFetchUser(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDataUserAll = async () => {
    try {
      const { data, isStatus } = await api.users.fetchUsers();
      // console.log('dataaaaa', data);
      if (isStatus) {
        setFetchUserAll(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMonday = async () => {
    try {
      const { data, isStatus } = await api.monday.fetchMonday();
      // console.log('dataaaaa', data);
      if (isStatus) {
        setMondayData(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMonday();
    fetchWorkTable();
    fetchDataUser();
    fetchDataUserAll();
  }, []);

  const handleAdd = async () => {
    setAdd(!add);
    if (customer && add) setCustomer(null);
    setIsAddCustomerDialogOpen(true);
    setIsAddCustomerDialogOpen(!isAddCustomerDialogOpen);
  };

  const updateStatus = (values) => {
    console.log('values', values);
    handleUpdate(values, fetchWorkTable); // Use the imported handleDelete function
  };

  async function updateModuleWork(values, fetchWorkTable) {
    try {
      const deleted = await api.work.deleteWork({ work_id: values.work_id, project_id: values.project_id }).then(() => {
        fetchWorkTable();
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete(values) {
    try {
      Swal.fire({
        title: 'Record removed',
        text: 'After deleting the record, this process will not be able to be undone.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#0066FF',
        cancelButtonColor: '#0066FF',
        reverseButtons: true,
        confirmButtonText: 'Confirm',
        customClass: {
          confirmButton: 'confirm-rounded-button',
          cancelButton: 'outlined-button'
        },
        iconHtml:
          '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" fill="#ff0000"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"/></svg>'
      }).then((result) => {
        if (result.isConfirmed) {
          updateModuleWork(values, fetchWorkTable);
          Swal.fire({
            title: 'Success',
            customClass: 'modal-success',
            allowEscapeKey: true,
            timer: 2000,
            showConfirmButton: false,
            iconHtml:
              '<svg xmlns="http://www.w3.org/2000/svg" height="1.25em" viewBox="0 0 512 512" fill="#76ca66"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 48c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m140.204 130.267l-22.536-22.718c-4.667-4.705-12.265-4.736-16.97-.068L215.346 303.697l-59.792-60.277c-4.667-4.705-12.265-4.736-16.970-.069l-22.719 22.536c-4.705 4.667-4.736 12.265-.068 16.971l90.781 91.516c4.667 4.705 12.265 4.736 16.97.068l172.589-171.204c4.704-4.668 4.734-12.266.067-16.971z"/></svg>'
          });
          // updateModule();
        }
      });
    } catch (error) {
      console.error(error);
    }
    // console.log('values', values);
  }
  console.log(fetchData);
  const countAll = useNewPerson(fetchData, fetchUser, fetchUserAll).length;
  const countAssign = useNewPerson2(fetchData, fetchUser, fetchUserAll).length;
  const countInprogress = useNewPerson3(fetchData, fetchUser, fetchUserAll).length;
  console.log('countAll', countAll)
  const countData = {
    all: countAll,
    assign: countAssign,
    inprogress: countInprogress
  };

  // console.log('countData', countData);

  //Send to Table
  const propsDataAll = {
    columns: useColumns(handleAdd, setCustomer, handleDelete, updateStatus, fetchWorkTable),
    data: useNewPerson(fetchData, fetchUser, fetchUserAll, mondayData),
    // renderRowSubComponent,
    getHeaderProps: (column) => column.getSortByToggleProps(),
    nameCreateButton: 'Task',
    countData: countData,
    handleAdd: () => handleAdd(),
    sortColumn: 'created_date',
    fixColumnL: 'autoNumber',
    fixColumnL2: 'selection',
    fixColumnR: 'action',
    // fixColumnR2: 'stopwatch',
    fixColumnR2: 'work_status',
    handleUpdate,
    fetchWorkTable
  };
  const propsDataAssigned = {
    columns: useColumns2(handleAdd, setCustomer, handleDelete, updateStatus, fetchWorkTable, activeTab),
    data: useNewPerson2(fetchData, fetchUser, fetchUserAll),
    getHeaderProps: (column) => column.getSortByToggleProps(),
    nameCreateButton: 'Task',
    countData: countData,
    handleAdd: () => handleAdd(),
    sortColumn: 'created_date',
    fixColumnL: 'autoNumber',
    fixColumnL2: 'selection',
    fixColumnR: 'action',
    fixColumnR2: 'work_status',
    handleUpdate,
    fetchWorkTable
  };

  const propsDataInprogress = {
    columns: useColumns3(handleAdd, setCustomer, handleDelete, updateStatus, fetchWorkTable),
    data: useNewPerson3(fetchData, fetchUser, fetchUserAll),
    // renderRowSubComponent,
    getHeaderProps: (column) => column.getSortByToggleProps(),
    nameCreateButton: 'Task',
    countData: countData,
    handleAdd: () => handleAdd(),
    sortColumn: 'created_date',
    fixColumnL: 'autoNumber',
    fixColumnL2: 'selection',
    fixColumnR: 'action',
    // fixColumnR2: 'stopwatch',
    fixColumnR2: 'work_status',
    handleUpdate,
    fetchWorkTable
  };

  let activePropsData;
  if (activeTab === 'all') {
    activePropsData = propsDataAll;
  } else if (activeTab === 'assigned') {
    activePropsData = propsDataAssigned;
  } else if (activeTab === 'inprogress') {
    activePropsData = propsDataInprogress;
  }
  return (
    <>
      <div>
        <ScrollX>
          {isLoading ? ( // Display loading indicator if isLoading is true
            <div>Loading...</div>
          ) : (
            <ReactTable {...activePropsData} />
          )}
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
          {isAddCustomerDialogOpen && <AddTask customer={customer} onCancel={handleAdd} fetchWorkTable={fetchWorkTable} />}
        </Dialog>
      </div>
    </>
  );
};

export default PersonalList;
