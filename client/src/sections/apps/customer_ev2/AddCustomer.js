import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import { useTheme } from '@mui/material/styles';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  TextField,
  TextareaAutosize,
  FormControl,
  FormHelperText
} from '@mui/material';
import { styled } from '@mui/system';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import _ from 'lodash';
import { openSnackbar } from 'store/reducers/snackbar';
import api from '_api';
import Swal from 'sweetalert2';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { formatPhoneNumber } from 'react-phone-number-input';

const getInitialValues = (customer) => {
  const newCustomer = {
    id: '',
    customerName: '',
    startDate: '',
    endDate: '',
    customerStatus: '',
    customerEmail: '',
    customerPhone: '',
    customerAddress: ''
  };

  if (customer) {
    return _.merge({}, newCustomer, customer);
  }

  return newCustomer;
};

const blue = {
  100: '#DAECFF',
  200: '#b6daff',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75'
};

const StyledTextarea = styled(TextareaAutosize)(
  ({ theme }) => `
    width: 320px;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 4px;

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
);

const AddCustomer = ({ customer, onCancel }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isCreating = !!customer;
  const [selectedImage, setSelectedImage] = useState(undefined);

  useEffect(() => {
    if (selectedImage) {
      // setAvatar(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  const CustomerSchema = Yup.object().shape({
    customerName: Yup.string().max(255).required('Customer Name is required'),
    startDate: Yup.date().required('Start Date is required'),
    endDate: Yup.date().required('End Date is required'),
    customerEmail: Yup.string().email().max(255).required('Customer Email is required'),
    customerPhone: Yup.string().min(9).max(10).required('Customer Phone is required'),
    customerAddress: Yup.string().max(255).required('Customer Address is required')
  });

  const handleSubmit = async (values) => {
    try {
      if (isCreating) {
        updateModule(formik.values);
        dispatch(
          openSnackbar({
            open: true,
            message: 'Project updated successfully.',
            variant: 'alert',
            alert: {
              color: 'success'
            },
            close: false
          })
        );
      } else {
        setModule();
        dispatch(
          openSnackbar({
            open: true,
            message: 'Project created successfully.',
            variant: 'alert',
            alert: {
              color: 'success'
            },
            close: false
          })
        );
      }
      onCancel();
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
    const workData = {
      customerName: formik.values.customerName,
      startDate: moment(formik.values.startDate, 'DD-MM-YYYY').format(),
      endDate: moment(formik.values.endDate, 'DD-MM-YYYY').format(),
      customerStatus: 0,
      customerEmail: formik.values.customerEmail,
      customerPhone: formik.values.customerPhone,
      customerAddress: formik.values.customerAddress
    };

    const createWorkData = await api.work.createCustomer([workData]);
    window.location.reload(true);
  }

  async function updateModule(values) {
    const updatedWork = {
      ...values,
      startDate: moment(formik.values.startDate, 'DD-MM-YYYY').format(),
      endDate: moment(formik.values.endDate, 'DD-MM-YYYY').format(),
      customerId: customer.id
    };

    const updateData = await api.work.updateCustomer([updatedWork]);
    window.location.reload(true);
  }

  const formik = useFormik({
    initialValues: getInitialValues(customer),
    validationSchema: CustomerSchema,
    onSubmit: handleSubmit
  });

  const { errors, touched, getFieldProps } = formik;

  return (
    <div>
      <DialogTitle sx={{ my: 2, px: 3 }} id="scroll-dialog-title">
        {isCreating ? 'Edit Customer' : 'Add Customer'}
      </DialogTitle>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <DialogContent sx={{ mx: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                rows={4}
                label="Customer Name"
                value={formik.values.customerName}
                {...getFieldProps('customerName')}
                error={Boolean(touched.customerName && errors.customerName)}
                helperText={touched.customerName && errors.customerName}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth error={Boolean(touched.customerAddress && errors.customerAddress)}>
                <StyledTextarea
                  minRows={4}
                  maxRows={4}
                  placeholder="Enter Address"
                  value={formik.values.customerAddress}
                  {...getFieldProps('customerAddress')}
                  style={{ width: '100%', maxWidth: '100%', minWidth: '100%', height: '200px', maxHeight: '200px', minHeight: '150px' }}
                />
                {touched.customerAddress && errors.customerAddress && <FormHelperText>{errors.customerAddress}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <PhoneInput
                international
                defaultCountry="TH"
                placeholder="Enter phone number"
                value={formik.values.customerPhone}
                onChange={(value) => formik.setFieldValue('customerPhone', value)}
                onBlur={formik.handleBlur('customerPhone')}
                error={Boolean(formik.touched.customerPhone && formik.errors.customerPhone)}
                helperText={formik.touched.customerPhone && formik.errors.customerPhone}
                // {...formik.getFieldProps('customerPhone')}
                numberInputProps={{
                  style: {
                    width: '100%',
                    height: '41px',
                    outline: 'none',
                    borderRadius: '4px',
                    boxShadow: '0',
                    borderColor: 'rgba(0, 0, 0, 0.23)',
                    padding: '0 14px'
                  },
                  minLength: 9,
                  maxLength: 20
                }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                rows={4}
                label="Enter Email"
                value={formik.values.customerEmail}
                {...getFieldProps('customerEmail')}
                error={Boolean(touched.customerEmail && errors.customerEmail)}
                helperText={touched.customerEmail && errors.customerEmail}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Start Date"
                  value={formik.values.startDate ? moment(formik.values.startDate, 'DD-MM-YYYY').toDate() : null}
                  onChange={(date) => formik.setFieldValue('startDate', date ? moment(date).format('DD-MM-YYYY') : '')}
                  renderInput={(params) => <TextField fullWidth {...params} />}
                  inputFormat="dd/MM/yyyy"
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="End Date"
                  value={formik.values.endDate ? moment(formik.values.endDate, 'DD-MM-YYYY').toDate() : null}
                  onChange={(date) => formik.setFieldValue('endDate', date ? moment(date).format('DD-MM-YYYY') : '')}
                  renderInput={(params) => <TextField fullWidth {...params} />}
                  inputFormat="dd/MM/yyyy"
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </DialogContent>
        <Divider />
        <DialogActions sx={{ pr: 2.5 }}>
          <Button
            variant="contained"
            onClick={onCancel}
            sx={{
              mr: 1.5,
              backgroundColor: theme.palette.primary.light,
              '&:hover': {
                backgroundColor: theme.palette.primary.dark
              }
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            type="submit"
            sx={{
              backgroundColor: theme.palette.success.light,
              '&:hover': {
                backgroundColor: theme.palette.success.dark
              }
            }}
          >
            Save
          </Button>
        </DialogActions>
      </form>
    </div>
  );
};

AddCustomer.propTypes = {
  customer: PropTypes.object,
  onCancel: PropTypes.func.isRequired
};

export default AddCustomer;
