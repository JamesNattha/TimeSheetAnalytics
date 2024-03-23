import React, { useEffect, useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import moment from 'moment';
import {
  useMediaQuery,
  Grid,
  List,
  ListItem,
  Stack,
  TableCell,
  TableRow,
  Typography
} from '@mui/material';
import MainCard from 'components/MainCard';
import api from '_api';
// const avatarImage = require.context('assets/images/users', true);

const WorkonhandView = ({ data }) => {
  const [sedata, setSedata] = useState([]);
  const [role, setRole] = useState([]);
  const [frole, setFrole] = useState([]);


  const fetchRole = useCallback(async () => {
    try {
      const { data: roleData, isStatus } = await api.role.RoleTable();
      if (isStatus) {
        setFrole(roleData);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

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
    fetchRole();
  }, [fetchUser]);

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
          return roleNames;
        }
      }
    }
    return [];
  }, [data, role]);

  ////----------------------------------------------------------------------------------------


  const formatDateTime = (datetime) => {
    return moment(datetime).format('YYYY/MM/DD HH:mm:ss');
  };

  const formatTime = (dateTime) => {
    const formattedTime = moment(dateTime).format('DD/MM/YYYY HH:mm')
    return formattedTime;
  };

  const formatHour = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = remainingMinutes.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes} hr`;
  };
  ///------------------------------------------------------------------------------------------

  return (
    <TableRow sx={{ '&:hover': { bgcolor: `transparent !important` } }}>
      <TableCell colSpan={8} sx={{ p: 2.5 }}>
        <Grid>
          {data && typeof data.tbTimeSheetDTs === 'object' ? (
            data.tbTimeSheetDTs.map((item, index) => (
              <MainCard title="Work in Time Sheets" key={index}>
                <Stack spacing={2.5}>
                  <List sx={{ py: 0 }}>
                    <ListItem divider={!matchDownMD}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={4}>
                          <Stack spacing={0.5}>
                            <Typography color="secondary">Work Name</Typography>
                            <Typography>{item.workNo}</Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <Stack spacing={0.5}>
                            <Typography color="secondary">Start Date</Typography>
                            <Typography>{formatTime(item.startTime)}</Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <Stack spacing={0.5}>
                            <Typography color="secondary">End Date</Typography>
                            <Typography>{formatTime(item.endTime)}</Typography>
                          </Stack>
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem divider={!matchDownMD}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={4}>
                          <Stack spacing={0.5}>
                            <Typography color="secondary">Update At</Typography>
                            <Typography>{formatDateTime(item.updatedAt)}</Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <Stack spacing={0.5}>
                            <Typography color="secondary">Time Total</Typography>
                            <Typography>{formatHour(item.sumTime)}</Typography>
                          </Stack>
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Detail</Typography>
                        <Typography>{item.detail}</Typography>
                      </Stack>
                    </ListItem>
                  </List>
                </Stack>
              </MainCard>
            ))
          ) : (
            <Typography>No data available for Time Sheets</Typography>
          )}
        </Grid>
      </TableCell>
    </TableRow>
  );
};

WorkonhandView.propTypes = {
  data: PropTypes.object
};

export default WorkonhandView;
