import React, { useEffect, useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
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
import { EnvironmentOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import api from '_api';
import CustomerList  from '../../../pages/newTimesheetRe/popup-list/timesheetTable/table-timesheet';

const WorkonhandView = ({ data }) => {
  const [role, setRole] = useState([]);
  const [frole, setFrole] = useState([]);

  const sesdata = data ? data.tbTimesheetHd : null;

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

  const splitTimesheetByIndex = useMemo(() => {
    if (data && data.tbTimesheetHD) {
      const timesheetTables = data.tbTimesheetHD.reduce((result, item, index) => {
        const tableIndex = Math.floor(index / 3); // Number of items per table
        if (!result[tableIndex]) {
          result[tableIndex] = [];
        }
        result[tableIndex].push(item);
        return result;
      }, []);
      return timesheetTables;
    }
    return [];
  }, [data]);

  ///------------------------------------------------------------------------------------------

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
            <MainCard title="Work in Time Sheets">
              <CustomerList data={sesdata} />
            </MainCard>
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
