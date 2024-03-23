import React, { useCallback, useState, useEffect } from 'react';
import api from '_api';
import { useTheme } from '@mui/material/styles';
import { Dialog } from '@mui/material';
import GroupView from 'sections/apps/setting/company/material/data/user-view';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';

// material
import ReactTable from 'components/TableRole';
import useNewPerson from './data';
import useColumns from './column';
import AddPopup from './user/invite';
import Swal from 'sweetalert2';

// ==============================|| CUSTOMER - LIST VIEW ||============================== //

const CustomerList = () => {
  const theme = useTheme();
  const [customer, setCustomer] = useState(null);
  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState(false);
  const [status, setIsStatus] = useState(true);
  const [datanow, setData] = useState([]);
  const namePage = 'department';
  const [identity, setIdentity] = useState('');
  const [isAddCustomerDialogOpen, setIsAddCustomerDialogOpen] = useState(false);

  const fetchUser = async () => {
    try {
      const { data, isStatus } = await api.setting.fetchUser();
      if (isStatus) setData(data), setIsStatus(isStatus);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const data = useNewPerson(datanow);

  const handleAdd = () => {
    setAdd(!add);
    setIdentity('add');
    if (customer && add) setCustomer(null);
    fetchUser();
    setIsAddCustomerDialogOpen(true);
    setIsAddCustomerDialogOpen(!isAddCustomerDialogOpen);
  };

  const handleResendEmail = (values) => {
    console.log('resend value', values);
    Swal.fire({
      title: 'Resend email',
      text: `An email will be sent to ${values.email}`,
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      customClass: {
        confirmButton: 'confirm-rounded-button',
        cancelButton: 'outlined-button'
      },
      iconHtml: '<div class="mail-icon"></div>'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Success',
          customClass: 'modal-success',
          timer: 2000,
          text: 'An email has been resent',
          showConfirmButton: false,
          iconHtml: '<div class="success-icon"></div>'
        });
        const resended = api.profile.resendEmail(values.person);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        ///
      }
    });
  };

  const isDelete = async (values) => {
    console.log('121212', values.person.user_id);
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
        const deleted = api.profile.deleteProfile({ id: values.person.user_id }).then(() => {
          fetchUser();
          console.log('hello delete');
          fetchUser();
          Swal.fire({
            title: 'Success',
            timer: 2000,
            customClass: 'modal-success',
            text: 'The information has been deleted',
            showConfirmButton: false,
            // customClass: {
            //   confirmButton: 'rounded-button '
            // },
            iconHtml: '<div class="success-icon"></div>'
          });
        });
      }
    });
  };

  const columns = useColumns(handleAdd, setCustomer, namePage, theme, status, isDelete, handleResendEmail);

  const renderRowSubComponent = useCallback(({ row }) => <GroupView dataDepartment={data[row.id]} />, [data]);

  return (
    <div >
      <ScrollX>
        <ReactTable
          columns={columns}
          data={data}
          namepage={namePage}
          handleAdd={handleAdd}
          getHeaderProps={(column) => column}
          renderRowSubComponent={renderRowSubComponent}
          sortColumn={'autoNumber'}
        />
      </ScrollX>
      <Dialog maxWidth="sm" fullWidth open={isAddCustomerDialogOpen} sx={{ borderRadius: '10px', '& .MuiDialog-paper': { p: 0 } }}>
        {add && <AddPopup customer={customer} handleClose={handleAdd} namePage={namePage} status={identity} />}
      </Dialog>
    </div>
  );
};

export default CustomerList;
