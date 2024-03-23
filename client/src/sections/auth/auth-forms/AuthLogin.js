import React, { useEffect, useReducer } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// material-ui
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormHelperText,
  Grid,
  Link,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';
import FirebaseSocial from './FirebaseSocial';
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';

// api
import api from '_api';

//recoil
import { useRecoilState } from 'recoil';
import { isRememberState } from '../../../recoil';
import config from 'config';
import Swal from 'sweetalert2';

// action - state management
import { LOGIN, LOGOUT } from 'store/reducers/actions';
import authReducer from 'store/reducers/auth';
import { roleState } from '../../../recoil';

// const
const initialState = {
  isLoggedIn: false,
  isInitialized: false,
  user: null
};

// ============================|| FIREBASE - LOGIN ||============================ //

const AuthLogin = () => {
  const [checked, setChecked] = React.useState(false);
  const [capsWarning, setCapsWarning] = React.useState(false);
  const [isRemember, setIsRemember] = useRecoilState(isRememberState);
  const { isLoggedIn, apiLogin } = useAuth();
  const scriptedRef = useScriptRef();
  const [isLoading, setIsLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [auth, setAuth] = useRecoilState(roleState);

  // setAuth('employee');
  let history = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onKeyDown = (keyEvent) => {
    if (keyEvent.getModifierState('CapsLock')) {
      setCapsWarning(true);
    } else {
      setCapsWarning(false);
    }
  };

  const defaultPath = config.defaultPath;

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    if (storedIsLoggedIn === 'true') {
      history(defaultPath);
    }
    setChecked(isRemember.isRemember);
  }, [defaultPath, history, isRemember.isRemember]);
  return (
    <>
      <Formik
        initialValues={{
          username: isRemember.username,
          password: isRemember.password,
          submit: null
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string().max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            setIsLoading(true);
            // const login = await api.login.userLogin(values);
            const login = await apiLogin(values);
            setStatus({ success: login.isStatus });
            console.log('login in Login page', login);
            setSubmitting(login.isStatus);
            if (login.isStatus) {
              let defaultPath = config.defaultPath;
              localStorage.setItem('isLoggedIn', login.isStatus);
              if (checked) {
                setIsRemember({
                  isRemember: true,
                  username: values.username,
                  password: values.password,
                  role: values.role
                });
              } else {
                setIsRemember({
                  isRemember: false,
                  username: '',
                  password: '',
                  role: ''
                });
              }

              history(defaultPath);
            } else if (login == 'This account is not active') {
              Swal.fire({
                title: 'Login failed',
                text: 'This account is not active',
                confirmButtonText: 'Try again',
                customClass: {
                  confirmButton: 'rounded-button '
                },
                iconHtml: '<div class="discard-icon"></div>'
              });
            } else if (login.message === "it's Not your Time") {
              Swal.fire({
                title: 'Login failed',
                text: "You can't login at this time",
                confirmButtonText: 'Try again',
                customClass: {
                  confirmButton: 'rounded-button '
                },
                iconHtml: '<div class="discard-icon"></div>'
              });
            } else {
              Swal.fire({
                title: 'Login failed',
                text: 'Your password or email is incorrect',
                confirmButtonText: 'Try again',
                customClass: {
                  confirmButton: 'rounded-button '
                },
                iconHtml: '<div class="discard-icon"></div>'
              });
            }
          } catch (err) {
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          } finally {
            setIsLoading(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-login">
                    Email
                    <span style={{ color: 'red' }}>*</span>
                  </InputLabel>
                  <OutlinedInput
                    id="email-login"
                    type="text"
                    value={values.username}
                    name="username"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    fullWidth
                    sx={{ borderRadius: '30px', backgroundColor: '#F3F4F6' }}
                    error={Boolean(touched.username && errors.username)}
                    startAdornment={
                      <InputAdornment position="start">
                        <IconButton aria-label="toggle password visibility" edge="end" color="secondary" disabled>
                          <PersonIcon />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {touched.username && errors.username && (
                    <FormHelperText error id="standard-weight-helper-text-email-login">
                      {errors.username}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">
                    Password<span style={{ color: 'red' }}>*</span>
                  </InputLabel>
                  <OutlinedInput
                    fullWidth
                    color={capsWarning ? 'warning' : 'primary'}
                    error={Boolean(touched.password && errors.password)}
                    id="-password-login"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    sx={{ borderRadius: '30px', backgroundColor: '#F3F4F6' }}
                    onBlur={(event) => {
                      setCapsWarning(false);
                      handleBlur(event);
                    }}
                    onKeyDown={onKeyDown}
                    onChange={handleChange}
                    startAdornment={
                      <InputAdornment position="start">
                        <IconButton aria-label="toggle password visibility" edge="end" disabled color="secondary">
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
                  {capsWarning && (
                    <Typography variant="caption" sx={{ color: 'warning.main' }} id="warning-helper-text-password-login">
                      Caps lock on!
                    </Typography>
                  )}
                  {touched.password && errors.password && (
                    <FormHelperText error id="standard-weight-helper-text-password-login">
                      {errors.password}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12} sx={{ mt: -1 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={(event) => {
                          setChecked(event.target.checked);
                          console.log('.target.checked',event.target.checked);
                        }}
                        name="checked"
                        sx={{ color: '#0066FF' }} // Set the color to #0066FF
                        size="small"
                      />
                    }
                    label={<Typography variant="h6">Keep me sign in</Typography>}
                  />
                  <Link
                    variant="h6"
                    component={RouterLink}
                    to={isLoggedIn ? '/forgot-password' : '/forgot-password'}
                    sx={{ color: '#004FD8', textDecoration: 'none' }}
                  >
                    Forgot Password?
                  </Link>
                </Stack>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button
                    disableElevation
                    disabled={isSubmitting || isLoading}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    sx={{
                      borderRadius: '30px',
                      bgcolor: '#393939',
                      color: '#FFFFFF',
                      '&:hover': {
                        bgcolor: '#393939'
                      }
                    }}
                  >
                    Login
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthLogin;
