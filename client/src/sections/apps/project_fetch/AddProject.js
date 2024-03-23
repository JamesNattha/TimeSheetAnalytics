import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import { useTheme } from '@mui/material/styles';
import { Button, DialogActions, DialogContent, DialogTitle, Divider, Grid, TextField, Select, MenuItem } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import _ from 'lodash';
import { openSnackbar } from 'store/reducers/snackbar';
import api from '_api';
import Swal from 'sweetalert2';

import { useLocation } from 'react-router-dom';

const getInitialValues = (customer) => {
  const newCustomer = {
    id: '',
    customerId: '',
    projectName: '',
    startDate: '',
    endDate: ''
  };

  if (customer) {
    return _.merge({}, newCustomer, customer);
  }

  return newCustomer;
};

const AddCustomer = ({ customer, onCancel }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isCreating = !!customer;
  const location = useLocation();
  const [boardId, setBoardId] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');

  const [selectedImage, setSelectedImage] = useState(undefined);

  useEffect(() => {
    if (selectedImage) {
      // setAvatar(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  useEffect(() => {
    const getBoardId = async () => {
      try {
        const { data, isStatus } = await api.monday.getBoardId();
        if (isStatus) {
          const groupedBoards = _.chain(data.data.boards)
            .filter((board) => !board.name.includes('Subitems of'))
            .groupBy('name')
            .values()
            .flatten()
            .value();
          setBoardId(groupedBoards);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getBoardId();
  }, []);

  const CustomerSchema = Yup.object().shape({
    projectName: Yup.string().max(255).required('Customer Name is required'),
    startDate: Yup.date().required('Start Date is required'),
    endDate: Yup.date().required('End Date is required')
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
      customerId: location.state.id,
      projectName: formik.values.projectName,
      startDate: moment(formik.values.startDate, 'DD-MM-YYYY').format(), // Format the date
      endDate: moment(formik.values.endDate, 'DD-MM-YYYY').format() // Format the date
    };

    const createWorkData = await api.work.createProject([workData]);
    window.location.reload(true);
  }

  async function updateModule(values) {
    const updatedProject = {
      ...values,
      startDate: moment(formik.values.startDate, 'DD-MM-YYYY').format(),
      endDate: moment(formik.values.endDate, 'DD-MM-YYYY').format(),
      projectId: customer.id,
      customerId: location.state.id
    };

    const updateData = await api.work.updateProject([updatedProject]); // Updated to call 'updateProject' instead of 'updateCustomer'
    window.location.reload(true);
  }

  const formik = useFormik({
    initialValues: getInitialValues(customer),
    validationSchema: CustomerSchema,
    onSubmit: handleSubmit // Change onSubmit to handleSubmit
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
              <Select
                fullWidth
                label="Project Name"
                value={formik.values.projectName} // Use formik's value for the selected project
                onChange={(event) => formik.setFieldValue('projectName', event.target.value)} // Update formik's field value
                error={Boolean(touched.projectName && errors.projectName)}
                helperText={touched.projectName && errors.projectName}
              >
                {boardId.map((board) => (
                  <MenuItem key={board.id} value={board.name}>
                    {board.name}
                  </MenuItem>
                ))}
              </Select>
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
