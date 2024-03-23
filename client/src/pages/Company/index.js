import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Tab, Tabs, List, ListItem, ListItemText, ListItemIcon, Collapse, Paper } from '@mui/material';
import MainCard from 'components/MainCard';
import { useLocation, Link, Outlet } from 'react-router-dom';
import { ContainerOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

export default function Team() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  let selectedTab = 0;
  switch (pathname) {
    case '/company/positions':
      selectedTab = 1;
      break;
    case '/company/groups':
      selectedTab = 2;
      break;
    case '/company/departments':
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
            <Tab label="Department" component={Link} to="/company/departments" />
            <Tab item label="Position" component={Link} to="/company/positions" />
            <Tab label="Group" component={Link} to="/company/groups" />
          </Tabs>
        </Paper>
      </div>
      <Box sx={{ mt: 1 }}>
        <Outlet />
      </Box>
    </>
  );
}
