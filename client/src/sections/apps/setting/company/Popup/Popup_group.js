import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import { useTheme } from '@mui/material/styles';
import {
  InputLabel,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Autocomplete,
  TextField,
  Select,
  MenuItem,
  Box,
  Chip,
  OutlinedInput,
  FormHelperText,
  Typography,
  Checkbox,
  FormControlLabel,
  Switch
} from '@mui/material';
import _ from 'lodash';
import { openSnackbar } from 'store/reducers/snackbar';
import api from '_api';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const getInitialValues = (customer) => {
  const newCustomer = {
    id: '',
    name: '',
    code: '',
    positionSelect: '',
    departmentSelect: '',
    status: false,
    userSelect: []
  };

  if (customer) {
    const newCustomer = {
      id: customer?.group_id,
      name: customer?.group_name,
      code: customer?.group_code,
      status: customer?.is_all,
      userSelect: customer?.user_id
    };
    const mergedCustomer = _.merge({}, newCustomer, customer);

    return mergedCustomer;
  }

  return newCustomer;
};

const AddCustomer = ({ customer, open, onCancel, namePage, status, fetchDepartment }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isCreating = !!customer;
  const location = useLocation();
  const [boardId, setBoardId] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(undefined);
  const [data, setData] = useState([]);
  const [dataDepart, setDataDepart] = useState([]);
  const [user, setUser] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const fetchWorkUser = async () => {
    try {
      const { data, isStatus } = await api.setting.fetchUser();
      if (isStatus) {
        const invitedUsers = data;
        setUser(invitedUsers.map((item) => item.User));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getPosition = async () => {
    try {
      const { data, isStatus } = await api.company.getPosition();
      if (isStatus) {
        setData(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getDepartment = async () => {
    try {
      const { data, isStatus } = await api.company.getDepartment();
      if (isStatus) {
        setDataDepart(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPosition();
    getDepartment();
    fetchWorkUser();
  }, []);

  const CustomerSchema =
    namePage === 'department'
      ? Yup.object().shape({
          code: Yup.string()
            .max(255)
            .required(`${namePage.charAt(0).toUpperCase() + namePage.slice(1)} Code is required`),
          name: Yup.string()
            .max(255)
            .required(`${namePage.charAt(0).toUpperCase() + namePage.slice(1)} Name is required`)
        })
      : namePage === 'position'
      ? Yup.object().shape({
          code: Yup.string()
            .max(255)
            .required(`${namePage.charAt(0).toUpperCase() + namePage.slice(1)} Code is required`),
          name: Yup.string()
            .max(255)
            .required(`${namePage.charAt(0).toUpperCase() + namePage.slice(1)} Name is required`),
          departmentSelect: Yup.string().max(255).required('Department select is required')
        })
      : namePage === 'group'
      ? Yup.object().shape({
          code: Yup.string()
            .max(255)
            .required(`${namePage.charAt(0).toUpperCase() + namePage.slice(1)} Code is required`),
          name: Yup.string()
            .max(255)
            .required(`${namePage.charAt(0).toUpperCase() + namePage.slice(1)} Name is required`)
          // userSelect: Yup.array().of(Yup.string()).required('Member is required')
        })
      : null; // Handle other cases or set to null as needed

  const handlebeforeClose = () => {
    if (isCreating) {
      if (!formik.values.name || !formik.values.code || !formik.values.userSelect) {
        Swal.fire({
          title: 'Discard',
          text: `if you discard the change, this process will not be able to be undone.`,
          showCancelButton: true,
          reverseButtons: true,
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Keep editing',
          customClass: {
            confirmButton: 'confirm-rounded-button',
            cancelButton: 'outlined-button'
          },
          iconHtml: '<div class="discard-icon"></div>'
        }).then((result) => {
          if (result.isConfirmed) {
            formik.resetForm();
            onCancel();

            // navigate('/login');
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            // Call the function to send the email again
            // handleEmailSubmission(email);
          }
        });
      } else if (formik.values.name !== customer.name || formik.values.code !== customer.code) {
        Swal.fire({
          title: 'Discard',
          text: `if you discard the change, this process will not be able to be undone.`,
          showCancelButton: true,
          reverseButtons: true,
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Keep editing',
          customClass: {
            confirmButton: 'confirm-rounded-button',
            cancelButton: 'outlined-button'
          },
          iconHtml: '<div class="discard-icon"></div>'
        }).then((result) => {
          if (result.isConfirmed) {
            formik.resetForm();
            onCancel();

            // navigate('/login');
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            // Call the function to send the email again
            // handleEmailSubmission(email);
          }
        });
      } else {
        formik.resetForm();
        onCancel();
      }
    } else {
      if (formik.values.name || formik.values.code || formik.values.userSelect) {
        Swal.fire({
          title: 'Discard',
          text: `if you discard the change, this process will not be able to be undone.`,
          showCancelButton: true,
          reverseButtons: true,
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Keep editing',
          customClass: {
            confirmButton: 'confirm-rounded-button',
            cancelButton: 'outlined-button'
          },
          iconHtml: '<div class="discard-icon"></div>'
        }).then((result) => {
          if (result.isConfirmed) {
            formik.resetForm();
            onCancel();

            // navigate('/login');
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            // Call the function to send the email again
            // handleEmailSubmission(email);
          }
        });
      } else {
        formik.resetForm();
        onCancel();
      }
    }

    // formik.resetForm();
  };

  const submitConfirm = async (event) => {
    // event.preventDefault();

    if (formik.values.name && formik.values.code) {
      try {
        if (isCreating) {
          //--------------------------------update-----------------------------------
          await updateModule(formik.values);
          Swal.fire({
            title: 'Success',
            timer: 2000,
            customClass: 'modal-success',
            showConfirmButton: false, // Remove the confirm button
            iconHtml: '<div class="success-icon"></div>'
          });
        } else {
          //--------------------------------created-----------------------------------
          await setModule();
          Swal.fire({
            title: 'Success',
            timer: 2000,
            customClass: 'modal-success',
            showConfirmButton: false, // Remove the confirm button
            iconHtml: '<div class="success-icon"></div>'
          });
        }
      } catch (error) {
        console.error(error);
        dispatch(
          openSnackbar({
            open: true,
            message: 'Error updating project.',
            variant: 'alert',
            alert: {
              color: 'error'
            }
          })
        );
      }
    } else {
      // Form is not valid, display errors
      dispatch(
        openSnackbar({
          open: true,
          message: 'Please correct the errors in the form.',
          variant: 'alert',
          alert: {
            color: 'error'
          }
        })
      );
    }
  };

  async function setModule() {
    const workData = {
      name: formik.values.name,
      code: formik.values.code,
      user_id: formik.values.userSelect,
      status: formik.values.status
    };

    const createWorkData = await api.created.createGroup(workData);
    fetchDepartment();
    onCancel();
  }

  async function updateModule(values) {
    const updatedProject = {
      id: customer.group_id,
      code: formik.values.code,
      user_id: formik.values.userSelect || customer.user_id,
      name: formik.values.name,
      status: formik.values.status
    };

    const updateData = await api.company.updateGroup(updatedProject);
    fetchDepartment();
    onCancel();
  }

  const formik = useFormik({
    initialValues: getInitialValues(customer),
    validationSchema: CustomerSchema,
    onSubmit: submitConfirm
  });

  const { errors, touched, getFieldProps, handleSubmit } = formik;
  console.log(formik.values);
  // const selectedOptions = (formik.values.userSelect || []).map((userId) => {
  //   const selectedUser = user.find((item) => item.User.user_id === userId);
  //   return selectedUser ? selectedUser.User.nick_name : null;
  // });

  // const handleClose = (removedItem) => {
  //   const newValue = formik.values.userSelect.filter((item) => item !== removedItem);
  //   formik.setFieldValue('userSelect', newValue);
  // };

  const handleCheckboxChange = (user_id) => {
    const newSelected = [...formik.values.userSelect];
    const selectedIndex = newSelected.indexOf(user_id);
    if (selectedIndex === -1) {
      newSelected.push(user_id);
    } else {
      newSelected.splice(selectedIndex, 1);
    }

    formik.setFieldValue('userSelect', newSelected);
  };

  // console.log('user isus', user);
  // console.log('formik.values.userSelect isus', formik.values.userSelect);
  // console.log('formik.values isus', formik.values);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ mx: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <InputLabel htmlFor="code">
                {namePage.charAt(0).toUpperCase() + namePage.slice(1)} Code<span style={{ color: 'red' }}>*</span>
              </InputLabel>
              <OutlinedInput
                fullWidth
                rows={4}
                placeholder={`${namePage.charAt(0).toUpperCase() + namePage.slice(1)} Code`}
                value={formik.values.code}
                {...getFieldProps('code')}
                error={Boolean(touched.code && errors.code)}
                helperText={touched.code && errors.code}
                sx={{
                  borderRadius: 40,
                  mt: '4px'
                }}
              />
              <FormHelperText sx={{ color: 'red' }}>{touched.code && errors.code}</FormHelperText>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel htmlFor="project">
                {namePage.charAt(0).toUpperCase() + namePage.slice(1)} Name<span style={{ color: 'red' }}>*</span>
              </InputLabel>
              <OutlinedInput
                fullWidth
                rows={4}
                placeholder={`${namePage.charAt(0).toUpperCase() + namePage.slice(1)} Name`}
                value={formik.values.name}
                {...getFieldProps('name')}
                error={Boolean(touched.name && errors.name)}
                helperText={touched.name && errors.name}
                sx={{
                  borderRadius: 40,
                  mt: '4px'
                }}
              />
              <FormHelperText sx={{ color: 'red' }}>{touched.name && errors.name}</FormHelperText>
            </Grid>
            <>
              <Grid item xs={12}>
                <InputLabel htmlFor="user"> {namePage === 'group' ? 'Member' : null}</InputLabel>
                <Autocomplete
                  id="outlined"
                  multiple
                  options={user}
                  getOptionLabel={(option) => (option.nick_name ? option.nick_name : option.username || '')}
                  // isOptionEqualToValue={(option, value) => option.user_id === value.user}
                  value={formik.values.userSelect?.map((selectedUserId) => user.find((option) => option.user_id === selectedUserId))}
                  onChange={(event, newValue) => {
                    if (newValue !== null) {
                      const selectedUserIds = newValue.map((user) => user.user_id);
                      console.log('newValue', selectedUserIds);
                      formik.setFieldValue('userSelect', selectedUserIds);
                    } else {
                      formik.setFieldValue('userSelect', []);
                    }
                  }}
                  fullWidth
                  margin="normal"
                  error={Boolean(touched.userSelect && errors.userSelect)}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        key={option?.user_id}
                        label={option?.nick_name || option?.username || ''}
                        {...getTagProps({ index })}
                        sx={{ borderRadius: '40px', p: '4px 14px' }}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      placeholder={formik.values.userSelect?.length > 0 ? '' : 'Select Member'}
                      {...params}
                      InputProps={{
                        ...params.InputProps,

                        style: {
                          borderRadius: '30px '
                        }
                      }}
                    />
                  )}
                />
              </Grid>
            </>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Switch
                      checked={formik.values.status}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        console.log('isChecked', isChecked);
                        formik.setFieldValue('status', isChecked);
                      }}
                      color="success" // Use 'primary' color for iOS style
                    />
                    <span style={{ marginLeft: '8px' }}>Is All</span>
                  </div>
                }
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ pr: 2.5 }}>
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
    </div>
  );
};

AddCustomer.propTypes = {
  customer: PropTypes.object,
  open: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
  namePage: PropTypes.string.isRequired,
  status: PropTypes.string
};

export default AddCustomer;
