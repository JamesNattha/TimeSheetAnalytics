//---------------------- React
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

//---------------------- MUI
import { useTheme } from '@mui/material/styles';
import { Button, DialogActions, DialogContent, DialogTitle, Divider, Grid, TextField, InputLabel } from '@mui/material';
import { Typography } from '@mui/material';

//----------------------- Other
import _ from 'lodash';
import api from '_api';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { openSnackbar } from 'store/reducers/snackbar';
import Swal from 'sweetalert2'; // Import SweetAlert

const getInitialValues = (customer) => {
  const newCustomer = {
    client_id: '',
    client_code: '',
    client_name: '',
    client_detail: '',
    client_phone: '',
    client_incharge: '',
    client_nickname: '',
    email: ''
  };

  if (customer) {
    return _.merge({}, newCustomer, customer);
  }

  return newCustomer;
};

const AddClient = (props) => {
  const { customer, onCancel, fetchWorkTable } = props;

  const theme = useTheme();
  const dispatch = useDispatch();
  const isCreating = !!customer;
  const [open, setOpen] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const CustomerSchema = Yup.object().shape({
    client_code: Yup.string().max(255).required('Client Code is required'),
    client_name: Yup.string().max(255).required('Client Name is required'),
    client_incharge: Yup.string().max(255).required('Person in Charge is required'),
    client_nickname: Yup.string().max(255).required('Nickname is required'),
    client_phone: Yup.string()
      .matches(/^\d{9,10}$/, 'Phone number must be 9 to 10 digits')
      .required('Phone number is required'),
    email: Yup.string().email().max(255).required('Email is required'),
    client_detail: Yup.string().max(500, 'You must be at most 500 characters long')
  });

  const submitConfirm = async (values) => {
    try {
      if (isCreating) {
        await updateModule(formik.values);
        Swal.fire({
          title: 'Success',
          customClass: 'modal-success',
          timer: 2000,
          showConfirmButton: false,
          iconHtml:
          '<div class="success-icon"></div>'
            // '<svg xmlns="http://www.w3.org/2000/svg" height="1.25em" viewBox="0 0 512 512" fill="#76ca66"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 48c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m140.204 130.267l-22.536-22.718c-4.667-4.705-12.265-4.736-16.97-.068L215.346 303.697l-59.792-60.277c-4.667-4.705-12.265-4.736-16.970-.069l-22.719 22.536c-4.705 4.667-4.736 12.265-.068 16.971l90.781 91.516c4.667 4.705 12.265 4.736 16.97.068l172.589-171.204c4.704-4.668 4.734-12.266.067-16.971z"/></svg>'
        });
      } else {
        await setModule();
        Swal.fire({
          title: 'Success',
          customClass: 'modal-success',
          timer: 2000,
          showConfirmButton: false,
          iconHtml:
            '<svg xmlns="http://www.w3.org/2000/svg" height="1.25em" viewBox="0 0 512 512" fill="#76ca66"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 48c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m140.204 130.267l-22.536-22.718c-4.667-4.705-12.265-4.736-16.97-.068L215.346 303.697l-59.792-60.277c-4.667-4.705-12.265-4.736-16.970-.069l-22.719 22.536c-4.705 4.667-4.736 12.265-.068 16.971l90.781 91.516c4.667 4.705 12.265 4.736 16.97.068l172.589-171.204c4.704-4.668 4.734-12.266.067-16.971z"/></svg>'
        });
      }
      setUnsavedChanges(false);
      onCancel();
      fetchWorkTable();
    } catch (error) {
      console.error(error);
      dispatch(
        openSnackbar({
          open: true,
          message: 'Error updating project.',
          variant: 'alert',
          alert: {
            color: 'error'
          },
          close: false
        })
      );
    }
  };

  async function setModule() {
    const clientData = {
      client_code: formik.values.client_code,
      client_name: formik.values.client_name,
      email: formik.values.email,
      client_phone: formik.values.client_phone,
      client_detail: formik.values.client_detail,
      client_incharge: formik.values.client_incharge,
      client_nickname: formik.values.client_nickname
    };

    const createClient = await api.work.createClient([clientData]);
    // window.location.reload(true);
    // console.log('createClient', createClient);
  }

  const handleCancel = () => {
    const formHasUnsavedChanges = Object.keys(touched).some((field) => touched[field]);
    // Prompt the user to confirm before closing if there are unsaved changes
    if (formHasUnsavedChanges) {
      Swal.fire({
        title: 'Cancel',
        text: 'If you cancel now, your information fills will be discard.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#0066FF',
        cancelButtonColor: '#0066FF',
        reverseButtons: true,
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Keep Editing',
        customClass: {
          confirmButton: 'confirm-rounded-button',
          cancelButton: 'outlined-button'
        },
        iconHtml:
          '<svg width="150" height="150" viewBox="0 0 47 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23.4339 0.666016C36.3209 0.666016 46.7673 11.1123 46.7673 23.9993C46.7673 36.8863 36.3209 47.3327 23.4339 47.3327C10.5469 47.3327 0.100586 36.8863 0.100586 23.9993C0.100586 11.1123 10.5469 0.666016 23.4339 0.666016ZM23.4339 5.33268C18.4832 5.33268 13.7353 7.29934 10.2346 10.8C6.73391 14.3007 4.76725 19.0486 4.76725 23.9993C4.76725 28.9501 6.73391 33.698 10.2346 37.1987C13.7353 40.6994 18.4832 42.666 23.4339 42.666C28.3846 42.666 33.1326 40.6994 36.6332 37.1987C40.1339 33.698 42.1006 28.9501 42.1006 23.9993C42.1006 19.0486 40.1339 14.3007 36.6332 10.8C33.1326 7.29934 28.3846 5.33268 23.4339 5.33268ZM23.4339 30.9993C24.0528 30.9993 24.6462 31.2452 25.0838 31.6828C25.5214 32.1203 25.7673 32.7138 25.7673 33.3327C25.7673 33.9515 25.5214 34.545 25.0838 34.9826C24.6462 35.4202 24.0528 35.666 23.4339 35.666C22.8151 35.666 22.2216 35.4202 21.784 34.9826C21.3464 34.545 21.1006 33.9515 21.1006 33.3327C21.1006 32.7138 21.3464 32.1203 21.784 31.6828C22.2216 31.2452 22.8151 30.9993 23.4339 30.9993ZM23.4339 9.99935C24.0528 9.99935 24.6462 10.2452 25.0838 10.6828C25.5214 11.1204 25.7673 11.7138 25.7673 12.3327V26.3327C25.7673 26.9515 25.5214 27.545 25.0838 27.9826C24.6462 28.4202 24.0528 28.666 23.4339 28.666C22.8151 28.666 22.2216 28.4202 21.784 27.9826C21.3464 27.545 21.1006 26.9515 21.1006 26.3327V12.3327C21.1006 11.7138 21.3464 11.1204 21.784 10.6828C22.2216 10.2452 22.8151 9.99935 23.4339 9.99935Z" fill="#ED4040"/></svg>'
      }).then(async (result) => {
        if (result.isConfirmed) {
          formik.resetForm();
          onCancel();
        }
      });
    } else {
      formik.resetForm();
      onCancel();
    }
  };


  async function updateModule(values) {
    const updateClientData = {
      ...values,
      client_id: values.client_id
    };

    const updateData = await api.work.updateClient([updateClientData]);
    // console.log('updateClientData', updateClientData);
    // window.location.reload(true);
  }

  const formik = useFormik({
    initialValues: getInitialValues(customer),
    validationSchema: CustomerSchema,
    onSubmit: submitConfirm
  });

  const { errors, touched, getFieldProps, handleSubmit } = formik;

  // const isFormValid = Object.keys(errors).length === 0 && Object.keys(touched).length !== 0;

  return (
    <div>
      <DialogTitle sx={{ px: 3, backgroundColor: '#f3f4f6 ', fontSize: '24px', fontWeight: 'bold' }} id="scroll-dialog-title">
        {isCreating ? 'Edit Client' : 'Add Client'}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <div className="Client">
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <InputLabel sx={{ marginBottom: '5px' }}>
                  Client Code
                  <span style={{ color: 'red', marginLeft: '3px' }}>*</span>
                </InputLabel>
                <TextField
                  fullWidth
                  rows={4}
                  placeholder="Client Code"
                  value={formik.values.client_code}
                  {...getFieldProps('client_code')}
                  error={Boolean(touched.client_code && errors.client_code)}
                  helperText={touched.client_code && errors.client_code}
                  InputProps={{ sx: { borderRadius: '30px' } }}
                />
              </Grid>
              {/* <Grid item xs={6}>
                <InputLabel sx={{ marginBottom: '5px' }} variant="subtitle1">
                  Client Code *
                </InputLabel>
                <TextField
                  fullWidth
                  rows={4}
                  placeholder="Client Code"
                  value={formik.values.client_code}
                  {...getFieldProps('client_code')}
                  error={Boolean(touched.client_code && errors.client_code)}
                  helperText={touched.client_code && errors.client_code}
                  InputProps={{ sx: { borderRadius: '30px', backgroundColor: '#f3f4f6 ' } }}
                />
              </Grid> */}
              <Grid item xs={6}>
                <InputLabel sx={{ marginBottom: '5px' }}>
                  Client Name
                  <span style={{ color: 'red', marginLeft: '3px' }}>*</span>
                </InputLabel>
                <TextField
                  title="Client Name"
                  fullWidth
                  rows={4}
                  placeholder="Client Name"
                  value={formik.values.client_name}
                  {...getFieldProps('client_name')}
                  error={Boolean(touched.client_name && errors.client_name)}
                  helperText={touched.client_name && errors.client_name}
                  InputProps={{ sx: { borderRadius: '30px' } }}
                />
              </Grid>
            </Grid>
          </div>
          <div className="Contracts">
            <div style={{ alignItems: 'center', margin: '20px 0px 20px 0px' }}>
              <Typography sx={{ marginBottom: '5px' }}>Contacts</Typography>
            </div>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <InputLabel sx={{ marginBottom: '5px' }}>
                  Person in charge
                  <span style={{ color: 'red', marginLeft: '3px' }}>*</span>
                </InputLabel>
                <TextField
                  title="Name Contracts"
                  fullWidth
                  rows={4}
                  placeholder="Client Contact Name"
                  value={formik.values.client_incharge}
                  {...getFieldProps('client_incharge')}
                  error={Boolean(touched.client_incharge && errors.client_incharge)}
                  helperText={touched.client_incharge && errors.client_incharge}
                  InputProps={{ sx: { borderRadius: '30px' } }}
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel sx={{ marginBottom: '5px' }}>
                  Nickname
                  <span style={{ color: 'red', marginLeft: '3px' }}>*</span>
                </InputLabel>
                <TextField
                  title="Nickname"
                  fullWidth
                  rows={4}
                  placeholder="Nickname"
                  value={formik.values.client_nickname}
                  {...getFieldProps('client_nickname')}
                  error={Boolean(touched.client_nickname && errors.client_nickname)}
                  helperText={touched.client_nickname && errors.client_nickname}
                  InputProps={{ sx: { borderRadius: '30px' } }}
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel sx={{ marginBottom: '5px' }}>
                  Email
                  <span style={{ color: 'red', marginLeft: '3px' }}>*</span>
                </InputLabel>
                <TextField
                  title="Email"
                  fullWidth
                  rows={4}
                  placeholder="Email"
                  value={formik.values.email}
                  {...getFieldProps('email')}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                  InputProps={{ sx: { borderRadius: '30px' } }}
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel sx={{ marginBottom: '5px' }}>
                  Phone Number
                  <span style={{ color: 'red', marginLeft: '3px' }}>*</span>
                </InputLabel>
                <TextField
                  title="Phone Number"
                  fullWidth
                  rows={4}
                  placeholder="Phone Number"
                  value={formik.values.client_phone}
                  {...getFieldProps('client_phone')}
                  error={Boolean(touched.client_phone && errors.client_phone)}
                  helperText={touched.client_phone && errors.client_phone}
                  InputProps={{ sx: { borderRadius: '30px' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel sx={{ marginBottom: '5px' }}>Notes</InputLabel>
                <TextField
                  fullWidth
                  multiline
                  rows={7}
                  placeholder="Enter Notes"
                  value={formik.values.client_detail}
                  {...getFieldProps('client_detail')}
                  error={Boolean(touched.client_detail && errors.client_detail)}
                  helperText={touched.client_detail && errors.client_detail}
                  InputProps={{ sx: { borderRadius: '10px' } }}
                />
              </Grid>
            </Grid>
          </div>
          <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'flex-end', padding: '0 2.5 0 2.5' }}>
            <div style={{ display: 'flex', padding: '5px 7px 5px 7px', alignItems: 'center' }}>
              <Button
                onClick={handleCancel}
                variant="outlined"
                sx={{
                  width: '150px',
                  marginLeft: '5px',
                  height: 'auto',
                  borderRadius: '40px',
                  borderColor: '#232323',
                  color: '#232323',
                  '&:hover': {
                    borderColor: '#686868 !important',
                    color: '#686868'
                  }
                }}
              >
                Cancel
              </Button>
            </div>
            <div style={{ display: 'flex', padding: '5px 7px 5px 7px', alignItems: 'center' }}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  width: '150px',
                  marginLeft: '5px',
                  height: 'auto',
                  borderRadius: '40px',
                  backgroundColor: '#232323',
                  '&::after': {
                    boxShadow: '0 0 5px 5px rgba(0, 0, 0, 0.9)',
                    borderRadius: '40px'
                  },
                  '&:hover': {
                    backgroundColor: '#686868 !important'
                  }
                }}
                // disabled={!isFormValid && !isCreating}
              >
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
        <Divider />
      </form>
    </div>
  );
};

AddClient.propTypes = {
  customer: PropTypes.object,
  onCancel: PropTypes.func.isRequired
};

export default AddClient;
