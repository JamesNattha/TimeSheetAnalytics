import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Grid, Stack, Typography } from '@mui/material';
import useAuth from 'hooks/useAuth';
import AuthWrapper from 'sections/auth/AuthWrapper';
import AuthRegister from 'sections/auth/auth-forms/AuthRegister';
import api from '_api';

const Register = () => {
  const { token } = useParams();
  const [data,setData] = useState([]);
  const { isLoggedIn } = useAuth();
  const [isValidToken, setIsValidToken] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Function to check the verification token and activate the account
    const checkVerificationToken = async () => {
      try {
        console.log('token',token)
        const apiResponse = await api.inviteRegister.getProfile({ token: token });

        console.log('API Response:', apiResponse);
        if (apiResponse && apiResponse.data.length > 0) {
          setIsValidToken(true);
          setData(apiResponse.data)
        } else {
          setIsValidToken(false);
        }
        console.log(data);
      } catch (error) {
        console.error('API Error:', error);
        setIsValidToken(false);
      }
    };
    // Call the function to check the verification token
    checkVerificationToken();
  }, [token]);

  console.log('token is', token);

  return (
    <AuthWrapper >
      {isValidToken ? (
        <Grid container spacing={3} >
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
              <Typography variant="h3">Sign up</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <AuthRegister token={token} dataProp={data}/>
          </Grid>
        </Grid>
      ): null
}
       {/* ) : (
        // <Typography variant="h3">Token is not valid</Typography>
       )} */}
    </AuthWrapper>
  );
};

export default Register;
