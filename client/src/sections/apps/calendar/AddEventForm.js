import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputAdornment,
  InputLabel,
  RadioGroup,
  Radio,
  Stack,
  Switch,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import {
  LocalizationProvider,
  MobileDateTimePicker,
  MobileDatePicker,
  MobileTimePicker,
  DigitalClock,
  DateTimePicker,
  DesktopDatePicker
} from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';

// test
// import dayjs from 'dayjs';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
// import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
// import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
// import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';

// third-party
import _ from 'lodash';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import Swal from 'sweetalert2';

// project imports
import ColorPalette from './ColorPalette';
import IconButton from 'components/@extended/IconButton';
import { openSnackbar } from 'store/reducers/snackbar';
import { createEvent, deleteEvent, updateEvent } from 'store/reducers/calendar';
import api from '_api';

// assets
import { CalendarOutlined, DeleteFilled } from '@ant-design/icons';

// constant
const getInitialValues = (event, range) => {
  console.log('event in add calendar', event);
  const newEvent = {
    title: '',
    description: '',
    color: '#166CFF',
    textColor: '#fff',
    allDay: false,
    start: range ? new Date(range.start) : new Date(),
    end: range ? new Date(range.end) : new Date(),
    test: range ? new Date(range.end) : new Date(),
    type: null
  };

  if (event || range) {
    return _.merge({}, newEvent, event);
  }

  return newEvent;
};

// ==============================|| CALENDAR EVENT ADD / EDIT / DELETE ||============================== //

const AddEventFrom = ({ event, range, onCancel, closePop, refetch }) => {
  console.log('even is add ', event);
  const [typeCalendar, setTypeCalendar] = useState([]);
  const theme = useTheme();
  const dispatch = useDispatch();
  const isCreating = !event;

  console.log('isCreated', isCreating);

  const fetchType = async () => {
    try {
      const { data, isStatus } = await api.enum.getEnumCalendar();
      if (isStatus) setTypeCalendar(data);
      console.log('data profile', data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchType();
  }, []);

  const backgroundColor = [
    {
      value: '#166CFF',
      color: 'primary.main'
    },
    {
      value: '#FF4446',
      color: 'error.main'
    },
    {
      value: '#48BC19',
      color: 'success.main'
    },
    {
      value: '#818181',
      color: 'secondary.main'
    },
    {
      value: '#F9A314',
      color: 'warning.main'
    },
    {
      value: '#E2F2FF',
      color: 'primary.lighter'
    },
    {
      value: '#FFEFEE',
      color: 'error.lighter'
    },
    {
      value: '#F5FFEA',
      color: 'success.lighter'
    },
    {
      value: '#F3F3F3',
      color: 'secondary.lighter'
    },
    {
      value: '#FFFAE2',
      color: 'warning.lighter'
    },
    {
      value: '#fff',
      color: 'white'
    }
  ];

  const textColor = [
    {
      value: '#fff',
      color: 'white'
    },
    {
      value: '#FFFAE2',
      color: 'error.lighter'
    },
    {
      value: '#F3F3F3',
      color: 'success.lighter'
    },
    {
      value: '#F5FFEA',
      color: 'secondary.lighter'
    },
    {
      value: '#FFEFEE',
      color: 'warning.lighter'
    },
    {
      value: '#E2F2FF',
      color: 'primary.lighter'
    },
    {
      value: '#166CFF',
      color: 'primary.main'
    },
    {
      value: '#FF4446',
      color: 'error.main'
    },
    {
      value: '#48BC19',
      color: 'success.main'
    },
    {
      value: '#818181',
      color: 'secondary.main'
    },
    {
      value: '#F9A314',
      color: 'warning.main'
    }
  ];

  const EventSchema = Yup.object().shape({
    type: Yup.string().required('Data type is required'),
    title: Yup.string().max(255).required('Title is required'),
    description: Yup.string().max(5000),
    end: Yup.date().when('start', (start, schema) => start && schema.min(start, 'End date must be later than start date')),
    start: Yup.date(),
    color: Yup.string().max(255),
    textColor: Yup.string().max(255)
  });

  const handleTypeChange = (event) => {
    setFieldValue('type', event.target.value);
  };

  const handlebeforeClose = () => {
    const startTimestamp = formik.values.start.getTime();
    const endTimestamp = formik.values.end.getTime();

    if (!isCreating) {
      const eventStartTimestamp = event.start.getTime();
      const eventEndTimestamp = event.end.getTime();

      console.log('test function', formik.values.description !== event.description);
      console.log('formik', formik.values.description);
      console.log('values', event.description);
      if (
        !formik.values.title ||
        !formik.values.end ||
        !formik.values.start ||
        !formik.values.color ||
        !formik.values.textColor ||
        formik.values.title !== event.title ||
        formik.values.description !== event.description ||
        endTimestamp !== eventEndTimestamp ||
        startTimestamp !== eventStartTimestamp ||
        formik.values.color !== event.color ||
        formik.values.textColor !== event.textColor
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
            formik.resetForm();
            onCancel();
            // navigate('/login');
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            // Call the function to send the email again
            // handleEmailSubmission(email);
          }
        });
      } else {
        onCancel();
      }
    } else {
      const rangeStartTimestamp = range.start.getTime();
      const rangeEndTimestamp = range.end.getTime();
      if (
        formik.values.title ||
        formik.values.description ||
        !formik.values.end ||
        !formik.values.start ||
        formik.values.color !== '#166CFF' ||
        formik.values.textColor !== '#fff' ||
        startTimestamp !== rangeStartTimestamp ||
        endTimestamp !== rangeEndTimestamp
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
            formik.resetForm();
            onCancel();
            refetch();
            // navigate('/login');
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            // Call the function to send the email again
            // handleEmailSubmission(email);
          }
        });
      } else {
        onCancel();
      }
    }
  };

  const deleteHandler = async () => {
    console.log('event', event);
    Swal.fire({
      title: 'Delete',
      text: 'if you delete the information, this process will not be able to be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0066FF',
      cancelButtonColor: '#0066FF',
      reverseButtons: true,
      confirmButtonText: 'Confirm',
      customClass: {
        confirmButton: 'confirm-rounded-button',
        cancelButton: 'outlined-button'
      },
      iconHtml: '<div class="delete-icon"></div>'
    }).then((result) => {
      if (result.isConfirmed) {
        const deleted = api.calendar.deleteEvent({ id: event.id }).then(() => {
          // fetchUser();
          console.log('hello delete');
          // fetchUser();
          Swal.fire({
            title: 'Success',
            timer: 2000,
            customClass: 'modal-success',
            // text: 'The information has been deleted',
            showConfirmButton: false,
            // customClass: {
            //   confirmButton: 'rounded-button '
            // },
            iconHtml: '<div class="success-icon"></div>'
          });
          refetch();
          onCancel();
          closePop();
        });
      }
    });
  };

  const createEvent = async () => {
    try {
      const data = {
        title: formik.values.title,
        detail: formik.values.description,
        color: formik.values.color,
        textColor: formik.values.textColor,
        allDay: formik.values.allDay,
        start_date: formik.values.start,
        end_date: formik.values.end,
        type: formik.values.type
      };

      console.log('Invite button clicked');
      console.log('data:', data);

      const createResult = await api.calendar.createEvent(data);
      console.log('createResult', createResult);
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
        closePop();
        refetch();
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
  };

  const updateEvent = async () => {
    try {
      const data = {
        id: event.id,
        title: formik.values.title,
        detail: formik.values.description,
        color: formik.values.color,
        textColor: formik.values.textColor,
        allDay: formik.values.allDay,
        start_date: formik.values.start,
        end_date: formik.values.end,
        type: formik.values.type
      };

      console.log('Invite button clicked');
      console.log('data:', data);

      // Make the API call to send the email
      const createResult = await api.calendar.updateEvent(data);
      console.log('createResult:', data);
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
        closePop();
        await refetch();
        console.log('Email sent successfully!', createResult.message);
      }
      await refetch();
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
  };

  const formik = useFormik({
    initialValues: getInitialValues(event, range),
    validationSchema: EventSchema,
    onSubmit: (values, { setSubmitting }) => {
      try {
        const newEvent = {
          title: values.title,
          description: values.description,
          color: values.color,
          textColor: values.textColor,
          allDay: values.allDay,
          start: values.start,
          end: values.end
        };
        refetch();
        if (event) {
          updateEvent(newEvent);
        } else {
          createEvent(newEvent);
        }

        setSubmitting(false);
      } catch (error) {
        console.error(error);
      }
    }
  });

  const { values, errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue } = formik;

  return (
    <FormikProvider value={formik}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <DialogTitle sx={{ bgcolor: '#F3F4F6' }}>{event ? 'Edit Event' : 'Add Event'}</DialogTitle>
          <Divider />
          <DialogContent sx={{ p: 2.5 }}>
            <Grid container spacing={1.75}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="cal-title">
                    Title<span style={{ color: 'red', marginLeft: '3px' }}>*</span>
                  </InputLabel>
                  <TextField
                    fullWidth
                    id="cal-title"
                    placeholder="Title"
                    {...getFieldProps('title')}
                    error={Boolean(touched.title && errors.title)}
                    helperText={touched.title && errors.title}
                    InputProps={{
                      style: {
                        borderRadius: '30px '
                      }
                    }}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="cal-description">Description</InputLabel>
                  <TextField
                    fullWidth
                    id="cal-description"
                    multiline
                    rows={3}
                    placeholder="Description"
                    {...getFieldProps('description')}
                    error={Boolean(touched.description && errors.description)}
                    helperText={touched.description && errors.description}
                    InputProps={{
                      style: {
                        borderRadius: '10px '
                      }
                    }}
                  />
                </Stack>
              </Grid>

              {/* <Grid item xs={12} md={6}>
                <Stack spacing={1.25}>
                  <InputLabel htmlFor="cal-end-date-time">Start Date</InputLabel>
                  <DesktopDateTimePicker
                    value={values.start}
                    inputFormat="dd/MM/yyyy HH:mm"
                    ampm={false}
                    onChange={(date) => setFieldValue('start', date)}
                    views={['day', 'month', 'year', 'hours', 'minutes']}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        id="cal-end-date-time"
                        fullWidth
                        format="dd/MM/yyyy HH:mm"
                        error={Boolean(touched.start && errors.start)}
                        helperText={touched.start && errors.start}
                        InputProps={{
                          ...params.InputProps,
                          style: {
                            ...params.InputProps.sx,
                            borderRadius: '30px'
                          },
                          endAdornment: (
                            <InputAdornment position="end">
                              <CalendarOutlined />
                            </InputAdornment>
                          )
                        }}
                        InputLabelProps={{
                          shrink: true
                        }}
                      />
                    )}
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack spacing={1.25}>
                  <InputLabel htmlFor="cal-end-date-time">End Date</InputLabel>
                  <DesktopDateTimePicker
                    value={values.end}
                    inputFormat="dd/MM/yyyy HH:mm"
                    ampm={false}
                    onChange={(date) => setFieldValue('end', date)}
                    views={['day', 'month', 'year', 'hours', 'minutes']}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        id="datetime-local"
                        fullWidth
                        format="dd/MM/yyyy HH:mm"
                        type="datetime-local"
                        error={Boolean(touched.end && errors.end)}
                        helperText={touched.end && errors.end}
                        InputProps={{
                          ...params.InputProps,
                          style: {
                            ...params.InputProps.sx,
                            borderRadius: '30px'
                          },
                          endAdornment: (
                            <InputAdornment position="end">
                              <CalendarOutlined />
                            </InputAdornment>
                          )
                        }}
                        InputLabelProps={{
                          shrink: true
                        }}
                      />
                    )}
                  />
                  <TextField
                    fullWidth
                    format="dd/MM/yyyy HH:mm"
                    placeholder="dd/MM/yyyy HH:mm"
                    id="datetime-local"
                    label="End date" // Change the label text to "End date"
                    type="datetime-local"
                    value={values.end}
                    sx={{ borderRadius: '30px' }}
                    InputLabelProps={{
                      shrink: true
                    }}
                    onChange={(date) => setFieldValue('end', date)}
                  />
                </Stack>
              </Grid> */}

              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="cal-end-date-time">
                    Start Date<span style={{ color: 'red', marginLeft: '3px' }}>*</span>
                  </InputLabel>
                  <MobileDateTimePicker
                    value={values.start}
                    onChange={(date) => setFieldValue('start', date)}
                    fullWidth
                    inputFormat="dd/MM/yyyy HH:mm"
                    ampm={false}
                    mask="____/__/__ __:__ _M"
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        id="cal-date-time"
                        placeholder="Start date"
                        fullWidth
                        error={Boolean(touched.start && errors.start)}
                        helperText={touched.start && errors.start}
                        InputProps={{
                          ...params.InputProps,
                          style: {
                            ...params.InputProps.sx,
                            borderRadius: '30px'
                          },
                          endAdornment: (
                            <InputAdornment position="end">
                              <CalendarOutlined />
                            </InputAdornment>
                          )
                        }}
                      />
                    )}
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="cal-end-date-time">
                    End Date<span style={{ color: 'red', marginLeft: '3px' }}>*</span>
                  </InputLabel>
                  <MobileDateTimePicker
                    value={values.end}
                    onChange={(date) => setFieldValue('end', date)}
                    fullWidth
                    inputFormat="dd/MM/yyyy HH:mm"
                    ampm={false}
                    mask="____/__/__ __:__ _M"
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        id="cal-date-time"
                        placeholder="End date"
                        fullWidth
                        error={Boolean(touched.end && errors.end)}
                        helperText={touched.end && errors.end}
                        // InputLabelProps={{
                        //   shrink: true
                        // }}
                        InputProps={{
                          ...params.InputProps,
                          style: {
                            ...params.InputProps.sx,
                            borderRadius: '30px'
                          },
                          endAdornment: (
                            <InputAdornment position="end">
                              <CalendarOutlined />
                            </InputAdornment>
                          )
                        }}
                      />
                    )}
                  />
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={<Switch checked={values.allDay} {...getFieldProps('allDay')} color="success" />}
                  label="All day"
                />
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">Background Color</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl>
                      <RadioGroup
                        row
                        aria-label="color"
                        {...getFieldProps('color')}
                        onChange={(e) => setFieldValue('color', e.target.value)}
                        name="color-radio-buttons-group"
                        sx={{ '& .MuiFormControlLabel-root': { mr: '14px' }, '& .MuiAvatar-root': { width: '36px', height: '36px' } }}
                      >
                        {backgroundColor.map((item, index) => (
                          <ColorPalette key={index} value={item.value} color={item.color} />
                        ))}
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">Text Color</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl component="fieldset">
                      <RadioGroup
                        row
                        aria-label="textColor"
                        {...getFieldProps('textColor')}
                        onChange={(e) => setFieldValue('textColor', e.target.value)}
                        name="text-color-radio-buttons-group"
                        sx={{ '& .MuiFormControlLabel-root': { mr: '14px' }, '& .MuiAvatar-root': { width: '36px', height: '36px' } }}
                      >
                        {textColor.map((item, index) => (
                          <ColorPalette key={index} value={item.value} color={item.color} />
                        ))}
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">
                      Event Type<span style={{ color: 'red', marginLeft: '3px' }}>*</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl component="fieldset">
                      <RadioGroup row name="color" value={values.color} onChange={handleTypeChange}>
                        {typeCalendar.map((item, index) => (
                          <FormControlLabel
                            key={index}
                            value={item.enum_id}
                            control={<Radio checked={formik.values.type === item.enum_id} defaultChecked={1} />}
                            label={item.name_eng}
                          />
                        ))}
                      </RadioGroup>
                    </FormControl>
                    {touched.type && errors.type ? (
                      <Typography variant="body2" color="error">
                        {errors.type}
                      </Typography>
                    ) : null}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: 2.5 }}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                {!isCreating && (
                  <Tooltip title="Delete Event" placement="top">
                    <IconButton onClick={deleteHandler} size="large" color="error" sx={{ borderRadius: '30px' }}>
                      <DeleteFilled />
                    </IconButton>
                  </Tooltip>
                )}
              </Grid>
              <Grid item>
                <Stack direction="row" spacing={2} alignItems="center">
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
                    {event ? 'Edit' : 'Add'}
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </DialogActions>
        </Form>
      </LocalizationProvider>
    </FormikProvider>
  );
};

AddEventFrom.propTypes = {
  event: PropTypes.object,
  range: PropTypes.object,
  onCancel: PropTypes.func
};

export default AddEventFrom;
