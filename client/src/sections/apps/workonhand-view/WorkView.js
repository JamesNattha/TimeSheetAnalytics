import React, { useEffect, useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import moment from 'moment';
import {
  useMediaQuery,
  Grid,
  Chip,
  Divider,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  Stack,
  TableCell,
  TableRow,
  Typography
} from '@mui/material';
import NumberFormat from 'react-number-format';
import MainCard from 'components/MainCard';
import { EnvironmentOutlined, LinkOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import api from '_api';

// const avatarImage = require.context('assets/images/users', true);

const WorkonhandView = ({ data }) => {
  const [role, setRole] = useState([]);

  const fetchUser = useCallback(async () => {
    try {
      const { data: roleData, isStatus } = await api.role.RolefetchTable();
      if (isStatus) {
        setRole(roleData);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  console.log('Role :', role);

  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));

  const modifiedData = useMemo(() => {
    return {
      ...data,
      sendTo: data.sendTo ? data.sendTo.replace(/,/g, '\n') : ''
    };
  }, [data]);

  const modifiedRole = useMemo(() => {
    if (data && role) {
      const filteredRoles = role.filter((person) => person.userId === data.id);
      if (filteredRoles.length > 0) {
        const [userRoles] = filteredRoles.map((person) => person.tbUserRoles);
        if (userRoles.length > 0) {
          const roleNames = userRoles.flatMap((item) => {
            const tbRoles = item.tbRole;
            if (Array.isArray(tbRoles)) {
              return tbRoles.map((role) => role.name);
            } else if (tbRoles && typeof tbRoles === 'object') {
              return [tbRoles.name];
            }
            return [];
          });
          // console.log('RoleName', roleNames);
          return roleNames;
        }
      }
    }
    return [];
  }, [data, role]);

  // console.log(modifiedRole);

  return (
    <TableRow sx={{ '&:hover': { bgcolor: `transparent !important` } }}>
      <TableCell colSpan={8} sx={{ p: 2.5 }}>
        <Grid container spacing={2.5} sx={{ pl: { xs: 0, sm: 2, md: 3, lg: 4, xl: 5 } }}>
          <Grid item xs={12} sm={5} md={4} lg={4}>
            <MainCard>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Stack spacing={2.5} alignItems="center">
                    {/* <Avatar alt="Avatar 1" size="xl" src={avatarImage(`./avatar-${data.avatar}.png`)} /> */}
                    <Stack spacing={0.5} alignItems="center">
                      <Typography variant="h5">{modifiedData.name}</Typography>
                      {modifiedRole.map((role, index) => (
                        <Chip
                          key={index}
                          label={role}
                          size="small"
                          color={
                            modifiedRole == 'admin'
                              ? 'warning'
                              : modifiedRole == 'manager'
                              ? 'info'
                              : modifiedRole == 'employee'
                              ? 'success'
                              : 'primary'
                          }
                          sx={{
                            position: 'relative',
                            top: '5px',
                            p: 0.5,
                            fontSize: '.85rem'
                          }}
                        />
                      ))}
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Stack direction="row" justifyContent="space-around" alignItems="center">
                    <Stack spacing={0.5} alignItems="center">
                      <Typography variant="h5">Progress</Typography>
                      <Typography color="secondary">Progress</Typography>
                    </Stack>
                    <Divider orientation="vertical" flexItem />
                    <Stack spacing={0.5} alignItems="center">
                      <Typography variant="h5">Visits</Typography>
                      <Typography color="secondary">Visits</Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <List component="nav" aria-label="main mailbox folders" sx={{ py: 0 }}>
                    <ListItem>
                      <ListItemIcon>
                        <MailOutlined />
                      </ListItemIcon>
                      <ListItemSecondaryAction>
                        <Typography align="right">{modifiedData.username}</Typography>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <PhoneOutlined />
                      </ListItemIcon>
                      <ListItemSecondaryAction>
                        <Typography align="right">
                          <NumberFormat displayType="text" format="+1 (###) ###-####" mask="_" defaultValue={modifiedData.tel} />
                        </Typography>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <EnvironmentOutlined />
                      </ListItemIcon>
                      <ListItemSecondaryAction>
                        <Typography align="right">Address : {modifiedData.address}</Typography>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
          <Grid item xs={12} sm={7} md={8} lg={8}>
            <Stack spacing={2.5}>
              <MainCard title="Work Details">
                <List sx={{ py: 0 }}>
                  <ListItem divider={!matchDownMD}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={4}>
                        <Stack spacing={0.5}>
                          <Typography color="secondary">Work Name</Typography>
                          <Typography>{modifiedData.workNo}</Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Stack spacing={0.5}>
                          <Typography color="secondary">Start Date</Typography>
                          <Typography>{modifiedData.startDate}</Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Stack spacing={0.5}>
                          <Typography color="secondary">End Date</Typography>
                          <Typography>{modifiedData.endDate}</Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Stack spacing={0.5}>
                      <Typography color="secondary">Detail</Typography>
                      <Typography>{modifiedData.detail}</Typography>
                    </Stack>
                  </ListItem>
                </List>
              </MainCard>
            </Stack>
          </Grid>
        </Grid>
      </TableCell>
    </TableRow>
  );
};

WorkonhandView.propTypes = {
  data: PropTypes.object
};

export default WorkonhandView;
