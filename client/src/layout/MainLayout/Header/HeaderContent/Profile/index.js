import PropTypes from 'prop-types';
import { useRef, useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  ButtonBase,
  CardContent,
  ClickAwayListener,
  Grid,
  Paper,
  Popper,
  Stack,
  Tab,
  Tabs,
  Tooltip,
  Typography,
  Button
} from '@mui/material';

// project import
import Avatar from 'components/@extended/Avatar';
import MainCard from 'components/MainCard';
import Transitions from 'components/@extended/Transitions';
import IconButton from 'components/@extended/IconButton';
import useAuth from 'hooks/useAuth';
import ProfileTab from './ProfileTab';
import SettingTab from './SettingTab';
import { useNavigate } from 'react-router';

// assets
// import avatar1 from 'assets/images/users/avatar-1.png';
import avatar1 from 'assets/images/users/default.png';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import LogoutIcon from 'assets/images/icons-svg/tab/logoutIcon';
import ManageIcon from 'assets/images/icons-svg/tab/manageIcon';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import api from '_api';

// tab panel wrapper
function TabPanel({ children, value, index, ...other }) {
  console.log('children', children);
  console.log('value', value);
  console.log('index', index);
  console.log('other', other);
  return (
    <div role="tabpanel" hidden={value !== index} id={`profile-tabpanel-${index}`} aria-labelledby={`profile-tab-${index}`} {...other}>
      {value === index && children}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `profile-tab-${index}`,
    'aria-controls': `profile-tabpanel-${index}`
  };
}

// ==============================|| HEADER CONTENT - PROFILE ||============================== //

const Profile = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [buttonBaseWidth, setButtonBaseWidth] = useState('auto');

  const [profileImg, setProfileImg] = useState([]);
  const [data, setData] = useState([]);
  const [isStatus, setIsStatus] = useState();
  // console.log('provinceData', provinceData);\

  const fetchProfile = async () => {
    try {
      const { data, isStatus } = await api.profile.fetchImg();
      if (isStatus) {
        // console.log('data', data.img);
        if (data.img && data.img.length >= 1) {
          let imgData = data?.img[0]; 
          if (imgData) {
            const imgBuffer = Buffer.from(imgData, 'base64');
            let img = imgBuffer.toString('base64');
            setProfileImg(img);
          } else {
            console.log('No picture available');
          }
        } else {
          console.log('dont have picture');
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const { apiLogout, user } = useAuth();
  const handleLogout = async () => {
    try {
      await apiLogout();
    } catch (err) {
      console.error(err);
    }
  };

  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleProfilesetting = (event) => {
    navigate('/profile/profile');
  };

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const iconBackColorOpen = theme.palette.mode === 'dark' ? 'grey.200' : 'grey.300';

  useEffect(() => {
    if (anchorRef.current) {
      setButtonBaseWidth(anchorRef.current.getBoundingClientRect().width);
    }
  }, [anchorRef]);


  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <ButtonBase
        sx={{
          p: '8px',
          bgcolor: open ? '#393939' : '#E0E0E0',
          color: open ? '#FFFFFF' : '#333436',
          width: 'auto',
          height: 51,
          borderRadius: 40,
          // '&:hover': { bgcolor: theme.palette.mode === 'dark' ? 'secondary.light' : '#E0E0E0', color: open ? '#000' : '#000' },
          '&:focus-visible': {
            outline: `2px solid ${theme.palette.secondary.dark}`,
            outlineOffset: 2
          }
        }}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? 'profile-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 0.5 }}>
          <Avatar
            alt="profile user"
            src={profileImg.length >= 1 ? `data:image/jpeg;base64,${profileImg}` : avatar1}
            sx={{
              border: '2px solid #fff'
            }}
          />
          <Stack direction="column" sx={{ alignItems: 'start', pr: '8px' }}>
            <Typography
              variant="h6"
              style={{
                width: '145px', // Set a maximum width
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {user?.name}
            </Typography>
            <Typography variant="body2">
              {typeof user?.role === 'string'
                ? user?.role === 'super_admin'
                  ? 'Super Admin'
                  : `${user?.role[0]?.toUpperCase()}${user?.role.slice(1)}`
                : ''}
            </Typography>
          </Stack>
        </Stack>
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{
            borderRadius: 40
          }}
        >
          {open ? (
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{
                width: 24,
                height: 24,
                bgcolor: '#fff',
                borderRadius: 40,
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <UpOutlined style={{ color: '#000' }} />
            </Stack>
          ) : (
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{
                width: '24px',
                height: '24px',
                bgcolor: '#393939',
                borderRadius: 40,
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <DownOutlined style={{ color: '#fff' }} />
            </Stack>
          )}
        </Stack>
      </ButtonBase>
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 9]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="fade" in={open} {...TransitionProps}>
            {open && (
              <Paper
                sx={{
                  borderRadius: '8px',
                  boxShadow: theme.customShadows.z1,
                  width: 'auto',
                  minWidth: 'auto',
                  maxWidth: 'auto',
                  [theme.breakpoints.down('md')]: {
                    maxWidth: 'auto'
                  }
                }}
              >
                <ClickAwayListener onClickAway={handleClose}>
                  <MainCard elevation={0} border={false} content={false} sx={{ borderRadius: '8px' }}>
                    <CardContent sx={{ px: 2.5, pt: 3 }}>
                      <Grid container justifyContent="center" alignItems="center">
                        <Stack direction="column" spacing={1.25} alignItems="center">
                          <Avatar
                            alt="profile user"
                            src={profileImg.length >= 1 ? `data:image/jpeg;base64,${profileImg}` : avatar1}
                            sx={{ width: 32, height: 32 }}
                          />
                          <Stack justifyContent="center" alignItems="center">
                            <Typography variant="h6">{user?.name}</Typography>
                            <Typography variant="body2">
                              {user?.role === 'super_admin' ? 'Super Admin' : `${user?.role[0].toUpperCase()}${user?.role.slice(1)}`}
                            </Typography>
                          </Stack>
                          <Button
                            variant="outlined"
                            size="large"
                            sx={{
                              borderColor: 'text.primary',
                              color: 'text.primary',
                              display: 'flex',
                              padding: '4px 24px',
                              justifyContent: 'center',
                              alignItems: 'center',
                              gap: '8px',
                              alignSelf: 'stretch',
                              '&:hover': {
                                color: '#000000',
                                bgcolor: '#B8B9BA',
                                borderColor: '#000000',
                                '& svg path': {
                                  fill: '#000000'
                                }
                              }
                            }}
                            onClick={handleProfilesetting}
                          >
                            <ManageIcon /> Manage Account
                          </Button>
                          <Button
                            variant="outlined"
                            size="large"
                            sx={{
                              bgcolor: 'text.primary',
                              color: '#fff',
                              display: 'flex',
                              padding: '4px 24px',
                              justifyContent: 'center',
                              alignItems: 'center',
                              gap: '8px',
                              alignSelf: 'stretch',
                              borderColor: '#fff',
                              '&:hover': {
                                color: '#000000',
                                borderColor: '#000000',
                                '& svg path': {
                                  fill: '#000000'
                                },
                                '& p': {
                                  color: '#000000'
                                }
                              }
                            }}
                            onClick={handleLogout}
                          >
                            <LogoutIcon /> Log out
                          </Button>
                        </Stack>
                      </Grid>
                    </CardContent>
                    {/* {open && (
                      <>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                          <Tabs variant="fullWidth" value={value} onChange={handleChange} aria-label="profile tabs">
                            
                            <Tab
                              sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textTransform: 'capitalize'
                              }}
                              icon={<SettingOutlined style={{ marginBottom: 0, marginRight: '10px' }} />}
                              label="Setting"
                              {...a11yProps(1)}
                            />
                            <Tab
                              sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textTransform: 'capitalize'
                              }}
                              icon={<UserOutlined style={{ marginBottom: 0, marginRight: '10px' }} />}
                              label="Profile"
                              {...a11yProps(0)}
                            />
                          </Tabs>
                        </Box>
                        <TabPanel value={value} index={0} dir={theme.direction}>
                          <ProfileTab handleLogout={handleLogout} />
                        </TabPanel>
                        <TabPanel value={value} index={1} dir={theme.direction}>
                          <SettingTab />
                        </TabPanel>
                        <ProfileTab handleLogout={handleLogout} />
                      </>
                    )} */}
                  </MainCard>
                </ClickAwayListener>
              </Paper>
            )}
          </Transitions>
        )}
      </Popper>
    </Box>
  );
};

export default Profile;
