import React, { useEffect, useState } from 'react';

// material-ui
import {
  Chip,
  Divider,
  TextField,
  InputLabel,
  Grid,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  Stack,
  Button,
  Typography,
  useMediaQuery
} from '@mui/material';
import { Autocomplete } from '@mui/material';

// third-party
import NumberFormat from 'react-number-format';
import { useFormik } from 'formik';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// import NumberFormat from 'react-number-format';

//date-picker
import { TimePicker, DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

// project import
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';
import LinearWithLabel from 'components/@extended/Progress/LinearWithLabel';

// assets
import { LinkOutlined, EnvironmentOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import api from '_api';
import Swal from 'sweetalert2';

const avatarImage = require.context('assets/images/users', true);

//===============================|| Formik Setting ||==================================//
const getInitialValues = (data) => {
  console.log('customer');
  const newCustomer = {
    firstname: '',
    lastname: '',
    nickname: '',
    phoneno: '',
    birthday: '',
    address: '',
    subdistrict: '',
    district: '',
    province: '',
    country: '',
    postcode: '',
    department: '',
    position: '',
    group: '',
    level: '',
    startWorkingDate: ''
  };

  if (data) {
    console.log('customer', data);
    // console.log('customer?.person?.Department?.department_name', customer?.person?.Department?.department_name);
    const newCustomer = {
      firstname: data.firstname,
      lastname: data.lastname,
      nickname: data.nickname,
      phoneno: data.phone,
      birthday: data.birthday,
      address: data.address || '',
      subdistrict: data.subdistrict,
      district: data.district,
      province: data.province,
      country: '',
      postcode: data.postcode,
      department: data.department,
      position: data.position,
      group: data.group,
      level: data.level,
      startWorkingDate: data.startworkdate
    };
    console.log('Merged Customer:', newCustomer);
    return newCustomer;
  }

  console.log('New Customer:', newCustomer);
  return newCustomer;
};

const InviteSchema = Yup.object().shape({
  firstname: Yup.string().required('First name is required'),
  lastname: Yup.string().required('Last name is required'),
  nickname: Yup.string().required('Nickname is required'),
  phoneno: Yup.string()
    .matches(/^\d{9,10}$/, 'Phone no. must be 9 to 10 digits')
    .required('Phone no. is required'),
  birthday: Yup.string().max(255).required('Birthday is required').nullable(),
  address: Yup.string().required('Address is required'),
  subdistrict: Yup.string().required('Sub-district is required'),
  district: Yup.string().required('District is required'),
  province: Yup.string().required('Province is required'),
  postcode: Yup.string().required('Postcode is required')
});

// ==============================|| SET FETCH ADDRESS - Thailand ||============================== //

const fetchData = (url, setter) => {
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      setter(result);
    });
};

// ==============================|| ACCOUNT PROFILE - BASIC ||============================== //
const Details = ({ data, fetch }) => {
  const [levelData, setLevelData] = useState('');
  const [datanow, setData] = useState([]);
  const [isStatus, setIsStatus] = useState();
  const [edit, setEdit] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [amphures, setAmphures] = useState([]);
  const [tambons, setTambons] = useState([]);

  // console.log('provinceData', provinceData);
  const fetchProfile = async () => {
    try {
      const { data, isStatus } = await api.profile.fetchProfile();
      if (isStatus) setData(data), setIsStatus(isStatus);
      // console.log('data profile', data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchLevel = async () => {
    try {
      const { data, isStatus } = await api.enum.getEnumLevel();
      console.log(data);
      if (isStatus !== undefined && isStatus) {
        setLevelData(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLevel();
    fetchProfile();
  }, []);

  // ============================================================|| Func Before Close && Submit ||============================================================ //
  const handlebeIsSubmit = async () => {
    // const districtName = amphures.find((amphure) => amphure.id === formik.values.district)?.name_en || '';
    // const provinceName = provinces.find((province) => province.id === formik.values.province)?.name_en || '';
    // const subdistrictName = tambons.find((tambon) => tambon.id === formik.values.subdistrict)?.name_en || '';
    console.log('hello submit yoooooooooo');
    const updateProfile = {
      firstname: formik.values.firstname,
      lastname: formik.values.lastname,
      nickname: formik.values.nickname,
      phoneno: formik.values.phoneno,
      birthday: formik.values.birthday,
      address: formik.values.address,
      subdistrict: formik.values.subdistrict,
      district: formik.values.district,
      province: formik.values.province,
      postcode: formik.values.postcode
    };

    console.log('updateProfile', updateProfile);
    try {
      const result = await api.profile
        .uploadSettingProfile(updateProfile)
        .then((result) => {
          if (result.isStatus) {
            fetch();
            Swal.fire({
              title: 'Success',
              timer: 2000,
              customClass: 'modal-success',

              showConfirmButton: false, // Remove the confirm button
              iconHtml: '<div class="success-icon"></div>'
            });
            setEdit(false);
          }
        })
        .catch((error) => {
          console.error('Error uploading profile settings:', error);

          Swal.fire({
            title: 'Error',
            text: 'Profile update failed',
            icon: 'error',
            timer: 2000,
            customClass: 'modal-error',
            showConfirmButton: false
          });
        });
      // console.log('result', result);
      // if (result.isStatus) {
      //   Swal.fire({
      //     title: 'Success',
      //     timer: 2000,
      //     customClass: 'modal-success',

      //     showConfirmButton: false, // Remove the confirm button
      //     iconHtml: '<div class="success-icon"></div>'
      //   });
      //   setEdit(false);
      //   fetch();
      // } else {
      //   // Show an error message to the user
      //   Swal.fire({
      //     title: 'Fail',
      //     timer: 2000,
      //     customClass: 'modal-success',

      //     showConfirmButton: false, // Remove the confirm button
      //     iconHtml: '<div class="success-icon"></div>'
      //   });
      // }
    } catch (error) {
      // Handle any unexpected errors
      console.error('Error uploading profile settings:', error);

      // Show an error message to the user
      Swal.fire({
        title: 'Fail Ja',
        timer: 2000,
        customClass: 'modal-success',
        showConfirmButton: false, // Remove the confirm button
        iconHtml: '<div class="discard-icon"></div>'
      });
    }
  };

  const handlebeforeClose = () => {
    if (data) {
      data.map((item) => {
        const provincess = provinces.find((province) => province.name_en === item.province)?.id || '';
        const districts = amphures.find((amphure) => amphure.name_en === item.district)?.id || '';
        const subdistricts = tambons.find((tambon) => tambon.name_en === item.subdistrict)?.id || '';
        console.log('provincess', provincess);
        setFieldValue('firstname', `${item.firstname}`);
        setFieldValue('lastname', item.lastname);
        setFieldValue('nickname', item.nickname);
        setFieldValue('phoneno', item.phone || '');
        setFieldValue('birthday', item.birthday);
        setFieldValue('address', item.address);
        setFieldValue('subdistrict', item.subdistrict);
        setFieldValue('district', item.district);
        setFieldValue('province', item.province);
        setFieldValue('postcode', item.postcode);
      });
      // console.log('formik.values:', formik.values);
    }
    formik.setErrors({});
    formik.setTouched({});
    setEdit(false);
  };

  const matchDownMD = useMediaQuery((theme) => theme.breakpoints.down('md'));
  console.log('Data prop:', data); // Add this line
  const formik = useFormik({
    initialValues: getInitialValues(data[0]),
    validationSchema: InviteSchema,
    onSubmit: handlebeIsSubmit
  });

  // ============================================================|| FETCH API ADDRESS ||============================================================ //
  useEffect(() => {
    // Fetch provinces data
    fetchData('https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json', setProvinces);
  }, []);

  useEffect(() => {
    // Fetch amphures data
    fetchData('https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_amphure.json', setAmphures);
  }, []);

  useEffect(() => {
    // Fetch sub-district data
    fetchData('https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_tambon.json', setTambons);
  }, []);

  // ============================================================|| FETCH USER DATA ||============================================================ //
  useEffect(() => {
    if (data) {
      data.map((item) => {
        // const provincess = provinces.find((province) => province.name_en === item.province)?.id || '';
        // const districts = amphures.find((amphure) => amphure.name_en === item.district)?.id || '';
        // const subdistricts = tambons.find((tambon) => tambon.name_en === item.subdistrict)?.id || '';
        // console.log('provincess', provincess);
        setFieldValue('firstname', `${item.firstname}`);
        setFieldValue('lastname', item.lastname);
        setFieldValue('nickname', item.nickname);
        setFieldValue('phoneno', item.phone || '');
        setFieldValue('birthday', item.birthday);
        setFieldValue('address', item.address || '');
        setFieldValue('subdistrict', item.subdistrict);
        setFieldValue('district', item.district);
        setFieldValue('province', item.province);
        // setFieldValue('subdistrict', subdistricts);
        // setFieldValue('district', districts);
        // setFieldValue('province', provincess);
        setFieldValue('postcode', item.postcode);
      });
      // console.log('formik.values:', formik.values);
    }
  }, [data]);

  const { errors, touched, getFieldProps, handleSubmit, setFieldValue } = formik;

  // ============================================================|| FUNCTION CALCULATE DATE ||============================================================ //
  const calculateYearrDifference = (birthday) => {
    if (!birthday) return '';

    const currentDate = new Date();
    const birthDate = new Date(birthday);

    let years = currentDate.getFullYear() - birthDate.getFullYear();
    let months = currentDate.getMonth() - birthDate.getMonth();

    if (months < 0) {
      years--;
      months += 12;
    }

    if (years > 0) {
      return `${years}`;
    } else if (months > 0) {
      return `${months} Month${months !== 1 ? 's' : ''}`;
    } else {
      return 'Less than 1 Month';
    }
  };

  console.log('formik values', formik.values);
  console.log('edit:', edit);
  console.log('formik.values.subdistrict:', formik.values.address);

  return (
    <Grid item xs={12} sm={7} md={8} lg={9}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <form onSubmit={handleSubmit}>
            <MainCard>
              <Typography variant="h4" sx={{ my: '14px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <span style={{ flex: 1, display: 'flex', alignItems: 'center' }}>Personal Details</span>
                {!edit ? (
                  <Button
                    variant="text"
                    color="primary"
                    style={{ padding: '0', minWidth: 'auto' }}
                    onClick={() => {
                      setEdit(true);
                    }}
                  >
                    <FontAwesomeIcon icon={faPen} style={{ color: '#0066ff' }} />
                  </Button>
                ) : null}
              </Typography>
              <Divider sx={{ mb: '14px' }} />
              <List sx={{ py: 0 }}>
                <ListItem>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <InputLabel htmlFor="email">
                        First name {edit ? <div style={{ color: 'red', display: 'inline' }}> *</div> : null}
                      </InputLabel>
                      <TextField
                        placeholder="Enter Fisrt Name"
                        disabled={edit ? false : true}
                        value={formik.values.firstname}
                        {...getFieldProps('firstname')}
                        fullWidth
                        error={Boolean(touched.firstname && errors.firstname)}
                        helperText={touched.firstname && errors.firstname}
                        InputProps={{
                          style: {
                            backgroundColor: edit ? '' : '#F3F4F6',
                            borderRadius: '30px '
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <InputLabel htmlFor="email">
                        Last name{edit ? <div style={{ color: 'red', display: 'inline' }}> *</div> : null}
                      </InputLabel>
                      <TextField
                        disabled={edit ? false : true}
                        placeholder="Enter Last Name"
                        value={formik.values.lastname}
                        {...getFieldProps('lastname')}
                        fullWidth
                        error={Boolean(touched.lastname && errors.lastname)}
                        helperText={touched.lastname && errors.lastname}
                        InputProps={{
                          style: {
                            backgroundColor: edit ? '' : '#F3F4F6',
                            borderRadius: '30px '
                          }
                        }}
                      />
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <InputLabel htmlFor="email">
                        Nickname{edit ? <div style={{ color: 'red', display: 'inline' }}> *</div> : null}
                      </InputLabel>
                      <TextField
                        disabled={edit ? false : true}
                        placeholder="Enter Nickname"
                        value={formik.values.nickname}
                        {...getFieldProps('nickname')}
                        fullWidth
                        error={Boolean(touched.nickname && errors.nickname)}
                        helperText={touched.nickname && errors.nickname}
                        InputProps={{
                          style: {
                            backgroundColor: edit ? '' : '#F3F4F6',
                            borderRadius: '30px '
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <InputLabel htmlFor="email">
                        Phone number{edit ? <div style={{ color: 'red', display: 'inline' }}> *</div> : null}
                      </InputLabel>
                      <NumberFormat
                        customInput={TextField}
                        disabled={edit ? false : true}
                        format="###-#######"
                        mask="_"
                        placeholder="Enter Phone no."
                        value={formik.values.phoneno}
                        fullWidth
                        onValueChange={({ formattedValue, value }) => {
                          console.log('phone no value', value);
                          formik.setFieldValue('phoneno', value);
                        }}
                        error={Boolean(touched.phoneno && errors.phoneno)}
                        helperText={touched.phoneno && errors.phoneno}
                        InputProps={{
                          style: {
                            backgroundColor: edit ? '' : '#F3F4F6',
                            borderRadius: '30px '
                          }
                        }}
                      />
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <InputLabel htmlFor="working-date">
                        Birthday{edit ? <div style={{ color: 'red', display: 'inline' }}> *</div> : null}
                      </InputLabel>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                          disabled={edit ? false : true}
                          inputFormat="dd/MM/yyyy"
                          placeholder="DD/MM/YYYY"
                          maxDate={new Date()}
                          value={formik.values.birthday}
                          onChange={(date) => formik.setFieldValue('birthday', date)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              fullWidth
                              {...getFieldProps('birthday')}
                              error={Boolean(touched.birthday && errors.birthday)}
                              helperText={touched.birthday && errors.birthday}
                              onChange={(e) => {
                                const enteredDate = e.target.value;

                                if (/^\d{2}\/\d{2}\/\d{4}$/.test(enteredDate)) {
                                  formik.setFieldValue('birthday', enteredDate);
                                } else {
                                  // formik.setFieldValue('birthday', '');
                                }
                              }}
                              InputProps={{
                                ...params.InputProps,
                                sx: {
                                  ...params.InputProps.sx,
                                  backgroundColor: edit ? '' : '#F3F4F6',
                                  borderRadius: '30px '
                                }
                              }}
                              // onChange={(e) => {
                              //   const enteredDate = e.target.value;
                              //   console.log('birthday', enteredDate);
                              //   if (enteredDate) {
                              //     formik.setFieldValue('birthday', enteredDate);
                              //   } else {
                              //   }
                              // }}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <InputLabel htmlFor="email">Age</InputLabel>
                      <TextField
                        disabled
                        value={calculateYearrDifference(formik.values.birthday)}
                        fullWidth
                        InputProps={{
                          style: {
                            backgroundColor: '#F3F4F6',
                            borderRadius: '30px '
                          }
                        }}
                      />
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={12}>
                      <InputLabel htmlFor="email">
                        Address{edit ? <div style={{ color: 'red', display: 'inline' }}> *</div> : null}
                      </InputLabel>
                      <TextField
                        disabled={edit ? false : true}
                        placeholder="Enter Address"
                        value={formik.values.address}
                        {...getFieldProps('address')}
                        fullWidth
                        error={Boolean(touched.address && errors.address)}
                        helperText={touched.address && errors.address}
                        InputProps={{
                          style: {
                            backgroundColor: edit ? '' : '#F3F4F6',
                            borderRadius: '30px '
                          }
                        }}
                      />
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <InputLabel htmlFor="password-reset">
                        Province{edit ? <div style={{ color: 'red', display: 'inline' }}> *</div> : null}
                      </InputLabel>
                      <Autocomplete
                        id="role"
                        disabled={edit ? false : true}
                        options={provinces}
                        getOptionLabel={(option) => option.name_en}
                        value={provinces.find((option) => option.id === formik.values.province) || null}
                        onChange={(event, newValue) => {
                          if (newValue !== null) {
                            formik.setFieldValue('province', newValue.id);
                            formik.setFieldValue('district', '');
                            formik.setFieldValue('subdistrict', '');
                            formik.setFieldValue('postcode', '');
                          } else {
                            formik.setFieldValue('province', '');
                            formik.setFieldValue('district', '');
                            formik.setFieldValue('subdistrict', '');
                            formik.setFieldValue('postcode', '');
                          }
                        }}
                        fullWidth
                        margin="normal"
                        renderInput={(params) => (
                          <div style={{ position: 'relative' }}>
                            <TextField
                              {...params}
                              placeholder="Select Province"
                              error={Boolean(touched.province && errors.province)}
                              helperText={touched.province && errors.province}
                              InputProps={{
                                ...params.InputProps,
                                style: {
                                  backgroundColor: edit ? '' : '#F3F4F6',
                                  borderRadius: '30px '
                                }
                              }}
                            />
                          </div>
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <InputLabel htmlFor="password-reset">
                        District{edit ? <div style={{ color: 'red', display: 'inline' }}> *</div> : null}
                      </InputLabel>
                      <Autocomplete
                        id="role"
                        disabled={edit ? (formik.values.province ? false : true) : true}
                        options={amphures.filter((distr) => distr.province_id === formik.values.province)}
                        getOptionLabel={(option) => option.name_en}
                        value={amphures.find((option) => option.id === formik.values.district) || null}
                        onChange={(event, newValue) => {
                          if (newValue !== null) {
                            formik.setFieldValue('district', newValue.id);
                            formik.setFieldValue('subdistrict', '');
                            formik.setFieldValue('postcode', '');
                          } else {
                            formik.setFieldValue('district', '');
                            formik.setFieldValue('subdistrict', '');
                            formik.setFieldValue('postcode', '');
                          }
                        }}
                        fullWidth
                        margin="normal"
                        // freeSolo
                        renderInput={(params) => (
                          <div style={{ position: 'relative' }}>
                            <TextField
                              {...params}
                              placeholder="Select District"
                              error={Boolean(touched.district && errors.district)}
                              helperText={formik.values.province ? touched.district && errors.district : null}
                              InputProps={{
                                ...params.InputProps,
                                style: {
                                  backgroundColor: !edit || !formik.values.province || formik.values.province.length <= 0 ? '#F3F4F6' : '',
                                  borderRadius: '30px '
                                }
                              }}
                            />
                          </div>
                        )}
                      />
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <InputLabel htmlFor="password-reset">
                        Sub-district{edit ? <div style={{ color: 'red', display: 'inline' }}> *</div> : null}
                      </InputLabel>
                      <Autocomplete
                        id="role"
                        disabled={edit ? (formik.values.district ? false : true) : true}
                        options={tambons.filter((distr) => distr.amphure_id === formik.values.district)}
                        getOptionLabel={(option) => option.name_en}
                        value={tambons.find((option) => option.id === formik.values.subdistrict) || null}
                        onChange={(event, newValue) => {
                          if (newValue !== null) {
                            formik.setFieldValue('subdistrict', newValue.id); // Set the ID
                            formik.setFieldValue('postcode', newValue.zip_code);
                          } else {
                            formik.setFieldValue('subdistrict', '');
                            formik.setFieldValue('postcode', '');
                          }
                        }}
                        fullWidth
                        margin="normal"
                        renderInput={(params) => (
                          <div style={{ position: 'relative' }}>
                            <TextField
                              {...params}
                              placeholder="Select Sub-district"
                              error={Boolean(touched.subdistrict && errors.subdistrict)}
                              helperText={formik.values.district ? touched.subdistrict && errors.subdistrict : null}
                              InputProps={{
                                ...params.InputProps,
                                style: {
                                  backgroundColor: !edit || !formik.values.district || formik.values.district.length <= 0 ? '#F3F4F6' : '',
                                  borderRadius: '30px '
                                }
                              }}
                            />
                          </div>
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <InputLabel htmlFor="email">
                        Postcode{edit ? <div style={{ color: 'red', display: 'inline' }}> *</div> : null}
                      </InputLabel>
                      <TextField
                        disabled={edit ? (formik.values.subdistrict ? false : true) : true}
                        placeholder="Enter Postcode"
                        value={formik.values.postcode}
                        {...getFieldProps('postcode')}
                        fullWidth
                        error={Boolean(touched.postcode && errors.postcode)}
                        helperText={formik.values.subdistrict ? touched.postcode && errors.postcode : null}
                        InputProps={{
                          style: {
                            backgroundColor: !edit || !formik.values.subdistrict || formik.values.subdistrict.length <= 0 ? '#F3F4F6' : '',
                            borderRadius: '30px '
                          }
                        }}
                      />
                    </Grid>
                  </Grid>
                </ListItem>
              </List>
              <Typography variant="h4" sx={{ my: '14px' }}>
                Working Details
              </Typography>
              <Divider sx={{ mb: '14px' }} />
              {data.map((item, index) => (
                <List sx={{ py: 0 }} key={index}>
                  <ListItem>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <InputLabel htmlFor="email">Department</InputLabel>
                        <TextField
                          placeholder="Department"
                          disabled
                          value={item.department}
                          fullWidth
                          InputProps={{
                            style: {
                              backgroundColor: '#F3F4F6',
                              borderRadius: '30px '
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <InputLabel htmlFor="email">Group</InputLabel>
                        <TextField
                          placeholder="Group"
                          disabled
                          value={item.group}
                          fullWidth
                          InputProps={{
                            style: {
                              backgroundColor: '#F3F4F6',
                              borderRadius: '30px '
                            }
                          }}
                        />
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <InputLabel htmlFor="email">Position</InputLabel>
                        <TextField
                          placeholder="Position"
                          disabled
                          value={item.position}
                          fullWidth
                          InputProps={{
                            style: {
                              backgroundColor: '#F3F4F6',
                              borderRadius: '30px '
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <InputLabel htmlFor="email">Level</InputLabel>
                        <Autocomplete
                          id="level"
                          disabled
                          options={levelData}
                          getOptionLabel={(option) => option.name_eng || ''}
                          value={levelData ? levelData.find((option) => option.enum_id === item.level) || null : null}
                          fullWidth
                          margin="normal"
                          renderInput={(params) => (
                            <div style={{ position: 'relative' }}>
                              <TextField
                                {...params}
                                placeholder="Select Level"
                                {...getFieldProps('level')}
                                InputProps={{
                                  ...params.InputProps,
                                  style: {
                                    backgroundColor: '#F3F4F6',
                                    borderRadius: '30px '
                                  }
                                }}
                              />
                            </div>
                          )}
                        />
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <InputLabel htmlFor="email">Starting Date</InputLabel>
                        <TextField
                          placeholder="Enter Email"
                          disabled
                          value={item.startworkdate}
                          fullWidth
                          InputProps={{
                            style: {
                              backgroundColor: '#F3F4F6',
                              borderRadius: '30px '
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <InputLabel htmlFor="email">Year Experience</InputLabel>
                        <TextField
                          placeholder="Year Exp"
                          disabled
                          value={item.yearexp}
                          fullWidth
                          InputProps={{
                            style: {
                              color: '#B8B9BA',
                              backgroundColor: '#F3F4F6',
                              borderRadius: '30px'
                            }
                          }}
                        />
                      </Grid>
                    </Grid>
                  </ListItem>
                </List>
              ))}
            </MainCard>
            {edit ? (
              <MainCard>
                <Stack direction={matchDownMD ? 'column-reverse' : 'row'} justifyContent="flex-end" alignItems="center" spacing={1}>
                  <Button
                    variant="outlined"
                    onClick={handlebeforeClose}
                    sx={{
                      mr: '10px',
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
                </Stack>
              </MainCard>
            ) : null}
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Details;
