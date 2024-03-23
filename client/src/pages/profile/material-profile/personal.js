import react, { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button, FormLabel, Grid, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';

// third-party
import NumberFormat from 'react-number-format';

// project import
import Avatar from 'components/@extended/Avatar';
import MainCard from 'components/MainCard';

import api from '_api';
// assets
import { CameraOutlined } from '@ant-design/icons';

const avatarImage = require.context('assets/images/users', true);

// styles & constant
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
    }
  }
};

// ==============================|| ACCOUNT PROFILE - PERSONAL ||============================== //

const Personal = () => {
  const [data, setData] = useState([]);
  const [isStatus, setIsStatus] = useState([]);
  const theme = useTheme();
  const [selectedImage, setSelectedImage] = useState(undefined);
  const [avatar, setAvatar] = useState(avatarImage(`./default.png`));

  const fetchProfile = async () => {
    try {
      const { data, isStatus } = await api.profile.fetchProfile();
      if (isStatus) setData(data), setIsStatus(isStatus);
      // console.log('data profile', data);
    } catch (error) {
      console.error(error);
    }
  };

  const user = data.map((item) => item.tbUser);
  const department = data.map((item) => item.tbDepartment);
  const position = data.map((item) => item.tbPosition);
  const level = data.map((item) => item.tbLevel);
  const group = data.map((item) => item.tbGroup);
  console.log('ฟหกด่าสว', position);

  useEffect(
    () => {
      fetchProfile();
      if (selectedImage) {
        setAvatar(URL.createObjectURL(selectedImage));
      }
    },
    [],
    [selectedImage]
  );

  const [experience, setExperience] = useState('0');

  const handleChange = (event) => {
    setExperience(event.target.value);
  };

  return (
    <Grid container spacing={3}>
      {user.map((i) => (
        <Grid item xs={12} sm={6} key={i}>
          <MainCard title="Personal Information" >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={2.5} alignItems="center" sx={{ m: 3 }}>
                  <FormLabel
                    htmlFor="change-avtar"
                    sx={{
                      position: 'relative',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      '&:hover .MuiBox-root': { opacity: 1 },
                      cursor: 'pointer'
                    }}
                  >
                    <Avatar alt="Avatar 1" src={avatar} sx={{ width: 76, height: 76 }} />
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .75)' : 'rgba(0,0,0,.65)',
                        width: '100%',
                        height: '100%',
                        opacity: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Stack spacing={0.5} alignItems="center">
                        <CameraOutlined style={{ color: theme.palette.secondary.lighter, fontSize: '1.5rem' }} />
                        <Typography sx={{ color: 'secondary.lighter' }} variant="caption">
                          Upload
                        </Typography>
                      </Stack>
                    </Box>
                  </FormLabel>
                  <TextField
                    type="file"
                    id="change-avtar"
                    label="Outlined"
                    variant="outlined"
                    sx={{ display: 'none' }}
                    onChange={(e) => setSelectedImage(e.target.files?.[0])}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1.25}>
                  <InputLabel htmlFor="personal-first-name">First Name</InputLabel>
                  <TextField fullWidth defaultValue={i.firstName} id="personal-first-name" placeholder="First Name" autoFocus />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1.25}>
                  <InputLabel htmlFor="personal-last-name">Last Name</InputLabel>
                  <TextField fullWidth defaultValue={i.lastName} id="personal-first-name" placeholder="Last Name" />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1.25}>
                  <InputLabel htmlFor="personal-about-me">About me</InputLabel>
                  <TextField fullWidth multiline rows={3} defaultValue={i.aboutMe} id="personal-about-me" placeholder="About me" />
                </Stack>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
      ))}
      <Grid item xs={12} sm={6}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MainCard title="Contact Information">
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="personal-email">Email Address</InputLabel>
                    <TextField
                      type="email"
                      fullWidth
                      value={user.map((item) => item.email)}
                      id="personal-email"
                      placeholder="Email Address"
                      disabled
                      sx={{ bgcolor: '#F0F0F0' }}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="personal-phone">Phone Number</InputLabel>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                      <Select defaultValue="66">
                        <MenuItem value="66">+66</MenuItem>
                      </Select>
                      <NumberFormat
                        format="+66 (###) ####-###"
                        mask="_"
                        fullWidth
                        customInput={TextField}
                        label="Phone Number"
                        defaultValue="8654239581"
                        onBlur={() => {}}
                        onChange={() => {}}
                      />
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="personal-department">Department</InputLabel>
                    <TextField
                      fullWidth
                      id="personal-department"
                      value={department.map((item) => item.name)}
                      disabled
                      sx={{ bgcolor: '#F0F0F0' }}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="personal-gender">Gender</InputLabel>
                    <TextField fullWidth id="personal-gender" placeholder="Gender" />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="personal-position">Position</InputLabel>
                    <TextField
                      fullWidth
                      id="personal-position"
                      value={position && position.some((item) => item !== null)
                        ? position.filter((item) => item !== null).map((item) => item.name).join(', ')
                        : 'No Position'
                      }
                      disabled
                      sx={{ bgcolor: '#F0F0F0' }}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="personal-level">Level</InputLabel>
                    <TextField fullWidth id="personal-level" value={level?.map((item) => item.name)} disabled sx={{ bgcolor: '#F0F0F0' }} />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="personal-group">Group</InputLabel>
                    <TextField fullWidth id="personal-group" value={group?.map((item) => item.name)} disabled sx={{ bgcolor: '#F0F0F0' }} />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="personal-address">Address</InputLabel>
                    <TextField fullWidth id="personal-address" placeholder="Address" />
                  </Stack>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
          <Button variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button variant="contained">Update Profile</Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Personal;
