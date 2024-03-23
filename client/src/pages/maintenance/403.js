import { Link } from 'react-router-dom';

// project import
import config from 'config';

// material-ui
import { Box, Button, Grid, Stack, Typography } from '@mui/material';

// assets
import error404 from 'assets/images/maintenance/3805046.jpg';
import TwoCone from 'assets/images/maintenance/TwoCone.png';

// ==============================|| ERROR 404 - MAIN ||============================== //

function Error403() {
  return (
    <>
      <Grid
        container
        spacing={10}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '100vh', pt: 1.5, pb: 1, overflow: 'hidden', bgcolor: '#fff' }}
      >
        <Grid item xs={12}>
          <Stack direction="row">
            <Grid item>
              <Box sx={{ width: { xs: 250, sm: 590 }, height: { xs: 130, sm: 430 } }}>
                <img src={error404} alt="mantis" style={{ width: '100%', height: '100%' }} />
              </Box>
            </Grid>
            <Grid item sx={{ position: 'relative' }}>
              <Box sx={{ position: 'absolute', top: 60, left: -40, width: { xs: 130, sm: 390 }, height: { xs: 115, sm: 330 } }}>
                <img src={TwoCone} alt="mantis" style={{ width: '100%', height: '100%' }} />
              </Box>
            </Grid>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={2} justifyContent="center" alignItems="center">
            <Typography variant="h1">OOOH! 403, ACCESS DENIED</Typography>

            <Typography color="textSecondary" align="center" sx={{ width: { xs: '73%', sm: '61%' } }}>
              Sorry about that, but you do not have the necessary permissions to access this page.
            </Typography>
            <Typography color="textSecondary" align="center" sx={{ width: { xs: '73%', sm: '61%' } }}>
              Fortunly, you can go back to.
            </Typography>
            <Button component={Link} to={config.defaultPath} variant="contained">
              Back To Home
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

export default Error403;
