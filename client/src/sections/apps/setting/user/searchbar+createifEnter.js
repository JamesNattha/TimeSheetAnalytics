import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Card,
  CardContent,
  Select,
  MenuItem,
  InputLabel,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Divider,
  Autocomplete,
  Box,
  Switch,
  FormGroup
} from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import api from '_api';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import { sizing } from '@mui/system';
import { TimePicker, DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { styled } from '@mui/material/styles';
import { BgColorsOutlined } from '@ant-design/icons';

const Popup = ({ customer, handleClose }) => {
  // State variables for fetched data
  const [departmentData, setDepartmentData] = useState([]);
  const [groupData, setGroupData] = useState([]);
  const [positionData, setPositionData] = useState([]);
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [group, setGroup] = useState('');
  const [level, setLevel] = useState('');
  const [position, setPosition] = useState('');
  const [role, setRole] = useState('');
  const [emailError, setEmailError] = useState('');
  const [departmentError, setDepartmentError] = useState('');
  const [levelError, setLevelError] = useState('');
  const [roleError, setRoleError] = useState('');
  const [positionError, setPositionError] = useState('');
  const [groupError, setGroupError] = useState('');
  const [startWorkingDate, setStartWorkingDate] = useState(new Date());
  const [startWorkingDateError, setStartWorkingDateError] = useState('');
  const isCreating = !!customer;
  const User = customer?.person;
  const [isChecked, setIsChecked] = useState(User?.User?.is_active);
  console.log('user', User);

  ///--------------------------------------------Handle Func-----------------------------------------------------

  const handleSwitchChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleStartWorkingDateChange = (date) => {
    if (date) {
      setStartWorkingDate(date === null || date === '' ? null : date); // Set to null if date is cleared, otherwise set to the selected date
      setStartWorkingDateError('');
    } else {
      // If the date is cleared, set the state to new Date()
      setStartWorkingDate(null);
      setStartWorkingDateError('');
    }
  };
  // Handle email input change
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError('');
  };

  // Handle department input change
  const handleDepartmentChange = (event, newValue) => {
    console.log('event easy', event.target.innerText);
    console.log('event newValue', newValue);
    console.log('easy', department);
    if (newValue !== null) {
      setDepartment(newValue);
      console.log('easy', department);
      setDepartmentError('');
    } else {
      setDepartment('');
      console.log('return clear', department);
    }
  };

  const handleGroupChange = (event, newValue) => {
    console.log('event easy', event.target.innerText);
    console.log('event newValue', newValue);
    console.log('easy', group);
    if (newValue !== null) {
      // If the newValue is an object and not null, it means an existing option was selected
      setGroup(newValue); // Set the selected option's group_Id
      console.log('easy', group);
      setGroupError('');
    } else {
      // If newValue is null, it means the user cleared the selection
      setGroup(''); // Clear the group selection
      console.log('return clear', group);
    }
  };

  // Handle level input change
  const handleLevelChange = (event, newValue) => {
    console.log('event easy', event.target.innerText);
    console.log('event newValue', newValue);
    setLevel(event.target.innerText); // Set the selected option's group_Id
    console.log('easy', level);
    setLevelError('');
  };

  // Handle position input change
  const handlePositionChange = (event, newValue) => {
    console.log('event easy', event.target.innerText);
    console.log('event newValue', newValue);
    console.log('easy', position);
    if (newValue !== null) {
      setPosition(newValue); // Set the selected option's group_Id
      console.log('easy', position);
      setPositionError('');
    } else {
      setPosition(''); // Clear the group selection
      console.log('return clear', position);
    }
  };

  const handleRoleChange = (event, newValue) => {
    console.log('event easy', event.target.innerText);
    console.log('event newValue', newValue);
    console.log('easy', role);
    setRole(newValue);
    setRoleError('');
  };

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

  useEffect(() => {
    fetchDepartment();
    fetchGroup();
    fetchPosition();
  }, []);

  ///--------------------------------------------Func Submit-----------------------------------------------------

  const isEmailValid = (email) => {
    // Regular expression pattern for a valid email address
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    return emailPattern.test(email);
  };

  // Handle invite button click
  const handlebeforeClose = () => {
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
  };

  const handleInvite = async () => {
    // if (!isEmailValid(email || User?.User?.username)) {
    //   setEmailError('Must be a valid email');
    //   return;
    // }
    if (email || department.department_id || group.group_id || level || position.position_id || role || startWorkingDate)
      if (isCreating) {
        try {
          const dataToSend = {
            userId: User?.User.user_id,
            profile_Id: User?.profile_id,
            username: email || User?.User?.username,
            department: department.department_id || User?.Department?.department_id,
            group: group.group_id || User?.Group?.group_id,
            level: level.toLowerCase() || User?.level,
            position: position.position_id || User?.Position?.position_id,
            role: role.toLowerCase() || User?.role,
            startWorkingDate: startWorkingDate || User?.User?.starting_working_date,
            active: isChecked
          };

          console.log('dataTosend eiei Saveeeeeeeeeeeeeee', dataToSend);
          // Make the API call to send the data
          const createResult = await api.profile.updateProfile(dataToSend);
          console.log('createResult', createResult);
          if (createResult.isStatus === false && createResult.message === 'User with the provided email already exists.') {
            Swal.fire('Email already exists in the database!', '', 'error');
          } else {
            Swal.fire({
              title: 'Success',
              timer: 2000,
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
          if (!department || !level || !role || !group || !startWorkingDate || !position || !isEmailValid(email || User?.User?.username)) {
            if (!email) setEmailError('Must be a valid email');
            if (!position) setPositionError('Position is required');
            if (!department) setDepartmentError('Department is required');
            if (!level) setLevelError('Level is required');
            if (!role) setRoleError('Role is required');
            if (!group) setGroupError('Group is required');
            if (!startWorkingDate) setStartWorkingDateError('Start working date is required');
            console.log('email',startWorkingDate)
            Swal.fire({
              title: 'Error',
              text: 'Data is missing!, Please fill in all required fields',
              confirmButtonText: 'Close',
              customClass: {
                confirmButton: 'rounded-button '
              },
              iconHtml: '<div class="discard-icon"></div>'
            });

            return;
          }
          if (
            !email ||
            !department ||
            !level ||
            !role ||
            !group ||
            !startWorkingDate ||
            !position ||
            !isEmailValid(email || User?.User?.username)
          ) {
            if (!email) setEmailError('Email is required');
            if (!position) setPositionError('Position is required');
            if (!department) setDepartmentError('Department is required');
            if (!level) setLevelError('Level is required');
            if (!role) setRoleError('Role is required');
            if (!group) setGroupError('Group is required');
            if (!startWorkingDate) setStartWorkingDateError('Start working date is required');
            Swal.fire({
              title: 'Error',
              text: 'Data is missing!, Please fill in all required fields',
              confirmButtonText: 'Close',
              customClass: {
                confirmButton: 'rounded-button '
              },
              iconHtml: '<div class="discard-icon"></div>'
            });

            return;
          }

          depart = departmentData.find((item) => item.name === department)?.department_Id;

          const data = {
            username: email,
            department: department.department_id,
            group: group.group_id,
            level: level.toLowerCase(),
            position: position.position_id,
            role: role.toLowerCase(),
            invite: false,
            startWorkingDate: startWorkingDate
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
              text: 'The invitation has been send!',
              showConfirmButton: false, // Remove the confirm button
              iconHtml: '<div class="success-icon"></div>'
            });
            handleClose();
            console.log('Email sent successfully!', createResult.message);
          }

          setStartWorkingDate();
          setEmail('');
          setDepartment('');
          setGroup('');
          setLevel('');
          setPosition('');
          setRole('');
        } catch (error) {
          Swal.fire('Invite is fail!!', 'System fail to invite', 'error');
          console.error('Error sending email:', error);
        }
      }
  };

  ///----------------------------------------------Return--------------------------------------------------------
  return (
    <Card>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ backgroundColor: '#F3F4F6' }}>{isCreating ? `Edit User` : `Invite Register`}</DialogTitle>
        <Divider />
        <CardContent>
          <div style={{ position: 'relative' }}>
            <InputLabel htmlFor="email">
              Email Address<div style={{ color: 'red', display: 'inline' }}> *</div>
            </InputLabel>
            <TextField
              id="outlined-basic-auto"
              type="email"
              placeholder="Enter Email"
              value={User?.User?.username ? User?.User?.username : email}
              onChange={handleEmailChange}
              fullWidth
              error={emailError !== ''}
              InputProps={{
                style: {
                  borderRadius: '30px '
                }
              }}
            />
            {emailError && (
              <div style={{ marginTop: '3px', marginLeft: '14px', top: '100%', left: 0, color: '#ff4d4f', fontSize: '0.75em' }}>
                {emailError}
              </div>
            )}
          </div>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: '10px' }}>
            <div style={{ marginRight: '5px', width: '95%', borderRadius: '50%' }}>
              <InputLabel htmlFor="password-reset">
                Department<div style={{ color: 'red', display: 'inline' }}> *</div>
              </InputLabel>
              <Autocomplete
                id="country-select-demo"
                options={departmentData}
                getOptionLabel={(option) => option.department_name || ''}
                value={departmentData?.find((option) => option.department_name === User?.Department?.department_name) || null}
                onChange={handleDepartmentChange}
                fullWidth
                margin="normal"
                freeSolo
                error={departmentError !== ''}
                helperText={departmentError}
                renderInput={(params) => (
                  <div style={{ position: 'relative' }}>
                    <TextField
                      {...params}
                      placeholder="Select Department"
                      error={departmentError !== ''}
                      InputProps={{
                        ...params.InputProps,
                        style: {
                          borderRadius: '30px '
                        }
                      }}
                    />
                    {departmentError && (
                      <div style={{ marginTop: '3px', marginLeft: '14px', top: '100%', left: 0, color: '#ff4d4f', fontSize: '0.75em' }}>
                        {departmentError}
                      </div>
                    )}
                  </div>
                )}
              />
            </div>
            <div style={{ width: '95%' }}>
              <InputLabel htmlFor="password-reset">
                Group<div style={{ color: 'red', display: 'inline' }}> *</div>
              </InputLabel>
              <Autocomplete
                id="group"
                options={groupData}
                getOptionLabel={(option) => option.group_name || ''}
                value={groupData?.find((option) => option.group_name === User?.Group?.group_name) || null}
                onChange={handleGroupChange}
                fullWidth
                margin="normal"
                freeSolo
                renderInput={(params) => (
                  <div style={{ position: 'relative' }}>
                    <TextField
                      {...params}
                      placeholder="Select Group"
                      error={groupError !== ''}
                      InputProps={{
                        ...params.InputProps,
                        style: {
                          borderRadius: '30px '
                        }
                      }}
                    />
                    {groupError && (
                      <div style={{ marginTop: '3px', marginLeft: '14px', top: '100%', left: 0, color: '#ff4d4f', fontSize: '0.75em' }}>
                        {groupError}
                      </div>
                    )}
                  </div>
                )}
              />
            </div>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: '10px' }}>
            <div style={{ marginRight: '5px', width: '95%', borderRadius: '50%' }}>
              <InputLabel htmlFor="password-reset">
                Position<div style={{ color: 'red', display: 'inline' }}> *</div>
              </InputLabel>
              <Autocomplete
                id="position"
                options={positionData}
                getOptionLabel={(option) => option.position_name || ''}
                value={positionData?.find((option) => option.position_name === User?.Position?.position_name) || null}
                onChange={handlePositionChange}
                fullWidth
                margin="normal"
                freeSolo
                error={positionError !== ''}
                helperText={positionError}
                renderInput={(params) => (
                  <div style={{ position: 'relative' }}>
                    <TextField
                      {...params}
                      placeholder="Select Position"
                      error={positionError !== ''}
                      InputProps={{
                        ...params.InputProps,
                        style: {
                          borderRadius: '30px '
                        }
                      }}
                    />
                    {positionError && (
                      <div style={{ marginTop: '3px', marginLeft: '14px', top: '100%', left: 0, color: '#ff4d4f', fontSize: '0.75em' }}>
                        {positionError}
                      </div>
                    )}
                  </div>
                )}
              />
            </div>

            <div style={{ width: '95%' }}>
              <InputLabel htmlFor="password-reset">
                Level<div style={{ color: 'red', display: 'inline' }}> *</div>
              </InputLabel>
              <Autocomplete
                id="level"
                options={['Owner', 'Manager', 'Lead', 'Senior', 'Junior', 'Trainee']} // Provide an array directly
                getOptionLabel={(option) => option || ''}
                value={level || (User?.level ? User?.level : '')} // Initialize level with an empty string or a valid default value
                onChange={handleLevelChange}
                fullWidth
                margin="normal"
                freeSolo
                renderInput={(params) => (
                  <div style={{ position: 'relative' }}>
                    <TextField
                      {...params}
                      placeholder="Select Level"
                      error={levelError !== ''}
                      InputProps={{
                        ...params.InputProps,
                        style: {
                          borderRadius: '30px '
                        }
                      }}
                    />
                    {levelError && (
                      <div style={{ marginTop: '3px', marginLeft: '14px', top: '100%', left: 0, color: '#ff4d4f', fontSize: '0.75em' }}>
                        {levelError}
                      </div>
                    )}
                  </div>
                )}
              />
            </div>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: '10px', mb: '150px' }}>
            <div style={{ marginRight: '5px', width: '95%', borderRadius: '50px' }}>
              <InputLabel htmlFor="password-reset">
                Role<div style={{ color: 'red', display: 'inline' }}> *</div>
              </InputLabel>
              <Autocomplete
                id="role"
                options={['Admin', 'Management', 'Manager', 'Employee']}
                getOptionLabel={(option) => option || ''}
                value={User?.role || role}
                onChange={handleRoleChange}
                fullWidth
                margin="normal"
                freeSolo
                renderInput={(params) => (
                  <div style={{ position: 'relative' }}>
                    <TextField
                      {...params}
                      placeholder="Select Role"
                      error={roleError !== ''}
                      InputProps={{
                        ...params.InputProps,
                        style: {
                          borderRadius: '30px '
                        }
                      }}
                    />
                    {roleError && (
                      <div style={{ marginTop: '3px', marginLeft: '14px', color: '#ff4d4f', fontSize: '0.75em' }}>{roleError}</div>
                    )}
                  </div>
                )}
              />
            </div>

            <div style={{ width: '95%' }}>
              <InputLabel htmlFor="working-date">
                Starting Date<div style={{ color: 'red', display: 'inline' }}> *</div>
              </InputLabel>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  inputFormat="dd/MM/yyyy"
                  placeholder="DD/MM/YYYY"
                  value={User?.User?.starting_working_date || startWorkingDate}
                  onChange={handleStartWorkingDateChange}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                  InputProps={{
                    style: {
                      borderRadius: '30px '
                    }
                  }}
                />
                {startWorkingDateError && <div className="error-message">{startWorkingDateError}</div>}
              </LocalizationProvider>
              <div>
                {isCreating && (
                  <FormControlLabel
                    control={
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Switch
                          checked={isChecked}
                          onChange={handleSwitchChange}
                          color="success" // Use 'primary' color for iOS style
                        />
                        <span style={{ marginLeft: '8px' }}>Active</span>
                      </div>
                    }
                  />
                )}
              </div>
            </div>
          </Box>

          <DialogActions>
            <Button
              onClick={isCreating ? handlebeforeClose : handleClose}
              variant="outlined"
              sx={{
                width: '20%',
                borderRadius: '30px',
                color: '#393939',
                borderColor: '#393939',
                '&:hover': {
                  borderColor: '#686868 !important',
                  color: '#686868'
                }
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleInvite}
              variant="contained"
              sx={{
                width: '20%',
                borderRadius: '30px',
                color: '#FFF',
                bgcolor: '#393939',
                '&:hover': {
                  bgcolor: '#686868 !important'
                }
              }}
            >
              Save
            </Button>
          </DialogActions>
        </CardContent>
      </Dialog>
    </Card>
  );
};

Popup.propTypes = {
  customer: PropTypes.object, // You can specify the expected type for 'customer'
  handleClose: PropTypes.func // You can specify the expected type for 'handleClose'
};

export default Popup;
