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
import { styled } from '@mui/system';
import _ from 'lodash';
import { openSnackbar } from 'store/reducers/snackbar';
import api from '_api';
import Swal from 'sweetalert2';

import { useLocation } from 'react-router-dom';

const getInitialValues = (customer) => {
  const newCustomer = {
    sendTo: ''
  };

  if (customer) {
    return _.merge({}, newCustomer, customer);
  }

  return newCustomer;
};

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
    workName: Yup.string().max(255).required('Work Name is required')
  });

  const handleSubmit = async (values) => {
    try {
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
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <DialogContent sx={{ mx: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
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
