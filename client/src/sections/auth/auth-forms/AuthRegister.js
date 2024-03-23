import { useEffect, useState, useRef } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import api from '_api';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
// import * as Yup from 'yup';
// import { Formik } from 'formik';

// material-ui
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  Autocomplete,
  Link,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  Select,
  MenuItem,
  TextField
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import { TimePicker, DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

// project import
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';
import FirebaseSocial from './FirebaseSocial';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';

// ============================|| FIREBASE - REGISTER ||============================ //

const AuthRegister = ({ token, dataProp, refresh }) => {
  const formRef = useRef();
  const [genderData, setGenderData] = useState([]);
  const [selectedGender, setSelectedGender] = useState('');
  const { firebaseRegister } = useAuth();
  const [data, setData] = useState();
  const [isStatus, setIsStatus] = useState();
  const scriptedRef = useScriptRef();
  const navigate = useNavigate();
  const [levelData, setLevel] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [nickname, setNickname] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const { isLoggedIn } = useAuth();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleNicknameChange = (event) => {
    setNickname(event.target.value);
  };

  const fetchGender = async () => {
    try {
      const { data, isStatus } = await api.enum.getEnumGender();
      console.log(data);
      if (isStatus !== undefined && isStatus) {
        setGenderData(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  console.log('token', token);
  console.log('data', dataProp);
  console.log('data user', dataProp[0].User.username);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseDownConfirmPassword = (event) => {
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
    fetchGender();
    changePassword('');
    changeConfirmPassword('');
  }, []);

  const handleGenderChange = (newValue) => {
    setSelectedGender(newValue.enum_id);
    console.log('selectedGender', selectedGender);
    // Formik.setFieldValue('gender', newValue);
  };

  console.log('values in Register', Formik);

  return (
    <>
      <Formik
        initialValues={{
          firstname: '',
          lastname: '',
          gender: '',
          password: '',
          confirmPassword: '',
          nickname: '',
          birthday: new Date(),
          submit: null
        }}
        validationSchema={Yup.object().shape({
          firstname: Yup.string().max(255).required('First name is required'),
          lastname: Yup.string().max(255).required('Last name is required'),
          password: Yup.string()
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
            .matches(/\d/, 'Password must contain at least 1 number'),
            // .matches(/[@$!%*?&]/, 'Password must contain at least 1 special character'),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Confirm password must be exactly the same with the new password')
            .required('Confirm Password is required'),
          gender: Yup.string().required('Gender is required'),
          birthday: Yup.string().required('Birthday is required'),
          nickname: Yup.string()
            .matches(/^[a-zA-Zก-๙\s]*$/, 'Nickname can only contain Thai and English letters')
            .max(100)
            .required('Nickname is required')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            if (
              !dataProp[0].User.username ||
              !values.firstname ||
              !values.lastname ||
              !values.gender ||
              !values.password ||
              !values.birthday ||
              !values.nickname ||
              values.password != values.confirmPassword
            ) {
              setErrors(true);
              formRef.current.scrollIntoView({ behavior: 'smooth' });
              return;
            }
            // create the data object to send to the server
            const newData = {
              username: dataProp[0].User.username,
              firstName: values.firstname,
              lastName: values.lastname,
              gender: values.gender,
              password: values.password,
              token: token,
              birthday: values.birthday,
              nickName: values.nickname
            };
            try {
              console.log('newData', newData);
              const login = await api.login.userRegister(newData);
              // clear input fields
              Swal.fire({
                title: 'Success',
                timer: 2000,
                customClass: 'modal-success',
                text: 'Your account has been successfully created',
                showConfirmButton: false, // Remove the confirm button
                // confirmButtonText: 'Go to the login screen',
                // customClass: {
                //   confirmButton: 'rounded-button '
                // },
                iconHtml: '<div class="success-icon"></div>'
              });
              // refresh();
              navigate(`/login`);
              // await navigate('/login');
              // await navigate('/login');
            } catch (error) {
              console.error(error);
              Swal.fire('Fail to Register', 'Has problem to Register', 'error');
              // handle the error if needed
            }
          } catch (err) {
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} ref={formRef}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-signup">Email Address</InputLabel>
                  <OutlinedInput
                    variant="outlined"
                    fullWidth
                    id="email-login"
                    type="email"
                    value={dataProp[0].User.username}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="demo@company.com"
                    sx={{ bgcolor: '#F0F0F0', borderRadius: '40px' }}
                    inputProps={{
                      readOnly: true
                    }}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="firstname-signup">
                    First Name<div style={{ color: 'red', display: 'inline' }}> *</div>
                  </InputLabel>
                  <OutlinedInput
                    variant="outlined"
                    id="firstname-login"
                    type="firstname"
                    value={values.firstname}
                    name="firstname"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="First name"
                    fullWidth
                    sx={{ borderRadius: '40px' }}
                    error={Boolean(touched.firstname && errors.firstname)}
                  />
                  {touched.firstname && errors.firstname && (
                    <FormHelperText error id="helper-text-firstname-signup">
                      {errors.firstname}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="lastname-signup">
                    Last Name<div style={{ color: 'red', display: 'inline' }}> *</div>
                  </InputLabel>
                  <OutlinedInput
                    variant="outlined"
                    fullWidth
                    error={Boolean(touched.lastname && errors.lastname)}
                    id="lastname-signup"
                    type="lastname"
                    value={values.lastname}
                    name="lastname"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Last name"
                    inputProps={{}}
                    sx={{ borderRadius: '40px' }}
                  />
                  {touched.lastname && errors.lastname && (
                    <FormHelperText error id="helper-text-lastname-signup">
                      {errors.lastname}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="nickname-signup">
                    Nickname<div style={{ color: 'red', display: 'inline' }}> *</div>
                  </InputLabel>
                  <OutlinedInput
                    variant="outlined"
                    fullWidth
                    error={Boolean(touched.nickname && errors.nickname)}
                    id="nickname-signup"
                    type="text"
                    value={values.nickname}
                    name="nickname"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Your Nickname"
                    sx={{ borderRadius: '40px' }}
                  />
                  {touched.nickname && errors.nickname && (
                    <FormHelperText error id="helper-text-nickname-signup">
                      {errors.nickname}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="birthday-select">
                    Birthday<div style={{ color: 'red', display: 'inline' }}> *</div>
                  </InputLabel>
                  <LocalizationProvider variant="outlined" dateAdapter={AdapterDateFns} sx={{ borderRadius: '40px' }}>
                    <DesktopDatePicker
                      inputVariant="outlined"
                      inputFormat="dd/MM/yyyy"
                      fullWidth
                      value={values.birthday}
                      sx={{ borderRadius: '40px' }}
                      maxDate={new Date()}
                      onChange={(newValue) => {
                        console.log('newValue', newValue);
                        if (newValue && !isNaN(newValue.getTime())) {
                          const isoValue = newValue.toISOString();
                          console.log('isoValue', isoValue);
                          handleChange({ target: { name: 'birthday', value: isoValue } });
                        } else {
                          // Handle the case where newValue is not a valid date
                          // handleChange({ target: { name: 'birthday', value: null } });
                        }
                      }}
                      // onChange={(newValue) => {
                      //   if (newValue && newValue <= new Date()) {
                      //     const formattedDate = AdapterDateFns.format(newValue, 'dd/MM/yyyy'); // Format the date to match the input format
                      //     handleChange({ target: { name: 'birthday', value: formattedDate } });
                      //     console, log('values birthday', values.birthday);
                      //   } else {
                      //     handleChange({ target: { name: 'birthday', value: null } });
                      //   }
                      // }}
                      // onChange={(e) => {
                      //   const enteredDate = e.target.value;
                      //   // Check if the entered date matches the desired format 'DD-MM-YYYY'
                      //   if (/^\d{2}-\d{2}-\d{4}$/.test(enteredDate)) {
                      //     handleChange({ target: { name: 'birthday', value: enteredDate } });
                      //   } else {
                      //     // handleChange({ target: { name: 'birthday', value: null } });
                      //   }
                      // }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={Boolean(touched.birthday && errors.birthday)}
                          helperText={touched.birthday && errors.birthday}
                          onChange={(e) => {
                            const enteredDate = e.target.value;
                            // Check if the entered date matches the desired format 'DD-MM-YYYY'
                            if (/^\d{2}-\d{2}-\d{4}$/.test(enteredDate)) {
                              const testday = enteredDate.getTime();
                              handleChange({ target: { name: 'birthday', value: enteredDate } });
                            } else {
                              handleChange({ target: { name: 'birthday', value: '' } });
                            }
                          }}
                        />
                      )}
                      InputProps={{
                        style: {
                          borderRadius: '40px '
                        }
                      }}
                    />
                  </LocalizationProvider>
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="group-select">
                    Gender<div style={{ color: 'red', display: 'inline' }}> *</div>
                  </InputLabel>
                  <Autocomplete
                    id="gender"
                    type="gender"
                    name="gender"
                    options={genderData}
                    getOptionLabel={(option) => option.name_eng || ''}
                    value={genderData ? genderData.find((option) => option.enum_id === values.gender) || null : null}
                    onChange={(event, newValue) => {
                      handleChange({ target: { name: 'gender', value: newValue.enum_id } });
                    }}
                    fullWidth
                    margin="normal"
                    renderInput={(params) => (
                      <div style={{ position: 'relative' }}>
                        <TextField
                          {...params}
                          placeholder="Select Gender"
                          error={Boolean(touched.gender && errors.gender)}
                          helperText={touched.gender && errors.gender}
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
                  {/* <Select
                    id="gender-select"
                    variant="outlined"
                    type="gender"
                    placeholder="Select Gender"
                    value={values.gender}
                    name="gender"
                    onChange={handleChange}
                    fullWidth
                    displayEmpty
                    error={Boolean(touched.gender && errors.gender)}
                    input={<OutlinedInput />}
                    sx={{ borderRadius: '40px' }}
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                  </Select>
                  {touched.gender && errors.gender && (
                    <FormHelperText error id="helper-text-gender-signup">
                      {errors.gender}
                    </FormHelperText>
                  )} */}
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-signup">
                    Password<div style={{ color: 'red', display: 'inline' }}> *</div>
                  </InputLabel>
                  <OutlinedInput
                    fullWidth
                    variant="outlined"
                    error={Boolean(touched.password && errors.password)}
                    id="password-signup"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    sx={{ borderRadius: '40px' }}
                    onChange={(e) => {
                      handleChange(e);
                      changePassword(e.target.value);
                    }}
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
                    placeholder="******"
                    inputProps={{}}
                  />
                  {touched.password && errors.password && (
                    <FormHelperText error id="helper-text-password-signup">
                      {errors.password}
                    </FormHelperText>
                  )}                                          
                  { !touched.password && (
                    <FormHelperText id="helper-text-password">
                      Password must contain english letters and numbers. At least 8 Charaters, 1 uppercase letter, 1 number and 1 special
                      characters
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="confirmPassword-signup">
                    Confirm Password<div style={{ color: 'red', display: 'inline' }}> *</div>
                  </InputLabel>
                  <OutlinedInput
                    fullWidth
                    variant="outlined"
                    error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                    id="confirmPassword-signup"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={values.confirmPassword}
                    name="confirmPassword"
                    sx={{ borderRadius: '40px' }}
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      changeConfirmPassword(e.target.value);
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownConfirmPassword}
                          edge="end"
                          color="secondary"
                        >
                          {showConfirmPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="******"
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <FormHelperText error id="helper-text-confirmPassword-signup">
                      {errors.confirmPassword}
                    </FormHelperText>
                  )}
                  {!touched.confirmPassword && (
                    <FormHelperText id="helper-text-password">
                      The confirm password must be exactly the same with the new password
                    </FormHelperText>
                  )}
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
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    sx={{
                      borderRadius: '40px',
                      bgcolor: '#393939',
                      '&:hover': {
                        borderColor: '#000'
                      }
                    }}
                  >
                    Create Account
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

AuthRegister.propTypes = {
  token: PropTypes.string.isRequired, // Example type, you can adjust the type accordingly
  dataProp: PropTypes.array.isRequired, // Example type, adjust as needed
  refresh: PropTypes.func.isRequired // Example type, adjust as needed
};

export default AuthRegister;
