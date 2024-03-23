import { useState } from 'react';
import { useDispatch } from 'react-redux';

// material-ui
import {
  Box,
  Button,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  OutlinedInput,
  TextField,
  Stack,
  Typography,
  Divider
} from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import IconButton from 'components/@extended/IconButton';
import { openSnackbar } from 'store/reducers/snackbar';
import { isNumber, isLowercaseChar, isUppercaseChar, isSpecialChar, minLength } from 'utils/password-validation';
import LockIcon from '@mui/icons-material/Lock';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useFormik } from 'formik';
import api from '_api';
import Swal from 'sweetalert2';

// assets
import { CheckOutlined, EyeOutlined, EyeInvisibleOutlined, LineOutlined } from '@ant-design/icons';

//=========================================InitialValues Formik=========================================
const getInitialValues = () => {
  const newCustomer = {
    oldpassword: '',
    newpassword: '',
    confirmpassword: ''
  };

  return newCustomer;
};

const InviteSchema = Yup.object().shape({
  oldpassword: Yup.string().required('Current Password is required'),
  newpassword: Yup.string()
    .max(255)
    .min(
      8,
      'New password must contain english letters and numbers. At least 8 Charaters, 1 uppercase letter, 1 number and 1 special characters'
    )
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])/,
      'New password must contain English letters, numbers, and at least 1 special character (excluding periods)'
    )
    .required('New password is required')
    .matches(/[A-Z]/, 'New password must contain at least 1 uppercase letter')
    .matches(/\d/, 'New password must contain at least 1 number'),
    // .matches(/^[\p{S}&&[^.]\s]+/, 'New password must contain at least 1 special character'),
  confirmpassword: Yup.string()
    .required('Confirm Password is required')
    .when('newpassword', {
      is: (val) => !!(val && val.length > 0),
      then: Yup.string().oneOf([Yup.ref('newpassword')], 'Confirm password must be exactly the same with the new password')
    })
});

// ==============================|| TAB - PASSWORD CHANGE ||============================== //

const TabPassword = () => {
  const dispatch = useDispatch();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  //============================================Hide Password============================================//
  const handleClickShowOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };
  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  //======================================================Handle Submit==========================================//
  const handlebeIsSubmit = async () => {
    console.log('Inter is NOT THERE');
    const changePass = {
      currentpassword: formik.values.oldpassword,
      newpassword: formik.values.newpassword
    };

    console.log('changePass', changePass);
    try {
      const result = await api.profile.changePassword(changePass);
      console.log('result', result);
      if (result.isStatus) {
        Swal.fire({
          title: 'Success',
          // timer: 2000,
          customClass: {
            popup: 'modal-success',
            // Define margin-top dynamically based on the condition

            'swal2-icon.swal2-icon-content': `margin-top: 0px !important`
          },
          text: 'Your password has been successfully changed',
          showConfirmButton: false, // Remove the confirm button
          iconHtml: '<div class="success-icon"></div>'
        });
        formik.resetForm();
      } else if (!result.isStatus && result.message === 'Wrong Current Password Combination') {
        // Show an error message to the user
        Swal.fire({
          title: 'Failed',
          timer: 2000,
          customClass: 'modal-success',
          text: 'Your current password is wrong combination',
          showConfirmButton: false, // Remove the confirm button
          iconHtml: '<div class="discard-icon"></div>'
        });
      } else {
        // Show an error message to the user
        Swal.fire({
          title: 'Failed',
          timer: 2000,
          customClass: 'modal-success',
          // text: 'Edition saved',
          showConfirmButton: false, // Remove the confirm button
          iconHtml: '<div class="discard-icon"></div>'
        });
      }
    } catch (error) {
      // Handle any unexpected errors
      console.error('Error uploading profile settings:', error);

      // Show an error message to the user
      Swal.fire({
        title: 'WTF',
        timer: 2000,
        customClass: 'modal-success',
        // text: 'Edition saved',
        showConfirmButton: false, // Remove the confirm button
        iconHtml: '<div class="discard-icon"></div>'
      });
    }
  };

  //======================================================Formik Setting========================================//

  const formik = useFormik({
    initialValues: getInitialValues(),
    validationSchema: InviteSchema,
    onSubmit: handlebeIsSubmit
  });

  const { errors, touched, getFieldProps, handleSubmit, setFieldValue, handleBlur, handleChange } = formik;

  return (
    <div>
      <MainCard>
        <Typography variant="h4" sx={{ my: '14px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <span style={{ flex: 1, display: 'flex', alignItems: 'center' }}>Change Password</span>
        </Typography>
        <Divider sx={{ mb: '14px' }} />
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item container spacing={3} xs={12} sm={6}>
              <Grid item xs={12}>
                <Stack spacing={1.25}>
                  <InputLabel htmlFor="password-reset">
                    Current password<div style={{ color: 'red', display: 'inline' }}> *</div>
                  </InputLabel>
                  <TextField
                    fullWidth
                    helperText={touched.oldpassword && errors.oldpassword}
                    error={Boolean(touched.oldpassword && errors.oldpassword)}
                    id="password-reset"
                    type={showOldPassword ? 'text' : 'password'}
                    value={formik.values.oldpassword}
                    name="oldpassword"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    InputProps={{
                      style: {
                        borderRadius: '30px '
                      },
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconButton aria-label="toggle password visibility" edge="end" color="secondary" disabled>
                            <LockIcon />
                          </IconButton>
                        </InputAdornment>
                      ),

                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowOldPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            color="secondary"
                          >
                            {showOldPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    sx={{ borderRadius: '30px' }}
                    placeholder="Enter password"
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1.25}>
                  <InputLabel htmlFor="password-reset">
                    New password<div style={{ color: 'red', display: 'inline' }}> *</div>
                  </InputLabel>
                  <TextField
                    fullWidth
                    helperText={touched.newpassword && errors.newpassword}
                    error={Boolean(touched.newpassword && errors.newpassword)}
                    id="password-reset"
                    type={showNewPassword ? 'text' : 'password'}
                    value={formik.values.newpassword}
                    name="newpassword"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    sx={{ borderRadius: '30px' }}
                    InputProps={{
                      style: {
                        borderRadius: '30px '
                      },
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconButton aria-label="toggle password visibility" edge="end" color="secondary" disabled>
                            <LockIcon />
                          </IconButton>
                        </InputAdornment>
                      ),

                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowNewPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            color="secondary"
                          >
                            {showNewPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    placeholder="Enter password"
                  />
                  {!errors.newpassword && !touched.newpassword && (
                    <FormHelperText id="helper-text-password">
                      Password must contain english letters and numbers. At least 8 Charaters, 1 uppercase letter, 1 number and 1 special
                      characters
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1.25}>
                  <InputLabel htmlFor="confirm-password-reset">
                    Confirm password<div style={{ color: 'red', display: 'inline' }}> *</div>
                  </InputLabel>
                  <TextField
                    fullWidth
                    helperText={touched.confirmpassword && errors.confirmpassword}
                    error={Boolean(touched.confirmpassword && errors.confirmpassword)}
                    id="confirm-password-reset"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formik.values.confirmpassword}
                    name="confirmpassword"
                    sx={{ borderRadius: '30px' }}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    InputProps={{
                      style: {
                        borderRadius: '30px '
                      },
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconButton aria-label="toggle password visibility" edge="end" color="secondary" disabled>
                            <LockIcon />
                          </IconButton>
                        </InputAdornment>
                      ),

                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowConfirmPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            color="secondary"
                          >
                            {showConfirmPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    placeholder="Enter confirm password"
                  />
                  {!errors.confirmpassword && !touched.confirmpassword && (
                    <FormHelperText id="helper-text-password">
                      The confirm password must be exactly the same with the new password
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
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
                  Change Password
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </MainCard>
    </div>
  );
};

export default TabPassword;
