//---------------------- React
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

//--------------------- API
import api from '_api';

//---------------------- MUI
import { useTheme } from '@mui/material/styles';
import {
  Button,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  TextField,
  InputLabel,
  Autocomplete,
  FormControlLabel,
  Radio,
  Checkbox
} from '@mui/material';

//----------------------- Other -----------------------
import _ from 'lodash';
import * as Yup from 'yup';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
// import { hover } from '@syncfusion/ej2-react-schedule';
import { openSnackbar } from 'store/reducers/snackbar';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Swal from 'sweetalert2'; // Import SweetAlert

const calculateDaysHoursMinutes = (total) => {
  const hoursPerDay = 8;
  const totalMinutes = total;
  const calculatedDays = Math.floor(totalMinutes / (hoursPerDay * 60));
  const calculatedHours = Math.floor((totalMinutes % (hoursPerDay * 60)) / 60);
  const calculatedMinutes = totalMinutes % 60;
  return {
    total_days: calculatedDays,
    total_hours: calculatedHours,
    total_minutes: calculatedMinutes
  };
};

const getInitialValues = (customer) => {
  let newCustomer = {
    client_id: '',
    client_name: '',
    created_date: '',
    detail: '',
    end_date: '',
    is_active: '',
    is_deleted: '',
    project_id: '',
    project_name: '',
    start_date: '',
    work_code: '',
    work_id: '',
    work_level: 'medium',
    work_name: '',
    work_status: '',
    work_type: '',
    work_type_name: '',
    send_to: [],
    total: ''
  };

  if (customer) {
    newCustomer.work_level = customer.work_level || 'medium';
    const { total } = customer;
    const { total_days, total_hours, total_minutes } = calculateDaysHoursMinutes(total);

    // Update the properties of newCustomer only if the corresponding customer values are not empty strings
    for (const key in newCustomer) {
      if (Object.prototype.hasOwnProperty.call(newCustomer, key) && customer[key] !== '') {
        newCustomer[key] = customer[key];
      }
    }

    // Update total and time properties
    newCustomer.total = total;
    newCustomer.total_days = total_days;
    newCustomer.total_hours = total_hours;
    newCustomer.total_minutes = total_minutes;
  }

  return newCustomer;
};

const AddTask = ({ customer, onCancel, fetchWorkTable }) => {
  // console.log('customer', customer);
  const theme = useTheme();
  const dispatch = useDispatch();
  const isCreating = !!customer;
  // const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [options, setOptions] = useState([]);
  const [fetchMyself, setFetchMyself] = useState([]);
  const [fetchUsers, setFetchUser] = useState([]);
  const [value, setValue] = useState('medium');
  const [selectEnum, setSelectEnum] = useState();
  const [calculatedTotal, setCalculatedTotal] = useState(0);

  //----------------------------------------------------------------- Fetch data ALL -----------------------------------------------------------------

  const filteredItems = fetchMyself.filter((item) => item && item.send_to).map((item) => item.send_to);
  const newSend_to = filteredItems.join(', ');

  const fetchDataMyself = async () => {
    try {
      const { data, isStatus } = await api.users.fetchMyself();
      if (isStatus) {
        const optionData = data.map((item) => ({
          send_to: item.user_id,
          username: item.first_name + ' ' + item.last_name
        }));
        setFetchMyself(optionData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // console.log('fetchMyself', fetchMyself);

  const fetchDataUser = async () => {
    try {
      const { data, isStatus } = await api.users.fetchUsers();
      if (isStatus) {
        const optionData = data.map((item) => ({
          send_to: item.user_id,
          username: item.first_name + ' ' + item.last_name
        }));
        setFetchUser(optionData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProject = async () => {
    try {
      const { data, isStatus } = await api.work.fetchSubDataProject();
      if (isStatus) {
        const optionData = data.flatMap((item) =>
          item.Projects.map((subitem) => ({
            project_id: subitem.project_id,
            project_name: subitem.project_name
          }))
        );
        setOptions(optionData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEnum = async () => {
    try {
      const { data, isStatus } = await api.enum.getEnum();
      // console.log('enumdata', data);
      if (isStatus) {
        const optionData = data.map((item) => ({
          work_type: item.enum_id,
          name_eng: item.name_eng
        }));
        // console.log('optionData', optionData);
        setSelectEnum(optionData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProject();
    fetchDataUser();
    fetchEnum();
    fetchDataMyself();
  }, []);

  useEffect(() => {
    // Calculate total based on formik values when component mounts
    const total = calculateTotalFromFormikValues(formik.values);
    setCalculatedTotal(total);
  }, [customer]);

  const calculateTotalFromFormikValues = (values) => {
    const days = parseInt(values.total_days, 10) || 0;
    const hours = parseInt(values.total_hours, 10) || 0;
    const minutes = parseInt(values.total_minutes, 10) || 0;
    return days * 8 * 60 + hours * 60 + minutes;
  };

  //----------------------------------------------------------------- Required error field -----------------------------------------------------------------
  const CustomerSchema = Yup.object().shape({
    // work_code: Yup.string().max(255).required('Work Code is required'),
    work_name: Yup.string().max(255).required('Work Name is required'),
    work_type: Yup.string().max(255).required('Work Type is required'),
    project_id: Yup.string().required('Project Name is required'),
    send_to: Yup.array()
      .of(Yup.string().max(255))
      .test('send_to-required', 'Assign is required', function (value) {
        if (value.length > 0) {
          return true; // Field is required when the array is not empty
        }
        return false; // Field is not required when the array is empty
      }),
    start_date: Yup.string().max(255).required('Start Date is required'),
    end_date: Yup.string()
      .max(255)
      .required('End Date is required')
      .test('date-order', 'End Date must be equal or after Start Date', function (endDate) {
        const { start_date: startDate } = this.parent;
        return moment(endDate, 'DD-MM-YYYY').isSameOrAfter(moment(startDate, 'DD-MM-YYYY'));
      }),
    detail: Yup.string().max(500, 'You must be at most 500 characters long')
  });

  //----------------------------------------------------------------- Confirm submit data -----------------------------------------------------------------
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
            '<svg xmlns="http://www.w3.org/2000/svg" height="1.25em" viewBox="0 0 512 512" fill="#76ca66"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 48c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m140.204 130.267l-22.536-22.718c-4.667-4.705-12.265-4.736-16.97-.068L215.346 303.697l-59.792-60.277c-4.667-4.705-12.265-4.736-16.970-.069l-22.719 22.536c-4.705 4.667-4.736 12.265-.068 16.971l90.781 91.516c4.667 4.705 12.265 4.736 16.97.068l172.589-171.204c4.704-4.668 4.734-12.266.067-16.971z"/></svg>'
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
      // setUnsavedChanges(false);
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
    const projectData = {
      project_id: formik.values.project_id,
      work_code: formik.values.work_code,
      work_name: formik.values.work_name,
      work_type: formik.values.work_type,
      send_to: formik.values.send_to,
      work_level: formik.values.work_level,
      detail: formik.values.detail,
      start_date: moment(formik.values.start_date, 'DD-MM-YYYY').format(),
      end_date: moment(formik.values.end_date, 'DD-MM-YYYY').format(),
      total: formik.values.total
    };

    const createProject = await api.work.createWork([projectData]);
    console.log('createProject', createProject);
  }

  async function updateModule(values) {
    const updateClientData = {
      ...values,
      // work_level: formik.values.work_level,
      start_date: moment(formik.values.start_date, 'DD-MM-YYYY').format(),
      end_date: moment(formik.values.end_date, 'DD-MM-YYYY').format()
    };

    const updateData = await api.work.updateWork([updateClientData]);
    // window.location.reload(true);
  }

  //----------------------------------------------------------------- Handle ALL -----------------------------------------------------------------

  const handleCancel = () => {
    const formHasUnsavedChanges = Object.keys(touched).some((field) => touched[field]);
    // Prompt the user to confirm before closing if there are unsaved changes
    if (formHasUnsavedChanges) {
      Swal.fire({
        title: 'Cancel',
        text: 'If you cancel now, your filled information will be discard.',
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

  const handleChange = (event) => {
    formik.setFieldValue('work_level', event.target.value);
  };

  const handleTotalChange = () => {
    const total = calculateTotalFromFormikValues(formik.values);
    setCalculatedTotal(total);

    // Update the formik values and corresponding fields
    formik.setValues({
      ...formik.values,
      total,
      ...calculateDaysHoursMinutes(total)
    });
  };

  const formik = useFormik({
    initialValues: getInitialValues(customer),
    validationSchema: CustomerSchema,
    onSubmit: submitConfirm
  });

  const { errors, touched, getFieldProps, handleSubmit, setFieldValue } = formik;

  const sortedFetchUsers = fetchUsers.slice().sort((a, b) => {
    // Use localeCompare with a custom collation function
    return a.username.localeCompare(b.username, 'en-US-u-kf-upper', {
      sensitivity: 'base',
      ignorePunctuation: true
    });
  });

  useEffect(() => {
    if (!isCreating) {
      setFieldValue('send_to', [newSend_to]);
      console.log('formik.values:', formik.values);
    }
  }, [newSend_to]);

  // console.log('formik.values', formik.values);
  return (
    <div>
      <DialogTitle sx={{ px: 3, backgroundColor: '#f3f4f6 ', fontSize: '24px', fontWeight: 'bold' }} id="scroll-dialog-title">
        {isCreating ? 'Edit Task' : 'Add Task'}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <div className="Client" style={{ marginBottom: '20px' }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <InputLabel sx={{ marginBottom: '5px' }}>
                  Project Name
                  <span style={{ color: 'red', marginLeft: '3px' }}>*</span>
                </InputLabel>
                <Autocomplete
                  id="project_name"
                  fullWidth
                  value={options.find((option) => option.project_id === formik.values.project_id) || null}
                  onChange={(event, newValue) => {
                    if (newValue !== null) {
                      formik.setFieldValue('project_id', newValue.project_id);
                      console.log('Selected Project ID:', newValue.project_id);
                    } else {
                      formik.setFieldValue('project_id', '');
                    }
                  }}
                  options={options}
                  getOptionLabel={(option) => option.project_name || ''}
                  isOptionEqualToValue={(option, value) => option.project_id === value.project_id}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Project Name"
                      // {...getFieldProps('project_id')}
                      error={Boolean(touched.project_id && errors.project_id)}
                      helperText={touched.project_id && errors.project_id}
                      InputProps={{
                        ...params.InputProps,
                        sx: {
                          ...params.InputProps.sx,
                          borderRadius: '30px'
                        }
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel sx={{ marginBottom: '5px' }}>
                  Work Name
                  <span style={{ color: 'red', marginLeft: '3px' }}>*</span>
                </InputLabel>
                <TextField
                  fullWidth
                  rows={4}
                  placeholder="Work Name"
                  value={formik.values.work_name}
                  {...getFieldProps('work_name')}
                  error={Boolean(touched.work_name && errors.work_name)}
                  helperText={touched.work_name && errors.work_name}
                  InputProps={{ sx: { borderRadius: '30px' } }}
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel sx={{ marginBottom: '5px' }}>
                  Work Type
                  <span style={{ color: 'red', marginLeft: '3px' }}>*</span>
                </InputLabel>
                <Autocomplete
                  id="work_type"
                  fullWidth
                  value={selectEnum ? selectEnum.find((option) => option.work_type == formik.values.work_type) || null : null}
                  onChange={(event, newValue) => {
                    if (newValue !== null) {
                      formik.setFieldValue('work_type', newValue.work_type);
                      console.log('Selected Work Type:', newValue.work_type);
                    } else {
                      formik.setFieldValue('work_type', '');
                    }
                  }}
                  options={selectEnum || []}
                  getOptionLabel={(option) => option.name_eng || ''}
                  isOptionEqualToValue={(option, value) => option.work_type === value.work_type}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Work Type Name"
                      // {...getFieldProps('work_type')}
                      error={Boolean(touched.work_type && errors.work_type)}
                      helperText={touched.work_type && errors.work_type}
                      InputProps={{
                        ...params.InputProps,
                        sx: {
                          ...params.InputProps.sx,
                          borderRadius: '30px'
                        }
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <div style={{ display: 'flex', flexDirection: 'row', marginTop: '30px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Radio
                      value="hard"
                      checked={formik.values.work_level === 'hard'} // Check if 'work_level' matches 'hard'
                      onChange={handleChange}
                    />
                    <InputLabel>Hard</InputLabel>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Radio
                      value="medium"
                      checked={formik.values.work_level === 'medium'} // Check if 'work_level' matches 'medium'
                      onChange={handleChange}
                    />
                    <InputLabel>Medium</InputLabel>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Radio
                      value="easy"
                      checked={formik.values.work_level === 'easy'} // Check if 'work_level' matches 'easy'
                      onChange={handleChange}
                    />
                    <InputLabel>Easy</InputLabel>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12}>
                <InputLabel sx={{ marginBottom: '5px' }}>
                  Assign to
                  <span style={{ color: 'red', marginLeft: '3px' }}>*</span>
                </InputLabel>
                <Autocomplete
                  multiple
                  id="checkbox-select"
                  options={sortedFetchUsers}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option.username}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <FormControlLabel control={<Checkbox checked={selected} />} label={option.username} />
                    </li>
                  )}
                  style={{ width: '100%', borderRadius: '30px' }} // Set borderRadius for Autocomplete
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Assigned to"
                      variant="outlined"
                      sx={{ borderRadius: '15px' }} // Set borderRadius for TextField
                    />
                  )}
                  value={fetchUsers.filter((user) => {
                    try {
                      if (Array.isArray(formik.values.send_to)) {
                        return formik.values.send_to.includes(user.send_to);
                      } else {
                        const newData = JSON.parse(formik.values.send_to);
                        const newData2 = newData.includes(user.send_to);
                        if (newData2) {
                          return true;
                        }
                        formik.setFieldValue('send_to', newData);
                      }
                    } catch (error) {
                      console.log(error);
                    }
                  })}
                  onChange={(_, newValue) => {
                    // Create a list of selected user IDs
                    const selectedUserIds = newValue.map((user) => user.send_to);

                    // Update formik.values.send_to with the selected IDs
                    formik.setFieldValue('send_to', selectedUserIds);
                  }}
                  limitTags={5} // Display ellipsis when more than 5 items are selected
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <InputLabel sx={{ marginBottom: '5px' }}>
                    Start Date
                    <span style={{ color: 'red', marginLeft: '3px' }}>*</span>
                  </InputLabel>
                  <DesktopDatePicker
                    value={formik.values.start_date ? moment(formik.values.start_date, 'DD-MM-YYYY').toDate() : null}
                    onChange={(date) => formik.setFieldValue('start_date', date ? moment(date).format('DD-MM-YYYY') : '')}
                    inputFormat="dd/MM/yyyy"
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        {...params}
                        placeholder="Start Date"
                        {...getFieldProps('start_date')}
                        error={Boolean(touched.start_date && errors.start_date)}
                        helperText={touched.start_date && errors.start_date}
                        onChange={(e) => {
                          const enteredDate = e.target.value;
                          // Check if the entered date matches the desired format 'DD-MM-YYYY'
                          if (/^\d{2}-\d{2}-\d{4}$/.test(enteredDate)) {
                            formik.setFieldValue('start_date', enteredDate);
                          } else {
                            // Handle invalid date format here if needed
                          }
                        }}
                        InputProps={{
                          ...params.InputProps,
                          sx: {
                            ...params.InputProps.sx,
                            borderRadius: '30px'
                          }
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={3}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <InputLabel sx={{ marginBottom: '5px' }}>
                    End Date
                    <span style={{ color: 'red', marginLeft: '3px' }}>*</span>
                  </InputLabel>
                  <DesktopDatePicker
                    value={formik.values.end_date ? moment(formik.values.end_date, 'DD-MM-YYYY').toDate() : null}
                    onChange={(date) => formik.setFieldValue('end_date', date ? moment(date).format('DD-MM-YYYY') : '')}
                    inputFormat="dd/MM/yyyy"
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        {...params}
                        {...getFieldProps('end_date')}
                        error={Boolean(touched.end_date && errors.end_date)}
                        helperText={touched.end_date && errors.end_date}
                        onChange={(e) => {
                          const enteredDate = e.target.value;
                          // Check if the entered date matches the desired format 'DD-MM-YYYY'
                          if (/^\d{2}-\d{2}-\d{4}$/.test(enteredDate)) {
                            formik.setFieldValue('end_date', enteredDate);
                          } else {
                            // Handle invalid date format here if needed
                          }
                        }}
                        InputProps={{
                          ...params.InputProps,
                          sx: {
                            ...params.InputProps.sx,
                            borderRadius: '30px'
                          }
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={2}>
                <InputLabel sx={{ marginBottom: '5px' }}>Days</InputLabel>
                <TextField
                  fullWidth
                  rows={4}
                  placeholder="Days"
                  type="number"
                  value={formik.values.total_days || 0}
                  onChange={(event) => {
                    const inputValue = event.target.value;
                    formik.setFieldValue('total_days', inputValue);
                  }}
                  onBlur={handleTotalChange}
                  InputProps={{ sx: { borderRadius: '30px' } }}
                  inputProps={{ min: 0 }}
                />
              </Grid>
              <Grid item xs={2}>
                <InputLabel sx={{ marginBottom: '5px' }}>Hours</InputLabel>
                <TextField
                  fullWidth
                  rows={4}
                  placeholder="Hours"
                  type="number"
                  value={formik.values.total_hours || 0}
                  onChange={(event) => {
                    const inputValue = event.target.value;
                    formik.setFieldValue('total_hours', inputValue);
                  }}
                  onBlur={handleTotalChange}
                  InputProps={{ sx: { borderRadius: '30px' } }}
                  inputProps={{ min: 0 }}
                />
              </Grid>
              <Grid item xs={2}>
                <InputLabel sx={{ marginBottom: '5px' }}>Minutes</InputLabel>
                <TextField
                  fullWidth
                  rows={4}
                  placeholder="Minutes"
                  type="number"
                  value={formik.values.total_minutes || 0}
                  onChange={(event) => {
                    const inputValue = event.target.value;
                    formik.setFieldValue('total_minutes', inputValue);
                  }}
                  onBlur={handleTotalChange}
                  InputProps={{ sx: { borderRadius: '30px' } }}
                  inputProps={{ min: 0 }}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel sx={{ marginBottom: '5px' }}>Details</InputLabel>
                <TextField
                  fullWidth
                  multiline
                  rows={7}
                  placeholder="Enter Detail"
                  value={formik.values.detail}
                  {...getFieldProps('detail')}
                  error={Boolean(touched.detail && errors.detail)}
                  helperText={touched.detail && errors.detail}
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

AddTask.propTypes = {
  customer: PropTypes.object,
  onCancel: PropTypes.func.isRequired
};

export default AddTask;
