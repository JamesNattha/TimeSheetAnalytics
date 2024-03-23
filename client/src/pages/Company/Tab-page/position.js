//React
import React, { useState, useCallback, useEffect } from 'react';

//MUI
import { useTheme } from '@mui/material/styles';
import { Dialog } from '@mui/material';

//Component
import ReactTable from 'components/GlobalTable';
import ScrollX from 'components/ScrollX';

//Other
import api from '_api';
import AddClient from 'sections/apps/customer_ev2/add_edit/AddClient';
import useNewPerson from '../Data/data_main_position';
import useColumns from '../Column/column_main_position';
import Swal from 'sweetalert2';
import SubItems from '../Sub/sub_position';
import AddPopup from 'sections/apps/setting/company/Popup/Popup_position';
// import handleDelete from '../../apps/taskplanning/modal/delete_modal';

const PositionList = () => {
  const [customer, setCustomer] = useState(null);
  const [add, setAdd] = useState(false);
  // const [fetchData, setFetchData] = useState([]);
  const namePage = 'position';
  const [isAddCustomerDialogOpen, setIsAddCustomerDialogOpen] = useState(false);
  const [departData, setDepartData] = useState([]);
  const data = useNewPerson(departData);
  const [identity, setIdentity] = useState('');
  const [isExpand, SetExpand] = useState(false);

  const fetchDepartment = async () => {
    try {
      const { data, isStatus } = await api.company.getPosition();
      if (isStatus) setDepartData(data);
      //   console.log('datanow',datanow)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDepartment();
  }, []);

  const handleAdd = async (values) => {
    setIdentity('');
    setAdd(!add);
    if (values?.position_id) {
      setIdentity('edit');
    } else {
      setIdentity('add');
      setCustomer(null);
    }

    SetExpand(!isExpand);
    if (customer && identity === 'add') setCustomer(null);
    fetchDepartment();
  };

  const fetchData = () => {
    fetchDepartment();
  };

  const handleDeleteCustomer = (values) => {
    fetchDepartment();
    Swal.fire({
      title: 'Delete',
      text: 'if you delete the information, this process will not be able to be undone.',
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
      iconHtml: '<div class="delete-icon"></div>'
    }).then((result) => {
      if (result.isConfirmed) {
        fetchDepartment();
        const deleted = api.company.deletePosition(values).then(() => {
          fetchData();
          Swal.fire({
            title: 'Success',
            timer: 2000,
            customClass: 'modal-success',
            showConfirmButton: false,
            iconHtml: '<div class="success-icon"></div>'
          });
        });
      }
    });
  };
  console.log('data position', data);
  const columns = useColumns(handleAdd, setCustomer, handleDeleteCustomer);

  const renderRowSubComponent = useCallback(({ row }) => <SubItems DatafromIndex={data[row.id]} />, [data]);
  const renderExpandPopup = (
    <AddPopup open={add} customer={customer} onCancel={handleAdd} namePage={namePage} status={identity} fetchDepartment={fetchDepartment} />
  );
  //Send to Table
  const propsData = {
    columns,
    data,
    renderRowSubComponent,
    getHeaderProps: (column) => column.getSortByToggleProps(),
    nameCreateButton: 'Add Position',
    handleAdd: () => handleAdd(),
    handleDelete: () => handleDelete(),
    sortColumn: 'created_date',
    isExpand: isExpand,
    expandPage: renderExpandPopup
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
          {/* {isAddCustomerDialogOpen && <AddClient customer={customer} onCancel={handleAdd} />} */}
        </Dialog>
      </div>
    </>
  );
};

export default PositionList;
