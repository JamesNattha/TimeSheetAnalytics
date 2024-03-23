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
import { useLocation, Link, Outlet } from 'react-router-dom';
import useAuth from 'hooks/useAuth';
import MainCard from 'components/MainCard';
import { useNavigate } from 'react-router-dom';
import { roleState } from '../../recoil';

// assets
import { ContainerOutlined, FileTextOutlined, LockOutlined, SettingOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';

// called api
import api from '_api';

export default function SettingProfile() {
  const [auth, setAuth] = useRecoilState(roleState);
  const { apiLogout, user } = useAuth();
  const [data, setData] = useState([]);
  const [isStatus, setIsStatus] = useState([]);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  let selectedTab = 0;
  switch (pathname) {
    case '/setting/calendar':
      selectedTab = 1;
      break;
    case '/setting/team':
      selectedTab = 2;
      break;
    case '/setting/role-invite-register':
    default:
      selectedTab = 0;
  }

  const [value, setValue] = useState(selectedTab);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    // let case = 0;
    if (auth.role === 'admin') {
      // Perform admin-specific logic
      switch (value) {
        case 1:
          navigate('/setting/calendar');
          break;
        case 0:
        default:
          navigate('/setting/role-invite-register');
      }
    } else if (auth.role === 'employee' || auth.role === 'management' || auth.role === 'manager') {
      // Perform employee-specific logic
      switch (value) {
        case 1:
          navigate('/setting/calendar');
          break;
        case 0:
        default:
          navigate('/setting/team/department');
      }
    }
  }, [auth.role, value]);

  if (auth.role === 'admin') {
    return (
      <MainCard border={false} boxShadow>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
          <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto" aria-label="account profile tab">
            <Tab
              label="Role (invite Register)"
              component={Link}
              to="/setting/role-invite-register"
              icon={<UserOutlined />}
              iconPosition="start"
            />
            <Tab label="Carlendar" component={Link} to="/setting/calendar" icon={<FileTextOutlined />} iconPosition="start" />
          </Tabs>
        </Box>
        <Box sx={{ mt: 2.5 }}>
          <Outlet />
        </Box>
      </MainCard>
    );
  } else if (auth.role === 'employee' || auth.role === 'manager' || auth.role === 'management') {
    return (
      <MainCard border={false} boxShadow>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
          <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto" aria-label="account profile tab">
            <Tab label="Team" component={Link} to="/setting/team/department" icon={<ContainerOutlined />} iconPosition="start" />
            <Tab label="Calendar" component={Link} to="/setting/calendar" icon={<FileTextOutlined />} iconPosition="start" />
          </Tabs>
        </Box>
        <Box sx={{ mt: 2.5 }}>
          <Outlet />
        </Box>
      </MainCard>
    );
  }

  return null;
}
