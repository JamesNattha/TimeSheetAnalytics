import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import {
  TextField,
  Card,
  Divider,
  Autocomplete,
  Switch,
  InputLabel,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid
} from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import api from '_api';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import { sizing } from '@mui/system';
import { TimePicker, DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { parse } from 'date-fns';
import { format } from 'date-fns';
import { styled } from '@mui/material/styles';
import { BgColorsOutlined } from '@ant-design/icons';

const Popup = ({ customer, handleClose }) => {
  // State variables for fetched data
  const [departmentData, setDepartmentData] = useState([]);
  const [groupData, setGroupData] = useState([]);
  const [positionData, setPositionData] = useState([]);
  const [department, setDepartment] = useState('');
  const [levelData, setLevelData] = useState([]);
  const [position, setPosition] = useState('');
  const [role, setRole] = useState('');
  const isCreating = !!customer;
  const User = customer?.person;
  const [isChecked, setIsChecked] = useState(User?.User?.is_active);
  console.log('user', User);
  const isRegis = customer?.person?.invite;
  ///--------------------------------------------Handle Func-----------------------------------------------------

  const getInitialValues = (customer) => {
    console.log('customer', customer);
    const newCustomer = {
      email: '',
      department: '',
      group: '',
      level: '',
      position: '',
      role: '',
      startWorkingDate: new Date(),
      isChecked: customer?.person?.User?.is_active || false
    };

    if (customer) {
      console.log('customer?.person?.Department?.department_name', customer?.person?.Department?.department_name);
      const newCustomer = {
        email: customer?.email,
        department: customer?.person?.Department?.department_id,
        group: customer?.person?.Group?.group_id,
        level: customer?.person?.level,
        position: customer?.person?.Position?.position_id,
        role: customer?.person?.role,
        startWorkingDate: customer?.person?.User?.starting_working_date || null,
        isChecked: customer?.person?.is_active || false
      };
      console.log('Merged Customer:', newCustomer);
      return newCustomer;
    }

    console.log('New Customer:', newCustomer);
    return newCustomer;
  };

  const InviteSchema = Yup.object().shape({
    email: Yup.string().email('Must be a valid email').required('Email is required'),
    department: Yup.string().max(36).required('Department is required'),
    group: Yup.string().max(36).required('Group is required'),
    level: Yup.string().required('Level is required'),
    position: Yup.string().max(36).required('Position is required'),
    role: Yup.string().required('Role is required'),
    startWorkingDate: Yup.string().required('Start working date is required')
  });

  ///--------------------------------------------Fetch Data-----------------------------------------------------

  const fetchDepartment = async () => {
    try {
      const { data, isStatus } = await api.inviteRegister.getDepartment();
      console.log('isStatus', isStatus);
      console.log('isStatus data is ', data);
      if (isStatus !== undefined && isStatus) {
        setDepartmentData(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch group data based on selected department
  const fetchGroup = async () => {
    try {
      const { data, isStatus } = await api.inviteRegister.getGroup();
      console.log(data);
      if (isStatus !== undefined && isStatus) {
        setGroupData(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch position data based on selected level
  const fetchPosition = async () => {
    try {
      const { data, isStatus } = await api.inviteRegister.getPosition();
      console.log(data);
      if (isStatus !== undefined && isStatus) {
        setPositionData(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchLevel = async () => {
    try {
      const { data, isStatus } = await api.enum.getEnumLevel();

      if (isStatus !== undefined && isStatus) {
        console.log('enum level', data);
        setLevelData(data);
      }
    } catch (error) {
      console.error(error);
    }
  };



  useEffect(() => {
    fetchDepartment();
    fetchGroup();
    fetchPosition();
    fetchLevel();

  }, []);

  ///--------------------------------------------Func Submit-----------------------------------------------------
  console.log('levelData', levelData);
  // Handle invite button click
  const handlebeforeClose = () => {
    if (isCreating) {
      if (
        !formik.values.email ||
        !formik.values.department ||
        !formik.values.group ||
        !formik.values.level ||
        !formik.values.position ||
        !formik.values.role ||
        !formik.values.startWorkingDate ||
        formik.values.email !== customer.email ||
        formik.values.department !== customer.person.Department.department_id ||
        formik.values.group !== customer.person.Group.group_id ||
        formik.values.level !== customer.person.level ||
        formik.values.position !== customer.person.Position.position_id ||
        formik.values.role !== customer.person.role ||
        formik.values.startWorkingDate !== customer.person.User.starting_working_date ||
        formik.values.isChecked !== customer.person.is_active
      ) {
        Swal.fire({
          title: 'Discard change',
          text: `if you discard the change, this process will not be able to be undone.`,
          showCancelButton: true,
          reverseButtons: true,
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          customClass: {
            confirmButton: 'confirm-rounded-button',
            cancelButton: 'outlined-button'
          },
          iconHtml: '<div class="discard-icon"></div>'
        }).then((result) => {
          if (result.isConfirmed) {
            
            handleClose();
            // navigate('/login');
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            // Call the function to send the email again
            // handleEmailSubmission(email);
          }
        });
      } else {
        handleClose();
      }
    } else {
      if (
        formik.values.email ||
        formik.values.department ||
        formik.values.group ||
        formik.values.level ||
        formik.values.position ||
        formik.values.role
      ) {
        Swal.fire({
          title: 'Discard change',
          text: `if you discard the change, this process will not be able to be undone.`,
          showCancelButton: true,
          reverseButtons: true,
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          customClass: {
            confirmButton: 'confirm-rounded-button',
            cancelButton: 'outlined-button'
          },
          iconHtml: '<div class="discard-icon"></div>'
        }).then((result) => {
          if (result.isConfirmed) {
            handleClose();
            // navigate('/login');
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            // Call the function to send the email again
            // handleEmailSubmission(email);
          }
        });
      } else {
        handleClose();
      }
    }
  };

  const handleInvite = async () => {
    if (isCreating) {
      try {
        const dataToSend = {
          userId: User?.User.user_id,
          profile_Id: User?.profile_id,
          username: formik.values.email || User?.User?.username,
          department: formik.values.department || User?.Department?.department_id,
          group: formik.values.group || User?.Group?.group_id,
          level: formik.values.level.toLowerCase() || User?.level,
          position: formik.values.position || User?.Position?.position_id,
          role: formik.values.role.toLowerCase() || User?.role,
          startWorkingDate: formik.values.startWorkingDate || User?.User?.starting_working_date,
          active: formik.values.isChecked
        };

        console.log('dataTosend eiei Saveeeeeeeeeeeeeee update', dataToSend);

        // Make the API call to send the data
        const createResult = await api.profile.updateProfile(dataToSend);
        // console.log('createResult', createResult);
        if (createResult.isStatus === false && createResult.message === 'User with the provided email already exists.') {
          Swal.fire('Email already exists in the database!', '', 'error');
        } else {
          Swal.fire({
            title: 'Success',
            timer: 2000,
            customClass: 'modal-success',
            text: 'Edition saved',
            showConfirmButton: false, // Remove the confirm button
            iconHtml: '<div class="success-icon"></div>'
          });
          console.log('Data sent successfully!');
          handleClose();
        }
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'Error to update edition, Please try again',
          confirmButtonText: 'Close',
          customClass: {
            confirmButton: 'rounded-button '
          },
          iconHtml: '<div class="discard-icon"></div>'
        });
        console.error('Error sending data:', error);
      }
    } else {
      let depart = '';
      try {
        depart = departmentData.find((item) => item.name === department)?.department_Id;
        const data = {
          username: formik.values.email,
          department: formik.values.department,
          group: formik.values.group,
          level: formik.values.level,
          position: formik.values.position,
          role: formik.values.role.toLowerCase(),
          invite: false,
          startWorkingDate: formik.values.startWorkingDate
        };

        console.log('Invite button clicked');
        console.log('data:', data);

        // Make the API call to send the email
        const createResult = await api.inviteRegister.inviteUser(data);
        if (createResult.isStatus === false && createResult.message === 'User with the provided email already exists.') {
          Swal.fire({
            title: 'Error',
            text: 'This email has already existed in the dashboard, Please try the other one',
            confirmButtonText: 'Close',
            customClass: {
              confirmButton: 'rounded-button '
            },
            iconHtml: '<div class="discard-icon"></div>'
          });
          setEmailError('Email has already existed');
        } else {
          Swal.fire({
            title: 'Success',
            timer: 2000,
            customClass: 'modal-success',
            text: 'The invitation has been send!',
            showConfirmButton: false, // Remove the confirm button
            iconHtml: '<div class="success-icon"></div>'
          });
          handleClose();
          console.log('Email sent successfully!', createResult.message);
        }
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'Please try again',
          confirmButtonText: 'Close',
          customClass: {
            confirmButton: 'rounded-button '
          },
          iconHtml: '<div class="discard-icon"></div>'
        });
        console.error('Error sending email:', error);
      }
    }
  };

  const formik = useFormik({
    initialValues: getInitialValues(customer),
    validationSchema: InviteSchema,
    onSubmit: handleInvite
  });

  const { errors, touched, getFieldProps, handleSubmit } = formik;

  console.log('formik values', formik.values);

  ///----------------------------------------------Return--------------------------------------------------------
  return (
    <Card>
      <Dialog open={open} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: '#F3F4F6' }}>{isCreating ? `Edit User` : `Invite Register`}</DialogTitle>
        <Divider />
        <form onSubmit={handleSubmit}>
          <Divider />
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <InputLabel htmlFor="email">
                  Email Address<div style={{ color: 'red', display: 'inline' }}> *</div>
                </InputLabel>
                <TextField
                  placeholder="Enter Email"
                  value={formik.values.email}
                  {...getFieldProps('email')}
                  fullWidth
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                  InputProps={{
                    style: {
                      borderRadius: '30px '
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel htmlFor="password-reset">
                  Department<div style={{ color: 'red', display: 'inline' }}> *</div>
                </InputLabel>
                <Autocomplete
                  id="country-select-demo"
                  options={departmentData}
                  getOptionLabel={(option) => option.department_name || ''}
                  isOptionEqualToValue={(option, value) => option.department_id === value.department}
                  value={departmentData.find((option) => option.department_id === formik.values.department) || ''}
                  onChange={(event, newValue) => {
                    if (newValue !== null) {
                      console.log('vudc]h;jaaaa', newValue);
                      formik.setFieldValue('department', newValue.department_id);
                      formik.setFieldValue('position', '');
                      console.log('Selected Client ID:', newValue.department_id);
                    } else {
                      formik.setFieldValue('department', '');
                    }
                  }}
                  fullWidth
                  margin="normal"
                  renderInput={(params) => (
                    <div style={{ position: 'relative' }}>
                      <TextField
                        {...params}
                        placeholder="Select Department"
                        {...getFieldProps('department')}
                        error={Boolean(touched.department && errors.department)}
                        helperText={touched.department && errors.department}
                        InputProps={{
                          ...params.InputProps,

                          style: {
                            ...params.InputProps.sx,
                            borderRadius: '30px '
                          }
                        }}
                      />
                    </div>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel htmlFor="password-reset">
                  Group<div style={{ color: 'red', display: 'inline' }}> *</div>
                </InputLabel>
                <Autocomplete
                  id="group"
                  options={groupData}
                  getOptionLabel={(option) => option.group_name || ''}
                  isOptionEqualToValue={(option, value) => option.group_id === value.group}
                  value={groupData.find((option) => option.group_id === formik.values.group) || ''}
                  onChange={(event, newValue) => {
                    if (newValue !== null) {
                      console.log('vudc]h;jaaaa', newValue);
                      formik.setFieldValue('group', newValue.group_id);
                      console.log('Selected group ID:', newValue.group_id);
                    } else {
                      formik.setFieldValue('group', '');
                    }
                  }}
                  fullWidth
                  margin="normal"
                  renderInput={(params) => (
                    <div style={{ position: 'relative' }}>
                      <TextField
                        {...params}
                        placeholder="Select Group"
                        {...getFieldProps('group')}
                        error={Boolean(touched.group && errors.group)}
                        helperText={touched.group && errors.group}
                        InputProps={{
                          ...params.InputProps,
                          style: {
                            ...params.InputProps.sx,
                            borderRadius: '30px '
                          }
                        }}
                      />
                    </div>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel htmlFor="password-reset">
                  Position<div style={{ color: 'red', display: 'inline' }}> *</div>
                </InputLabel>
                <Autocomplete
                  id="position"
                  disabled={formik.values.department ? false : true}
                  options={
                    formik.values.department
                      ? positionData.filter((position) => position.department_id === formik.values.department)
                      : positionData
                  }
                  getOptionLabel={(option) => option.position_name || ''}
                  value={positionData.find((option) => option.position_id === formik.values.position) || ''}
                  onChange={(event, newValue) => {
                    if (newValue !== null) {
                      console.log('vudc]h;jaaaa', newValue);
                      formik.setFieldValue('position', newValue.position_id);
                      console.log('Selected position ID:', newValue.position_id);
                    } else {
                      formik.setFieldValue('position', '');
                    }
                  }}
                  fullWidth
                  margin="normal"
                  renderInput={(params) => (
                    <div style={{ position: 'relative' }}>
                      <TextField
                        {...params}
                        placeholder="Select Position"
                        error={Boolean(touched.position && errors.position)}
                        helperText={formik.values.department ? touched.position && errors.position : null}
                        {...getFieldProps('position')}
                        InputProps={{
                          ...params.InputProps,
                          style: {
                            borderRadius: '30px '
                          }
                        }}
                      />
                    </div>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel htmlFor="password-reset">
                  Level<div style={{ color: 'red', display: 'inline' }}> *</div>
                </InputLabel>
                <Autocomplete
                  id="level"
                  options={levelData}
                  getOptionLabel={(option) => option.name_eng || ''}
                  value={levelData.find((option) => option.enum_id === formik.values.level) || ''}
                  onChange={(event, newValue) => {
                    if (newValue !== null) {
                      formik.setFieldValue('level', newValue.enum_id);
                      console.log('Selected level ID:', newValue);
                    } else {
                      formik.setFieldValue('level', '');
                    }
                  }}
                  fullWidth
                  margin="normal"
                  renderInput={(params) => (
                    <div style={{ position: 'relative' }}>
                      <TextField
                        {...params}
                        placeholder="Select Level"
                        {...getFieldProps('level')}
                        error={Boolean(touched.level && errors.level)}
                        helperText={touched.level && errors.level}
                        InputProps={{
                          ...params.InputProps,
                          style: {
                            borderRadius: '30px '
                          }
                        }}
                      />
                    </div>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel htmlFor="password-reset">
                  Role<div style={{ color: 'red', display: 'inline' }}> *</div>
                </InputLabel>
                <Autocomplete
                  id="role"
                  options={['Admin', 'Management', 'Manager', 'Employee']}
                  getOptionLabel={(option) => option || ''}
                  value={formik.values.role}
                  {...getFieldProps('role')}
                  onChange={(event, newValue) => {
                    if (newValue !== null) {
                      formik.setFieldValue('role', newValue);
                      console.log('Selected role ID:', newValue);
                    } else {
                      formik.setFieldValue('role', '');
                    }
                  }}
                  fullWidth
                  margin="normal"
                  // freeSolo
                  renderInput={(params) => (
                    <div style={{ position: 'relative' }}>
                      <TextField
                        {...params}
                        placeholder="Select Role"
                        error={Boolean(touched.role && errors.role)}
                        helperText={touched.role && errors.role}
                        InputProps={{
                          ...params.InputProps,
                          style: {
                            borderRadius: '30px '
                          }
                        }}
                      />
                    </div>
                  )}
                />
                <div>
                  {isCreating && isRegis && (
                    <FormControlLabel
                      control={
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <Switch
                            checked={formik.values.isChecked}
                            onChange={(e) => {
                              const isChecked = e.target.checked;
                              console.log('isChecked', isChecked);
                              formik.setFieldValue('isChecked', isChecked);
                            }}
                            color="success" // Use 'primary' color for iOS style
                          />
                          <span style={{ marginLeft: '8px' }}>Active</span>
                        </div>
                      }
                    />
                  )}
                </div>
              </Grid>

              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <InputLabel htmlFor="working-date">
                    Starting Date<div style={{ color: 'red', display: 'inline' }}> *</div>
                  </InputLabel>
                  <DesktopDatePicker
                    inputFormat="dd/MM/yyyy"
                    value={formik.values.startWorkingDate}
                    onChange={(date) => formik.setFieldValue('startWorkingDate', date ? date : '')}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        {...getFieldProps('startWorkingDate')}
                        error={Boolean(touched.startWorkingDate && errors.startWorkingDate)}
                        helperText={touched.startWorkingDate && errors.startWorkingDate}
                        onChange={(e) => {
                          const enteredDate = e.target.value;
                          // Check if the entered date matches the desired format 'DD-MM-YYYY'
                          if (/^\d{2}-\d{2}-\d{4}$/.test(enteredDate)) {
                            formik.setFieldValue('startWorkingDate', enteredDate);
                          } else {
                            // formik.setFieldValue('startWorkingDate', '');
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
            </Grid>
          </DialogContent>
          <DialogActions sx={{ pr: 2.5, mt: '130px', mb: '24px' }}>
            <Button
              variant="outlined"
              onClick={handlebeforeClose}
              sx={{
                mr: 1.5,
                backgroundColor: 'transparent',
                borderColor: '#393939',
                color: '#393939',
                borderRadius: '40px',
                width: '170px',
                height: '40px',
                '&:hover': {
                  backgroundColor: '#D2D2D2',
                  borderColor: '#393939',
                  color: '#393939'
                }
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              type="submit"
              sx={{
                backgroundColor: '#393939',
                borderRadius: '40px',
                width: '170px',
                height: '40px',
                '&:hover': {
                  backgroundColor: '#242424'
                }
              }}
            >
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Card>
  );
};

Popup.propTypes = {
  customer: PropTypes.object, // You can specify the expected type for 'customer'
  handleClose: PropTypes.func // You can specify the expected type for 'handleClose'
};

export default Popup;
