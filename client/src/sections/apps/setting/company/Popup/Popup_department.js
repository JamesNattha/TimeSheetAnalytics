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
  Checkbox
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
    code: ''
  };

  if (customer) {
    const newCustomer = {
      id: customer?.department_id,
      name: customer?.department_name,
      code: customer?.department_code
    };
    const mergedCustomer = _.merge({}, newCustomer, customer);

    return mergedCustomer;
  }

  return newCustomer;
};

const AddCustomer = ({ customer, open, onCancel, namePage, status, fetchDepartment }) => {
  console.log('data customer is the', customer);
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

  const CustomerSchema = Yup.object().shape({
    code: Yup.string()
      .max(255)
      .required(`${namePage.charAt(0).toUpperCase() + namePage.slice(1)} Code is required`),
    name: Yup.string()
      .max(255)
      .required(`${namePage.charAt(0).toUpperCase() + namePage.slice(1)} Name is required`)
  });

  const handlebeforeClose = () => {
    if (isCreating) {
      if (!formik.values.name || !formik.values.code) {
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
      if (formik.values.name || formik.values.code) {
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
      code: formik.values.code,
      name: formik.values.name
    };

    const createWorkData = await api.created.createDepartment(workData);
    fetchDepartment();
    onCancel();
  }

  async function updateModule(values) {
    const updatedProject = {
      id: customer.department_id,
      code: formik.values.code,
      name: formik.values.name
    };

    const updateData = await api.company.updateDepartment(updatedProject);
    fetchDepartment();
    onCancel();
  }

  const formik = useFormik({
    initialValues: getInitialValues(customer),
    validationSchema: CustomerSchema,
    onSubmit: submitConfirm
  });

  const { errors, touched, getFieldProps, handleSubmit, setFieldValue } = formik;

  useEffect(() => {
    if (customer) {
      setFieldValue('id', customer?.department_id);
      setFieldValue('name', customer?.department_name);
      setFieldValue('code', customer?.department_code);
    }
  }, [customer]);

  console.log('test formik data', formik.values);

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
