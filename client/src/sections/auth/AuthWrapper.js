import PropTypes from 'prop-types';

// material-ui
import { Box, Grid, Typography } from '@mui/material';

// project import
import AuthFooter from 'components/cards/AuthFooter';
import Logo from 'components/logo';
import LogoFooter from 'components/logo/indexfooter';
import AuthCard from './AuthCard';
import background from 'assets/images/undefined/Background.png';

// assets
import AuthBackground from 'assets/images/auth/AuthBackground';

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

const AuthWrapper = ({ children }) => (
  <Box sx={{ backgroundImage: `url(${require('assets/images/undefined/Background.png')})`, minHeight: '100vh' }}>
    <AuthBackground />
    <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
      <Grid item xs={12}>
        <Grid
          item
          xs={12}
          container
          justifyContent="center"
          alignItems="center"
          sx={{
            minHeight: { xs: 'calc(100vh - 210px)', sm: 'calc(100vh - 134px)', md: 'calc(100vh - 112px)' }
          }}
        >
          <Grid item>
            <AuthCard>{children}</AuthCard>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Grid item xs={6} sx={{ textAlign: 'center' }}>
          <Typography variant="subtitle2" color="secondary" target="_blank" underline="hover">
            ©2023 Undefined ALL RIGHTS RESERVED.
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  </Box>
);

AuthWrapper.propTypes = {
  children: PropTypes.node
};

export default AuthWrapper;
