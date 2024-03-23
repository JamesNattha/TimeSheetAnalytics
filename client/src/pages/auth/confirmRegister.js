// material-ui
import { Grid, Stack, Typography ,Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// project import
import AuthWrapper from 'sections/auth/AuthWrapper';


// ================================|| CODE VERIFICATION ||================================ //

const CodeConfirmVerification = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };


return (
  <AuthWrapper>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Stack spacing={1}>
          <Typography variant="h3">Congratulation</Typography>
          <Typography color="secondary">your account is succuss</Typography>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Typography>Welcome To UNDEFINED.@UNDEFINED.com</Typography>
        <Typography>Click below to Login</Typography>
      </Grid>
      <Grid item xs={12}>
      <Button onClick={handleLogin}>Login</Button>
      </Grid>
    </Grid>
  </AuthWrapper>
);
}

export default CodeConfirmVerification;
