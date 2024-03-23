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
  FormControl,
  FormHelperText,
  MenuItem,
  InputLabel,
  Select,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { styled } from '@mui/system';
import _ from 'lodash';
import { openSnackbar } from 'store/reducers/snackbar';
import api from '_api';
import Swal from 'sweetalert2';

import { useLocation } from 'react-router-dom';

const getInitialValues = (customer) => {
  const newCustomer = {
    id: '',
    projectId: '',
    workName: '',
    detail: '',
    startDate: '',
    endDate: '',
    sumTime: '',
    sendTo: ''
  };

  if (customer) {
    return _.merge({}, newCustomer, customer);
  }

  return newCustomer;
};

//Styled
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

const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  '& .MuiSvgIcon-root': {
    width: '1.3em', // Adjust the size of the checkbox icon
    height: '1.3em', // Adjust the size of the checkbox icon
    borderRadius: 4,
    backgroundColor: theme.palette.grey[300], // Background color of the unchecked checkbox
    '&:hover': {
      backgroundColor: theme.palette.grey[400] // Background color on hover
    },
    '&.Mui-checked': {
      backgroundColor: theme.palette.success.main, // Background color of the checked checkbox
      '&:hover': {
        backgroundColor: theme.palette.success.dark // Background color on hover when checked
      }
    }
  }
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  '& .MuiSelect-root': {
    borderRadius: 4,
    border: `1px solid ${theme.palette.grey[400]}`, // Border color of the select
    padding: '8px 12px',
    '&:focus': {
      borderRadius: 4,
      borderColor: theme.palette.primary.main // Border color on focus
    }
  }
}));

const AddCustomer = ({ customer, onCancel }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isCreating = !!customer;
  const location = useLocation();

  const [selectedImage, setSelectedImage] = useState(undefined);
  const [users, setUsers] = useState([]);

  const fetchAllUser = async () => {
    try {
      const { data, isStatus } = await api.monday.fetchAllUser();
      if (isStatus) setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllUser();
  }, []);

  useEffect(() => {
    if (selectedImage) {
      // setAvatar(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  const CustomerSchema = Yup.object().shape({
    workName: Yup.string().max(255).required('Work Name is required'),
    detail: Yup.string().max(255).required('Detail is required'),
    sumTime: Yup.number().required('Sum Time to use is required'),
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

  const [isChecked, setIsChecked] = useState(false);

  async function setModule() {
    const workData = {
      projectId: location.state.id,
      workName: formik.values.workName,
      detail: formik.values.detail,
      startDate: moment(formik.values.startDate, 'DD-MM-YYYY').format(),
      endDate: moment(formik.values.endDate, 'DD-MM-YYYY').format(),
      sumTime: formik.values.sumTime,
      sendTo: formik.values.sendTo
    };

    const createWorkData = await api.work.createWork([workData]);
    window.location.reload(true);
  }

  async function updateModule(values) {
    const updatedWork = {
      ...values,
      workId: customer.id,
      projectId: location.state.id
    };

    const updateData = await api.work.updateWork([updatedWork]);
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
                label="Work Name"
                value={formik.values.workName}
                {...getFieldProps('workName')}
                error={Boolean(touched.workName && errors.workName)}
                helperText={touched.workName && errors.workName}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth error={Boolean(touched.detail && errors.detail)}>
                <StyledTextarea
                  minRows={4}
                  maxRows={4}
                  placeholder="Enter Detail"
                  value={formik.values.detail}
                  {...getFieldProps('detail')}
                  style={{ width: '100%', maxWidth: '100%', minWidth: '100%', height: '200px', maxHeight: '200px', minHeight: '150px' }}
                />
                {touched.detail && errors.detail && <FormHelperText>{errors.detail}</FormHelperText>}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
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
            <Grid item xs={12} sm={4}>
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

            <Grid item xs={4}>
              <TextField
                fullWidth
                rows={4}
                label="Enter Sum Time"
                value={formik.values.sumTime}
                {...getFieldProps('sumTime')}
                error={Boolean(touched.sumTime && errors.sumTime)}
                helperText={touched.sumTime && errors.sumTime}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                control={<StyledCheckbox checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} />}
                label="My Checkbox"
              />
              {isChecked && (
                <StyledSelect
                  fullWidth
                  label="Send To"
                  value={formik.values.sendTo}
                  onChange={(event) => formik.setFieldValue('sendTo', event.target.value)}
                  error={Boolean(touched.sendTo && errors.sendTo)}
                  helperText={touched.sendTo && errors.sendTo}
                >
                  {users.map((user) => (
                    <MenuItem key={user.id} value={user.username}>
                      {user.username}
                    </MenuItem>
                  ))}
                </StyledSelect>
              )}
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
