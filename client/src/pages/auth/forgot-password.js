import { Link } from 'react-router-dom';

// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
import useAuth from 'hooks/useAuth';
import AuthWrapper from 'sections/auth/AuthWrapper';
import AuthForgotPassword from 'sections/auth/auth-forms/AuthForgotPassword';
import Logo from 'components/logo/indexLogo';

// ================================|| FORGOT PASSWORD ||================================ //

const ForgotPassword = () => {
  const { isLoggedIn } = useAuth();

  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction="column" justifyContent="space-between" alignItems="center" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Logo/>
            <Typography variant="h3" sx={{ textAlign: 'center', fontWeight: 500 ,mt: 2 }}>Forgot Password</Typography>
            {/* <Typography
              component={Link}
              to={isLoggedIn ? '/auth/login' : '/login'}
              variant="body1"
              sx={{ textDecoration: 'none' }}
              color="primary"
            >
              Back to Login
            </Typography> */}
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthForgotPassword isLoggedIn={isLoggedIn} />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default ForgotPassword;
