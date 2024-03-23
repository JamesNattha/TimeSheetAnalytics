import React, { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// assets
import api from '_api';

const avatarImage = require.context('assets/images/users', true);
//third-party
import Details from './Detail-profile/detail';
import Minicard from './Detail-profile/minicard';
import useNewPerson from './data/data';

// ==============================|| ACCOUNT PROFILE - BASIC ||============================== //

const Profile = () => {
  const [datanow, setData] = useState([]);
  const [isStatus, setIsStatus] = useState();
  // console.log('provinceData', provinceData);
  const fetchProfile = async () => {
    try {
      const { data, isStatus } = await api.profile.fetchProfile();
      if (isStatus) setData(data), setIsStatus(isStatus);
      // console.log('data profile', data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const refreshData = () => {
    fetchProfile();
  }

  const data = useNewPerson(datanow);

  // console.log('data profile is da best', data);

  return (
    <Grid container spacing={1}>
      <Minicard data={data} fetch={refreshData}/>
      <Details data={data} fetch={refreshData}/>
    </Grid>
  );
};

export default Profile;
