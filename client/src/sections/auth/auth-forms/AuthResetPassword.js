import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// material-ui
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { isNumber, isLowercaseChar, isUppercaseChar, isSpecialChar, minLength } from 'utils/password-validation';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import api from '_api';
// project import
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';
import { openSnackbar } from 'store/reducers/snackbar';

// assets
import { CheckOutlined, LineOutlined } from '@ant-design/icons';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import LockIcon from '@mui/icons-material/Lock';
import { Link } from 'react-router-dom';
import { CheckCircleOutlined } from '@ant-design/icons';

import Swal from 'sweetalert2';

// ============================|| STATIC - RESET PASSWORD ||============================ //

const AuthResetPassword = (token) => {
  const scriptedRef = useScriptRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log('token', token);
  const { isLoggedIn } = useAuth();
  const [level, setLevel] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPopupClosed, setIsPopupClosed] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  const changeConfirmPassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('');
    changeConfirmPassword('');
  }, []);

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const passwordValidation = () => {
    return Yup.string()
      .max(255)
      .min(
        8,
        'Password must contain english letters and numbers. At least 8 Charaters, 1 uppercase letter, 1 number and 1 special characters'
      )
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])/,
        'Password must contain english letters, numbers and special characters'
      )
      .required('Password is required')
      .matches(/[A-Z]/, 'Password must contain at least 1 uppercase letter')
      .matches(/\d/, 'Password must contain at least 1 number')
      // .matches(/[@$!%*?&]/, 'Password must contain at least 1 special character');
  };

  return (
    <>
      <Formik
        initialValues={{
          password: '',
          confirmPassword: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          password: passwordValidation(),
          confirmPassword: Yup.string()
            .required('Confirm Password is required')
            .when('password', {
              is: (val) => !!(val && val.length > 0),
              then: Yup.string().oneOf([Yup.ref('password')], 'Confirm password must be exactly the same with the new password')
            })
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            // password reset
            if (!values.password) {
              setErrors(true);
              return;
            }
            const newData = {
              password: values.password,
              token: token
            };
            try {
              console.log('newData', newData);
              const createEmail = await api.login.resetPassword(newData);

              Swal.fire({
                title: 'Success',
                timer: 2000,
                customClass: 'modal-success',
                text: 'Your password has been successfully reset',
                showConfirmButton: false, // Remove the confirm button
                // confirmButtonText: 'Go to the login screen',
                // customClass: {
                //   confirmButton: 'rounded-button '
                // },
                iconHtml: '<div class="success-icon"></div>'
              }).then((result) => {
                if (result.isConfirmed) {
                  // navigate('/login');
                }
              });
              // refresh();
              navigate(isLoggedIn ? `/login` : `/login`, { replace: true });
              // await navigate('/login');
            } catch (error) {
              console.error(error);
              Swal.fire('Fail to reset password', 'Please try agains', 'error');
            }
          } catch (err) {
            console.error(err);
            if (scriptedRef.current) {
              window.location.reload();
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item container spacing={3} xs={12}>
                <Grid item xs={12}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="password-reset">New Password</InputLabel>
                    <OutlinedInput
                      fullWidth
                      // helperText={touched.password && errors.password}
                      error={Boolean(touched.password && errors.password)}
                      id="password-reset"
                      type={showPassword ? 'text' : 'password'}
                      value={values.password}
                      name="password"
                      onBlur={handleBlur}
                      sx={{ borderRadius: '30px', backgroundColor: '#F3F4F6' }}
                      onChange={(e) => {
                        handleChange(e);
                        changePassword(e.target.value);
                      }}
                      startAdornment={
                        <InputAdornment position="start">
                          <IconButton aria-label="toggle password visibility" edge="end" color="secondary" disabled>
                            <LockIcon />
                          </IconButton>
                        </InputAdornment>
                      }
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            color="secondary"
                          >
                            {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                          </IconButton>
                        </InputAdornment>
                      }
                      placeholder="Enter password"
                    />
                    {touched.password && errors.password && (
                      <FormHelperText error id="helper-text-password-reset">
                        {errors.password}
                      </FormHelperText>
                    )}
                    {!errors.password && !touched.password && (
                      <FormHelperText id="helper-text-password">
                        Password must contain english letters and numbers. At least 8 Charaters, 1 uppercase letter, 1 number and 1 special
                        characters
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="confirm-password-reset">Confirm Password</InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                      id="confirm-password-reset"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={values.confirmPassword}
                      name="confirmPassword"
                      sx={{ borderRadius: '30px', backgroundColor: '#F3F4F6' }}
                      onBlur={handleBlur}
                      onChange={(e) => {
                        handleChange(e);
                        changeConfirmPassword(e.target.value);
                      }}
                      startAdornment={
                        <InputAdornment position="start">
                          <IconButton aria-label="toggle password visibility" edge="end" color="secondary" disabled>
                            <LockIcon />
                          </IconButton>
                        </InputAdornment>
                      }
                      endAdornment={
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
                      }
                      placeholder="Enter confirm password"
                    />
                    {touched.confirmPassword && errors.confirmPassword && (
                      <FormHelperText error id="helper-text-confirm-password-reset">
                        {errors.confirmPassword}
                      </FormHelperText>
                    )}
                    {!errors.confirmPassword && !touched.confirmPassword && (
                      <FormHelperText id="helper-text-password">
                        The confirm password must be exactly the same with the new password
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <Box display="flex" justifyContent="space-between">
                  <Grid item xs={6} sm={5.8}>
                    <AnimateButton>
                      <Button
                        disableElevation
                        component={Link}
                        to={'/login'}
                        fullWidth
                        type="back"
                        variant="outlined"
                        sx={{
                          textDecoration: 'none',
                          borderRadius: '30px',
                          borderColor: '#393939',
                          color: '#393939',
                          height: '48px',
                          '&:hover': {
                            borderColor: '#393939',
                            color: '#393939'
                          }
                        }}
                      >
                        Cancel
                      </Button>
                    </AnimateButton>
                  </Grid>

                  <Grid item xs={6} sm={5.8}>
                    <AnimateButton>
                      <Button
                        disableElevation
                        disabled={isSubmitting}
                        fullWidth
                        type="submit"
                        variant="contained"
                        sx={{
                          borderRadius: '30px',
                          bgcolor: '#393939',
                          color: '#FFFFFF',
                          height: '48px',
                          '&:hover': {
                            bgcolor: '#393939'
                          }
                        }}
                      >
                        Reset Password
                      </Button>
                    </AnimateButton>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthResetPassword;
