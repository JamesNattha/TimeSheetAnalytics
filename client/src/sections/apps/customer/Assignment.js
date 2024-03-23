import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import { useTheme } from '@mui/material/styles';
import { Button, DialogActions, DialogContent, DialogTitle, Divider, Grid, TextField } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import _ from 'lodash';
import { openSnackbar } from 'store/reducers/snackbar';
import api from '_api';

const getInitialValues = (customer) => {
  const newCustomer = {
    id: '',
    workNo: '',
    startDate: '',
    endDate: '',
    note: '',
    detail: ''
  };

  if (customer) {
    return _.merge({}, newCustomer, customer);
  }

  return newCustomer;
};

const allStatus = ['Complicated', 'Single', 'Relationship'];

const AddCustomer = ({ customer, onCancel }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isCreating = !customer;

  const [selectedImage, setSelectedImage] = useState(undefined);

  useEffect(() => {
    if (selectedImage) {
      // setAvatar(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  const CustomerSchema = Yup.object().shape({
    workNo: Yup.string().max(255).required('Work No. is required'),
    detail: Yup.string().max(500)
  });

  const deleteHandler = () => {
    // Delete customer logic
    onCancel();
  };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const updatedWorkNo = {
        worknoId: values.id,
        detail: values.detail,
        note: values.note,
        createdBy: values.createdBy,
        workNo: values.workNo,
        startDate: moment(values.startDate, 'DD-MM-YYYY').format('YYYY-MM-DD'),
        endDate: moment(values.endDate, 'DD-MM-YYYY').format('YYYY-MM-DD')
      };

      // Call the updateWorkNo function in your API module
      const response = await api.workno.updateWorkNo(updatedWorkNo);
      console.log('response', response);

      dispatch(
        openSnackbar({
          open: true,
          message: 'Customer updated successfully.',
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );

      onCancel();
    } catch (error) {
      console.error(error);
      dispatch(
        openSnackbar({
          open: true,
          message: 'Error updating customer.',
          variant: 'alert',
          alert: {
            color: 'error'
          },
          close: false
        })
      );
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: getInitialValues(customer),
    validationSchema: CustomerSchema,
    onSubmit
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <div>
      <DialogTitle sx={{ my: 2, px: 3 }} id="scroll-dialog-title">
        {isCreating ? 'Add Customer' : 'Edit Customer'}
      </DialogTitle>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <DialogContent sx={{ mx: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                rows={4}
                label="Work Name"
                {...getFieldProps('workNo')}
                error={Boolean(touched.workNo && errors.workNo)}
                helperText={touched.workNo && errors.workNo}
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
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Detail"
                {...getFieldProps('detail')}
                error={Boolean(touched.detail && errors.detail)}
                helperText={touched.detail && errors.detail}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Note"
                {...getFieldProps('note')}
                error={Boolean(touched.note && errors.note)}
                helperText={touched.note && errors.note}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <Divider />
        <DialogActions sx={{ pr: 2.5 }}>
          {!isCreating && (
            <Button
              variant="contained"
              onClick={deleteHandler}
              sx={{
                mr: 1.5,
                color: theme.palette.error.dark,
                backgroundColor: theme.palette.error.light,
                '&:hover': {
                  backgroundColor: theme.palette.error.dark
                }
              }}
            >
              Delete
            </Button>
          )}
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
