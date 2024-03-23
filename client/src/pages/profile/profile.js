import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  IconButton,
  Checkbox,
  Collapse,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  TextField,
  Typography,
  MenuItem,
  Container,
  Select,
  InputLabel,
  FormControl,
  styled,
  Button,
  Tab,
  Tabs
} from '@mui/material';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import useAuth from 'hooks/useAuth';
import { useLocation, Link, Outlet } from 'react-router-dom';
import MainCard from 'components/MainCard';
import { ContainerOutlined, FileTextOutlined, LockOutlined, SettingOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';

// called api
import api from '_api';

export default function SettingProfile() {
  const { apiLogout, user } = useAuth();
  const [data, setData] = useState([]);
  const [isStatus, setIsStatus] = useState([]);
  const { pathname } = useLocation();

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

  let selectedTab = 0;
  switch (pathname) {
    case '/profile/password':
      selectedTab = 1;
      break;
    case '/profile/profile':
    default:
      selectedTab = 0;
  }
  const [value, setValue] = useState(selectedTab);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div border={false}>
        <Paper
          variant="outlined"
          sx={{
            mt: 2,
            py: 1.2,
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            border: '1px solid #ccc',
            borderRadius: '10px'
          }}
        >
          <Tabs
            variant="fullWidth" // Set variant to "fullWidth"
            value={value}
            onChange={handleChange}
            indicatorColor="#F3F4F6"
            backgroundColor="#FFF"
            centered
            sx={{
              borderRadius: '10px',
              color: '',
              width: 'auto',
              display: 'flex',
              justifyContent: 'space-between',
              '& .MuiTab-root': {
                flex: 1, // Equal spacing between tabs
                borderRadius: '10px',
                color: '#B8B9BA',
                '&:hover': {
                  backgroundColor: '#F3F4F6', // Replace with your desired hover text color
                  color: '#B8B9BA'
                },
                '&.Mui-selected': {
                  backgroundColor: '#F3F4F6',
                  color: '#333436',
                  '& .MuiTab-label': {
                    color: '#333436'
                  }
                },
                margin: '0 14px'
              },
              '& .MuiTab-label': {
                color: '#F3F4F6'
              }
            }}
          >
            <Tab label="Profile" component={Link} to="/profile/profile"  />
            <Tab item label="Password" component={Link} to="/profile/password"  />
          </Tabs>
        </Paper>
      </div>
      <Box sx={{ mt: 1 }}>
        <Outlet />
      </Box>
    </>
  );
}
