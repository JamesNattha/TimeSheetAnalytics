import React, { useState, useEffect } from 'react';

// material-ui
import { Grid, Box } from '@mui/material';

//project import
import backgroundImage from 'assets/images/main-page/Frame280554.png';



// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        minHeight: '100vh'
      }}
    ></Box>
  );
};

export default DashboardDefault;
