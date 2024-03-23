import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
// material-ui
import {
  Box,
  Chip,
  Grid,
  FormLabel,
  IconButton,
  Button,
  TextField,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  Stack,
  Typography
} from '@mui/material';

import { format } from 'date-fns';
// third-party
import NumberFormat from 'react-number-format';

// project import
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';
import Avatar1 from 'assets/images/users/default.png';
// import Avatar from '@material-ui/core/Avatar';
// assets
import { LinkOutlined, EnvironmentOutlined, MailOutlined, PhoneOutlined, EditOutlined, CameraOutlined } from '@ant-design/icons';
import api from '_api';
import { styled } from '@mui/material/styles';
const avatarImage = require.context('assets/images/users', true);

// ==============================|| ACCOUNT PROFILE - BASIC ||============================== //

const Minicard = ({ data }) => {
  const theme = useTheme();
  const [selectedImage, setSelectedImage] = useState(null);
  const [avatar, setAvatar] = useState(avatarImage(`./default.png`));
  const [imageUrl, setImageUrl] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [img, setImg] = useState();
  const [error, setError] = useState(null);
  const [profileImg, setProfileImg] = useState([]);

  console.log('datanow update in mini', data);

  const formatDateToLongString = (date) => {
    if (!date) return '';
    return format(new Date(date), 'dd MMMM yyyy');
  };

  const formatBirthDateToLongStringWithAge = (birthday) => {
    if (!birthday) return '';

    const currentDate = new Date();
    const birthDate = new Date(birthday);

    let years = currentDate.getFullYear() - birthDate.getFullYear();
    let months = currentDate.getMonth() - birthDate.getMonth();
    let formattedDate = format(birthDate, 'dd MMMM yyyy');

    if (months < 0) {
      years--;
      months += 12;
    }

    if (years > 0) {
      return `${formattedDate} (${years})`;
    } else if (months > 0) {
      return `${formattedDate} (${months} Month${months !== 1 ? 's)' : ')'}`;
    } else {
      return '${formattedDate} (Less than 1 Month)';
    }
    // if (!date) return '';
    // const birthDate = new Date(date);
    // const today = new Date();
    // let age = today.getFullYear() - birthDate.getFullYear();
    // const monthDiff = today.getMonth() - birthDate.getMonth();

    // if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    //   age;
    // }

    // const formattedDate = format(birthDate, 'dd MMMM yyyy');
    // return `${formattedDate} (${age})`;
  };

  //=================================Update Picture==================================================

  const saveImageUrl = (url) => {
    setImageUrl(url);
    // Convert the image to base64 and send it to the API
    const reader = new FileReader();
    reader.readAsDataURL(selectedImage); // Convert the selectedImage to base64
    reader.onload = () => {
      const base64Data = reader.result.split(',')[1]; // Extract base64 data
      api.profile
        .uploadProfile({ picture: `${base64Data}` })
        .then((response) => {
          // Handle the API response here
          console.log('Image uploaded successfully:', response);
        })
        .catch((error) => {
          // Handle any API error here
          console.error('Error uploading image:', error);
        });
    };
  };
  //=================================UseEffect==================================================

  const fetchProfileImg = async () => {
    try {
      const { data, isStatus } = await api.profile.fetchImg();
      if (isStatus) {
        console.log('data', data.img);
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

  const fetchImage = async () => {
    if (selectedImage) {
      const imageBlob = await selectedImage.arrayBuffer();
      const imageObjectURL = URL.createObjectURL(new Blob([imageBlob]));
      setImg(imageObjectURL);
    }
  };

  useEffect(() => {
    fetchProfileImg();
    fetchImage();
    if (selectedImage) {
      setAvatar(URL.createObjectURL(selectedImage));
      saveImageUrl(selectedImage);
      fetchProfileImg();
    }
  }, [selectedImage]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      const acceptedFormats = ['image/jpeg', 'image/png'];

      if (acceptedFormats.includes(file.type)) {
        const reader = new FileReader();

        reader.onload = (event) => {
          const dataURL = event.target.result;
          setImg(dataURL);
        };

        reader.readAsDataURL(file);
        setSelectedImage(file);
      } else {
        alert('Please select a valid PNG or JPEG image file.');
      }
    }
  };

  return (
    <Grid item xs={12} sm={5} md={4} lg={3} sx={{ borderRadius: '10px' }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <MainCard>
            {data.map((item, index) => (
              <Grid container spacing={3} key={index}>
                <Grid item xs={12}>
                  <Stack spacing={2.5} alignItems="center">
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
                      <Avatar
                        alt="Avatar 1"
                        src={profileImg.length >= 1 ? (img ? img : `data:image/jpeg;base64,${profileImg}`) : Avatar1}
                        sx={{ width: 124, height: 124, border: '1px dashed' }}
                      />
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
                          <CameraOutlined style={{ color: theme.palette.secondary.lighter, fontSize: '2rem' }} />
                          <Typography sx={{ color: 'secondary.lighter' }}>Upload</Typography>
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
                      inputProps={{ accept: 'image/*' }}
                    />

                    <Stack spacing={0.5} alignItems="center">
                      <Typography variant="h5">{item.fullname}</Typography>
                      <Typography color="secondary">{`(${item.nickname})`}</Typography>
                      <Typography color="secondary">{item.position}</Typography>
                      <Typography color="secondary">{item.group}</Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <List component="nav" aria-label="main mailbox folders" sx={{ py: 0 }}>
                    <ListItem>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <ListItemIcon>
                            <PhoneOutlined />
                          </ListItemIcon>
                          <div>
                            <span> Phone number</span>
                          </div>
                        </div>
                        <Typography align="right">
                          <NumberFormat displayType="text" format="###-###-####" mask="_" value={item.phone} />
                        </Typography>
                      </div>
                    </ListItem>
                    <ListItem>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', width: '225px' }}>
                          <ListItemIcon>
                            <MailOutlined />
                          </ListItemIcon>
                          <div>
                            <span>Email</span>
                          </div>
                        </div>
                        <Typography
                          sx={{
                            width: '100%', // Set a maximum width
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}
                          title={item.email}
                        >
                          {item.email}
                        </Typography>
                      </div>
                    </ListItem>
                    <ListItem>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <ListItemIcon>
                            <EnvironmentOutlined />
                          </ListItemIcon>
                          <div>
                            <span>Start Date</span>
                          </div>
                        </div>
                        <Typography align="right">{formatDateToLongString(item.startworkdate)}</Typography>
                      </div>
                    </ListItem>
                    <ListItem>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <ListItemIcon>
                            <LinkOutlined />
                          </ListItemIcon>
                          <div>
                            <span>Date of Birth</span>
                          </div>
                        </div>
                        <Typography align="right">{formatBirthDateToLongStringWithAge(item.birthday)}</Typography>
                      </div>
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            ))}
          </MainCard>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Minicard;
