// material-ui
import { Grid, Stack, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '_api';
import MainCard from 'components/MainCard';
// project import
import AuthWrapper from 'sections/auth/AuthWrapper';
import AuthResetPassword from 'sections/auth/auth-forms/AuthResetPassword';
import Logo from 'components/logo/indexLogo';

// ================================|| RESET PASSWORD ||================================ //

const ResetPassword = () => {
  const { token } = useParams();
  const [response, setResponse] = useState(null);

  useEffect(() => {
    // Function to check the verification token and activate the account
    const checkVerificationToken = async () => {
      try {
        const apiResponse = await api.login.userActivate({ token: token });
        console.log(apiResponse);
        setResponse(apiResponse);
        console.log(response);
      } catch (error) {
        console.error(error);
        // Handle error and show appropriate error message
      }
    };

    // Call the function to check the verification token
    checkVerificationToken();
  }, [token]);

  const handleSubmit = async () => {
    checkVerificationToken();
  }

  return (
    <AuthWrapper>
      {response && (
        <Grid container>
          {response.success ? (
            <>
              <Grid item xs={12}>
                <Stack direction="column" alignItems="center" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
                  <Logo />
                  <Typography variant="h3" sx={{ textAlign: 'center', fontWeight: 500 ,mt: 2 }}>
                    Reset Password
                  </Typography>
                </Stack>
              </Grid>
              <Grid title="Change Password">
                <AuthResetPassword token={token} refresh={handleSubmit} />
              </Grid>
            </>
          ) : (
            <>
              <Typography variant="h3">Token invalid or undefined</Typography>
              <Typography color="secondary">Please Try agains next time</Typography>
            </>
          )}
        </Grid>
      )}
    </AuthWrapper>
  );
};

export default ResetPassword;
