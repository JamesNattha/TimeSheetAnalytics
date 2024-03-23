import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import api from '_api';
import Swal from 'sweetalert2';
import { useState } from 'react';
import React, { useEffect } from 'react';
// material-ui
import { Button, FormHelperText, Grid, InputLabel, OutlinedInput, Stack, Typography, InputAdornment, Box } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import IconButton from 'components/@extended/IconButton';
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'components/@extended/AnimateButton';
import { openSnackbar } from 'store/reducers/snackbar';
import { Link } from 'react-router-dom';

import axios from 'axios';

// ============================|| FIREBASE - FORGOT PASSWORD ||============================ //

const AuthForgotPassword = (isLoggedIn) => {
  const scriptedRef = useScriptRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEmailSubmission = async (email) => {
    try {
      const newData = {
        email: email
      };
      console.log('newData', newData);
      const createEmail = await api.login.forgotPassword(newData);
      console.log('createEmail', createEmail);
      if (createEmail.isStatus === false && createEmail.message === 'User not found') {
        Swal.fire({
          title: 'Invalid Email',
          text: 'Email addresses that cannot or should not receive emails',
          customClass: {
            confirmButton: 'rounded-button '
          },
          iconHtml: '<div class="discard-icon"></div>'
        });
      } else if (createEmail.isStatus === false && createEmail.message === 'User has not register') {
        Swal.fire({
          title: 'Not a registered',
          text: 'Please register using the email link before proceeding',
          customClass: {
            confirmButton: 'rounded-button '
          },
          iconHtml: '<div class="discard-icon"></div>'
        });
      } else {
        Swal.fire({
          title: 'Reset email sent',
          text: `We have just sent an email with a password reset link to ${email}`,
          showCancelButton: true,
          reverseButtons: true,
          confirmButtonText: 'Got it!',
          cancelButtonText: 'Send again',
          customClass: {
            confirmButton: 'confirm-rounded-button',
            cancelButton: 'outlined-button'
          },
          iconHtml: '<div class="mail-icon"></div>' 
        }).then((result) => {
          if (result.isConfirmed) {
            // Redirect to the login page when the "Got it!" button is clicked
            navigate('/login');
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            // Call the function to send the email again
            handleEmailSubmission(email);
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
          try {
            if (!values.email) {
              setError(true);
              return;
            }
            // Call the function to handle email submission
            handleEmailSubmission(values.email);
          } catch (error) {
            console.error(error);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-forgot">Email Address</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                    id="email-forgot"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    sx={{ borderRadius: '30px', backgroundColor: '#F3F4F6' }}
                    startAdornment={
                      <InputAdornment position="start">
                        <IconButton aria-label="toggle password visibility" edge="end" color="secondary" disabled>
                          <PersonIcon />
                        </IconButton>
                      </InputAdornment>
                    }
                    inputProps={{}}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="helper-text-email-forgot">
                      {errors.email}
                    </FormHelperText>
                  )}
                  
                </Stack>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}

              <Grid item container>
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
                          Back
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
                          Send
                        </Button>
                      </AnimateButton>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthForgotPassword;
