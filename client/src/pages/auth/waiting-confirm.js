// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
import AuthWrapper from 'sections/auth/AuthWrapper';

// ================================|| CODE VERIFICATION ||================================ //

const CodeVerification = () => (
  <AuthWrapper>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Stack spacing={1}>
          <Typography variant="h3">Pls see your Email Box</Typography>
          <Typography color="secondary">We send you on mail.</Typography>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Typography>We`ve ARE. UNDEFINED.@UNDEFINED.com</Typography>
      </Grid>
      <Grid item xs={12}>
      </Grid>
    </Grid>
  </AuthWrapper>
);

export default CodeVerification;
